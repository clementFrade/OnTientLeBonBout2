import { IQuestion } from 'app/shared/model/question.model';
import { IUser } from 'app/core/user/user.model';

export interface IQuestionnaire {
  id?: number;
  questions?: IQuestion[];
  users?: IUser[];
}

export class Questionnaire implements IQuestionnaire {
  constructor(public id?: number, public questions?: IQuestion[], public users?: IUser[]) {}
}
