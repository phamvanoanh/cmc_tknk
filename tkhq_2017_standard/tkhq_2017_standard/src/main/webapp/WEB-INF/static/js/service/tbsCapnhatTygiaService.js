/**
 * Service of model TBS_BIEUTHUE
 * 
 */

'use strict';

App.factory('TbsCapnhatTygiaService', ['$http', '$q', 'contextPath', '$httpParamSerializerJQLike', TbsCapnhatTygiaService]);
function TbsCapnhatTygiaService($http, $q, contextPath, $httpParamSerializerJQLike){

    var REST_SERVICE_URI = contextPath + '/tbscapnhattygia/';
    
    var semaphore = false;

    var factory = {        
    		crtTygia: crtTygia,
    		updTygia: updTygia,
    		delTygia: delTygia,
    		searchTygia: searchTygia
    };

    return factory;

    function crtTygia(tygiaEntity) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, tygiaEntity)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Không thể tạo mới tỷ giá');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function updTygia(tygiaEntity, tygiaId) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI + tygiaId, tygiaEntity)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Không thể sửa tỷ giá');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function delTygia(selectedList) {
    	console.log("Json: " + JSON.stringify(selectedList));
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI, {params: {lstTygia: JSON.stringify(selectedList)}})
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Không thể xóa bản ghi vừa chọn');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    function searchTygia(formData){
    	console.log('TbsCapnhatTygiaService@searchTygia START formData:',formData);
    	var deferred = $q.defer();
    	$http({
    		headers: {'Content-Type': 'application/json;charset=utf-8'},
    		method: 'POST',
    		url: REST_SERVICE_URI + 'search',
    		data: formData
    	})
    	.then(function(response) {
			console.log('Return data & status: ' + response.data + " " + response.status);
			deferred.resolve(response.data);
			},
			function(errorResponse) {
				console.error('Return data & status: ' + errorResponse.data + " " + errorResponse.status);
				deferred.reject(errorResponse.status);
			}
		);
    	return deferred.promise;
    }

}

angular.module('myApp').service('modalService', ['$uibModal',
    function ($uibModal) {

    	var modalDefaults = {
    			backdrop: true,
    			keyboard: true,
    			modalFade: true,
    			animation: true,
    			templateUrl: 'tygiaEdit',
    			controller: 'TbsCapnhatTygiaController',
    			controllerAs: 'self'
    	};
      
//      var modalOptions = {
//              closeButtonText: 'Close',
//              actionButtonText: 'OK',
//              headerText: 'Proceed?',
//              bodyText: 'Perform this action?'
//      };

    	this.showModal = function (grid, row) {
          //Create temp objects to work with since we're in a singleton service
    		var tempModalDefaults = {
    				resolve : {
    					grid : function() {
    						return grid;
    					},
    					row : function() {
    						return row;
    					}
    				}
    		};
          //var tempModalOptions = {};

          //Map angular-ui modal custom defaults to modal defaults defined in service
    		angular.extend(tempModalDefaults, modalDefaults);

          //Map modal.html $scope custom properties to defaults defined in service
          //angular.extend(tempModalOptions, modalOptions);

//          if (!tempModalDefaults.controller) {
//              tempModalDefaults.controller = function ($scope, $modalInstance) {
//                  $scope.modalOptions = tempModalOptions;
//                  $scope.modalOptions.ok = function (result) {
//                      $modalInstance.close(result);
//                  };
//                  $scope.modalOptions.close = function (result) {
//                      $modalInstance.dismiss('cancel');
//                  };
//              }
//          }

    		return $uibModal.open(tempModalDefaults).result;
    };

}]);
