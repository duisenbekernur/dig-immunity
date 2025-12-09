/**
 * Мок-данные для видео контента
 */

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  views: number;
  category: string;
  date: string;
  author: string;
}

export const videos: Video[] = [
  {
    id: "1",
    title: "Как распознать фейковые новости за 5 минут",
    description: "Узнайте основные признаки фейковых новостей и научитесь их быстро определять.",
    duration: "8:32",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+1",
    views: 12500,
    category: "Основы",
    date: "2024-01-15",
    author: "Эксперт по медиаграмотности"
  },
  {
    id: "2",
    title: "Проверка источников: пошаговое руководство",
    description: "Подробное руководство по проверке достоверности источников информации.",
    duration: "12:15",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+2",
    views: 8900,
    category: "Продвинутый",
    date: "2024-01-10",
    author: "Центр факт-чекинга"
  },
  {
    id: "3",
    title: "Критическое мышление в цифровую эпоху",
    description: "Развивайте критическое мышление для защиты от дезинформации.",
    duration: "15:42",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+3",
    views: 15200,
    category: "Основы",
    date: "2024-01-05",
    author: "Профессор психологии"
  },
  {
    id: "4",
    title: "Манипуляции в медиа: как их распознать",
    description: "Изучите основные техники манипуляции в медиа и научитесь им противостоять.",
    duration: "18:20",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+4",
    views: 11200,
    category: "Продвинутый",
    date: "2023-12-28",
    author: "Медиа-аналитик"
  },
  {
    id: "5",
    title: "Цифровая грамотность для начинающих",
    description: "Базовый курс по цифровой грамотности и безопасности в интернете.",
    duration: "22:10",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+5",
    views: 25600,
    category: "Основы",
    date: "2023-12-20",
    author: "Digital Academy"
  },
  {
    id: "6",
    title: "Факт-чекинг: инструменты и методы",
    description: "Обзор лучших инструментов и методов для проверки фактов.",
    duration: "14:33",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+6",
    views: 9800,
    category: "Продвинутый",
    date: "2023-12-15",
    author: "Факт-чекер"
  },
  {
    id: "7",
    title: "Защита от дезинформации в соцсетях",
    description: "Практические советы по защите от дезинформации в социальных сетях.",
    duration: "10:25",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+7",
    views: 18700,
    category: "Основы",
    date: "2023-12-10",
    author: "Эксперт по соцсетям"
  },
  {
    id: "8",
    title: "Психология фейковых новостей",
    description: "Почему люди верят и распространяют фейковые новости? Психологический анализ.",
    duration: "16:48",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+8",
    views: 13400,
    category: "Продвинутый",
    date: "2023-12-05",
    author: "Психолог"
  },
  {
    id: "9",
    title: "Эхо-камеры и информационные пузыри",
    description: "Что такое эхо-камеры и как они влияют на наше восприятие информации.",
    duration: "13:17",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+9",
    views: 10200,
    category: "Продвинутый",
    date: "2023-11-28",
    author: "Социолог"
  },
  {
    id: "10",
    title: "Медиаграмотность для детей и подростков",
    description: "Как научить детей критически оценивать информацию в интернете.",
    duration: "19:55",
    thumbnail: "https://via.placeholder.com/320x180?text=Video+10",
    views: 22100,
    category: "Основы",
    date: "2023-11-20",
    author: "Педагог"
  }
];

/**
 * Получить рекомендуемые видео для главной страницы
 */
export const getRecommendedVideos = (): Video[] => {
  return videos.slice(0, 3);
};

