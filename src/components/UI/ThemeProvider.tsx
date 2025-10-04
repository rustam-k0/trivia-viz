import React from 'react';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cyber-theme">
    <div className="cyber-bg" />
    {children}
  </div>
);