exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('monday_subscriptions').del()
        .then(function () {
            // Inserts seed entries
            return knex('monday_subscriptions').insert([
                {
                    uuid: '8a7ae5e9-dc0e-4276-8a63-5b35b8c6c3fc',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    tabs: {
                        "tabs": [
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": false,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "79f05037-72d3-497e-a57a-54012a79407b"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "009b6c3f-14a2-4add-abc2-4ea3380ae67c"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "4de05f59-d8df-49a0-9ad7-4cc9b80f15ae"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "09689d96-f0fb-4a3e-ad8c-1d71cb9545a8"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "c1979d0e-d388-44ca-8ab0-a41d422c831a"
                                }
                            ],
                                "title": "Music"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": true,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "ec2f85e6-aa1d-4195-98f5-217e0525f714"
                                }
                            ],
                                "title": "Music Podcasts"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": false,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "4c2a61cb-27a2-4c56-805a-8282bcf11221"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "08030a4a-4d9c-4003-89cc-872ad78c8d89"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "bb51cad9-ef52-4910-9184-559edd28647f"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "972a2dbc-9441-4c12-a262-e3119559d47d"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "67dce9dc-df80-4ce4-8516-cf79f3e2388e"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "67063476-7716-49e8-8c10-122989636ccd"
                                }
                            ],
                                "title": "Politics"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": false,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "e8249664-185f-444e-acd0-20928581bfb8"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "a4e7fedd-46fb-4d9f-9c17-e8593c0c949b"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "f9bc3d9c-5960-4fa6-aa28-1b43a01cc73f"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "25243f5e-e861-4252-abc5-ccf7aa5c8f8b"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "99f6b8cc-dbde-4757-abb3-e46cf6a1ecb1"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "a10dc8ef-98ec-4b9e-b5f3-3c4705cb13f2"
                                }
                            ],
                                "title": "Tech"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": true,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "7f5aca06-17bf-4c99-8c8f-af561999498c"
                                }
                            ],
                                "title": "Tech Podcasts"
                        }
                        ]
                    },
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
        });
};
