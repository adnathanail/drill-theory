import { Subject } from 'rxjs';

export interface QuestionGenerator {
  question: string;
  enabledQuestions: string[];
  pageUpdateSource: Subject<void>;
  generateQuestions(): void;
  nextQuestion(): void;
  destroy(): void;
}
