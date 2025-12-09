/**
 * Мок-данные для аналитики и карты Казахстана
 */

export interface RegionData {
  region: string;
  users: number;
  digitalIQ: number;
  fakeNewsDetected: number;
}

export interface FakeNewsTopic {
  topic: string;
  count: number;
  percentage: number;
}

export interface AgeGroupData {
  ageGroup: string;
  users: number;
  avgIQ: number;
}

export const regions: RegionData[] = [
  { region: "Алматы", users: 12500, digitalIQ: 78, fakeNewsDetected: 342 },
  { region: "Астана", users: 9800, digitalIQ: 82, fakeNewsDetected: 289 },
  { region: "Шымкент", users: 5600, digitalIQ: 71, fakeNewsDetected: 198 },
  { region: "Актобе", users: 4200, digitalIQ: 68, fakeNewsDetected: 156 },
  { region: "Караганда", users: 3800, digitalIQ: 73, fakeNewsDetected: 134 },
  { region: "Тараз", users: 2900, digitalIQ: 65, fakeNewsDetected: 112 },
  { region: "Павлодар", users: 2700, digitalIQ: 70, fakeNewsDetected: 98 },
  { region: "Усть-Каменогорск", users: 2400, digitalIQ: 67, fakeNewsDetected: 87 },
  { region: "Семей", users: 2100, digitalIQ: 69, fakeNewsDetected: 76 },
  { region: "Костанай", users: 1800, digitalIQ: 64, fakeNewsDetected: 65 }
];

export const fakeNewsTopics: FakeNewsTopic[] = [
  { topic: "Политика", count: 1250, percentage: 35 },
  { topic: "Здоровье", count: 890, percentage: 25 },
  { topic: "Экономика", count: 720, percentage: 20 },
  { topic: "Социальные вопросы", count: 540, percentage: 15 },
  { topic: "Технологии", count: 180, percentage: 5 }
];

export const ageGroups: AgeGroupData[] = [
  { ageGroup: "13-17", users: 3200, avgIQ: 68 },
  { ageGroup: "18-24", users: 8500, avgIQ: 75 },
  { ageGroup: "25-34", users: 11200, avgIQ: 80 },
  { ageGroup: "35-44", users: 9800, avgIQ: 78 },
  { ageGroup: "45-54", users: 5600, avgIQ: 72 },
  { ageGroup: "55+", users: 3200, avgIQ: 65 }
];

export interface CountryIQData {
  category: string;
  score: number;
  maxScore: number;
}

export const countryIQ: CountryIQData[] = [
  { category: "Проверка фактов", score: 75, maxScore: 100 },
  { category: "Критическое мышление", score: 72, maxScore: 100 },
  { category: "Медиаграмотность", score: 78, maxScore: 100 },
  { category: "Защита от манипуляций", score: 70, maxScore: 100 },
  { category: "Работа с источниками", score: 74, maxScore: 100 },
  { category: "Цифровая безопасность", score: 76, maxScore: 100 }
];

/**
 * Получить общую статистику
 */
export const getOverallStats = () => {
  const totalUsers = regions.reduce((sum, r) => sum + r.users, 0);
  const totalFakeNews = regions.reduce((sum, r) => sum + r.fakeNewsDetected, 0);
  const avgIQ = regions.reduce((sum, r) => sum + r.digitalIQ, 0) / regions.length;

  return {
    totalUsers,
    totalFakeNews,
    avgIQ: Math.round(avgIQ),
    activeRegions: regions.length
  };
};

