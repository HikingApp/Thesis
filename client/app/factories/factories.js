angular.module('sceneit.factories', ['ngCookies'])

.factory('Session', function(){
  var _username = null;

  var setUsername = function(usernameIN){
    _username = usernameIN;
    return _username;
  };

  var username = function(){
    return _username;
  }

  var create = function(usernameCreate){
    _username = usernameCreate;
  };

  var destroy = function(){
    _username = null;
  }

  return {
    create: create,
    setUsername: setUsername,
    destroy: destroy,
    username: username,
    _username: _username
  }
})

.factory('Auth', function($state, $rootScope, $http, $window, $location, $cookies, Session){

  //Keep state when refreshed
  function init() {
		if ($cookies["userID"]) {
			Session.create($cookies["username"]);
		}
	}

  init();

  var isAuthenticated = function(){
    return !!Session.username();
  };

  var signup = function(user){
    $http({
      method: 'POST',
      url: '/api/user/signup',
      data: user
    })
    .then(function(res){
      Session.create(res.data.username);
      $state.go('home');
    });
  };

  var signin = function(user){
    return ($http({
      method: 'POST',
      url: '/api/user/signin',
      data: user
    })
    .then(function(res){
      Session.create(res.data.username);
      $state.go('home');
    }))
  };

  var signout = function(){
    $http({
      method: 'POST',
      url: '/api/user/logout'
    }).
    then(function(res){
	    $rootScope.username = null;
	    Session.destroy();   
      $location.path('/signin');
    }
  );};

  return {
    signin: signin,
    signup: signup,
    signout: signout,
    isAuthenticated: isAuthenticated, 

  }
});
