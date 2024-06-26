import React, { useState } from 'react';
import * as itemS from './Styled/RegularStudy.regularstudy.modal.styles';

export default function AttendanceModal({ onClose }) {
    const [problemItems, setProblemItems] = useState([
        { id: 1, title: '문제 url' }
    ]);

    const handleCloseModal = () => {
        onClose(); // 모달 닫기
    };

    const handleAddProblemItem = () => {
        // 새로운 문제 인증 항목 추가
        const nextId = problemItems.length + 1;
        setProblemItems([...problemItems, { id: nextId, title: `문제 url` }]);
    };

    return (
        <itemS.ModalOverlay onClick={handleCloseModal}>
            <itemS.ModalContent onClick={(e) => e.stopPropagation()}>
                <itemS.FirstSentence>
                    <itemS.BigTitle>1주차 출석 인증</itemS.BigTitle>
                    <itemS.CloseButton onClick={handleCloseModal}>X</itemS.CloseButton>
                </itemS.FirstSentence>

                <itemS.ContentContainer>
                    {problemItems.map((item) => (
                        <itemS.LittleContainer key={item.id}>
                            <itemS.SmallTitle>{item.title}</itemS.SmallTitle>
                            <itemS.StyledInput />
                        </itemS.LittleContainer>
                    ))}

                    <img src='/img/btnadd.png' style={{ marginBottom: "32px", width: "753px", height: "56px", cursor: "pointer" }} onClick={handleAddProblemItem} />

                    <itemS.LittleContainer>
                        <itemS.SmallTitle>블로그 url</itemS.SmallTitle>
                        <itemS.StyledInput />
                    </itemS.LittleContainer>

                    <itemS.BtnContainer>
                        <itemS.Btn>인증 정보 올리기</itemS.Btn>
                    </itemS.BtnContainer>
                </itemS.ContentContainer>
            </itemS.ModalContent>
        </itemS.ModalOverlay>
    );
}
