import * as itemS from "./Styled/DailyChallenge.dailychallenge.table.styles";
import RankingTuple from './DailyChallenge.dailychallenge.tuple';
import rankingData from "./dummyRanking.js";

const DEFAULT_ROWS = [
	{ rank: "1", name: "이유경", speed: "0ms", memory: "0KB", codeLength: "1000B" },
	{ rank: "2", name: "이육영", speed: "0ms", memory: "0KB", codeLength: "2000B" },
	{ rank: "3", name: "이규영", speed: "0ms", memory: "0KB", codeLength: "3000B" },
];

export default function RankingTable({ language, date, challengeHistory = [] }) {
	
	const hasRecordForDate = challengeHistory.some(item => item.date === date);
	const isDisabled = !hasRecordForDate;

	if (isDisabled) {
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

				<itemS.TupleContainer>
					<itemS.OverlayText>
						순위는 챌린지를 완료한 후에 확인하실 수 있습니다.
					</itemS.OverlayText>
					{DEFAULT_ROWS.map((row, index) => (
						<RankingTuple
						key={`default-${index}`}
						item={row}
						language={language}
						disable={true}
						/>
				 	))}
				</itemS.TupleContainer>
			  </itemS.Table>
		  </itemS.Container>
		);
	  }

	// 언어 매핑 (UI 언어 -> API 언어)
	const languageMap = {
		"Python": "PYTHON",
		"C++": "CPP",
		"Java": "JAVA"
	};

	// challengeHistory가 있으면 실제 데이터 사용, 없으면 더미 데이터 사용
	let rows = [];
	if (challengeHistory.length > 0) {
		const apiLanguage = languageMap[language] || language.toUpperCase();
		rows = challengeHistory
			.filter(item => 
				item.languageType === apiLanguage && 
				(!date || item.date === date)
			)
			.map(item => ({
				rank: item.rank,
				name: item.name,
				speed: item.executionTime,
				memory: item.memory,
				codeLength: item.codeLength,
				language: item.languageType
			}));
	} else {
		// 기존 더미 데이터 로직
		const table =
			rankingData.find(
			(v) => v.language === language && (!date || v.date === date)
			) ||
			rankingData.find((v) => v.language === language) ||
			rankingData[0];
		rows = table?.ranking ?? [];
	}

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
				{rows.map((item, index) => (
					<RankingTuple 
						key={`${item.name}-${item.rank}-${index}`}
						item={item} 
						language={language} 
						disable={false}
					/>
				))}
			</itemS.Table>
        </itemS.Container>
    );
}