import React from 'react';
import { theme } from "./features/Shared/theme";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import AppRouter from './features/AppRouter/AppRouter';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Virus mapping</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Roboto:400,500,700&display=swap" rel="stylesheet"/>
      </Helmet>
      <AppRouter/>
    </ThemeProvider>
  );
}

export default App;
