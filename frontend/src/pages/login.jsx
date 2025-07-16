import React from "react";

function LogIn() {
    return (
      <form
        action=""
        className="flex flex-col items-center justify-center min-h-screen text-[#e7deda] ml-[1.5em] mr-[1.5em] gap-6"
      >
        <div className="flex flex-wrap font-bold gap-[0.3em]">
          <div className="text-[2.9rem]/[1.2em] ">
            <h1>Welcome to</h1>
            <h1 className="text-[#FE7531]">
              DueMinder <span className="ml-[-0.2em]">,</span>
            </h1>
            <h1>Sign In to Continue.</h1>
          </div>
          <p className="text-[1rem] font-normal">
            Don’t have an account?{" "}
            <a href="./pages/signup" className="text-[#FE7531] font-bold">Create an account</a>
          </p>
        </div>

        <div className="flex flex-col w-[100%]">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter your email address"
            name="email"
            required
          />
        </div>
      </form>
    );
}

export default LogIn;
