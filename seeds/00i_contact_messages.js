'use strict';

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('contact_messages').del()
        .then(function () {
            // Inserts seed entries
            return knex('contact_messages').insert([
                {
                    uuid: '022ab934-4101-493e-a2e5-eea8038cfcf0',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    subject: 'Seed Message',
                    message: 'This message is generated via seed file.',
                    responded: false,
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2019-08-14 20:06:55.000 UTC')
        }
      ]);
        });
};
