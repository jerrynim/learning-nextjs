import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import { pallete } from "./pallete";

const globalStyle = css`
  ${reset};

  body {
    font-family: Noto Sans, Noto Sans KR;
    height: 100vh;
  }
  * {
    box-sizing: border-box;
  }
  .bg-blue {
    background-color: ${pallete.blue};
  }
  .bg-green {
    background-color: ${pallete.green};
  }
  .bg-navy {
    background-color: ${pallete.navy};
  }
  .bg-orange {
    background-color: ${pallete.orange};
  }
  .bg-red {
    background-color: ${pallete.red};
  }
  .bg-yellow {
    background-color: ${pallete.yellow};
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
    
`;

export default GlobalStyle;
