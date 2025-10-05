
# Triview data visualizer

A data visualization tool for the Open Trivia DB API. 

##  Stack

  * TypeScript
  * React
  * Tailwind CSS
  * Vite
  * Recharts

## Core Logic & Architecture

The application's architecture is designed to be modular, scalable, and maintainable.

  * **Centralized State:** A central `TriviaContext` fetches and manages all trivia data, acting as a single source of truth for the entire application.
  * **Container/Presentational Pattern:** "Smart" container components (e.g., `CategoryAnalysis.tsx`) handle all logic, state management, and data preparation. They pass prepared data down to "dumb" presentational components (e.g., `CategoryPieChart.tsx`, `CategoryLegend.tsx`) which are only responsible for rendering the UI.
  * **Color Consistency:** To ensure a consistent user experience, a `colorManager.ts` utility assigns a persistent color to each category for the duration of a session. This guarantees that a category's color remains the same across all components (pie chart, legend) regardless of filtering or re-renders.
  * **Reusable Components:** The `AnalysisCard.tsx` component serves as a reusable UI wrapper, providing a consistent shell for all data visualization widgets and keeping the codebase DRY (Don't Repeat Yourself).

## Project Structure

The project structure is organized by feature and responsibility, promoting clarity and separation of concerns.

```
/
├── src/
│   ├── api/
│   │   └── triviaApi.ts
│   ├── assets/
│   ├── components/
│   │   ├── Analysis/
│   │   │   ├── CategoryAnalysis.tsx
│   │   │   └── DifficultyAnalysis.tsx
│   │   ├── Charts/
│   │   │   ├── CategoryPieChart.tsx
│   │   │   └── DifficultyBarChart.tsx
│   │   ├── Layout/
│   │   │   └── Header.tsx
│   │   └── UI/
│   │       ├── AnalysisCard.tsx
│   │       ├── CategoryLegend.tsx
│   │       ├── ErrorState.tsx
│   │       └── Loading.tsx
│   ├── config/
│   │   ├── analysisConfig.ts
│   │   └── constants.ts
│   ├── context/
│   │   └── TriviaContext.tsx
│   ├── hooks/
│   │   └── useTriviaData.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── dataAggregator.ts
|   |   └── colorManager.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Setup and Running

1.  Install dependencies:

    ```sh
    npm install
    ```

2.  Run the development server:

    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173/`.