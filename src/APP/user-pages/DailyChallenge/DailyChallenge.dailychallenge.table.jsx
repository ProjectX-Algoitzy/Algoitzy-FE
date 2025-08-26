import * as itemS from "./Styled/DailyChallenge.dailychallenge.table.styles";
import RankingTuple from './DailyChallenge.dailychallenge.tuple';
import rankingData from "./dummyRanking.js";

const DEFAULT_ROWS = [
	{ rank: "1", name: "홍길동", speed: "0ms", memory: "0KB", codeLength: "1000B" },
	{ rank: "2", name: "홍길동", speed: "0ms", memory: "0KB", codeLength: "2000B" },
	{ rank: "3", name: "홍길동", speed: "0ms", memory: "0KB", codeLength: "3000B" },
];

export default function RankingTable({ disable, language, date }) {

	if (disable) {
		return (
		  <itemS.Container>
			  <itemS.Table>
				<itemS.LabelContainer>
				  <itemS.LabelText>순위</itemS.LabelText>
				  <itemS.LabelText>이름</itemS.LabelText>
				  <itemS.LabelText>속도</itemS.LabelText>
				  <itemS.LabelText>메모리</itemS.LabelText>
				  <itemS.LabelText>언어</itemS.LabelText>
				  <itemS.LabelText>코드길이</itemS.LabelText>
				</itemS.LabelContainer>

				<itemS.Content $disabled>
				<itemS.TupleContainer>
				  {DEFAULT_ROWS.map((row) => (
					<RankingTuple
					  item={row}
					  language={language}
					  disable={true}
					/>
				  ))}
				</itemS.TupleContainer>
				</itemS.Content>
			  </itemS.Table>
		  </itemS.Container>
		);
	  }

	const table =
		rankingData.find(
		(v) => v.language === language && (!date || v.date === date)
		) ||
		rankingData.find((v) => v.language === language) ||
		rankingData[0];

	const rows = table?.ranking ?? [];

    return (
        <itemS.Container>
			<itemS.Table>
				<itemS.LabelContainer>
					<itemS.LabelText>순위</itemS.LabelText>
					<itemS.LabelText>이름</itemS.LabelText>
					<itemS.LabelText>속도</itemS.LabelText>
					<itemS.LabelText>메모리</itemS.LabelText>
					<itemS.LabelText>언어</itemS.LabelText>
					<itemS.LabelText>코드길이</itemS.LabelText>
				</itemS.LabelContainer>
				{rows.map(item => (
					<RankingTuple item={item} language={language} disable={disable}/>
				))}
			</itemS.Table>
        </itemS.Container>
    );
}