import { useState, useEffect } from 'react';
import { SUBJECTS, type SubjectReport } from '../types/types';
import { getSubjectReport } from '../api/student-score/student-score';
import Loading from '../components/Loading';



const Reports = () => {
  const [subject, setSubject] = useState<string>('');
  const [report, setReport] = useState<SubjectReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selected = e.target.value;
  setSubject(selected);
  if (!selected) {
    setReport(null);
    setError(null);
  }
};


  useEffect(() => {
    const fetchReport = async () => {
      if (!subject) return;

      setIsLoading(true);
      setError(null);
      try {
        const data = await getSubjectReport(subject);
        setReport(data);
      } catch (err) {
        setError('Failed to fetch report data.');
        setReport(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [subject]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-semibold text-xl mb-6">Score Report by Subject</h1>

      <div className="max-w-md mx-auto mb-8">
        <label htmlFor="subject" className="block mb-2 font-medium">Select a subject:</label>
        <select
          id="subject"
          className="w-full border rounded px-3 py-2"
          value={subject}
          onChange={handleChange}
        >
          <option value="">-- Choose a subject --</option>
          {SUBJECTS.map(sub => (
            <option key={sub.key} value={sub.key}>
              {sub.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <Loading />}

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {!isLoading && !error && report && (
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Score Distribution of {SUBJECTS.find(sub => sub.key === subject)?.label || ''}</h2>
            <ul className="space-y-3">
              <li className="flex justify-between p-3 bg-green-50 rounded">
                <span className="font-medium">≥ 8 points:</span>
                <span>{report[">=8"].toLocaleString()}</span>
              </li>
              <li className="flex justify-between p-3 bg-blue-50 rounded">
                <span className="font-medium">6 - 8 points:</span>
                <span>{report["6-8"].toLocaleString()}</span>
              </li>
              <li className="flex justify-between p-3 bg-yellow-50 rounded">
                <span className="font-medium">4 - 6 points:</span>
                <span>{report["4-6"].toLocaleString()}</span>
              </li>
              <li className="flex justify-between p-3 bg-red-50 rounded">
                <span className="font-medium">&lt; 4 points:</span>
                <span>{report["<4"].toLocaleString()}</span>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Total Students:</h3>
              <p className="text-lg">
                {Object.values(report).reduce((sum, count) => sum + count, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
