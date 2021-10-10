import { UserStoreModel } from './user-store';
import { User } from '../../models/user/user';
import { setupRootStore } from '../root-store/setup-root-store';

const USER: User = {
    name: 'Ondra',
    id: '131546',
    token: 'adfalfkabgkabka',
};

test('can be created', () => {
    const userStore = UserStoreModel.create({});

    expect(userStore).toBeTruthy();
});

test('save user', () => {
    const userStore = UserStoreModel.create({});
    userStore.saveUser(USER);

    expect(userStore.user).toEqual(USER);
});

test('user getters', () => {
    const userStore = UserStoreModel.create({});
    userStore.saveUser(USER);

    expect(userStore.hasUser).toBeTruthy();
    expect(userStore.getUserId).toEqual(USER.id);
    expect(userStore.getUserToken).toEqual(USER.token);
});

test('user login', async () => {
    const rootStore = await setupRootStore();
    const { userStore } = rootStore;

    await userStore.loginUser('ondra.zeman.93', 'N87pO0u%9Aq2M7hU$wvP');
    expect(userStore.hasUser).toBeTruthy();
});
