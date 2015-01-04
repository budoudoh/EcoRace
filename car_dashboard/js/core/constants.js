(function() {
    'use strict';
    angular
        .module('app')
        .constant('friendsUrl', './mock/friends.json')
        .constant('userUrl', './mock/user.json')
        .constant('carInitUrl', './mock/car_init.json')
        .constant('carChangeUrl', './mock/car_mock.json')
        .constant('m2xUrl', 'http://api-m2x.att.com/v2/devices/b92aacb423773666f6c4c1672f92bf4a/streams/1xacr15x0tta00033/value')
        ;
        
})();