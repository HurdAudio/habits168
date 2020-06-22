exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('wednesday_subscriptions').del()
        .then(function () {
            // Inserts seed entries
            return knex('wednesday_subscriptions').insert([
                {
                    uuid: 'e66aa2a6-087c-4f80-84b4-5b9ae85ed445',
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
                                        "uuid": "af66bdc7-e46c-43b8-a39c-878d80f01b6b"
                                },
                                    {
                                       "userRead": false,
                                        "uuid": "f99c2c48-c52c-4d9d-8d60-8756a61620a6"
                                },
                                    {
                                       "userRead": false,
                                        "uuid": "fceb9120-e6a1-4be1-bbe5-aef9db874440"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "cce488c6-e563-4de3-b6bc-266ba896ce61"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "03520f1f-b069-4a3d-9329-69451cf9c9e6"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "6ba1eb91-375b-4d49-b47a-f9661682f9ba"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "66a55437-b871-43c3-b420-fb4fd4b3105f"
                                }
                            ],
                                "title": "Coding"
                        },
                        {
                            "active": false,
                            "allRead": false,
                            "podcast": false,
                            "sort": "up",
                            "subscriptions": [
                                {
                                    "userRead": false,
                                    "uuid": "2cae1952-92b6-47ba-a071-6c26ffb7bf3b"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "4fab6bab-b9bf-4e30-8ff4-2b2929d624be"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "a03e655b-8905-4009-8637-054a3a2781f0"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "5b0e0672-1206-476e-86e1-6a5c10cf0eb9"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "e6d6a7ec-ab9a-4b89-a4e3-cb9309e25b22"
                            }
                        ],
                            "title": "Writing"
                        },
                        {
                            "active": false,
                            "allRead": false,
                            "podcast": false,
                            "sort": "up",
                            "subscriptions": [
                                {
                                    "userRead": false,
                                    "uuid": "fdb900a9-b8d3-4408-b7f2-f379a468df22"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "bb51cad9-ef52-4910-9184-559edd28647f"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "a56f0791-9ade-4c22-9ef8-564efdaaa4ff"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "d4449a9f-0589-4875-bb7e-daa523666a94"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "5a271358-a6d3-471a-ba17-30f481d3b98b"
                            }
                            ],
                            "title": "Politics"   
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": true,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "e77fb9d5-5df2-40fd-9010-0d65435c49ca"
                            }
                            ],
                            "title": "Book Podcasts"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": true,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "ced9116d-00e6-4b86-b99a-b50c65b1be7b"
                                }
                            ],
                            "title": "Coding Podcasts"
                        }
                        ]
                    },
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
        });
};
