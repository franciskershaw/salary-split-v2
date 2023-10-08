'use client';
import { useState } from 'react';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <h1 className="text-center p-8 text-xl bg-gray-500">
          Sign in to SalarySplit
        </h1>
      </div>
      <form className="flex flex-col w-full max-w-md mx-auto my-auto pb-4">
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
          <div className="flex justify-center">
            <button className={`${styles.button} py-4 px-12 text-xl`}>
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
