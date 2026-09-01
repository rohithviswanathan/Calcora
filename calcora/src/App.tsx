import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/calculator"
            element={
              <PlaceholderPage
                title="Basic Calculator"
                description="Your everyday calculation workspace will live here."
              />
            }
          />

          <Route
            path="/scientific"
            element={
              <PlaceholderPage
                title="Scientific Calculator"
                description="Advanced mathematical functions will live here."
              />
            }
          />

          <Route
            path="/finance"
            element={
              <PlaceholderPage
                title="Finance"
                description="Financial calculators and visualizations will live here."
              />
            }
          />

          <Route
            path="/converter"
            element={
              <PlaceholderPage
                title="Unit Converter"
                description="Convert values across multiple measurement categories."
              />
            }
          />

          <Route
            path="/geometry"
            element={
              <PlaceholderPage
                title="Geometry"
                description="Geometry calculations and visual diagrams will live here."
              />
            }
          />

          <Route
            path="/statistics"
            element={
              <PlaceholderPage
                title="Statistics"
                description="Statistical calculations and data visualization will live here."
              />
            }
          />

          <Route
            path="/date-time"
            element={
              <PlaceholderPage
                title="Date & Time"
                description="Date and time calculations will live here."
              />
            }
          />

          <Route
            path="/history"
            element={
              <PlaceholderPage
                title="History"
                description="Your calculation history will appear here."
              />
            }
          />

          <Route
            path="/saved"
            element={
              <PlaceholderPage
                title="Saved"
                description="Your saved calculations will appear here."
              />
            }
          />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;