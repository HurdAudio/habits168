(function() {
  'use strict';

  angular.module('app')
    .component('playertester', {
      controller: PlayerTesterController,
      templateUrl: '/js/playertester/playertester.template.html'
    });

    PlayerTesterController.$inject = ['$http', '$state', '$stateParams'];

    function PlayerTesterController($http, $state, $stateParams) {
      const vm = this;

      vm.$onInit = onInit;
      vm.playerFeeds = [
        {
          url: "https://feeds.buzzsprout.com/361115.rss",
          title: "Esoteric Modulation",
          link: "https://www.esotericmodulation.com/",
          author: "Ed Ball",
          description: "From modular synthesis, standalone synthesizers and Eurorack, to unusual electronic instruments, Buchla, Ciat-Lonbarde and the arts. Esoteric Modulation is a fortnightly podcast that is about all the latest exciting gear and news of electronic music and the arts. We cover a wide array of interesting equipment, synths, modular and the slightly unusual esoteric side of electronic instruments. We have regular guests covering news, instruments, and art projects that merge sound and visual arts together in interesting ways! We answer listener questions, feature our favourite acts on Bandcamp, and look at the latest up-and-coming events not to be missed! So keep your finger on the pulse, and don't miss a show by subscribing to our Podcast on your favourite service or hit our website for more information!",
          image: "https://habits168-hurdaudio.s3.amazonaws.com/player/esotericModulation.jpeg"
        }
      ];
      vm.playerFeedsIndex = 0;
      vm.seriesLink = vm.playerFeeds[vm.playerFeedsIndex].link
      vm.aboutThisPodcastImage = vm.playerFeeds[vm.playerFeedsIndex].image;
      vm.aboutPodcastAuthor = ' - ' + vm.playerFeeds[vm.playerFeedsIndex].author;
      vm.aboutPodcastDescription = vm.playerFeeds[vm.playerFeedsIndex].description;
      
      vm.togglePlayPause = togglePlayPause;
      vm.userSliderPosition = userSliderPosition;
      
      vm.isCurrentEpisodeIndex = isCurrentEpisodeIndex;
      vm.userSwitchCurrentEpisode = userSwitchCurrentEpisode;
      vm.tabClick = tabClick;
      
      vm.rewindToStart = rewindToStart;
      vm.rewind15Seconds = rewind15Seconds;
      vm.fastForward15seconds = fastForward15seconds;
      vm.skipToEnd = skipToEnd;
      vm.togglePlaybackRate = togglePlaybackRate;
      vm.updateRate = 1000;
      vm.playerShareOrSaveStatus = 'Share Episode:';
      
      vm.shareSaveDialog = shareSaveDialog;
      vm.viewCancelShareSaveLink = viewCancelShareSaveLink;
        
    function fastForward15seconds() {
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');

        if (playerAudioPlayer.currentTime < (vm.episodesList[vm.currentEpisodeIndex].enclosure.duration - 15)) {
          playerAudioPlayer.currentTime += 15;
        } else {
          playerAudioPlayer.currentTime = vm.episodesList[vm.currentEpisodeIndex].enclosure.duration;
        }
        updateNumericalProgressDisplay();
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
          vm.episodeLink = feedsPlaylist.items[0].link
          vm.episodeContent = feedsPlaylist.items[0].content;
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
        
    function getSkins() {
          $http.get('/skins/player')
                .then(playerResultData => {
                    vm.playerMonth = playerResultData.data.player;
//                    vm.playerMonth = '_MayC';
                    vm.playerMask = 'playerContainer' + vm.playerMonth;
                    vm.playPause = 'playerPlay' + vm.playerMonth;
                    vm.aboutContainer = 'aboutContainerActive' + vm.playerMonth;
                    vm.episodeContainer = 'episodeContainerInactive' + vm.playerMonth;
                    vm.detailsContainer = 'detailsContainerInactive' + vm.playerMonth;
                    vm.aboutTabStatus = 'playerTabActive' + vm.playerMonth;
                    vm.episodeTabStatus = 'playerTabInactive' + vm.playerMonth;
                    vm.episodeDetailsTabStatus = 'playerTabInactive' + vm.playerMonth;
                    vm.playbackRateStatus = "playerAtSpeed1" + vm.playerMonth;
                    vm.shareSaveDialogStatus = 'shareSaveDivInactive' + vm.playerMonth;
                });
    }
        
    function isCurrentEpisodeIndex(index) {
        if (index === vm.currentEpisodeIndex) {
          return('episodeItemsCurrent' + vm.playerMonth);
        } else {
          return('episodeItems' + vm.playerMonth);
        }
    }
        
    function rewind15Seconds() {
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');

        if (playerAudioPlayer.currentTime > 15) {
          playerAudioPlayer.currentTime -= 15;
        } else {
          playerAudioPlayer.currentTime = 0;
        }
        updateNumericalProgressDisplay();
    }
        
    function rewindToStart() {
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');

        playerAudioPlayer.currentTime = 0;
        updateNumericalProgressDisplay();
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
        
    function shareSaveDialog(status) {
        vm.shareSaveDialogStatus = 'shareSaveDivActive' + vm.playerMonth;
        vm.playerMask = 'playerContainerBlur' + vm.playerMonth;
        if (status === 'share') {
          vm.playerShareOrSaveStatus = 'Share Episode:';
        } else {
          vm.playerShareOrSaveStatus = 'Save Episode:';
        }
    }
    
    function skipToEnd() {
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');
        playerAudioPlayer.currentTime = vm.episodesList[vm.currentEpisodeIndex].enclosure.duration;
        updateNumericalProgressDisplay();
    }
        
    function tabClick(tab) {
        switch(tab) {
          case('about'):
            if (vm.aboutTabStatus !== ('playerTabActive' + vm.playerMonth)) {
              vm.aboutTabStatus = 'playerTabActive' + vm.playerMonth;
              vm.episodeTabStatus = 'playerTabInactive' + vm.playerMonth;
              vm.episodeDetailsTabStatus = 'playerTabInactive' + vm.playerMonth;
              vm.aboutContainer = 'aboutContainerActive' + vm.playerMonth;
              vm.episodeContainer = 'episodeContainerInactive' + vm.playerMonth;
              vm.detailsContainer = 'detailsContainerInactive' + vm.playerMonth;
            }
            break;
          case('episodes'):
            if (vm.episodeTabStatus !== ('tabAcitve' + vm.playerMonth)) {
              vm.episodeTabStatus = 'playerTabActive' + vm.playerMonth;
              vm.aboutTabStatus = 'playerTabInactive' + vm.playerMonth;
              vm.episodeDetailsTabStatus = 'playerTabInactive' + vm.playerMonth;
              vm.aboutContainer = 'aboutContainerInactive' + vm.playerMonth;
              vm.episodeContainer = 'episodeContainerActive' + vm.playerMonth;
              vm.detailsContainer = 'detailsContainerInactive' + vm.playerMonth;
            }
            break;
          case('details'):
            if (vm.episodeDetailsTabStatus !== ('tabAcitve' + vm.playerMonth)) {
              vm.episodeDetailsTabStatus = 'playerTabActive' + vm.playerMonth;
              vm.episodeTabStatus = 'playerTabInactive' + vm.playerMonth;
              vm.aboutTabStatus = 'playerTabInactive' + vm.playerMonth;
              vm.aboutContainer = 'aboutContainerInactive' + vm.playerMonth;
              vm.episodeContainer = 'episodeContainerInactive' + vm.playerMonth;
              vm.detailsContainer = 'detailsContainerActive' + vm.playerMonth;
            }
            break;
          default:
            console.log('unsupported tab');
            alert('unsupported tab');
        }
    }
        
    function togglePlaybackRate() {
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');
        let playbackRateToggle = document.getElementById('playbackRateToggle');

        switch(vm.playbackRateStatus) {
          case('playerAtSpeed1' + vm.playerMonth):
            vm.playbackRateStatus = 'playerAtSpeed1point25' + vm.playerMonth;
            playbackRateToggle.innerHTML = '1.25x';
            playerAudioPlayer.playbackRate = 1.25;
            vm.updateRate = 875;
            break;
          case('playerAtSpeed1point25' + vm.playerMonth):
            vm.playbackRateStatus = 'playerAtSpeed1point5' + vm.playerMonth;
            playbackRateToggle.innerHTML = '1.50x';
            playerAudioPlayer.playbackRate = 1.5;
            vm.updateRate = 750;
            break;
          case('playerAtSpeed1point5' + vm.playerMonth):
            vm.playbackRateStatus = 'playerAtSpeed2' + vm.playerMonth;
            playbackRateToggle.innerHTML = '2.00x';
            playerAudioPlayer.playbackRate = 2;
            vm.updateRate = 500;
            break;
          case('playerAtSpeed2' + vm.playerMonth):
            vm.playbackRateStatus = 'playerAtSpeedPoint5' + vm.playerMonth;
            playbackRateToggle.innerHTML = '0.50x';
            playerAudioPlayer.playbackRate = 0.5;
            vm.updateRate = 2000;
            break;
          case('playerAtSpeedPoint5' + vm.playerMonth):
            vm.playbackRateStatus = 'playerAtSpeedPoint75' + vm.playerMonth;
            playbackRateToggle.innerHTML = '0.75x';
            playerAudioPlayer.playbackRate = 0.75;
            vm.updateRate = 1500;
            break;
          case('playerAtSpeedPoint75' + vm.playerMonth):
            vm.playbackRateStatus = 'playerAtSpeed1' + vm.playerMonth;
            playbackRateToggle.innerHTML = '1.00x';
            playerAudioPlayer.playbackRate = 1;
            vm.updateRate = 1000;
            break;
          default:
            console.log('Error: bad playback rate status');
            alert('ERROR on playback rate');
        }
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
        }, vm.updateRate);
    }
        
    function userSliderPosition() {
        let playerProgressSlider = document.getElementById('playerProgressSlider');
        let playerAudioPlayer = document.getElementById('playerAudioPlayer');
        let playerPlayPauseButton = document.getElementById('playerPlayPauseButton');

        playerAudioPlayer.currentTime = playerProgressSlider.value;
        if (playerPlayPauseButton.className === 'playerPlay' + vm.playerMonth) {
          updateNumericalProgressDisplay();
        }
    }
    
    function userSwitchCurrentEpisode(index) {
        let playerProgressSlider = document.getElementById('playerProgressSlider');

        if (index !== vm.currentEpisodeIndex) {
          vm.currentEpisodeIndex = index;
          vm.episodeLink = vm.episodesList[index].link;
          vm.episodeContent = vm.episodesList[index].content;
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

    function viewCancelShareSaveLink() {
        vm.shareSaveDialogStatus = 'shareSaveDivInactive' + vm.playerMonth;
        vm.playerMask = 'playerContainer' + vm.playerMonth;
    }


      function onInit() {
        console.log("Player Test is lit");
        getSkins();
        let playerProgressSlider = document.getElementById('playerProgressSlider');
        vm.feedIcon = vm.playerFeeds[vm.playerFeedsIndex].image;
        vm.podcastTitle = vm.playerFeeds[vm.playerFeedsIndex].title;
        vm.playerCurrentPosition = secondsConversion(0);
          
        setTimeout(() => {
           feedDatas(); 
        }, 500);

      }

    }

}());
