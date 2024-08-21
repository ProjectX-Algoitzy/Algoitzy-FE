import styled from 'styled-components';
import * as tokens from "../../../../tokens";


export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50rem;
  background-color: white;
  border-radius: 0.167rem;
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(18, 23, 33, 0.49); 
  padding: 5.292rem 0 14.875rem 0;
  z-index: 1001; 
`;

export const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 46.833rem;
  padding: 0.625rem 1rem 0.875rem 2.167rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_3};
  margin-bottom: 1.833rem;
`;

export const Title = styled.div`
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.Grey_8};
`;

export const Close = styled.div`
  background-image: url('/img/close.png');
  background-size: cover;
  width: 1.333rem;
  height: 1.333rem;
  cursor: pointer;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
`;

export const LittleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 0.792rem;
`;

export const StyledTitle = styled.div`
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.T4_SB_20};
  margin-bottom: 0.417rem;
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
  border-radius: 0.167rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  width: 24.583rem;
  height: 2.333rem;
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.B3_M_14};
  padding-left: 0.667rem;

  &::placeholder {
    color: ${tokens.colors.Grey_4};
  }
  &:focus {
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  box-sizing: border-box;
  border-radius: 0.167rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  width: 24.583rem;
  height: 4.333rem;
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.B3_M_14};
  padding-left: 0.667rem;

  resize: none; /* Prevents resizing */

  &::placeholder {
    color: ${tokens.colors.Grey_4};
  }
  &:focus {
    outline: none;
  }
`;

export const Btn = styled.button` 
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.Blue_0_Main};
  width: 14.333rem;
  height: 2rem;
  margin-bottom: 1.667rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
`;

//  파일

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
  // margin-top: 3rem;
  // padding: 2rem;
`;

export const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 24.583rem;
  height: 5.583rem;
  border: 2px dashed #cccccc;
  border-radius: 10px;
  color: #cccccc;
  font-size: 0.75rem;
  cursor: pointer;
`;

export const UploadFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 24.583rem;
  height: 5.583rem;
  border: 1px solid #cccccc;
  border-radius: 10px;
  color: #cccccc;
  font-size: 0.75rem;
  // margin-top: 1rem;
`;

export const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  // width: 100%;
  // max-width: 580px;
  // margin-top: 1rem;
  overflow-y: auto;
  max-height: 300px; /* 제한된 높이 */
  
`;

export const FileItem = styled.li`

  ${tokens.typography.B3_M_14};
  // color: ${tokens.colors.Grey_3};
  width: 23.083rem;
  // padding: 0.5rem;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin: 0 0.3rem;
`;

export const RemoveButton = styled.button`
  width: 2rem;
  background-color: ${tokens.colors.White};
  color: ${tokens.colors.Red};
  border: 0.042rem solid ${tokens.colors.Red};
  border-radius: 0.167rem;
  cursor: pointer;
  // margin-left: 0.6rem;
  // padding: 0.25rem 0.5rem;
`;

export const UploadButton = styled.button`
  background-color: ${tokens.colors.White};
  color: ${tokens.colors.Blue_0_Main};
  border: 0.042rem solid ${tokens.colors.Blue_0_Main};
  border-radius: 0.267rem;
  margin-top: 1rem;
  // padding: 0.25rem 0.5rem;
  cursor: pointer;
`;