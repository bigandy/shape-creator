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
        top: coords.percentY + "%",
        left: coords.percentX + "%",
      }}
    ></div>
  );
};
