app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.user = null;
            scope.isAdmin = null;
            scope.isStudent = null;
            scope.isCompany = null;

            // scope.hiringDayState = 'home';

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                    if (user) {
                        scope.isAdmin = user.role === 'Admin';
                        scope.isStudent = user.role === 'Student';
                        scope.isCompany = user.role === 'Company';
                        // console.log(scope.hiringDayState)
                    }
                    //
                    // if (user) {
                    //     if (user.role === 'Admin')
                    //         scope.hiringDayState = "time-slots"
                    //     else if (user.role === 'Student')
                    //         scope.hiringDayState = 'home'
                    //     else if (user.role === 'Company')
                    //         scope.hiringDayState = 'company-preference'

                    // console.log(scope.hiringDayState)
                    // }
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});