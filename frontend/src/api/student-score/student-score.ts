import type { ScoreStatistics, StudentScore, SubjectReport } from "../../types/types";
import apiClient from "../axios";

export const getStudentScore = async (sbd: string) => {
  const response = await apiClient.get<StudentScore>(`/student-score/${sbd}`);
  return response.data;
};

export const getAllStatistics = async () => {
  const response = await apiClient.get<ScoreStatistics>('/student-score/statistics');
  return response.data;
};

export const getSubjectReport = async (subject: string) => {
  const response = await apiClient.get<SubjectReport>(`/student-score/report/${subject}`);
  return response.data;
};

export const getTopGroupA = async () => {
  const response = await apiClient.get<StudentScore[]>('/student-score/top/group-a');
  return response.data;
};