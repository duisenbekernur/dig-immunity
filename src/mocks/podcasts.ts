/**
 * Мок-данные для подкастов
 */

export interface Podcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  listens: number;
  category: string;
  date: string;
  host: string;
  episode: number;
}

export const podcasts: Podcast[] = [
  {
    id: "1",
    title: "Фейк-ньюс: как не попасться на удочку",
    description: "Обсуждение современных методов распространения фейковых новостей и способов защиты.",
    duration: "45:30",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop&auto=format",
    listens: 8900,
    category: "Основы",
    date: "2024-01-12",
    host: "Digital Immunity Podcast",
    episode: 1
  },
  {
    id: "2",
    title: "Интервью с факт-чекером",
    description: "Разговор с профессиональным факт-чекером о работе и методах проверки информации.",
    duration: "52:15",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop&auto=format",
    listens: 7200,
    category: "Продвинутый",
    date: "2024-01-08",
    host: "Digital Immunity Podcast",
    episode: 2
  },
  {
    id: "3",
    title: "Психология дезинформации",
    description: "Почему люди верят фейкам? Психологические механизмы распространения дезинформации.",
    duration: "38:42",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop&auto=format",
    listens: 10500,
    category: "Продвинутый",
    date: "2024-01-03",
    host: "Digital Immunity Podcast",
    episode: 3
  },
  {
    id: "4",
    title: "Цифровая грамотность в школах",
    description: "Как внедрять медиаграмотность в образовательный процесс.",
    duration: "41:20",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&auto=format",
    listens: 6800,
    category: "Образование",
    date: "2023-12-28",
    host: "Digital Immunity Podcast",
    episode: 4
  },
  {
    id: "5",
    title: "Инструменты для проверки фактов",
    description: "Обзор лучших онлайн-инструментов и сервисов для проверки информации.",
    duration: "35:10",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&auto=format",
    listens: 9400,
    category: "Практика",
    date: "2023-12-22",
    host: "Digital Immunity Podcast",
    episode: 5
  }
];

/**
 * Получить рекомендуемые подкасты для главной страницы
 */
export const getRecommendedPodcasts = (): Podcast[] => {
  return podcasts.slice(0, 2);
};

