import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Langding from "./APP/user-pages/Langding/Langding.landing";
import Login from "./APP/user-pages/Auth/Auth.login";
import Signup from "./APP/user-pages/SignUp/SignUp.signup";
import WritingApplication from "./APP/user-pages/WritingApplication/WritingApplication.writingapplication";
import Header from "./APP/components/Header/Header.header";
import Footer from "./APP/components/Footer/Footer.footer";
import styled from "styled-components";
import StudyList from "./APP/user-pages/StudyList/StudyList.studylist";
import FindEmail from "./APP/user-pages/FindAuth/FindEmail/FindAuth.FindEmail.findemail";
import FindEmailSuccess from "./APP/user-pages/FindAuth/FindEmailSuccess/FindAuth.FindEmailSuccess";
import FindPassword from "./APP/user-pages/FindAuth/FindPassword/FindPassword.findpassword";
import MakedSelfStudyList from "./APP/user-pages/MakedSelfStudyList/MakedSelfStudyList.makedselfstudylist.main";
import MakingSelfStudy from "./APP/user-pages/MakingSelfStudy/MakingSelfStudy.makingselfstudy";
import MakingSelfStudyEditStudy from "./APP/user-pages/MakingSelfStudy/MakingSelfStudy.makingselfstudy.editstudy";
import RegularStudy from "./APP/user-pages/RegularStudy/RegularStudy.regularstudy.main";
import SelftStudyMain from "./APP/user-pages/SelfStudy/SelftStudy.selfstudy.main";
import MyStudyList from "./APP/user-pages/MyStudyList/MyStudyList.mystudylist.main";
import ApplyRegularStudy from "./APP/user-pages/ApplyRegularStudy/ApplyRegularStudy.applyregularstudy.main";
import CurriculumCheck from "./APP/user-pages/RegularStudy/RegularStudy.regularstudy.curriculumcheck";
import EnterBootList from "./APP/user-pages/EnterpriseBootcampList/EnterpriseBootcampList.enterprisebootcamplist.main";
import InstitutionDetail from "./APP/user-pages/InstitutionDetail/InstitutionDetail.institutiondetail.main";
import Noticeboard from "./APP/user-pages/Noticeboard/Noticeboard.noticeboard.main";
import NoticeboardDetail from "./APP/user-pages/NoticeboardDetail/NoticeboardDetail.noticeboarddetail.main";
import MyPage from "./APP/user-pages/Mypage/Mypage.mypage.main";
import EditMyInfo from "./APP/user-pages/EditMyInfo/EditMyInfo.editmyinfo.main";
import ScrollToTop from "./APP/Common/ScrollToTop";
import useInterval from "./APP/Common/UseInterval"
import { refreshToken } from "./APP/Api/refreshToken"
import { checkToken } from "./APP/Api/checkToken";
import { ACCESS_TOKEN } from "./APP/Api/request"
import GlobalStyle from './GlobalStyles';
import NoticeBoardFeature from "./APP/user-pages/NoticeBoardFeature";
import { useLoading } from "./APP/Common/Loading/LoadingContext";
import { setLoadingFunctions } from "./APP/Api/request";

// const Root = styled.div`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   width: 100%;
// `;


const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh; /* Root가 화면의 전체 높이를 차지하도록 설정 */
`;

const ContentWrapper = styled.div`
  padding-bottom: 9.17rem; /* 푸터 높이만큼의 여백을 추가 */
`;

function App() {
  const { showLoading, hideLoading } = useLoading(); 

  setLoadingFunctions(showLoading, hideLoading);

  useInterval(async () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const isTokenValid = await checkToken();
      if (isTokenValid) {
        await refreshToken();
      }
    }
  }, 30000);

  const isLoggedIn = () => {  //로그인 확인 유무를 토큰으로 확인하고자 했습니다
    return !!localStorage.getItem(ACCESS_TOKEN);
  };

  return (
    

    <Root>
    <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
          <Header />
          <ContentWrapper>
          <Routes>
            <Route path="/" element={<Langding />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* 모든 다른 경로는 홈으로 리다이렉트 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/writingapplication/:type/:id" element={isLoggedIn() ? <WritingApplication /> : <Navigate to="/" />}/>
            <Route path="/studylist" element={isLoggedIn() ? <StudyList /> : <Navigate to="/" />} />
            <Route path="/findemail" element={<FindEmail />} />
            <Route path="/findemailsuccess" element={<FindEmailSuccess />} />
            <Route path="/findpassword" element={<FindPassword />} />
            <Route path="/study" element={isLoggedIn() ? <MakedSelfStudyList /> : <Navigate to="/" />} />
            <Route path="/newstudy" element={isLoggedIn() ? <MakingSelfStudy /> : <Navigate to="/" />} />
            <Route path="/editstudy/:id" element={isLoggedIn() ? <MakingSelfStudyEditStudy /> : <Navigate to="/" />} />
            <Route path="/study/:id" element={isLoggedIn() ? <SelftStudyMain /> : <Navigate to="/" />} />
            <Route path="/regularstudy/:id" element={isLoggedIn() ? <RegularStudy /> : <Navigate to="/" />} />
            <Route path="/curriculumcheck/:curriculumId" element={isLoggedIn() ? <CurriculumCheck /> : <Navigate to="/" />} />
            <Route path="/mystudy" element={isLoggedIn() ? <MyStudyList /> : <Navigate to="/" />} />
            <Route path="/apply" element={isLoggedIn() ? <ApplyRegularStudy /> : <Navigate to="/" />} />
            <Route path="/enterbootlist" element={isLoggedIn() ? <EnterBootList /> : <Navigate to="/" />} />
            <Route path="/institutiondetail/:institutionId" element={isLoggedIn() ? <InstitutionDetail /> : <Navigate to="/" />} /> {/* 기업/부트캠프 상세조회 */}
            <Route path="/board" element={isLoggedIn() ? <Noticeboard /> : <Navigate to="/" />} /> {/* 게시판 */}
            <Route path="/boarddetail/:boardId" element={isLoggedIn() ? <NoticeboardDetail /> : <Navigate to="/" />} /> {/* 게시판 상세조회 */}
            <Route path="/noticeboardfeature" element={<NoticeBoardFeature />} />
            <Route path="/mypage" element={<MyPage />} /> {/* 마이페이지 */}
            <Route path="/myinfo" element={<EditMyInfo />} /> {/* 개인정보 수정 */}
          </Routes>
          </ContentWrapper>
          <Footer />
      </BrowserRouter>
    </Root>
    
  );
}

export default App;