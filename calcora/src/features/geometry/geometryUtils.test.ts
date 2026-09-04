import { describe, expect, it } from "vitest";
import {
  circleArea,
  circleCircumference,
  coneSurfaceArea,
  coneVolume,
  cubeSurfaceArea,
  cubeVolume,
  cuboidSurfaceArea,
  cuboidVolume,
  cylinderSurfaceArea,
  cylinderVolume,
  pythagoreanHypotenuse,
  pythagoreanLeg,
  rectangleArea,
  rectanglePerimeter,
  sphereSurfaceArea,
  sphereVolume,
  squareArea,
  squarePerimeter,
  triangleAngleFromSides,
  triangleArea,
  triangleAreaFromSides,
  trianglePerimeter,
} from "./geometryUtils";

describe("square calculations", () => {
  it("calculates square area", () => {
    expect(squareArea(5)).toBe(25);
  });

  it("calculates square perimeter", () => {
    expect(squarePerimeter(5)).toBe(20);
  });

  it("handles zero side length", () => {
    expect(squareArea(0)).toBe(0);
    expect(squarePerimeter(0)).toBe(0);
  });
});

describe("rectangle calculations", () => {
  it("calculates rectangle area", () => {
    expect(rectangleArea(10, 5)).toBe(50);
  });

  it("calculates rectangle perimeter", () => {
    expect(rectanglePerimeter(10, 5)).toBe(30);
  });

  it("handles zero dimensions", () => {
    expect(rectangleArea(0, 5)).toBe(0);
    expect(rectanglePerimeter(0, 5)).toBe(10);
  });
});

describe("triangle calculations", () => {
  it("calculates triangle area", () => {
    expect(triangleArea(10, 6)).toBe(30);
  });

  it("calculates triangle perimeter", () => {
    expect(trianglePerimeter(3, 4, 5)).toBe(12);
  });

  it("handles zero dimensions", () => {
    expect(triangleArea(0, 6)).toBe(0);
    expect(trianglePerimeter(0, 4, 5)).toBe(9);
  });
});

describe("circle calculations", () => {
  it("calculates circle area", () => {
    expect(circleArea(2)).toBeCloseTo(Math.PI * 4);
  });

  it("calculates circle circumference", () => {
    expect(circleCircumference(2)).toBeCloseTo(4 * Math.PI);
  });

  it("handles zero radius", () => {
    expect(circleArea(0)).toBe(0);
    expect(circleCircumference(0)).toBe(0);
  });
});

describe("invalid geometry inputs", () => {
  it("rejects invalid square side", () => {
    expect(() => squareArea(-1)).toThrow();
    expect(() => squarePerimeter(Number.NaN)).toThrow();
  });

  it("rejects invalid rectangle dimensions", () => {
    expect(() => rectangleArea(-1, 5)).toThrow();
    expect(() => rectanglePerimeter(5, Infinity)).toThrow();
  });

  it("rejects invalid triangle dimensions", () => {
    expect(() => triangleArea(-1, 5)).toThrow();
    expect(() => trianglePerimeter(3, -4, 5)).toThrow();
  });

  it("rejects invalid circle radius", () => {
    expect(() => circleArea(-1)).toThrow();
    expect(() => circleCircumference(Number.NaN)).toThrow();
  });
});

describe("cube calculations", () => {
  it("calculates cube volume", () => {
    expect(cubeVolume(3)).toBe(27);
  });

  it("calculates cube surface area", () => {
    expect(cubeSurfaceArea(3)).toBe(54);
  });

  it("handles zero side length", () => {
    expect(cubeVolume(0)).toBe(0);
    expect(cubeSurfaceArea(0)).toBe(0);
  });
});

describe("cuboid calculations", () => {
  it("calculates cuboid volume", () => {
    expect(cuboidVolume(2, 3, 4)).toBe(24);
  });

  it("calculates cuboid surface area", () => {
    expect(cuboidSurfaceArea(2, 3, 4)).toBe(52);
  });

  it("handles zero dimensions", () => {
    expect(cuboidVolume(0, 3, 4)).toBe(0);
    expect(cuboidSurfaceArea(0, 3, 4)).toBe(24);
  });
});

describe("cylinder calculations", () => {
  it("calculates cylinder volume", () => {
    expect(cylinderVolume(2, 5)).toBeCloseTo(
      Math.PI * 4 * 5,
    );
  });

  it("calculates cylinder surface area", () => {
    expect(cylinderSurfaceArea(2, 5)).toBeCloseTo(
      2 * Math.PI * 2 * 7,
    );
  });

  it("handles zero dimensions", () => {
    expect(cylinderVolume(0, 5)).toBe(0);
    expect(cylinderSurfaceArea(0, 5)).toBe(0);
  });
});

