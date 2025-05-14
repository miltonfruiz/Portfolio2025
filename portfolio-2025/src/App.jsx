import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Presentation from "./pages/Presentation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Presentation />} />
      </Routes>
    </Router>
  );
}

export default App;
