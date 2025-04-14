import React, { useState, useEffect } from 'react';
import * as itemS from "./Styled/InstitutionDetail.institutiondetail.explanation.styles";
import MarkdownContent from './InstitutionDetail.institutiondetail.markdowneditor';


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
            <MarkdownContent markdownContent={content || ''} />
          )}
        </itemS.CategoryContainer>
    </itemS.Container>
  );
}