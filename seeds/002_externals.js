'use strict';
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('externals').del()
        .then(function () {
            // Inserts seed entries
            return knex('externals').insert([
                {
                    uuid: 'c2f53e34-5499-4015-80d5-b4fcea47c78b',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    title: 'Jacobin Magazine - Summer 2019',
                    description: 'War Is a Racket',
                    image_link: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/EDD_xVYXsAEtYxP.jpg',
                    userRead: false,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '2b7da266-f978-445f-8c5b-07da611f2464',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    title: 'Albuquerque Alibi - Thursday, September 12, 2019',
                    description: 'Fair But Not Square',
                    image_link: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/v28_i37_Fair_But_Not_Square.jpg',
                    userRead: true,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '174f6d0e-b7cd-4979-8177-61032be3fefe',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    title: 'New York Times - Sunday, September 15, 2019',
                    description: 'All the News that\'s fit to print.',
                    image_link: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/scanNYT2019-09-15.jpg',
                    userRead: true,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
        });
};
