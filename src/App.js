import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Home from "./sharing-pages/Home"
import Login from "./sharing-pages/Login"
import Singup from "./user-pages/Singup"
import MakingApplicationForm from "./admin-pages/MakingApplicationForm"
import Header from "./components/Header"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/makingapplicationform" element={<MakingApplicationForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
