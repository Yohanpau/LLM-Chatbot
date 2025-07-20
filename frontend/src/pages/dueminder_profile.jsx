import React, { useEffect, useState } from "react";

function Profile() {

  return (
    <>
      {/* Upper icons */}
      <div className="flex flex-row justify-between align-middle w-[100%] mt-[2em] mb-[1em] text-white">
        <a
          href="/settings"
          className="flex flex-row align-middle justify-center w-fit h-fit gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <p className="mt-[-0.2em]">Back to settings</p>
        </a>
        <svg
          width="60"
          height="60"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hover:scale-90"
        >
          <path
            d="M33 14c3 10 4.5 10 12 12-7.5 2-9 2-12 12-3-10-4.5-10-12-12 7.5-2 9-2 12-12z"
            fill="#e7deda"
          />

          {/* Lower-left small star moved down and left */}
          <path
            d="M18 36c1.2 4 1.6 3.8 5.2 5.2-3.6 1.4-4 1.4-5.2 5.2-1.2-3.8-1.6-3.8-5.2-5.2 3.6-1.4 4-1.4 5.2-5.2z"
            fill="#e7deda"
          />
          {/* Upper-right small star moved up and right */}
          <path
            d="M48 8c0.6 4 1.6 3.8 5.2 5.2-3.6 1.4-4 1.4-5.2 5.2-1.2-3.8-1.6-3.8-5.2-5.2 3.6-1.4 4-1.4 5.2-5.2z"
            fill="#e7deda"
          />
        </svg>
      </div>

      {/* Profile edit section */}
      <div className="text-[#e7deda] flex flex-col gap-[1.5%] w-[100%] h-[80vh]">
        {/* Title */}
        <h2 className="text-[1.5em] font-bold">Profile</h2>
        {/* User profile */}
        <div>
          <div className="flex justify-center items-center">
            <div className="w-[6em] h-[6em] rounded-full bg-[#222222] border border-[#FE7531] flex items-center justify-center overflow-hidden">
              <img alt="User Profile" className="w-full h-full object-cover" />
              <span className="text-[#FE7531] text-xs">👤</span>
            </div>
          </div>
        </div>

        {/* Profile edit and input */}
        <form
          action=""
          className="flex flex-col items-center justify-center gap-8 text-[#e7deda]"
        >
          <div className="flex flex-col w-[100%] text-[1.1rem] gap-[1.063em]">
            {/* Budget field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="budget" id="budget" className="text-[#FE7531]">
                Budget
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  placeholder="How much is your budget?"
                  name="budget"
                  id="budget"
                  required
                  className="w-[100%] h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em]"
                />
                {/* Edit icon */}
                <button
                  className="flex items-center justify-center text-[#e7deda] hover:bg-[#5050505e] rounded-full p-1 hover:text-[#e7deda] transition duration-200  absolute right-[4.5%] top-[17%]"
                  aria-label="Edit"
                >
                  {/* Pencil SVG Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Full name field */}
            <div className="flex flex-col gap-1 text-[1.1rem]">
              <label htmlFor="name" id="name" className="text-[#FE7531]">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="How much is your budget?"
                  name="name"
                  id="name"
                  required
                  className="w-[100%] h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em]"
                />
                {/* Edit icon */}
                <button
                  className="flex items-center justify-center text-[#e7deda] hover:bg-[#5050505e] rounded-full p-1 hover:text-[#e7deda] transition duration-200  absolute right-[4.5%] top-[17%]"
                  aria-label="Edit"
                >
                  {/* Pencil SVG Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-1 text-[1.1rem]">
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
            <div className="flex flex-col gap-1 text-[1.1rem]">
              <div className="flex flex-row">
                <label
                  htmlFor="password"
                  id="password"
                  className="text-[#FE7531]"
                >
                  Password
                </label>
                <a
                  href=""
                  className="flex w-[100%] justify-end text-[1rem] underline"
                >
                  Change Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password..."
                  name="password"
                  id="password"
                  required
                  className="w-[100%] h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em]"
                />
              </div>
            </div>
          </div>

          {/* Sign Up button */}
          <button className="h-[2.813em] bg-[#FE7531] w-[100%] rounded-full font-bold">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
