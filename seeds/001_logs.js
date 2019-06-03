'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('logs').del()
    .then(function () {
      // Inserts seed entries
      return knex('logs').insert([
        {
          id: 1,
          user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
          action: 'First record. Seeds executed.',
          ip: '98.249.65.138',
          ip_data: {
            "ip": "98.249.65.138",
            "type": "ipv4",
            "continent_code": "NA",
            "continent_name": "North America",
            "country_code": "US",
            "country_name": "United States",
            "region_code": "NM",
            "region_name": "New Mexico",
            "city": "Albuquerque",
            "zip": "87106",
            "latitude": 35.0813,
            "longitude": -106.6212,
            "location": {
                "geoname_id": 5454711,
                "capital": "Washington D.C.",
                "languages": [
                    {
                        "code": "en",
                        "name": "English",
                        "native": "English"
                    }
                ],
                "country_flag": "http://assets.ipstack.com/flags/us.svg",
                "country_flag_emoji": "🇺🇸",
                "country_flag_emoji_unicode": "U+1F1FA U+1F1F8",
                "calling_code": "1",
                "is_eu": false
            }
          },
          created_at: new Date('2019-06-01 17:21:00.000 UTC'),
          updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('logs_id_seq', (SELECT MAX(id) FROM logs));");
    });
};
