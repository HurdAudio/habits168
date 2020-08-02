exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('tech_podcasts').del()
        .then(function () {
            // Inserts seed entries
            return knex('tech_podcasts').insert([
                {
                    tech_uuid: '7f5aca06-17bf-4c99-8c8f-af561999498c',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'ced9116d-00e6-4b86-b99a-b50c65b1be7b',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
        });
};
