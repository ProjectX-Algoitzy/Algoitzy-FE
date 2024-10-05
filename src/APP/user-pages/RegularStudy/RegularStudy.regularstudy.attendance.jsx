import React, { useEffect, useState } from 'react'
import * as itemS from "../RegularStudy/Styled/RegularStudy.regularstudy.attendance.styles"
import request from '../../Api/request';
import { useParams } from 'react-router-dom';
import AttendanceModal from './RegularStudy.regularstudy.modal';

// API로부터 받은 데이터를 변환하는 함수
// const transformData = (attendanceList) => {
//   const data = {
//     '문제 인증': [['문제 인증', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차']],
//     '블로그 포스팅': [['블로그 포스팅', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차']],
//     '주말 모의테스트': [['주말 모의테스트', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차']]
//   };

//   if (attendanceList.length === 0) {
//     Object.keys(data).forEach(key => {
//       const emptyRow = Array(data[key][0].length).fill("");
//       emptyRow[0] = "학생이 없습니다";
//       data[key].push(emptyRow);
//     });
//     return data;
//   }

//   const students = {};

//   attendanceList.forEach(({ name, problemYN, blogYN, workbookYN, week }) => {
//     if (!students[name]) {
//       students[name] = {
//         '문제 인증': Array(9).fill(""),
//         '블로그 포스팅': Array(9).fill(""),
//         '주말 모의테스트': Array(9).fill("")
//       };
//       students[name]['문제 인증'][0] = name;
//       students[name]['블로그 포스팅'][0] = name;
//       students[name]['주말 모의테스트'][0] = name;
//     }

//     if (problemYN){
//       students[name]['문제 인증'][week] = <itemS.ImgIcon src='/img/attendanceicon.png' alt="출석" />;
//     }  else {
//       students[name]['문제 인증'][week] = <itemS.ImgIcon src='/img/noattendanceicon.png' alt="결석" />;
//     }
//     if (blogYN) {
//       students[name]['블로그 포스팅'][week] = <itemS.ImgIcon src='/img/attendanceicon.png' alt="출석" />;
//     } else {
//       students[name]['블로그 포스팅'][week] = <itemS.ImgIcon src='/img/noattendanceicon.png' alt="결석" />;
//     }
//     if (workbookYN) {
//       students[name]['주말 모의테스트'][week] = <itemS.ImgIcon src='/img/attendanceicon.png' alt="출석" />;
//     } else {
//       students[name]['주말 모의테스트'][week] = <itemS.ImgIcon src='/img/noattendanceicon.png' alt="결석" />;
//     }
//   });

//   Object.keys(students).forEach(name => {
//     data['문제 인증'].push(students[name]['문제 인증']);
//     data['블로그 포스팅'].push(students[name]['블로그 포스팅']);
//     data['주말 모의테스트'].push(students[name]['주말 모의테스트']);
//   });

