import React from "react";

interface SpineLogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export default function SpineLogo({
  className = "flex items-center gap-2.5",
  iconClassName = "h-5 w-5",
  textClassName = "text-xl font-bold tracking-tight text-stone-50",
}: SpineLogoProps) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconClassName} text-stone-50 transition-transform duration-300 hover:rotate-3`}
      >
        {/* Left Book Spine (thinnest, angled slightly) */}
        <rect
          x="4"
          y="6"
          width="3.5"
          height="14"
          rx="1"
          fill="currentColor"
          className="opacity-45"
        />
        {/* Middle Book Spine (taller, leaning slightly) */}
        <rect
          x="9"
          y="4"
          width="4.5"
          height="16"
          rx="1"
          fill="currentColor"
          className="opacity-70"
        />
        {/* Right Book Spine (tallest, upright, main accent color) */}
        <rect
          x="15"
          y="2"
          width="5"
          height="18"
          rx="1"
          fill="currentColor"
        />
        {/* Shelf Line */}
        <path
          d="M2 20H22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-30"
        />
      </svg>
      <span className={textClassName}>
        Spine
      </span>
    </div>
  );
}