import React from 'react';
import * as itemS from "./Styled/NoticeboardDetail.noticeboarddetail.content.styles";

export default function NoticeboardDetailContent({ content, fileUrlList }) {
  return (
    <itemS.Container>
      <itemS.Content>{content}</itemS.Content>
      <itemS.StyledTitle>업로드 파일</itemS.StyledTitle>
      <itemS.FileList>
        {fileUrlList.map((fileUrl, index) => (
          <itemS.FileItem key={index}>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </itemS.FileItem>
        ))}
      </itemS.FileList>
    </itemS.Container>
  );
}
