exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('tech_blogs').del()
        .then(function () {
            // Inserts seed entries
            return knex('tech_blogs').insert([
                {
                    tech_uuid: '2c7be513-9083-439c-937f-42bbe95c0cb9',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '3b7cdbfa-751e-4622-85e2-31c17abd351f',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'a10dc8ef-98ec-4b9e-b5f3-3c4705cb13f2',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                 {
                    tech_uuid: 'a4e7fedd-46fb-4d9f-9c17-e8593c0c949b',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '25243f5e-e861-4252-abc5-ccf7aa5c8f8b',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'f9bc3d9c-5960-4fa6-aa28-1b43a01cc73f',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '99f6b8cc-dbde-4757-abb3-e46cf6a1ecb1',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'e8249664-185f-444e-acd0-20928581bfb8',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '83cfdddd-a5f7-4f46-b4db-c698f082def7',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '33ce0ce6-7f8e-4e1a-919e-035719852076',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'c2f08cfd-3860-490b-b1ed-c3810c800289',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '017317fd-72bf-411f-a41a-401b4fff5043',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'b1ea9fb5-378a-4616-8142-f5db5a953adf',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '460065c7-f949-4bbb-9397-8a0b2193baf4',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '5efd84d8-4155-421e-8f00-eaad72d4ea9d',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'af66bdc7-e46c-43b8-a39c-878d80f01b6b',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'f99c2c48-c52c-4d9d-8d60-8756a61620a6',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'fceb9120-e6a1-4be1-bbe5-aef9db874440',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'cce488c6-e563-4de3-b6bc-266ba896ce61',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '03520f1f-b069-4a3d-9329-69451cf9c9e6',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '6ba1eb91-375b-4d49-b47a-f9661682f9ba',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '66a55437-b871-43c3-b420-fb4fd4b3105f',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '3b7b5a1e-3e6a-48a3-9814-5dcebcef1a0c',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '6559bfa8-3517-4742-a16c-6f55b251765d',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'b3c9d26e-08a3-4531-9005-5775b379db1f',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: 'dfef5179-d748-47dc-8c23-2f5b6ef9cb54',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '1589c23f-0cb5-4f9d-b43d-b110d2dbeb6d',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        },
                {
                    tech_uuid: '2de0d70f-a250-4dfc-9950-80cd69f92684',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
        });
};
