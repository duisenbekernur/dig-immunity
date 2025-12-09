/**
 * Страница админ-панели
 */

import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Layout } from '../../components/Layout/Layout';
import { getOverallStats, regions, fakeNewsTopics } from '../../mocks/map';
import { mockUsers } from '../../mocks/users';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const AdminPage = () => {
  const stats = getOverallStats();

  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Админ-панель
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Общая статистика и управление платформой Digital Immunity.
        </Typography>

        {/* Общая статистика */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {stats.totalUsers.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Всего пользователей
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {stats.totalFakeNews.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Обнаружено фейков
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {stats.avgIQ}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Средний Digital IQ
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {stats.activeRegions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Активных регионов
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Региональное сравнение */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Региональное сравнение
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="digitalIQ" fill="#8884d8" name="Digital IQ" />
                  <Bar dataKey="fakeNewsDetected" fill="#82ca9d" name="Фейки" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Тренды фейков */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Тренды фейков по темам
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fakeNewsTopics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ topic, percentage }) => `${topic}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {fakeNewsTopics.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Таблица пользователей */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Пользователи
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Имя</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Регион</TableCell>
                  <TableCell>Digital IQ</TableCell>
                  <TableCell>Уровень</TableCell>
                  <TableCell>Видео</TableCell>
                  <TableCell>Тесты</TableCell>
                  <TableCell>Игра</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.region}</TableCell>
                    <TableCell>{user.digitalIQ}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.level}
                        size="small"
                        color={
                          user.level === 'Expert'
                            ? 'success'
                            : user.level === 'Skilled'
                            ? 'warning'
                            : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>{user.videosWatched}</TableCell>
                    <TableCell>{user.testsCompleted}</TableCell>
                    <TableCell>{user.gameScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Layout>
  );
};

