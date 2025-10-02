import type { TriviaQuestion, AggregationData } from '../types';

export const aggregateByCategory = (questions: TriviaQuestion[]): AggregationData[] => {
  const map = new Map<string, number>();
  questions.forEach(q => map.set(q.category, (map.get(q.category) || 0) + 1));
  return Array.from(map, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
};

export const aggregateByDifficulty = (questions: TriviaQuestion[]): AggregationData[] => {
  const difficultyOrder: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
  const map = new Map<string, number>();
  questions.forEach(q => map.set(q.difficulty, (map.get(q.difficulty) || 0) + 1));
  return Array.from(map, ([name, count]) => ({ name, count }))
    .sort((a, b) => difficultyOrder[a.name] - difficultyOrder[b.name]);
};

export const getUniqueCategories = (questions: TriviaQuestion[]): string[] => {
  const categories = [...new Set(questions.map(q => q.category))].sort();
  return ['All', ...categories];
};