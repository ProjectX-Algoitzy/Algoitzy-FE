import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Home from "./APP/sharing-pages/Home"
import Login from "./APP/sharing-pages/Login"
import Signup from "./APP/user-pages/SignUp/SignUp.signup"
import Header from "./APP/components/Header"

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
