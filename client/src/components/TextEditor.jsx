import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { textBodyActions } from '../reducers/textBodySlice';


const TextEditor = () => {
	const dispatch = useDispatch();
	const [textBody, setTextBody] = useState("");
	dispatch(textBodyActions.setTextBody(textBody));


	return (
		<>
			<StyledEditor
				placeholder='사랑하는 나에게..'
				onChange={(e) => { setTextBody(e.target.value) }}
			></StyledEditor>
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
