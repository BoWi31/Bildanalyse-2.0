
export interface StepData {
  number: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  contextText?: string; // New: Descriptive text for historical context
  points: string[];
  sentenceStarters: string[];
  hints: string[];
  extraInfo?: string;
}
