import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { Project, ProjectModel } from '../../models/project/project';
import { withEnvironment } from '../../models';

export const ProjectStoreModel = types
    .model('ProjectModel')
    .props({
        projects: types.optional(types.array(ProjectModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveProjects: (projects: Project[]) => {
            self.projects.replace(projects);
        },
    }))
    .actions((self) => ({
        getProjects: async (token: string, selectedDueDate?: number) => {
            const result = await self.environment.api.getProjects(token, selectedDueDate);
            if (result.kind === 'ok') {
                self.saveProjects(result.projects);
            } else {
                console.log(result.kind);
            }
        },
    }));

type ProjectStoreType = Instance<typeof ProjectStoreModel>;

export interface ProjectStore extends ProjectStoreType {}

type ProjectStoreSnapshotType = SnapshotOut<typeof ProjectStoreModel>;

export interface ProjectStoreSnapshot extends ProjectStoreSnapshotType {}

export const createProjectStoreDefaultModel = () => types.optional(ProjectStoreModel, {});
