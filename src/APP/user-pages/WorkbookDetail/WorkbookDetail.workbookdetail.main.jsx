import React, { useEffect, useState } from 'react';
import * as itemS from "./Styled/WorkbookDetail.workbookdetail.main.styles";
import request from '../../Api/request';
import TopTable from './WorkbookDetail.workbookdetail.toptable';

const WorkbookDetail = ({ workbookId, workbookName, isOpen, onClose }) => {
  const [ itemList, setItemList ] = useState([]); // 설정한 문제 목록
 
  const fetchItemList = async () => { // 설정한 문제 목록 조회
		try {
			const response = await request.get(`/workbook/${workbookId}`);
			if (response.isSuccess) {
				console.log("설정한 문제 목록 조회 성공",response);
				setItemList(response.result.problemList);
			} else {
				console.error("설정한 문제 목록 조회 실패:", response);
			}
		} catch (error) {
			console.error('설정한 문제 목록 조회 오류', error);
		}
	};

	useEffect(() => {
		fetchItemList();
	}, []);


  if (!isOpen) return null;

  return (
    <itemS.Backdrop>
      <itemS.ModalContainer>
        <itemS.TopBox>
          <itemS.Title>{workbookName}</itemS.Title>
          <itemS.Close onClick={onClose}></itemS.Close>
        </itemS.TopBox>
        <itemS.InnerContainer>
          <TopTable 
            itemList={itemList} 
          />
				</itemS.InnerContainer>
      </itemS.ModalContainer>
    </itemS.Backdrop>
  );
};

export default WorkbookDetail;
