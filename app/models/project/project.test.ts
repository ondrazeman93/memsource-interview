import { ProjectModel } from './project';

test('can be created', () => {
    const instance = ProjectModel.create({
        id: '1',
        name: 'Test',
        sourceLang: 'cs',
        status: 'New',
        targetLangs: ['cs', 'en'],
    });

    expect(instance).toBeTruthy();
});
