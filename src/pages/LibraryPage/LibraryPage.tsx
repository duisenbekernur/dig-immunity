/**
 * Страница Media Library - каталог контента
 */

import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Paper, Button } from '@mui/material';
import { Download, Article } from '@mui/icons-material';
import { Layout } from '../../components/Layout/Layout';
import { VideoCard } from '../../components/VideoCard/VideoCard';
import { PodcastCard } from '../../components/PodcastCard/PodcastCard';
import { videos } from '../../mocks/videos';
import { podcasts } from '../../mocks/podcasts';

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

const checklists = [
  {
    id: '1',
    title: 'Чек-лист проверки новости',
    description: 'Пошаговое руководство по проверке достоверности новости',
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'Признаки фейковых новостей',
    description: 'Список основных признаков, указывающих на фейковую новость',
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Проверка источников',
    description: 'Как проверить надежность источника информации',
    downloadUrl: '#'
  },
  {
    id: '4',
    title: 'Защита от манипуляций',
    description: 'Руководство по защите от информационных манипуляций',
    downloadUrl: '#'
  }
];

export const LibraryPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Media Library
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Полная библиотека образовательного контента. Видео, подкасты и полезные материалы для скачивания.
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Видео" />
            <Tab label="Подкасты" />
            <Tab label="Чек-листы" />
          </Tabs>
        </Box>

        {/* Видео */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Подкасты */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {podcasts.map((podcast) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={podcast.id}>
                <PodcastCard podcast={podcast} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Чек-листы */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {checklists.map((checklist) => (
              <Grid item xs={12} sm={6} md={4} key={checklist.id}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Article sx={{ mr: 1, fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h6" component="h3">
                      {checklist.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {checklist.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    href={checklist.downloadUrl}
                    download
                    fullWidth
                  >
                    Скачать PDF
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>
    </Layout>
  );
};

