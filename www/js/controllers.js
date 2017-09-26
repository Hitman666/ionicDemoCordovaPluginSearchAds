angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope, $ionicPlatform) {
    $scope.data = 'no data';

    $ionicPlatform.ready(function() {
      if (typeof SearchAds !== "undefined") {
        searchAds = new SearchAds();

        searchAds.initialize(function(attribution) {
          console.dir(attribution); // do something with this attribution (send to your server for further processing)
          $scope.data = JSON.stringify(attribution);

          if (window.FirebasePlugin) {
            window.FirebasePlugin.logEvent("select_content", { content_type: "page_view", item_id: "home" });
          }
        }, function(err) {
          console.dir(err);
        });
      }
    });
  })

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
