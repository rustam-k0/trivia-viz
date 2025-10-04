import type { TriviaQuestion } from '../types';

const BASE_URL = 'https://opentdb.com/';
const MAX_QUESTIONS = 50;

let sessionToken: string | null = null;

// Улучшенная функция декодирования
const decodeText = (str: string): string => {
  try {
    // Сначала декодируем URL-сущности (например, %20, %26)
    const decodedUrl = decodeURIComponent(str);
    // Затем обрабатываем HTML-сущности (например, &quot;)
    const textarea = document.createElement('textarea');
    textarea.innerHTML = decodedUrl;
    return textarea.value;
  } catch (e) {
    console.error("Failed to decode text:", str, e);
    return str; // Возвращаем исходную строку в случае ошибки
  }
};

const processApiResponse = (data: any): TriviaQuestion[] => {
  if (!data.results || !Array.isArray(data.results)) {
    throw new Error('Invalid API response format');
  }

  return data.results.map((q: any) => ({
    ...q,
    question: decodeText(q.question),
    category: decodeText(q.category),
    correct_answer: decodeText(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((ans: string) => decodeText(ans)),
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
    // Делаем повторный вызов с новым токеном
    const retryResponse = await fetch(`${BASE_URL}api.php?amount=${MAX_QUESTIONS}&token=${token}&encode=url3986`, { signal });
    const retryData = await retryResponse.json();
    if (retryData.response_code !== 0) {
      throw new Error(`API error on retry: ${retryData.response_code}`);
    }
    return processApiResponse(retryData);
  }

  if (data.response_code !== 0) {
    throw new Error(`API error: ${data.response_code}`);
  }

  return processApiResponse(data);
};