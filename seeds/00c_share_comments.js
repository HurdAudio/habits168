exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('share_comments').del()
        .then(function () {
            // Inserts seed entries
            return knex('share_comments').insert([
                {
                    uuid: '7c50ac4f-39cd-4f4e-bd49-fa1c5824f0aa',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    share_uuid: '1ff13dbd-579d-4415-bf94-93a2e67f6659',
                    blogOrPodcast: 'blog',
                    comment: 'Death by pharmacological greed. Disgusting.',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                        }
                        ])

        });
};
