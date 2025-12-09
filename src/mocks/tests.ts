/**
 * Мок-данные для тестов и вопросов
 */

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  questions: TestQuestion[];
}

export const digitalIQTest: Test = {
  id: "1",
  title: "Тест на Digital IQ",
  description: "Проверьте свой уровень цифровой грамотности",
  questions: [
    {
      id: "1",
      question: "Что является первым признаком фейковой новости?",
      options: [
        "Яркий заголовок",
        "Отсутствие источника или сомнительный источник",
        "Большое количество лайков",
        "Публикация в популярном блоге"
      ],
      correctAnswer: 1,
      explanation: "Отсутствие надежного источника или сомнительный источник - один из главных признаков фейковой новости."
    },
    {
      id: "2",
      question: "Сколько независимых источников рекомендуется проверить перед распространением информации?",
      options: [
        "Один",
        "Два",
        "Три или более",
        "Не обязательно проверять"
      ],
      correctAnswer: 2,
      explanation: "Эксперты рекомендуют проверять информацию минимум в трех независимых источниках."
    },
    {
      id: "3",
      question: "Что такое 'эхо-камера' в контексте медиа?",
      options: [
        "Звуковая студия",
        "Информационная среда, где люди видят только подтверждающую их мнение информацию",
        "Тип социальной сети",
        "Метод проверки фактов"
      ],
      correctAnswer: 1,
      explanation: "Эхо-камера - это информационная среда, где люди получают только информацию, подтверждающую их существующие убеждения."
    },
    {
      id: "4",
      question: "Какой из этих признаков НЕ указывает на фейковую новость?",
      options: [
        "Эмоциональный, провокационный заголовок",
        "Проверенные факты из официальных источников",
        "Отсутствие даты публикации",
        "Опечатки и грамматические ошибки"
      ],
      correctAnswer: 1,
      explanation: "Проверенные факты из официальных источников - это признак достоверной информации, а не фейка."
    },
    {
      id: "5",
      question: "Что делать, если вы получили сомнительную информацию?",
      options: [
        "Сразу поделиться с друзьями",
        "Проверить в нескольких источниках перед распространением",
        "Поверить, если много лайков",
        "Игнорировать"
      ],
      correctAnswer: 1,
      explanation: "Всегда проверяйте сомнительную информацию в нескольких независимых источниках перед тем, как делиться ею."
    }
  ]
};

/**
 * Вычислить Digital IQ на основе результатов теста
 */
export const calculateDigitalIQ = (correctAnswers: number, totalQuestions: number): number => {
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  if (percentage >= 90) return 95;
  if (percentage >= 80) return 85;
  if (percentage >= 70) return 75;
  if (percentage >= 60) return 65;
  if (percentage >= 50) return 55;
  return 45;
};

/**
 * Получить уровень Digital Immunity на основе IQ
 */
export const getImmunityLevel = (iq: number): "Beginner" | "Skilled" | "Expert" => {
  if (iq >= 80) return "Expert";
  if (iq >= 60) return "Skilled";
  return "Beginner";
};

