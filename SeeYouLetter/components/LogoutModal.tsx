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
    router.replace('/');
  };

  return (
    <ModalContainer>
      <Button
        onClick={async () => {
          await logout();
          await purge();
        }}>
        로그아웃
      </Button>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  top: -40px;
  right: -490px;
  z-index: 1;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
`;

export default LogoutModal;
