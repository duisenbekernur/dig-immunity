/**
 * Страница Digital Academy
 */

import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Paper, RadioGroup, FormControlLabel, Radio, Button, Alert } from '@mui/material';
import { Layout } from '../../components/Layout/Layout';
import { VideoCard } from '../../components/VideoCard/VideoCard';
import { PodcastCard } from '../../components/PodcastCard/PodcastCard';
import { videos } from '../../mocks/videos';
import { podcasts } from '../../mocks/podcasts';
import { digitalIQTest, calculateDigitalIQ, getImmunityLevel } from '../../mocks/tests';
import { useStore } from '../../store/useStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

export const AcademyPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);
  const { updateUserIQ, addCompletedTest } = useStore();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTestAnswer = (questionId: string, answerIndex: number) => {
    setTestAnswers({ ...testAnswers, [questionId]: answerIndex });
  };

  const handleSubmitTest = () => {
    let correct = 0;
    digitalIQTest.questions.forEach((q) => {
      if (testAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const iq = calculateDigitalIQ(correct, digitalIQTest.questions.length);
    setTestScore(iq);
    setTestSubmitted(true);
    updateUserIQ(iq);
    addCompletedTest(digitalIQTest.id);
  };

  const handleResetTest = () => {
    setTestAnswers({});
    setTestSubmitted(false);
    setTestScore(null);
  };

  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Digital Academy
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Изучайте материалы, развивайте навыки медиаграмотности и проходите тесты.
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Видео" />
            <Tab label="Подкасты" />
            <Tab label="Статьи" />
            <Tab label="Тесты" />
          </Tabs>
        </Box>

        {/* Видео */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Подкасты */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {podcasts.map((podcast) => (
              <Grid item xs={12} sm={6} md={4} key={podcast.id}>
                <PodcastCard podcast={podcast} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Статьи */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {[
              {
                id: '1',
                title: 'Основы медиаграмотности',
                description: 'Введение в медиаграмотность и её важность в современном мире.',
                author: 'Эксперт по медиаграмотности',
                date: '2024-01-10'
              },
              {
                id: '2',
                title: 'Как проверить источник информации',
                description: 'Подробное руководство по проверке достоверности источников.',
                author: 'Факт-чекер',
                date: '2024-01-08'
              },
              {
                id: '3',
                title: 'Психология фейковых новостей',
                description: 'Почему люди верят и распространяют дезинформацию.',
                author: 'Психолог',
                date: '2024-01-05'
              }
            ].map((article) => (
              <Grid item xs={12} md={6} key={article.id}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {article.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.author} • {article.date}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Тесты */}
        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              {digitalIQTest.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              {digitalIQTest.description}
            </Typography>

            {!testSubmitted ? (
              <>
                {digitalIQTest.questions.map((question, qIndex) => (
                  <Box key={question.id} sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      {qIndex + 1}. {question.question}
                    </Typography>
                    <RadioGroup
                      value={testAnswers[question.id] ?? ''}
                      onChange={(e) => handleTestAnswer(question.id, parseInt(e.target.value))}
                    >
                      {question.options.map((option, oIndex) => (
                        <FormControlLabel
                          key={oIndex}
                          value={oIndex}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmitTest}
                  disabled={Object.keys(testAnswers).length !== digitalIQTest.questions.length}
                >
                  Завершить тест
                </Button>
              </>
            ) : (
              <Box>
                <Alert severity="success" sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Ваш Digital IQ: {testScore}
                  </Typography>
                  <Typography variant="body1">
                    Уровень: {getImmunityLevel(testScore || 0)}
                  </Typography>
                </Alert>

                {digitalIQTest.questions.map((question, qIndex) => {
                  const userAnswer = testAnswers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;

                  return (
                    <Box key={question.id} sx={{ mb: 3, p: 2, border: 1, borderColor: isCorrect ? 'success.main' : 'error.main', borderRadius: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {qIndex + 1}. {question.question}
                      </Typography>
                      <Typography variant="body2" color={isCorrect ? 'success.main' : 'error.main'} sx={{ mb: 1 }}>
                        {isCorrect ? '✓ Правильно' : '✗ Неправильно'}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Ваш ответ: {question.options[userAnswer]}
                      </Typography>
                      {!isCorrect && (
                        <Typography variant="body2" color="text.secondary">
                          Правильный ответ: {question.options[question.correctAnswer]}
                        </Typography>
                      )}
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                        {question.explanation}
                      </Typography>
                    </Box>
                  );
                })}

                <Button variant="outlined" onClick={handleResetTest} sx={{ mt: 2 }}>
                  Пройти тест снова
                </Button>
              </Box>
            )}
          </Paper>
        </TabPanel>
      </Box>
    </Layout>
  );
};

