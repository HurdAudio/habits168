'use strict';

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('messages').del()
        .then(function () {
            // Inserts seed entries
            return knex('messages').insert([
                {
                    uuid: '68c26b67-7b49-4068-9519-d3a7a67a2f96',
                    cleanDate: '2019 August 14 - 20:14:55',
                    from: {
                        "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/digitalNomadAvatar.jpg",
                        "name": "Eva Codes",
                        "uuid": "03ad421c-aad5-47b1-88ab-d7822f6c3eb7"
                    },
                    message: '<p>You might want to hurry out to the Grower\'s Market for the current bumper crop of heirlooms.<br><br> They\'re damn impressive.</p>',
                    open: false,
                    opened: false,
                    subject: 'Heirloom Tomatoes',
                    to: {
                        "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg",
                        "name": "Devin Hurd",
                        "uuid": "17917373-ee9c-46aa-a38a-cacc475abee7"
                    },
                    created_at: new Date('2019-08-14 20:14:55.000 UTC'),
                    updated_at: new Date('2019-08-14 20:14:55.000 UTC')
        },
                {
                    uuid: '08eb972a-24f0-4544-97a9-bbe16379a7f6',
                    cleanDate: '2019 August 14 - 19:59:00',
                    from: {
                        "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg",
                        "name": "DJ Ipsum",
                        "uuid": "96770ff7-afa0-4c31-970e-905e8f28ccd0"
                    },
                    message: '<p>When are you going to hook me up with all that sweet, sweet Sun Ra? I know you\'re sitting on a trove of Saturnian goodness.</p>',
                    open: false,
                    opened: false,
                    subject: 'Sun Ra on vinyl',
                    to: {
                        "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg",
                        "name": "Devin Hurd",
                        "uuid": "17917373-ee9c-46aa-a38a-cacc475abee7"
                    },
                    created_at: new Date('2019-08-14 19:59:00.000 UTC'),
                    updated_at: new Date('2019-08-14 19:59:00.000 UTC')
        }
      ]);
        });
};
