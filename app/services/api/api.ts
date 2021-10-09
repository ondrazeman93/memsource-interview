import { ApisauceInstance, create, ApiResponse } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import { GetProjectResult } from '../../types/project';
import { GetUserResult } from '../../types/user';
import { User } from '../../models/user/user';
import { Project } from '../../models/project/project';

/**
 * Manages all requests to the API.
 */
export class Api {
    /**
     * The underlying apisauce instance which performs the requests.
     */
    apisauce: ApisauceInstance;

    /**
     * Configurable options.
     */
    config: ApiConfig;

    /**
     * Creates the api.
     *
     * @param config The configuration to use.
     */
    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config;
    }

    /**
     * Sets up the API.  This will be called during the bootup
     * sequence and will happen before the first React component
     * is mounted.
     *
     * Be as quick as possible in here.
     */
    setup() {
        // construct the apisauce instance
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: 'application/json',
            },
        });
    }

    /**
     * Login user
     */
    async loginUser(userName: string, password: string): Promise<GetUserResult> {
        const response: ApiResponse<any> = await this.apisauce.post(`api2/v1/auth/login`, {
            userName,
            password,
        });

        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem) return problem;
        }

        try {
            const rawUser = response.data;
            const resultUser: User = {
                id: rawUser.user.id,
                token: rawUser.token,
                name: rawUser.user.userName,
            };
            return { kind: 'ok', user: resultUser };
        } catch {
            return { kind: 'bad-data' };
        }
    }

    /**
     * Gets a list of projects
     */
    async getProjects(token: string, dueInHours?: number): Promise<GetProjectResult> {
        const response: ApiResponse<any> = await this.apisauce.get(
            `api2/v1/projects`,
            dueInHours ? { dueInHours } : undefined,
            {
                headers: {
                    Authorization: `ApiToken ${token}`,
                },
            },
        );

        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response);
            if (problem) return problem;
        }

        const convertProject = (raw): Project => {
            return {
                id: raw.id,
                name: raw.name,
                sourceLang: raw.sourceLang,
                status: raw.status,
                targetLangs: raw.targetLangs,
            };
        };

        // transform the data into the format we are expecting
        try {
            const rawProjects = response.data.content;
            const resultProjects = rawProjects.map(convertProject);
            return { kind: 'ok', projects: resultProjects };
        } catch {
            return { kind: 'bad-data' };
        }
    }
}
