exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('thursday_subscriptions').del()
        .then(function () {
            // Inserts seed entries
            return knex('thursday_subscriptions').insert([
                {
                    uuid: '601ecbcf-7900-4b67-9afe-88d009ab50c6',
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
                                        "uuid": "3b7b5a1e-3e6a-48a3-9814-5dcebcef1a0c"
                                },
                                    {
                                       "userRead": false,
                                        "uuid": "6559bfa8-3517-4742-a16c-6f55b251765d"
                                },
                                    {
                                       "userRead": false,
                                        "uuid": "b3c9d26e-08a3-4531-9005-5775b379db1f"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "dfef5179-d748-47dc-8c23-2f5b6ef9cb54"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "1589c23f-0cb5-4f9d-b43d-b110d2dbeb6d"
                                },
                                    {
                                        "userRead": false,
                                        "uuid": "2de0d70f-a250-4dfc-9950-80cd69f92684"
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
                                    "uuid": "206b292b-1da1-4efc-af9c-721b131078da"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "cccec1c5-786c-417f-a068-8b3906f2b5e1"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "d41a67ca-aac0-4369-8e01-f0433bde8dfa"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "24e0574a-4277-4357-b749-0459fb309495"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "feaef66a-e7ce-47a2-b77d-086e14067e38"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "c895b5e6-664b-4a30-80d2-ac30d03eb15f"
                            }
                        ],
                            "title": "Baseball"
                        },
                        {
                            "active": false,
                            "allRead": false,
                            "podcast": false,
                            "sort": "up",
                            "subscriptions": [
                                {
                                    "userRead": false,
                                    "uuid": "5adac099-58c6-4389-a3c5-dc3d54244f57"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "98f44d3e-ce0d-4c44-831f-52ee4d398b10"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "50a91935-083c-4b0f-9ec0-211569ec1b00"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "d6413817-60c2-4809-b3e0-b907186b9d4f"
                            },
                                {
                                    "userRead": false,
                                    "uuid": "679aba68-dbbb-4957-b889-5eadd7b7e061"
                                }
                            ],
                            "title": "Music"   
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": false,
                                "sort": "up",
                                "subscriptions": [
                                {
                                    "userRead": false,
                                    "uuid": "0e0e0359-c8db-4290-a50c-3c9bf9f7635b"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "f40998d9-be6c-43d3-a110-a38a3eba2834"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "9a3d2f71-9ca3-4c8f-85f0-a38a6df70912"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "defa75f9-f581-4410-8586-4825e498ced1"
                                },
                                {
                                    "userRead": false,
                                    "uuid": "52039a0b-79c8-407e-91f2-4e67db67dc6d"
                                }
                            ],
                            "title": "Art"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": true,
                                "sort": "up",
                                "subscriptions": [
                                {
                                    "userRead": false,
                                    "uuid": "e6619583-0567-4686-af04-7d0a2fb1c9d0"
                                }
                            ],
                            "title": "Political Podcasts"
                        },
                            {
                                "active": false,
                                "allRead": false,
                                "podcast": true,
                                "sort": "up",
                                "subscriptions": [
                                {
                                    "userRead": false,
                                    "uuid": "61e56ee6-8af8-49e0-b7c5-3b523e66c0e0"
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
