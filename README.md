Trivia Data Visualizer

Инструмент для визуализации данных из Open Trivia DB API. Показывает навыки работы с React, интеграции внешнего API и построения интерактивных графиков с помощью Recharts. Приложение собрано через Vite и задеплоено на GitHub Pages.

## Технологии
* React
* Vite
* Recharts
* TypeScript
* Tailwind CSS
* fetch / axios для работы с API
* GitHub Pages

```
/src
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── triviaApi.ts
│   ├── assets/
│   │   └──
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
│   │       ├── CategoryLegend.tsx
│   │       ├── ErrorState.tsx
│   │       └── Loading.tsx
|   |
│   ├── config/
│   │   └── analysisConfig.ts
|   |   └── constants.ts
|   |
│   ├── context/
│   │   └── TriviaContext.tsx
│   ├── hooks/
│   │   └── useTriviaData.ts
|   |
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Установка и запуск


npm install
npm run dev

Приложение будет доступно по адресу http://localhost:5173/

