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
├── /api
│   └── triviaApi.ts              # API логика с in-memory токеном
├── /components
│   ├── Loading.tsx               # Компонент загрузки
│   ├── ErrorState.tsx            # Компонент ошибки
│   ├── CategorySelector.tsx      # Селектор категорий
│   ├── CategoryPieChart.tsx      # Круговая диаграмма
│   ├── DifficultyBarChart.tsx    # Столбчатая диаграмма
│   └──
├── /hooks
│   └── useTriviaData.ts          # Кастомный хук
├── /utils
│   └── dataAggregator.ts         # Утилиты агрегации
├── types.ts                      # TypeScript типы
├── App.tsx                       # Главный компонент
├── main.tsx                      # Точка входа
└── index.css                     # Глобальные стили
```

## Установка и запуск


npm install
npm run dev

Приложение будет доступно по адресу http://localhost:5173/

