import { ReactNode } from "react";

export default function Noise({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        className="w-full h-full absolute opacity-10"
        style={{
          background: `url(/images/noise.png)`,
          backgroundBlendMode: "color-dodge",
          pointerEvents: "none",
        }}
      ></div>
      {children}
    </div>
  );
}
