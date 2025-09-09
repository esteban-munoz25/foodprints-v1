import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./layout/header";
import Carmen from "./pages/honduras";
import LandingPage from "./pages/landing";
import Haydee from "./pages/salvador";
import Wendy from "./pages/guatemala";

function App() {
  // Handle GitHub Pages redirect
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/?/")) {
      const newPath = path.replace("/?/", "/");
      window.history.replaceState({}, "", newPath);
    }
  }, []);

  return (
    <>
      <Router basename="/foodprints-v1">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/honduras" element={<Carmen />} />
          <Route path="/salvador" element={<Haydee />} />
          <Route path="/guatemala" element={<Wendy />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
