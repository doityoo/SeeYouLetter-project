import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LogoutModal = () => {
  const navigate = useNavigate();
  const logout = () => { 
    localStorage.removeItem('key');
    navigate("/");
  }

  return (
    <>
      <Button onClick={logout}>Log out</Button>
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