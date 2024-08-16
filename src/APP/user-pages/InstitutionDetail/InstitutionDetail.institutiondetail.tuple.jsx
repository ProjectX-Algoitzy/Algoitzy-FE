import React, { useState } from 'react';
import * as itemS from "./Styled/InstitutionDetail.institutiondetail.tuple.styles";
import WorkbookDetail from '../WorkbookDetail/WorkbookDetail.workbookdetail.main';

export default function InstitutionDetailTuple({ item, isSelected, onOpen, onClose }) {


  return (
    <div>
      <itemS.TupleContainer onClick={onOpen}>
        <itemS.TupleNumber>{item.workbookId}</itemS.TupleNumber>
        <itemS.TupleTitle>{item.name}</itemS.TupleTitle>
      </itemS.TupleContainer>
      {isSelected && (
        <WorkbookDetail
          workbookId={item.workbookId}
          workbookName={item.name}
          isOpen={isSelected}
          onClose={onClose}
        />
      )}
    </div>
  );
}