export function squareArea(side: number): number {
  if (!Number.isFinite(side) || side < 0) {
    throw new Error("Invalid side length");
  }

  return side * side;
}

export function squarePerimeter(side: number): number {
  if (!Number.isFinite(side) || side < 0) {
    throw new Error("Invalid side length");
  }

  return 4 * side;
}

export function rectangleArea(
  length: number,
  width: number,
): number {
  if (
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    length < 0 ||
    width < 0
  ) {
    throw new Error("Invalid rectangle dimensions");
  }

  return length * width;
}

export function rectanglePerimeter(
  length: number,
  width: number,
): number {
  if (
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    length < 0 ||
    width < 0
  ) {
    throw new Error("Invalid rectangle dimensions");
  }

  return 2 * (length + width);
}

export function triangleArea(
  base: number,
  height: number,
): number {
  if (
    !Number.isFinite(base) ||
    !Number.isFinite(height) ||
    base < 0 ||
    height < 0
  ) {
    throw new Error("Invalid triangle dimensions");
  }

  return (base * height) / 2;
}

export function trianglePerimeter(
  sideA: number,
  sideB: number,
  sideC: number,
): number {
  if (
    !Number.isFinite(sideA) ||
    !Number.isFinite(sideB) ||
    !Number.isFinite(sideC) ||
    sideA < 0 ||
    sideB < 0 ||
    sideC < 0
  ) {
    throw new Error("Invalid triangle sides");
  }

  return sideA + sideB + sideC;
}

export function circleArea(radius: number): number {
  if (!Number.isFinite(radius) || radius < 0) {
    throw new Error("Invalid radius");
  }

  return Math.PI * radius * radius;
}

export function circleCircumference(radius: number): number {
  if (!Number.isFinite(radius) || radius < 0) {
    throw new Error("Invalid radius");
  }

  return 2 * Math.PI * radius;
}

export function cubeVolume(side: number): number {
  if (!Number.isFinite(side) || side < 0) {
    throw new Error("Invalid side length");
  }

  return side * side * side;
}

export function cubeSurfaceArea(side: number): number {
  if (!Number.isFinite(side) || side < 0) {
    throw new Error("Invalid side length");
  }

  return 6 * side * side;
}

export function cuboidVolume(
  length: number,
  width: number,
  height: number,
): number {
  if (
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    length < 0 ||
    width < 0 ||
    height < 0
  ) {
    throw new Error("Invalid cuboid dimensions");
  }

  return length * width * height;
}

export function cuboidSurfaceArea(
  length: number,
  width: number,
  height: number,
): number {
  if (
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    length < 0 ||
    width < 0 ||
    height < 0
  ) {
    throw new Error("Invalid cuboid dimensions");
  }

  return 2 * (
    length * width +
    length * height +
    width * height
  );
}

export function cylinderVolume(
  radius: number,
  height: number,
): number {
  if (
    !Number.isFinite(radius) ||
    !Number.isFinite(height) ||
    radius < 0 ||
    height < 0
  ) {
    throw new Error("Invalid cylinder dimensions");
  }

  return Math.PI * radius * radius * height;
}

export function cylinderSurfaceArea(
  radius: number,
  height: number,
): number {
  if (
    !Number.isFinite(radius) ||
    !Number.isFinite(height) ||
    radius < 0 ||
    height < 0
  ) {
    throw new Error("Invalid cylinder dimensions");
  }

  return 2 * Math.PI * radius * (radius + height);
}

export function sphereVolume(radius: number): number {
  if (!Number.isFinite(radius) || radius < 0) {
    throw new Error("Invalid radius");
  }

  return (4 / 3) * Math.PI * radius * radius * radius;
}

export function sphereSurfaceArea(radius: number): number {
  if (!Number.isFinite(radius) || radius < 0) {
    throw new Error("Invalid radius");
  }

  return 4 * Math.PI * radius * radius;
}

export function coneVolume(
  radius: number,
  height: number,
): number {
  if (
    !Number.isFinite(radius) ||
    !Number.isFinite(height) ||
    radius < 0 ||
    height < 0
  ) {
    throw new Error("Invalid cone dimensions");
  }

  return (1 / 3) * Math.PI * radius * radius * height;
}

export function coneSurfaceArea(
  radius: number,
  height: number,
): number {
  if (
    !Number.isFinite(radius) ||
    !Number.isFinite(height) ||
    radius < 0 ||
    height < 0
  ) {
    throw new Error("Invalid cone dimensions");
  }

  const slantHeight = Math.sqrt(
    radius * radius + height * height,
  );

  return Math.PI * radius * (radius + slantHeight);
}

export function pythagoreanHypotenuse(
  sideA: number,
  sideB: number,
): number {
  if (
    !Number.isFinite(sideA) ||
    !Number.isFinite(sideB) ||
    sideA < 0 ||
    sideB < 0
  ) {
    throw new Error("Invalid triangle sides");
  }

  return Math.sqrt(sideA * sideA + sideB * sideB);
}

export function pythagoreanLeg(
  hypotenuse: number,
  knownLeg: number,
): number {
  if (
    !Number.isFinite(hypotenuse) ||
    !Number.isFinite(knownLeg) ||
    hypotenuse < 0 ||
    knownLeg < 0
  ) {
    throw new Error("Invalid triangle sides");
  }

  if (knownLeg > hypotenuse) {
    throw new Error("Known leg cannot be greater than hypotenuse");
  }

  return Math.sqrt(
    hypotenuse * hypotenuse - knownLeg * knownLeg,
  );
}

export function triangleAreaFromSides(
  sideA: number,
  sideB: number,
  sideC: number,
): number {
  if (
    !Number.isFinite(sideA) ||
    !Number.isFinite(sideB) ||
    !Number.isFinite(sideC) ||
    sideA < 0 ||
    sideB < 0 ||
    sideC < 0
  ) {
    throw new Error("Invalid triangle sides");
  }

  if (
    sideA + sideB <= sideC ||
    sideA + sideC <= sideB ||
    sideB + sideC <= sideA
  ) {
    throw new Error("Invalid triangle");
  }

  const semiperimeter = (sideA + sideB + sideC) / 2;

  return Math.sqrt(
    semiperimeter *
      (semiperimeter - sideA) *
      (semiperimeter - sideB) *
      (semiperimeter - sideC),
  );
}

export function triangleAngleFromSides(
  sideA: number,
  sideB: number,
  oppositeSide: number,
): number {
  if (
    !Number.isFinite(sideA) ||
    !Number.isFinite(sideB) ||
    !Number.isFinite(oppositeSide) ||
    sideA <= 0 ||
    sideB <= 0 ||
    oppositeSide <= 0
  ) {
    throw new Error("Invalid triangle sides");
  }

  const cosine =
    (sideA * sideA +
      sideB * sideB -
      oppositeSide * oppositeSide) /
    (2 * sideA * sideB);

  if (cosine < -1 || cosine > 1) {
    throw new Error("Invalid triangle");
  }

  return Math.acos(Math.min(1, Math.max(-1, cosine))) * (180 / Math.PI);
}