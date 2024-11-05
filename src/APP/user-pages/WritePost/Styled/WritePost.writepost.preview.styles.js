// PreviewSection.styles.js
import styled from 'styled-components';

export const PreviewContainer = styled.div`
  width: 50%;
  padding: 20px;
  border: 1px solid #ffffff;
  background-color: #F5FBFF;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  overflow-y: auto;
  height: 100%;
  color: #333;
  h1 {
    font-size: 2em;
    margin-top: 0;
    color: #333;
  }
  h2 {
    font-size: 1.75em;
    margin-top: 1em;
    color: #333;
  }
  p {
    margin: 1em 0;
  }
  code {
    background-color: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 90%;
  }
  pre code {
    display: block;
    padding: 1em;
    background-color: #2d2d2d;
    color: #f8f8f2;
    overflow-x: auto;
    border-radius: 8px;
    font-size: 0.95em;
  }
  a {
    color: #1e90ff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  ul, ol {
    margin: 1em 0;
    padding-left: 2em;
  }
  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 16px;
    color: #666;
    font-style: italic;
    margin: 1em 0;
  }
`;
