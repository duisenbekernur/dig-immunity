/**
 * Компонент карточки подкаста
 */

import { Card } from '../Card/Card';
import { Typography, Box, Chip } from '@mui/material';
import { Headphones, PlayArrow } from '@mui/icons-material';
import { Podcast } from '../../mocks/podcasts';

interface PodcastCardProps {
  podcast: Podcast;
  onClick?: () => void;
}

export const PodcastCard = ({ podcast, onClick }: PodcastCardProps) => {
  return (
    <Card
      title={podcast.title}
      description={podcast.description}
      image={podcast.thumbnail}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <PlayArrow fontSize="small" />
          <Typography variant="caption">{podcast.duration}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Headphones fontSize="small" />
          <Typography variant="caption">{podcast.listens.toLocaleString()}</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
        <Chip label={podcast.category} size="small" />
        <Chip label={`Эпизод ${podcast.episode}`} size="small" variant="outlined" />
      </Box>
    </Card>
  );
};

