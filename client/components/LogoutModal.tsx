import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { persistor } from './../store/configureStore';

const LogoutModal = () => {
	const router = useRouter();
	const purge = async () => {
		await persistor.purge();
	};
	const logout = () => {
		localStorage.removeItem('key');
		router.push('/');
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
