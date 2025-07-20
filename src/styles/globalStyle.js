import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #f8f9fa;
    margin: 0;
    padding: 0;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;