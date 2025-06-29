import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Presentation from "./pages/Presentation";
import BackgroundMusic from "./components/BackgroundMusic/BackgroundMusic";

function App() {
  return (
    <Router>
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Presentation />} />
      </Routes>
    </Router>
  );
}

export default App;
