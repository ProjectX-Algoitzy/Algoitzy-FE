import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/DailyChallenge.dailychallengetuple.styles";

export default function CommunityTuple({ item, language, disable }) {
  const navigate = useNavigate();

  const linkToProfile = (id) => {
    navigate(`/mypage/${id}`);
  };

  return (
    <itemS.TupleContainer $disabled={disable}>
      <itemS.TupleContent>{item.rank}</itemS.TupleContent>
      <itemS.TupleContent>{item.name}</itemS.TupleContent>
      <itemS.TupleContent>{item.speed}</itemS.TupleContent>
      <itemS.TupleContent>{item.memory}</itemS.TupleContent>
      <itemS.TupleContent>{language}</itemS.TupleContent>
      <itemS.TupleContent>{item.codeLength}</itemS.TupleContent>
    </itemS.TupleContainer>
  );
}
