import { useState, useEffect, useMemo } from 'react';
import { fetchQuestions } from '../api/triviaApi';
import type { TriviaQuestion } from '../types';
import { aggregateByCategory, aggregateByDifficulty, getUniqueCategories } from '../utils/dataAggregator';

export const useTriviaData = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchQuestions(controller.signal);
        if (data.length === 0) {
          throw new Error('No questions loaded');
        }
        setQuestions(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Failed to load trivia data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    return () => controller.abort();
  }, []);

  const filteredQuestions = useMemo(() =>
    filter === 'All' ? questions : questions.filter(q => q.category === filter),
    [questions, filter]
  );

  const categoryData = useMemo(() => aggregateByCategory(filteredQuestions), [filteredQuestions]);
  const difficultyData = useMemo(() => aggregateByDifficulty(filteredQuestions), [filteredQuestions]);
  const uniqueCategories = useMemo(() => ['All', ...getUniqueCategories(questions)], [questions]);

  return {
  isLoading,
  error,
  filter,
  setFilter,
  categoryData,
  difficultyData,
  uniqueCategories,
  questionCount: filteredQuestions.length,
};
};