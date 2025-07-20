import React, { useEffect, useState } from "react";

function Settings() {

  const [isOn, setIsOn] = useState(false);

  return (
    <>
      {/* Upper icons */}
      <div className="flex flex-row justify-between align-middle w-[100%] mt-[2em] mb-[1em] text-white">
        <a
          href="/home"
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
          <p className="mt-[-0.2em]">Back to my bills</p>
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

      {/* Settings list */}
      <div className="text-[#e7deda] flex flex-col gap-[0.6em] w-[100%] h-[80vh] justify-between">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h2 className="text-[1.5em] font-bold">Settings</h2>

          {/* Settings list */}
          <div className="flex flex-col gap-2">
            {/* First settings */}
            <div className="flex flex-row justify-between align-middle w-[100%] bg-[#111111] border-[#464646] border-[0.063em] rounded-[1.25em] p-[1.1em]">
              <div className="flex flex-col">
                <h3 className="text-[1.25rem] font-bold">Profile</h3>
                <p className="text-[0.75rem]">Edit personal information</p>
              </div>
              <a href="/profile" className="flex items-center justify-center px-4 py-2 text-[#e7deda] rounded-full hover:scale-90">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
            {/* Second settings */}
            <div className="flex flex-row justify-between items-center w-full bg-[#111111] border-[#464646] border-[0.063em] rounded-[1.25em] p-[1.1em]">
              <div className="flex flex-col">
                <h3 className="text-[1.25rem] font-bold text-white">
                  Notifications
                </h3>
                <p className="text-[0.75rem] text-gray-400">
                  Receive notifications chuchsnflffsd
                </p>
              </div>
              <div
                onClick={() => setIsOn(!isOn)}
                className={`w-[2.438em] h-[1.25em] flex items-center rounded-full cursor-pointer transition-all duration-300 ${
                  isOn
                    ? "bg-[#FE7531] border-[#FE7531]"
                    : "border-2 border-[#e7deda]"
                }`}
              >
                <div
                  className={`w-[0.875em] h-[0.875em] bg-[#FE7531] rounded-full shadow-md transform transition-transform duration-300 ${
                    isOn
                      ? "translate-x-5 bg-white"
                      : "translate-x-1 bg-[#e7deda]"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        <a
          href="/"
          className="flex align-middle justify-center font-bold underline text-[1.25rem]"
        >
          Sign Out
        </a>
      </div>
    </>
  );
}

export default Settings;
