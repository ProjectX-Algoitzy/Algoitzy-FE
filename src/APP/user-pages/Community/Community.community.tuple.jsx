import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Community.community.tuple.styles";
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function CommunityTuple({ item, isTabClick, isSelected, onOpen, onClose }) {
  const { alert } = useContext(AlertContext);  
  
  const [isAbled, setIsAbled] = useState(true); 

	// 스터디 제목 글자수 자르기
	const truncateTitle = (title) => {
		if (title.length > 12) {
			return title.slice(0, 11) + '...';
		}
		return title;
	}

	const renderTupleTitle = (title) => {
    if (title.length > 36) {
      return <itemS.TupleTitle>{title.slice(0, 35) + '...'}</itemS.TupleTitle>;
    } else {
      return <itemS.TupleTitle>{title}</itemS.TupleTitle>;
    }
  };

	return (
		<itemS.TupleContainer fix={item.fix}>
			<itemS.TupleType onClick={onOpen}>{isTabClick ? item.postId : item.type}</itemS.TupleType>
			<itemS.TupleTitleBox onClick={onOpen}>
				{/* <itemS.TupleTitle>{item.title}</itemS.TupleTitle> */}
				{renderTupleTitle(item.title)}
				{item.new && (
					<itemS.NewIcon>NEW</itemS.NewIcon>	
				)}
			</itemS.TupleTitleBox>
			<itemS.TupleWriter onClick={onOpen}>{item.writer}</itemS.TupleWriter>
			<itemS.TupleDate onClick={onOpen}>{item.date}</itemS.TupleDate>
			<itemS.TupleView onClick={onOpen}>{item.view}</itemS.TupleView>
				
		</itemS.TupleContainer>
	);
}