/**
 * Главная страница
 */

import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { VideoCard } from '../../components/VideoCard/VideoCard';
import { PodcastCard } from '../../components/PodcastCard/PodcastCard';
import { getRecommendedVideos } from '../../mocks/videos';
import { getRecommendedPodcasts } from '../../mocks/podcasts';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/i18n';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user, language } = useStore();
  const recommendedVideos = getRecommendedVideos();
  const recommendedPodcasts = getRecommendedPodcasts();

  return (
    <Layout>
      <Container>
        {/* Hero секция */}
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            mb: 6,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            color: 'white',
            px: 4
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {t(language, 'appTitle')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            {language === 'kk'
              ? 'Дезинформациядан қорғаныңыз. Цифрлық сауаттылығыңызды дамытыңыз.'
              : 'Защитите себя от дезинформации. Развивайте цифровую грамотность.'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                if (!user) {
                  navigate('/profile');
                } else {
                  navigate('/fact-checker');
                }
              }}
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
            >
              {language === 'kk' ? 'Жаңалықты тексеру' : 'Проверить новость'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                if (!user) {
                  navigate('/profile');
                } else {
                  navigate('/game');
                }
              }}
              sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              {language === 'kk' ? 'Ойынды бастау' : 'Пройти игру'}
            </Button>
          </Box>
        </Box>

        {/* Описание */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            О платформе
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
            Digital Immunity — это платформа для развития цифровой грамотности и защиты от дезинформации. 
            Мы помогаем вам научиться критически оценивать информацию, распознавать фейковые новости 
            и развивать навыки медиаграмотности. Используйте наш AI Fact-Checker для проверки новостей, 
            проходите обучение в Digital Academy, играйте в интерактивные игры и отслеживайте свою статистику.
          </Typography>
        </Box>

        {/* Рекомендуемые видео */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Рекомендуемые видео
          </Typography>
          <Grid container spacing={3}>
            {recommendedVideos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Рекомендуемые подкасты */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Рекомендуемые подкасты
          </Typography>
          <Grid container spacing={3}>
            {recommendedPodcasts.map((podcast) => (
              <Grid item xs={12} sm={6} md={4} key={podcast.id}>
                <PodcastCard podcast={podcast} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

