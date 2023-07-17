import React from 'react';
import styled from 'styled-components';
import logo from './../assets/seeYouLetter-logo.png';
import bar from './../assets/hamburgerBar.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoutModal from './LogoutModal';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
	const router = useRouter();

	const outSection = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const modal = () => {
		setIsOpen(!isOpen);
	};

	const modalCloseHandler = (e) => {
		if (isOpen && !outSection.current.contains(e.target)) setIsOpen(false);
	};

	useEffect(() => {
		window.addEventListener('click', modalCloseHandler);
		return () => {
			window.removeEventListener('click', modalCloseHandler);
		};
	});

	return (
		<div>
			<Wrapper>
				<Link to='/letterForm'>
					<Icon src={logo} alt='logo' />
				</Link>
				<Icon
					src={bar}
					alt='hamburgerIcon'
					onClick={() => modal()}
					ref={outSection}
				></Icon>
				{isOpen && <LogoutModal />}
			</Wrapper>
		</div>
	);
};

export default Header;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 23px 0 23px 0;
`;
const Icon = styled.img`
	width: auto;
	height: 15px;
	object-fit: cover;
	cursor: pointer;
`;
