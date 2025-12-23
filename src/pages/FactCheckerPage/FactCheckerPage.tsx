/**
 * Страница AI Fact-Checker
 */

import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Chip, Grid, CircularProgress, Alert, Tabs, Tab } from '@mui/material';
import { CheckCircle, Warning, Cancel } from '@mui/icons-material';
import { Layout } from '../../components/Layout/Layout';
import { Loading } from '../../components/Loading/Loading';
import { checkNews, checkNewsByUrl, FactCheckResult } from '../../mocks/fakeNews';
import { VideoCard } from '../../components/VideoCard/VideoCard';
import { PodcastCard } from '../../components/PodcastCard/PodcastCard';
import { videos } from '../../mocks/videos';
import { podcasts } from '../../mocks/podcasts';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { checkImage, ImageCheckResult } from '../../mocks/imageCheck';
import { t } from '../../utils/i18n';

export const FactCheckerPage = () => {
  const { user, language } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0); // 0 - текст, 1 - ссылка, 2 - изображение
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [imageResult, setImageResult] = useState<ImageCheckResult | null>(null);

  const ensureAuthorized = (): boolean => {
    if (!user) {
      navigate('/profile');
      return false;
    }
    return true;
  };

  const handleAnalyze = async () => {
    if (!ensureAuthorized()) return;
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);
    setImageResult(null);

    try {
      const checkResult = await checkNews(text);
      setResult(checkResult);
    } catch (error) {
      console.error('Ошибка при проверке:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeUrl = async () => {
    if (!ensureAuthorized()) return;
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);
    setImageResult(null);

    try {
      const checkResult = await checkNewsByUrl(url);
      setResult(checkResult);
    } catch (error) {
      console.error('Ошибка при проверке ссылки:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setResult(null);
    setImageResult(null);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleAnalyzeImage = async () => {
    if (!ensureAuthorized()) return;
    if (!imageFile) return;

    setLoading(true);
    setResult(null);
    setImageResult(null);

    try {
      const res = await checkImage(imageFile);
      setImageResult(res);
    } catch (error) {
      console.error('Ошибка при проверке изображения:', error);
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
        {!user && (
          <Alert
            severity="info"
            sx={{ mb: 3 }}
            action={
              <Button color="inherit" size="small" onClick={() => navigate('/profile')}>
                Войти / зарегистрироваться
              </Button>
            }
          >
            Для использования AI Fact-Checker необходимо войти или зарегистрироваться.
          </Alert>
        )}

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          {t(language, 'factCheckerTitle')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          {t(language, 'factCheckerSubtitle')}
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
            <Tab label={t(language, 'factCheckerTextTab')} />
            <Tab label={t(language, 'factCheckerUrlTab')} />
            <Tab label={t(language, 'factCheckerImageTab')} />
          </Tabs>
        </Box>

        {/* Input области */}
        {tab === 0 && (
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
              {loading ? <CircularProgress size={24} /> : 'Анализировать текст'}
            </Button>
          </Paper>
        )}

        {tab === 1 && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Вставьте ссылку на новость для проверки..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleAnalyzeUrl}
              disabled={!url.trim() || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Анализировать ссылку'}
            </Button>
          </Paper>
        )}

        {tab === 2 && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                component="label"
              >
                Выбрать изображение
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleSelectImage}
                />
              </Button>
              {imageFile && (
                <Typography variant="body2" color="text.secondary">
                  Выбрано: {imageFile.name}
                </Typography>
              )}
              {imagePreview && (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Для проверки"
                  sx={{ maxWidth: 400, maxHeight: 300, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
                />
              )}
              <Button
                variant="contained"
                size="large"
                onClick={handleAnalyzeImage}
                disabled={!imageFile || loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : 'Анализировать изображение'}
              </Button>
            </Box>
          </Paper>
        )}

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

        {imageResult && (
          <Paper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              {getVerdictIcon(imageResult.verdict)}
              <Box>
                <Typography variant="h5" gutterBottom>
                  Вердикт по изображению: {imageResult.verdict}
                </Typography>
                <Chip
                  label={`Уверенность: ${imageResult.confidence}%`}
                  color={imageResult.verdict === 'Шын' ? 'success' : imageResult.verdict === 'Вероятный фейк' ? 'error' : 'warning'}
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Причины:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {imageResult.reasons.map((reason, index) => (
                  <li key={index}>
                    <Typography variant="body1">{reason}</Typography>
                  </li>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Советы:
              </Typography>
              <Typography variant="body1" sx={{ pl: 2 }}>
                {imageResult.tips}
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

