/**
 * Компонент карточки видео
 */

import { Card } from '../Card/Card';
import { Typography, Box, Chip } from '@mui/material';
import { PlayArrow, Visibility } from '@mui/icons-material';
import { Video } from '../../mocks/videos';

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}

export const VideoCard = ({ video, onClick }: VideoCardProps) => {
  return (
    <Card
      title={video.title}
      description={video.description}
      image={video.thumbnail}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <PlayArrow fontSize="small" />
          <Typography variant="caption">{video.duration}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Visibility fontSize="small" />
          <Typography variant="caption">{video.views.toLocaleString()}</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Chip label={video.category} size="small" />
      </Box>
    </Card>
  );
};

