import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import TopGroupA from './pages/TopGroupA';
import Reports from './pages/Reports';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/top-students" element={<TopGroupA />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;