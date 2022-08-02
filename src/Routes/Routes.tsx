import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Home = React.lazy(() => import(/* webpackChunkName: "login" */ '@/scenes/Home'));
const Organizations = React.lazy(() => import(/* webpackChunkName: "login" */ '@scenes/Organizations/Organizations'));
const Card = React.lazy(() => import(/* webpackChunkName: "login" */ '@scenes/Organizations/Card'));
const InProgress = React.lazy(() => import(/* webpackChunkName: "login" */ '@scenes/InProgress'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "login" */ '@/scenes/NotFound'));

const Router: React.FC = () => {
  return (
    <Suspense
      fallback={
        <CircularProgress color="primary"
          sx={{position: 'absolute', top: '48%', left: '50%', color: '#82B284'}}
        />
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<InProgress />} />
        <Route path="/market/organizations" element={<Organizations />} />
        <Route path="/market/organizations/:id" element={<Card />} />
        <Route path="/search" element={<InProgress />} />
        <Route path="/settings" element={<InProgress />} />
        <Route path="/chat" element={<InProgress />} />
        <Route path="/exit" element={<InProgress />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
