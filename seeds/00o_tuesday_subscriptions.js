exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('tuesday_subscriptions').del()
        .then(function () {
            // Inserts seed entries
            return knex('tuesday_subscriptions').insert([
                {
                    uuid: '71726867-8b0e-46ea-ab6f-ed138992df9a',
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
                                        "uuid": "f7fb07b5-11a7-4304-8fd7-9447219717f1"
                                }
                            ],
                                "title": "Job Boards"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": false,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "83cfdddd-a5f7-4f46-b4db-c698f082def7"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "33ce0ce6-7f8e-4e1a-919e-035719852076"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "c2f08cfd-3860-490b-b1ed-c3810c800289"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "017317fd-72bf-411f-a41a-401b4fff5043"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "b1ea9fb5-378a-4616-8142-f5db5a953adf"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "460065c7-f949-4bbb-9397-8a0b2193baf4"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "5efd84d8-4155-421e-8f00-eaad72d4ea9d"
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
                                        "uuid": "7ff858d2-670f-453b-92fd-51398dd05820"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "88b924d8-f158-4cf6-b3d0-11b0588d35ca"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "0100e49e-c3c5-4420-8fb7-d4b223b6b0a2"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "f76faa65-0f19-4d6e-bebc-de39568f4745"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "25be2cba-57fe-4371-bc06-ccf8ce1afd49"
                                }
                            ],
                                "title": "Books"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": false,
                                "sort": "up",
                                "subscriptions": [
                                    {
                                        "userRead": false,
                                        "uuid": "046a8434-14de-443e-b24c-f4998cf2de80"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "8bd35411-98ed-4cf5-8fa5-b416f6ffcfb2"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "32b76269-7bf8-404f-a857-7afdcb6970d7"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "22c40084-bac5-4ff5-9f24-fefaabb78e37"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "3eebc536-dc48-4711-9901-e546f0d73650"
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
                                        "uuid": "4a275da9-36f2-4356-b546-b5052b72bee5"
                                }
                            ],
                                "title": "Music Podcasts"
                        }
                        ]
                    },
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
        });
};
