import React, { createContext, useContext, useState } from 'react';

// Create a new context
export const AppContext = createContext();

// Create a context provider
export function AppProvider({ children }) {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const updateSelectedCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const updateSelectedTemplate = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <AppContext.Provider
      value={{
        selectedCandidate,
        selectedTemplate,
        updateSelectedCandidate,
        updateSelectedTemplate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Create a custom hook to use the context
export function useAppContext() {
  return useContext(AppContext);
}
