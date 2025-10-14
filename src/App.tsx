import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PostDetails from "./Pages/PostDetails";
import ScrollUpButton from "./ScrollUpButton";
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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
