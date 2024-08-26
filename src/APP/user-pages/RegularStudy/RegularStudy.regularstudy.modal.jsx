import React, { useContext, useState } from 'react';
import * as itemS from './Styled/RegularStudy.regularstudy.modal.styles';
import request from '../../Api/request';
import { useParams } from 'react-router-dom';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';

export default function AttendanceModal({ week, onClose }) {
    const { id } = useParams(); // 스터디 id이다
    const [problemItems, setProblemItems] = useState([
        { id: 1, title: '' }
    ]);
    const [blogUrl, setBlogUrl] = useState('');
    const { alert } = useContext(AlertContext);
    const { confirm } = useContext(ConfirmContext);

    const handleCloseModal = () => {
        onClose(); // 모달 닫기
    };

    const handleAddProblemItem = () => {
        // 새로운 문제 인증 항목 추가
        const nextId = problemItems.length + 1;
        setProblemItems([...problemItems, { id: nextId, title: '' }]);
    };

    const handleProblemTitleChange = (id, newTitle) => {
        setProblemItems(problemItems.map(item => 
            item.id === id ? { ...item, title: newTitle } : item
        ));
    };

    const handleBlogUrlChange = (e) => {
        setBlogUrl(e.target.value);
    };

    const handleSubmit = async () => {
        const confirmation = await confirm("인증정보를 올리시겠습니까?");
        if(confirmation) {
            try {
                const problemUrlList = problemItems.map(item => item.title);
                const response = await request.post('/attendance-request', {
                    studyId: parseInt(id),
                    problemUrlList: problemUrlList,
                    blogUrl: blogUrl
                });
                if (response["isSuccess"]) {
                    console.log('출석 인증 요청 성공:', response.data);
                    alert("출석 인증 요청에 성공했습니다.");
                    onClose(); // 성공 시 모달 닫기
                }
            } catch (error) {
                console.error('출석 인증 요청 실패:', error);
                alert(error.response.data.result.problemUrlListValidate);
            }
        }
    };

    return (
        <itemS.ModalOverlay onClick={handleCloseModal}>
            <itemS.ModalContent onClick={(e) => e.stopPropagation()}>
                <itemS.FirstSentence>
                    <itemS.BigTitle>{week}주차 출석 인증</itemS.BigTitle>
                    <img src="/img/imgX.png" alt="X" onClick={handleCloseModal} style={{width:"20px", height:"20px", marginRight:"30px", cursor:"pointer"}} />
                </itemS.FirstSentence>

                <itemS.ContentContainer>
                    {problemItems.map((item) => (
                        <itemS.LittleContainer key={item.id}>
                            <itemS.SmallTitle>문제 인증({item.id})</itemS.SmallTitle>
                            <itemS.StyledInputContainer>
                                <itemS.LinkImg src="/img/imglink.png" alt="클립" />
                                <itemS.StyledInput 
                                    type="text" 
                                    value={item.title} 
                                    onChange={(e) => handleProblemTitleChange(item.id, e.target.value)} 
                                />
                            </itemS.StyledInputContainer>
                        </itemS.LittleContainer>
                    ))}

                    <img 
                        src='/img/btnadd.png' 
                        style={{ marginBottom: "32px", width:"31.38rem", cursor: "pointer" }} 
                        onClick={handleAddProblemItem} 
                    />

                    <itemS.LittleContainer>
                        <itemS.SmallTitle>블로그 url</itemS.SmallTitle>
                        <itemS.StyledInputContainer>
                            <itemS.LinkImg src="/img/imglink.png" alt="클립" />
                            <itemS.StyledInput 
                                type="text" 
                                value={blogUrl} 
                                onChange={handleBlogUrlChange} 
                            />
                        </itemS.StyledInputContainer>
                    </itemS.LittleContainer>

                    <itemS.BtnContainer>
                        <itemS.Btn onClick={handleSubmit}>인증 정보 올리기</itemS.Btn>
                    </itemS.BtnContainer>
                </itemS.ContentContainer>
            </itemS.ModalContent>
        </itemS.ModalOverlay>
    );
}