describe("sphere calculations", () => {
  it("calculates sphere volume", () => {
    expect(sphereVolume(3)).toBeCloseTo(
      (4 / 3) * Math.PI * 27,
    );
  });

  it("calculates sphere surface area", () => {
    expect(sphereSurfaceArea(3)).toBeCloseTo(
      4 * Math.PI * 9,
    );
  });

  it("handles zero radius", () => {
    expect(sphereVolume(0)).toBe(0);
    expect(sphereSurfaceArea(0)).toBe(0);
  });
});

describe("cone calculations", () => {
  it("calculates cone volume", () => {
    expect(coneVolume(3, 4)).toBeCloseTo(
      (1 / 3) * Math.PI * 9 * 4,
    );
  });

  it("calculates cone surface area", () => {
    expect(coneSurfaceArea(3, 4)).toBeCloseTo(
      Math.PI * 3 * 8,
    );
  });

  it("handles zero dimensions", () => {
    expect(coneVolume(0, 4)).toBe(0);
    expect(coneSurfaceArea(0, 4)).toBe(0);
  });
});

describe("invalid 3D geometry inputs", () => {
  it("rejects invalid cube side", () => {
    expect(() => cubeVolume(-1)).toThrow();
    expect(() => cubeSurfaceArea(Number.NaN)).toThrow();
  });

  it("rejects invalid cuboid dimensions", () => {
    expect(() => cuboidVolume(2, -3, 4)).toThrow();
    expect(() => cuboidSurfaceArea(2, 3, Infinity)).toThrow();
  });

  it("rejects invalid cylinder dimensions", () => {
    expect(() => cylinderVolume(-2, 5)).toThrow();
    expect(() => cylinderSurfaceArea(2, Number.NaN)).toThrow();
  });

  it("rejects invalid sphere radius", () => {
    expect(() => sphereVolume(-3)).toThrow();
    expect(() => sphereSurfaceArea(Infinity)).toThrow();
  });

  it("rejects invalid cone dimensions", () => {
    expect(() => coneVolume(-3, 4)).toThrow();
    expect(() => coneSurfaceArea(3, -4)).toThrow();
  });
});

describe("Pythagorean theorem", () => {
  it("calculates the hypotenuse", () => {
    expect(pythagoreanHypotenuse(3, 4)).toBe(5);
  });

  it("calculates a missing leg", () => {
    expect(pythagoreanLeg(5, 3)).toBe(4);
  });

  it("calculates another hypotenuse", () => {
    expect(pythagoreanHypotenuse(5, 12)).toBe(13);
  });

  it("handles a zero leg", () => {
    expect(pythagoreanHypotenuse(0, 5)).toBe(5);
  });

  it("rejects a leg larger than the hypotenuse", () => {
    expect(() => pythagoreanLeg(3, 4)).toThrow();
  });

  it("rejects invalid inputs", () => {
    expect(() => pythagoreanHypotenuse(-3, 4)).toThrow();
    expect(() => pythagoreanLeg(Number.NaN, 3)).toThrow();
  });
});

describe("triangle area from three sides", () => {
  it("calculates the area of a 3-4-5 triangle", () => {
    expect(triangleAreaFromSides(3, 4, 5)).toBeCloseTo(6);
  });

  it("calculates an equilateral triangle area", () => {
    expect(triangleAreaFromSides(2, 2, 2)).toBeCloseTo(
      Math.sqrt(3),
    );
  });

  it("rejects invalid triangle sides", () => {
    expect(() => triangleAreaFromSides(1, 2, 5)).toThrow();
  });

  it("rejects negative sides", () => {
    expect(() => triangleAreaFromSides(-3, 4, 5)).toThrow();
  });
});

describe("triangle angle from three sides", () => {
  it("calculates a 90 degree angle", () => {
    expect(
      triangleAngleFromSides(3, 4, 5),
    ).toBeCloseTo(90);
  });

  it("calculates a 60 degree angle for an equilateral triangle", () => {
    expect(
      triangleAngleFromSides(2, 2, 2),
    ).toBeCloseTo(60);
  });

  it("calculates a 53.13 degree angle", () => {
    expect(
      triangleAngleFromSides(3, 5, 4),
    ).toBeCloseTo(53.130102, 5);
  });

  it("rejects invalid sides", () => {
    expect(() =>
      triangleAngleFromSides(1, 1, 3),
    ).toThrow();
  });

  it("rejects non-positive sides", () => {
    expect(() =>
      triangleAngleFromSides(0, 4, 5),
    ).toThrow();
  });
});