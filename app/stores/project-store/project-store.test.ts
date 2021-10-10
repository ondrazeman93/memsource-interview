import nock from 'nock';
import { ProjectStoreModel } from './project-store';
import { Project } from '../../models/project/project';
import { setupRootStore } from '../root-store/setup-root-store';

const PROJECT: Project = {
    name: 'test',
    id: '435313',
    sourceLang: 'cs',
    status: 'NEW',
    targetLangs: null,
};

test('can be created', () => {
    const projectsStore = ProjectStoreModel.create({});

    expect(projectsStore).toBeTruthy();
});

test('save projects', () => {
    const projectsStore = ProjectStoreModel.create({});
    projectsStore.saveProjects([PROJECT, PROJECT]);

    expect(projectsStore.projects.length).toBe(2);
});

test('get projects', async () => {
    const rootStore = await setupRootStore();
    const { projectStore } = rootStore;

    const token = 'jdanfkasfbgknfk';

    nock('https://cloud.memsource.com', {
        reqheaders: {
            authorization: `ApiToken ${token}`,
        },
    })
        .get('/web/api2/v1/projects')
        .reply(200, {
            content: [
                {
                    internalId: 4,
                    progress: {
                        overdueCount: 0,
                        totalCount: 0,
                        finishedCount: 0,
                    },
                    dateCreated: '2021-10-09T14:58:12+0000',
                    references: [],
                    id: '22739389',
                    analyseSettings: {
                        id: '193538687',
                    },
                    targetLangs: [
                        'cbk',
                        'ce',
                        'ce_ru',
                        'chr',
                        'cld',
                        'ny',
                        'shu_latn',
                        'shu_latn_ng',
                        'zh',
                        'zh_cn',
                        'zh_hans',
                        'zh_hans_cn',
                        'zh_hk',
                        'zh_mo',
                        'zh_my',
                        'zh_sg',
                        'zh_tw',
                    ],
                    financialSettings: {
                        id: '25858331',
                    },
                    subDomain: null,
                    sourceLang: 'ts_za',
                    businessUnit: null,
                    purchaseOrder: '',
                    dateDue: '2021-10-11T23:00:00+0000',
                    name: 'test 4',
                    owner: {
                        userName: 'ondra.zeman.93',
                        uid: 't8PvxX0A8pMpiWepNy1cH8',
                        id: '652244',
                        firstName: 'Ondřej',
                        lastName: 'Zeman',
                        role: 'ADMIN',
                        email: 'ondra.zeman.93@gmail.com',
                    },
                    uid: '1FBloaRDNZPVkWuf6ckzU3',
                    createdBy: {
                        userName: 'ondra.zeman.93',
                        uid: 't8PvxX0A8pMpiWepNy1cH8',
                        id: '652244',
                        firstName: 'Ondřej',
                        lastName: 'Zeman',
                        role: 'ADMIN',
                        email: 'ondra.zeman.93@gmail.com',
                    },
                    client: null,
                    status: 'NEW',
                    note: '',
                    qualityAssuranceSettings: {
                        id: '25695914',
                    },
                    costCenter: null,
                    domain: null,
                    isPublishedOnJobBoard: false,
                    archived: false,
                    shared: false,
                    userRole: 'ADMIN',
                    accessSettings: {
                        id: '25334004',
                    },
                    mtSettingsPerLanguageList: [
                        {
                            machineTranslateSettings: {
                                type: 'MEMSOURCE_TRANSLATE_SETTINGS',
                                uid: 'WGwg8VqB2br1tGK1HnYMH3',
                                id: '1125309',
                                name: 'Memsource Translate',
                            },
                            targetLang: null,
                        },
                    ],
                    workflowSteps: [],
                },
            ],
        });

    await projectStore.getProjects(token);

    expect(projectStore.projects.length).toBe(1);
});
