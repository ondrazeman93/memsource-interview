import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { UserModel, UserSnapshot } from '../../models/user/user';
import { withEnvironment } from '../../models';

export const UserStoreModel = types
    .model('UserStore')
    .props({
        user: types.maybeNull(UserModel),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveUser: (userSnapshot: UserSnapshot) => {
            self.user = UserModel.create(userSnapshot);
        },
    }))
    .actions((self) => ({
        loginUser: async (username: string, password: string) => {
            const result = await self.environment.api.loginUser(username, password);
            if (result.kind === 'ok') {
                self.saveUser(result.user);
            } else {
                console.log(result.kind);
            }
        },
    }))
    .views((self) => ({
        get getUserId(): string | undefined {
            return self.user?.id;
        },
        get getUserToken(): string | undefined {
            return self.user?.token;
        },
        get hasUser(): boolean {
            return self.user && !!self.user.token;
        },
    }));

type UserStoreType = Instance<typeof UserStoreModel>;

export interface UserStore extends UserStoreType {}

type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>;

export interface UserStoreSnapshot extends UserStoreSnapshotType {}

export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {});
