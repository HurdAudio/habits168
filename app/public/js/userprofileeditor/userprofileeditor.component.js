(function () {
    'use strict';

    angular.module('app')
        .component('userprofileeditor', {
            controller: UserProfileEditorController,
            templateUrl: '/js/userprofileeditor/userprofileeditor.template.html'
        });

    UserProfileEditorController.$inject = ['$http', '$state', '$stateParams'];

    function UserProfileEditorController($http, $state, $stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.navigateToHub = navigateToHub;
        vm.toggleBirthdatePublicPrivate = toggleBirthdatePublicPrivate;
        vm.toggleBioPublicPrivate = toggleBioPublicPrivate;
        vm.toggleBioLocationPrivate = toggleBioLocationPrivate;
        vm.toggleDescriptionPublicPrivate = toggleDescriptionPublicPrivate;
        vm.toggleBioOccupationPrivate = toggleBioOccupationPrivate;
        vm.toggleBioEmployerPrivate = toggleBioEmployerPrivate;
        vm.toggleEducationPrivate = toggleEducationPrivate;
        vm.removeSchool = removeSchool;
        vm.schools = [];
        vm.inputSchoolFields = inputSchoolFields;
        vm.shoolInputValid = false;
        vm.addSchoolEntry = addSchoolEntry;
        vm.toggleBioEmailPrivate = toggleBioEmailPrivate;
        vm.togglePhonePrivate = togglePhonePrivate;
        vm.selectAvatarFromList = selectAvatarFromList;
        vm.linkToAvatar = linkToAvatar;
        vm.openChangeAvatarModal = openChangeAvatarModal;
        vm.cancelProfileAvatarModal = cancelProfileAvatarModal;
        vm.submitProfileAvatar = submitProfileAvatar;
        vm.updateFirstName = updateFirstName;
        vm.updateLastName = updateLastName;
        vm.updateProfileBio = updateProfileBio;
        vm.updateBirthdate = updateBirthdate;
        vm.updateProfileDescription = updateProfileDescription;
        vm.citiesList = [];
        vm.filterCitiesList = filterCitiesList;
        vm.changeLocationModal = changeLocationModal;
        vm.closeCitySelect = closeCitySelect;
        vm.selectCity = selectCity;
        vm.updateProfileOccupation = updateProfileOccupation;
        vm.updateProfileEmployer = updateProfileEmployer;
        vm.updateSchoolName = updateSchoolName;
        vm.updateSchoolLocation = updateSchoolLocation;
        vm.updateEmail = updateEmail;
        vm.updatePhone = updatePhone;
        vm.patchFirstName = patchFirstName;
        vm.patchLastName = patchLastName;
        vm.patchProfileDescription = patchProfileDescription;
        vm.patchUserBio = patchUserBio;
        vm.patchOccupation = patchOccupation;
        vm.patchEmployer = patchEmployer;
        vm.patchEducation = patchEducation;
        vm.patchEmail = patchEmail;
        vm.patchPhone = patchPhone;
        
        function patchLastName() {
            $http.patch(`/users/${vm.user.uuid}`, { last_name: vm.user.last_name} )
            .then(patchedUserData => {
                if (vm.user.last_name !== patchUserData.data.last_name) {
                    alert('ERROR: Failed to save user last name.');
                }
            });
        }
        
        function patchFirstName() {
            $http.patch(`/users/${vm.user.uuid}`, { first_name: vm.user.first_name} )
            .then(patchedUserData => {
                if (vm.user.first_name !== patchUserData.data.first_name) {
                    alert('ERROR: Failed to save user first name.');
                }
            });
        }
        
        function updatePhone() {
            vm.user.expanded.phone.phone = document.getElementById('profileEditorPhoneInput').value;
        }
        
        function patchPhone() {
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { phone: vm.user.expanded.phone })
            .then(patchedExpandedData => {
                if ((patchedExpandedData.data.phone.phone !== vm.user.expanded.phone.phone) || (patchedExpandedData.data.phone.public !== vm.user.expanded.phone.public)) {
                    alert('ERROR: user phone not saved');
                }
            });
        }
        
        function updateEmail() {
            vm.user.expanded.email.email = document.getElementById('profileEditorEmailInput').value;
        }
        
        function patchEmail() {
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { email: vm.user.expanded.email })
            .then(patchedExpandedProfileData => {
                if ((patchedExpandedProfileData.data.email.email !== vm.user.expanded.email.email) || (patchedExpandedProfileData.data.email.public !== vm.user.expanded.email.public)) {
                    alert('ERROR: user email not saved');
                }
            });
        }
        
        function updateSchoolLocation(index) {
            vm.user.expanded.education.schools[index].location = document.getElementById('schoolLocationInput' + index).value;
        }
        
        function updateSchoolName(index) {
            vm.user.expanded.education.schools[index].name = document.getElementById('schoolNameInput' + index).value;
        }
        
        function patchEducation() {
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { education: vm.user.expanded.education })
            .then(patchedExpandedProfileData => {
                if ((patchedExpandedProfileData.data.education.schools.length !== vm.user.expanded.education.schools.length) || (patchedExpandedProfileData.data.education.public !== vm.user.expanded.education.public)) {
                    alert('ERROR: user education not saved');
                }
            });
        }
        
        function updateProfileEmployer() {
            vm.user.expanded.employer.employer = document.getElementById('profileEditorEmployerInput').value;
        }
        
        function patchEmployer() {
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { employer: vm.user.expanded.employer })
            .then(patchedExpandedProfileData => {
                if ((patchedExpandedProfileData.data.employer.employer !== vm.user.expanded.employer.employer) || (patchedExpandedProfileData.data.employer.public !== vm.user.expanded.employer.public)) {
                    alert('ERROR: user employer not saved');
                }
            });
        }
        
        function updateProfileOccupation() {
            vm.user.expanded.occupation.occupation = document.getElementById('profileEditorOccupationInput').value;
        }
        
        function patchOccupation() {
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { occupation: vm.user.expanded.occupation })
            .then(patchedExpandedProfileData => {
                if ((patchedExpandedProfileData.data.occupation.occupation !== vm.user.expanded.occupation.occupation) || (patchedExpandedProfileData.data.occupation.public !== vm.user.expanded.occupation.public)) {
                    alert('ERROR: user occupation not saved');
                }
            });
        }
        
        function selectCity(city) {
            vm.user.expanded.location.name = city.name;
            vm.user.expanded.location.country = city.country;
            vm.user.expanded.location.featureCode = city.featureCode;
            vm.user.expanded.location.adminCode = city.adminCode;
            vm.user.expanded.location.population = city.population;
            vm.user.expanded.location.lat = city.lat;
            vm.user.expanded.location.lon = city.lon;
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { location: vm.user.expanded.location })
            .then(patchedExtendedUserProfileData => {
                if ((patchedExtendedUserProfileData.data.location.name === vm.user.expanded.location.name) && (patchedExtendedUserProfileData.data.location.country === vm.user.expanded.location.country) && (patchedExtendedUserProfileData.data.location.featureCode === vm.user.expanded.location.featureCode) && (patchedExtendedUserProfileData.data.location.adminCode === vm.user.expanded.location.adminCode) && (patchedExtendedUserProfileData.data.location.population === vm.user.expanded.location.population) && (patchedExtendedUserProfileData.data.location.lat === vm.user.expanded.location.lat) && (patchedExtendedUserProfileData.data.location.lon === vm.user.expanded.location.lon)) {
                    closeCitySelect();
                } else {
                    alert('ERROR: user location not saved');
                }
            });
            
        }
        
        function closeCitySelect() {
            vm.cityModalStatus = 'profileCityModalInactive' + vm.profileMonth;
            vm.profileEditorContentStatus = 'profileEditorContent' + vm.profileMonth;
            document.getElementById('profileEditorCitySearchInput').value = '';
            vm.citiesList = [];
        }
        
        function changeLocationModal() {
            vm.cityModalStatus = 'profileCityModal' + vm.profileMonth;
            vm.profileEditorContentStatus = 'profileEditorContentBlur' + vm.profileMonth;
        }
        
        function filterCitiesList() {
            const filter = document.getElementById('profileEditorCitySearchInput').value;
            
            if (filter === '') {
                vm.citiesList = [];
            } else {
                $http.get(`/citylist/${filter}`)
                .then(listData => {
                    vm.citiesList = listData.data.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                        } else if (a.name.toLowerCase() > b.name.toLowerCase()){
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                });
            }
        }
        
        function updateFirstName() {
            if (document.getElementById('profileEditNameInput').value === '') {
                vm.user.first_name = 'anonymous';
            } else {
                vm.user.first_name = (document.getElementById('profileEditNameInput').value);
            }
            
        }
        
        function updateLastName() {
            vm.user.last_name = (document.getElementById('profileEditLastNameInput').value);
        }
        
        function updateProfileBio() {
            vm.user.expanded.bio.bio = document.getElementById('profileEditorBioInput').value;
        }
        
        function patchUserBio() {
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { bio: vm.user.expanded.bio })
            .then(patchedExpandedUserData => {
                if ((patchedExpandedUserData.data.bio.bio !== vm.user.expanded.bio.bio) || (patchedExpandedUserData.data.bio.public !== vm.user.expanded.bio.public)) {
                    alert('ERROR: failed to save user bio');
                }
            });
        }
        
        function updateProfileDescription() {
            vm.user.expanded.description.description = document.getElementById('profileEditorDescriptionInput').value;
        }
        
        function patchProfileDescription() {
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { description: vm.user.expanded.description })
            .then(patchedExpandedProfileData => {
                if ((patchedExpandedProfileData.data.description.description !== vm.user.expanded.description.description) || (patchedExpandedProfileData.data.description.public !== vm.user.expanded.description.public)) {
                    alert('ERROR: User description not saved');
                }
            });
        }
        
        function updateBirthdate() {
            const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
            let bDay = new Date(document.getElementById('profileEditorBirthdateInput').value);
            const offset = bDay.getTimezoneOffset();
            bDay = new Date(bDay.getTime() + (offset * 60 * 1000));
            
            vm.user.expanded.birthdate.birthdate = bDay;
            vm.user.expanded.birthdate.cleanDate = vm.user.expanded.birthdate.birthdate.getDate().toString() + ' ' + months[vm.user.expanded.birthdate.birthdate.getMonth()];
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { birthdate: vm.user.expanded.birthdate })
            .then(patchedExpandedUserData => {
                if ((patchedExpandedUserData.data.birthdate.cleanDate !== vm.user.expanded.birthdate.cleanDate) || (patchedExpandedUserData.data.birthdate.public !== vm.user.expanded.birthdate.public)) {
                    alert('ERROR: failed to save user birthdate');
                }
            });
        }
        
        function submitProfileAvatar() {
            vm.user.avatar_path = vm.avatar;
            $http.patch(`/users/${vm.user.uuid}`, { avatar_path: vm.avatar })
            .then(patchedUserData => {
                if (vm.user.avatar_path === patchedUserData.data.avatar_path) {
                   cancelProfileAvatarModal(); 
                } else {
                    alert('ERROR: avatar change not saved');
                }
            });
            
        }
        
        function cancelProfileAvatarModal() {
            vm.avatarModalStatus = 'profileEditorAvatarModalInactive' + vm.profileMonth;
            vm.profileEditorContentStatus = 'profileEditorContent' + vm.profileMonth;
            document.getElementById('profileEditorAvatarPathInput').value = '';
        }
        
        function openChangeAvatarModal() {
            vm.avatarModalStatus = 'profileEditorAvatarModal' + vm.profileMonth;
            vm.profileEditorContentStatus = 'profileEditorContentBlur' + vm.profileMonth;
        }
        
        function linkToAvatar() {
            if (document.getElementById('profileEditorAvatarPathInput').value !== '') {
                vm.avatar = document.getElementById('profileEditorAvatarPathInput').value;
            }
        }
        
        function selectAvatarFromList(avatar) {
            vm.avatar = avatar.link;
        }

        function addSchoolEntry() {
            const index = vm.user.expanded.education.schools.length;
            vm.user.expanded.education.schools[index] = {
                id: index,
                name: document.getElementById('profileEditorSchoolNameInput').value,
                location: document.getElementById('profileEditorSchoolLocationInput').value
            };
            document.getElementById('profileEditorSchoolNameInput').value = '';
            document.getElementById('profileEditorSchoolLocationInput').value = '';
            vm.shoolInputValid = false;
            patchEducation();
        }

        function inputSchoolFields() {
            if ((document.getElementById('profileEditorSchoolNameInput').value !== '') && (document.getElementById('profileEditorSchoolLocationInput').value !== '')) {
                vm.shoolInputValid = true;
            } else {
                vm.shoolInputValid = false;
            }
        }

        function removeSchool(index) {
            vm.user.expanded.education.schools.splice(index, 1);
            if (vm.user.expanded.education.schools.length > 0) {
                for (let i = 0; i < vm.user.expanded.education.schools.length; i++) {
                    vm.user.expanded.education.schools[i].id = i;
                }
            }
            patchEducation();
        }

        function toggleBirthdatePublicPrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('birthdate');
            } else {
                vm.user.expanded.birthdate.public = !vm.user.expanded.birthdate.public;
            }
            $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { birthdate: vm.user.expanded.birthdate })
            .then(patchedExpandedUserData => {
                if ((patchedExpandedUserData.data.birthdate.cleanDate !== vm.user.expanded.birthdate.cleanDate) || (patchedExpandedUserData.data.birthdate.public !== vm.user.expanded.birthdate.public)) {
                    alert('ERROR: failed to save user birthdate');
                }
            });

        }

        function toggleBioPublicPrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('bio');
            } else {
                vm.user.expanded.bio.public = !vm.user.expanded.bio.public;
                patchUserBio();
            }
        }

        function toggleBioLocationPrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('location');
            } else {
                vm.user.expanded.location.public = !vm.user.expanded.location.public;
                $http.patch(`/user_expanded_profiles/${vm.user.expanded.uuid}`, { location: vm.user.expanded.location })
                .then(patchedExtendedUserProfileData => {
                    if ((patchedExtendedUserProfileData.data.location.name === vm.user.expanded.location.name) && (patchedExtendedUserProfileData.data.location.country === vm.user.expanded.location.country) && (patchedExtendedUserProfileData.data.location.featureCode === vm.user.expanded.location.featureCode) && (patchedExtendedUserProfileData.data.location.adminCode === vm.user.expanded.location.adminCode) && (patchedExtendedUserProfileData.data.location.population === vm.user.expanded.location.population) && (patchedExtendedUserProfileData.data.location.lat === vm.user.expanded.location.lat) && (patchedExtendedUserProfileData.data.location.lon === vm.user.expanded.location.lon)) {
                        closeCitySelect();
                    } else {
                        alert('ERROR: user location not saved');
                    }
                });
            }
        }

        function toggleDescriptionPublicPrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('description');
            } else {
                vm.user.expanded.description.public = !vm.user.expanded.description.public;
            }
            patchProfileDescription();
        }

        function toggleBioOccupationPrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('occupation');
            } else {
                vm.user.expanded.occupation.public = !vm.user.expanded.occupation.public;
                patchOccupation();
            }
        }

        function toggleBioEmployerPrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('employer');
            } else {
                vm.user.expanded.employer.public = !vm.user.expanded.employer.public;
                patchEmployer();
            }
        }

        function toggleEducationPrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('education');
            } else {
                vm.user.expanded.education.public = !vm.user.expanded.education.public;
                patchEducation();
            }
        }

        function toggleBioEmailPrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('email');
            } else {
                vm.user.expanded.email.public = !vm.user.expanded.email.public;
                patchEmail();
            }
        }

        function togglePhonePrivate() {
            if (vm.user.expanded === undefined) {
                extendedProfileData('phone');
            } else {
                vm.user.expanded.phone.public = !vm.user.expanded.phone.public;
                patchPhone();
            }
        }

        function navigateToHub() {
            $state.go('userhub', {
                id: vm.user.uuid
            });
        }

        function navigateToLanding() {
            $state.go('landing');
        }

        function extendedProfileData(call) {
            $http.get(`/user_expanded_profiles/byuseruuid/${vm.user.uuid}`)
                .then(userExpandedData => {
                    vm.user.expanded = userExpandedData.data;
                    document.getElementById('profileEditorBirthdateInput').value = new Date(vm.user.expanded.birthdate.birthdate).toISOString().substr(0, 10);
                    document.getElementById('profileEditorBioInput').value = vm.user.expanded.bio.bio;
                    document.getElementById('profileEditorDescriptionInput').value = vm.user.expanded.description.description;
                    console.log(vm.user);
                    document.getElementById('profileEditorOccupationInput').value = vm.user.expanded.occupation.occupation;
                    document.getElementById('profileEditorEmployerInput').value = vm.user.expanded.employer.employer;
                    for (let i = 0; i < vm.user.expanded.education.schools.length; i++) {
                        vm.user.expanded.education.schools[i].id = i;
                    }
                    vm.schools = vm.user.expanded.education.schools;
                    document.getElementById('profileEditorEmailInput').value = vm.user.expanded.email.email;
                    document.getElementById('profileEditorPhoneInput').value = vm.user.expanded.phone.phone;
                    vm.avatar = vm.user.avatar_path;
                    if (call) {
                        switch (call) {
                            case ('birthdate'):
                                toggleBirthdatePublicPrivate();
                                break;
                            case ('bio'):
                                toggleBioPublicPrivate();
                                break;
                            case ('location'):
                                toggleBioLocationPrivate();
                                break;
                            case ('description'):
                                toggleDescriptionPublicPrivate();
                                break;
                            case ('occupation'):
                                toggleBioOccupationPrivate();
                                break;
                            case ('employer'):
                                toggleBioEmployerPrivate();
                                break;
                            case ('education'):
                                toggleEducationPrivate();
                                break;
                            case ('email'):
                                toggleBioEmailPrivate();
                                break;
                            case ('phone'):
                                togglePhonePrivate();
                                break;
                            default:
                                console.log('no call');
                        }
                    }
                });
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

        function resetSecuritySettings() {
            let oldKey = vm.user.security.key;

            let storage = window.localStorage;
            let now = new Date();
            console.log(now);
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

        function setUserIPAddress() {
            $http.get('/ipaddress')
                .then(responseData => {
                    vm.ip = responseData.data.ip;
                    checkLoginStatus($stateParams.userUuid);
                });
        }
        
        function setAvatarList() {
            $http.get('/avatars')
            .then(avatarsData => {
                vm.avatarList = avatarsData.data;
            });
        }
        
        function setSkin() {
            $http.get('/skins/user_profile_editor')
            .then(skinData => {
                vm.profileMonth = skinData.data.user_profile_editor;
//                vm.profileMonth = '_AprilA';
                vm.avatarModalStatus = 'profileEditorAvatarModalInactive' + vm.profileMonth;
                vm.profileEditorContentStatus = 'profileEditorContent' + vm.profileMonth;
                vm.cityModalStatus = 'profileCityModalInactive' + vm.profileMonth;
                
                switch (vm.profileMonth) {
                case ('_JanuaryA'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
                    break;
                case ('_JanuaryB'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png'
                    break;
                case ('_JanuaryC'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
                    break;
                case ('_FebruaryA'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_png_by_piccolapersempre_dbuithu-fullview.png';
                    break;
                case ('_FebruaryB'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/digital_painting__liquid_sleep_by_ukulelemoon_d888syz-pre.jpg';
                    break;
                case ('_FebruaryC'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_cup_by_lashonda1980_dazsks6-pre.png';
                    break;
                case ('_MarchA'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/dd749ir-a2fcf5b4-5422-46d6-8d79-8166d3a47633.jpg';
                    break;
                case('_MarchB'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee-32284_1280.png';
                    break;
                case('_MarchC'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/espresso-4929161_1920.jpg';
                    break;
                case('_AprilA'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/ddd784j-25abee3c-e332-4d13-8e9c-df956fe4af96.png';
                    break;
                case('_AprilB'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/coffee_for_mister_mondrian_by_floriandra_d15xzay-fullview.jpg';
                    break;
                case('_AprilC'):
                    vm.profileLogo = 'https://habits168-hurdaudio.s3.amazonaws.com/img/d7z2x8u-2a1dd6ee-67da-4329-9441-747411452f31.png';
                    break;
                default:
                    alert('UNSUPPORTED MONTH SELECT for LOGO');
            }
            });
        }

        function onInit() {
            console.log("User Profile Editor is lit");
            setSkin();
            setUserIPAddress();
            setAvatarList();
            setTimeout(() => {
                extendedProfileData();
            }, 600);



        }

    }

}());
