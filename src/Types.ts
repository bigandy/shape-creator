export type Coords = {
  percentX: number;
  percentY: number;
};

export type NumCoords = { x: number; y: number };

export type Shape = {
  shape: DrawingMode;
  coords: Coords[];
};

export type DrawingMode = "line" | "rectangle" | "circle";
