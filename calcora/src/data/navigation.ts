import {
  Calculator,
  CalendarDays,
  CircleDollarSign,
  FlaskConical,
  History,
  Ruler,
  Shapes,
  Save,
  Sigma,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  path: string;
  icon: typeof Calculator;
}

export interface NavigationSection {
  label: string;
  items: NavigationItem[];
}

export const navigationSections: NavigationSection[] = [
  {
    label: "Calculate",
    items: [
      {
        label: "Calculator",
        path: "/calculator",
        icon: Calculator,
      },
      {
        label: "Scientific",
        path: "/scientific",
        icon: FlaskConical,
      },
    ],
  },
  {
    label: "Explore",
    items: [
      {
        label: "Finance",
        path: "/finance",
        icon: CircleDollarSign,
      },
      {
        label: "Converter",
        path: "/converter",
        icon: Ruler,
      },
      {
        label: "Geometry",
        path: "/geometry",
        icon: Shapes,
      },
      {
        label: "Statistics",
        path: "/statistics",
        icon: Sigma,
      },
      {
        label: "Date & Time",
        path: "/date-time",
        icon: CalendarDays,
      },
    ],
  },
  {
    label: "Personal",
    items: [
      {
        label: "History",
        path: "/history",
        icon: History,
      },
      {
        label: "Saved",
        path: "/saved",
        icon: Save,
      },
    ],
  },
];