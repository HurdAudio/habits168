'use strict';

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('user_expanded_profiles').del()
        .then(function () {
            // Inserts seed entries
            return knex('user_expanded_profiles').insert([
                {
                    uuid: 'b921cfd2-6136-4cd0-957a-4474757aa84d',
                    user_uuid: '17917373-ee9c-46aa-a38a-cacc475abee7',
                    bio: {
                        "bio": "A man with 168 Habits. Some of them good.",
                        "public": true
                    },
                    birthdate: {
                        "birthdate": new Date('1970-03-08'),
                        "cleanDate": "8 March",
                        "public": false
                    },
                    blog_posts: 8,
                    description: {
                        "description": "Drone music composer and software engineer stranded in the desert.",
                        "public": true
                    },
                    email: {
                        "email": "devin@devinhurd.com",
                        "public": false
                    },
                    education: {
                        "public": false,
                        "schools": [
                            {
                                "location": "Toronto, Ontario, Canada",
                                "name": "York University"
                            },
                            {
                                "location": "Hanover, New Hampshire, USA",
                                "name": "Dartmouth College"
                            },
                            {
                                "location": "Boulder, Colorado, USA",
                                "name": "Galvanize"
                            }
                        ]
                    },
                    employer: {
                        "employer": "Hall of Justice, Inc.",
                        "public": false
                    },
                    friends: 3,
                    location: {
                        "adminCode": "NM",
                        "country": "US",
                        "featureCode": "PPLA2",
                        "name": "Albuquerque",
                        "population": 545852,
                        "public": true,
                        "lat": 35.08449,
                        "lon": -106.65114
                    },
                    occupation: {
                        "occupation": "Web Developer",
                        "public": true
                    },
                    phone: {
                        "phone": "(800)773-8797",
                        "public": false
                    },
                    shared_items: 17,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '2d4eec5a-4416-4e7c-b359-bdb99ec2cd17',
                    user_uuid: '03ad421c-aad5-47b1-88ab-d7822f6c3eb7',
                    bio: {
                        "bio": "Formerly well-adjusted daughter of two computer geeks.",
                        "public": true
                    },
                    birthdate: {
                        "birthdate": new Date('1980-02-28'),
                        "cleanDate": "28 February",
                        "public": false
                    },
                    blog_posts: 77,
                    description: {
                        "description": "Full time coder and all around badass.",
                        "public": true
                    },
                    email: {
                        "email": "eva.codes@evacodes.com",
                        "public": false
                    },
                    education: {
                        "public": false,
                        "schools": [
                            {
                                "location": "Providence, Rhode Island",
                                "name": "Brown University"
                            }
                        ]
                    },
                    employer: {
                        "employer": "NSA",
                        "public": false
                    },
                    friends: 53,
                    location: {
                        "adminCode": "MD",
                        "country": "US",
                        "featureCode": "PPLA",
                        "name": "Annapolis",
                        "population": 38394,
                        "public": true,
                        "lat": 38.97845,
                        "lon": -76.49218
                    },
                    occupation: {
                        "occupation": "Hacker for Hire",
                        "public": true
                    },
                    phone: {
                        "phone": "(800)773-8797",
                        "public": false
                    },
                    shared_items: 702,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '3fe571f1-c0fb-44f0-825d-57bda70b76e6',
                    user_uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0',
                    bio: {
                        "bio": "Frustrated DJ trapped in a day job.",
                        "public": true
                    },
                    birthdate: {
                        "birthdate": new Date('1982-08-08'),
                        "cleanDate": "8 August",
                        "public": false
                    },
                    blog_posts: 77,
                    description: {
                        "description": "Slave to the beat.",
                        "public": true
                    },
                    email: {
                        "email": "ipsum.spinsum@djipsum.com",
                        "public": false
                    },
                    education: {
                        "public": false,
                        "schools": [
                            {
                                "location": "Portland, Oregon",
                                "name": "Reed College"
                            }
                        ]
                    },
                    employer: {
                        "employer": "Wells Fargo",
                        "public": false
                    },
                    friends: 44,
                    location: {
                        "adminCode": "CA",
                        "country": "US",
                        "featureCode": "PPLA2",
                        "name": "San Rafael",
                        "population": 57713,
                        "public": true,
                        "lat": 37.97353,
                        "lon": -122.53109
                    },
                    occupation: {
                        "occupation": "DJ from the bank",
                        "public": true
                    },
                    phone: {
                        "phone": "(800)773-8797",
                        "public": false
                    },
                    shared_items: 1043,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '806aa23e-8b01-4dfb-a7d3-a77239f4badc',
                    user_uuid: 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6',
                    bio: {
                        "bio": "Product of Detroit public education.",
                        "public": true
                    },
                    birthdate: {
                        "birthdate": new Date('1988-11-26'),
                        "cleanDate": "26 November",
                        "public": true
                    },
                    blog_posts: 180,
                    description: {
                        "description": "Wildly interested in everything.",
                        "public": true
                    },
                    email: {
                        "email": "temporaneous@amettempor.com",
                        "public": false
                    },
                    education: {
                        "public": false,
                        "schools": [
                            {
                                "location": "Earth",
                                "name": "School of Hard Knocks"
                            }
                        ]
                    },
                    employer: {
                        "employer": "Self Employed",
                        "public": false
                    },
                    friends: 37,
                    location: {
                        "adminCode": "NY",
                        "country": "US",
                        "featureCode": "PPL",
                        "name": "New York City",
                        "population": 8175133,
                        "public": true,
                        "lat": 40.71427,
                        "lon": -74.00597
                    },
                    occupation: {
                        "occupation": "Code Monkey",
                        "public": true
                    },
                    phone: {
                        "phone": "(800)773-8797",
                        "public": false
                    },
                    shared_items: 844,
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        }
      ]);
        });
};
