'use client';
import { useState, useEffect } from 'react';
import useAuth from '@/hooks/auth/useAuth';
import styles from './AuthForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type AuthType = 'login' | 'register';

interface AuthFormProps {
  type: AuthType;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [focusState, setFocusState] = useState({
    username: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusState((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusState((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const auth = useAuth();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {
      username: formData.username,
      password: formData.username,
    };
    const registerData = {
      username: formData.username,
      name: formData.name,
      password: formData.name,
    };
    if (type === 'register') {
      if (formData.password !== formData.confirmPassword) {
        console.log("Passwords don't match");
      } else {
        auth.register(registerData);
      }
    } else if (type === 'login') {
      auth.login(loginData);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col w-full min-h-screen mx-auto md:mx-0 md:w-2/3 lg:w-1/2 xl:w-1/3 md:min-h-0 md:my-16 md:shadow-lg md:border md:border-gray-300 md:rounded-lg">
        <h1 className="text-center p-8 text-xl bg-primary text-white md:mb-8">
          {type === 'login'
            ? 'Sign in to SalarySplit'
            : 'Create a new SalarySplit Account'}
        </h1>

        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full max-w-md mx-auto my-auto pb-4">
          <div className="px-8 mt-4 flex-1 flex flex-col justify-center">
            <div
              className={`relative mb-12 ${
                focusState.username || formData.username ? styles.focused : ''
              }`}>
              <input
                type="text"
                className={styles.inputLine}
                placeholder={
                  focusState.username || formData.username ? '' : 'Username'
                }
                value={formData.username}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                name="username"
              />
              <label htmlFor="" className={styles.label}>
                Username
              </label>
            </div>
            {type === 'register' && (
              <div
                className={`relative mb-12 ${
                  focusState.name || formData.name ? styles.focused : ''
                }`}>
                <input
                  type="text"
                  className={styles.inputLine}
                  placeholder={focusState.name || formData.name ? '' : 'Name'}
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name="name"
                />
                <label htmlFor="" className={styles.label}>
                  Name
                </label>
              </div>
            )}

            <div
              className={`relative ${type === 'login' ? 'mb-8' : 'mb-12'} ${
                focusState.password || formData.password ? styles.focused : ''
              }`}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                className={styles.inputLine}
                placeholder={
                  focusState.password || formData.password ? '' : 'Password'
                }
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                name="password"
              />
              <label htmlFor="" className={styles.label}>
                Password
              </label>
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center">
                <FontAwesomeIcon
                  className="text-primary"
                  icon={passwordVisible ? faEyeSlash : faEye}
                />
              </button>
            </div>
            {type === 'register' && (
              <div
                className={`relative mb-8 ${
                  focusState.confirmPassword || formData.confirmPassword
                    ? styles.focused
                    : ''
                }`}>
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  className={styles.inputLine}
                  placeholder={
                    focusState.confirmPassword || formData.confirmPassword
                      ? ''
                      : 'Confirm password'
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name="confirmPassword"
                />
                <label htmlFor="" className={styles.label}>
                  Confirm password
                </label>
                <button
                  type="button"
                  onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center">
                  <FontAwesomeIcon
                    className="text-primary"
                    icon={confirmPasswordVisible ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            )}
            <div className="flex justify-center">
              <button className={`${styles.button} py-4 px-12 text-xl`}>
                {type === 'login' ? 'Sign in' : 'Create account'}
              </button>
            </div>
            <div className="text-center mt-8 mb-4 text-lg">
              <p className="mb-1">
                {type === 'login' ? 'Need' : 'Already have'} an account?
              </p>
              <p>
                {type === 'login' ? 'Sign up' : 'Login'}{' '}
                <Link
                  className="underline"
                  href={type === 'login' ? '/register' : '/'}>
                  here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
