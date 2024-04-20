import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Home from "./sharing-pages/Home"
import Login from "./sharing-pages/Login"
import Signup from "./user-pages/Signup"
import Header from "./components/Header"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
