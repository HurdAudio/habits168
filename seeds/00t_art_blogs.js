exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('art_blogs').del()
        .then(function () {
            // Inserts seed entries
            return knex('art_blogs').insert([
                {
                    art_uuid: '0e0e0359-c8db-4290-a50c-3c9bf9f7635b',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: 'f40998d9-be6c-43d3-a110-a38a3eba2834',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: '9a3d2f71-9ca3-4c8f-85f0-a38a6df70912',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: 'defa75f9-f581-4410-8586-4825e498ced1',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    art_uuid: '52039a0b-79c8-407e-91f2-4e67db67dc6d',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
    });
};
