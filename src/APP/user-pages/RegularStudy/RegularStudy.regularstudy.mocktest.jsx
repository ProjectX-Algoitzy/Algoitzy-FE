import React, { useCallback, useContext, useEffect, useState } from 'react'
import * as itemS from "./Styled/RegularStudy.regularstudy.mocktest.styles"
import Select, { components } from 'react-select';
import request from '../../Api/request';
import { useParams } from 'react-router-dom';

export default function RegularStudyMocktest() {
  const { id } = useParams();
  const [week, setWeek] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(1); // 만약 기수가 다를 경우 1주차를 디폴트로
  const [weekData, setWeekData] = useState({});
  const [workbookId, setWorkbookId] = useState(null);
  const [errorMesssage, setErrorMesssage] = useState("준비 중입니다.");

  const WeeksSelect = ({ value, onChange }) => {
    const CustomDropdownIndicator = (props) => {
      return (
        <components.DropdownIndicator {...props}>
          <img src="/img/triangle.png" alt="triangle-icon" style={{ width: "1rem", height: "1rem" }} />
        </components.DropdownIndicator>
      );
    };
  
    const options = [
      { value: '1', label: '1주차' },
      { value: '2', label: '2주차' },
      { value: '3', label: '3주차' },
      { value: '4', label: '4주차' },
      { value: '5', label: '5주차' },
      { value: '6', label: '6주차' },
      { value: '7', label: '7주차' },
      { value: '8', label: '8주차' },
    ];
  
    const defaultValue = options.find(option => option.value === currentWeek?.toString()) || options[0];
  
    return (
      <itemS.WeeksSelectContainer
        options={options}
        value={value ? options.find(option => option.value === value.toString()) : defaultValue}
        onChange={selectedOption => onChange(selectedOption.value)}
        placeholder="주차 선택"
        components={{ DropdownIndicator: CustomDropdownIndicator, IndicatorSeparator: null }}
        isSearchable={false}
      />
    );
  };

  const fetchCurrentWeek = useCallback(async () => {
    try {
      const responseCurrentWeek = await request.get('/week/current');
      console.log("현재 주차 정보 조회: ", responseCurrentWeek);
      if (responseCurrentWeek.isSuccess) {
        setCurrentWeek(responseCurrentWeek.result.week); // 현재 주차 상태 업데이트
      }
    } catch (error) {
      console.error('현재 주차 정보 조회 오류: ', error);
    }
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await request.get(`/study/${id}/workbook`);
      console.log("워크북 모의테스트 조회: ", response);
      if (response.isSuccess) {
        const { workbookList } = response.result;
        const newWeekData = {};
        workbookList.forEach(workbook => {
          const { week, problemList, workbookId } = workbook;
          const problems = problemList.map(problem => ({
            id: problem.number.toString(),
            title: problem.name,
            levelImg: problem.levelUrl,
            baekjoonUrl: `https://www.acmicpc.net/problem/${problem.number}`,
            workbookId: workbookId // workbookId 추가
          }));
          newWeekData[week] = problems;

          // 현재 주차의 workbookId를 설정합니다.
          if (week === parseInt(week)) {
            setWorkbookId(workbookId);
          }
        });
        setWeekData(newWeekData);
      } else {
        console.error('API call failed:', response.message);
      }
    } catch (error) {
      console.error('API error:', error);
      if(error?.response?.data?.code === "NOTICE") {
        setErrorMesssage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCurrentWeek();  // 현재 주차를 가져오고
      fetchQuestions();  // 그 후에 문제 목록을 가져옵니다.
    };
  
    fetchData();
  }, [id]);  // id가 변경될 때마다 호출

  const hasWeekData = weekData[week] && weekData[week].length > 0;

  return (
    <itemS.Container>
      <itemS.Title>
        모의테스트
        <WeeksSelect value={week} onChange={setWeek} />
      </itemS.Title>

      {hasWeekData ? (
        <>
          <itemS.TableContainer>
            <itemS.Table>
              <itemS.TableHead>백준 번호</itemS.TableHead>
              <itemS.TableHead>제목</itemS.TableHead>
              <itemS.TableHead></itemS.TableHead>
              <itemS.TableHead>레벨</itemS.TableHead>

              {weekData[week].map((row, index) => (
                <itemS.TableRow key={index}>
                  <itemS.TableCell>{row.id}</itemS.TableCell>
                  <itemS.TableCell>
                    <a href={row.baekjoonUrl} style={{ textDecoration: 'none'}} target="_blank" rel="noopener noreferrer">{row.title}</a>
                  </itemS.TableCell>
                  <itemS.TableCell></itemS.TableCell>
                  <itemS.TableCell>
                    <img src={row.levelImg} alt="level" style={{ width: "0.813rem", height: "1.042rem", marginLeft: "0.208rem" }} />
                  </itemS.TableCell>
                </itemS.TableRow>
              ))}
            </itemS.Table>
          </itemS.TableContainer>
        </>
      ) : (
        <>
          <itemS.ComingSoonContainer>{errorMesssage}</itemS.ComingSoonContainer>
        </>
      )}
        
    </itemS.Container>
  )
}