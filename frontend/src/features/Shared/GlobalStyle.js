import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
::-moz-selection { background: #1890FF; }
::selection { background: #1890FF; }
::-webkit-scrollbar {
    background-color: #fff0;
    /* width: 17px; */
    width: 12px;
}
::-webkit-scrollbar-button {
    display: none;
}
::-webkit-scrollbar-thumb {
    background-color: #dadce0;
    border-radius: 16px;
    /* border: 4px solid #fff; */
}
::-webkit-scrollbar-track {
    background-color: #fff0;
}
/* @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600|Roboto&display=swap'); */
html {
    /* font-size: 62.5%; */
    scroll-behavior: smooth;
}
body{
    background: white;
    font-family: 'Raleway', sans-serif;
    margin: 0;
}

ul {
    list-style-type: none;
    padding: 0;
}
h1,h2,h3,h4,h5 {
    font-family: "Open Sans", sans-serif;
    color: #00184C;
}
input,textarea {
    font-family: "Open Sans",sans-serif;
}
button {
    font-family: "Open Sans", sans-serif;
    outline: none;
}
p, span, li {
    font-family: "Roboto", sans-serif;
    color: #212121;
    margin: 0;
}
`;
export default GlobalStyle;