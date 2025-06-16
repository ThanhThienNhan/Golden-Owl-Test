import { useState, useEffect } from 'react';
import StatisticsChart from '../components/StatisticsChart';
import { SUBJECTS, type ScoreStatistics } from '../types/types';
import { getAllStatistics } from '../api/student-score/student-score';
import Loading from '../components/Loading';

const Statistics = () => {
  const [statistics, setStatistics] = useState<ScoreStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getAllStatistics();
        setStatistics(data);
      } catch (err) {
        setError('Failed to fetch statistics data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-semibold text-center mb-8">Score Statistics</h1>
      
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      ) : statistics ? (
        <div className="max-w-4xl mx-auto">
          <StatisticsChart data={statistics} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(statistics).map(([subject, stats]) => (
              <div key={subject} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium capitalize mb-2">
                  {SUBJECTS.find((s) => s.key === subject)?.label || subject}
                </h3>                
                <ul className="space-y-1">
                  {Object.entries(stats).map(([range, count]) => (
                    <li key={range} className="flex justify-between">
                      <span>{range}:</span>
                      <span>{count.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Statistics;