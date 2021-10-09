import { UserModel } from './User';

test('can be created', () => {
    const instance = UserModel.create({
        id: '1',
        name: 'Ondra Zeman',
        token: 'adsffgnfobbakjbgkbgkbo',
    });

    expect(instance).toBeTruthy();
});
