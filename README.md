# Triview data visualizer

A data visualization tool for the Open Trivia DB API.

Stack

* TypeScript
* React
* Tailwind CSS
* Vite
* Recharts

The application's architecture is designed to be modular, scalable, and maintainable.


Project Structure

The project structure is organized by feature and responsibility, promoting clarity and separation of concerns.

/
├── src/
│ ├── api/
│ │ └── triviaApi.ts
│ ├── assets/
│ ├── components/
│ │ ├── Analysis/
│ │ │ ├── CategoryAnalysis.tsx
│ │ │ └── DifficultyAnalysis.tsx
│ │ ├── Charts/
│ │ │ ├── CategoryPieChart.tsx
│ │ │ └── DifficultyBarChart.tsx
│ │ ├── Layout/
│ │ │ └── Header.tsx
│ │ └── UI/
│ │ ├── AnalysisCard.tsx
│ │ ├── CategoryLegend.tsx
│ │ ├── ErrorState.tsx
│ │ └── Loading.tsx
│ ├── config/
│ │ ├── analysisConfig.ts
│ │ └── constants.ts
│ ├── context/
│ │ └── TriviaContext.tsx
│ ├── hooks/
│ │ └── useTriviaData.ts
│ ├── types/
│ │ └── index.ts
│ ├── utils/
│ │ └── dataAggregator.ts
| | └── colorManager.ts
│ ├── App.tsx
│ ├── index.css
│ └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts

Setup and Running

1. Install dependencies:

 ```sh
 npm install