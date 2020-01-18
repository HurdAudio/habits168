'use strict';

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('user_blogs').del()
        .then(function () {
            // Inserts seed entries
            return knex('user_blogs').insert([
                {
                    uuid: '4520789b-4356-44d5-878a-7d5f51ffcfc8',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    blog_name: 'HurdAudio',
                    contributors: {
                        "contributors": [
                            {
                                "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg",
                                "name": "Devin Hurd",
                                "uuid": "17917373-ee9c-46aa-a38a-cacc475abee7"
                            }
                        ]
                    },
                    description: 'Musings on free jazz, just intonation and modular synthesis',
                    last_post: '2019 August 8 - 12:23:17',
                    logo: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/steve-harvey-xWiXi6wRLGo-unsplash.jpg',
                    page_loads: 100473,
                    total_posts: 473,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '83b12bde-0dd3-46e9-8b45-0561bb205524',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    blog_name: 'Leather, Runs & Repeat',
                    contributors: {
                        "contributors": [
                            {
                                "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg",
                                "name": "Devin Hurd",
                                "uuid": "17917373-ee9c-46aa-a38a-cacc475abee7"
                            }
                        ]
                    },
                    description: 'An agnostic baseball blog',
                    last_post: '2019 August 7 - 05:58:02',
                    logo: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/baseball-1339292_1920.jpg',
                    page_loads: 823,
                    total_posts: 54,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '5b73744c-6809-4cfc-8f3d-2b530749b898',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    blog_name: 'Muddle Class Kitchens',
                    contributors: {
                        "contributors": [
                            {
                                "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg",
                                "name": "Devin Hurd",
                                "uuid": "17917373-ee9c-46aa-a38a-cacc475abee7"
                            },
                            {
                                "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/digitalNomadAvatar.jpg",
                                "name": "Eva Codes",
                                "uuid": "03ad421c-aad5-47b1-88ab-d7822f6c3eb7"
                            }
                        ]
                    },
                    description: 'Cooking without skill',
                    last_post: '2019 July 28 - 17:43:40',
                    logo: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/egg-3086198_1920.jpg',
                    page_loads: 33,
                    total_posts: 302,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'da66d6d9-12c2-4613-91ae-058a14ca4924',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    blog_name: 'Weaponized Reading Glasses',
                    contributors: {
                        "contributors": [
                            {
                                "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg",
                                "name": "Devin Hurd",
                                "uuid": "17917373-ee9c-46aa-a38a-cacc475abee7"
                            }
                        ]
                    },
                    description: 'Things I read when I should be sleeping',
                    last_post: '2019 January 1 - 18:13:13',
                    logo: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/book-272691_1920.jpg',
                    page_loads: 4,
                    total_posts: 8325,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
        });
};
