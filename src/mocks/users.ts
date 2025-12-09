/**
 * Мок-данные для пользователей (для админ-панели)
 */

export interface User {
  id: string;
  name: string;
  email: string;
  region: string;
  digitalIQ: number;
  level: "Beginner" | "Skilled" | "Expert";
  videosWatched: number;
  testsCompleted: number;
  gameScore: number;
  joinedDate: string;
  lastActive: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Айдар Нурланов",
    email: "aidar@example.com",
    region: "Алматы",
    digitalIQ: 85,
    level: "Expert",
    videosWatched: 12,
    testsCompleted: 3,
    gameScore: 9,
    joinedDate: "2024-01-01",
    lastActive: "2024-01-15"
  },
  {
    id: "2",
    name: "Мария Сейтова",
    email: "maria@example.com",
    region: "Астана",
    digitalIQ: 78,
    level: "Skilled",
    videosWatched: 8,
    testsCompleted: 2,
    gameScore: 7,
    joinedDate: "2024-01-03",
    lastActive: "2024-01-14"
  },
  {
    id: "3",
    name: "Ерлан Касымов",
    email: "erlan@example.com",
    region: "Шымкент",
    digitalIQ: 65,
    level: "Beginner",
    videosWatched: 4,
    testsCompleted: 1,
    gameScore: 5,
    joinedDate: "2024-01-05",
    lastActive: "2024-01-13"
  },
  {
    id: "4",
    name: "Айгуль Жумабекова",
    email: "aigul@example.com",
    region: "Алматы",
    digitalIQ: 92,
    level: "Expert",
    videosWatched: 15,
    testsCompleted: 5,
    gameScore: 10,
    joinedDate: "2023-12-20",
    lastActive: "2024-01-15"
  },
  {
    id: "5",
    name: "Данияр Омаров",
    email: "daniyar@example.com",
    region: "Караганда",
    digitalIQ: 71,
    level: "Skilled",
    videosWatched: 6,
    testsCompleted: 2,
    gameScore: 6,
    joinedDate: "2024-01-07",
    lastActive: "2024-01-12"
  },
  {
    id: "6",
    name: "Сауле Абдуллаева",
    email: "saule@example.com",
    region: "Актобе",
    digitalIQ: 58,
    level: "Beginner",
    videosWatched: 3,
    testsCompleted: 1,
    gameScore: 4,
    joinedDate: "2024-01-08",
    lastActive: "2024-01-11"
  },
  {
    id: "7",
    name: "Нурлан Беков",
    email: "nurlan@example.com",
    region: "Астана",
    digitalIQ: 88,
    level: "Expert",
    videosWatched: 14,
    testsCompleted: 4,
    gameScore: 9,
    joinedDate: "2023-12-25",
    lastActive: "2024-01-15"
  },
  {
    id: "8",
    name: "Алма Толегенова",
    email: "alma@example.com",
    region: "Тараз",
    digitalIQ: 69,
    level: "Skilled",
    videosWatched: 7,
    testsCompleted: 2,
    gameScore: 6,
    joinedDate: "2024-01-02",
    lastActive: "2024-01-10"
  }
];

