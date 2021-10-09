import { GeneralApiProblem } from '../services/api/api-problem';
import { User } from '../models/user/user';

export type GetUserResult = { kind: 'ok'; user: User } | GeneralApiProblem;
