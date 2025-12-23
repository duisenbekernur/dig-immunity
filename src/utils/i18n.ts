export type Language = 'ru' | 'kk';

type Dict = Record<string, string>;

const ru: Dict = {
  appTitle: '🛡️ Digital Immunity',
  navHome: 'Главная',
  navFactChecker: 'Проверка новостей',
  navAcademy: 'Академия',
  navGame: 'Игра',
  navLibrary: 'Библиотека',
  navAnalytics: 'Аналитика',
  navProfile: 'Профиль',
  navAdmin: 'Админ',
  authLoginRegister: 'Войти / регистрация',
  factCheckerTitle: 'AI Fact-Checker',
  factCheckerSubtitle: 'Вставьте текст или ссылку на новость, либо загрузите изображение. Наш AI проанализирует информацию и даст оценку достоверности.',
  factCheckerTextTab: 'Текст',
  factCheckerUrlTab: 'Ссылка',
  factCheckerImageTab: 'Изображение',
  gameTitle: 'Game Zone',
  profileTitle: 'Профиль'
};

const kk: Dict = {
  appTitle: '🛡️ Digital Immunity',
  navHome: 'Басты бет',
  navFactChecker: 'Жаңалықты тексеру',
  navAcademy: 'Академия',
  navGame: 'Ойын',
  navLibrary: 'Кітапхана',
  navAnalytics: 'Аналитика',
  navProfile: 'Профиль',
  navAdmin: 'Админ',
  authLoginRegister: 'Кіру / тіркелу',
  factCheckerTitle: 'AI Fact-Checker',
  factCheckerSubtitle: 'Жаңалық мәтінін, сілтемесін енгізіңіз немесе суретті жүктеңіз. Біздің AI ақпараттың шындыққа сәйкестігін бағалайды.',
  factCheckerTextTab: 'Мәтін',
  factCheckerUrlTab: 'Сілтеме',
  factCheckerImageTab: 'Сурет',
  gameTitle: 'Game Zone',
  profileTitle: 'Профиль'
};

const dictionaries: Record<Language, Dict> = {
  ru,
  kk
};

export const t = (lang: Language, key: string): string => {
  const dict = dictionaries[lang] ?? dictionaries.ru;
  return dict[key] ?? key;
};


