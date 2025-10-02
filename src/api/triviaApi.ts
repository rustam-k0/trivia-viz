import type { TriviaQuestion } from '../types';

const BASE_URL = 'https://opentdb.com/';

// In-memory token storage (NO sessionStorage/localStorage)
let sessionToken: string | null = null;

const decodeHtml = (str: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

export const getNewToken = async (): Promise<string> => {
  const response = await fetch(`${BASE_URL}api_token.php?command=request`);
  const data = await response.json();
  if (data.response_code !== 0 || !data.token) {
    throw new Error('Failed to retrieve a session token.');
  }
  sessionToken = data.token;
  return data.token;
};

export const fetchQuestions = async (signal: AbortSignal): Promise<TriviaQuestion[]> => {
  let token = sessionToken;
  if (!token) {
    token = await getNewToken();
  }

  const apiUrl = `${BASE_URL}api.php?amount=50&token=${token}`;
  const response = await fetch(apiUrl, { signal });

  if (!response.ok) {
    throw new Error(`Network error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.response_code === 3 || data.response_code === 4) {
    const newToken = await getNewToken();
    const retryUrl = `${BASE_URL}api.php?amount=50&token=${newToken}`;
    const retryResponse = await fetch(retryUrl, { signal });
    const retryData = await retryResponse.json();
    return processApiResponse(retryData);
  }

  return processApiResponse(data);
};

const processApiResponse = (data: any): TriviaQuestion[] => {
  if (data.response_code !== 0) {
    throw new Error('The API returned an error after handling tokens.');
  }

  return data.results.map((q: any) => ({
    ...q,
    question: decodeHtml(q.question),
    category: decodeHtml(q.category),
    correct_answer: decodeHtml(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map(decodeHtml),
  }));
};