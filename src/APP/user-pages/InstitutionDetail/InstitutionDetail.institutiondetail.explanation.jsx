import React, { useState, useEffect } from 'react';
import * as itemS from "./Styled/InstitutionDetail.institutiondetail.explanation.styles";

export default function InstitutionDetailExplanation({ content, contentEmptyMessage }) {

  useEffect(() => {
    console.log('contentEmptyMessage', contentEmptyMessage);
  }, []);
   
    
  return (
    <itemS.Container>
        <itemS.CategoryContainer>
          {contentEmptyMessage ? (
            <itemS.ComingSoonContainer>{contentEmptyMessage}</itemS.ComingSoonContainer>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          )}
        </itemS.CategoryContainer>
    </itemS.Container>
  );
}