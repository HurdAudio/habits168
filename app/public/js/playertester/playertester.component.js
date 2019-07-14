(function() {
  'use strict';

  angular.module('app')
    .component('playertester', {
      controller: PlayerTesterController,
      templateUrl: '/js/playertester/playertester.template.html'
    });

    PlayerTesterController.$inject = ['$http', '$state', '$stateParams'];

    function PlayerTesterController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.playerMonth = '_JanuaryA';
      vm.playerFeeds = [
        {
          url: "https://feeds.buzzsprout.com/361115.rss",
          title: "Esoteric Modulation",
          link: "https://www.esotericmodulation.com/",
          author: "Ed Ball",
          description: "From modular synthesis, standalone synthesizers and Eurorack, to unusual electronic instruments, Buchla, Ciat-Lonbarde and the arts. Esoteric Modulation is a fortnightly podcast that is about all the latest exciting gear and news of electronic music and the arts. We cover a wide array of interesting equipment, synths, modular and the slightly unusual esoteric side of electronic instruments. We have regular guests covering news, instruments, and art projects that merge sound and visual arts together in interesting ways! We answer listener questions, feature our favourite acts on Bandcamp, and look at the latest up-and-coming events not to be missed! So keep your finger on the pulse, and don't miss a show by subscribing to our Podcast on your favourite service or hit our website for more information!",
          image: "https://storage.buzzsprout.com/variants/bwyxBwYFVXE1xhHbedzjQuqe/8d66eb17bb7d02ca4856ab443a78f2148cafbb129f58a3c81282007c6fe24ff2?.jpg"
        }
      ];
      vm.playerFeedsIndex = 0;
      vm.aboutThisPodcastImage = vm.playerFeeds[vm.playerFeedsIndex].image;
      vm.aboutPodcastAuthor = ' - ' + vm.playerFeeds[vm.playerFeedsIndex].author;
      vm.aboutPodcastDescription = vm.playerFeeds[vm.playerFeedsIndex].description;
      vm.playerMask = 'playerContainer' + vm.playerMonth;
      vm.playPause = 'playerPlay' + vm.playerMonth;
      vm.togglePlayPause = togglePlayPause;
      vm.userSliderPosition = userSliderPosition;
      vm.aboutContainer = 'aboutContainerActive' + vm.playerMonth;
      vm.episodeContainer = 'episodeContainerInactive' + vm.playerMonth;
      vm.aboutTabStatus = 'tabActive' + vm.playerMonth;
      vm.episodeTabStatus = 'tabInactive' + vm.playerMonth;
      vm.isCurrentEpisodeIndex = isCurrentEpisodeIndex;
      vm.userSwitchCurrentEpisode = userSwitchCurrentEpisode;
      vm.tabClick = tabClick;

      function tabClick(tab) {
        switch(tab) {
          case('about'):
            if (vm.aboutTabStatus !== ('tabActive' + vm.playerMonth)) {
              vm.aboutTabStatus = 'tabActive' + vm.playerMonth;
              vm.episodeTabStatus = 'tabInactive' + vm.playerMonth;
              vm.aboutContainer = 'aboutContainerActive' + vm.playerMonth;
              vm.episodeContainer = 'episodeContainerInactive' + vm.playerMonth;
            }
            break;
          case('episodes'):
            if (vm.episodeTabStatus !== ('tabAcitve' + vm.playerMonth)) {
              vm.episodeTabStatus = 'tabActive' + vm.playerMonth;
              vm.aboutTabStatus = 'tabInactive' + vm.playerMonth;
              vm.aboutContainer = 'aboutContainerInactive' + vm.playerMonth;
              vm.episodeContainer = 'episodeContainerActive' + vm.playerMonth;
            }
            break;
          default:
            console.log('unsupported tab');
            alert('unsupported tab');
        }
      }

      function userSwitchCurrentEpisode(index) {
        let playerProgressSlider = document.getElementById('playerProgressSlider');

        if (index !== vm.currentEpisodeIndex) {
          vm.currentEpisodeIndex = index;
          vm.feedAudio = vm.episodesList[index].enclosure.link;
          vm.feedAudioType = vm.episodesList[index].enclosure.type;
          vm.podcastEpisodeTitle = vm.episodesList[index].title;
          vm.podcastEpisodeAuthorship = vm.episodesList[index].author;
          vm.playerTotalPlaytime = secondsConversion(vm.episodesList[index].enclosure.duration);
          playerProgressSlider.min = '0';
          playerProgressSlider.step = '1';
          playerProgressSlider.max = Math.round(vm.episodesList[index].enclosure.duration);
          playerProgressSlider.value = 0;
        }
      }

      function isCurrentEpisodeIndex(index) {
        if (index === vm.currentEpisodeIndex) {
          return('episodeItemsCurrent' + vm.playerMonth);
        } else {
          return('episodeItems' + vm.playerMonth);
        }
      }


      function userSliderPosition() {
        let playerProgressSlider = document.getElementById('playerProgressSlider');
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');
        let playerPlayPauseButton = document.getElementById('playerPlayPauseButton');

        playerAudioPlayer.currentTime = playerProgressSlider.value;
        if (playerPlayPauseButton.className === 'playerPlay' +    vm.playerMonth) {
          updateNumericalProgressDisplay();
        }
      }

      function secondsConversion(totalSeconds) {
        let calculateTime = totalSeconds;
        let displayTime = '';
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        if (calculateTime > 3599) {
          while(calculateTime > 3599) {
            ++hours;
            calculateTime -= 3600;
          }
          displayTime += hours.toString() + ':';
        }
        if (calculateTime > 59) {
          while(calculateTime > 59) {
            ++minutes;
            calculateTime -= 60;
          }
          if ((hours !== 0) && (minutes < 10)) {
            displayTime += '0';
          }
          displayTime += minutes.toString() + ':';
        } else {
          if (hours === 0) {
            displayTime += '0:';
          } else {
            displayTime += '00:';
          }
        }
        if (calculateTime < 10) {
          displayTime += '0';
        }
        displayTime += calculateTime.toString();

        return(displayTime);
      }

      function updateNumericalProgressDisplay() {
        let playerProgressSlider = document.getElementById('playerProgressSlider');
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');
        let playerProgressNumericalDisplay = document.getElementById('playerProgressNumericalDisplay');
        vm.playerCurrentPosition = secondsConversion(Math.round(playerAudioPlayer.currentTime));
        playerProgressNumericalDisplay.innerHTML = vm.playerCurrentPosition + ' / ' + vm.playerTotalPlaytime;
        playerProgressSlider.value = Math.round(playerAudioPlayer.currentTime);
        vm.episodesList[vm.currentEpisodeIndex].userCurrentTime = secondsConversion(Math.round(playerAudioPlayer.currentTime));
        setTimeout(() => {
          if (vm.playPause === 'playerPause' + vm.playerMonth) {
            updateNumericalProgressDisplay();
          }
        }, 1000);
      }

      function togglePlayPause() {
        let playerPlayPauseButton = document.getElementById('playerPlayPauseButton');
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');

        if (vm.playPause === ('playerPlay' + vm.playerMonth)) {
          vm.playPause = 'playerPause' + vm.playerMonth;
          playerPlayPauseButton.innerHTML = '&#10074;&#10074;';
          playerAudioPlayer.play();
          updateNumericalProgressDisplay();
        } else {
          vm.playPause = 'playerPlay' + vm.playerMonth;
          playerPlayPauseButton.innerHTML = '&#9654;';
          playerAudioPlayer.pause();
        }
      }

      function feedDatas() {
        let playerProgressSlider = document.getElementById('playerProgressSlider');
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');
        let rssLink = vm.playerFeeds[vm.playerFeedsIndex].url;
        rssLink = rssLink.replace(':', '%3A');
        while(rssLink.indexOf('/') !== -1) {
          rssLink = rssLink.replace('/', '%2F');
        }
        console.log(rssLink);
        $http.get(`/rss_reader/${rssLink}`)
        .then(feedsPlaylistData => {
          let feedsPlaylist = feedsPlaylistData.data;
          console.log(feedsPlaylist);
          vm.feedAudio = feedsPlaylist.items[0].enclosure.link;
          vm.feedAudioType = feedsPlaylist.items[0].enclosure.type;
          vm.podcastEpisodeTitle = feedsPlaylist.items[0].title;
          vm.podcastEpisodeAuthorship = feedsPlaylist.items[0].author;
          vm.playerTotalPlaytime = secondsConversion(feedsPlaylist.items[0].enclosure.duration);
          playerProgressSlider.min = '0';
          playerProgressSlider.step = '1';
          playerProgressSlider.max = Math.round(feedsPlaylist.items[0].enclosure.duration);
          vm.episodesList = feedsPlaylist.items;
          for (let i = 0; i < feedsPlaylist.items.length; i++) {
            vm.episodesList[i].index = i;
            vm.episodesList[i].durationInHumanReadableTime = secondsConversion(feedsPlaylist.items[i].enclosure.duration);
            vm.episodesList[i].userCurrentTime = secondsConversion(0);
          }
          vm.currentEpisodeIndex = 0;
        });
      }


      function onInit() {
        console.log("Player Test is lit");
        let playerProgressSlider = document.getElementById('playerProgressSlider');
        vm.feedIcon = vm.playerFeeds[vm.playerFeedsIndex].image;
        vm.podcastTitle = vm.playerFeeds[vm.playerFeedsIndex].title;
        vm.playerCurrentPosition = secondsConversion(0);

        feedDatas();

      }

    }

}());
