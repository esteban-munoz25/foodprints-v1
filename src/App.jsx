import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/header";
import Carmen from "./pages/honduras";
import LandingPage from "./pages/landing";
import Haydee from "./pages/salvador";
import Wendy from "./pages/guatemala";

function App() {
 
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/honduras" element={<Carmen />} />
          <Route path="/salvador" element={<Haydee />} />
          <Route path="/guatemala" element={<Wendy />} />
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
