import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Community.community.tuple.styles";
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function CommunityTuple({ item, isTabClick, isSelected, onOpen, onClose }) {
  const { alert } = useContext(AlertContext);  
  
  const [isAbled, setIsAbled] = useState(true); 

	return (
		<itemS.TupleContainer type={item.type}>
			<itemS.TupleType onClick={onOpen}>{isTabClick ? item.postId : item.type}</itemS.TupleType>
			<itemS.TupleTitleBox onClick={onOpen}>
				<itemS.TupleTitle>{item.title}</itemS.TupleTitle>
				{isTabClick && item.new && (
					<itemS.NewIcon>NEW</itemS.NewIcon>	
				)}
			</itemS.TupleTitleBox>
			<itemS.TupleWriter onClick={onOpen}>{item.writer}</itemS.TupleWriter>
			<itemS.TupleDate onClick={onOpen}>{item.date}</itemS.TupleDate>
			<itemS.TupleView onClick={onOpen}>{item.view}</itemS.TupleView>
				
		</itemS.TupleContainer>
	);
}