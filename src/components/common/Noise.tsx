export default function Noise() {
  return (
    <div
      className="w-full h-full opacity-10 absolute"
      style={{
        background: `url(/images/noise.png)`,
        backgroundBlendMode: "color-dodge",
        pointerEvents: "none",
      }}
    ></div>
  );
}
