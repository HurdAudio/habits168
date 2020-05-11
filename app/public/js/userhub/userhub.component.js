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
        vm.userLogout = userLogout;
        vm.browseMonth = '_JanuaryA'
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
        vm.externalsBlockToggleStatus = 'hubReaderExternalsDay2BlockInactive' + vm.externalsMonth;
        vm.browseFeedsBlockToggleStatus = 'hubReaderBrowseBlockInactive' + vm.browseMonth;
        vm.hubLinkShareOrSave = 'Share Link';
        vm.hubShareSave = hubShareSave;
        vm.hubCancelShareSaveLink = hubCancelShareSaveLink;
        vm.hubDisplayBlogData = hubDisplayBlogData;
        vm.navigateProfileViews = navigateProfileViews;
        vm.profileNavState = 'public';
        vm.unreadMailMarker = '';
        vm.toggleMessageOpen = toggleMessageOpen;
        vm.submitResponse = submitResponse;
        vm.friendFiltering = friendFiltering;
        vm.displayFriend = displayFriend;
        vm.profileDisplayClose = profileDisplayClose;
        vm.initiateMessage = initiateMessage;
        vm.cancelMessageSender = cancelMessageSender;
        vm.sendMessage = sendMessage;
        vm.removeBadFriend = removeBadFriend;
        vm.cancelFriendRemoval = cancelFriendRemoval;
        vm.confirmFriendRemoval = confirmFriendRemoval;
        vm.formSubmittable = false;
        vm.checkSubmittability = checkSubmittability;
        vm.hubContactSubmit = hubContactSubmit;
        vm.navigateToDay = navigateToDay;
        vm.navigateToToday = navigateToToday;
        vm.navigateToExternals = navigateToExternals;
        vm.externalsMonth = '_FebruaryC';
        vm.navigateToDailies = navigateToDailies;
        vm.dailiesMonth = '_FebruaryB';
        vm.removeShareModal = removeShareModal;
        vm.negativeDeleteShare = negativeDeleteShare;
        vm.positiveDeleteShare = positiveDeleteShare;
        vm.editShareComment = editShareComment;
        vm.hubCancelSharePatchLink = hubCancelSharePatchLink;
        vm.removeShareCommentModal = removeShareCommentModal;
        vm.negativeDeleteShareComment = negativeDeleteShareComment;
        vm.positiveDeleteShareComment = positiveDeleteShareComment;
        vm.editShareCommentEnable = editShareCommentEnable;
        vm.hubShareSubmitCommentEdit = hubShareSubmitCommentEdit;
        vm.removeMessage = removeMessage;
        vm.removeMessageReply = removeMessageReply;
        vm.navigateToProfileEditor = navigateToProfileEditor;
        vm.tuesdayMonth = '_JanuaryC';
        vm.navigateToBrowse = navigateToBrowse;
        
        function navigateToBrowse() {
            $state.go('browse', {
                userUuid: vm.user.uuid
            });
        }

        function navigateToProfileEditor() {
            $state.go('userprofileeditor', {
                userUuid: vm.user.uuid
            });
        }

        function removeMessageReply(message, response) {
            $http.delete(`/message_responses/${response.uuid}`);
            for (let i = 0; i < vm.userMessages.length; i++) {
                if (vm.userMessages[i].uuid === message.uuid) {
                    for (let j = 0; j < vm.userMessages[i].replies.length; j++) {
                        if (vm.userMessages[i].replies[j].uuid === response.uuid) {
                            vm.userMessages[i].replies.splice(j, 1);
                            return;
                        }
                    }
                }
            }
        }

        function removeMessage(message) {
            $http.delete(`/messages/${message.uuid}`);
            for (let i = 0; i < vm.userMessages.length; i++) {
                if (vm.userMessages[i].uuid === message.uuid) {
                    vm.userMessages.splice(i, 1);
                    return;
                }
            }
        }

        function hubShareSubmitCommentEdit(article, comment) {
            let now = new Date;
            const hubShareEditCommentTextArea = document.getElementById('hubShareEditCommentTextArea' + comment.uuid);
            const editedComment = hubShareEditCommentTextArea.value;
            if ((comment.comment !== editedComment) && (editedComment !== '')) {
                $http.patch(`/share_comments/${comment.uuid}`, {
                    comment: editedComment,
                    updated_at: now
                });
                vm.sharedContent[article.id].share_comments[comment.id].comment = editedComment;
                if (vm.sharedContent[article.id].share_comments[comment.id].cleanDate.indexOf('edited') === -1) {
                    vm.sharedContent[article.id].share_comments[comment.id].cleanDate += ' (edited)';
                }
            }
            vm.sharedContent[article.id].share_comments[comment.id].editMode = false;
        }

        function editShareCommentEnable(article, comment) {
            console.log(comment);
            vm.sharedContent[article.id].share_comments[comment.id].editMode = true;
            setTimeout(() => {
                const hubShareEditCommentTextArea = document.getElementById('hubShareEditCommentTextArea' + comment.uuid);

                hubShareEditCommentTextArea.value = comment.comment;
                hubShareEditCommentTextArea.focus();
            }, 100);

        }

        function positiveDeleteShareComment() {

            $http.delete(`/share_comments/${vm.deleteCommentCandidate.uuid}`);
            vm.sharedContent[vm.deleteCommentCandidateArticle.id].share_comments.splice(vm.deleteCommentCandidate.id, 1);
            if (vm.sharedContent[vm.deleteCommentCandidateArticle.id].share_comments.length > 0) {
                for (let i = 0; i < vm.sharedContent[vm.deleteCommentCandidateArticle.id].share_comments.length; i++) {
                    vm.sharedContent[vm.deleteCommentCandidateArticle.id].share_comments[i].id = i;
                }
            }
            vm.deleteShareCommentGuardrailState = 'deleteCommentGuardrailInactive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        }

        function negativeDeleteShareComment() {
            vm.deleteShareCommentGuardrailState = 'deleteCommentGuardrailInactive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        }

        function removeShareCommentModal(article, comment) {
            vm.deleteCommentCandidate = comment;
            vm.deleteCommentCandidateArticle = article;
            vm.deleteShareCommentGuardrailState = 'deleteCommentGuardrailActive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainerBlur' + vm.monthSelect;
        }

        function hubCancelSharePatchLink(action) {
            let table = '';
            if (action === 'submit') {
                let now = new Date();
                if (vm.patchCandidate.blogOrPodcast === 'blog') {
                    table = '/blog_shares/' + vm.patchCandidate.uuid;
                } else {
                    table = '/podcast_shares/' + vm.patchCandidate.uuid;
                }
                $http.patch(table, {
                    comment: document.getElementById('hubShareSaveLinkUserEditNotes').value,
                    share_status: document.querySelector('input[name="shareStatusPatch"]:checked').value,
                    updated_at: now
                });
                vm.sharedContent[vm.patchCandidate.id].comments = document.getElementById('hubShareSaveLinkUserEditNotes').value;
                vm.sharedContent[vm.patchCandidate.id].share_status = document.querySelector('input[name="shareStatusPatch"]:checked').value;
                if (vm.sharedContent[vm.patchCandidate.id].share_cleanDate.indexOf('edited') === -1) {
                    vm.sharedContent[vm.patchCandidate.id].share_cleanDate += ' (edited)';
                }
                console.log(vm.patchCandidate);
            }
            vm.editCommentModalState = 'hubEditMessageInactive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        }

        function editShareComment(article) {
            vm.patchCandidate = article;
            vm.editCommentModalState = 'hubEditMessageActive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainerBlur' + vm.monthSelect;
            document.getElementById('hubShareSaveLinkUserEditNotes').value = article.comments;
            document.getElementById('hubShareSaveLinkUserEditNotes').focus();
        }

        function positiveDeleteShare() {
            let table = '';
            if (vm.deleteCandidate.blogOrPodcast === 'blog') {
                table = '/blog_shares/' + vm.deleteCandidate.uuid;
            } else {
                table = '/podcast_shares/' + vm.deleteCandidate.uuid;
            }
            $http.delete(table);
            vm.sharedContent.splice(vm.deleteCandidate.id, 1);
            for (let i = 0; i < vm.sharedContent.length; i++) {
                vm.sharedContent[i].id = i;
            }

            vm.deleteShareGuardrailState = 'deleteGuardrailInactive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        }

        function negativeDeleteShare() {
            vm.deleteShareGuardrailState = 'deleteGuardrailInactive' + vm.monthSelect;
            vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
        }

        function removeShareModal(article) {
            vm.deleteShareGuardrailState = 'deleteGuardrailActive' + vm.monthSelect;
            vm.deleteCandidate = article;
            vm.backgroundStatus = 'hubContainerBlur' + vm.monthSelect;
        }

        function initializeSubscriptionCards() {
            vm.manageBlockToggleStatus = 'hubReaderDay1BlockInactive' + vm.monthSelect;
            vm.externalsBlockToggleStatus = 'hubReaderExternalsDay2BlockInactive' + vm.externalsMonth;
            vm.dailiesBlockToggleStatus = 'hubReaderDay3BlockInactive' + vm.monthSelect;
            vm.browseFeedsBlockToggleStatus = 'hubReaderBrowseBlockInactive' + vm.browseMonth;
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
            } else if (day === 'Tuesday') {
                vm.day1ToggleState = 'hubReaderDay1TuesdayInactive' + vm.tuesdayMonth;
            } else {
                vm.day1ToggleState = 'hubReaderDay1BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 1) % 7];
            if (day === 'Monday') {
                vm.day2ToggleState = 'hubReaderDay2MondayInactive' + vm.mondayMonth;
            } else if (day === 'Tuesday') {
                vm.day2ToggleState = 'hubReaderDay2TuesdayInactive' + vm.tuesdayMonth;
            } else {
                vm.day2ToggleState = 'hubReaderDay2BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 2) % 7];
            if (day === 'Monday') {
                vm.day3ToggleState = 'hubReaderDay3MondayInactive' + vm.mondayMonth;
            } else if (day === 'Tuesday') {
                vm.day3ToggleState = 'hubReaderDay3TuesdayInactive' + vm.tuesdayMonth;
            } else {
                vm.day3ToggleState = 'hubReaderDay3BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 3) % 7];
            if (day === 'Monday') {
                vm.day4ToggleState = 'hubReaderDay4MondayInactive' + vm.mondayMonth;
            } else if (day === 'Tuesday') {
                vm.day4ToggleState = 'hubReaderDay4TuesdayInactive' + vm.tuesdayMonth;
            } else {
                vm.day4ToggleState = 'hubReaderDay4BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 4) % 7];
            if (day === 'Monday') {
                vm.day5ToggleState = 'hubReaderDay5MondayInactive' + vm.mondayMonth;
            } else if (day === 'Tuesday') {
                vm.day5ToggleState = 'hubReaderDay5TuesdayInactive' + vm.tuesdayMonth;
            } else {
                vm.day5ToggleState = 'hubReaderDay5BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 5) % 7];
            if (day === 'Monday') {
                vm.day6ToggleState = 'hubReaderDay6MondayInactive' + vm.mondayMonth;
            } else if (day === 'Tuesday') {
                vm.day6ToggleState = 'hubReaderDay6TuesdayInactive' + vm.tuesdayMonth;
            } else {
                vm.day6ToggleState = 'hubReaderDay6BlockInactive' + vm.monthSelect;
            }
            day = days[(now.getDay() + 6) % 7];
            if (day === 'Monday') {
                vm.day7ToggleState = 'hubReaderDay7MondayInactive' + vm.mondayMonth;
            } else if (day === 'Tuesday') {
                vm.day7ToggleState = 'hubReaderDay7TuesdayInactive' + vm.tuesdayMonth;
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
                case ('Tuesday'):
                    $state.go('tuesday', {
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
            $http.post('/contact_messages', {
                    user_uuid: vm.user.uuid,
                    subject: hubContactSubjectInput.value,
                    message: hubContactMessageInput.value
                })
                .then(() => {
                    hubContactSubjectInput.value = '';
                    hubContactMessageInput.value = '';
                    vm.formSubmittable = false;
                });


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
                //                vm.userMessages.push(message);

                let msg = message.message.replace(/(?:\r\n|\r|\n)/g, '<br>');
                $http.post('/messages', {
                    cleanDate: cleanDate,
                    from: vm.user.uuid,
                    message: msg,
                    subject: message.subject,
                    to: recipientUuid
                });
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

                        if (locateData.data.results.length > 0) {
                            let locate = locateData.data;
                            let index = Math.floor(Math.random() * locate.results.length);
                            vm.hubProfileDisplayerLocationImage = locate.results[index].urls.regular;
                            vm.hubProfileDisplayerLocationAlt = locate.results[index].alt_description;
                            vm.hubProfileDisplayerImageAttribution = locate.results[index].user.name;
                        }
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
            let index;
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
                        index = i;
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
                    }
                }
                $http.post('/message_responses', {
                        message_uuid: msgUuid,
                        cleanDate: now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ' - ' + hours + minutes + seconds,
                        from: vm.user.uuid,
                        message: hubResponseText.value,
                        subject: 'RE ' + vm.userMessages[index].subject,
                        to: vm.userMessages[index].from.uuid
                    })
                    .then(() => {
                        hubResponseText.value = '';
                    });

            }
        }

        function toggleMessageOpen(uuid) {
            let index;

            function persistClosedMessage(location) {
                $http.patch(`/messages/${vm.userMessages[location].uuid}`, {
                    open: false
                });
            }

            for (let i = 0; i < vm.userMessages.length; i++) {
                if (vm.userMessages[i].uuid === uuid) {
                    index = i;
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
            $http.patch(`/messages/${vm.userMessages[index].uuid}`, {
                open: vm.userMessages[index].open,
                opened: vm.userMessages[index].opened
            });
            for (let i = 0; i < vm.userMessages.length; i++) {
                if (i !== index) {
                    persistClosedMessage(i);
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
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    profile_state: 'public'
                });
            }
            if (state === 'private') {
                vm.profileNavState = 'private';
                vm.navigationPublicState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlidePrivateState' + vm.monthSelect;
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    profile_state: 'private'
                });
            }
            if (state === 'messages') {
                vm.profileNavState = 'messages';
                vm.navigationPublicState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlideMessagesState' + vm.monthSelect;
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    profile_state: 'messages'
                });
            }
            if (state === 'friends') {
                vm.profileNavState = 'friends';
                vm.navigationPublicState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlideFriendsState' + vm.monthSelect;
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    profile_state: 'friends'
                });
            }
            if (state === 'contact') {
                vm.profileNavState = 'contact';
                vm.navigationPublicState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlideContactState' + vm.monthSelect;
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    profile_state: 'contact'
                });
            }
        }

        function hubDisplayBlogData(blogIndex) {
            vm.currentBlogLogo = vm.userBlogs[parseInt(blogIndex)].logo;
            vm.currentBlogName = vm.userBlogs[parseInt(blogIndex)].blog_name;
            vm.currentBlogDescription = vm.userBlogs[parseInt(blogIndex)].description;
            vm.currentBlogContributers = vm.userBlogs[parseInt(blogIndex)].contributors.contributors;
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
                vm.browseFeedsBlockToggleStatus = 'hubReaderBrowseBlockActive' + vm.browseMonth;
                vm.sharedBlockToggleStatus = 'hubReaderDay5BlockActive' + vm.monthSelect;
                vm.savedBlockToggleStatus = 'hubReaderDay6BlockActive' + vm.monthSelect;
                vm.miscBlockToggleStatus = 'hubReaderDay7BlockActive' + vm.monthSelect;
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    sub_management: true
                });
            } else {
                vm.subscriptionToggle = 'off';
                vm.manageBlockToggleStatus = 'hubReaderDay1BlockInactive' + vm.monthSelect;
                vm.externalsBlockToggleStatus = 'hubReaderExternalsDay2BlockInactive' + vm.externalsMonth;
                vm.dailiesBlockToggleStatus = 'hubReaderDay3BlockInactive' + vm.dailiesMonth;
                vm.browseFeedsBlockToggleStatus = 'hubReaderBrowseBlockInactive' + vm.browseMonth;
                vm.sharedBlockToggleStatus = 'hubReaderDay5BlockInactive' + vm.monthSelect;
                vm.savedBlockToggleStatus = 'hubReaderDay6BlockInactive' + vm.monthSelect;
                vm.miscBlockToggleStatus = 'hubReaderDay7BlockInactive' + vm.monthSelect;
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    sub_management: false
                });
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
                } else if (day === 'Tuesday') {
                    vm.day1ToggleState = 'hubReaderDay1TuesdayActive' + vm.tuesdayMonth;
                } else {
                    vm.day1ToggleState = 'hubReaderDay1BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 1) % 7];
                if (day === 'Monday') {
                    vm.day2ToggleState = 'hubReaderDay2MondayActive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day2ToggleState = 'hubReaderDay2TuesdayActive' + vm.tuesdayMonth;
                } else {
                    vm.day2ToggleState = 'hubReaderDay2BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 2) % 7];
                if (day === 'Monday') {
                    vm.day3ToggleState = 'hubReaderDay3MondayActive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day3ToggleState = 'hubReaderDay3TuesdayActive' + vm.tuesdayMonth;
                } else {
                    vm.day3ToggleState = 'hubReaderDay3BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 3) % 7];
                if (day === 'Monday') {
                    vm.day4ToggleState = 'hubReaderDay4MondayActive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day4ToggleState = 'hubReaderDay4TuesdayActive' + vm.tuesdayMonth;
                } else {
                    vm.day4ToggleState = 'hubReaderDay4BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 4) % 7];
                if (day === 'Monday') {
                    vm.day5ToggleState = 'hubReaderDay5MondayActive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day5ToggleState = 'hubReaderDay5TuesdayActive' + vm.tuesdayMonth;
                } else {
                    vm.day5ToggleState = 'hubReaderDay5BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 5) % 7];
                if (day === 'Monday') {
                    vm.day6ToggleState = 'hubReaderDay6MondayActive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day6ToggleState = 'hubReaderDay6TuesdayActive' + vm.tuesdayMonth;
                } else {
                    vm.day6ToggleState = 'hubReaderDay6BlockActive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 6) % 7];
                if (day === 'Monday') {
                    vm.day7ToggleState = 'hubReaderDay7MondayActive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day7ToggleState = 'hubReaderDay7TuesdayActive' + vm.tuesdayMonth;
                } else {
                    vm.day7ToggleState = 'hubReaderDay7BlockActive' + vm.monthSelect;
                }
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    sub_week: true
                });
            } else {
                vm.weekToggle = 'off';
                if (day === 'Monday') {
                    vm.day1ToggleState = 'hubReaderDay1MondayInactive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day1ToggleState = 'hubReaderDay1TuesdayInactive' + vm.tuesdayMonth;
                } else {
                    vm.day1ToggleState = 'hubReaderDay1BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 1) % 7];
                if (day === 'Monday') {
                    vm.day2ToggleState = 'hubReaderDay2MondayInactive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day2ToggleState = 'hubReaderDay2TuesdayInactive' + vm.tuesdayMonth;
                } else {
                    vm.day2ToggleState = 'hubReaderDay2BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 2) % 7];
                if (day === 'Monday') {
                    vm.day3ToggleState = 'hubReaderDay3MondayInactive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day3ToggleState = 'hubReaderDay3TuesdayInactive' + vm.tuesdayMonth;
                } else {
                    vm.day3ToggleState = 'hubReaderDay3BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 3) % 7];
                if (day === 'Monday') {
                    vm.day4ToggleState = 'hubReaderDay4MondayInactive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day4ToggleState = 'hubReaderDay4TuesdayInactive' + vm.tuesdayMonth;
                } else {
                    vm.day4ToggleState = 'hubReaderDay4BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 4) % 7];
                if (day === 'Monday') {
                    vm.day5ToggleState = 'hubReaderDay5MondayInactive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day5ToggleState = 'hubReaderDay5TuesdayInactive' + vm.tuesdayMonth;
                } else {
                    vm.day5ToggleState = 'hubReaderDay5BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 5) % 7];
                if (day === 'Monday') {
                    vm.day6ToggleState = 'hubReaderDay6MondayInactive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day6ToggleState = 'hubReaderDay6TuesdayInactive' + vm.tuesdayMonth;
                } else {
                    vm.day6ToggleState = 'hubReaderDay6BlockInactive' + vm.monthSelect;
                }
                day = days[(now.getDay() + 6) % 7];
                if (day === 'Monday') {
                    vm.day7ToggleState = 'hubReaderDay7MondayInactive' + vm.mondayMonth;
                } else if (day === 'Tuesday') {
                    vm.day7ToggleState = 'hubReaderDay7TuesdayInactive' + vm.tuesdayMonth;
                } else {
                    vm.day7ToggleState = 'hubReaderDay7BlockInactive' + vm.monthSelect;
                }
                $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                    sub_week: false
                });
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
                    select_reactions: false,
                    user_uuid: vm.user.uuid,
                    share_uuid: article.uuid,
                    blogOrPodcast: article.blogOrPodcast
                });

                let subObj = {
                    user_uuid: vm.user.uuid,
                    share_uuid: article.uuid,
                    blogOrPodcast: article.blogOrPodcast,
                    comment: hubShareCommentTextArea.value
                };
                hubShareCommentTextArea.value = '';
                $http.post('/share_comments', subObj)
                    .then(posted => {
                        console.log(posted);
                        vm.sharedContent[parseInt(articleIndex)].share_comments[index].uuid = posted.data[0].uuid;
                    });
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

                $http.post('/share_reactions/update_hovertext', {
                        from: vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].from
                    })
                    .then(updateTextData => {
                        vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].hover_text = updateTextData.data;
                    });
                vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].tally -= 1;
                vm.sharedContent[parseInt(articleIndex)].share_comments[parseInt(commentIndex)].comment_reactions[parseInt(commentReactionIndex)].user_contributed = false;

            }
            $http.get('/share_comment_reactions')
                .then(allShareCommentReactions => {
                    let targ = allShareCommentReactions.data.filter(entry => {
                        return ((entry.user_uuid === vm.user.uuid) && (entry.reaction_uuid === commentReaction.reaction_uuid) && (entry.comment_uuid === comment.uuid));
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
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[index].from.splice(vm.sharedContent[parseInt(articleIndex)].share_reactions[index].from.indexOf(vm.user.uuid), 1);

                    $http.post('/share_reactions/update_hovertext', {
                            from: vm.sharedContent[parseInt(articleIndex)].share_reactions[index].from
                        })
                        .then(updateTextData => {
                            vm.sharedContent[parseInt(articleIndex)].share_reactions[index].hover_text = updateTextData.data;
                        });

                    vm.sharedContent[parseInt(articleIndex)].share_reactions[index].tally -= 1;
                    vm.sharedContent[parseInt(articleIndex)].share_reactions[index].user_contributed = false;
                }
            }
            $http.get('/share_reactions')
                .then(allReactionsData => {
                    let targ = allReactionsData.data.filter(react => {
                        return ((react.user_uuid === vm.user.uuid) && (react.reaction_uuid === reaction.reaction_uuid) && (react.share_uuid === article.uuid));
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
                    vm.userhubState.tabs = 'public';
                    $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                        tabs: 'public'
                    });
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
                    vm.userhubState.tabs = 'subscriptions';
                    $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                        tabs: 'subscriptions'
                    });
                }
            }
            if (state === 'blogs') {
                if (vm.hubTabStatus !== 'hubBlogs' + vm.monthSelect) {
                    vm.hubShareTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubReaderTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubBloggerTabState = 'hubTabActive' + vm.monthSelect;
                    vm.hubProfileTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubTabStatus = 'hubBlogs' + vm.monthSelect;
                    vm.userhubState.tabs = 'blogs';
                    $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                        tabs: 'blogs'
                    });
                }
            }
            if (state === 'profile') {
                if (vm.hubTabStatus !== 'hubProfile' + vm.monthSelect) {
                    vm.hubShareTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubReaderTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubBloggerTabState = 'hubTabInactive' + vm.monthSelect;
                    vm.hubProfileTabState = 'hubTabActive' + vm.monthSelect;
                    vm.hubTabStatus = 'hubProfile' + vm.monthSelect;
                    vm.userhubState.tabs = 'profile';
                    $http.patch(`/userhub_state/${vm.userhubState.uuid}`, {
                        tabs: 'profile'
                    });
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
                    populateFriends();
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
                    let createDate, updateDate;

                    for (let i = 0; i < shareFeed.length; i++) {
                        createDate = new Date(shareFeed[i].pubDate);
                        updateDate = new Date(shareFeed[i].updated_at);
                        shareFeed[i].cleanDate = createDate.getFullYear() + ' ' + months[createDate.getMonth()] + ' ' + createDate.getDate() + ' - ' + createDate.toLocaleTimeString('en-GB');
                        createDate = new Date(shareFeed[i].created_at);
                        shareFeed[i].share_cleanDate = createDate.getFullYear() + ' ' + months[createDate.getMonth()] + ' ' + createDate.getDate() + ' - ' + createDate.toLocaleTimeString('en-GB');
                        if (updateDate.getTime() > createDate.getTime()) {
                            shareFeed[i].share_cleanDate += ' (edited)';
                        }

                        if (shareFeed[i].share_reactions.length > 0) {
                            for (let j = 0; j < shareFeed[i].share_reactions.length; j++) {
                                shareFeed[i].share_reactions[j].hoverClass = 'hubShareReactionsHoverText' + vm.monthSelect;
                            }
                        }
                        if (shareFeed[i].share_comments.length > 0) {
                            for (let k = 0; k < shareFeed[i].share_comments.length; k++) {
                                createDate = new Date(shareFeed[i].share_comments[k].created_at);
                                updateDate = new Date(shareFeed[i].share_comments[k].updated_at);
                                shareFeed[i].share_comments[k].cleanDate = createDate.getFullYear() + ' ' + months[createDate.getMonth()] + ' ' + createDate.getDate() + ' - ' + createDate.toLocaleTimeString('en-GB');
                                if (updateDate.getTime() > createDate.getTime()) {
                                    shareFeed[i].share_comments[k].cleanDate += ' (edited)';
                                }
                                if (shareFeed[i].share_comments[k].comment_reactions.length > 0) {
                                    for (let l = 0; l < shareFeed[i].share_comments[k].comment_reactions.length; l++) {
                                        shareFeed[i].share_comments[k].comment_reactions[l].hoverClass = 'hubShareReactionsHoverText' + vm.monthSelect;
                                    }
                                }
                            }
                        }
                    }
                    vm.sharedContent = shareFeed;
                });
        }

        function setUserBlogs(userId) {
            $http.get(`/user_blogs/byuseruuid/${userId}`)
                .then(userBlogsData => {
                    vm.userBlogs = userBlogsData.data.sort((a, b) => {
                        if (a.blog_name.toLowerCase() < b.blog_name.toLowerCase()) {
                            return -1;
                        } else if (a.blog_name.toLowerCase() > b.blog_name.toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    for (let i = 0; i < vm.userBlogs.length; i++) {
                        vm.userBlogs[i].id = i;
                    }
                    vm.currentBlogLogo = vm.userBlogs[0].logo;
                    vm.currentBlogName = vm.userBlogs[0].blog_name;
                    vm.currentBlogDescription = vm.userBlogs[0].description;
                    vm.currentBlogContributers = vm.userBlogs[0].contributors.contributors;
                    vm.totalPosts = vm.userBlogs[0].total_posts;
                    vm.lastPost = vm.userBlogs[0].last_post;
                    vm.totalPageLoads = vm.userBlogs[0].page_loads;
                });
        }

        function setUserExtendedProfile(userId) {
            $http.get(`/user_expanded_profiles/byuseruuid/${userId}`)
                .then(userExpandedData => {
                    vm.userExtendedProfile = userExpandedData.data;
                    obtainUserLocationImage();
                });
        }

        function populateFriends() {
            vm.friendsList = [];
            vm.filteredFriendsList = vm.friendsList;

            function populate(index) {
                $http.get(`/user_expanded_profiles/byuseruuid/${vm.user.associates.friends[index]}`)
                    .then(friendData => {
                        let friend = friendData.data;
                        vm.friendsList[index] = {};
                        $http.get(`/users/${vm.user.associates.friends[index]}`)
                            .then(friendBasicData => {
                                let friendBasic = friendBasicData.data;
                                vm.friendsList[index].avatar = friendBasic.avatar_path;
                                vm.friendsList[index].extended_profile = friend;
                                vm.friendsList[index].blog_posts = friend.blog_posts;
                                vm.friendsList[index].first_name = friendBasic.first_name;
                                vm.friendsList[index].friends = friend.friends;
                                vm.friendsList[index].last_name = friendBasic.last_name;
                                vm.friendsList[index].name = friendBasic.first_name + ' ' + friendBasic.last_name;
                                vm.friendsList[index].shared_items = friend.shared_items;
                                vm.friendsList[index].uuid = vm.user.associates.friends[index];
                            });
                    });
            }

            if (!vm.user.associates.friends) {
                return;
            }

            for (let i = 0; i < vm.user.associates.friends.length; i++) {
                populate(i)
            }

        }

        function setUserMessages(uuid) {
            $http.get(`/messages/assemble/${uuid}`)
                .then(userMessagesData => {
                    vm.userMessages = userMessagesData.data;
                });
        }

        function setUserHubState(uuid) {
            $http.get(`/userhub_state/byuseruuid/${uuid}`)
                .then(userHubStateData => {
                    vm.userhubState = userHubStateData.data;
                    switch (vm.userhubState.tabs) {
                        case ('shared'):
                            updateHubTab('shared');
                            break;
                        case ('subscriptions'):
                            updateHubTab('reader');
                            break;
                        case ('blogs'):
                            updateHubTab('blogs');
                            break;
                        case ('profile'):
                            updateHubTab('profile');
                            break;
                        default:
                            console.log('ERROR: Tab State Invalid in Userhub State');
                    }
                    if (vm.userhubState.sub_week) {
                        hubWeekToggle();
                    }
                    if (vm.userhubState.sub_management) {
                        toggleSubscriptionManagement();
                    }
                    switch (vm.userhubState.profile_state) {
                        case ('public'):
                            navigateProfileViews('public');
                            break;
                        case ('private'):
                            navigateProfileViews('private');
                            break;
                        case ('messages'):
                            navigateProfileViews('messages');
                            break;
                        case ('friends'):
                            navigateProfileViews('friends');
                            break;
                        case ('contact'):
                            navigateProfileViews('contact');
                            break;
                        default:
                            console.log('ERROR: Profile State Invalid in Public tab of Userhub State');
                    }
                });

        }
        
        function setMonthSelect() {
            $http.get('/skins/user_hub')
            .then(hubSkinResponseData => {
                const hubSkinResponse = hubSkinResponseData.data;
                vm.monthSelect = hubSkinResponse.user_hub;
                vm.mondayMonth = hubSkinResponse.monday_skin;
                
                vm.hubShareTabState = 'hubTabActive' + vm.monthSelect;
                vm.hubReaderTabState = 'hubTabInactive' + vm.monthSelect;
                vm.hubBloggerTabState = 'hubTabInactive' + vm.monthSelect;
                vm.hubProfileTabState = 'hubTabInactive' + vm.monthSelect;
                vm.hubTabStatus = 'hubShare' + vm.monthSelect;
                vm.manageBlockToggleStatus = 'hubReaderDay1BlockInactive' + vm.monthSelect;
                vm.dailiesBlockToggleStatus = 'hubReaderDay3BlockInactive' + vm.monthSelect;
                vm.sharedBlockToggleStatus = 'hubReaderDay5BlockInactive' + vm.monthSelect;
                vm.savedBlockToggleStatus = 'hubReaderDay6BlockInactive' + vm.monthSelect;
                vm.miscBlockToggleStatus = 'hubReaderDay7BlockInactive' + vm.monthSelect;
                vm.shareSaveLinkDisplay = 'hubShareShareSaveModalInactive' + vm.monthSelect;
                vm.backgroundStatus = 'hubContainer' + vm.monthSelect;
                vm.navigationPublicState = 'hubUserProfileNavigationActive' + vm.monthSelect;
                vm.navigationPrivateState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationMessagesState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationFriendsState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationContactState = 'hubUserProfileNavigationInactive' + vm.monthSelect;
                vm.navigationSliderState = 'hubUserProfileNavigationSlidePublicState' + vm.monthSelect;
                vm.profileDisplayModal = 'hubProfileDisplayerInactive' + vm.monthSelect;
                vm.messageModalState = 'hubDisplayMessageModalInactive' + vm.monthSelect;
                vm.hubGuardrailState = 'hubRemoveGuardrailInactive' + vm.monthSelect;
                vm.deleteShareGuardrailState = 'deleteGuardrailInactive' + vm.monthSelect;
                vm.deleteShareCommentGuardrailState = 'deleteCommentGuardrailInactive' + vm.monthSelect;
                vm.editCommentModalState = 'hubEditMessageInactive' + vm.monthSelect;
                
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
                    case ('_FebruaryA'):
                        vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_png_by_piccolapersempre_dbuithu-fullview.png';
                        break;
                    case ('_FebruaryB'):
                        vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/digital_painting__liquid_sleep_by_ukulelemoon_d888syz-pre.jpg';
                        break;
                    case ('_FebruaryC'):
                        vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_cup_by_lashonda1980_dazsks6-pre.png';
                        break;
                    case ('_MarchA'):
                        vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/dd749ir-a2fcf5b4-5422-46d6-8d79-8166d3a47633.jpg';
                        break;
                    case('_MarchB'):
                        vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee-32284_1280.png';
                        break;
                    case('_MarchC'):
                        vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/espresso-4929161_1920.jpg';
                        break;
                    default:
                        alert('UNSUPPORTED MONTH SELECT for LOGO');
                        alert(vm.monthSelect);
                }
            });
        }


        function onInit() {
            console.log("User Hub is lit");
            setUserIPAddress();
            
            setMonthSelect();

            setDaysRelativeToToday();
            setFooterMessage();
            initializeDayCards();
            initializeSubscriptionCards();
            populateEmojis();
            assembleShareFeed($stateParams.id);
            setUserBlogs($stateParams.id);
            setUserExtendedProfile($stateParams.id);
            setUserMessages($stateParams.id);
            setUserHubState($stateParams.id);
        }

    }

}());
