import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['gray-500']};
  }

  body {  
    background: ${(props) => props.theme.bg};
    color: ${(props) => props.theme['gray-400']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font: 400 1rem Noto Sans, sans-serif;
  }
`
