export interface TriviaQuestion {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface CategoryData {
  name: string;
  count: number;
  fill: string;
}

export interface DifficultyData {
  name: string;
  count: number;
}