import { Project } from '../models/project/project';
import { GeneralApiProblem } from '../services/api/api-problem';

export enum STATUSES {
    NEW = 'NEW',
    ASSIGNED = 'ASSIGNED',
    COMPLETED = 'COMPLETED',
    ACCEPTED_BY_VENDOR = 'ACCEPTED_BY_VENDOR',
    DECLINED_BY_VENDOR = 'DECLINED_BY_VENDOR',
    COMPLETED_BY_VENDOR = 'COMPLETED_BY_VENDOR',
    CANCELLED = 'CANCELLED',
}

export type GetProjectResult = { kind: 'ok'; projects: Project[] } | GeneralApiProblem;
