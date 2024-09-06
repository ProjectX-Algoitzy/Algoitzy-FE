import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import request from '../../Api/request';
import * as itemS from "./Styled/InstitutionDetail.institutiondetail.main.styles";
import InstitutionDetailTable from './InstitutionDetail.institutiondetail.table';
import InstitutionDetailExplanation from './InstitutionDetail.institutiondetail.explanation';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.css';


export default function InstitutionDetail() {
  const { institutionId } = useParams();
  const [name, setName] = useState(''); 
  const [content, setContent] = useState(''); 
  
  const [itemList, setItemList] = useState([]); // 문제집

  const fetchWorkbookExplain = async () => {
    try {
      const response = await request.get(`/institution/${institutionId}`);

      if (response.isSuccess) {
        console.log("추천 문제집 분석 조회 성공", response);
        setName(response.result.name);
        setContent(response.result.content);
      } else {
        console.error("추천 문제집 분석 조회 실패:", response);
      }
    } catch (error) {
      console.error('추천 문제집 분석 조회 오류', error);
    }
  };

  const fetchWorkbook = async () => {
    try {
      const response = await request.get(`/institution/${institutionId}/workbook`);

      if (response.isSuccess) {
        console.log("추천 문제집 목록 조회 성공", response);
        setItemList(response.result.workbookList);
      } else {
        console.error("추천 문제집 목록 조회 실패:", response);
      }
    } catch (error) {
      console.error('추천 문제집 목록 조회 오류', error);
    }
  };
  useEffect(() => {
    fetchWorkbookExplain();
    fetchWorkbook();
  }, [institutionId]);

  useEffect(() => {
    // 코드블록에 하이라이트 적용
    if (content) {
      document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }, [content]);
  
  return (
    <itemS.OuterContainer>
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.TitleBox>
            <itemS.Title>{name}</itemS.Title>
          </itemS.TitleBox>
          <itemS.PartBox>
            <itemS.Part>코딩테스트 분석</itemS.Part>
          </itemS.PartBox>
          <InstitutionDetailExplanation
            content={content}
          />
          <itemS.PartBox>
            <itemS.Part>추천 문제집</itemS.Part>
          </itemS.PartBox>
          <InstitutionDetailTable 
            itemList={itemList} 
            fetchWorkbook={fetchWorkbook}
          />
        </itemS.InnerContainer>
      </itemS.Container>
    </itemS.OuterContainer>
  );
}
