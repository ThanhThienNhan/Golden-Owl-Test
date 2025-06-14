import { useState, useEffect } from "react";

import type { StudentScore } from "../types/types";
import { getTopGroupA } from "../api/student-score/student-score";
import Loading from "../components/Loading";

const TopGroupA = () => {
  const [topStudents, setTopStudents] = useState<StudentScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        const data = await getTopGroupA();
        setTopStudents(data);
      } catch (err) {
        setError("Failed to fetch top students data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopStudents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-semibold text-center mb-8">Top Group A Students</h1>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left border border-gray-300">
                  #
                </th>
                <th className="py-3 px-4 text-left border border-gray-300">
                  Registration Number
                </th>
                <th className="py-3 px-4 text-left border border-gray-300">
                  Math
                </th>
                <th className="py-3 px-4 text-left border border-gray-300">
                  Physics
                </th>
                <th className="py-3 px-4 text-left border border-gray-300">
                  Chemistry
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {topStudents.map((student, index) => (
                <tr key={student.sbd} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {student.sbd}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {student.toan ?? "N/A"}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {student.vat_li ?? "N/A"}
                  </td>
                  <td className="py-3 px-4 border border-gray-300">
                    {student.hoa_hoc ?? "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopGroupA;
