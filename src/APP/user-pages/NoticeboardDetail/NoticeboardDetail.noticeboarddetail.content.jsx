import React, { useState } from 'react';
import * as itemS from "./Styled/NoticeboardDetail.noticeboarddetail.content.styles";

export default function NoticeboardDetailContent({ content, fileList }) {
   
    
  return (
    <itemS.Container>
        <itemS.Content>{content}</itemS.Content>
        <itemS.FileList>{fileList}</itemS.FileList>
    </itemS.Container>
  );
}