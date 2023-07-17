import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import logo from './../public/seeYouLetter-logo.png';
import bar from './../public/hamburgerBar.png';
import LogoutModal from './LogoutModal';

const Header = () => {
	const router = useRouter();
	const outSection = useRef<HTMLImageElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const closeModal = (e: MouseEvent) => {
		if (
			isOpen &&
			outSection.current &&
			!outSection.current.contains(e.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener('click', closeModal);
		return () => {
			window.removeEventListener('click', closeModal);
		};
	}, []);

	const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		router.push('/letterForm');
	};

	return (
		<Wrapper>
			<LogoLink href='/letterForm' onClick={handleLogoClick}>
				<Logo src={logo as any} alt='logo' />
			</LogoLink>
			<HamburgerIcon
				src={bar as any}
				alt='hamburgerIcon'
				onClick={toggleModal}
				ref={outSection}
			/>
			{isOpen && <LogoutModal />}
		</Wrapper>
	);
};

export default Header;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 23px 0;
`;

const LogoLink = styled.a`
	cursor: pointer;
`;

const Logo = styled.img`
	width: auto;
	height: 15px;
	object-fit: cover;
`;

const HamburgerIcon = styled.img`
	width: auto;
	height: 15px;
	object-fit: cover;
	cursor: pointer;
`;
