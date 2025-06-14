import { useState } from 'react';
import Loading from './Loading';
import { LABELS, type StudentScore } from '../types/types';


interface ScoreInputProps {
  onSearch: (sbd: string) => Promise<void>;
  scoreData: StudentScore | null;
  isLoading: boolean;
  error: string | null;
}

const ScoreInput = ({ onSearch, scoreData, isLoading, error }: ScoreInputProps) => {
  const [sbd, setSbd] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedSbd, setLastSubmittedSbd] = useState(''); 

  const isValidSbd = /^[0-9]{8}$/.test(sbd);

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setTouched(true);
  if (isValidSbd) {
    setSubmitted(true);
    setLastSubmittedSbd(sbd);
    onSearch(sbd);
  }
};

  const showScore = !isLoading && scoreData;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sbd" className="block text-sm font-medium text-gray-700">
            Student Registration Number
          </label>
          <input
            type="text"
            id="sbd"
            value={sbd}
            onChange={(e) => setSbd(e.target.value)}
            onBlur={() => setTouched(true)}
            className={`mt-1 block w-full px-3 py-2 border ${
              touched && !isValidSbd ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter Registration Number (e.g., 01000001)"
            required
          />
          {touched && !isValidSbd && (
            <p className="text-sm text-red-500 mt-1">Registration Number must be 8 digits (e.g., 01000001)</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValidSbd || isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isValidSbd && !isLoading
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isLoading ? 'Loading...' : 'Check Score'}
        </button>
      </form>

      {isLoading && <Loading />}

      {!isLoading && submitted && !scoreData && !error && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded">
          Student not found with Registration Number: <strong>{lastSubmittedSbd}</strong>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showScore && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Score Details</h3>
          <div className="grid grid-cols-2 gap-4">
            {LABELS.map(({ key, label }) => (
              <div key={key} className="flex flex-col">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-base font-medium text-gray-800">
                  {scoreData[key as keyof StudentScore] ?? 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreInput;