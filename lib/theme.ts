export const C = {
  bg: "#0d0f10",
  screen: "#12171a",
  sheet: "#171c1f",
  ink: "#e8e6e1",
  yellow: "#f5c518",
  red: "#e11d2f",
  redSoft: "#ff6a75",
  green: "#22c07a",
} as const;

export const ROUTE_PTS: [number, number][] = [
  [80, 287], [76, 357], [86, 377], [102, 383], [159, 376], [213, 428], [262, 460], [276, 468],
];

export const routeD = (pts: [number, number][]) =>
  pts.map((p, i) => (i ? "L " : "M ") + p[0] + " " + p[1]).join(" ");

export const JOB = {
  code: "OTG-48210",
  from: "ร้านทิพย์ เบเกอรี่",
  to: "หมู่บ้านบางหว้า",
  due: "15.10",
  origin: "ดิ โอลด์ ทาวน์",
  destination: "ร้านทิพย์ เบเกอรี่",
  eta: 31,
  distanceKm: 13,
  arriveAt: "16.17",
} as const;
