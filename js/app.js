// login dashboard
//  Parse.initialize("tT9K6IFlXY8wknDJCfB7geBnsLBTRqUYJp4p6X4n", "s0EZosX3fJzAcp4LUN92HLI1RGetHRSPKq6n7Dkx");
// frenzy
//Parse.initialize("ykQ2udK5KrOjB7L7bphLAG4RjTlbDc48LyYpL9za", "V83UUWa3ZIyqxxau1X2lN5b45AKeDuVJZMqgv45W");
var frenzyWeb = angular.module("frenzyWeb", ['ui.router']);
frenzyWeb.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
            url: '/signin',
            templateUrl: 'templates/signin.html',
            controller: 'LoginAndRegister'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: ''
        })
        .state('menu', {
            url: '/menu',
            templateUrl: 'templates/menu.html'
        })
        .state('menu.profile', {
            url: '/profile',
            templateUrl: 'templates/menu/profile.html',
            controller: 'ProfileController'
        })
        .state('menu.dataEntry', {
            url: '/dataEntry',
            templateUrl: 'templates/menu/dataEntry.html',
            controller: 'dataEntryController'
        })
        .state('menu.analytics', {
            url: '/analytics',
            templateUrl: 'templates/menu/analytics.html',
            controller: 'analyticsController'
        })
        .state('menu.record', {
            url: '/record',
            templateUrl: 'templates/menu/record.html',
            controller: 'recordController'
        })
        .state('menu.finance', {
            url: '/finance',
            templateUrl: 'templates/menu/finance.html',
            controller: 'financeController'
        })
        .state('menu.technicalSupport', {
            url: '/technicalSupport',
            templateUrl: 'templates/menu/technicalSupport.html',
            controller: 'technicalSupportController'
        });
    $urlRouterProvider.otherwise('/signin');
});
/************************************************************************************************/

  app.run(['$rootScope', "$location", function($scope, $location) {


}]);
app.factory('ParseServiceLogin', [function() {


return {
   sayHello: function(text){
     var app_id = "tT9K6IFlXY8wknDJCfB7geBnsLBTRqUYJp4p6X4n";
     var js_key = "s0EZosX3fJzAcp4LUN92HLI1RGetHRSPKq6n7Dkx";

       Parse.initialize(app_id, js_key);
   },
   sayGoodbye: function(text){
       return "Factory says \"Goodbye " + text + "\"";
   }
}

}]);

app.factory('ParseServiceApp', [function() {
  return {
     sayHello: function(text){
       var app_id = "ykQ2udK5KrOjB7L7bphLAG4RjTlbDc48LyYpL9za";
       var js_key = "V83UUWa3ZIyqxxau1X2lN5b45AKeDuVJZMqgv45W";
       Parse.initialize(app_id, js_key);

     },
     sayGoodbye: function(text){
         return "Factory says \"Goodbye " + text + "\"";
     }
 }

}]);

app.controller("LoginAndRegister", function($scope, $http,$location,ParseServiceLogin){
console.log(ParseServiceLogin.sayHello());
$scope.parse = ParseServiceLogin.sayHello()
  $scope.currentUser = Parse.User.current();

  $scope.signUp = function(form) {
    if($("#nombre").val().length < 1) {
      alert("El nombre es obligatorio");
      return false;

    }else if ($("#empresa").val().length < 1) {
      alert("El nombre de la empresa es obligatorio");
      return false;
    }else if ($("#email").val().length < 1) {
        alert("el email no puede estar vacio");
    }else if($("#email").val().indexOf('@', 0) == -1 || $("#email").val().indexOf('.', 0) == -1) {
        alert("La dirección e-mail parece incorrecta");
        return false;
    } else if ($("#nit").val().length < 1) {
        alert("el nit no puede estar vacio");
    }else if ($("#password").val().length < 1) {
        alert("el password no puede estar vacio");
    }else{
      var user = new Parse.User();
      user.set("email", form.email);
      user.set("name", form.username);
      user.set("username", form.email);
      user.set("password", form.password);
      user.set("nit", form.nit);
      user.set("NameCompany", form.empresa);
      user.set("UserType", "UserCompany");

      user.signUp(null, {
        success: function(user) {
          alert("se envio una confirmacion a tu correo por favor revisa para poder activar tu cuenta");
          $scope.currentUser = user;
          $scope.$apply();
        },
        error: function(user, error) {
          alert("Unable to sign ups:  " + error.code + " " + error.message);
        }
      });
    }

  };
  $scope.logIn = function(form, newPath) {
    console.log(form);
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
        if (user.attributes.emailVerified == false) {
          sweetAlert('Atención', 'Aún no se ha confirmado su correo', 'warning');
        }else {
          alert("login")
          $location.url("/usser");
          $scope.currentUser = user;
          $location.path(newPath);
          $scope.$apply();
        }

      },
      error: function(user, error) {
        alert("Unable to log in: " + error.code + " " + error.message);
      }
    });
  };

  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
  };
});
//
// app.controller("Data", function($scope, $http,ParseServiceApp){
//   $.ajax({
//     url : 'https://api.parse.com/1/classes/Customer',
//     type : 'POST',
//     dataType: 'JSON',
//     contentType : 'application/json',
//     headers : {
//       'X-Parse-Application-Id' : 'ykQ2udK5KrOjB7L7bphLAG4RjTlbDc48LyYpL9za',
//       'X-Parse-REST-API-Key' : 'h36JtLiNJgN0Yvps0dyqy7Q67yRBWzttWg21FCbQ'
//     },
//     processData: false,
//     contentType: false,
//     data : JSON.stringify({
//       Name : 'Frenzy',
//       CategoryApp: 'Testing'
//     }),
//     error : function(data) {
//         console.log(data);
//     },
//     success : function(data) {
//
//         console.log('success', data);
//         return data;                      // do I need to return the data?
//     }
//   });
//
// });
