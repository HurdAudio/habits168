exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('art_podcasts').del()
        .then(function () {
            // Inserts seed entries
            return knex('art_podcasts').insert([
                {
                    art_uuid: 'ef83f6e1-9cde-4a2f-bfd2-b3d299ab0f27',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: 'c18ed947-76bc-4f0a-8554-6a306e137d9c',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: '5cb2083c-0fdd-4656-8890-5a8c004fc34b',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: '9e1c4ca3-d4b0-4f45-8b2f-c70551df1cac',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: '0ed68c5d-d936-400c-aed2-65aa69fc29bb',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: 'cbf0b29f-c524-46d3-ba20-f66c986f2099',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: '4f90a738-8997-4d13-a474-e99352eefe48',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: '6d40d0de-4321-4110-a5a6-623fb4cb90fc',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
        });
};