//   return data;
// }; // 여기 주석처리되어있는데, 아직 지우지 말아주세요... (민중원)
const transformData = (attendanceList) => {
  console.log("attendanceList: ", attendanceList);
  const data = {
    '문제 인증': [['문제 인증', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차']],
    '블로그 포스팅': [['블로그 포스팅', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차']],
    '주말 모의테스트': [['주말 모의테스트', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차']]
  };

  if (attendanceList.length === 0) {
    Object.keys(data).forEach(key => {
      const emptyRow = Array(data[key][0].length).fill("");
      emptyRow[0] = "학생이 없습니다";
      data[key].push(emptyRow);
    });
    return data;
  }

  const students = {};

  attendanceList.forEach(({ name, problemYN, blogYN, workbookYN, week }) => {
    if (!students[name]) {
      students[name] = {
        '문제 인증': Array(9).fill(""),
        '블로그 포스팅': Array(9).fill(""),
        '주말 모의테스트': Array(9).fill("")
      };
      students[name]['문제 인증'][0] = name;
      students[name]['블로그 포스팅'][0] = name;
      students[name]['주말 모의테스트'][0] = name;
    }

    // week와 YN 필드들이 null인 경우 빈 값 유지
    if (week !== null) {
      if (problemYN !== null) {
        students[name]['문제 인증'][week] = problemYN ? (
          <itemS.ImgIcon src='/img/attendanceicon.png' alt="출석" />
        ) : (
          <itemS.ImgIcon src='/img/noattendanceicon.png' alt="결석" />
        );
      }

      if (blogYN !== null) {
        students[name]['블로그 포스팅'][week] = blogYN ? (
          <itemS.ImgIcon src='/img/attendanceicon.png' alt="출석" />
        ) : (
          <itemS.ImgIcon src='/img/noattendanceicon.png' alt="결석" />
        );
      }

      if (workbookYN !== null) {
        students[name]['주말 모의테스트'][week] = workbookYN ? (
          <itemS.ImgIcon src='/img/attendanceicon.png' alt="출석" />
        ) : (
          <itemS.ImgIcon src='/img/noattendanceicon.png' alt="결석" />
        );
      }
    }
  });

  Object.keys(students).forEach(name => {
    data['문제 인증'].push(students[name]['문제 인증']);
    data['블로그 포스팅'].push(students[name]['블로그 포스팅']);
    data['주말 모의테스트'].push(students[name]['주말 모의테스트']);
  });

  return data;
};



const Table = ({ currentTab, onArrowClick, data }) => (
  <itemS.StyledTable>
    <tbody>
      {data[currentTab]?.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, colIndex) => (
            <itemS.StyledTd key={colIndex} rowIndex={rowIndex} colIndex={colIndex}>
              {rowIndex === 0 && colIndex === 0 ? (
                // <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                //   <img src="/img/tablearrow.png" style={{cursor:"pointer", marginLeft:"22px"}} alt="왼쪽" onClick={() => onArrowClick('prev')} />
                //   <span style={{ margin: '0 8px' }}>{currentTab}</span>
                //   <img src="/img/tablearrow.png" style={{rotate:"180deg", cursor:"pointer", marginRight:"22px"}} alt="오른쪽" onClick={() => onArrowClick('next')} />
                // </div>
                <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                <img 
                  src="/img/tablearrow.png" 
                  style={{ cursor: "pointer", position: 'absolute', left: 0,  width: "0.458rem", height: "0.458rem", marginTop:"0.208rem", marginLeft:"0.458rem" }} 
                  alt="왼쪽" 
                  onClick={() => onArrowClick('prev')} 
                />
                <span>{currentTab}</span>
                <img 
                  src="/img/tablearrow.png" 
                  style={{ rotate: "180deg", cursor: "pointer", position: 'absolute', right: 0, width: "0.458rem", height: "0.458rem", marginTop:"0.208rem", marginRight:"0.458rem" }} 
                  alt="오른쪽" 
                  onClick={() => onArrowClick('next')} 
                />
              </div>
              ) : (
                cell
              )}
            </itemS.StyledTd>
          ))}
        </tr>
      ))}
    </tbody>
  </itemS.StyledTable>
);

export default function RegularStudyAttendance() {
  const { id } = useParams(); //해당 스터디의 ID를 받아온다
  const [currentTab, setCurrentTab] = useState('문제 인증');
  const [data, setData] = useState({}); // 초기 데이터 상태를 빈 객체로 설정
  const [week, setWeek] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCertificationBtn, setShowCertificationBtn] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await request.get(`study/${id}/attendance`);
        console.log("정규스터디 출석부 조회: ", response);

        if (response["isSuccess"]) {
          const transformedData = transformData(response.result.attendanceList);
          setData(transformedData);
          console.log("정규스터디 출석부 성공");
        }
      } catch (error) {
        console.error("정규스터디 출석부 조회 오류", error);
        setShowCertificationBtn(false);
        if(error?.response?.data?.code === "NOTICE") {
          setNoticeMessage(error.response.data.message);
        }
      }
    };
    const fetchWeek = async () => {
      try {
        const response = await request.get('/week/current');
        console.log("현재 주차 정보 조회: ", response);
        if(response["isSuccess"]){
          setShowCertificationBtn(true);
          setWeek(response.result.week);
        } else {
          setShowCertificationBtn(false);
        }
      } catch (error) {
        console.error("현재 주차 정보 조회 실패: ", error);
        if(error?.response?.data?.code === "NOTICE") {
          setNoticeMessage(error.response.data.message);
        }
      }
    }
    fetchAttendance();
    fetchWeek();
  }, [id]);

  const handleArrowClick = (direction) => {
    const tabs = Object.keys(data);
    const currentIndex = tabs.indexOf(currentTab);
    const newIndex = direction === 'next' ? (currentIndex + 1) % tabs.length : (currentIndex - 1 + tabs.length) % tabs.length;
    setCurrentTab(tabs[newIndex]);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <itemS.Container>
      <itemS.Title>출석부</itemS.Title>
      {Object.keys(data).length > 0 ? (
        <Table currentTab={currentTab} onArrowClick={handleArrowClick} data={data} />
      ) : (
        <itemS.CanNotEnterContainer>{noticeMessage}</itemS.CanNotEnterContainer>
      )}
      <itemS.BtnContainer>
        {showCertificationBtn && <itemS.CertificationBtn onClick={openModal}>출석 인증하기</itemS.CertificationBtn>}
      </itemS.BtnContainer>
      {showModal && <AttendanceModal week={week} onClose={closeModal} />}
    </itemS.Container>
  )
}