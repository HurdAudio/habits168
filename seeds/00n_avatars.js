exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('avatars').del()
        .then(function () {
            // Inserts seed entries
            return knex('avatars').insert([
                {
                    uuid: 'b3a90d91-70f3-4611-9cda-4a45038dbcf6',
                    link: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
                },
                {
                    uuid: 'ef3df571-5dac-4331-81a3-8b7d223ed088',
                    link: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/digitalNomadAvatar.jpg',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
                },
                {
                    uuid: '06886c10-6843-4c60-94d7-f1c9dd90361d',
                    link: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
                },
                {
                    uuid: '0c37376b-b776-4c81-8e8f-ae46c707f612',
                    link: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/ashesAvatar.png',
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
                }
            ]);
        });
};
