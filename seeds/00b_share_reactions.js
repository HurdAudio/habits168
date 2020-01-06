exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('share_reactions').del()
        .then(function () {
            // Inserts seed entries
            return knex('share_reactions').insert([
                {
                    uuid: '6ada9601-a4bb-49d1-9198-c595acec2818',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    reaction_uuid: '9f37cdef-5e87-4d70-83ac-b81a3e9ab3ff',
                    share_uuid: '1ff13dbd-579d-4415-bf94-93a2e67f6659',
                    blogOrPodcast: 'blog',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                        },
                {
                    uuid: '46fc3bfb-30d6-4893-8031-f4bbe7f8e830',
                    user_uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0',
                    reaction_uuid: '70887015-be67-456c-940c-c19a623efe1b',
                    share_uuid: '1ff13dbd-579d-4415-bf94-93a2e67f6659',
                    blogOrPodcast: 'blog',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                },
                {
                    uuid: '21a42e8d-e0b9-40df-91eb-9df4e970a3c5',
                    user_uuid: 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6',
                    reaction_uuid: '70887015-be67-456c-940c-c19a623efe1b',
                    share_uuid: '1ff13dbd-579d-4415-bf94-93a2e67f6659',
                    blogOrPodcast: 'blog',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                },
                {
                    uuid: '20b1f2cd-e90b-4c0e-8273-b3ce8d8f764e',
                    user_uuid: '03ad421c-aad5-47b1-88ab-d7822f6c3eb7',
                    reaction_uuid: '70887015-be67-456c-940c-c19a623efe1b',
                    share_uuid: '1ff13dbd-579d-4415-bf94-93a2e67f6659',
                    blogOrPodcast: 'blog',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                },
                {
                    uuid: '6977bde8-41ce-4f0e-8f57-aa71d82c3400',
                    user_uuid: '03ad421c-aad5-47b1-88ab-d7822f6c3eb7',
                    reaction_uuid: '328b0607-0dd3-4f7a-84af-57db09182877',
                    share_uuid: '1ff13dbd-579d-4415-bf94-93a2e67f6659',
                    blogOrPodcast: 'blog',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                },
                {
                    uuid: 'ecadbe38-9ea0-4c7f-8064-835698bbcae4',
                    user_uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0',
                    reaction_uuid: '328b0607-0dd3-4f7a-84af-57db09182877',
                    share_uuid: '1ff13dbd-579d-4415-bf94-93a2e67f6659',
                    blogOrPodcast: 'blog',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                }
                        ])

        });
};