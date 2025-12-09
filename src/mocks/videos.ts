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
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=225&fit=crop&auto=format",
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
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=225&fit=crop&auto=format",
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

