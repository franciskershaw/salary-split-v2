import styles from './AuthForm.module.scss';

// AuthForm.js
const AuthForm = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <h1 className="text-center p-8 text-xl bg-gray-500">
          Sign in to SalarySplit
        </h1>
      </div>
      <form className="flex flex-col w-full max-w-md mx-auto my-auto pb-4">
        <div className="px-8 mt-4 flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <label htmlFor="" className="block mb-2">
              Username
            </label>
            <input type="text" className={styles.inputLine} />
          </div>
          <div className="mb-12">
            <label htmlFor="" className="block mb-2">
              Password
            </label>
            <input type="password" className={styles.inputLine} />
          </div>
          <div className="flex justify-center">
            <button className={`${styles.button} py-4 px-12 text-xl`}>Sign in</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
