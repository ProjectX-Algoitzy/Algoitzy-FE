import React, { useState } from 'react';
import * as itemS from "./Styled/InstitutionDetail.institutiondetail.table.styles";
import InstitutionDetailTuple from './InstitutionDetail.institutiondetail.tuple';

export default function InstitutionDetailTable({ itemList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkbookId, setSelectedWorkbookId] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkbookId(null); 
  };

  const openModal = (workbookId) => { 
    setIsModalOpen(true);
    setSelectedWorkbookId(workbookId);
  };
   
  return (
    <itemS.Container>
      <itemS.Table>
        <itemS.CategoryContainer>
          <itemS.CategoryNumber>번호</itemS.CategoryNumber>
          <itemS.CategoryTitle>문제집 제목</itemS.CategoryTitle>
        </itemS.CategoryContainer>
        <itemS.TupleContainer>
          {itemList.map(item => (
            <InstitutionDetailTuple
              key={item.workbookId}
              item={item}
              isSelected={selectedWorkbookId === item.workbookId && isModalOpen}  
              // isSelected={isModalOpen}
              onOpen={() => openModal(item.workbookId)} 
              onClose={closeModal}
              // onOpen={openModal}
            />
          ))}
        </itemS.TupleContainer>
      </itemS.Table>
    </itemS.Container>
  );
}