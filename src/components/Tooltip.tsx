import React, { useState } from "react";

interface TooltipProps {
  copiedIndex: number | null;
  index: number;
  color: string;
  autoCopy: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  copiedIndex,
  index,
  color,
  autoCopy,
}) => {
  return (
    <span className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2 bottom-full mb-1">
      {copiedIndex === index && autoCopy ? "Copied!" : color}
      <svg
        className="absolute text-black h-2 w-full left-0 top-full"
        viewBox="0 0 255 255"
      >
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </span>
  );
};
