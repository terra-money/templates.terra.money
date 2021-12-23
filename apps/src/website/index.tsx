import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Search } from './pages/search';
import { Series } from './pages/series';
import { Template } from './pages/template';
import './style.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/template/:templateId" element={<Template />} />
          <Route path="/series/:seriesId" element={<Series />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <Footer />
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
