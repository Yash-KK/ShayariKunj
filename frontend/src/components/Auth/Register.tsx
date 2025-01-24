import React from "react";

const Register: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mb-2 font-bold text-4xl">Create An account</div>
      <div className="mb-10 font-normal text-1xl">
        Already have an account? <u>Login</u>{" "}
      </div>

      <form>
        <div className="mb-5">
          <label className="text-lg font-bold">Email</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg bg-gray-700"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label className="text-lg font-bold">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border p-2 rounded-lg bg-gray-700"
            placeholder="enter password..."
            required
          />
        </div>
        <button
          type="button"
          className="text-gray-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Light
        </button>
      </form>
    </div>
  );
};
export default Register;
