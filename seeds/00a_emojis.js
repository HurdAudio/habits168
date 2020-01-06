exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('emojis').del()
        .then(function () {
            // Inserts seed entries
            return knex('emojis').insert([
                {
                    uuid: 'bd5b3971-7bf3-48fb-b8dc-7df09f6654e9',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/001-zombie.svg',
                    value: '001-zombie',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
                        },
                {
                    uuid: '40834fe1-f09a-4e0e-8e1d-2fe26fcb4bc4',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/002-yelling.svg',
                    value: '002-yelling',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '1f214086-2ad4-469a-aedd-68d9de54580b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/003-muted.svg',
                    value: '003-muted',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '328b0607-0dd3-4f7a-84af-57db09182877',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/004-dead.svg',
                    value: '004-dead',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '6a7210ce-5a30-4624-a1f1-10906241bd86',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/005-surprised.svg',
                    value: '005-surprised',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '0476e0e3-9fc1-41f3-9468-3a41c64c2420',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/006-wondering.svg',
                    value: '006-wondering',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '16a1b206-c7b5-44a7-8a21-d4eac4820b4d',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/007-wink-1.svg',
                    value: '007-wink-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '47141946-62fa-4815-88e5-1459dfa1be97',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/008-weird-1.svg',
                    value: '008-weird-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'f4e4c5e5-3e0d-4087-ad68-0fac35c15fd6',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/009-weird.svg',
                    value: '009-weird',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '458c6818-e941-41c6-a8dc-a1fe9d2d7e21',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/010-vomiting.svg',
                    value: '010-vomiting',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '9f228586-3e77-4e1f-a315-52346c38842b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/011-alien.svg',
                    value: '011-alien',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '0b72d43b-df45-4955-93d2-227938393ef5',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/012-tongue.svg',
                    value: '012-tongue',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'c5dae19f-93a7-4396-bd56-a9e16d4a2979',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/013-sweating.svg',
                    value: '013-sweating',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '7aa44c81-4bb1-4912-8da7-43b2846baab3',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/014-cool.svg',
                    value: '014-cool',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'e734fcf4-c4ac-4d3a-9691-4bb8f3718031',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/015-straight.svg',
                    value: '015-straight',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '502b28f1-8e55-46f0-aff2-c57439fe7e3b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/016-smile-1.svg',
                    value: '016-smile-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '9d9587b7-784b-4a4e-a8e4-bf40bd979ee7',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/017-sleeping.svg',
                    value: '017-sleeping',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'd3e79861-78f9-4401-8045-25e31a1a8e65',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/018-skull.svg',
                    value: '018-skull',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'ad17319c-279b-4a77-84d5-36fcfd4f03e6',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/019-shy.svg',
                    value: '019-shy',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '34339cad-c633-4d7a-b917-e3810d9b5927',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/020-laughing-2.svg',
                    value: '020-laughing-2',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'cab2e01e-7a9d-4c6f-acb5-dd4ac451b451',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/021-quiet.svg',
                    value: '021-quiet',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'ec2c8d80-f301-4274-a97a-1146ade517b7',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/022-pirate.svg',
                    value: '022-pirate',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '566f3355-aada-4166-bf0e-83ad739cdaa2',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/023-nerd.svg',
                    value: '023-nerd',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '696eb311-5831-4636-a83b-e05affdc3fd4',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/024-ninja.svg',
                    value: '024-ninja',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '2eaaf55c-9010-411c-b256-4acb8d4f55f8',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/025-money.svg',
                    value: '025-money',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '8c0d9b0b-d6ba-4c22-a358-a4ba8dd06ff1',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/026-laughing-1.svg',
                    value: '026-laughing-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '70887015-be67-456c-940c-c19a623efe1b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/027-sad.svg',
                    value: '027-sad',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '9a807e1d-4279-4317-b553-66646dadd0b3',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/028-laughing.svg',
                    value: '028-laughing',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '3b9361a0-26eb-40c1-9cb8-9c47246e8e1c',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/029-kiss-1.svg',
                    value: '029-kiss-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'bb9b1b06-209e-4b8f-b99b-1b21413df526',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/030-karate.svg',
                    value: '030-karate',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '5144d21d-403d-4ad4-83f8-cf86cd44957b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/031-in-love.svg',
                    value: '031-in-love',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: 'f8e7a6dd-51c1-4821-bab1-54fc36a15e94',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/032-hipster.svg',
                    value: '032-hipster',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '39e01308-fcab-4e69-af61-5fa02aa538ad',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/033-hypnotized.svg',
                    value: '033-hypnotized',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '153da0a0-ca65-4882-a78b-c7fd0bdf8e7e',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/034-heart.svg',
                    value: '034-heart',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '84cb48af-7d38-4087-b76f-280ce05816cd',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/035-headache.svg',
                    value: '035-headache',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '8a1b573d-94f6-4474-a264-ae0071b586fd',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/036-happy.svg',
                    value: '036-happy',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '761ae6d9-d910-47de-a90d-0d9fe608506e',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/037-wink.svg',
                    value: '037-wink',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '6c857f8f-5b40-4ff2-8fc0-d543e35ce106',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/038-glitter.svg',
                    value: '038-glitter',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '3fc2819d-bceb-4835-b701-a0d6f30c52ca',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/039-kiss.svg',
                    value: '039-kiss',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '0f3605b5-2bdf-444a-83bd-d615bf9d7a94',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/040-sick-1.svg',
                    value: '040-sick-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
        },
                {
                    uuid: '79ff47bc-7795-4064-aedb-6095926c3e36',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/041-sick.svg',
                    value: '041-sick',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: 'a53e6e4b-a4c9-4dc5-b248-c9b03737d293',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/042-evil.svg',
                    value: '042-evil',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '29996f84-d176-45ad-b8fb-9e97dd5cde43',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/043-drool.svg',
                    value: '043-drool',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '725878b6-8e17-42cc-8b43-c28f0bf32753',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/044-devil.svg',
                    value: '044-devil',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '71be25d0-21ed-4ab3-abe1-b221a85d235a',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/045-cry-1.svg',
                    value: '045-cry-1',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '37029257-605a-4938-827c-31600fa6484a',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/046-cry.svg',
                    value: '046-cry',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '9f37cdef-5e87-4d70-83ac-b81a3e9ab3ff',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/047-broken-heart.svg',
                    value: '047-broken-heart',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '2daf6685-3c24-417e-a2e2-e4079d3319dc',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/048-smile.svg',
                    value: '048-smile',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: 'd700aa3e-4138-4b02-ba51-e0633a866e1b',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/049-confused.svg',
                    value: '049-confused',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      },
                {
                    uuid: '277dd613-7b71-4e1f-b97f-b99b79f1b1bf',
                    path: 'https://habits168-hurdaudio.s3.amazonaws.com/emojis/050-angel.svg',
                    value: '050-angel',
                    created_at: new Date('2019-06-01 17:21:00.000 UTC'),
                    updated_at: new Date('2019-06-01 17:21:00.000 UTC')
      }
                        ])

        });
};
