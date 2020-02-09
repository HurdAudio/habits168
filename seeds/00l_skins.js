exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('skins').del()
        .then(function () {
            // Inserts seed entries
            return knex('skins').insert([
                {
                    uuid: '9fc176e3-91f8-4864-a996-01a101f88893',
                    skins: {
                        "landing": {
                            "available": ['_JanuaryA', '_JanuaryB', '_JanuaryC', '_FebruaryA', '_FebruaryB', '_FebruaryC'],
                            "january": [31, '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryA', '_JanuaryC', '_JanuaryC', '_JanuaryC', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryA', '_JanuaryB', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryB', '_JanuaryB', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA', '_JanuaryA', '_JanuaryC', '_JanuaryA'],
                            "february": [29, '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryB', '_FebruaryC', '_FebruaryA', '_FebruaryB', '_FebruaryB', '_FebruaryA', '_FebruaryB', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryB', '_FebruaryC', '_FebruaryA', '_FebruaryA', '_FebruaryC', '_FebruaryC', '_FebruaryA'],
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
                        }
                    },
                    created_at: new Date('2019-08-14 20:06:55.000 UTC'),
                    updated_at: new Date('2020-01-27 12:11:10.002 UTC')
        }
      ]);
        });
};