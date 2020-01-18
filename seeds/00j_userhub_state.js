exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('userhub_state').del()
        .then(function () {
            // Inserts seed entries
            return knex('userhub_state').insert([
                {
                    uuid: '405fdf88-fe30-4f7d-92c5-82d49505bcd1',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    tabs: 'shared',
                    sub_week: false,
                    sub_management: false,
                    profile_state: 'public',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2019-08-14 20:06:55.000 UTC')
        },
                {
                    uuid: 'c9c93da9-22ab-4349-ad4f-f22c505acc13',
                    user_uuid: '03ad421c-aad5-47b1-88ab-d7822f6c3eb7',
                    tabs: 'shared',
                    sub_week: false,
                    sub_management: false,
                    profile_state: 'public',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2019-08-14 20:06:55.000 UTC')
        },
                {
                    uuid: 'f7b4804e-4176-4bbe-a75b-5c38ea7cfdbd',
                    user_uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0',
                    tabs: 'shared',
                    sub_week: false,
                    sub_management: false,
                    profile_state: 'public',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2019-08-14 20:06:55.000 UTC')
        },
                {
                    uuid: '170ecc85-8408-4d3e-9f7f-307e6f397fd6',
                    user_uuid: 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6',
                    tabs: 'shared',
                    sub_week: false,
                    sub_management: false,
                    profile_state: 'public',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2019-08-14 20:06:55.000 UTC')
        }
      ]);
        });
};
