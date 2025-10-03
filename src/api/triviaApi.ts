import type { TriviaQuestion } from '../types';

const BASE_URL = 'https://opentdb.com/';
const MAX_QUESTIONS = 50;

let sessionToken: string | null = null;

const decodeHtml = (str: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

const processApiResponse = (data: any): TriviaQuestion[] => {
  if (!data.results || !Array.isArray(data.results)) {
    throw new Error('Invalid API response format');
  }

  return data.results.map((q: any) => ({
    ...q,
    question: decodeHtml(q.question),
    category: decodeHtml(q.category),
    correct_answer: decodeHtml(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((ans: string) => decodeHtml(ans)),
  }));
};

const getNewToken = async (): Promise<string> => {
  const response = await fetch(`${BASE_URL}api_token.php?command=request`);
  const data = await response.json();
  
  if (data.response_code !== 0 || !data.token) {
    throw new Error('Failed to retrieve session token');
  }
  
  sessionToken = data.token;
  return data.token;
};

export const fetchQuestions = async (signal: AbortSignal): Promise<TriviaQuestion[]> => {
  let token = sessionToken || (await getNewToken());
  const apiUrl = `${BASE_URL}api.php?amount=${MAX_QUESTIONS}&token=${token}&encode=url3986`;
  
  const response = await fetch(apiUrl, { signal });
  const data = await response.json();

  if (data.response_code === 3 || data.response_code === 4) {
    token = await getNewToken();
    return fetchQuestions(signal);
  }

  if (data.response_code !== 0) {
    throw new Error(`API error: ${data.response_code}`);
  }

  return processApiResponse(data);
};