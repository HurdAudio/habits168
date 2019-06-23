(function() {
  'use strict';

  angular.module('app')
    .component('landing', {
      controller: LandingController,
      templateUrl: '/js/landing/landing.template.html'
    });

    LandingController.$inject = ['$http', '$state', '$stateParams'];

    function LandingController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.monthSelect = '_JanuaryA';
      vm.userLoggedIn = false;
      vm.userLoginActive = false;
      vm.activateUserLogin = activateUserLogin;
      vm.landingLoginBoxClass = 'landingLoginInactive' + vm.monthSelect;
      vm.deactivateUserLogin = deactivateUserLogin;
      vm.userGreetingMessage = 'Hello, User';
      vm.userLogin = userLogin;
      vm.loginError = false;
      vm.loginErrorMessage = '';
      vm.userLogout = userLogout;
      vm.linkShareCollapse = false;
      vm.toggleLinkShareState = toggleLinkShareState;
      vm.linkSharesClass = 'landingRecentlySharedLinksUncollapsed' + vm.monthSelect;
      vm.postSharesClass = 'landingRecentlySharedPostsCollapsed' + vm.monthSelect;
      vm.userShareLinks = [
        {
          author: '',
          cleanDate: 'Sunday 2019 June 23 4:19pm',
          description: '<a href="https://news.ycombinator.com/item?id=20256226">Comments</a>',
          enclosure: {},
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/hacker-news-2-569388.png',
          link: 'https://www.psytoolkit.org/experiment-library/',
          sharer: {
            avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg',
            comment: 'In case you\'ve ever wondered what I\'ve been up to in my copious spare time.',
            name: 'DJ Ipsum'
          },
          siteDescriptor: 'Links for the intellectually curious, ranked by readers.',
          title: 'PsyToolkit: Create and run cognitive psychological experiments in the browser',
          via: 'Hacker News'
        },
        {
          author: 'synthhead',
          cleanDate: 'Saturday 2019 June 19 7:47pm',
          description: 'The Vector synthesizer - a new digital hardware synthesizer hybrid, combining several synthesis methods - is now available.… <a class="more-link" href="http://www.synthtopia.com/content/2019/06/22/vector-synth-now-available-to-order/">Read More <span class="screen-reader-text">Vector Synth Now Available To Order</span></a>',
          enclosure: {},
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/press-synthtopia-logo.jpg',
          link: 'http://www.synthtopia.com/content/2019/06/22/vector-synth-now-available-to-order/',
          share: {
            avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/lovecraftAvatar.jpg',
            comment: 'Have you ever wondered what a vector "sounds" like?',
            name: 'Lorem Dolar'
          },
          siteDescriptor: 'Synthesizer and electronic music news, synth and music software reviews and more!',
          title: 'Vector Synth Now Available To Order',
          via: 'Synthopia'
        },
        {
          author: 'Lindsay',
          cleanDate: 'Friday 2019 June 21 5:40pm',
          description: ' <p>Super easy Italian Pasta Salad - with pasta, tomatoes, fresh mozzarella, spicy salami, pepperoncini, olives, and easy Italian dressing. DANGEROUSLY GOOD.</p> <p>The post <a rel="nofollow" href="https://pinchofyum.com/pasta-salad">The Best Easy Italian Pasta Salad</a> appeared first on <a rel="nofollow" href="https://pinchofyum.com/">Pinch of Yum</a>.</p> ',
          enclosure: {},
          image: 'https://pinchofyum.com/wp-content/uploads/cropped-Pinch-of-Yum-Favicon-512-32x32.png',
          link: 'https://pinchofyum.com/pasta-salad',
          share: {
            avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/ashesAvatar.png',
            comment: 'I can\'t resist a good pasta salad.',
            name: 'Amet Tempor'
          },
          siteDescriptor: 'A food blog with simple and tasty recipes.',
          title: 'The Best Easy Italian Pasta Salad',
          via: 'Pinch of Yum'
        },
        {
          author: 'Karen L Freund',
          cleanDate: 'Sunday 2019 June 23 4:45pm',
          description: ' <p>In June 2019, people around the world are marking and celebrating 50 years since the <a href="https://thestonewallinnnyc.com/the-stonewall-inn-story/2017/4/4/ntmsg5ni7iixxdjimmg16hz6dvsi4v">uprising at the Stonewall Inn</a> in New York City that ushered in the modern movement for LGBTQ rights. While the largest celebration will no doubt be the one in New York, which for the first time is also hosting <a href="https://2019-worldpride-stonewall50.nycpride.org/">WorldPride</a> events, Pride month celebrations are taking place across the country and the globe, in events large and small. LGBTQ communities in Alabama, while aware of the threats and attitudes they may face in their very conservative and often intolerant state, are joining in the celebration, reflecting on how far they’ve come, and looking to the future.</p> <p>Florence, Alabama, is a small city in the northwest of the state, located across the Tennessee River from Muscle Shoals. It is hosting a <a href="https://www.facebook.com/pg/equalityshoals/events/?ref=page_internal" title="">series of Pride events</a> this month, culminating in a parade on June 29. In May and again earlier this month, Florence event organizers <a href="https://www.facebook.com/ShoalsDiversityCenter/">Shoals Diversity Center</a> and <a href="https://www.facebook.com/equalityshoals/">Equality Shoals</a> requested permission from the city to paint chalk rainbows in crosswalks in honor of Pride month. The organizers say they thought they had that permission, and the project, <a href="https://www.facebook.com/ShoalsDiversityCenter/posts/2868780156472170">Paint for Pride</a>, went ahead, with volunteers painting the crosswalks on June 13. Immediately after they had finished, the city set about <a href="https://www.waaytv.com/content/news/Controversy-over-gay-pride-painted-crosswalk-in-the-Shoals-511260962.html" title="">removing the rainbows</a>, claiming that the organizers had not actually received permission for it.</p> <p>Happily, amidst outrage and distress over the city’s actions, Shoals Diversity Center and Equality Shoals wrote to the mayor and police chief, who both responded, and the final outcome of communication between the parties was a unanimous resolution of the city council approving repainting of the crosswalks for Pride month. The local TimesDaily <a href="https://www.timesdaily.com/news/local/council-allows-pride-chalk-rainbows-at-crosswalks/article_27ddcdba-33d0-5f20-aa91-dfc061cb57dd.html?fbclid=IwAR18yLiQMkgUrXYzPw_5u2BuKhLyfsZKm8xopHhhBXU8Zn7QOnv-271rpYo#utm_campaign=blox&amp;utm_source=facebook&amp;utm_medium=social">reported</a>, “The decision, which was greeted with applause from many attending the meeting, comes after the city of Florence had removed a Pride rainbow design last week that had been drawn in chalk at the intersection. ‘They righted a wrong and I\'m very appreciative of the common sense and just doing the right thing,’ said Stuart Ausbon, one of the people who coordinated the chalk project. [...]  Ausbon added he is not surprised by Tuesday\'s decision to allow the chalk work. ‘I knew that this wonderful and loving village that surrounds me and my family and friends would win out,’ he said. ‘That\'s the Florence I know and the Florence that we all love.’"</p> <img src="http://feeds.feedburner.com/~r/dailykosofficial/~4/NdeerZWKhz8" height="1" width="1" alt=""> ',
          enclosure: {
            link: 'https://images.dailykos.com/images/687584/story_image/MadCtyCthousePrideDisplay.jpg?1560964959'
          },
          image: 'https://habits168-hurdaudio.s3.amazonaws.com/feed_icons/daily-kos-squarelogo-1517554340259.png',
          link: 'http://feeds.dailykosmedia.com/~r/dailykosofficial/~3/NdeerZWKhz8/-Southern-Pride-Alabama-LGBTQ-communities-and-allies-celebrate-keep-moving-forward',
          share: {
            avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/clark-kent.jpg',
            comment: 'Love is love.',
            name: 'Clarke the News Hound'
          },
          siteDescriptor: 'The main page.',
          title: 'Southern Pride: Alabama LGBTQ communities and allies celebrate, keep moving forward',
          via: 'Daily Kos'
        },
        {
          author: 'Editorial',
          cleanDate: 'Friday 2019 June 21 1:53pm',
          description: 'The pre-Dead Moon group\'s third LP, reissued by Mississippi Records, is punk canon.',
          enclosure: {
            link: 'https://bandcampblog.files.wordpress.com/2019/06/a1587529418_10.jpg'
          },
          image: 'https://bandcampblog.files.wordpress.com/2017/03/bc-site-icon1.png',
          link: 'https://daily.bandcamp.com/2019/06/21/rats-in-a-desperate-red-review/',
          share: {
            avatar: 'https://habits168-hurdaudio.s3.amazonaws.com/avatars/homerAvatar.jpg',
            comment: 'Punk canon you say?',
            name: 'DJ Ipsum'
          },
          siteDescriptor: '',
          title: 'Album of the Day: The Rats, “In a Desperate Red”',
          via: 'Bandcamp Daily'
        }
      ];

      function toggleLinkShareState() {
        if (vm.linkShareCollapse) {
          vm.linkShareCollapse = false;
          vm.linkSharesClass = 'landingRecentlySharedLinksCollapsed' + vm.monthSelect;
          vm.postSharesClass = 'landingRecentlySharedPostsUncollapsed' + vm.monthSelect;
        } else {
          vm.linkShareCollapse = true;
          vm.linkSharesClass = 'landingRecentlySharedLinksUncollapsed' + vm.monthSelect;
          vm.postSharesClass = 'landingRecentlySharedPostsCollapsed' + vm.monthSelect;
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
          }
        });
      }

      function encryptBySalt(word, salt) {
        let insertionPoint = Math.floor(Math.random() * word.length);
        let result = '';
        if (insertionPoint === 0) {
          result = salt + word;
        } else {
          result = word.slice(0, insertionPoint) + salt + word.slice(insertionPoint);
        }

        return(result);
      }

      function encryptByKey(word, key) {
        let asciiLimit = 65535;
        let index = 0;
        let result = '';
        let insertChar = 0;
        let keyChar = 0;
        let wordChar = 0;

        for (let i = 0; i < word.length; i++) {
          keyChar = key.charCodeAt(index);
          wordChar = word.charCodeAt(i);
          insertChar = wordChar + keyChar;
          if (insertChar > asciiLimit) {
            insertChar = insertChar - asciiLimit;
          }
          result += String.fromCharCode(insertChar);
          ++index;
          if (index === key.length) {
            index = 0;
          }
        }

        return(result);
      }

      function encryptByInversion(word, invert) {
        let asciiLimit = 65535;
        let result = '';
        let indexChar = 0;
        let insertChar = 0;

        for (let i = 0; i < word.length; i++) {
          indexChar = word.charCodeAt(i);
          insertChar = invert + (invert - indexChar);
          if (insertChar < 0) {
            insertChar += asciiLimit;
          }
          insertChar = insertChar % asciiLimit;
          result += String.fromCharCode(insertChar);
        }

        return(result);
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

      function setLoginState() {
        if (!vm.user) {
          alert('ERROR: User not logged in');
          return;
        }
        if (!vm.user.security) {
          alert('ERROR: User not properly logged in');
          return;
        }
        let storage = window.localStorage;
        storage.setItem(vm.user.security.key, vm.user.security.value);
        storage.setItem('habitualOffender', vm.user.uuid);
        storage.setItem('habitualRelease', vm.user.security.expire);
        document.cookie = vm.user.security.key + "=" + vm.user.security.value;
        document.cookie = "habitualOffender=" + vm.user.uuid;
        document.cookie = "habitualRelease=" + vm.user.security.expire;

      }

      function shuffleArray(arr) {

        for (let multi = 0; multi < 128; multi++) {
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }

        return(arr);
      }

      function ecryptionArray(password, encrypt) {

        let passwords = [];
        passwords[0] = encryptByInversion(password, encrypt.inversion.charCodeAt(0));
        passwords[1] = encryptByKey(password, encrypt.onetime_key);
        passwords[2] = encryptBySalt(password, encrypt.salt);
        passwords[3] = password.split('').reverse().join('');
        passwords[4] = passwords[0];
        passwords[5] = passwords[1];
        passwords[6] = passwords[2];
        passwords[7] = passwords[3];
        passwords[8] = passwords[0];
        passwords[9] = passwords[1];
        passwords[10] = passwords[2];
        passwords[11] = passwords[3];
        passwords[0] = encryptBySalt(passwords[0], encrypt.salt);
        passwords[1] = passwords[1].split('').reverse().join('');
        passwords[2] = encryptByInversion(passwords[2], encrypt.inversion.charCodeAt(0));
        passwords[3] = encryptByKey(passwords[3], encrypt.onetime_key);
        passwords[4] = passwords[4].split('').reverse().join('');
        passwords[5] = encryptByInversion(passwords[5],
        encrypt.inversion.charCodeAt(0));
        passwords[6] = encryptByKey(passwords[6], encrypt.onetime_key);
        passwords[7] = encryptBySalt(passwords[7], encrypt.salt);
        passwords[8] = passwords[8].split('').reverse().join('');
        passwords[9] = encryptBySalt(passwords[9], encrypt.salt);
        passwords[10] = passwords[10].split('').reverse().join('');
        passwords[11] = encryptByInversion(passwords[11], encrypt.inversion.charCodeAt(0));
        passwords[0] = passwords[0].split('').reverse().join('');
        passwords[1] = encryptByInversion(passwords[1], encrypt.inversion.charCodeAt(0));
        passwords[2] = encryptByKey(passwords[2], encrypt.onetime_key);
        passwords[3] = encryptBySalt(passwords[3], encrypt.salt);
        passwords[4] = encryptBySalt(passwords[4], encrypt.salt);
        passwords[5] = encryptBySalt(passwords[5], encrypt.salt);
        passwords[6] = encryptByInversion(passwords[6], encrypt.inversion.charCodeAt(0));
        passwords[7] = encryptByKey(passwords[7], encrypt.onetime_key);
        passwords[8] = encryptBySalt(passwords[8], encrypt.salt);
        passwords[9] = encryptByInversion(passwords[9], encrypt.inversion.charCodeAt(0));
        passwords[10] = encryptByKey(passwords[10], encrypt.onetime_key);
        passwords[11] = encryptBySalt(passwords[11], encrypt.salt);
        passwords[0] = encryptByKey(passwords[0], encrypt.onetime_key);
        passwords[1] = encryptBySalt(passwords[1], encrypt.salt);
        passwords[2] = passwords[2].split('').reverse().join('');
        passwords[3] = passwords[3].split('').reverse().join('');
        passwords[4] = encryptByKey(passwords[4], encrypt.onetime_key);
        passwords[5] = passwords[5].split('').reverse().join('');
        passwords[6] = passwords[6].split('').reverse().join('');
        passwords[7] = encryptByInversion(passwords[7], encrypt.inversion.charCodeAt(0));
        passwords[8] = encryptByKey(passwords[8], encrypt.onetime_key);
        passwords[9] = passwords[9].split('').reverse().join('');
        passwords[10] = encryptByInversion(passwords[10], encrypt.inversion.charCodeAt(0));
        passwords[11] = encryptByKey(passwords[11], encrypt.onetime_key);

        passwords = shuffleArray(passwords);

        return(passwords);
      }

      function userLogin() {
        let passwordArray = [];
        let userEmail = document.getElementById('landingLoginEmailField').value;
        let userPassword = document.getElementById('landingLoginPasswordField').value;

        if (userEmail === '') {
          vm.loginError = true;
          vm.loginErrorMessage = 'Please enter email';
          return;
        }
        if (userEmail.indexOf('@') === -1) {
          vm.loginError = true;
          vm.loginErrorMessage = 'Please enter valid email';
          return;
        }
        if (userPassword === '') {
          vm.loginError = true;
          vm.loginErrorMessage = 'Please enter password';
        }
        vm.loginErrorMessage = '';
        $http.get(`/users/prelogin/${userEmail}/${vm.ip}`)
        .then(encryptionData => {
          let encryption = encryptionData.data;
          if ((encryption.key === null) || (encryption.value === null) || (encryption.inversion === null) || (encryption.onetime_key === null) || (encryption.salt === null)) {
            vm.loginError = true;
            vm.loginErrorMessage = 'Login error';
            return;
          }
          let passwordArray = ecryptionArray(userPassword, encryption);
          let loginObj = {
            email: userEmail,
            password: passwordArray
          }

          $http.post('/users/login', loginObj)
          .then(responseData => {
            let response = responseData.data;
            console.log(response);
            if ((response.uuid === null) && (response.login === 'forbidden')) {
              vm.loginError = true;
              vm.loginErrorMessage = 'Login error';
            } else {
              vm.user = response;
              setLoginState();
              deactivateUserLogin();
              vm.userLoggedIn = true;
              setGreetingMessage();
            }
          });
        });
      }

      function setGreetingMessage() {
        let greetingsArray = [ 'Hello', 'Hallo', 'Hola', 'Szia', 'こんにちは', 'Merhaba', '你好', '여보세요', 'dzień', 'Привет', 'Hej', 'Sawubona', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'Hello', 'העלא', 'नमस्ते', 'שלום', 'σας', 'Kamusta', 'Hei', 'Hallo', 'Halo', 'Kaixo', 'გამარჯობა', 'xin chào', 'aloha', 'Hiha', 'Bonjou', 'Bonjour', 'Hej', 'добры дзень', 'Ahoj', 'Ola', 'Dia dhuit', 'Ciao', 'slav', 'ສະບາຍດີ', 'Salve', 'Bongu', 'Сайн уу', 'नमस्ते', 'سلام', 'Olá', 'Salut', 'talofa', 'Hello', 'Здраво', 'สวัสดี', 'Здрастуйте', 'Sawubona' ];

        vm.userGreetingMessage = greetingsArray[Math.floor(Math.random() * (greetingsArray.length))] + ', ' + vm.user.first_name;
      }

      function deactivateUserLogin() {
        vm.userLoginActive = false;
        vm.landingLoginBoxClass = 'landingLoginInactive' + vm.monthSelect;
        vm.loginError = false;
        document.getElementById('landingLoginEmailField').value = '';
        document.getElementById('landingLoginPasswordField').value = '';
      }

      function activateUserLogin() {
        vm.userLoginActive = true;
        vm.landingLoginBoxClass = 'landingLoginActive' + vm.monthSelect;
        document.getElementById('landingLoginEmailField').focus();
        document.getElementById('landingLoginEmailField').value = '';
        document.getElementById('landingLoginPasswordField').value = '';
      }

      function setFooterMessage() {
        let today = new Date();
        if (today.getFullYear() > 2019) {
          vm.footerMessage = '©2019 - ' + today.getFullYear() + ' HurdAudio';
        } else {
          vm.footerMessage = '©2019 HurdAudio'
        }
      }

      function setUserIPAddress() {
        $http.get('/ipaddress')
        .then(responseData => {
          vm.ip = responseData.data.ip;
        });
      }

      function clearCookiesAndStorage() {
        let storage = window.localStorage;
        storage.removeItem('habitualOffender');
        storage.removeItem('habitualRelease');
        document.cookie = "habitualOffender=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "habitualRelease=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }

      function checkLoginStatus() {
        let storage = window.localStorage;
        let now = new Date();

        if ((!storage.getItem('habitualOffender')) || (getCookie('habitualOffender') === null)) {
          vm.user = null;
          vm.userLoggedIn = false;
          return;
        }

        if (storage.getItem('habitualOffender') !== getCookie('habitualOffender')) {
          vm.user = null;
          vm.userLoggedIn = false;
          clearCookiesAndStorage();
          return;
        }

        $http.get(`/users/${storage.getItem('habitualOffender')}`)
        .then(userData => {
          vm.user = userData.data;

          if ((!storage.getItem('habitualRelease')) || (getCookie('habitualRelease') === null)) {
            storage.removeItem(vm.user.security.key);
            document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            vm.user = null;
            vm.userLoggedIn = false;
            clearCookiesAndStorage();
            return;
          }

          if ((storage.getItem('habitualRelease')) !== getCookie('habitualRelease')) {
            storage.removeItem(vm.user.security.key);
            document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            vm.user = null;
            vm.userLoggedIn = false;
            clearCookiesAndStorage();
            return;
          }

          let expiration = new Date(storage.getItem('habitualRelease'));
          if (now.getTime() > expiration.getTime()) {
            storage.removeItem(vm.user.security.key);
            document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            vm.user = null;
            vm.userLoggedIn = false;
            clearCookiesAndStorage();
            return;
          }

          if ((!storage.getItem(vm.user.security.key)) || (getCookie(vm.user.security.key) === null)) {
            storage.removeItem(vm.user.security.key);
            document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            vm.user = null;
            vm.userLoggedIn = false;
            clearCookiesAndStorage();
            return;
          }

          if ((storage.getItem(vm.user.security.key) !== getCookie(vm.user.security.key)) || (storage.getItem(vm.user.security.key) !== vm.user.security.value) || (getCookie(vm.user.security.key) !== vm.user.security.value)) {
            storage.removeItem(vm.user.security.key);
            document.cookie = vm.user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            vm.user = null;
            vm.userLoggedIn = false;
            clearCookiesAndStorage();
            return;
          }
          vm.userLoggedIn = true;
          setGreetingMessage();
        });

      }

      function onInit() {
        console.log("Landing is lit");
        setUserIPAddress();
        setFooterMessage();
        checkLoginStatus();

      }

    }

}());
