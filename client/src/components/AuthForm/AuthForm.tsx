'use client';
import { useState } from 'react';
import useAuth from '@/hooks/auth/useAuth';
import styles from './AuthForm.module.scss';

type AuthType = 'login' | 'register';

interface AuthFormProps {
  type: AuthType;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [usernameFocused, setUsernameFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] =
    useState<boolean>(false);
  const [nameFocused, setNameFocused] = useState<boolean>(false);

  const auth = useAuth();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = { username, password };
    const registerData = {
      username,
      name,
      password,
    };
    if (type === 'register') {
      if (password !== confirmPassword) {
        console.log("Passwords don't match");
      } else {
        auth.register(registerData);
      }
    } else if (type === 'login') {
      auth.login(loginData);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <h1 className="text-center p-8 text-xl bg-gray-500">
          {type === 'login'
            ? 'Sign in to SalarySplit'
            : 'Create a new SalarySplit Account'}
        </h1>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full max-w-md mx-auto my-auto pb-4">
        <div className="px-8 mt-4 flex-1 flex flex-col justify-center">
          <div
            className={`relative mb-12 ${
              usernameFocused || username ? styles.focused : ''
            }`}>
            <input
              type="text"
              className={styles.inputLine}
              placeholder={usernameFocused || username ? '' : 'Username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />
            <label htmlFor="" className={styles.label}>
              Username
            </label>
          </div>
          {type === 'register' && (
            <div
              className={`relative mb-12 ${
                nameFocused || name ? styles.focused : ''
              }`}>
              <input
                type="text"
                className={styles.inputLine}
                placeholder={nameFocused || name ? '' : 'Name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
              />
              <label htmlFor="" className={styles.label}>
                Name
              </label>
            </div>
          )}

          <div
            className={`relative mb-12 ${
              passwordFocused || password ? styles.focused : ''
            }`}>
            <input
              type="password"
              className={styles.inputLine}
              placeholder={passwordFocused || password ? '' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <label htmlFor="" className={styles.label}>
              Password
            </label>
          </div>
          {type === 'register' && (
            <div
              className={`relative mb-12 ${
                confirmPasswordFocused || confirmPassword ? styles.focused : ''
              }`}>
              <input
                type="password"
                className={styles.inputLine}
                placeholder={
                  confirmPasswordFocused || confirmPassword
                    ? ''
                    : 'Confirm password'
                }
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
              />
              <label htmlFor="" className={styles.label}>
                Confirm password
              </label>
            </div>
          )}

          <div className="flex justify-center">
            <button className={`${styles.button} py-4 px-12 text-xl`}>
              {type === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
