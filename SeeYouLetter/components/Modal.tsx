import React, { useEffect } from 'react';
import styled from 'styled-components';

// Modal.tsx 파일 내에서
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  modalReservateDate: string;
}

const Modal = ({ isVisible, onClose, modalReservateDate }: ModalProps) => {
  // 모달 사라지게 하는 함수
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(async () => {
        await onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <>
      {isVisible && (
        <ModalWrapper isVisible={isVisible}>
          <ModalContent>
            <CenteredText>
              편지를 보냈습니다.
              <br />
              {modalReservateDate}에 <br />
              편지함을 확인해보세요!
            </CenteredText>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;

const ModalWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  width: 20%;
  height: 15%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #c4c4c4;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: opacity 1s ease-in-out;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CenteredText = styled.p`
  font-size: 1rem;
  color: #ffffff;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;
