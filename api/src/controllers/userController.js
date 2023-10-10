import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshToken,
  generateUserObject,
  verifyToken,
} from '../helper/helper';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '../errors/errors';
import {
  createUserSchema,
  loginUserSchema,
  editUserSchema,
} from '../validation/joiSchemas';
import User from '../models/User';
import Account from '../models/Account';

const createUser = async (req, res, next) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const { username, name, password } = value;

    // Check user doesn't already exist
    const userExists = await User.findOne({ username });
    if (userExists) {
      throw new ConflictError('User already exists');
    }
    // salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with secure password
    const user = await User.create({
      username,
      name,
      password: hashedPassword,
    });

    // Send refresh token
    const refreshToken = await generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Format userData for client
    const userData = await generateUserObject(user);

    res.status(201).json(userData);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { error, value } = loginUserSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }
    const { username, password } = value;

    // Check username exists
    const user = await User.findOne({ username });
    if (!user) {
      throw new BadRequestError('Username or password is incorrect');
    }
    // Check password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestError('Username or password is incorrect');
    }

    // Send refresh token
    const refreshToken = await generateRefreshToken(user._id);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Format userData for client
    const userData = await generateUserObject(user);

    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};

const checkRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken)
    throw new UnauthorizedError('No refresh token', 'NO_TOKEN');

  const refreshToken = cookies.refreshToken;
  try {
    const { _id } = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const accessToken = await generateAccessToken(_id);
    res.json({ accessToken: accessToken, _id });
  } catch (error) {
    res.clearCookie('refreshToken');
    throw new UnauthorizedError('Issues validating the token', 'INVALID_TOKEN');
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'User logged out' });
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const userData = await generateUserObject(user);
    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { error, value } = editUserSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    /* 
      Make sure that a user editing their default account chooses 
      a valid account _id
    */
    if (value.defaultAccount) {
      const account = await Account.findById(value.defaultAccount);
      if (account.acceptsFunds === false) {
        throw new BadRequestError('A default account must accept funds');
      }
    }

    const user = await User.findByIdAndUpdate(req.user._id, value, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export {
  createUser,
  loginUser,
  checkRefreshToken,
  logoutUser,
  getUserInfo,
  editUser,
};
