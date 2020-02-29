exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('dailies').del()
        .then(function () {
            // Inserts seed entries
            return knex('dailies').insert([
                {
                    uuid: 'bc1e3c01-a01b-423c-9e42-fd83ab3d5e9c',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    dailies: {
                        "dailies": {
                            "allRead": false,
                            "podcast": false,
                            "sort": "up",
                            "subscriptions": [
                                {
                                    "userRead": false,
                                    "uuid": "b1c2eff2-81e8-4f19-a1ba-8fff123fb89a"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "9546ff34-ff07-4e31-9332-786ea544ec47"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "321d2897-f108-45c1-96ca-3aa70ec46590"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "2c7be513-9083-439c-937f-42bbe95c0cb9"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "b081d79b-ff77-4586-83f3-e9eea5e22c9a"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "5eb65b5e-6896-4357-94af-e48fad7c64cc"
                                }
                                    ]
                        }
                    },
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
                }]);
        });
};
