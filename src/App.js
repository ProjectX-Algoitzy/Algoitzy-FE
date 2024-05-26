import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Langding from "./APP/user-pages/Langding/Langding.landing"
import Login from "./APP/user-pages/Auth/Auth.login"
import Signup from "./APP/user-pages/SignUp/SignUp.signup"
import WritingApplication from "./APP/user-pages/WritingApplication/WritingApplication.writingapplication"
import Header from "./APP/components/Header/Header.header"
import Footer from "./APP/components/Footer/Footer.footer"
import styled from "styled-components"
import StudyList from "./APP/user-pages/StudyList/StudyList.studylist"
import FindEmail from "./APP/user-pages/FindAuth/FindEmail/FindAuth.FindEmail.findemail"
import FindEmailSuccess from "./APP/user-pages/FindAuth/FindEmailSuccess/FindAuth.FindEmailSuccess"
import MakedSelfStudyList from "./APP/user-pages/MakedSelfStudyList/MakedSelfStudyList.makedselfstudylist.main"
import MakingSelfStudy from "./APP/user-pages/MakingSelfStudy/MakingSelfStudy.makingselfstudy"

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
          <Route path="/" element={<Langding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/writingapplication" element={<WritingApplication />}/>
          <Route path="/studylist" element={<StudyList />} />
          <Route path="/findemail" element={<FindEmail />} />
          <Route path="/findemailsuccess" element={<FindEmailSuccess />} />
          <Route path="/makedselfstudylist" element={<MakedSelfStudyList />} />
          <Route path="/makingselfstudy" element={<MakingSelfStudy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Root>
  );
}

export default App;
