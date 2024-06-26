import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DatasetsContextProvider } from './context/DatasetsContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { QuestionsContextProvider } from './context/QuestionsContext.jsx'; 
import './index.css';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app within React.StrictMode and HashRouter.
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DatasetsContextProvider>
        <QuestionsContextProvider>  
          <App />
        </QuestionsContextProvider>
      </DatasetsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
