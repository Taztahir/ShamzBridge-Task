import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PostDetails from "./Pages/PostDetails";
import ScrollUpButton from "./ScrollUpButton";
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-orange-500 text-white selection:bg-orange-200 selection:text-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>

        <ScrollUpButton/>
      </div>
    </Router>
  );
}

export default App;
