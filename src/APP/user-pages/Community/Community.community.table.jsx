import React, { useState } from 'react';
import * as itemS from "./Styled/Community.community.table.styles";
import CommunityTuple from './Community.community.tuple';

export default function CommunityTable({ items, isTabClick, searchKeyword, isRegularMember }) {

    return (
        <itemS.Container>
					<itemS.Table>
						<itemS.CategoryContainer>
							<itemS.BlankBox></itemS.BlankBox>
							<itemS.CategoryTitle>제목</itemS.CategoryTitle>
							{isRegularMember ? (
								<itemS.CategoryWriter>작성자</itemS.CategoryWriter>
							) : (
								<itemS.CategoryBlank></itemS.CategoryBlank>
							)}
							<itemS.CategoryDate>작성일</itemS.CategoryDate>
							<itemS.CategoryView>조회수</itemS.CategoryView>
						</itemS.CategoryContainer>
						<itemS.TupleContainer>
							{items.map(item => (
								<CommunityTuple
									key={item.boardId}
									item={item}
									isTabClick={isTabClick}
									searchKeyword={searchKeyword}
									isRegularMember={isRegularMember}
								/>
							))}
						</itemS.TupleContainer>
					</itemS.Table>
        </itemS.Container>
    );
}