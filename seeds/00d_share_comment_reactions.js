exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('share_comment_reactions').del()
        .then(function () {
            // Inserts seed entries
            return knex('share_comment_reactions').insert([
                {
                    uuid: 'c6c54cc8-3cda-428f-933c-42b5c7c92ca5',
                    user_uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0',
                    reaction_uuid: '37029257-605a-4938-827c-31600fa6484a',
                    comment_uuid: '7c50ac4f-39cd-4f4e-bd49-fa1c5824f0aa',
                    blogOrPodcast: 'blog',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                        }
                        ])

        });
};