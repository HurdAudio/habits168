(function() {
  'use strict';

  angular.module('app')
    .component('externals', {
      controller: ExternalsController,
      templateUrl: '/js/externals/externals.template.html'
    });

    ExternalsController.$inject = ['$http', '$state', '$stateParams'];

    function ExternalsController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.externalsMonth = "_JanuaryA";
      vm.externalsContainerState = "externalsContainerActive" + vm.externalsMonth;
      vm.navigateToHub = navigateToHub;
      vm.userExternals = {
        active: false,
        allRead: false,
        podcast: false,
        sort: 'up',
        subscriptions: [
          {
            uuid: 'c2f53e34-5499-4015-80d5-b4fcea47c78b',
            author: null,
            description: 'War Is a Racket',
            link: null,
            image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/EDD_xVYXsAEtYxP.jpg',
            items: null,
            rss: null,
            title: 'Jacobin Magazine - Summer 2019',
            userRead: false
          },
          {
            uuid: '2b7da266-f978-445f-8c5b-07da611f2464',
            author: null,
            description: 'Fair But Not Square',
            link: null,
            image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/v28_i37_Fair_But_Not_Square.jpg',
            items: null,
            rss: null,
            title: 'Albuquerque Alibi - Thursday, September 12, 2019',
            userRead: true
          },
          {
            uuid: '174f6d0e-b7cd-4979-8177-61032be3fefe',
            author: null,
            description: 'All the News that\'s fit to print.',
            link: null,
            image: 'https://habits168-hurdaudio.s3.amazonaws.com/externals/scanNYT2019-09-15.jpg',
            items: null,
            rss: null,
            title: 'New York Times - Sunday, September 15, 2019',
            userRead: true
          }
        ],
        tab: 'mondayTabInactive' + vm.mondayMonth,
        title: 'Externals'
      };
      vm.toggleReadStatus = toggleReadStatus;
      vm.deleteGuardrail = deleteGuardrail;
      vm.externalsGuardrailState = 'externalsDeleteGuardrailInactive' + vm.externalsMonth;
      vm.cancelGuardrail = cancelGuardrail;
      vm.confirmGuardrail = confirmGuardrail;
      vm.externalAddErrorMessage = '';
      vm.addCandidateImage = 'https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png';
      vm.addCandidateTitle = '';
      vm.addCandidateDescription = '';
      vm.updateTitle = updateTitle;
      vm.updateDescription = updateDescription;
      vm.updateImage = updateImage;
      vm.externalsAddCancel = externalsAddCancel;
      vm.externalsAddDialogState = 'externalsAddNewExternalsDialogInactive' + vm.externalsMonth;
      vm.activateAddDialog = activateAddDialog;
      vm.externalsAddSubmit = externalsAddSubmit;

      function externalsAddSubmit() {
        const title = document.getElementById('inputTitle').value;
        const description = document.getElementById('inputDescription').value;
        let link = document.getElementById('inputImage').value;

        if ((title.trim() === '') && (description.trim() === '') && (link.trim() === '')) {
          vm.externalAddErrorMessage = "Please enter external reading data.";
          return;
        }
        if (title.trim() === '') {
          vm.externalAddErrorMessage = "Please enter a title";
          return;
        }
        if (link.trim() === '') {
          link = 'https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png';
        }
        vm.userExternals.subscriptions.push({
          uuid: ((Math.random() * 1000000) + 1),
          author: null,
          description: description,
          link: null,
          image: link,
          items: null,
          rss: null,
          title: title,
          userRead: false
        });
        externalsAddCancel();

      }

      function activateAddDialog() {
        vm.externalsAddDialogState = 'externalsAddNewExternalsDialogActive' + vm.externalsMonth;
        vm.externalsContainerState = "externalsContainerInactive" + vm.externalsMonth;
      }

      function externalsAddCancel() {
        vm.addCandidateImage = 'https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png';
        vm.addCandidateTitle = '';
        vm.addCandidateDescription = '';
        document.getElementById('inputImage').value = '';
        document.getElementById('inputTitle').value = '';
        document.getElementById('inputDescription').value = '';
        vm.externalAddErrorMessage = '';
        vm.externalsAddDialogState = 'externalsAddNewExternalsDialogInactive' + vm.externalsMonth;
        vm.externalsContainerState = "externalsContainerActive" + vm.externalsMonth;
      }

      function updateImage() {
        let link = document.getElementById('inputImage').value;

        if (link === '') {
          vm.addCandidateImage = 'https://habits168-hurdaudio.s3.amazonaws.com/externals/magazine-33602_1280.png';
        } else {
          vm.addCandidateImage = link;
        }
      }

      function updateTitle() {
        vm.addCandidateTitle = document.getElementById('inputTitle').value;
      }

      function updateDescription() {
        vm.addCandidateDescription = document.getElementById('inputDescription').value;
      }

      function confirmGuardrail() {
        cancelGuardrail();
        for (let i = 0; i < vm.userExternals.subscriptions.length; i++) {
          if (vm.userExternals.subscriptions[i].uuid === vm.externalsDeleteCandidate.uuid) {
            vm.userExternals.subscriptions.splice(i, 1);
            return;
          }
        }
      }

      function cancelGuardrail() {
        vm.externalsGuardrailState = 'externalsDeleteGuardrailInactive' + vm.externalsMonth;
        vm.externalsContainerState = "externalsContainerActive" + vm.externalsMonth;
      }

      function deleteGuardrail(issue) {
        console.log(issue);
        vm.externalsDeleteCandidate = issue;
        vm.externalsGuardrailState = 'externalsDeleteGuardrailActive' + vm.externalsMonth;
        vm.externalsContainerState = "externalsContainerInactive" + vm.externalsMonth;
      }

      function toggleReadStatus(uuid) {
        for (let i = 0; i < vm.userExternals.subscriptions.length; i++) {
          if (vm.userExternals.subscriptions[i].uuid === uuid) {
            vm.userExternals.subscriptions[i].userRead = !vm.userExternals.subscriptions[i].userRead;
            return;
          }
        }
      }

      function navigateToHub() {
        $state.go('userhub', {id: $stateParams.userUuid});
      }

      function onInit() {
        console.log("Externals is lit");

        switch (vm.externalsMonth) {
          case('_JanuaryA'):
            vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
            break;
          case('_JanuaryB'):
            vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png'
            break;
          case('_JanuaryC'):
          vm.externalsLogoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
            break;
          default:
            alert('UNSUPPORTED MONTH SELECT for LOGO');
        }

      }

    }

}());
