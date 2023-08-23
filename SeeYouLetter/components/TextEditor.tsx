import React from 'react';
import styled from 'styled-components';

interface TextEditorProps {
  textBody: string;
  setTextBody: (text: string) => void;
}
const TextEditor: React.FC<TextEditorProps> = ({
  textBody,
  setTextBody,
}: TextEditorProps) => {
  return (
    <>
      <StyledEditor
        placeholder="사랑하는 나에게.."
        value={textBody}
        onChange={(e) => {
          setTextBody(e.target.value);
        }}></StyledEditor>
    </>
  );
};

export default TextEditor;

const StyledEditor = styled.textarea`
  width: 100%;
  height: 30vh;
  resize: vertical;
  border: none;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  margin: 20px 0;
`;
