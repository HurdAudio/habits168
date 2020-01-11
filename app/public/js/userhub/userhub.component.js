(function () {
    'use strict';

    angular.module('app')
        .component('userhub', {
            controller: UserHubController,
            templateUrl: '/js/userhub/userhub.template.html'
        });

    UserHubController.$inject = ['$http', '$state', '$stateParams'];

    function UserHubController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.monthSelect = '_JanuaryC';
        vm.userLogout = userLogout;
        vm.hubShareTabState = 'hubTabActive' + vm.monthSelect;
        vm.hubReaderTabState = 'hubTabInactive' + vm.monthSelect;
        vm.hubBloggerTabState = 'hubTabInactive' + vm.monthSelect;
        vm.hubProfileTabState = 'hubTabInactive' + vm.monthSelect;
        vm.hubTabStatus = 'hubShare' + vm.monthSelect;
        vm.updateHubTab = updateHubTab;
        vm.toggleEmojiSelector = toggleEmojiSelector;
        vm.shareAddEmoji = shareAddEmoji;
        vm.hubShareRemoveReaction = hubShareRemoveReaction;
        vm.hubShareAdditionalReaction = hubShareAdditionalReaction;
        vm.hoverOver = hoverOver;
        vm.hoverOff = hoverOff;
        vm.toggleCommentEmojiSelector = toggleCommentEmojiSelector;
        vm.shareAddCommentEmoji = shareAddCommentEmoji;
        vm.hubShareRemoveCommentReaction = hubShareRemoveCommentReaction;
        vm.hubShareCommentAdditionalReaction = hubShareCommentAdditionalReaction;
        vm.commentReactionHoverOver = commentReactionHoverOver;
        vm.commentReactionHoverOff = commentReactionHoverOff;
        vm.hubShareSubmitComment = hubShareSubmitComment;
        vm.todayIs = '';
        vm.weekToggle = 'off';
        vm.hubWeekToggle = hubWeekToggle;
        vm.subscriptionToggle = 'off';
        vm.toggleSubscriptionManagement = toggleSubscriptionManagement;
        vm.manageBlockToggleStatus = 'hubReaderDay1BlockInactive' + vm.monthSelect;
        vm.externalsBlockToggleStatus = 'hubReaderExternalsDay2BlockInactive' + vm.externalsMonth;
        vm.dailiesBlockToggleStatus = 'hubReaderDay3BlockInactive' + vm.monthSelect;
        vm.browseFeedsBlockToggleStatus = 'hubReaderDay4BlockInactive' + vm.monthSelect;
        vm.sharedBlockToggleStatus = 'hubReaderDay5BlockInactive' + vm.monthSelect;
        vm.savedBlockToggleStatus = 'hubReaderDay6BlockInactive' + vm.monthSelect;
        vm.miscBlockToggleStatus = 'hubReaderDay7BlockInactive' + vm.monthSelect;
        vm.shareSaveLinkDisplay = 'hubShareShareSaveModalInactive' + vm.monthSelect;
        vm.hubLinkShareOrSave = 'Share Link';
        vm.hubShareSave = hubShareSave;
        vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        vm.hubCancelShareSaveLink = hubCancelShareSaveLink;
        vm.userBlogs = [
            {
                blog: 'HurdAudio',
                contributers: [
                    {
                        avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                        name: 'Devin Hurd',
                        uuid: '17917373-ee9c-46aa-a38a-cacc475abee7'
            }
          ],
                description: 'Musings on free jazz, just intonation and modular synthesis',
                id: 0,
                last_post: '2019 August 8 - 12:23:17',
                logo: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/steve-harvey-xWiXi6wRLGo-unsplash.jpg',
                page_loads: 100473,
                total_posts: 473
        },
            {
                blog: 'Leather, Runs & Repeat',
                contributers: [
                    {
                        avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                        name: 'Devin Hurd',
                        uuid: '17917373-ee9c-46aa-a38a-cacc475abee7'
            }
          ],
                description: 'An agnostic baseball blog',
                id: 1,
                last_post: '2019 August 7 - 05:58:02',
                logo: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/baseball-1339292_1920.jpg',
                page_loads: 823,
                total_posts: 54
        },
            {
                blog: 'Muddle Class Kitchens',
                contributers: [
                    {
                        avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                        name: 'Devin Hurd',
                        uuid: '17917373-ee9c-46aa-a38a-cacc475abee7'
            },
                    {
                        avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/digitalNomadAvatar.jpg',
                        name: 'Eva Codes',
                        uuid: '03ad421c-aad5-47b1-88ab-d7822f6c3eb7'
            }
          ],
                description: 'Cooking without skill',
                id: 2,
                last_post: '2019 July 28 - 17:43:40',
                logo: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/egg-3086198_1920.jpg',
                page_loads: 33,
                total_posts: 302
        },
            {
                blog: 'Weaponized Reading Glasses',
                description: 'Things I read when I should be sleeping',
                contributers: [
                    {
                        avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                        name: 'Devin Hurd',
                        uuid: '17917373-ee9c-46aa-a38a-cacc475abee7'
            }
          ],
                id: 3,
                last_post: '2019 January 1 - 18:13:13',
                logo: 'https://habits168-hurdaudio.s3.amazonaws.com/blog_logos/book-272691_1920.jpg',
                page_loads: 4,
                total_posts: 8325
        }
      ];
        vm.currentBlogLogo = vm.userBlogs[0].logo;
        vm.currentBlogName = vm.userBlogs[0].blog;
        vm.currentBlogDescription = vm.userBlogs[0].description;
        vm.currentBlogContributers = vm.userBlogs[0].contributers;
        vm.totalPosts = vm.userBlogs[0].total_posts;
        vm.lastPost = vm.userBlogs[0].last_post;
        vm.totalPageLoads = vm.userBlogs[0].page_loads;
        vm.hubDisplayBlogData = hubDisplayBlogData;
        vm.navigationPublicState = 'hubUserProfileNavigationActive' + vm.monthSelect;
        vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
        vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
        vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
        vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
        vm.navigationSliderState = 'hubUserProfileNavigationSlidePublicState' + vm.monthSelect;
        vm.navigateProfileViews = navigateProfileViews;
        vm.profileNavState = 'public';
        vm.userExtendedProfile = {
            bio: {
                bio: 'A man with 168 Habits. Some of them good.',
                public: true
            },
            birthdate: {
                birthdate: new Date('1970-03-08'),
                cleanDate: '8 March',
                public: false
            },
            description: {
                description: 'Drone music composer and software engineer stranded in the desert.',
                public: true
            },
            email: {
                email: 'devin@devinhurd.com',
                public: false
            },
            education: {
                public: false,
                schools: [
                    {
                        location: 'Toronto, Ontario, Canada',
                        name: 'York University'
            },
                    {
                        location: 'Hanover, New Hampshire',
                        name: 'Dartmouth College'
            },
                    {
                        location: 'Boulder, Colorado',
                        name: 'Galvanize'
            }
          ]
            },
            employer: {
                employer: 'Hall of Justice, Inc.',
                public: false
            },
            location: {
                adminCode: 'NM',
                country: 'US',
                featureCode: 'PPLA2',
                name: 'Albuquerque',
                population: 545852,
                public: true,
                lat: 35.08449,
                lon: -106.65114
            },
            occupation: {
                occupation: 'Web Developer',
                public: true
            },
            phone: {
                phone: '(505)505-5050',
                public: false
            }
        };
        vm.userMessages = [
            {
                cleanDate: '2019 August 14 - 20:14:55',
                created_at: new Date('2019-08-14 20:14:55'),
                from: {
                    avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/digitalNomadAvatar.jpg',
                    name: 'Eva Codes',
                    uuid: '03ad421c-aad5-47b1-88ab-d7822f6c3eb7'
                },
                message: '<p>You might want to hurry out to the Grower\'s Market for the current bumper crop of heirlooms.<br><br> They\'re damn impressive.</p>',
                open: false,
                opened: false,
                replies: [],
                subject: 'Heirloom Tomatoes',
                to: {
                    avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                    name: 'Devin Hurd',
                    uuid: '17917373-ee9c-46aa-a38a-cacc475abee7'
                },
                updated_at: new Date('2019-08-14 20:14:55'),
                uuid: '794f37fb-57fb-4e76-a3f4-cb6a72ec68cf'
        },
            {
                cleanDate: '2019 August 14 - 19:59:00',
                created_at: new Date('2019-08-14 19:59:00'),
                from: {
                    avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg',
                    name: 'DJ Ipsum',
                    uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0'
                },
                message: '<p>When are you going to hook me up with all that sweet, sweet Sun Ra? I know you\'re sitting on a trove of Saturnian goodness.</p>',
                open: false,
                opened: true,
                replies: [
                    {
                        cleanDate: '2019 August 14 - 20:06:33',
                        created_at: new Date('2019-08-04 20:06:33'),
                        from: {
                            avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                            name: 'Devin Hurd',
                            uuid: '17917373-ee9c-46aa-a38a-cacc475abee7'
                        },
                        message: 'You aren\'t worthy of the Sun Ra, my friend.',
                        open: false,
                        opened: false,
                        subject: 'RE: Sun Ra on vinyl',
                        to: {
                            avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg',
                            name: 'DJ Ipsum',
                            uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0'
                        },
                        updated_at: new Date('2019-08-04 20:06:33'),
                        uuid: '8efa4c37-989b-449f-b7aa-f7591675fd12'
            }
          ],
                subject: 'Sun Ra on vinyl',
                to: {
                    avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                    name: 'Devin Hurd',
                    uuid: '17917373-ee9c-46aa-a38a-cacc475abee7'
                },
                updated_at: new Date('2019-08-14 19:59:00'),
                uuid: '912eaafa-9d04-46db-8b53-d90367ae02d0'
        }
      ];
        vm.unreadMailMarker = '';
        vm.toggleMessageOpen = toggleMessageOpen;
        vm.submitResponse = submitResponse;
        vm.friendsList = [
            {
                avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/digitalNomadAvatar.jpg',
                blog_posts: 907,
                extended_profile: {
                    bio: {
                        bio: 'Formerly well-adjusted daughter of two computer geeks.',
                        public: true
                    },
                    birthdate: {
                        birthdate: new Date('1980-02-28'),
                        cleanDate: '28 February',
                        public: false
                    },
                    description: {
                        description: 'Full time coder and all around badass.',
                        public: true
                    },
                    email: {
                        email: 'eva.codes@evacodes.com',
                        public: false
                    },
                    education: {
                        public: false,
                        schools: [
                            {
                                location: 'Providence, Rhode Island',
                                name: 'Brown University'
                }
              ]
                    },
                    employer: {
                        employer: 'NSA',
                        public: false
                    },
                    location: {
                        adminCode: 'MD',
                        country: 'US',
                        featureCode: 'PPLA',
                        name: 'Annapolis',
                        population: 38394,
                        public: true,
                        lat: 38.97845,
                        lon: -76.49218
                    },
                    occupation: {
                        occupation: 'Hacker for Hire',
                        public: true
                    },
                    phone: {
                        phone: '(505)505-5050',
                        public: false
                    }
                },
                first_name: 'Eva',
                friends: 57,
                last_name: 'Codes',
                name: 'Eva Codes',
                shared_items: 702,
                uuid: '03ad421c-aad5-47b1-88ab-d7822f6c3eb7'
        },
            {
                avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg',
                blog_posts: 207,
                extended_profile: {
                    bio: {
                        bio: 'Frustrated DJ trapped in a day job.',
                        public: true
                    },
                    birthdate: {
                        birthdate: new Date('1982-08-08'),
                        cleanDate: '8 August',
                        public: false
                    },
                    description: {
                        description: 'Slave to the beat.',
                        public: true
                    },
                    email: {
                        email: 'ipsum.spinsum@djipsum.com',
                        public: false
                    },
                    education: {
                        public: false,
                        schools: [
                            {
                                location: 'Portland, Oregon',
                                name: 'Reed College'
                }
              ]
                    },
                    employer: {
                        employer: 'Wells Fargo',
                        public: false
                    },
                    location: {
                        adminCode: 'CA',
                        country: 'US',
                        featureCode: 'PPLA2',
                        name: 'San Rafael',
                        population: 57713,
                        public: true,
                        lat: 37.97353,
                        lon: -122.53109
                    },
                    occupation: {
                        occupation: 'DJ from the bank',
                        public: true
                    },
                    phone: {
                        phone: '(505)505-5050',
                        public: false
                    }
                },
                first_name: 'DJ',
                friends: 44,
                last_name: 'Ipsum',
                name: 'DJ Ipsum',
                shared_items: 1043,
                uuid: '96770ff7-afa0-4c31-970e-905e8f28ccd0'
        },
            {
                avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/ashesAvatar.png',
                blog_posts: 180,
                extended_profile: {
                    bio: {
                        bio: 'Product of Detroit public education.',
                        public: true
                    },
                    birthdate: {
                        birthdate: new Date('1988-11-26'),
                        cleanDate: '26 November',
                        public: true
                    },
                    description: {
                        description: 'Wildly interested in everything.',
                        public: true
                    },
                    email: {
                        email: 'temporaneous@amettempor.com',
                        public: false
                    },
                    education: {
                        public: false,
                        schools: [
                            {
                                location: 'Earth',
                                name: 'School of Hard Knocks'
                }
              ]
                    },
                    employer: {
                        employer: 'self employed',
                        public: false
                    },
                    location: {
                        adminCode: 'NY',
                        country: 'US',
                        featureCode: 'PPL',
                        name: 'New York City',
                        population: 8175133,
                        public: true,
                        lat: 40.71427,
                        lon: -74.00597
                    },
                    occupation: {
                        occupation: 'Code Monkey',
                        public: true
                    },
                    phone: {
                        phone: '(505)505-5050',
                        public: false
                    }
                },
                first_name: 'Amet',
                friends: 37,
                last_name: 'Tempor',
                name: 'Amet Tempor',
                shared_items: 844,
                uuid: 'e0d83fb4-f7b5-492c-ba49-e3b1447567e6'
        }
      ];
        vm.filteredFriendsList = vm.friendsList;
        vm.friendFiltering = friendFiltering;
        vm.profileDisplayModal = 'hubProfileDisplayerInactive' + vm.monthSelect;
        vm.displayFriend = displayFriend;
        vm.profileDisplayClose = profileDisplayClose;
        vm.messageModalState = 'hubDisplayMessageModalInactive' + vm.monthSelect;
        vm.initiateMessage = initiateMessage;
        vm.cancelMessageSender = cancelMessageSender;
        vm.sendMessage = sendMessage;
        vm.hubGuardrailState = 'hubRemoveGuardrailInactive' + vm.monthSelect;
        vm.removeBadFriend = removeBadFriend;
        vm.cancelFriendRemoval = cancelFriendRemoval;
        vm.confirmFriendRemoval = confirmFriendRemoval;
        vm.formSubmittable = false;
        vm.checkSubmittability = checkSubmittability;
        vm.hubContactSubmit = hubContactSubmit;
        vm.navigateToDay = navigateToDay;
        vm.navigateToToday = navigateToToday;
        vm.mondayMonth = '_JanuaryC';
        vm.navigateToExternals = navigateToExternals;
        vm.externalsMonth = '_JanuaryB';
        vm.navigateToDailies = navigateToDailies;
        vm.dailiesMonth = '_JanuaryA';

        function initializeSubscriptionCards() {
            vm.manageBlockToggleStatus = 'hubReaderDay1BlockInactive' + vm.monthSelect;
            vm.externalsBlockToggleStatus = 'hubReaderExternalsDay2BlockInactive' + vm.externalsMonth;
            vm.dailiesBlockToggleStatus = 'hubReaderDay3BlockInactive' + vm.monthSelect;
            vm.browseFeedsBlockToggleStatus = 'hubReaderDay4BlockInactive' + vm.monthSelect;
            vm.sharedBlockToggleStatus = 'hubReaderDay5BlockInactive' + vm.monthSelect;
            vm.savedBlockToggleStatus = 'hubReaderDay6BlockInactive' + vm.monthSelect;
            vm.miscBlockToggleStatus = 'hubReaderDay7BlockInactive' + vm.monthSelect;
        }

        function initializeDayCards() {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let now = new Date;
            let day = days[now.getDay()];
            if (day === 'Monday') {
                vm.day1ToggleState = 'hubReaderDay1MondayInactive' + vm.mondayMonth;
            } else {
                vm.day1ToggleState = 'hubReaderDay1BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 1) % 7];
            if (day === 'Monday') {
                vm.day2ToggleState = 'hubReaderDay2MondayInactive' + vm.mondayMonth;
            } else {
                vm.day2ToggleState = 'hubReaderDay2BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 2) % 7];
            if (day === 'Monday') {
                vm.day3ToggleState = 'hubReaderDay3MondayInactive' + vm.mondayMonth;
            } else {
                vm.day3ToggleState = 'hubReaderDay3BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 3) % 7];
            if (day === 'Monday') {
                vm.day4ToggleState = 'hubReaderDay4MondayInactive' + vm.mondayMonth;
            } else {
                vm.day4ToggleState = 'hubReaderDay4BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 4) % 7];
            if (day === 'Monday') {
                vm.day5ToggleState = 'hubReaderDay5MondayInactive' + vm.mondayMonth;
            } else {
                vm.day5ToggleState = 'hubReaderDay5BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 5) % 7];
            if (day === 'Monday') {
                vm.day6ToggleState = 'hubReaderDay6MondayInactive' + vm.mondayMonth;
            } else {
                vm.day6ToggleState = 'hubReaderDay6BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 6) % 7];
            if (day === 'Monday') {
                vm.day7ToggleState = 'hubReaderDay7MondayInactive' + vm.mondayMonth;
            } else {
                vm.day7ToggleState = 'hubReaderDay7BlockInactive' + vm.monthSelect;
            }
        }

        function navigateToToday() {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let now = new Date;

            navigateToDay(days[now.getDay()]);
        }

        function navigateToDailies() {
            $state.go('dailies', {
                userUuid: vm.user.uuid
            });
        }

        function navigateToExternals() {
            $state.go('externals', {
                userUuid: vm.user.uuid
            });
        }

        function navigateToDay(day) {
            switch (day) {
                case ('Monday'):
                    $state.go('monday', {
                        userUuid: vm.user.uuid
                    });
                    break;
                default:
                    alert('Unsupported Day: ' + day);
                    console.log(day + " is unsupported.");
            }
        }

        function hubContactSubmit() {
            let hubContactSubjectInput = document.getElementById('hubContactSubjectInput');
            let hubContactMessageInput = document.getElementById('hubContactMessageInput');

            hubContactSubjectInput.value = '';
            hubContactMessageInput.value = '';
            vm.formSubmittable = false;
        }

        function checkSubmittability() {
            let hubContactSubjectInput = document.getElementById('hubContactSubjectInput');
            let hubContactMessageInput = document.getElementById('hubContactMessageInput');

            if ((hubContactSubjectInput.value === '') || (hubContactMessageInput.value === '')) {
                vm.formSubmittable = false;
            } else {
                vm.formSubmittable = true;
            }
        }

        function setFooterMessage() {
            let today = new Date();
            if (today.getFullYear() > 2019) {
                vm.footerMessage = '©2019 - ' + today.getFullYear() + ' HurdAudio';
            } else {
                vm.footerMessage = '©2019 HurdAudio'
            }
        }

        function confirmFriendRemoval(uuid) {
            for (let i = 0; i < vm.friendsList.length; i++) {
                if (vm.friendsList[i].uuid === uuid) {
                    vm.friendsList.splice(i, 1);
                    cancelFriendRemoval();
                    return;
                }
            }
        }

        function cancelFriendRemoval() {
            vm.hubGuardrailState = 'hubRemoveGuardrailInactive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        }

        function removeBadFriend(badFriendUuid) {
            profileDisplayClose();
            vm.hubGuardrailState = 'hubRemoveGuardrailActive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainerBlur' + vm.monthSelect;
            let friend = vm.friendsList.filter(entry => {
                return (entry.uuid === badFriendUuid)
            });
            vm.badFriend = friend[0];
        }

        function sendMessage(recipientUuid) {
            let hubMessageModalSubjectInput = document.getElementById('hubMessageModalSubjectInput');
            let hubMessageModalMessageInput = document.getElementById('hubMessageModalMessageInput');

            if (hubMessageModalMessageInput.value !== '') {
                let friend = vm.friendsList.filter(entry => {
                    return (entry.uuid === recipientUuid);
                });
                let now = new Date();
                let hours = now.getHours().toString() + ':';
                let minutes = '';
                let seconds = '';
                let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                if (now.getMinutes() < 10) {
                    minutes += '0';
                }
                minutes += now.getMinutes().toString() + ':';
                if (now.getSeconds() < 10) {
                    seconds += '0';
                }
                seconds += now.getSeconds();
                let cleanDate = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ' - ' + hours + minutes + seconds;
                let message = {
                    cleanDate: cleanDate,
                    created_at: now,
                    from: {
                        avatar: vm.user.avatar_path,
                        name: vm.user.first_name + ' ' + vm.user.last_name,
                        uuid: vm.user.uuid
                    },
                    message: '<p>' + hubMessageModalMessageInput.value + '</p>',
                    open: false,
                    opened: false,
                    replies: [],
                    subject: hubMessageModalSubjectInput.value,
                    to: {
                        avatar: friend[0].avatar,
                        name: friend[0].name,
                        uuid: friend[0].uuid
                    }
                };
                vm.userMessages.push(message);
                cancelMessageSender();
            }
        }

        function cancelMessageSender() {
            vm.messageModalState = 'hubDisplayMessageModalInactive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        }

        function initiateMessage(recipientUuid) {
            let hubMessageModalSubjectInput = document.getElementById('hubMessageModalSubjectInput');
            let hubMessageModalMessageInput = document.getElementById('hubMessageModalMessageInput');

            hubMessageModalSubjectInput.value = '';
            hubMessageModalMessageInput.value = '';
            profileDisplayClose();
            vm.messageModalState = 'hubDisplayMessageModalActive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainerBlur' + vm.monthSelect;
            let friend = vm.friendsList.filter(entry => {
                return (entry.uuid === recipientUuid);
            });
            vm.recipientAvatar = friend[0].avatar;
            vm.recipientName = friend[0].name;
            vm.recipientUuid = friend[0].uuid;
            hubMessageModalSubjectInput.focus();
        }

        function profileDisplayClose() {
            vm.profileDisplayModal = 'hubProfileDisplayerInactive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        }

        function displayFriend(friendUuid) {
            vm.profileDisplayModal = 'hubProfileDisplayerActive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainerBlur' + vm.monthSelect;
            vm.hubProfileDisplayerLocationImage = '';
            vm.hubProfileDisplayerLocationAlt = '';
            vm.hubProfileDisplayerImageAttribution = '';
            if (friendUuid !== vm.user.uuid) {
                vm.mayMessageRemove = true;
                let friend = vm.friendsList.filter(entry => {
                    return (entry.uuid === friendUuid);
                });
                vm.profileDisplayer = friend[0];
                $http.get(`/unsplashcity/${friend[0].extended_profile.location.name}`)
                    .then(locateData => {

                        let locate = locateData.data;
                        let index = Math.floor(Math.random() * locate.results.length);
                        vm.hubProfileDisplayerLocationImage = locate.results[index].urls.regular;
                        vm.hubProfileDisplayerLocationAlt = locate.results[index].alt_description;
                        vm.hubProfileDisplayerImageAttribution = locate.results[index].user.name;
                    });

            } else {
                vm.mayMessageRemove = false;
                vm.profileDisplayer = vm.user;
                vm.profileDisplayer.name = vm.user.first_name + ' ' + vm.user.last_name;
                vm.profileDisplayer.extended_profile = vm.userExtendedProfile;
                vm.hubProfileDisplayerLocationImage = vm.userLocationImage;
                vm.hubProfileDisplayerLocationAlt = vm.userLocationAltText;
                vm.hubProfileDisplayerImageAttribution = vm.locationAttribution

            }
        }

        function friendFiltering() {
            let hubFriendsFilter = document.getElementById('hubFriendsFilter');

            if (hubFriendsFilter.value === '') {
                vm.filteredFriendsList = vm.friendsList;
            } else {
                vm.filteredFriendsList = vm.friendsList.filter(entry => {
                    return (entry.name.toLowerCase().indexOf(hubFriendsFilter.value.toLowerCase()) !== -1);
                });
            }
        }

        function submitResponse(msgUuid) {
            let hubResponseText = document.getElementById('hubResponseText' + msgUuid);
            let now = new Date();
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let hours = '';
            let minutes = '';
            let seconds = '';
            if (now.getHours() < 10) {
                hours += '0';
            }
            if (now.getMinutes() < 10) {
                minutes += '0';
            }
            if (now.getSeconds() < 10) {
                seconds += '0';
            }
            hours += now.getHours() + ':';
            minutes += now.getMinutes() + ':';
            seconds += now.getSeconds();
            if (hubResponseText.value !== '') {
                for (let i = 0; i < vm.userMessages.length; i++) {
                    if (vm.userMessages[i].uuid === msgUuid) {
                        vm.userMessages[i].replies.push({
                            cleanDate: now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ' - ' + hours + minutes + seconds,
                            created_at: now,
                            from: {
                                avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
                                name: 'Devin Hurd',
                                uuid: '17917373-ee9c-46aa-a38a-cacc475abee7'
                            },
                            message: hubResponseText.value,
                            open: false,
                            opened: false,
                            subject: 'RE: ' + vm.userMessages[i].subject,
                            to: {
                                avatar: vm.userMessages[i].from.avatar,
                                name: vm.userMessages[i].from.name,
                                uuid: vm.userMessages[i].from.uuid
                            },
                            updated_at: now,
                            uuid: '8efa4c37-989b-449f-b7aa-f7591675fd12'
                        });
                        vm.userMessages[i].opened = false;
                        hubResponseText.value = '';
                    }
                }
            }
        }

        function toggleMessageOpen(uuid) {
            for (let i = 0; i < vm.userMessages.length; i++) {
                if (vm.userMessages[i].uuid === uuid) {
                    if (vm.userMessages[i].open) {
                        vm.userMessages[i].open = false;
                    } else {
                        vm.userMessages[i].opened = true;
                        vm.userMessages[i].open = true;
                    }
                } else {
                    vm.userMessages[i].open = false;
                }
            }
        }

        function obtainUserLocationImage() {

            $http.get(`/unsplashcity/${vm.userExtendedProfile.location.name}`)
                .then(locateData => {

                    let locate = locateData.data;
                    let index = Math.floor(Math.random() * locate.results.length);
                    vm.userLocationImage = locate.results[index].urls.regular;
                    vm.userLocationAltText = locate.results[index].alt_description;
                    vm.locationAttribution = locate.results[index].user.name
                });
        }

        function navigateProfileViews(state) {
            if (state === 'public') {
                vm.profileNavState = 'public';
                vm.navigationPublicState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlidePublicState' + vm.monthSelect;
            }
            if (state === 'private') {
                vm.profileNavState = 'private';
                vm.navigationPublicState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlidePrivateState' + vm.monthSelect;
            }
            if (state === 'messages') {
                vm.profileNavState = 'messages';
                vm.navigationPublicState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlideMessagesState' + vm.monthSelect;
            }
            if (state === 'friends') {
                vm.profileNavState = 'friends';
                vm.navigationPublicState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlideFriendsState' + vm.monthSelect;
            }
            if (state === 'contact') {
                vm.profileNavState = 'contact';
                vm.navigationPublicState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlideContactState' + vm.monthSelect;
            }
        }

        function hubDisplayBlogData(blogIndex) {
            vm.currentBlogLogo = vm.userBlogs[parseInt(blogIndex)].logo;
            vm.currentBlogName = vm.userBlogs[parseInt(blogIndex)].blog;
            vm.currentBlogDescription = vm.userBlogs[parseInt(blogIndex)].description;
            vm.currentBlogContributers = vm.userBlogs[parseInt(blogIndex)].contributers;
            vm.totalPosts = vm.userBlogs[parseInt(blogIndex)].total_posts;
            vm.lastPost = vm.userBlogs[parseInt(blogIndex)].last_post;
            vm.totalPageLoads = vm.userBlogs[parseInt(blogIndex)].page_loads;
        }

        function hubCancelShareSaveLink(submitStatus) {
            const commentContent = document.getElementById('hubShareSaveLinkUserNotes').value;
            let shareSaveTable = '';
            console.log(vm.activeArticle);
            if (submitStatus === 'submit') {
                let subObj = {
                    user_uuid: vm.user.uuid,
                    feed_uuid: vm.activeArticle.feed_uuid,
                    comment: commentContent,
                    title: vm.activeArticle.title,
                    pubDate: vm.activeArticle.pubDate,
                    link: vm.activeArticle.link,
                    guid: vm.activeArticle.guid,
                    author: vm.activeArticle.author,
                    thumbnail: vm.activeArticle.thumbnail,
                    description: vm.activeArticle.description,
                    content: vm.activeArticle.content,
                    enclosure: vm.activeArticle.enclosure,
                    categories: vm.activeArticle.categories
                };
                if (vm.activeArticle.blogOrPodcast === 'blog') {
                    shareSaveTable = '/blog_';
                } else {
                    shareSaveTable = '/podcast_'
                }
                if (vm.hubLinkShareOrSave === 'Share Link') {
                    shareSaveTable += 'shares';
                    subObj.share_status = document.querySelector('input[name="shareStatus"]:checked').value;
                } else {
                    shareSaveTable += 'saves';
                }
                $http.post(shareSaveTable, subObj);
            }
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
            vm.shareSaveLinkDisplay = 'hubShareShareSaveModalInactive' + vm.monthSelect;
            document.getElementById('hubShareSaveLinkUserNotes').value = '';
        }

        function hubShareSave(status, image, sourceName, sourceTitle, article) {
            if (status === 'share') {
                vm.hubLinkShareOrSave = 'Share Link';
            } else {
                vm.hubLinkShareOrSave = 'Save Link';
            }
            vm.backgroundStatus = 'hubContainerBlur' + vm.monthSelect;
            vm.shareSaveLinkDisplay = 'hubShareShareSaveModalActive' + vm.monthSelect;
            vm.feedIcon = image;
            vm.feedTitle = sourceName;
            vm.hubLinkShareSaveTitle = sourceTitle;
            vm.activeArticle = article;
        }

        function toggleSubscriptionManagement() {
            if (vm.subscriptionToggle === 'off') {
                vm.subscriptionToggle = 'on';
                vm.manageBlockToggleStatus = 'hubReaderDay1BlockActive' + vm.monthSelect;
                vm.externalsBlockToggleStatus = 'hubReaderExternalsDay2BlockActive' + vm.externalsMonth;
                vm.dailiesBlockToggleStatus = 'hubReaderDay3BlockActive' + vm.dailiesMonth;
                vm.browseFeedsBlockToggleStatus = 'hubReaderDay4BlockActive' + vm.monthSelect;
                vm.sharedBlockToggleStatus = 'hubReaderDay5BlockActive' + vm.monthSelect;
                vm.savedBlockToggleStatus = 'hubReaderDay6BlockActive' + vm.monthSelect;
                vm.miscBlockToggleStatus = 'hubReaderDay7BlockActive' + vm.monthSelect;
            } else {
                vm.subscriptionToggle = 'off';
                vm.manageBlockToggleStatus = 'hubReaderDay1BlockInactive' + vm.monthSelect;
                vm.externalsBlockToggleStatus = 'hubReaderExternalsDay2BlockInactive' + vm.externalsMonth;
                vm.dailiesBlockToggleStatus = 'hubReaderDay3BlockInactive' + vm.dailiesMonth;
                vm.browseFeedsBlockToggleStatus = 'hubReaderDay4BlockInactive' + vm.monthSelect;
                vm.sharedBlockToggleStatus = 'hubReaderDay5BlockInactive' + vm.monthSelect;
                vm.savedBlockToggleStatus = 'hubReaderDay6BlockInactive' + vm.monthSelect;
                vm.miscBlockToggleStatus = 'hubReaderDay7BlockInactive' + vm.monthSelect;
            }
        }

        function hubWeekToggle() {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let now = new Date;
            let day = days[now.getDay()];

            if (vm.weekToggle === 'off') {
                vm.weekToggle = 'on';
                if (day === 'Monday') {
                    vm.day1ToggleState = 'hubReaderDay1MondayActive' + vm.mondayMonth;
                } else {
                    vm.day1ToggleState = 'hubReaderDay1BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 1) % 7];
                if (day === 'Monday') {
                    vm.day2ToggleState = 'hubReaderDay2MondayActive' + vm.mondayMonth;
                } else {
                    vm.day2ToggleState = 'hubReaderDay2BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 2) % 7];
                if (day === 'Monday') {
                    vm.day3ToggleState = 'hubReaderDay3MondayActive' + vm.mondayMonth;
                } else {
                    vm.day3ToggleState = 'hubReaderDay3BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 3) % 7];
                if (day === 'Monday') {
                    vm.day4ToggleState = 'hubReaderDay4MondayActive' + vm.mondayMonth;
                } else {
                    vm.day4ToggleState = 'hubReaderDay4BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 4) % 7];
                if (day === 'Monday') {
                    vm.day5ToggleState = 'hubReaderDay5MondayActive' + vm.mondayMonth;
                } else {
                    vm.day5ToggleState = 'hubReaderDay5BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 5) % 7];
                if (day === 'Monday') {
                    vm.day6ToggleState = 'hubReaderDay6MondayActive' + vm.mondayMonth;
                } else {
                    vm.day6ToggleState = 'hubReaderDay6BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 6) % 7];
                if (day === 'Monday') {
                    vm.day7ToggleState = 'hubReaderDay7MondayActive' + vm.mondayMonth;
                } else {
                    vm.day7ToggleState = 'hubReaderDay7BlockActive' + vm.monthSelect;
                }
            } else {
                vm.weekToggle = 'off';
                if (day === 'Monday') {
                    vm.day1ToggleState = 'hubReaderDay1MondayInactive' + vm.mondayMonth;
                } else {
                    vm.day1ToggleState = 'hubReaderDay1BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 1) % 7];
                if (day === 'Monday') {
                    vm.day2ToggleState = 'hubReaderDay2MondayInactive' + vm.mondayMonth;
                } else {
                    vm.day2ToggleState = 'hubReaderDay2BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 2) % 7];
                if (day === 'Monday') {
                    vm.day3ToggleState = 'hubReaderDay3MondayInactive' + vm.mondayMonth;
                } else {
                    vm.day3ToggleState = 'hubReaderDay3BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 3) % 7];
                if (day === 'Monday') {
                    vm.day4ToggleState = 'hubReaderDay4MondayInactive' + vm.mondayMonth;
                } else {
                    vm.day4ToggleState = 'hubReaderDay4BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 4) % 7];
                if (day === 'Monday') {
                    vm.day5ToggleState = 'hubReaderDay5MondayInactive' + vm.mondayMonth;
                } else {
                    vm.day5ToggleState = 'hubReaderDay5BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 5) % 7];
                if (day === 'Monday') {
                    vm.day6ToggleState = 'hubReaderDay6MondayInactive' + vm.mondayMonth;
                } else {
                    vm.day6ToggleState = 'hubReaderDay6BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 6) % 7];
                if (day === 'Monday') {
                    vm.day7ToggleState = 'hubReaderDay7MondayInactive' + vm.mondayMonth;
                } else {
                    vm.day7ToggleState = 'hubReaderDay7BlockInactive' + vm.monthSelect;
                }
            }
        }

        function setDaysRelativeToToday() {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let now = new Date();

            vm.day0 = days[now.getDay()];
            vm.day1 = days[(now.getDay() + 1) % 7];
            vm.day2 = days[(now.getDay() + 2) % 7];
            vm.day3 = days[(now.getDay() + 3) % 7];
            vm.day4 = days[(now.getDay() + 4) % 7];
            vm.day5 = days[(now.getDay() + 5) % 7];
            vm.day6 = days[(now.getDay() + 6) % 7];
        }

        function setTodayString() {
            let now = new Date();
            let str = '';
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let hour = '';
            let minute = '';
            let seconds = '';
            if (now.getHours() < 10) {
                hour += '0';
            }
            hour += now.getHours() + ':';
            if (now.getMinutes() < 10) {
                minute += '0';
            }
            minute += now.getMinutes() + ':';
            if (now.getSeconds() < 10) {
                seconds += '0';
            }
            seconds += now.getSeconds();
            vm.todayIs = str + days[now.getDay()] + ', ' + now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ' - ' + hour + minute + seconds;
            if (document.getElementById('todayIs')) {
                document.getElementById('todayIs').innerHTML = vm.todayIs;
            }
            setTimeout(() => {

                if (vm.hubReaderTabState === ('hubTabActive' + vm.monthSelect)) {
                    setTodayString();
                }
            }, 1000);
        }

        function hubShareSubmitComment(articleIndex, article) {
            let hubShareCommentTextArea = document.getElementById('hubShareCommentTextArea' + articleIndex);

            if (hubShareCommentTextArea.value !== '') {
                let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                let index = vm.sharedContent[parseInt(articleIndex)].share_comments.length;
                let now = new Date();
                let minutes = '';
                let seconds = '';
                if (now.getMinutes() < 10) {
                    minutes = '0' + now.getMinutes();
                } else {
                    minutes = now.getMinutes();
                }
                if (now.getSeconds() < 10) {
                    seconds = '0' + now.getSeconds();
                } else {
                    seconds = now.getSeconds();
                }
                let cleanDate = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ' - ' + now.getHours() + ':' + minutes + ':' + seconds;
                vm.sharedContent[parseInt(articleIndex)].share_comments.push({
                    avatar: vm.user.avatar_path,
                    cleanDate: cleanDate,
                    comment: hubShareCommentTextArea.value,
                    comment_reactions: [],
                    id: index,
                    name: vm.user.first_name + ' ' + vm.user.last_name,
                    select_reactions: false
                });

                let subObj = {
                    user_uuid: vm.user.uuid,
                    share_uuid: article.uuid,
                    blogOrPodcast: article.blogOrPodcast,
                    comment: hubShareCommentTextArea.value
                };
                hubShareCommentTextArea.value = '';
                $http.post('/share_comments', subObj);
            }
        }

        function commentReactionHoverOff(articleIndex, commentIndex, commentReactionIndex) {
            vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].hoverClass = 'hubShareReactionsHoverText' + vm.monthSelect;
        }

        function hoverOff(articleIndex, reactionIndex) {
            vm.sharedContent[parseInt(articleIndex)].share_reactions[parseInt(reactionIndex)].hoverClass = 'hubShareReactionsHoverText' + vm.monthSelect;
        }

        function commentReactionHoverOver(articleIndex, commentIndex, commentReactionIndex) {
            vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].hoverClass = 'hubShareReactionsHoverTextHover' + vm.monthSelect;
        }

        function hoverOver(articleIndex, reactionIndex) {
            vm.sharedContent[parseInt(articleIndex)].share_reactions[parseInt(reactionIndex)].hoverClass = 'hubShareReactionsHoverTextHover' + vm.monthSelect;
        }

        function hubShareCommentAdditionalReaction(articleIndex, commentIndex, commentReactionIndex, article, comment, commentReaction) {
            vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].from.push(vm.user.uuid);
            vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].hover_text += ', ' + vm.user.first_name + ' ' + vm.user.last_name;
            vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].tally += 1;
            vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].user_contributed = true;

            let subObj = {
                user_uuid: vm.user.uuid,
                reaction_uuid: commentReaction.reaction_uuid,
                comment_uuid: comment.uuid,
                blogOrPodcast: article.blogOrPodcast
            };
            $http.post('/share_comment_reactions', subObj);
        }

        function hubShareAdditionalReaction(articleIndex, reactionIndex, article, reaction) {
            vm.sharedContent[parseInt(articleIndex)].share_reactions[parseInt(reactionIndex)].from.push(vm.user.uuid);
            vm.sharedContent[parseInt(articleIndex)].share_reactions[parseInt(reactionIndex)].hover_text += ', ' + vm.user.first_name + ' ' + vm.user.last_name;
            vm.sharedContent[parseInt(articleIndex)].share_reactions[parseInt(reactionIndex)].tally += 1;
            vm.sharedContent[parseInt(articleIndex)].share_reactions[parseInt(reactionIndex)].user_contributed = true;
            let subObj = {
                user_uuid: vm.user.uuid,
                reaction_uuid: reaction.reaction_uuid,
                share_uuid: article.uuid,
                blogOrPodcast: article.blogOrPodcast
            };
            $http.post('/share_reactions', subObj);
        }

        function hubShareRemoveCommentReaction(articleIndex, commentIndex, commentReactionIndex, article, comment, commentReaction) {
            if (vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].tally === 1) {
                vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions.splice(parseInt(commentReactionIndex), 1);
                for (let i = 0; i < vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions.length; i++) {
                    vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[i].id = i;
                }
            } else {
                vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].from.splice(vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].from.indexOf(vm.user.uuid), 1);
                vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].tally -= 1;
                vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].user_contributed = false;
                vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].hover_text.replace(vm.user.first_name + ' ' + vm.user.last_name, '');
            }
            $http.get('/share_comment_reactions')
            .then(allShareCommentReactions => {
                let targ = allShareCommentReactions.data.filter(entry => {
                    return((entry.user_uuid === vm.user.uuid) && (entry.reaction_uuid === commentReaction.reaction_uuid) && (entry.comment_uuid === comment.uuid));
                });
                $http.delete(`/share_comment_reactions/${targ[0].uuid}`);
            });
        }

        function hubShareRemoveReaction(articleIndex, path, value, article, reaction) {
            let index = null;
            for (let i = 0; i < vm.sharedContent[parseInt(articleIndex)].share_reactions.length; i++) {
                if ((vm.sharedContent[parseInt(articleIndex)].share_reactions[i].link === path) && (vm.sharedContent[parseInt(articleIndex)].share_reactions[i].reaction === value)) {
                    index = i;
                }
            }
            if (index !== null) {
                if (vm.sharedContent[parseInt(articleIndex)].share_reactions[index].tally === 1) {
                    vm.sharedContent[parseInt(articleIndex)].share_reactions.splice(index, 1);
                    for (let j = 0; j < vm.sharedContent[parseInt(articleIndex)].share_reactions.length; j++) {
                        vm.sharedContent[parseInt(articleIndex)].share_reactions[j].id = j;
                    }
                } else {
                    let nameString = vm.user.first_name + ' ' + vm.user.last_name;
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[index].from.splice(vm.sharedContent[parseInt(articleIndex)].share_reactions[index].from.indexOf(vm.user.uuid), 1);
                    if (vm.sharedContent[parseInt(articleIndex)].share_reactions[index].hover_text.indexOf(nameString) === 0) {
                        vm.sharedContent[parseInt(articleIndex)].share_reactions[index].hover_text.replace(nameString, '');
                    } else {
                        vm.sharedContent[parseInt(articleIndex)].share_reactions[index].hover_text.replace(', ' + nameString, '');
                    }
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[index].tally -= 1;
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[index].user_contributed = false;
                }
            }
            $http.get('/share_reactions')
            .then(allReactionsData => {
                let targ = allReactionsData.data.filter(react => {
                    return((react.user_uuid === vm.user.uuid) && (react.reaction_uuid === reaction.reaction_uuid) && (react.share_uuid === article.uuid));
                });                
                $http.delete(`/share_reactions/${targ[0].uuid}`);
            });
        }

        function shareAddCommentEmoji(articleIndex, commentIndex, path, value, article, comment, emoji) {
            let existing = false;

            for (let i = 0; i < vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions.length; i++) {
                if ((vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[i].link === path) && (vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[i].reaction === value)) {
                    existing = true;
                    if (vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[i].from.indexOf(vm.user.uuid) !== -1) {
                        toggleCommentEmojiSelector(articleIndex, commentIndex);
                        return;
                    }
                    vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[i].tally += 1;
                    vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[i].user_contributed = true;
                    vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[i].from.push(vm.user.uuid);
                    vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[i].hover_text += ', ' + vm.user.first_name + ' ' + vm.user.last_name;
                }
            }
            if (!existing) {
                let index = vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions.length;
                vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions.push({
                    from: [vm.user.uuid],
                    hover_text: vm.user.first_name + ' ' + vm.user.last_name,
                    hoverClass: 'hubShareReactionsHoverText' + vm.monthSelect,
                    id: index,
                    link: path,
                    reaction: value,
                    tally: 1,
                    user_contributed: true
                });
            }
            toggleCommentEmojiSelector(articleIndex, commentIndex);
            let subObj = {
                user_uuid: vm.user.uuid,
                reaction_uuid: emoji.uuid,
                comment_uuid: comment.uuid,
                blogOrPodcast: article.blogOrPodcast
            };
            $http.post('/share_comment_reactions', subObj);
        }

        function shareAddEmoji(articleIndex, path, value, article, emojiUuid) {
            let existing = false;
            console.log(article);

            for (let i = 0; i < vm.sharedContent[parseInt(articleIndex)].share_reactions.length; i++) {
                if ((vm.sharedContent[parseInt(articleIndex)].share_reactions[i].link === path) && (vm.sharedContent[parseInt(articleIndex)].share_reactions[i].reaction === value)) {
                    existing = true;
                    if (vm.sharedContent[parseInt(articleIndex)].share_reactions[i].from.indexOf(vm.user.uuid) !== -1) {
                        toggleEmojiSelector(articleIndex);
                        return;
                    }
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[i].tally += 1;
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[i].user_contributed = true;
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[i].from.push(vm.user.uuid);
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[i].hover_text += ', ' + vm.user.first_name + ' ' + vm.user.last_name;
                }
            }
            if (!existing) {
                let index = vm.sharedContent[parseInt(articleIndex)].share_reactions.length;
                vm.sharedContent[parseInt(articleIndex)].share_reactions.push({
                    from: [vm.user.uuid],
                    hover_text: vm.user.first_name + ' ' + vm.user.last_name,
                    hoverClass: 'hubShareReactionsHoverText' + vm.monthSelect,
                    id: index,
                    link: path,
                    reaction: value,
                    tally: 1,
                    user_contributed: true
                });
            }
            toggleEmojiSelector(articleIndex);
            let subObj = {
                user_uuid: vm.user.uuid,
                reaction_uuid: emojiUuid,
                share_uuid: article.uuid,
                blogOrPodcast: article.blogOrPodcast
            };
            $http.post('/share_reactions', subObj);
        }

        function toggleEmojiSelector(articleIndex) {
            vm.sharedContent[parseInt(articleIndex)].select_reactions = !vm.sharedContent[parseInt(articleIndex)].select_reactions;
        }

        function toggleCommentEmojiSelector(articleIndex, commentIndex) {
            vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].select_reactions = !vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].select_reactions;
        }

        function updateHubTab(state) {
            if (state === 'shared') {
                if (vm.hubTabStatus !== 'hubShare' + vm.monthSelect) {
                    vm.hubShareTabState = 'hubTabActive' + vm.monthSelect;
                    vm.hubReaderTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubBloggerTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubProfileTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubTabStatus = 'hubShare' + vm.monthSelect;
                }
            }
            if (state === 'reader') {
                if (vm.hubTabStatus !== 'hubReader' + vm.monthSelect) {
                    vm.hubShareTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubReaderTabState = 'hubTabActive' + vm.monthSelect;
                    vm.hubBloggerTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubProfileTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubTabStatus = 'hubReader' + vm.monthSelect;
                    setTodayString();
                }
            }
            if (state === 'blogs') {
                if (vm.hubTabStatus !== 'hubBlogs' + vm.monthSelect) {
                    vm.hubShareTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubReaderTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubBloggerTabState = 'hubTabActive' + vm.monthSelect;
                    vm.hubProfileTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubTabStatus = 'hubBlogs' + vm.monthSelect;
                }
            }
            if (state === 'profile') {
                if (vm.hubTabStatus !== 'hubProfile' + vm.monthSelect) {
                    vm.hubShareTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubReaderTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubBloggerTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubProfileTabState = 'hubTabActive' + vm.monthSelect;
                    vm.hubTabStatus = 'hubProfile' + vm.monthSelect;
                }
            }
        }

        function userLogout() {
            $http.post('/users/logout', {})
                .then(resultData => {
                    let result = resultData.data;
                    if (result.session === 'cleared') {
                        let storage = window.localStorage;
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        $state.go('landing');
                    }
                });
        }

        function navigateToLanding() {
            $state.go('landing');
        }

        function clearCookiesAndStorage() {
            let storage = window.localStorage;
            storage.removeItem('habitualOffender');
            storage.removeItem('habitualRelease');
            document.cookie = "habitualOffender=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "habitualRelease=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }

        function getCookie(name) {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; ++i) {
                var pair = cookies[i].trim().split('=');
                if (pair[0] === name) {
                    return (pair[1]);
                }
            }
            return null;
        }

        function setUserIPAddress() {
            $http.get('/ipaddress')
                .then(responseData => {
                    vm.ip = responseData.data.ip;
                    checkLoginStatus($stateParams.id);
                });
        }

        function resetSecuritySettings() {
            let oldKey = vm.user.security.key;

            let storage = window.localStorage;
            let now = new Date();

            $http.post(`/users/resetsecurity`, {
                    uuid: vm.user.uuid,
                    ip: vm.ip
                })
                .then(userData => {
                    let user = userData.data[0];
                    vm.user = user;
                    storage.removeItem(oldKey);
                    document.cookie = oldKey + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    storage.setItem(vm.user.security.key, vm.user.security.value);
                    storage.setItem('habitualOffender', vm.user.uuid);
                    storage.setItem('habitualRelease', vm.user.security.expire);
                    document.cookie = vm.user.security.key + "=" + vm.user.security.value;
                    document.cookie = "habitualOffender=" + vm.user.uuid;
                    document.cookie = "habitualRelease=" + vm.user.security.expire;
                });
        }

        function checkLoginStatus(userUuid) {
            let storage = window.localStorage;
            let now = new Date();

            if ((!storage.getItem('habitualOffender')) || (getCookie('habitualOffender') === null)) {
                vm.user = null;
                vm.userLoggedIn = false;
                navigateToLanding();
                return;
            }

            if (storage.getItem('habitualOffender') !== getCookie('habitualOffender')) {
                vm.user = null;
                vm.userLoggedIn = false;
                clearCookiesAndStorage();
                navigateToLanding();
                return;
            }

            if (storage.getItem('habitualOffender') !== userUuid) {
                vm.user = null;
                vm.userLoggedIn = false;
                clearCookiesAndStorage();
                navigateToLanding();
                return;
            }

            $http.get(`/users/${userUuid}`)
                .then(userData => {
                    vm.user = userData.data;

                    if ((!storage.getItem('habitualRelease')) || (getCookie('habitualRelease') === null)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }

                    if ((storage.getItem('habitualRelease')) !== getCookie('habitualRelease')) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }

                    let expiration = new Date(storage.getItem('habitualRelease'));
                    if (now.getTime() > expiration.getTime()) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }

                    if ((!storage.getItem(vm.user.security.key)) || (getCookie(vm.user.security.key) === null)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }

                    if ((storage.getItem(vm.user.security.key) !== getCookie(vm.user.security.key)) || (storage.getItem(vm.user.security.key) !== vm.user.security.value) || (getCookie(vm.user.security.key) !== vm.user.security.value)) {
                        storage.removeItem(vm.user.security.key);
                        document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        vm.user = null;
                        vm.userLoggedIn = false;
                        clearCookiesAndStorage();
                        navigateToLanding();
                        return;
                    }
                    vm.userLoggedIn = true;
                    resetSecuritySettings();
                });

        }

        function populateEmojis() {
            $http.get('/emojis')
                .then(emojisData => {
                    vm.emojis = emojisData.data;
                });
        }

        function assembleShareFeed(uuid) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            $http.get(`/assemble_shared_content/${uuid}`)
                .then(shareFeedData => {
                    let shareFeed = shareFeedData.data;
                    let createDate;

                    for (let i = 0; i < shareFeed.length; i++) {
                        createDate = new Date(shareFeed[i].pubDate);
                        shareFeed[i].cleanDate = createDate.getFullYear() + ' ' + months[createDate.getMonth()] + ' ' + createDate.getDate() + ' - ' + createDate.toLocaleTimeString('en-GB');
                        createDate = new Date(shareFeed[i].created_at);
                        shareFeed[i].share_cleanDate = createDate.getFullYear() + ' ' + months[createDate.getMonth()] + ' ' + createDate.getDate() + ' - ' + createDate.toLocaleTimeString('en-GB');

                        if (shareFeed[i].share_reactions.length > 0) {
                            for (let j = 0; j < shareFeed[i].share_reactions.length; j++) {
                                shareFeed[i].share_reactions[j].hoverClass = 'hubShareReactionsHoverText' + vm.monthSelect;
                            }
                        }
                        if (shareFeed[i].share_comments.length > 0) {
                            for (let k = 0; k < shareFeed[i].share_comments.length; k++) {
                                if (shareFeed[i].share_comments[k].comment_reactions.length > 0) {
                                    for (let l = 0; l < shareFeed[i].share_comments[k].comment_reactions.length; l++) {
                                        shareFeed[i].share_comments[k].comment_reactions[l].hoverClass = 'hubShareReactionsHoverText' + vm.monthSelect;
                                    }
                                }
                            }
                        }
                    }
                    vm.sharedContent = shareFeed;
                    console.log(vm.sharedContent);
                });
        }


        function onInit() {
            console.log("User Hub is lit");
            setUserIPAddress();

            switch (vm.monthSelect) {
                case ('_JanuaryA'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
                    break;
                case ('_JanuaryB'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png'
                    break;
                case ('_JanuaryC'):
                    vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
                    break;
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
            }

            setDaysRelativeToToday();
            setFooterMessage();
            obtainUserLocationImage();
            initializeDayCards();
            initializeSubscriptionCards();
            populateEmojis();
            assembleShareFeed($stateParams.id);

        }

    }

}());
