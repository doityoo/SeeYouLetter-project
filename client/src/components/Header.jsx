import React from 'react';
import styled from 'styled-components';
import logo from './../assets/seeYouLetter-logo.png';
import bar from './../assets/hamburgerBar.png';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<Wrapper>
				<Link to='/letterForm'>
					<Icon src={logo} alt='logo' />
				</Link>
				<Icon src={bar} alt='hamburgerIcon' />
			</Wrapper>
		</div>
	);
};

export default Header;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 43px 0 23px 0;
`;
const Icon = styled.img`
	width: auto;
	height: 20px;
	object-fit: cover;
	cursor: pointer;
`;
