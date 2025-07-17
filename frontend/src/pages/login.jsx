import React from "react";

function LogIn() {
  return (
    <form
      action=""
      className="flex flex-col items-center justify-center min-h-screen text-[#e7deda] ml-[1.5em] mr-[1.5em] gap-[3.25em]"
    >
      {/* Header */}
      <div className="flex flex-wrap font-bold gap-[0.3em]">
        <div className="text-[2.9rem]/[1.2em] ">
          <h1>
            Welcome to
            <div>
              <span className="text-[#FE7531]">
                DueMinder<span className="text-[#e7deda]">,</span>
              </span>
            </div>
            Sign In to Continue.
          </h1>
        </div>
        <p className="text-[1.1rem] font-normal">
          Don’t have an account?{" "}
          <a href="./pages/signup" className="text-[#FE7531] font-bold">
            Create an account
          </a>
        </p>
      </div>

      {/* Email field */}
      <div className="flex flex-col w-[100%] text-[1.1rem] gap-[1.063em]">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" id="email" className="text-[#FE7531]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email address..."
            name="email"
            id="email"
            required
            className="h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em]"
          />
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" id="password" className="text-[#FE7531]">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password..."
              name="password"
              id="password"
              required
              className="w-[100%] h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em]"
            />
            {/* Eye icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 absolute right-[4.5%] top-[30.3%]"
            >
              {/* When password is visible */}
              <path
                d="M12 4C7.03 4 3.24 6.99 2 10c1.24 3.01 5.03 6 10 6s8.76-2.99 10-6c-1.24-3.01-5.03-6-10-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              />
              {/* When password is not visible */}
              <>
                <path
                  d="M12 4C7.03 4 3.24 6.99 2 10c1.24 3.01 5.03 6 10 6s8.76-2.99 10-6c-1.24-3.01-5.03-6-10-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                />
                <path
                  d="M4 4l16 11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </>
            </svg>
          </div>
          <a href="#" className="flex w-[100%] justify-end">
            Forgot Password?
          </a>
        </div>
      </div>

      {/* Sign In button */}
      <button className="h-[2.813em] bg-[#FE7531] w-[100%] rounded-full font-bold">Sign In</button>
    </form>
  );
}

export default LogIn;