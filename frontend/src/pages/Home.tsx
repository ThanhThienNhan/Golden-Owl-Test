import { useState } from 'react';
import ScoreInput from '../components/ScoreInput';
import { getStudentScore } from '../api/student-score/student-score';
import type { StudentScore } from '../types/types';

const Home = () => {
  const [scoreData, setScoreData] = useState<StudentScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (sbd: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStudentScore(sbd);
      setScoreData(data);
    } catch (err) {
      setError('Failed to fetch student score. Please check the Registration Number and try again.');
      setScoreData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-semibold text-center mb-8">Student Score Checker</h1>
      <ScoreInput 
        onSearch={handleSearch} 
        scoreData={scoreData} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
};

export default Home;