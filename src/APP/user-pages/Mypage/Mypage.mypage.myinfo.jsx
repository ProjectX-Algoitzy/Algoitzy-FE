import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as itemS from "./Styled/Mypage.mypage.myinfo.styles";

export default function MyInfo({
  item,
  boardCount,
  onSelectTab,
  isMemberMatch,
  isRoleAdmin,
}) {
  const navigate = useNavigate();
  const GIHO = "/<>  ";
  const [activeTab, setActiveTab] = useState("study");

  const handleRedirect = () => {
    window.location.href = item.baekjoonUrl;
  };

  const handleMyInfo = () => {
    navigate("/myinfo");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onSelectTab(tab);
  };

  useEffect(() => {
    console.log("isRoleAdmin:", isRoleAdmin);
  }, [isRoleAdmin]);

  return (
    <itemS.Container>
      <itemS.ProfileBox>
        <itemS.Profile src={item.profileUrl} alt="프로필" />
        <itemS.NameBox>
          <itemS.Name>{item.name}</itemS.Name>
          <itemS.Handle onClick={handleRedirect}>
            {GIHO}
            {item.handle}
          </itemS.Handle>
        </itemS.NameBox>
      </itemS.ProfileBox>
      <itemS.TabBtnContainer>
        <itemS.TabBox isInquiryVisible={!isRoleAdmin && isMemberMatch}>
          <itemS.Tab
            onClick={() => handleTabClick("study")}
            active={activeTab === "study"}
          >
            스터디 현황
          </itemS.Tab>
          <itemS.Tab
            onClick={() => handleTabClick("posts")}
            active={activeTab === "posts"}
          >
            커뮤니티
          </itemS.Tab>
          {!isRoleAdmin && isMemberMatch && (
            <itemS.Tab
              onClick={() => handleTabClick("inquiry")}
              active={activeTab === "inquiry"}
            >
              문의하기
            </itemS.Tab>
          )}
        </itemS.TabBox>
        {isMemberMatch && (
          <itemS.EditButton onClick={handleMyInfo}>
            내 정보 수정
          </itemS.EditButton>
        )}
      </itemS.TabBtnContainer>
    </itemS.Container>
  );
}
