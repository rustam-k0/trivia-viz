// src/utils/colorManager.ts

import { COLORS } from '../config/constants';

const categoryColorMap = new Map<string, string>();
let colorIndex = 0;

/**
 * Получает постоянный цвет для имени категории.
 * Если для категории цвет уже был назначен, возвращает его.
 * Если нет - назначает новый, сохраняет его и возвращает.
 * @param categoryName - Имя категории.
 * @returns Строка с цветом (hex).
 */
export const getColorForCategory = (categoryName: string): string => {
  if (!categoryColorMap.has(categoryName)) {
    const newColor = COLORS[colorIndex % COLORS.length];
    categoryColorMap.set(categoryName, newColor);
    colorIndex++;
  }
  return categoryColorMap.get(categoryName)!;
};