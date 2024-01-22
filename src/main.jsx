import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EarthquakeDetails from "./pages/EarthquakeDetails.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/" />
        <Route element={<EarthquakeDetails />} path="/details/:id" />
      </Routes>
    </BrowserRouter>
  </ThemeContextProvider>
);
