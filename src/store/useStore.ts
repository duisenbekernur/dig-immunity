/**
 * Zustand store для управления состоянием приложения
 */

import { create } from 'zustand';

type UserLevel = 'Beginner' | 'Skilled' | 'Expert';
type UserRole = 'user' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  /**
   * Роль пользователя в системе (обычный пользователь или админ)
   */
  role: UserRole;
  digitalIQ: number;
  level: UserLevel;
  watchedVideos: string[];
  completedTests: string[];
  gameScore: number;
  gameLevel: UserLevel;
}

type StoredUser = User & {
  /**
   * Простой пароль для демо-версии (хранится в localStorage, НЕ для продакшена)
   */
  password: string;
};

const STORAGE_USERS_KEY = 'di_users';
const STORAGE_CURRENT_USER_KEY = 'di_current_user_id';
const STORAGE_THEME_KEY = 'di_theme';
const STORAGE_LANG_KEY = 'di_lang';

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readJson = <T,>(key: string, fallback: T): T => {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
};

const getStoredUsers = (): StoredUser[] => {
  return readJson<StoredUser[]>(STORAGE_USERS_KEY, []);
};

const saveStoredUsers = (users: StoredUser[]) => {
  writeJson(STORAGE_USERS_KEY, users);
};

const getStoredCurrentUser = (): User | null => {
  if (!isBrowser) return null;
  const currentId = window.localStorage.getItem(STORAGE_CURRENT_USER_KEY);
  if (!currentId) return null;
  const users = getStoredUsers();
  const found = users.find((u) => u.id === currentId);
  if (!found) return null;
  // Не возвращаем пароль в состояние приложения
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = found;
  return user;
};

const persistCurrentUser = (user: User | null) => {
  if (!isBrowser) return;
  if (!user) {
    window.localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_CURRENT_USER_KEY, user.id);
};

const syncUserToStorage = (user: User | null) => {
  if (!isBrowser) return;
  if (!user) {
    persistCurrentUser(null);
    return;
  }

  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx === -1) {
    // если пользователя ещё нет (например, пришёл из регистрации), не трогаем пароль
    users.push({ ...(user as User), password: 'demo' });
  } else {
    const existing = users[idx];
    users[idx] = { ...existing, ...user };
  }
  saveStoredUsers(users);
  persistCurrentUser(user);
};

interface AppState {
  // Пользователь
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  updateUserIQ: (iq: number) => void;
  addWatchedVideo: (videoId: string) => void;
  addCompletedTest: (testId: string) => void;
  updateGameScore: (score: number) => void;

  // UI состояние
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'ru' | 'kk';
  setLanguage: (lang: 'ru' | 'kk') => void;

  // Загрузка
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Начальное состояние
  user: getStoredCurrentUser(),
  theme: (isBrowser ? (window.localStorage.getItem(STORAGE_THEME_KEY) as 'light' | 'dark' | null) : null) ?? 'dark',
  language: (isBrowser ? ((window.localStorage.getItem(STORAGE_LANG_KEY) as 'ru' | 'kk' | null) ?? 'ru') : 'ru'),
  isLoading: false,

  // Действия пользователя
  setUser: (user) =>
    set(() => {
      syncUserToStorage(user);
      return { user };
    }),

  logout: () =>
    set(() => {
      persistCurrentUser(null);
      return { user: null };
    }),

  register: (name, email, password) => {
    if (!isBrowser) return { success: false, error: 'Регистрация недоступна в этой среде' };

    const users = getStoredUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'Пользователь с таким email уже существует' };
    }

    const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    const role: UserRole = email.toLowerCase() === 'admin@dig.kz' ? 'admin' : 'user';

    const newUser: StoredUser = {
      id,
      name,
      email,
      role,
      password,
      digitalIQ: 70,
      level: 'Skilled',
      watchedVideos: [],
      completedTests: [],
      gameScore: 0,
      gameLevel: 'Beginner'
    };

    const nextUsers = [...users, newUser];
    saveStoredUsers(nextUsers);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...userWithoutPassword } = newUser;
    persistCurrentUser(userWithoutPassword);

    set({ user: userWithoutPassword });
    return { success: true };
  },

  login: (email, password) => {
    if (!isBrowser) return { success: false, error: 'Авторизация недоступна в этой среде' };
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: 'Пользователь не найден' };
    }
    if (found.password !== password) {
      return { success: false, error: 'Неверный пароль' };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...userWithoutPassword } = found;
    persistCurrentUser(userWithoutPassword);
    set({ user: userWithoutPassword });
    return { success: true };
  },
  
  updateUserIQ: (iq) =>
    set((state) => {
      if (!state.user) return state;
      const level: UserLevel = iq >= 80 ? 'Expert' : iq >= 60 ? 'Skilled' : 'Beginner';
      const updatedUser: User = {
        ...state.user,
        digitalIQ: iq,
        level
      };
      syncUserToStorage(updatedUser);
      return {
        user: updatedUser
      };
    }),

  addWatchedVideo: (videoId) =>
    set((state) => {
      if (!state.user) return state;
      if (state.user.watchedVideos.includes(videoId)) return state;
      const updatedUser: User = {
        ...state.user,
        watchedVideos: [...state.user.watchedVideos, videoId]
      };
      syncUserToStorage(updatedUser);
      return {
        user: updatedUser
      };
    }),

  addCompletedTest: (testId) =>
    set((state) => {
      if (!state.user) return state;
      if (state.user.completedTests.includes(testId)) return state;
      const updatedUser: User = {
        ...state.user,
        completedTests: [...state.user.completedTests, testId]
      };
      syncUserToStorage(updatedUser);
      return {
        user: updatedUser
      };
    }),

  updateGameScore: (score) =>
    set((state) => {
      if (!state.user) return state;
      const level: UserLevel = score >= 8 ? 'Expert' : score >= 6 ? 'Skilled' : 'Beginner';
      const updatedUser: User = {
        ...state.user,
        gameScore: score,
        gameLevel: level
      };
      syncUserToStorage(updatedUser);
      return {
        user: updatedUser
      };
    }),

  // UI действия
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      if (isBrowser) {
        window.localStorage.setItem(STORAGE_THEME_KEY, next);
      }
      return { theme: next };
    }),

  setLanguage: (lang) =>
    set(() => {
      if (isBrowser) {
        window.localStorage.setItem(STORAGE_LANG_KEY, lang);
      }
      return { language: lang };
    }),

  setLoading: (loading) => set({ isLoading: loading })
}));

