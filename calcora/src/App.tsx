import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home/Home";
import CalculatorPage from "./pages/Calculator/Calculator";
import Scientific from "./pages/Scientific/Scientific";
import Finance from "./pages/Finance/Finance";
import Converter from "./pages/Converter/Converter";
import Geometry from "./pages/Geometry/Geometry"; 
import Statistics from "./pages/Statistics/Statistics";
import DateTime from "./pages/DateTime/DateTime";

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

          <Route path="/geometry" element={<Geometry />} />

          <Route path="/statistics" element={<Statistics />} />

          <Route path="/date-time" element={<DateTime />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;