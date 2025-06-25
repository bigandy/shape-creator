import type { Coords } from "@/Types";

export const Point = ({
  coords,
  type,
}: {
  coords: Coords;
  type: "final" | "initial";
}) => {
  return (
    <div
      className="circle-circle rectangle-middle-point"
      style={{
        background: type === "initial" ? "red" : "green",
        height: 10,
        width: 10,
        translate: `calc(${coords.percentX}cqw - 50%) calc(${coords.percentY}cqh - 50%)`,
      }}
    ></div>
  );
};
