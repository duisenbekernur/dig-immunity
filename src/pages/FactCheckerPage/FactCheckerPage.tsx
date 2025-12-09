/**
 * Страница AI Fact-Checker
 */

import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Chip, Grid, CircularProgress } from '@mui/material';
import { CheckCircle, Warning, Cancel } from '@mui/icons-material';
import { Layout } from '../../components/Layout/Layout';
import { Loading } from '../../components/Loading/Loading';
import { checkNews, FactCheckResult } from '../../mocks/fakeNews';
import { VideoCard } from '../../components/VideoCard/VideoCard';
import { PodcastCard } from '../../components/PodcastCard/PodcastCard';
import { videos } from '../../mocks/videos';
import { podcasts } from '../../mocks/podcasts';

export const FactCheckerPage = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const checkResult = await checkNews(text);
      setResult(checkResult);
    } catch (error) {
      console.error('Ошибка при проверке:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Шын':
        return <CheckCircle sx={{ color: 'success.main', fontSize: 40 }} />;
      case 'Сомнительно':
        return <Warning sx={{ color: 'warning.main', fontSize: 40 }} />;
      case 'Вероятный фейк':
        return <Cancel sx={{ color: 'error.main', fontSize: 40 }} />;
      default:
        return null;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Шын':
        return 'success';
      case 'Сомнительно':
        return 'warning';
      case 'Вероятный фейк':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          AI Fact-Checker
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Вставьте текст новости для проверки. Наш AI проанализирует информацию и даст оценку достоверности.
        </Typography>

        {/* Input область */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="Вставьте текст новости для проверки..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleAnalyze}
            disabled={!text.trim() || loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Анализировать'}
          </Button>
        </Paper>

        {/* Результат */}
        {loading && <Loading message="Анализируем новость..." />}

        {result && (
          <Paper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              {getVerdictIcon(result.verdict)}
              <Box>
                <Typography variant="h5" gutterBottom>
                  Вердикт: {result.verdict}
                </Typography>
                <Chip
                  label={result.verdict}
                  color={getVerdictColor(result.verdict) as any}
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </Box>

            {/* Причины */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Причины:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {result.reasons.map((reason, index) => (
                  <li key={index}>
                    <Typography variant="body1">{reason}</Typography>
                  </li>
                ))}
              </Box>
            </Box>

            {/* Советы */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Советы:
              </Typography>
              <Typography variant="body1" sx={{ pl: 2 }}>
                {result.tips}
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Рекомендуемый контент */}
        {result && result.recommended.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Рекомендуемый контент
            </Typography>
            <Grid container spacing={3}>
              {result.recommended.map((rec) => {
                if (rec.type === 'video') {
                  const video = videos.find(v => v.id === rec.id);
                  return video ? (
                    <Grid item xs={12} sm={6} md={4} key={rec.id}>
                      <VideoCard video={video} />
                    </Grid>
                  ) : null;
                } else {
                  const podcast = podcasts.find(p => p.id === rec.id);
                  return podcast ? (
                    <Grid item xs={12} sm={6} md={4} key={rec.id}>
                      <PodcastCard podcast={podcast} />
                    </Grid>
                  ) : null;
                }
              })}
            </Grid>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

