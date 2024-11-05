// EditorSection.styles.js
import styled from 'styled-components';

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 50%;
`;

export const TitleInput = styled.textarea`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid #ffffff;
  outline: none;
  margin: 20px 0;
  resize: none;
  overflow: hidden;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 5px;
    color: #666;
    &:hover {
      color: #333;
    }
  }
  span {
    color: #ccc;
  }
`;

export const EditorContainer = styled.div`
  flex: 1;
  border: 1px solid #ffffff;
  font-size: 16px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  .cm-editor.cm-focused {
    outline: none;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  h3 {
    margin-top: 0;
  }
  input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    margin: 5px;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    &:first-of-type {
      background-color: #00A5FF;
      color: white;
    }
    &:last-of-type {
      background-color: #5A677A;
      color: white;
    }
  }
`;
