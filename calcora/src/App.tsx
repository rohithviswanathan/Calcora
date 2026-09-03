import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home/Home";
import PlaceholderPage from "./pages/PlaceholderPage";
import CalculatorPage from "./pages/Calculator/Calculator";
import Scientific from "./pages/Scientific/Scientific";
import Finance from "./pages/Finance/Finance";
import Converter from "./pages/Converter/Converter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/calculator"
            element={<CalculatorPage />}
          />

          <Route
            path="/scientific"
            element={<Scientific />}
          />

          <Route path="/finance" element={<Finance />} />

          <Route path="/converter" element={<Converter />} />

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
                description="Your calculation history will live here."
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