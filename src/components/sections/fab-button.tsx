"use client";

import React from "react";

const FabButton = () => {
  return (
    <a
      href="#contact"
      className="group fixed bottom-10 right-10 z-[1000] hidden h-[116px] w-[116px] cursor-pointer md:block"
      aria-label="Scroll to contact form"
    >
      <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-110">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 116 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <style>
            {`
              @keyframes fab-spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              .fab-text-animate {
                animation: fab-spin 12s linear infinite;
              }
            `}
          </style>

          <defs>
            <path
              id="fab-circle-path"
              d="M 58,18 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80"
            />
          </defs>

          {/* Background circle */}
          <circle cx="58" cy="58" r="58" fill="#F45D2F" />

          {/* Rotating Text */}
          <g className="fab-text-animate origin-center">
            <text
              fill="white"
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <textPath
                href="#fab-circle-path"
                startOffset="50%"
                textAnchor="middle"
              >
                Contact us • Contact us
              </textPath>
            </text>
          </g>

          {/* Center Heart Icon */}
          <g fill="white">
            {/* Top Diamond */}
            <path d="M58 39 L73 54 L58 69 L43 54 Z" />
            {/* Bottom Diamond */}
            <path d="M58 47 L73 62 L58 77 L43 62 Z" />
          </g>
        </svg>
      </div>
    </a>
  );
};

export default FabButton;