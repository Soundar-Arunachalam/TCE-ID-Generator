// eslint-disable-next-line no-unused-vars
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/header';
import WebcamCapture from './components/webcamcapture';
import SidePanel from './components/sidepanel';
import './style/index.css';
import App from './components/App';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <div className="main-content">
      <SidePanel side="left" />
      
      <App/>
      <SidePanel side="right" />
    </div>
  </StrictMode>,
);