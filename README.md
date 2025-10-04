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
├── /components
│   ├── Charts/
│   │   ├── CategoryPieChart.tsx
│   │   └── DifficultyBarChart.tsx
│   ├── UI/
│   │   ├── Loading.tsx
│   │   ├── ErrorState.tsx
│   │   └── ThemeProvider.tsx
│   └── Layout/
│       └── Header.tsx
├── /hooks
│   └── useTriviaData.ts
├── /utils
│   └── dataAggregator.ts
├── /types
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Установка и запуск


npm install
npm run dev

Приложение будет доступно по адресу http://localhost:5173/

