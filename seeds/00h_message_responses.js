'use strict';

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('message_responses').del()
        .then(function () {
            // Inserts seed entries
            return knex('message_responses').insert([
                {
                    uuid: '2a7d9a3c-9897-494f-a55b-51f59683b5d7',
                    message_uuid: '08eb972a-24f0-4544-97a9-bbe16379a7f6',
                    cleanDate: '2019 August 14 - 20:06:33',
                    from: {
                        "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg",
                        "name": "Devin Hurd",
                        "uuid": "17917373-ee9c-46aa-a38a-cacc475abee7"
                    },
                    message: 'You aren\'t worthy of the Sun Ra, my friend.',
                    open: false,
                    opened: false,
                    subject: 'RE: Sun Ra on vinyl',
                    to: {
                        "avatar": "https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg",
                        "name": "DJ Ipsum",
                        "uuid": "96770ff7-afa0-4c31-970e-905e8f28ccd0"
                    },
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2019-08-14 20:06:55.000 UTC')
        }
      ]);
        });
};
