import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from '../src/component/navbar/Navbar';
import Home from '../src/page/home/Home';
import Dashboard from '../src/page/dashboard/Dashboard';
import Card from "./component/card/Card";
import CreatePost from '../src/page/createpost/CreatePost';
import Register from "./page/register/Register";
import Login from '../src/page/login/Login';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:id" element={<Card />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
