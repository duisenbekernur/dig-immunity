/**
 * Zustand store для управления состоянием приложения
 */

import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  digitalIQ: number;
  level: "Beginner" | "Skilled" | "Expert";
  watchedVideos: string[];
  completedTests: string[];
  gameScore: number;
  gameLevel: "Beginner" | "Skilled" | "Expert";
}

interface AppState {
  // Пользователь
  user: User | null;
  setUser: (user: User) => void;
  updateUserIQ: (iq: number) => void;
  addWatchedVideo: (videoId: string) => void;
  addCompletedTest: (testId: string) => void;
  updateGameScore: (score: number) => void;

  // UI состояние
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Загрузка
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const defaultUser: User = {
  id: "1",
  name: "Пользователь",
  email: "user@example.com",
  digitalIQ: 70,
  level: "Skilled",
  watchedVideos: [],
  completedTests: [],
  gameScore: 0,
  gameLevel: "Beginner"
};

export const useStore = create<AppState>((set) => ({
  // Начальное состояние
  user: defaultUser,
  theme: 'dark',
  isLoading: false,

  // Действия пользователя
  setUser: (user) => set({ user }),
  
  updateUserIQ: (iq) => set((state) => {
    if (!state.user) return state;
    const level = iq >= 80 ? "Expert" : iq >= 60 ? "Skilled" : "Beginner";
    return {
      user: {
        ...state.user,
        digitalIQ: iq,
        level
      }
    };
  }),

  addWatchedVideo: (videoId) => set((state) => {
    if (!state.user) return state;
    if (state.user.watchedVideos.includes(videoId)) return state;
    return {
      user: {
        ...state.user,
        watchedVideos: [...state.user.watchedVideos, videoId]
      }
    };
  }),

  addCompletedTest: (testId) => set((state) => {
    if (!state.user) return state;
    if (state.user.completedTests.includes(testId)) return state;
    return {
      user: {
        ...state.user,
        completedTests: [...state.user.completedTests, testId]
      }
    };
  }),

  updateGameScore: (score) => set((state) => {
    if (!state.user) return state;
    const level = score >= 8 ? "Expert" : score >= 6 ? "Skilled" : "Beginner";
    return {
      user: {
        ...state.user,
        gameScore: score,
        gameLevel: level
      }
    };
  }),

  // UI действия
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),

  setLoading: (loading) => set({ isLoading: loading })
}));

