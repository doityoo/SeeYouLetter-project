import React from 'react';
import styled from 'styled-components';
import logo from './../assets/seeYouLetter-logo.png';
import bar from './../assets/hamburgerBar.png';
import { Link } from 'react-router-dom';
import LogoutModal from './LogoutModal';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
	const outSection = useRef();
	const [isOpen, setIsOpen] = useState(false);

	const modal = () => {
		setIsOpen(!isOpen);
	};

	const modalCloseHandler = (e) => {
		// target 밖 클릭시 모달 false로 만드는 로직(error)
		// if (isOpen && !outSection.current.contain(e.target)) setIsOpen(false);
		if (isOpen) setIsOpen(false);
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
				<Icon src={bar} alt='hamburgerIcon' onClick={() => modal()}></Icon>
				{isOpen && <LogoutModal ref={outSection} />}
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
// const ModalOutSection = styled.div`
// 	position: fixed;
// 	z-index: 999;
// 	width: 100%;
// 	height: 100%;
// 	box-sizing: border-box;
// `;
