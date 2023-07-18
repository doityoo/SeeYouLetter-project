import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import logo from './../public/seeYouLetter-logo.png';
import bar from './../public/hamburgerBar.png';
import LogoutModal from './LogoutModal';
import Link from 'next/link';
import Image from 'next/image';

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
			<Link href={'/'} onClick={handleLogoClick}>
				<Image
					src='/seeYouLetter-logo.png'
					alt='My Logo'
					height={50}
					width={160}
					layout='intrinsic'
				/>
			</Link>
			<Image
				src='/hamburgerBar.png'
				alt='bar icon'
				height={50}
				width={20}
				layout='intrinsic'
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
