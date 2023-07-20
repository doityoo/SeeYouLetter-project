import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* background: #aaa491; */
    /* @media screen and (min-width: 391px) {
    display: none;
    } */
  }
  button {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #203D3B;
    color: white;
    width: 100%;
    height: 70px;
    cursor: pointer;
  }
  input {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: white;
  }
`;

export default GlobalStyle;
