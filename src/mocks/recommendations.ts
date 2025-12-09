/**
 * Мок-данные для рекомендаций
 */

export interface Recommendation {
  id: string;
  title: string;
  type: "video" | "podcast" | "article";
  description: string;
  reason: string;
}

export const getPersonalizedRecommendations = (userIQ: number, _watchedVideos: string[]): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  if (userIQ < 60) {
    recommendations.push(
      {
        id: "rec1",
        title: "Цифровая грамотность для начинающих",
        type: "video",
        description: "Базовый курс по основам цифровой грамотности",
        reason: "Рекомендуем начать с основ"
      },
      {
        id: "rec2",
        title: "Как распознать фейковые новости",
        type: "video",
        description: "Узнайте основные признаки фейковых новостей",
        reason: "Поможет улучшить навыки проверки информации"
      }
    );
  } else if (userIQ < 80) {
    recommendations.push(
      {
        id: "rec3",
        title: "Проверка источников: пошаговое руководство",
        type: "video",
        description: "Углубленное руководство по проверке источников",
        reason: "Развивайте навыки проверки фактов"
      },
      {
        id: "rec4",
        title: "Манипуляции в медиа: как их распознать",
        type: "video",
        description: "Изучите техники манипуляции",
        reason: "Повысит вашу защиту от манипуляций"
      }
    );
  } else {
    recommendations.push(
      {
        id: "rec5",
        title: "Психология фейковых новостей",
        type: "video",
        description: "Глубокий анализ психологических механизмов",
        reason: "Для экспертного уровня знаний"
      },
      {
        id: "rec6",
        title: "Эхо-камеры и информационные пузыри",
        type: "video",
        description: "Продвинутая тема о влиянии алгоритмов",
        reason: "Расширит понимание медиа-среды"
      }
    );
  }

  return recommendations;
};

