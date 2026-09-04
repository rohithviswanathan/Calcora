# Calcora

Calcora is a modern, responsive calculation workspace built with React, TypeScript, and Vite. It brings everyday arithmetic, scientific functions, financial calculations, and unit conversions into one focused interface.

The project is organized as a feature-based frontend application with reusable layout and UI components, typed calculation utilities, and automated unit tests for the core calculation logic.

## Features

### Standard calculator

The standard calculator supports:

- Addition, subtraction, multiplication, and division
- Operator precedence
- Parentheses
- Decimal and negative numbers
- Powers and squared values
- Percentages, including:
  - Standalone percentages such as `50%`
  - Percentage multiplication such as `200 * 15%`
  - Percentage addition such as `200 + 15%`
  - Percentage subtraction such as `200 - 15%`
  - Percentage division such as `200 / 10%`
- Mathematical constants such as `pi` and `e`
- Friendly expression input using symbols such as `x`, `÷`, `-`, `^`, and `π`
- Formatted numeric results using US locale formatting
- Error states for empty, invalid, non-numeric, or non-finite expressions

Expressions are evaluated through `mathjs` after calculator-specific syntax is normalized.

### Scientific calculator

The scientific calculator builds on the core calculation engine and supports:

- Sine, cosine, and tangent
- Inverse sine, cosine, and tangent
- Degree and radian angle modes
- Square roots using `sqrt(...)` or the `√` symbol
- Base-10 logarithms with `log(...)`
- Natural logarithms with `ln(...)`
- Powers and mathematical constants

Degree-mode trigonometric expressions are converted to radians before evaluation, while inverse trigonometric results are converted back to degrees.

### Finance calculators

The finance section contains separate calculators for common personal and business calculations:

- Loan repayment and EMI
  - Monthly payment
  - Total payment
  - Total interest
  - Number of monthly payments
- Simple interest
  - Principal
  - Interest earned
  - Total amount
- Compound interest
  - Yearly, half-yearly, quarterly, and monthly compounding
  - Interest earned
  - Total amount
  - Number of compounding periods
- Percentage of a value
- Discounts
  - Discount amount
  - Final price
- Tips
  - Tip amount
  - Total bill
  - Number of people
  - Per-person amount

The finance utilities validate numeric input and reject invalid values such as negative rates, non-positive loan terms, or zero people for a bill split.

### Unit converter

The converter section currently includes eight categories:

- Length:
  - Millimeters
  - Centimeters
  - Meters
  - Kilometers
  - Inches
  - Feet
  - Yards
  - Miles
- Weight:
  - Milligrams
  - Grams
  - Kilograms
  - Tonnes
  - Ounces
  - Pounds
  - Stones
- Temperature:
  - Celsius
  - Fahrenheit
  - Kelvin
- Area:
  - Square millimeters, square centimeters, square meters, square kilometers
  - Square inches, square feet, square yards, acres, hectares, square miles
- Volume:
  - Milliliters, liters, cubic centimeters, cubic meters
  - Cubic inches, cubic feet, cubic yards, gallons, quarts, pints
- Time:
  - Milliseconds, seconds, minutes, hours, days, weeks, months, years
- Speed:
  - Meters per second
  - Kilometers per hour
  - Miles per hour
  - Feet per second
  - Knots
- Data:
  - Bits, bytes, kilobits, kilobytes, megabits, megabytes
  - Gigabits, gigabytes, terabits, terabytes

Conversions use normalized base units before calculating the target value. Temperature conversion uses Celsius as its intermediate unit.

### Geometry calculators

The geometry section includes calculators for:

- Square, rectangle, triangle, and circle area/perimeter or circumference
- Cube, cuboid, cylinder, sphere, and cone volume/surface area
- Triangle area from three sides using Heron's formula
- Triangle perimeter, angles, and Pythagorean theorem calculations

### Statistics calculator

The statistics calculator accepts numbers separated by commas or spaces and calculates:

- Count
- Sum
- Mean
- Median
- Mode
- Minimum
- Maximum
- Range

### Date & Time calculator

The date and time section includes:

- Difference between two dates
- Adding or subtracting days from a date
- Age calculation between a birth date and reference date
- Day of the week for a date
- Number of days in a month

### Application navigation

Calcora uses a shared application layout with grouped navigation:

- **Calculate**: Calculator and Scientific
- **Explore**: Finance, Converter, Geometry, Statistics, and Date & Time

All navigation entries currently point to implemented pages. History and Saved are not currently registered routes.

