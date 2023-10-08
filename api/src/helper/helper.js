import * as jose from 'jose';

const generateAccessToken = async (id) => {
  const signJwt = new jose.SignJWT({ _id: id }).setProtectedHeader({
    alg: 'HS256',
  });
  signJwt.setExpirationTime('15m');

  return await signJwt.sign(
    new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
  );
};

const generateRefreshToken = async (id) => {
  const signJwt = new jose.SignJWT({ _id: id }).setProtectedHeader({
    alg: 'HS256',
  });
  signJwt.setExpirationTime('30d');

  return await signJwt.sign(
    new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)
  );
};

const verifyToken = async (token, secret) => {
  return await jose.jwtVerify(token, new TextEncoder().encode(secret));
};

const generateUserObject = async (user) => {
  return {
    userInfo: {
      _id: user._id,
      username: user.username,
      name: user.name,
      monthlySalary: user.monthlySalary,
      transactions: user.transactions,
      accounts: user.accounts,
      balanceAccount: user.balanceAccount,
      billsAccount: user.billsAccount,
    },
    // Send access token
    accessToken: await generateAccessToken(user._id),
  };
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  generateUserObject,
};
