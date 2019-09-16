(function() {
  'use strict';

  angular.module('app')
    .component('monday', {
      controller: MondayController,
      templateUrl: '/js/monday/monday.template.html'
    });

    MondayController.$inject = ['$http', '$state', '$stateParams'];

    function MondayController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.mondayMonth = '_JanuaryA';
      vm.navigateToHub = navigateToHub;
      vm.mondayTabs = [
        {
          active: true,
          podcast: false,
          subscriptions: [
            {
              uuid: '2c7be513-9083-439c-937f-42bbe95c0cb9',
              author: null,
              description: 'Links for the intellectually curious, ranked by readers.',
              link: 'https://news.ycombinator.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/hacker-news-2-569388.png',
              items: null,
              rss: 'https://news.ycombinator.com/rss',
              title: 'Hacker News'
            },
            {
              uuid: 'b1c2eff2-81e8-4f19-a1ba-8fff123fb89a',
              author: null,
              description: 'A source for news on music that is challenging, interesting, different, progressive, introspective, or just plain weird',
              link: 'https://avantmusicnews.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/cropped-cropped-amnbanner1.jpg',
              items: null,
              rss: 'https://avantmusicnews.com/rss',
              title: 'Avant Music News'
            },
            {
              uuid: '9546ff34-ff07-4e31-9332-786ea544ec47',
              author: null,
              description: 'A blog about Major League Baseball',
              link: 'https://www.baseballmusings.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/788443.png',
              items: null,
              rss: 'http://feeds2.feedburner.com/Baseballmusingscom',
              title: 'Baseball Musings'
            },
            {
              uuid: '321d2897-f108-45c1-96ca-3aa70ec46590',
              author: null,
              description: 'The main page.',
              link: 'http://www.dailykos.com/blogs/main',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/daily-kos-squarelogo-1517554340259.png',
              items: null,
              rss: 'https://feeds.dailykos.com',
              title: 'Daily Kos'
            },
            {
              uuid: '2e535aa1-d6d3-4741-9df7-e47ec5ac2260',
              author: null,
              description: 'The latest from Bandcamp',
              link: 'https://daily.bandcamp.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/bc-site-icon1.png',
              items: null,
              rss: 'https://daily.bandcamp.com/feed',
              title: 'Bandcamp Daily'
            },
            {
              uuid: 'b081d79b-ff77-4586-83f3-e9eea5e22c9a',
              author: null,
              description: 'The news according to John Marshall',
              link: 'https://talkingpointsmemo.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/tpm-sq.svg',
              items: null,
              rss: 'https://talkingpointsmemo.com/feed/all',
              title: 'Talking Points Memo'
            },
            {
              uuid: '5eb65b5e-6896-4357-94af-e48fad7c64cc',
              author: null,
              description: 'Wonkette',
              link: 'https://www.wonkette.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/wonkette.jpg',
              items: null,
              rss: 'https://www.wonkette.com/feeds/feed.rss',
              title: 'Wonkette'
            }
          ],
          tab: 'mondayTabActive' + vm.mondayMonth,
          title: 'Dailies'
        },
        {
          active: false,
          podcast: false,
          subscriptions: [
            {
              uuid: '09689d96-f0fb-4a3e-ad8c-1d71cb9545a8',
              author: null,
              description: 'Fostering connections, deepening knowledge, encouraging appreciation, and providing financial support for new music created in the United States',
              link: 'https://www.newmusicusa.org/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/newmusicbox.png',
              items: null,
              rss: 'https://nmbx.newmusicusa.org/rss',
              title: 'NewMusicBox – NewMusicBox'
            },
            {
              uuid: '4de05f59-d8df-49a0-9ad7-4cc9b80f15ae',
              author: null,
              description: 'New classical music, art, and technology',
              link: 'https://www.icareifyoulisten.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/TvlOzOKS_400x400.jpg',
              items: null,
              rss: 'https://www.icareifyoulisten.com/rss',
              title: 'I CARE IF YOU LISTEN'
            },
            {
              uuid: '79f05037-72d3-497e-a57a-54012a79407b',
              author: null,
              description: 'Books, articles, and a blog by the music critic of The New Yorker',
              link: 'https://www.therestisnoise.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/41qc8pZFMcL._SL500_.jpg',
              items: null,
              rss: 'https://www.therestisnoise.com/atom.xml',
              title: 'Alex Ross: The Rest Is Noise'
            },
            {
              uuid: '009b6c3f-14a2-4add-abc2-4ea3380ae67c',
              author: null,
              description: 'Reviews of Free Jazz and Improvised Music',
              link: 'http://www.freejazzblog.org/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/RQxWDoWr_400x400.jpg',
              items: null,
              rss: 'http://www.freejazzblog.org/atom.xml',
              title: 'The Free Jazz Collective'
            },
            {
              uuid: 'c1979d0e-d388-44ca-8ab0-a41d422c831a',
              author: null,
              description: 'The Contemporary Classical Music Community',
              link: 'http://www.sequenza21.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/seq21logo1.jpg',
              items: null,
              rss: 'http://www.sequenza21.com/feed',
              title: 'Sequenza21'
            }
          ],
          tab: 'mondayTabInactive' + vm.mondayMonth,
          title: 'Music'
        },
        {
          active: false,
          podcast: true,
          subscriptions: [
            {
              uuid: 'ec2f85e6-aa1d-4195-98f5-217e0525f714',
              author: 'WQXR',
              description: 'Peabody Award-winning podcast that takes listeners into the minds of the composers making some of the most innovative and breathtakingly beautiful music today.',
              link: 'https://www.newsounds.org/shows/meet-composer',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/mtc_waaa_1400.png',
              items: null,
              rss: 'http://feeds.wnyc.org/wqxr-meetthecomposer',
              title: 'Meet the Composer'
            }
          ],
          tab: 'mondayTabInactive' + vm.mondayMonth,
          title: 'Music Podcasts'
        },
        {
          active: false,
          podcast: false,
          subscriptions: [
            {
              uuid: '972a2dbc-9441-4c12-a262-e3119559d47d',
              author: null,
              description: 'Slate RSS',
              link: 'https://slate.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/slate.png',
              items: null,
              rss: 'https://slate.com/feeds/all.rss',
              title: 'Slate Magazine'
            },
            {
              uuid: '08030a4a-4d9c-4003-89cc-872ad78c8d89',
              author: null,
              description: 'The latest news from TheHill.com',
              link: 'https://thehill.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/theHillLogo.png',
              items: null,
              rss: 'http://thehill.com/rss/syndicator/19109',
              title: 'TheHill - The Hill News'
            },
            {
              uuid: '4c2a61cb-27a2-4c56-805a-8282bcf11221',
              author: null,
              description: 'Axios',
              link: 'https://www.axios.com/top/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/axios-vector-logo.png',
              items: null,
              rss: 'http://api.axios.com/feed/',
              title: 'Axios'
            },
            {
              uuid: '67063476-7716-49e8-8c10-122989636ccd',
              author: null,
              description: 'Smart, fearless journalism',
              link: 'https://www.motherjones.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/MJ_cropped-favicon-512x512.png',
              items: null,
              rss: 'https://www.motherjones.com/politics/feed/',
              title: 'Politics – Mother Jones'
            },
            {
              uuid: '67dce9dc-df80-4ce4-8516-cf79f3e2388e',
              author: null,
              description: 'Nate Silver’s FiveThirtyEight uses statistical analysis — hard numbers — to tell compelling stories about politics, sports, science, economics and culture.',
              link: 'https://fivethirtyeight.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/0660d8ba58b80eabbfa60e410d32ed7f.jpg',
              items: null,
              rss: 'http://fivethirtyeight.com/politics/feed',
              title: 'Politics – FiveThirtyEight'
            },
            {
              uuid: 'bb51cad9-ef52-4910-9184-559edd28647f',
              author: null,
              description: '"We deal in illusions, man. None of it is true. But you people sit there day after day, night after night, all ages, colors, creeds. We\'re all you know. You\'re beginning to believe the illusions we\'re spinning here. You\'re beginning to think that the tube is reality and that your own lives are unreal. You do whatever the tube tells you. You dress like the tube. You eat like the tube. You even think like the tube. In God\'s name, you people are the real thing, WE are the illusion." -Howard Beale',
              link: 'https://digbysblog.blogspot.com/',
              image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/network-howard-beal.jpg',
              items: null,
              rss: 'http://digbysblog.blogspot.com/feeds/posts/default',
              title: 'Hullabaloo'
            }
          ],
          tab: 'mondayTabInactive' + vm.mondayMonth,
          title: 'Politics'
        },
        {
          active: false,
          podcast: false,
          tab: 'mondayTabInactive' + vm.mondayMonth,
          title: 'Tech'
        },
        {
          active: false,
          podcast: true,
          tab: 'mondayTabInactive' + vm.mondayMonth,
          title: 'Tech Podcasts'
        },
        {
          active: false,
          podcast: true,
          tab: 'mondayTabInactive' + vm.mondayMonth,
          title: 'Externals'
        },
        {
          active: false,
          podcast: true,
          tab: 'mondayTabInactive' + vm.mondayMonth,
          title: 'Manage Tabs'
        }
      ];
      vm.toggleTabs = toggleTabs;

      function toggleTabs(tabTitle) {
        let activeTab = vm.mondayTabs.filter(tab => {
          return(tab.active);
        });
        if (tabTitle !== activeTab[0].title) {
          for (let i = 0; i < vm.mondayTabs.length; i++) {
            if (vm.mondayTabs[i].title === tabTitle) {
              vm.mondayTabs[i].active = true;
              vm.mondayTabs[i].tab = 'mondayTabActive' + vm.mondayMonth;
            } else {
              vm.mondayTabs[i].active = false;
              vm.mondayTabs[i].tab = 'mondayTabInactive' + vm.mondayMonth;
            }
          }
        }
      }

      function navigateToHub() {
        $state.go('userhub', {id: vm.user.uuid});
      }

      function resetSecuritySettings() {
        let oldKey = vm.user.security.key;

        let storage = window.localStorage;
        let now = new Date();

        $http.post(`/users/resetsecurity`, {uuid: vm.user.uuid, ip: vm.ip})
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

      function clearCookiesAndStorage() {
        let storage = window.localStorage;
        storage.removeItem('habitualOffender');
        storage.removeItem('habitualRelease');
        document.cookie = "habitualOffender=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "habitualRelease=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }

      function navigateToLanding() {
        $state.go('landing');
      }

      function getCookie (name) {
        var cookies = document.cookie.split(';');
        for(var i=0 ; i < cookies.length ; ++i) {
          var pair = cookies[i].trim().split('=');
          if(pair[0] === name) {
            return (pair[1]);
          }
        }
        return null;
      }

      function setUserIPAddress() {
        $http.get('/ipaddress')
        .then(responseData => {
          vm.ip = responseData.data.ip;
          checkLoginStatus($stateParams.userUuid);
        });
      }

      function setFooterMessage() {
        let today = new Date();
        if (today.getFullYear() > 2019) {
          vm.footerMessage = '©2019 - ' + today.getFullYear() + ' HurdAudio';
        } else {
          vm.footerMessage = '©2019 HurdAudio'
        }
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

      function onInit() {
        console.log("Monday is lit");

        switch (vm.mondayMonth) {
          case('_JanuaryA'):
            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/robe-154808_640.png';
            break;
          case('_JanuaryB'):
            vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/nun-4018982_1280.png'
            break;
          case('_JanuaryC'):
          vm.logoPath = 'https://habits168-hurdaudio.s3.amazonaws.com/img/job-3506038_1280.png';
            break;
          default:
            alert('UNSUPPORTED MONTH SELECT for LOGO');
        }

        setUserIPAddress();
        setFooterMessage();
        // checkLoginStatus();

      }

    }

}());
