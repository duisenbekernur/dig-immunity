export type ImageVerdict = 'Шын' | 'Сомнительно' | 'Вероятный фейк';

export interface ImageCheckResult {
  verdict: ImageVerdict;
  confidence: number; // 0-100
  reasons: string[];
  tips: string;
}

/**
 * Простая заглушка ИИ-проверки изображений.
 * Никакие данные никуда не отправляются, всё считается прямо в браузере.
 */
export const checkImage = async (file: File): Promise<ImageCheckResult> => {
  // Имитация задержки
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const name = file.name.toLowerCase();
  let verdict: ImageVerdict = 'Сомнительно';

  if (name.includes('edit') || name.includes('photoshop') || name.includes('fake')) {
    verdict = 'Вероятный фейк';
  } else if (name.includes('original') || name.includes('official') || name.includes('source')) {
    verdict = 'Шын';
  } else {
    const sizeKb = file.size / 1024;
    verdict = sizeKb > 1500 ? 'Сомнительно' : 'Шын';
  }

  const confidence =
    verdict === 'Шын' ? 80 + Math.random() * 15 : verdict === 'Вероятный фейк' ? 75 + Math.random() * 20 : 55 + Math.random() * 20;

  const reasons: string[] = [];
  if (verdict === 'Вероятный фейк') {
    reasons.push(
      'Обнаружены возможные признаки редактирования (искажённые пропорции, резкие границы объектов).',
      'Метаданные файла выглядят нетипично для оригинальных фотографий.',
      'Контекст использования изображения может вводить в заблуждение.'
    );
  } else if (verdict === 'Сомнительно') {
    reasons.push(
      'Качество изображения или его размер не позволяют сделать однозначный вывод.',
      'Отсутствуют однозначные признаки подделки, но рекомендуется дополнительно проверить источник.'
    );
  } else {
    reasons.push(
      'Не обнаружено явных следов редактирования.',
      'Параметры изображения и метаданные выглядят типичными для оригинальных фото.'
    );
  }

  const tips =
    verdict === 'Вероятный фейк'
      ? 'Не используйте это изображение как достоверное доказательство. Попробуйте найти оригинал через обратный поиск изображений (Google, Yandex, TinEye).'
      : verdict === 'Сомнительно'
      ? 'Сравните изображение с другими источниками и по возможности найдите первоисточник (официальные аккаунты, медиа).'
      : 'Даже при высокой достоверности всегда проверяйте контекст: подписи, дату и источник публикации.';

  return {
    verdict,
    confidence: Math.round(confidence),
    reasons,
    tips
  };
};


