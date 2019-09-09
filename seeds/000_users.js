'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
          email: 'devin@devinhurd.com',
          first_name: 'Devin',
          last_name: 'Hurd',
          hashed_password: '$2b$05$3ibW6cI0LuJZq8BUUVl9K.KwppMJBEzmEPREHemtPLWUW2yS/2QWW',
          is_admin: true,
          email_confirmed: true,
          avatar_path: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
          associates: {
            "friends": [ '03ad421c-aad5-47b1-88ab-d7822f6c3eb7', '96770ff7-afa0-4c31-970e-905e8f28ccd0', 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6' ],
            "following": []
          },
          security: {
            "key": "nYeYs~_OHOXrL_XZ8IK3i8",
            "value": "PFIQefgqVYZPdaJcy09nVT",
            "onetime_key": "_1~fx8O0tqQ446vp_1L3aF",
            "salt": "3FI8e~gqVY_PdaJcy09EVT",
            "inversion": '_'
          },
          email_reset: {},
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '03ad421c-aad5-47b1-88ab-d7822f6c3eb7',
          email: 'eva.codes@evacodes.com',
          first_name: 'Eva',
          last_name: 'Codes',
          hashed_password: '$2b$05$3ibW6cI0LuJZq8BUUVl9K.KwppMJBEzmEPREHemtPLWUW2yS/2QWW',
          is_admin: false,
          email_confirmed: true,
          avatar_path: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/digitalNomadAvatar.jpg',
          associates: {
            "friends": [ '17917373-ee9c-46aa-a38a-cacc475abee7', '96770ff7-afa0-4c31-970e-905e8f28ccd0', 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6' ],
            "following": []
          },
          security: {
            "key": "nYeYs~_OHOXrL_XZ8IK3i8",
            "value": "PFIQefgqVYZPdaJcy09nVT",
            "onetime_key": "_1~fx8O0tqQ446vp_1L3aF",
            "salt": "3FI8e~gqVY_PdaJcy09EVT",
            "inversion": '_'
          },
          email_reset: {},
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0',
          email: 'ipsum.spinsum@djipsum.com',
          first_name: 'DJ',
          last_name: 'Ipsum',
          hashed_password: '$2b$05$3ibW6cI0LuJZq8BUUVl9K.KwppMJBEzmEPREHemtPLWUW2yS/2QWW',
          is_admin: false,
          email_confirmed: true,
          avatar_path: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg',
          associates: {
            "friends": [ '17917373-ee9c-46aa-a38a-cacc475abee7', '03ad421c-aad5-47b1-88ab-d7822f6c3eb7', 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6' ],
            "following": []
          },
          security: {
            "key": "nYeYs~_OHOXrL_XZ8IK3i8",
            "value": "PFIQefgqVYZPdaJcy09nVT",
            "onetime_key": "_1~fx8O0tqQ446vp_1L3aF",
            "salt": "3FI8e~gqVY_PdaJcy09EVT",
            "inversion": '_'
          },
          email_reset: {},
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
        {
          uuid: 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6',
          email: 'temporaneous@amettempor.com',
          first_name: 'Amet',
          last_name: 'Tempor',
          hashed_password: '$2b$05$3ibW6cI0LuJZq8BUUVl9K.KwppMJBEzmEPREHemtPLWUW2yS/2QWW',
          is_admin: false,
          email_confirmed: true,
          avatar_path: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/ashesAvatar.png',
          associates: {
            "friends": [ '17917373-ee9c-46aa-a38a-cacc475abee7', '03ad421c-aad5-47b1-88ab-d7822f6c3eb7', '96770ff7-afa0-4c31-970e-905e8f28ccd0' ],
            "following": []
          },
          security: {
            "key": "nYeYs~_OHOXrL_XZ8IK3i8",
            "value": "PFIQefgqVYZPdaJcy09nVT",
            "onetime_key": "_1~fx8O0tqQ446vp_1L3aF",
            "salt": "3FI8e~gqVY_PdaJcy09EVT",
            "inversion": '_'
          },
          email_reset: {},
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    });
};
