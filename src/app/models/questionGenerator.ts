import { Subject } from 'rxjs';

export interface QuestionGenerator {
  question: string;
  enabledQuestions: string[];
  questionSource: Subject<string>;
  generateQuestions(): void;
  nextQuestion(): void;
  destroy(): void;
}
