import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter } from 'react-router-dom'
import ActiveProvider from './contexts/active/ActiveContext';
import PricingProvider from './contexts/PricingProvider';
import ScrollProvider from './contexts/scroll/ScrollContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActiveProvider>
      <PricingProvider>
        <ScrollProvider>
          <BrowserRouter >
            <Header />
              <App />
            <Footer />
          </BrowserRouter>
        </ScrollProvider>
      </PricingProvider>
    </ActiveProvider>
  </React.StrictMode>
);