## Technology stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- `@tailwindcss/vite`
- `mathjs` for expression evaluation
- Zustand for state management support
- Framer Motion for animations
- Lucide React for icons
- Recharts for charting support
- Vitest for unit tests
- Testing Library and JSDOM for component testing
- ESLint for code quality

## Project structure

```text
calcora/
├── public/                      Static public assets
├── src/
│   ├── assets/                  Application assets
│   ├── components/
│   │   ├── layout/              App shell, navigation, sidebar, and top bar
│   │   └── ui/                  Reusable buttons, cards, inputs, and badges
│   ├── data/
│   │   └── navigation.ts        Navigation sections and route definitions
│   ├── features/
│   │   ├── calculator/          Standard calculator engine, state, and UI
│   │   ├── converter/           Unit conversion utilities and UI
│   │   ├── dateTime/            Date and time utilities and UI
│   │   ├── finance/             Financial calculation utilities and UI
│   │   ├── geometry/            Geometry utilities and calculators
│   │   ├── quickCalculate/      Quick calculation experience
│   │   ├── scientific/          Scientific calculator UI and keypad
│   │   └── statistics/          Statistics utilities and calculator UI
│   ├── pages/
│   │   ├── Home/                Home page
│   │   ├── Calculator/          Standard calculator page
│   │   ├── Scientific/          Scientific calculator page
│   │   ├── Finance/             Finance page
│   │   ├── Converter/           Converter page
│   │   ├── Geometry/            Geometry page
│   │   ├── Statistics/          Statistics page
│   │   └── DateTime/            Date and time page
│   ├── test/
│   │   └── setup.ts             Test environment setup
│   ├── App.tsx                  Router and application routes
│   ├── index.css                Global styles
│   └── main.tsx                 Application entry point
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Prerequisites

- Node.js 20 or a compatible modern Node.js release
- npm

Check the installed versions:

```bash
node --version
npm --version
```

## Installation

Install dependencies from the project directory:

```bash
npm install
```

## Development

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

Vite will print the local development URL in the terminal, normally `http://localhost:5173`.

## Production build

Create a type-checked and optimized production build:

```bash
npm run build
```

Preview the generated production build locally:

```bash
npm run preview
```

## Tests

Run Vitest in watch mode:

```bash
npm test
```

Run the complete test suite once:

```bash
npm run test:run
```

The current tests cover the calculator engine and reducer, finance utilities, converter utilities, geometry utilities, statistics utilities, and date/time utilities. Core cases include arithmetic, operator precedence, percentage behavior, trigonometry, logarithms, interest calculations, loan calculations, tips, discounts, unit conversions, shape formulas, dataset summaries, and date operations.

## Linting

Run ESLint across the project:

```bash
npm run lint
```

## Available npm scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the production bundle |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |
| `npm test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once |

## Application routes

| Route | Page | Status |
| --- | --- | --- |
| `/` | Home | Available |
| `/calculator` | Standard calculator | Available |
| `/scientific` | Scientific calculator | Available |
| `/finance` | Financial calculators | Available |
| `/converter` | Unit converter | Available |
| `/geometry` | Geometry tools | Available |
| `/statistics` | Statistics tools | Available |
| `/date-time` | Date and time tools | Available |

## Calculation engine

The central calculator engine accepts an expression and an optional angle mode:

```ts
calculate(expression: string, angleMode: "deg" | "rad" = "deg")
```

It returns a discriminated result object:

```ts
{
  success: true,
  result: {
    expression: string,
    value: number,
    formattedValue: string
  }
}
```

or an error object:

```ts
{
  success: false,
  error: {
    expression: string,
    message: string
  }
}
```

This result shape keeps successful calculations and user-facing errors explicit and type-safe.

## Design and architecture

- Pages compose feature components rather than owning calculation logic.
- Calculation formulas live in focused utility modules so they can be tested independently of React.
- The calculator state and reducer separate user interaction from expression evaluation.
- Shared layout components provide consistent navigation across pages.
- Shared UI components keep controls and visual patterns consistent.
- React Router handles page-level navigation.
- TypeScript types define calculator expressions, calculation results, errors, units, and finance outputs.

## Development notes

- Keep new functionality inside the relevant feature folder.
- Put pure formulas and conversions in utility modules and add tests alongside them.
- Use the existing shared UI and layout components when adding new pages.
- Add new navigation entries in `src/data/navigation.ts` and corresponding routes in `src/App.tsx`.
- Preserve the explicit success/error result pattern used by the calculator engine.
- Validate user input before performing financial or unit calculations.

## Roadmap

Potential future work includes:

- Persistent calculation history
- Saved calculations
- Expanded scientific functions and constants
- Additional component and interaction tests

## License

No license has been specified for this project yet.
