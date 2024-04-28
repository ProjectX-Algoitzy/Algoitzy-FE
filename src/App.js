import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Home from "./APP/sharing-pages/Home"
import Login from "./APP/user-pages/Auth/Auth.login"
import Signup from "./APP/user-pages/SignUp/SignUp.signup"
import WritingApplication from "./APP/user-pages/WritingApplication/WritingApplication.writingapplication"
import Header from "./APP/components/Header/Header.header"
import Footer from "./APP/components/Footer/Footer.footer"
import styled from "styled-components"
import StudyList from "./APP/user-pages/StudyList/StudyList.studylist"

const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
`;

function App() {
  return (
    <Root>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/writingapplication" element={<WritingApplication />}/>
          <Route path="/studylist" element={<StudyList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Root>
  );
}

export default App;
