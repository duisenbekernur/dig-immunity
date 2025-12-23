/**
 * Страница Game Zone - интерактивная игра
 */

import { useState } from 'react';
import { Box, Typography, Paper, Button, Card, CardContent, Alert, Chip } from '@mui/material';
import { Layout } from '../../components/Layout/Layout';
import { gameNews } from '../../mocks/fakeNews';
import { getImmunityLevel } from '../../mocks/tests';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { t } from '../../utils/i18n';

export const GamePage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const { updateGameScore, user, language } = useStore();

  const currentNews = gameNews[currentIndex];
  const totalQuestions = gameNews.length;

  const handleAnswer = (isFake: boolean) => {
    const newAnswers = { ...answers, [currentNews.id]: isFake === currentNews.isFake };
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
    } else {
      // Игра завершена
      const score = Object.values(answers).filter(Boolean).length;
      updateGameScore(score);
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setGameFinished(false);
  };

  if (!user) {
    return (
      <Layout>
        <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Доступ к игре только для зарегистрированных пользователей
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Зарегистрируйтесь или войдите в аккаунт, чтобы проходить игру и сохранять результаты.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/profile')}>
            Войти / зарегистрироваться
          </Button>
        </Box>
      </Layout>
    );
  }

  if (gameFinished) {
    const score = Object.values(answers).filter(Boolean).length;
    const level = getImmunityLevel((score / totalQuestions) * 100);

    return (
      <Layout>
        <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Игра завершена!
          </Typography>

          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {score} / {totalQuestions}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Правильных ответов
            </Typography>

            <Chip
              label={`Digital Immunity Level: ${level}`}
              color={level === 'Expert' ? 'success' : level === 'Skilled' ? 'warning' : 'default'}
              sx={{ fontSize: '1.2rem', p: 2, height: 'auto' }}
            />
          </Paper>

          <Button variant="contained" size="large" onClick={handleRestart}>
            Играть снова
          </Button>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          {t(language, 'gameTitle')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            {language === 'kk'
              ? `Жаңалықтың фейк не шын екенін анықтаңыз. Барлық ${totalQuestions} карточканы өтіңіз.`
              : `Определите, является ли новость фейком или правдой. Пройдите все ${totalQuestions} карточек.`}
        </Typography>

        {/* Прогресс */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Вопрос {currentIndex + 1} из {totalQuestions}
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 8,
              bgcolor: 'grey.300',
              borderRadius: 1,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                height: '100%',
                bgcolor: 'primary.main',
                transition: 'width 0.3s'
              }}
            />
          </Box>
        </Box>

        {/* Карточка новости */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              {currentNews.title}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
              {currentNews.content}
            </Typography>

            {!showResult ? (
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => handleAnswer(false)}
                  sx={{ minWidth: 150 }}
                >
                  Шын
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => handleAnswer(true)}
                  sx={{ minWidth: 150 }}
                >
                  Фейк
                </Button>
              </Box>
            ) : (
              <Box>
                <Alert
                  severity={answers[currentNews.id] ? 'success' : 'error'}
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h6" gutterBottom>
                    {answers[currentNews.id] ? 'Правильно! ✓' : 'Неправильно ✗'}
                      </Typography>
                  <Typography variant="body2">
                    {currentNews.explanation}
                  </Typography>
                </Alert>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleNext}
                  fullWidth
                >
                  {currentIndex < totalQuestions - 1 ? 'Следующий вопрос' : 'Завершить игру'}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

