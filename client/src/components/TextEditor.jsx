import React from 'react';
import styled from 'styled-components';

const TextEditor = () => {
	return (
		<>
			<StyledEditor placeholder='사랑하는 나에게..'></StyledEditor>
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
