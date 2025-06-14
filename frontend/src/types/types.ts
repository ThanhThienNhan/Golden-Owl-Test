export interface StudentScore {
  sbd: string;
  toan?: number | null;
  ngu_van?: number | null;
  ngoai_ngu?: number | null;
  vat_li?: number | null;
  hoa_hoc?: number | null;
  sinh_hoc?: number | null;
  lich_su?: number | null;
  dia_li?: number | null;
  gdcd?: number | null;
  ma_ngoai_ngu?: string | null;
}

export interface ScoreStatistics {
  [subject: string]: {
    ">=8": number;
    "6-8": number;
    "4-6": number;
    "<4": number;
  };
}

export interface SubjectReport {
  ">=8": number;
  "6-8": number;
  "4-6": number;
  "<4": number;
}

export const LABELS = [
  { key: "sbd", label: "Registration Number" },
  { key: "toan", label: "Math" },
  { key: "ngu_van", label: "Literature" },
  { key: "ngoai_ngu", label: "Foreign Language" },
  { key: "vat_li", label: "Physics" },
  { key: "hoa_hoc", label: "Chemistry" },
  { key: "sinh_hoc", label: "Biology" },
  { key: "lich_su", label: "History" },
  { key: "dia_li", label: "Geography" },
  { key: "gdcd", label: "Civic Education" },
  { key: "ma_ngoai_ngu", label: "Foreign Language Code" },
];

export const SUBJECTS = [
  { key: "toan", label: "Math" },
  { key: "ngu_van", label: "Literature" },
  { key: "ngoai_ngu", label: "Foreign Language" },
  { key: "vat_li", label: "Physics" },
  { key: "hoa_hoc", label: "Chemistry" },
  { key: "sinh_hoc", label: "Biology" },
  { key: "lich_su", label: "History" },
  { key: "dia_li", label: "Geography" },
  { key: "gdcd", label: "Civic Education" },
];
