import React from 'react';
import Header from './components/Layout/Header';
import { analysisWidgets } from './config/analysisConfig';

const PADDING_CLASSES = "px-10 sm:px-20 lg:px-48 max-w-full mx-auto";

const App: React.FC = () => {
  return (
    <>
      <div className="cyber-bg" />
      <div className="min-h-screen pb-16">
        <Header />

        <main className={`mt-8 ${PADDING_CLASSES}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {analysisWidgets.map((Widget, index) => {
              const isFirstWidget = index === 0;
              const gridSpan = isFirstWidget ? 2 : 1;
              const animationDelay = `${(index + 1) * 0.2}s`;

              return (
                <div
                  key={index}
                  className={`lg:col-span-${gridSpan} fade-in min-h-[400px]`}
                  style={{ animationDelay }}
                >
                  <Widget />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;