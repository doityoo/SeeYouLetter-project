import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
	}, [isOpen]);

	const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		router.push('/letterForm');
	};

	return (
		<>
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
				<BarIcon
					src='/hamburgerBar.png'
					alt='bar icon'
					height={20}
					width={20}
					onClick={toggleModal}
					ref={outSection}
				/>
			</Wrapper>
			{isOpen && (
				<LogoutModalContainer>
					<LogoutModal />
				</LogoutModalContainer>
			)}
		</>
	);
};

export default Header;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 0 15px 0;
	height: 60px;
`;
const LogoutModalContainer = styled.div`
	position: relative;
	top: 0px;
	right: 500px;
	z-index: 1;
`;
const BarIcon = styled(Image)`
	cursor: pointer;
`;
