import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const ProjectModel = types.model('Project').props({
    id: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    sourceLang: types.maybeNull(types.string),
    targetLangs: types.maybeNull(types.array(types.string)),
    status: types.maybeNull(types.string),
});

type ProjectType = Instance<typeof ProjectModel>;
export interface Project extends ProjectType {}
type ProjectSnapshotType = SnapshotOut<typeof ProjectModel>;
export interface ProjectSnapshot extends ProjectSnapshotType {}
export const createProjectDefaultModel = () => types.optional(ProjectModel, {});
