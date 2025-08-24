import React, {useContext, useEffect, useState} from 'react';
import * as itemS from '../RegularStudy/Styled/RegularStudy.regularstudy.attendance.styles';
import RegularStudyCheckAttendanceHistoryModal from './RegularStudy.regularstudy.checkattendancehistorymodal';
import request from '../../Api/request';
import {useParams} from 'react-router-dom';
import AttendanceModal from './RegularStudy.regularstudy.modal';
import {AlertContext} from '../../Common/Alert/AlertContext';
import {ConfirmContext} from '../../Common/Confirm/ConfirmContext';

export default function RegularStudyAttendance() {
    const {id} = useParams(); //해당 스터디의 ID를 받아온다
    const [currentTab, setCurrentTab] = useState('문제 인증');
    const [data, setData] = useState({}); // 초기 데이터 상태를 빈 객체로 설정
    const [week, setWeek] = useState(0);
    const [showAuthModal, setShowAuthModal] = useState(false); // 출석 인증을 위한 모달창
    const [showCertificationBtn, setShowCertificationBtn] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState(null);
    const [attendanceRequestList, setAttendanceRequestList] = useState([]);
    const [attendanceRequesterName, setAttendanceRequesterName] = useState(null);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false); // 출석부 인증내역 조회를 위한 모달창
    const [accumulatedTickets, setAccumulatedTickets] = useState(1); // 누적 교환권 관련 state

    // 챌린지 보상 모드 상태 추가
    const [isChallengeRewardMode, setIsChallengeRewardMode] = useState(false);

    // 선택된 출석 아이템들을 관리하는 state (attendanceId와 attendanceType을 저장)
    const [selectedAttendances, setSelectedAttendances] = useState([]);

    // 현재 사용자 정보
    const [currentUser, setCurrentUser] = useState(null);

    const {alert} = useContext(AlertContext);
    const {confirm} = useContext(ConfirmContext);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await request.get(`study/${id}/attendance`);
                // console.log("정규스터디 출석부 조회: ", response);

                if (response['isSuccess']) {
                    setOriginalAttendanceData(response.result.attendanceList);
                    const transformedData = transformData(response.result.attendanceList);
                    setData(transformedData);
                    console.log('정규스터디 출석부 성공');
                }
            } catch (error) {
                console.error('정규스터디 출석부 조회 오류', error);
                setShowCertificationBtn(false);
                if (error?.response?.data?.code === 'NOTICE') {
                    setNoticeMessage(error.response.data.message);
                }
            }
        };

        const fetchWeek = async () => {
            try {
                const response = await request.get('/week/current');
                // console.log("현재 주차 정보 조회: ", response);
                if (response['isSuccess']) {
                    setShowCertificationBtn(true);
                    setWeek(response.result.week);
                } else {
                    setShowCertificationBtn(false);
                }
            } catch (error) {
                console.error('현재 주차 정보 조회 실패: ', error);
                if (error?.response?.data?.code === 'NOTICE') {
                    setNoticeMessage(error.response.data.message);
                }
                if (error?.response?.data?.code === 'ATTENDANCE_ENDED') {
                    setWeek(8);
                }
            }
        };

        // 현재 사용자 정보 조회
        const fetchCurrentUser = async () => {
            try {
                const response = await request.get('/member/my-info');
                if (response['isSuccess']) {
                    setCurrentUser({
                        handle: response.result.handle,
                        name: response.result.name,
                    });
                }
            } catch (error) {
                console.error('사용자 정보 조회 오류', error);
            }
        };

        fetchAttendance();
        fetchWeek();
        fetchCurrentUser();
    }, [id]);

    // 원본 출석 데이터를 저장하기 위한 state
    const [originalAttendanceData, setOriginalAttendanceData] = useState([]);

    // 출석 데이터가 변경되거나 챌린지 모드/선택 항목이 변경될 때마다 테이블 업데이트
    useEffect(() => {
        if (originalAttendanceData.length > 0) {
            const transformedData = transformData(originalAttendanceData);
            setData(transformedData);
        }
    }, [isChallengeRewardMode, selectedAttendances, currentUser, originalAttendanceData]);

    // 챌린지 보상 이력 조회 API
    const fetchChallengeRewardLog = async () => {
        try {
            const response = await request.get('/challenge/reward/log?logType=ACQUIRED');
            console.log('챌린지 보상 이력 조회: ', response);

            if (response['isSuccess']) {
                setAccumulatedTickets(response.result.totalCount);
            }
        } catch (error) {
            console.error('챌린지 보상 이력 조회 오류', error);
        }
    };

    const fetchAttendanceRequestList = async (handle) => {
        try {
            const response = await request.get(`/attendance-request/${id}/${handle}`);
            // console.log("출석 요청 내역 목록 조회: ", response);

            if (response['isSuccess']) {
                setAttendanceRequestList(response.result.attendanceRequestList || []);
            }
        } catch (error) {
            console.error('출석 요청 내역 목록 조회 오류', error);
        }
    };

    const transformData = (attendanceList) => {
        const data = {
            '문제 인증': [['문제 인증', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차']],
            '블로그 포스팅': [
                ['블로그 포스팅', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차'],
            ],
            '주말 모의테스트': [
                ['주말 모의테스트', '1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차'],
            ],
        };

        if (attendanceList.length === 0) {
            Object.keys(data).forEach((key) => {
                const emptyRow = Array(data[key][0].length).fill('');
                emptyRow[0] = '학생이 없습니다';
                data[key].push(emptyRow);
            });
            return data;
        }

        const students = {};

        // 챌린지 보상 모드일 때는 현재 사용자만 필터링
        const filteredAttendanceList =
            isChallengeRewardMode && currentUser
                ? attendanceList.filter((item) => item.handle === currentUser.handle)
                : attendanceList;

        filteredAttendanceList.forEach(({attendanceId, name, handle, problemYN, blogYN, workbookYN, week}) => {
            const uniqueKey = `${name}-${handle}`;
            if (!students[uniqueKey]) {
                students[uniqueKey] = {
                    '문제 인증': Array(9).fill(''),
                    '블로그 포스팅': Array(9).fill(''),
                    '주말 모의테스트': Array(9).fill(''),
                };
                ['문제 인증', '블로그 포스팅', '주말 모의테스트'].forEach((key) => {
                    students[uniqueKey][key][0] = (
                        <div data-handle={handle}>
                            {' '}
                            {/* handle을 데이터 속성으로 저장 (표시 X) */}
                            {name}
                        </div>
                    );
                });
            }

            // week와 YN 필드들이 null인 경우 빈 값 유지
            if (week !== null) {
                if (problemYN !== null) {
                    const isSelected = selectedAttendances.some(
                        (item) => item.attendanceId === attendanceId && item.attendanceType === 'PROBLEM'
                    );

                    students[uniqueKey]['문제 인증'][week] = problemYN ? (
                        <itemS.ImgIcon src="/img/attendanceicon.png" alt="출석" />
                    ) : (
                        <itemS.ImgIcon
                            src={isSelected ? '/img/checkattendanceicon.png' : '/img/noattendanceicon.png'}
                            alt={isSelected ? '결석해제' : '결석'}
                            attendanceId={attendanceId}
                            style={{
                                cursor: isChallengeRewardMode ? 'pointer' : 'default',
                            }}
                            onClick={
                                isChallengeRewardMode ? () => handleAttendanceClick(attendanceId, 'PROBLEM') : undefined
                            }
                        />
                    );
                }

                if (blogYN !== null) {
                    const isSelected = selectedAttendances.some(
                        (item) => item.attendanceId === attendanceId && item.attendanceType === 'BLOG'
                    );

                    students[uniqueKey]['블로그 포스팅'][week] = blogYN ? (
                        <itemS.ImgIcon src="/img/attendanceicon.png" alt="출석" />
                    ) : (
                        <itemS.ImgIcon
                            src={isSelected ? '/img/checkattendanceicon.png' : '/img/noattendanceicon.png'}
                            alt={isSelected ? '결석해제' : '결석'}
                            attendanceId={attendanceId}
                            style={{
                                cursor: isChallengeRewardMode ? 'pointer' : 'default',
                            }}
                            onClick={
                                isChallengeRewardMode ? () => handleAttendanceClick(attendanceId, 'BLOG') : undefined
                            }
                        />
                    );
                }

                if (workbookYN !== null) {
                    const isSelected = selectedAttendances.some(
                        (item) => item.attendanceId === attendanceId && item.attendanceType === 'WORKBOOK'
                    );

                    students[uniqueKey]['주말 모의테스트'][week] = workbookYN ? (
                        <itemS.ImgIcon src="/img/attendanceicon.png" alt="출석" />
                    ) : (
                        <itemS.ImgIcon
                            src={isSelected ? '/img/checkattendanceicon.png' : '/img/noattendanceicon.png'}
                            alt={isSelected ? '결석해제' : '결석'}
                            attendanceId={attendanceId}
                            style={{
                                cursor: isChallengeRewardMode ? 'pointer' : 'default',
                            }}
                            onClick={
                                isChallengeRewardMode
                                    ? () => handleAttendanceClick(attendanceId, 'WORKBOOK')
                                    : undefined
                            }
                        />
                    );
                }
            }
        });

        Object.keys(students).forEach((uniqueKey) => {
            data['문제 인증'].push(students[uniqueKey]['문제 인증']);
            data['블로그 포스팅'].push(students[uniqueKey]['블로그 포스팅']);
            data['주말 모의테스트'].push(students[uniqueKey]['주말 모의테스트']);
        });

        return data;
    };

    const extractText = (element) => {
        if (typeof element === 'string') return element;
        if (React.isValidElement(element)) {
            return React.Children.map(element.props.children, (child) => (typeof child === 'string' ? child : '')).join(
                ''
            );
        }
        return '';
    };

    const getHandle = (element) => {
        return element?.props?.['data-handle'] || null;
    };

    const Table = ({currentTab, onArrowClick, data}) => (
        <itemS.StyledTable>
            <tbody>
                {data[currentTab]?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <itemS.StyledTd
                                key={colIndex}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                onClick={
                                    rowIndex !== 0 && colIndex === 0 && !isChallengeRewardMode
                                        ? () => {
                                              setIsHistoryModalOpen(true);
                                              const extractedText = extractText(data[currentTab][rowIndex][0]);
                                              const handle = getHandle(data[currentTab][rowIndex][0]);
                                              fetchAttendanceRequestList(handle);
                                              handleName(extractedText);
                                          }
                                        : undefined
                                }
                            >
                                {rowIndex === 0 && colIndex === 0 ? (
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <img
                                            src="/img/tablearrow.png"
                                            style={{
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                left: 0,
                                                width: '0.458rem',
                                                height: '0.458rem',
                                                marginTop: '0.208rem',
                                                marginLeft: '0.458rem',
                                            }}
                                            alt="왼쪽"
                                            onClick={() => onArrowClick('prev')}
                                        />
                                        <span>{currentTab}</span>
                                        <img
                                            src="/img/tablearrow.png"
                                            style={{
                                                rotate: '180deg',
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                right: 0,
                                                width: '0.458rem',
                                                height: '0.458rem',
                                                marginTop: '0.208rem',
                                                marginRight: '0.458rem',
                                            }}
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

    const handleArrowClick = (direction) => {
        const tabs = Object.keys(data);
        const currentIndex = tabs.indexOf(currentTab);
        const newIndex =
            direction === 'next' ? (currentIndex + 1) % tabs.length : (currentIndex - 1 + tabs.length) % tabs.length;
        setCurrentTab(tabs[newIndex]);
    };

    const openAuthModal = () => {
        setShowAuthModal(true);
    };

    const closeAuthModal = () => {
        setShowAuthModal(false);
    };

    const handleCloseHistoryModal = () => setIsHistoryModalOpen(false);
    const handleName = (name) => {
        setAttendanceRequesterName(name);
    };

    // 챌린지 보상 모드 토글 함수
    const toggleChallengeRewardMode = () => {
        const newMode = !isChallengeRewardMode;
        setIsChallengeRewardMode(newMode);

        // 챌린지 보상 모드가 활성화될 때 API 호출
        if (newMode) {
            fetchChallengeRewardLog();
        } else {
            // 모드가 비활성화될 때 선택된 항목들 초기화
            setSelectedAttendances([]);
        }
    };

    // 출석 아이콘 클릭 핸들러
    const handleAttendanceClick = (attendanceId, attendanceType) => {
        // 교환권이 부족한 경우 체크
        if (accumulatedTickets <= 0) {
            alert('교환권이 부족합니다.');
            return;
        }

        setSelectedAttendances((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.attendanceId === attendanceId && item.attendanceType === attendanceType
            );

            if (existingIndex !== -1) {
                // 이미 선택된 항목이면 제거
                return prev.filter((_, index) => index !== existingIndex);
            } else {
                // 새로운 항목 추가 (교환권 개수만큼만 선택 가능)
                if (prev.length >= accumulatedTickets) {
                    alert('교환권이 부족합니다.');
                    return prev;
                }
                return [...prev, {attendanceId, attendanceType}];
            }
        });
    };

    // 챌린지 보상 적용 함수
    const applyChallengeReward = async () => {
        if (selectedAttendances.length === 0) {
            alert('선택된 출석 항목이 없습니다.');
            return;
        }

        const confirmation = await confirm(
            `${selectedAttendances.length}개의 챌린지 보상을 사용하시겠습니까? 적용 후에는 취소가 불가능합니다.`
        );

        if (confirmation) {
            try {
                const requestData = {
                    requestList: selectedAttendances,
                };

                console.log('챌린지 보상 요청 데이터:', requestData);
                console.log('선택된 출석 항목들:', selectedAttendances);

                const response = await request.post('/challenge/reward', requestData);

                if (response['isSuccess']) {
                    alert('챌린지 보상이 적용되었습니다.');
                    // 적용 후 상태 초기화 및 데이터 새로고침
                    setSelectedAttendances([]);
                    setIsChallengeRewardMode(false);

                    // 출석부 데이터 새로고침
                    const attendanceResponse = await request.get(`study/${id}/attendance`);
                    if (attendanceResponse['isSuccess']) {
                        setOriginalAttendanceData(attendanceResponse.result.attendanceList);
                    }

                    // 교환권 수량 새로고침
                    fetchChallengeRewardLog();
                }
            } catch (error) {
                console.error('챌린지 보상 적용 오류:', error);
                alert('챌린지 보상 적용 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <itemS.Container>
            <itemS.Title>출석부</itemS.Title>
            {!isChallengeRewardMode && (
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <itemS.BlueComment>*이름을 클릭하면 주차별 출석 인증 내역을 확인할 수 있습니다.</itemS.BlueComment>
                    <itemS.BlueComment
                        style={{textDecorationLine: 'underline', cursor: 'pointer'}}
                        onClick={toggleChallengeRewardMode}
                    >
                        챌린지 보상 사용하기
                    </itemS.BlueComment>
                </div>
            )}

            {/* 챌린지 보상 모드일 때만 표시되는 영역 */}
            {isChallengeRewardMode && (
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <itemS.BlueComment>*출석부의 [X]를 클릭하여 챌린지 보상을 사용할 수 있습니다.</itemS.BlueComment>

                    {/* 누적 교환권 표시 */}
                    <itemS.TicketContainer>
                        <itemS.TicketBox>
                            <itemS.TicketIcon src="/img/changeticket.png" alt="교환권" />
                            <itemS.TicketText>누적 교환권</itemS.TicketText>
                            <itemS.TicketCount>: {accumulatedTickets}</itemS.TicketCount>
                        </itemS.TicketBox>
                    </itemS.TicketContainer>
                </div>
            )}

            {Object.keys(data).length > 0 ? (
                <Table currentTab={currentTab} onArrowClick={handleArrowClick} data={data} />
            ) : (
                <itemS.CanNotEnterContainer>{noticeMessage}</itemS.CanNotEnterContainer>
            )}

            <itemS.BtnContainer>
                {showCertificationBtn && !isChallengeRewardMode && (
                    <itemS.CertificationBtn onClick={openAuthModal}>출석 인증하기</itemS.CertificationBtn>
                )}
                {isChallengeRewardMode && (
                    <itemS.CertificationBtn onClick={applyChallengeReward}>적용하기</itemS.CertificationBtn>
                )}
            </itemS.BtnContainer>

            {showAuthModal && <AttendanceModal week={week} onClose={closeAuthModal} />}
            {isHistoryModalOpen && (
                <RegularStudyCheckAttendanceHistoryModal
                    currentWeek={week}
                    attendanceRequesterName={attendanceRequesterName}
                    attendanceRequestList={attendanceRequestList}
                    onClose={handleCloseHistoryModal}
                />
            )}
        </itemS.Container>
    );
}
