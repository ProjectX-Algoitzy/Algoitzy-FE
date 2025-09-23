import React, { useEffect, useState, useContext } from 'react';
import * as itemS from '../RegularStudy/Styled/RegularStudy.regularstudy.attendance.styles';
import RegularStudyCheckAttendanceHistoryModal from './RegularStudy.regularstudy.checkattendancehistorymodal';
import request from '../../Api/request';
import { useParams } from 'react-router-dom';
import AttendanceModal from './RegularStudy.regularstudy.modal';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';

export default function RegularStudyAttendance() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('문제 인증');
  const [data, setData] = useState({});
  const [week, setWeek] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCertificationBtn, setShowCertificationBtn] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState(null);
  const [attendanceRequestList, setAttendanceRequestList] = useState([]);
  const [attendanceRequesterName, setAttendanceRequesterName] = useState(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [accumulatedTickets, setAccumulatedTickets] = useState(1);

  // 챌린지 보상 모드 상태
  const [isChallengeRewardMode, setIsChallengeRewardMode] = useState(false);
  const [selectedAttendances, setSelectedAttendances] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [originalAttendanceData, setOriginalAttendanceData] = useState([]);

  const { alert } = useContext(AlertContext);
  const { confirm } = useContext(ConfirmContext);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await request.get(`study/${id}/attendance`);
        if (response['isSuccess']) {
          setOriginalAttendanceData(response.result.attendanceList);
          const transformedData = transformData(response.result.attendanceList);
          setData(transformedData);
        }
      } catch (error) {
        setShowCertificationBtn(false);
        if (error?.response?.data?.code === 'NOTICE') {
          setNoticeMessage(error.response.data.message);
        }
      }
    };

    const fetchWeek = async () => {
      try {
        const response = await request.get('/week/current');
        if (response['isSuccess']) {
          setShowCertificationBtn(true);
          setWeek(response.result.week);
        } else {
          setShowCertificationBtn(false);
        }
      } catch (error) {
        if (error?.response?.data?.code === 'NOTICE') {
          setNoticeMessage(error.response.data.message);
        }
        if (error?.response?.data?.code === 'ATTENDANCE_ENDED') {
          setWeek(8);
        }
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await request.get('/member/my-info');
        if (response['isSuccess']) {
          setCurrentUser({
            handle: response.result.handle,
            name: response.result.name,
          });
        }
      } catch (error) {}
    };

    fetchAttendance();
    fetchWeek();
    fetchCurrentUser();
  }, [id]);

  useEffect(() => {
    if (originalAttendanceData.length > 0) {
      // console.log('원본 출석 데이터:', originalAttendanceData);
      const transformedData = transformData(originalAttendanceData);
      setData(transformedData);
    }
  }, [
    isChallengeRewardMode,
    selectedAttendances,
    currentUser,
    originalAttendanceData,
  ]);

  const fetchChallengeRewardLog = async () => {
    try {
      const response = await request.get('/challenge/reward/status');
      // console.log('챌린지 보상 이력 조회: ', response);
      if (response['isSuccess']) {
        setAccumulatedTickets(response.result.rewardCount);
      }
    } catch (error) {
      // console.error('챌린지 보상 이력 조회 오류', error);
    }
  };

  const fetchAttendanceRequestList = async (handle) => {
    try {
      const response = await request.get(`/attendance-request/${id}/${handle}`);
      if (response['isSuccess']) {
        setAttendanceRequestList(response.result.attendanceRequestList || []);
      }
    } catch (error) {
      // console.error('출석 요청 내역 목록 조회 오류', error);
    }
  };

  const transformData = (attendanceList) => {
    const data = {
      '문제 인증': [
        [
          '문제 인증',
          '1주차',
          '2주차',
          '3주차',
          '4주차',
          '5주차',
          '6주차',
          '7주차',
          '8주차',
        ],
      ],
      '블로그 포스팅': [
        [
          '블로그 포스팅',
          '1주차',
          '2주차',
          '3주차',
          '4주차',
          '5주차',
          '6주차',
          '7주차',
          '8주차',
        ],
      ],
      '주말 모의테스트': [
        [
          '주말 모의테스트',
          '1주차',
          '2주차',
          '3주차',
          '4주차',
          '5주차',
          '6주차',
          '7주차',
          '8주차',
        ],
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
    const filteredAttendanceList =
      isChallengeRewardMode && currentUser
        ? attendanceList.filter((item) => item.handle === currentUser.handle)
        : attendanceList;

    filteredAttendanceList.forEach(
      ({
        attendanceId,
        name,
        handle,
        problemYN,
        problemRewardYn,
        blogYN,
        blogRewardYn,
        workbookYN,
        workbookRewardYn,
        week,
      }) => {
        const uniqueKey = `${name}-${handle}`;
        if (!students[uniqueKey]) {
          students[uniqueKey] = {
            '문제 인증': Array(9).fill(''),
            '블로그 포스팅': Array(9).fill(''),
            '주말 모의테스트': Array(9).fill(''),
          };
          ['문제 인증', '블로그 포스팅', '주말 모의테스트'].forEach((key) => {
            students[uniqueKey][key][0] = (
              <div data-handle={handle}>{name}</div>
            );
          });
        }

        if (week !== null) {
          if (problemYN !== null) {
            const isSelected = selectedAttendances.some(
              (item) =>
                item.attendanceId === attendanceId &&
                item.attendanceType === 'PROBLEM'
            );

            students[uniqueKey]['문제 인증'][week] = problemYN ? (
              <itemS.IconContainer>
                <itemS.ImgIcon
                  src={
                    isChallengeRewardMode && problemRewardYn
                      ? '/img/attendanceicon.png'
                      : isChallengeRewardMode
                      ? '/img/untouched-attendance-icon.png'
                      : '/img/attendanceicon.png'
                  }
                  alt="출석"
                  style={{
                    cursor: 'default',
                  }}
                />
                {isChallengeRewardMode && problemRewardYn && (
                  <itemS.StampIcon src="/img/stamp.png" alt="스탬프" />
                )}
              </itemS.IconContainer>
            ) : (
              <itemS.ImgIcon
                src={
                  isSelected
                    ? '/img/checknoattendanceicon.png'
                    : '/img/noattendanceicon.png'
                }
                alt={isSelected ? '결석해제' : '결석'}
                attendanceId={attendanceId}
                style={{
                  cursor: isChallengeRewardMode ? 'pointer' : 'default',
                }}
                onClick={
                  isChallengeRewardMode
                    ? () => handleAttendanceClick(attendanceId, 'PROBLEM')
                    : undefined
                }
              />
            );
          }

          if (blogYN !== null) {
            const isSelected = selectedAttendances.some(
              (item) =>
                item.attendanceId === attendanceId &&
                item.attendanceType === 'BLOG'
            );

            students[uniqueKey]['블로그 포스팅'][week] = blogYN ? (
              <itemS.IconContainer>
                <itemS.ImgIcon
                  src={
                    isChallengeRewardMode && blogRewardYn
                      ? '/img/attendanceicon.png'
                      : isChallengeRewardMode
                      ? '/img/untouched-attendance-icon.png'
                      : '/img/attendanceicon.png'
                  }
                  alt="출석"
                  style={{
                    cursor: 'default',
                  }}
                />
                {isChallengeRewardMode && blogRewardYn && (
                  <itemS.StampIcon src="/img/stamp.png" alt="스탬프" />
                )}
              </itemS.IconContainer>
            ) : (
              <itemS.ImgIcon
                src={
                  isSelected
                    ? '/img/checknoattendanceicon.png'
                    : '/img/noattendanceicon.png'
                }
                alt={isSelected ? '결석해제' : '결석'}
                attendanceId={attendanceId}
                style={{
                  cursor: isChallengeRewardMode ? 'pointer' : 'default',
                }}
                onClick={
                  isChallengeRewardMode
                    ? () => handleAttendanceClick(attendanceId, 'BLOG')
                    : undefined
                }
              />
            );
          }

          if (workbookYN !== null) {
            const isSelected = selectedAttendances.some(
              (item) =>
                item.attendanceId === attendanceId &&
                item.attendanceType === 'WORKBOOK'
            );

            students[uniqueKey]['주말 모의테스트'][week] = workbookYN ? (
              <itemS.IconContainer>
                <itemS.ImgIcon
                  src={
                    isChallengeRewardMode && workbookRewardYn
                      ? '/img/attendanceicon.png'
                      : isChallengeRewardMode
                      ? '/img/untouched-attendance-icon.png'
                      : '/img/attendanceicon.png'
                  }
                  alt="출석"
                  style={{
                    cursor: 'default',
                  }}
                />
                {isChallengeRewardMode && workbookRewardYn && (
                  <itemS.StampIcon src="/img/stamp.png" alt="스탬프" />
                )}
              </itemS.IconContainer>
            ) : (
              <itemS.ImgIcon
                src={
                  isSelected
                    ? '/img/checknoattendanceicon.png'
                    : '/img/noattendanceicon.png'
                }
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
      }
    );

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
      return React.Children.map(element.props.children, (child) =>
        typeof child === 'string' ? child : ''
      ).join('');
    }
    return '';
  };

  const getHandle = (element) => {
    return element?.props?.['data-handle'] || null;
  };

  const Table = ({ currentTab, onArrowClick, data }) => (
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
                        const extractedText = extractText(
                          data[currentTab][rowIndex][0]
                        );
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
                      src="/img/tablearrowleft.png"
                      style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        left: 8,
                        width: '0.274rem',
                        height: '0.484rem',
                        marginTop: '0.208rem',
                      }}
                      alt="왼쪽"
                      onClick={() => onArrowClick('prev')}
                    />
                    <span>{currentTab}</span>
                    <img
                      src="/img/tablearrowright.png"
                      style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        right: 8,
                        width: '0.274rem',
                        height: '0.484rem',
                        marginTop: '0.208rem',
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
      direction === 'next'
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;
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

  const toggleChallengeRewardMode = () => {
    const newMode = !isChallengeRewardMode;
    setIsChallengeRewardMode(newMode);

    if (newMode) {
      fetchChallengeRewardLog();
    } else {
      setSelectedAttendances([]);
    }
  };

  const handleAttendanceClick = (attendanceId, attendanceType) => {
    // console.log('아이콘 클릭:', { attendanceId, attendanceType });
    // console.log('현재 선택된 항목들:', selectedAttendances);

    if (accumulatedTickets <= 0) {
      alert('교환권이 부족합니다.');
      return;
    }

    setSelectedAttendances((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.attendanceId === attendanceId &&
          item.attendanceType === attendanceType
      );

      if (existingIndex !== -1) {
        // console.log('항목 제거:', { attendanceId, attendanceType });
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        if (prev.length >= accumulatedTickets) {
          alert('교환권이 부족합니다.');
          return prev;
        }
        // console.log('항목 추가:', { attendanceId, attendanceType });
        return [...prev, { attendanceId, attendanceType }];
      }
    });
  };

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

        // console.log('챌린지 보상 요청 데이터:', requestData);
        // console.log('선택된 출석 항목들:', selectedAttendances);

        const response = await request.post('/challenge/reward', requestData);

        if (response['isSuccess']) {
          alert('챌린지 보상이 적용되었습니다.');
          setSelectedAttendances([]);
          setIsChallengeRewardMode(false);

          const attendanceResponse = await request.get(
            `study/${id}/attendance`
          );
          if (attendanceResponse['isSuccess']) {
            setOriginalAttendanceData(attendanceResponse.result.attendanceList);
          }

          fetchChallengeRewardLog();
        }
      } catch (error) {
        // console.error('챌린지 보상 적용 오류:', error);
        // console.error('에러 응답:', error.response);
        // if (error.response && error.response.data) {
        //   console.error('서버 응답 데이터:', error.response.data);
        //   console.error('서버 에러 메시지:', error.response.data.message);
        //   console.error('서버 에러 코드:', error.response.data.code);
        // }
        alert('챌린지 보상 적용 중 오류가 발생했습니다.');
      }
    }
  };

  // 출석부 데이터가 정상적으로 있는지 확인
  const hasValidAttendanceData = Object.keys(data).length > 0 && !noticeMessage;

  return (
    <itemS.Container>
      <itemS.Title>출석부</itemS.Title>

      {/* 정상적인 데이터가 있고 챌린지 보상 모드가 아닐 때만 표시 */}
      {!isChallengeRewardMode && hasValidAttendanceData && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '0.167rem',
          }}
        >
          <itemS.BlueComment>
            *이름을 클릭하면 주차별 출석 인증 내역을 확인할 수 있습니다.
          </itemS.BlueComment>
          <itemS.GrayBox
            style={{
              textDecorationLBlueCommentine: 'underline',
              cursor: 'pointer',
            }}
            onClick={toggleChallengeRewardMode}
          >
            챌린지 보상 사용하기
          </itemS.GrayBox>
        </div>
      )}

      {/* 챌린지 보상 모드일 때만 표시 */}
      {isChallengeRewardMode && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '0.625rem',
            marginBottom: '0.583rem',
          }}
        >
          <itemS.BlueComment>
            *출석부의 [X]를 클릭하여 챌린지 보상을 사용할 수 있습니다.
          </itemS.BlueComment>
          <itemS.TicketContainer>
            <itemS.TicketBox>
              <itemS.TicketIcon src="/img/changeticket.png" alt="교환권" />
              <itemS.TicketCount>{accumulatedTickets}</itemS.TicketCount>
              <itemS.Tooltip className="tooltip">챌린지 교환권</itemS.Tooltip>
            </itemS.TicketBox>
          </itemS.TicketContainer>
        </div>
      )}

      {/* 테이블 또는 에러 메시지 표시 */}
      {hasValidAttendanceData ? (
        <Table
          currentTab={currentTab}
          onArrowClick={handleArrowClick}
          data={data}
        />
      ) : (
        <itemS.CanNotEnterContainer>{noticeMessage}</itemS.CanNotEnterContainer>
      )}

      {/* 버튼 영역 */}
      <itemS.BtnContainer>
        {showCertificationBtn &&
          !isChallengeRewardMode &&
          hasValidAttendanceData && (
            <itemS.ApiTriggerBtn onClick={openAuthModal}>
              출석 인증하기
            </itemS.ApiTriggerBtn>
          )}
        {isChallengeRewardMode && (
          <>
            <itemS.PreviousBtn onClick={toggleChallengeRewardMode}>
              목록으로 돌아가기
            </itemS.PreviousBtn>
            <itemS.ApiTriggerBtn onClick={applyChallengeReward}>
              적용하기
            </itemS.ApiTriggerBtn>
          </>
        )}
      </itemS.BtnContainer>

      {showAuthModal && (
        <AttendanceModal week={week} onClose={closeAuthModal} />
      )}
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
