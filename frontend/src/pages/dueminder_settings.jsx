import React, { useEffect, useState } from "react";

function Settings() {


  return (
    <>
        <div className="flex flex-row justify-between align-middle w-[100%] mt-[2em] mb-[1em] text-white">
            <a href="/home" className="flex flex-row align-middle justify-center w-fit h-fit gap-1">
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
    </>
  );
}

export default Settings;
