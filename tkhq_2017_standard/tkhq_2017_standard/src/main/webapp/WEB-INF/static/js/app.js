'use strict';

var App = angular.module('myApp',['ngAnimate', 'ui.bootstrap', 'ngRoute', 'fcsa-number'])
	.constant('contextPath', _contextPath);

App.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
          function inputValue(val) {
            if (val) {
              var digits = val.replace(/[^0-9.]/g, '');

              if (digits.split('.').length > 2) {
                digits = digits.substring(0, digits.length - 1);
              }

              if (digits !== val) {
                ctrl.$setViewValue(digits);
                ctrl.$render();
              }
              return parseFloat(digits);
            }
            return undefined;
          }            
          ctrl.$parsers.push(inputValue);
        }
      };
   });

App.directive('datepickerManually', function(dateFilter) {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function(scope, element, attrs, ngModel) {
	      ngModel.$parsers.push(function(viewValue) {
	        return dateFilter(viewValue,'yyyy-MM-dd');
	      });
	    }
	  };
	});

App.directive('noSpecialChar', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function(inputValue) {
          if (inputValue == null)
            return ''
          var cleanInputValue = inputValue.replace(/[&\/\\#!@^,+()$~%.'":*?<>{}]/g, ''); //inputValue.replace(/[^\w\s]/gi, '');
          if (cleanInputValue != inputValue) {
            modelCtrl.$setViewValue(cleanInputValue);
            modelCtrl.$render();
          }
          return cleanInputValue;
        });
      }
    }
  });
   App.directive('fileModel', ['$parse', function ($parse) {
	   return {
	      restrict: 'A',
	      link: function(scope, element, attrs) {
	         var model = $parse(attrs.fileModel);
	         var modelSetter = model.assign;
	         
	         element.bind('change', function(){
	            scope.$apply(function(){
	               modelSetter(scope, element[0].files[0]);
	            });
	         });
	      }
	   };
	}]);
	   
angular.module('myApp').controller('TabsDemoCtrl', function ($scope, $window, $rootScope) {
	  $scope.tabs = [
	    { title:'Dynamic Title 1', content:'Dynamic content 1' },
	    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
	  ];

	  $scope.alertMe = function() {
	    setTimeout(function() {
	      $window.alert('You\'ve selected the alert tab!');
	    });
	  };

	  $scope.model = {
	    name: 'Tabs'
	  };
	  
	  $scope.tabSelected1 = function () {
		  console.log('tabSelected1');
		  $rootScope.$emit('childEmit', 'X');
//	      $rootScope.$broadcast('siblingAndParent');
	  };
	  $scope.tabSelected2 = function () {
		  console.log('tabSelected2');
		  $rootScope.$emit('childEmit', 'N');
	  };
	  $scope.tabSelected3 = function () {
		  console.log('tabSelected3');
		  $rootScope.$emit('childEmit', 'XN');
	  };
	  $scope.tabSelected4 = function() {
		$rootScope.$emit('childEmit','K');
	  };
	});

angular.module('myApp')
.controller('DMTongHopController', ['$scope', function($scope) {
  $scope.lstDm = {
   availableOptions: [
     {id: '1', name: 'Danh mục Biểu thuế'},
     {id: '2', name: 'Danh mục Tỉnh/TP'},
    /* {id: '3', name: 'Danh mục mã loại hình VNACCS/VCIS'},*/
     {id: '4', name: 'Danh mục cảng nước ngoài VNACCS'},
     {id: '10', name: 'Danh mục cửa khẩu nước ngoài VNACCS'},
     {id: '13', name: 'Danh mục đơn vị tính VNACCS'},
     {id: '14', name: 'Danh mục tỷ giá'},
     {id: '16', name: 'Danh mục chuyên đề'},
          
   ]
  };
  
  $scope.itemSelected = $scope.lstDm.availableOptions[0];
}]);
angular.module('myApp')
.controller('DMQuyTacController', ['$scope', function($scope) {
  $scope.lstDm = {
   availableOptions: [
         
     {id: '100', name: 'Quy tắc cửa khẩu đặc biệt Việt Nam'},
     
     {id: '101', name: 'Quy tắc doanh nghiệp trị giá nhập khẩu'},
     {id: '102', name: 'Quy tắc doanh nghiệp trị giá xuất khẩu'},
     
     {id: '103', name: 'Quy tắc đơn giá nhập khẩu'},
     {id: '104', name: 'Quy tắc đơn giá xuất khẩu'},
     
     {id: '105', name: 'Quy tắc lượng nhập khẩu'},
     {id: '106', name: 'Quy tắc lượng xuất khẩu'},
     
     {id: '107', name: 'Quy tắc quốc gia nghi ngờ nhập khẩu'},
     {id: '108', name: 'Quy tắc quốc gia nghi ngờ xuất khẩu'},
     
     {id: '109', name: 'Quy tắc trị giá nhập khẩu'},
     {id: '110', name: 'Quy tắc trị giá xuất khẩu'},
     
     {id: '111', name: 'Quy tắc vận tải hàng nhập nước ngoài'},
     {id: '112', name: 'Quy tắc vận tải hàng nhập Việt Nam'},
     
     {id: '113', name: 'Quy tắc vận tải hàng xuất nước ngoài'},
     {id: '114', name: 'Quy tắc vận tải hàng xuất Việt Nam'},
     
     {id: '115', name: 'Quy tắc xuất xứ hàng nhập'},
     {id: '116', name: 'Quy tắc xuất xứ hàng xuất'}
     
   ]
  };
  
  $scope.itemSelected = $scope.lstDm.availableOptions[0];
}]);
