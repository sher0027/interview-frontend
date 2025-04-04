import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.ts';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </StrictMode>
  </BrowserRouter>,
)
