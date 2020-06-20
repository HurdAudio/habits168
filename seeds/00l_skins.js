exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('skins').del()
        .then(function () {
            // Inserts seed entries
            return knex('skins').insert([
                {
                    uuid: '9fc176e3-91f8-4864-a996-01a101f88893',
                    skins: {
                        "dailies": {
                            "available": ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_MarchA'],
                            "january": [ 31, '_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryC', '_JanuaryA', '_JanuaryC' ],
                            "february": [ 29, '_FebruaryA', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryC', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryA', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC' ],
                            "march": [31],
                            "april": [30],
                            "may": [31],
                            "june": [30],
                            "july": [31],
                            "august": [31],
                            "september": [30],
                            "october": [31],
                            "november": [30],
                            "december": [31]
                        },
                        "externals": {
                            "available": ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_MarchA', '_MarchB'],
                            "january": [ 31, '_JanuaryB', '_JanuaryB', '_JanuaryC','_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryA' ],
                            "february": [ 29, '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryC', '_FebruaryA', '_FebruaryA', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryA', '_FebruaryA' ],
                            "march": [31],
                            "april": [30],
                            "may": [31],
                            "june": [30],
                            "july": [31],
                            "august": [31],
                            "september": [30],
                            "october": [31],
                            "november": [30],
                            "december": [31]
                        },
                        "landing": {
                            "available": ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_MarchA', '_MarchB', '_MarchC', '_AprilA', '_AprilB', '_AprilC'],
                            "january": [31, '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA'],
                            "february": [29, '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryB', '_FebruaryA', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryA'],
                            "march": [ 31, '_MarchB', '_MarchA', '_MarchB', '_MarchA', '_MarchC', '_MarchA', '_MarchB', '_MarchB', '_MarchA', '_MarchC', '_MarchB', '_MarchC', '_MarchC', '_MarchA', '_MarchA', '_MarchB', '_MarchB', '_MarchB', '_MarchA', '_MarchA', '_MarchC', '_MarchC', '_MarchC', '_MarchB', '_MarchC', '_MarchC', '_MarchA', '_MarchA', '_MarchB', '_MarchC', '_MarchA' ],
                            "april": [30],
                            "may": [31],
                            "june": [30],
                            "july": [31],
                            "august": [31],
                            "september": [30],
                            "october": [31],
                            "november": [30],
                            "december": [31]
                        },
                        "monday": {
                            "available": ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_MarchA', '_MarchB', '_MarchC'],
                            "january": [31, '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryB', '_JanuaryC' ],
                            "february": [ 29, '_FebruaryC', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryA', '_FebruaryB', '_FebruaryA', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryA', '_FebruaryA' ],
                            "march": [31],
                            "april": [30],
                            "may": [31],
                            "june": [30],
                            "july": [31],
                            "august": [31],
                            "september": [30],
                            "october": [31],
                            "november": [30],
                            "december": [31]
                        },
                        "player": {
                            "available":  ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_MarchA', '_MarchB', '_MarchC', '_AprilA'],
                            "january": [ 31, '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryC', '_JanuaryA' ],
                            "february": [ 29, '_FebruaryC', '_FebruaryA', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryB', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryA', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryB', '_FebruaryB', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryB', '_FebruaryC', '_FebruaryB' ],
                            "march": [ 31, '_MarchA', '_MarchC', '_MarchA', '_MarchC', '_MarchC', '_MarchC', '_MarchA', '_MarchB', '_MarchB', '_MarchB', '_MarchA', '_MarchC', '_MarchC', '_MarchA', '_MarchB', '_MarchA', '_MarchB', '_MarchA', '_MarchB', '_MarchA', '_MarchB', '_MarchC', '_MarchC', '_MarchC', '_MarchB', '_MarchA', '_MarchA', '_MarchA', '_MarchB', '_MarchC', '_MarchB' ],
                            "april": [30],
                            "may": [31],
                            "june": [30],
                            "july": [31],
                            "august": [31],
                            "september": [30],
                            "october": [31],
                            "november": [30],
                            "december": [31]
                        },
                        "user_hub": {
                            "available": ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_MarchA', '_MarchB', '_MarchC'],
                            "january": [ 31, '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryC' ],
                            "february": [ 29, '_FebruaryA', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryA', '_FebruaryB', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryC', '_FebruaryB', '_FebruaryB', '_FebruaryC' ],
                            "march": [ 31, '_MarchB', '_MarchA', '_MarchA', '_MarchC', '_MarchA', '_MarchA', '_MarchB', '_MarchC', '_MarchA', '_MarchA', '_MarchB', '_MarchC', '_MarchB', '_MarchC', '_MarchC', '_MarchB', '_MarchB', '_MarchC', '_MarchA', '_MarchA', '_MarchB', '_MarchA', '_MarchA', '_MarchB', '_MarchB', '_MarchC', '_MarchC', '_MarchC', '_MarchC', '_MarchB', '_MarchA' ],
                            "april": [30],
                            "may": [31],
                            "june": [30],
                            "july": [31],
                            "august": [31],
                            "september": [30],
                            "october": [31],
                            "november": [30],
                            "december": [31]
                        },
                        "user_profile_editor": {
                            "available": ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC'],
                            "january": [ 31, '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryB' ],
                            "february": [ 29, '_FebruaryB', '_FebruaryC', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryA', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryA', '_FebruaryA', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryA' ],
                            "march": [31],
                            "april": [30],
                            "may": [31],
                            "june": [30],
                            "july": [31],
                            "august": [31],
                            "september": [30],
                            "october": [31],
                            "november": [30],
                            "december": [31]
                        },
                        "viewer": {
                            "available": ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_MarchA', '_MarchB', '_MarchC', '_AprilA', '_AprilB'],
                            "january": [31, '_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryB', '_JanuaryA', '_JanuaryC', '_JanuaryA'],
                            "february": [29, '_FebruaryC', '_FebruaryB', '_FebruaryB', '_FebruaryA', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryA'],
                            "march": [ 31, '_MarchC', '_MarchB', '_MarchB', '_MarchB', '_MarchC', '_MarchA', '_MarchA', '_MarchB', '_MarchA', '_MarchA', '_MarchC', '_MarchB', '_MarchC', '_MarchB', '_MarchA', '_MarchA', '_MarchC', '_MarchB', '_MarchB', '_MarchC', '_MarchB', '_MarchC', '_MarchC', '_MarchA', '_MarchC', '_MarchA', '_MarchA', '_MarchB', '_MarchA', '_MarchC', '_MarchA' ],
                            "april": [30],
                            "may": [31],
                            "june": [30],
                            "july": [31],
                            "august": [31],
                            "september": [30],
                            "october": [31],
                            "november": [30],
                            "december": [31]
                        }
                    },
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
        });
};
