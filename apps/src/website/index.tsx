import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Cli } from './pages/cli';
import { Search } from './pages/search';
import { Series } from './pages/series';
import { Template } from './pages/template';
import './style.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/cli" element={<Cli />} />
          <Route path="/template/:templateId" element={<Template />} />
          <Route path="/series/:seriesTitle" element={<Series />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </Main>
    </div>
  );
}

render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Router>,
  document.querySelector('#app'),
);
