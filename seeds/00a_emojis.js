'use strict';
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('emojis').del()
        .then(function () {
            // Inserts seed entries
            return knex('emojis').insert([
                {
                    uuid: 'da3eb65f-dd3a-4228-8892-b3a784cb6381',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/001-zombie.svg',
                    value: '001-zombie',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'b53a1bb4-0832-4f05-9349-c7eecae55476',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/002-yelling.svg',
                    value: '002-yelling',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '7d67a332-8e54-4f8a-b2e9-b93bf2de403c',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/003-muted.svg',
                    value: '003-muted',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '176407c5-51fb-4de5-a29e-8925d538cba7',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/004-dead.svg',
                    value: '004-dead',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '6e4ca341-e54f-4727-a8f2-bd1e26b4a5b4',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/005-surprised.svg',
                    value: '005-surprised',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '275f8296-42ed-41fe-9331-132ac159c2be',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/006-wondering.svg',
                    value: '006-wondering',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '079760f5-0684-479b-bc3e-19c4c8e25ef4',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/007-wink-1.svg',
                    value: '007-wink-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'd9071a78-73e4-4a4f-8499-6f1fbe065673',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/008-weird-1.svg',
                    value: '008-weird-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '63433961-1505-41c9-a700-e03bb5553eae',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/009-weird.svg',
                    value: '009-weird',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '14f05d61-5e43-46da-8bd7-fbb900b5e4ac',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/010-vomiting.svg',
                    value: '010-vomiting',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'c8fc1072-1b33-4229-a9e8-bf3a9b921b6d',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/011-alien.svg',
                    value: '011-alien',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '0629d27b-ce8b-48a0-92b8-c1704512b8d3',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/012-tongue.svg',
                    value: '012-tongue',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '1bd1197a-9be2-4713-9454-fbf869fc4282',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/013-sweating.svg',
                    value: '013-sweating',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'e68ec8b7-aada-4ae9-aea7-29380066abe1',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/014-cool.svg',
                    value: '014-cool',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '1879a147-3f00-4911-9d8e-6f8e0b98dd1b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/015-straight.svg',
                    value: '015-straight',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'f21068b1-a307-4ae9-805c-90ec391de16a',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/016-smile-1.svg',
                    value: '016-smile-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '7486fc80-4864-4dd5-b175-7cf236c52dcd',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/017-sleeping.svg',
                    value: '017-sleeping',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '20ec19d7-c36b-416d-9e29-8e02dd0ee880',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/018-skull.svg',
                    value: '018-skull',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '4fe01a6e-d62a-438e-941d-b464cb97ebba',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/019-shy.svg',
                    value: '019-shy',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '941f91ef-164c-4192-bec0-cfface448515',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/020-laughing-2.svg',
                    value: '020-laughing-2',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '54abe3f7-9f44-424c-a866-6907f1bbda85',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/021-quiet.svg',
                    value: '021-quiet',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'd8acf86f-1e97-4426-bd49-5e9c483541a2',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/022-pirate.svg',
                    value: '022-pirate',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'f61b3ad1-8229-4bc8-b474-ac05cc66e6dd',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/023-nerd.svg',
                    value: '023-nerd',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '057ecc22-89ce-4a05-b376-1711b640740b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/024-ninja.svg',
                    value: '024-ninja',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '7ae3b346-d957-4910-9eb6-a9fe89feef0f',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/025-money.svg',
                    value: '025-money',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'a40f0974-94a4-4927-9fa4-09afa25bb1c1',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/026-laughing-1.svg',
                    value: '026-laughing-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '368a9a0b-dc30-46d8-844f-07ec2ab69d46',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/027-sad.svg',
                    value: '027-sad',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'a3f6d416-0bf2-47a2-bfdc-81ba5713313f',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/028-laughing.svg',
                    value: '028-laughing',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '153d4848-f3f2-46e8-8f0d-31838c3a51e3',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/029-kiss-1.svg',
                    value: '029-kiss-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '0be558b9-8020-4ed9-88f7-d7796fdca7d0',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/030-karate.svg',
                    value: '030-karate',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'e46f4c21-a9af-4760-8e92-e01aa20a1778',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/031-in-love.svg',
                    value: '031-in-love',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '1d88be7c-bbab-47d5-9f87-49be028b4755',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/032-hipster.svg',
                    value: '032-hipster',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '768f24a1-084b-4979-85fb-9748bd106a2b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/033-hypnotized.svg',
                    value: '033-hypnotized',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '53305065-2a6b-452a-ad62-3ffac8447f39',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/034-heart.svg',
                    value: '034-heart',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '7334f578-b365-4bd6-8790-774be389637f',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/035-headache.svg',
                    value: '035-headache',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '8221b2e9-dd21-4cb2-9ccd-c64e4408a9a9',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/036-happy.svg',
                    value: '036-happy',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '7eb065c2-ac14-46cb-a849-1d9f26d09f91',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/037-wink.svg',
                    value: '037-wink',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'fd0354cc-d76b-43a8-b090-ed55ac46809b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/038-glitter.svg',
                    value: '038-glitter',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '3e7c9fdb-4939-42cb-a54d-7b4dc8482746',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/039-kiss.svg',
                    value: '039-kiss',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '1f54fc0f-47a6-415f-9068-d4b8ff6797e3',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/040-sick-1.svg',
                    value: '040-sick-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '3bf9d1ba-2d9f-4a3a-853f-90c5b1e5f35e',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/041-sick.svg',
                    value: '041-sick',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '450aa55f-c42b-4515-8ed2-16eaf6ed6b43',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/042-evil.svg',
                    value: '042-evil',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '9c6633bb-52f3-4f97-a599-1b9fd56bdf4d',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/043-drool.svg',
                    value: '043-drool',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '058fb190-139b-4bdd-b678-56288f6b8778',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/044-devil.svg',
                    value: '044-devil',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '82675b5f-5889-4ea3-bfb6-e41579639a82',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/045-cry-1.svg',
                    value: '045-cry-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: 'c1b34e70-737e-4f10-bd8c-be4b1ac29386',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/046-cry.svg',
                    value: '046-cry',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: 'a1121239-e5eb-449f-9f9b-e6fce4f18b98',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/047-broken-heart.svg',
                    value: '047-broken-heart',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '62e09fb5-b088-468f-b929-f3058a0675ac',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/048-smile.svg',
                    value: '048-smile',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: 'fde9572c-eace-4fa3-8c5d-d1e88bed37bd',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/049-confused.svg',
                    value: '049-confused',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: 'a899a2aa-65b1-423e-9327-47b0fbbabbc8',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/050-angel.svg',
                    value: '050-angel',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      }
      ]);
        });
};
