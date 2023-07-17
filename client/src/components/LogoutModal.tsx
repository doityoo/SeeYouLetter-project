import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../index';

const LogoutModal = () => {
	const navigate = useNavigate();
	const purge = async () => {
		await persistor.purge();
	};
	const logout = () => {
		localStorage.removeItem('key');
		navigate('/');
	};

	return (
		<>
			<Button
				onClick={async () => {
					await logout();
					await setTimeout(() => purge(), 200);
				}}
			>
				Log out
			</Button>
		</>
	);
};

const Button = styled.button`
	width: 100px;
	height: 40px;
	position: fixed;
	top: 30px;
	bottom: 0;
	right: 25px;
`;

export default LogoutModal;
