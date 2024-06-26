import React, { useState } from 'react'
import * as itemS from "../RegularStudy/Styled/RegularStudy.regularstudy.attendance.styles"
import AttendanceModal from './RegularStudy.regularstudy.modal';

export default function RegularStudyAttendance() {
  const [showModal, setShowModal] = useState(false);

  const Table = () => {
    const tableData = [
      ["주차별 출석", "1주차", "2주차", "3주차", "4주차", "5주차", "6주차", "7주차", "8주차"],
      ["문제 할당량", "", "", "", "", "", "", "", ""],
      ["블로그 포스팅", "", "", "", "", "", "", "", ""],
      ["주말 모의테스트", "", "", "", "", "", "", "", ""]
    ];
    return (
      <itemS.StyledTable>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <itemS.StyledTd key={colIndex} rowIndex={rowIndex} colIndex={colIndex}>
                  {cell}
                </itemS.StyledTd>
              ))}
            </tr>
          ))}
        </tbody>
      </itemS.StyledTable>
    );
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
      <Table />
      <itemS.BtnContainer>
        <itemS.CertificationBtn onClick={openModal}>출석 인증하기</itemS.CertificationBtn>
      </itemS.BtnContainer>
      {showModal && <AttendanceModal onClose={closeModal} />}
    </itemS.Container>
  )
}
