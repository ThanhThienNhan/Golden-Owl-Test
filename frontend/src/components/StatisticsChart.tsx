import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { ScoreStatistics } from '../types/types';
import { SUBJECTS } from '../types/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface StatisticsChartProps {
  data: ScoreStatistics;
}

const StatisticsChart = ({ data }: StatisticsChartProps) => {
  const subjects = Object.keys(data);
  const ranges = ['>=8', '6-8', '4-6', '<4'] as const;

  const labels = subjects.map(subject => {
    const label = SUBJECTS.find(item => item.key === subject);
    return label ? label.label : subject; 
  });

  const chartData = {
    labels: labels,
    datasets: ranges.map(range => ({
      label: range,
      data: subjects.map(subject => data[subject][range]),
      backgroundColor: 
        range === '>=8' ? 'rgba(75, 192, 192, 0.6)' :
        range === '6-8' ? 'rgba(54, 162, 235, 0.6)' :
        range === '4-6' ? 'rgba(255, 206, 86, 0.6)' :
        'rgba(255, 99, 132, 0.6)',
      borderColor: 
        range === '>=8' ? 'rgba(75, 192, 192, 1)' :
        range === '6-8' ? 'rgba(54, 162, 235, 1)' :
        range === '4-6' ? 'rgba(255, 206, 86, 1)' :
        'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Score Distribution by Subject',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="w-full min-h-[400px] p-4 bg-white rounded-lg shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StatisticsChart;