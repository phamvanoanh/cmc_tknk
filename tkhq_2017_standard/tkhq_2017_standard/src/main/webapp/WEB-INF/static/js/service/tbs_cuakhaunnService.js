/**
 * Service of model TBS_BIEUTHUE
 * 
 */

'use strict';

App.factory('Tbs_CuaKhauNNService',['$http','$q','contextPath', '$httpParamSerializerJQLike', Tbs_CuaKhauNNService]);
function Tbs_CuaKhauNNService($http, $q, contextPath, $httpParamSerializerJQLike){

	var REST_SERVICE_URI = contextPath + '/tbs_cuakhaunn_vnaccs/';
//							console.log(REST_SERVICE_URI);
	var semaphore = false;

	var factory = {
//		fetchAllBieuThues : fetchAllBieuThues,
		crtCuaKhauNN: crtCuaKhauNN,
		updCuaKhauNN: updCuaKhauNN,
		delCuaKhauNN: delCuaKhauNN,
		searchCuaKhauNN: searchCuaKhauNN
	};

	return factory;

//	function fetchAllBieuThues() {
//		var deferred = $q.defer();
//		$http.get(REST_SERVICE_URI).then(
//			function(response) {
//				deferred.resolve(response.data);
//			},
//			function(errResponse) {
//				console.error('Có lỗi xảy ra trong khi lấy thông tin biểu thuế');
//				deferred.reject(errResponse);
//			});
//
//		return deferred.promise;
//	}
	
	function crtCuaKhauNN(cuaKhauNNEntity) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, cuaKhauNNEntity)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Không thể tạo mới cửa khẩu nước ngoài');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function updCuaKhauNN(cuaKhauNNEntity, maCang) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI + maCang, cuaKhauNNEntity)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Không thể sửa cửa khẩu nước ngoài');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function delCuaKhauNN(selectedList) {
    	console.log("Json: " + JSON.stringify(selectedList));
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI, {params: {lstCuaKhauNN: JSON.stringify(selectedList)}})
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
    
    function searchCuaKhauNN(formData){						    	
    	console.log('Tbs_CuaKhauNNService@searchCuaKhauNN START formData:',formData);
    	var deferred = $q.defer();
    	$http({
    		headers: {'Content-Type': 'application/json;charset=utf-8'},
    		method: 'POST',
    		url: REST_SERVICE_URI + 'search',
    		data: formData
    	})
//		.success(function(data, status) {
//			console.log('Return data: ' + data);
//			deferred.resolve(data);
//		})
//		.error(function(data, status) {
//			console.error('Return data: ' + data);
//			deferred.reject(data);
//		}
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

angular.module('myApp').service('modalService',
		[ '$uibModal', function($uibModal) {

			var modalDefaults = {
				backdrop : true,
				keyboard : true,
				modalFade : true,
				animation : true,
				templateUrl : 'cuaKhaunnVnaccsEdit',
				controller : 'Tbs_CuaKhauNNController',
				controllerAs : 'self'
			};

			this.showModal = function(grid, row) {
				// Create temp objects to work with since we're in a singleton
				// service
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
				// var tempModalOptions = {};

				// Map angular-ui modal custom defaults to modal defaults
				// defined in service
				angular.extend(tempModalDefaults, modalDefaults);

				return $uibModal.open(tempModalDefaults).result;
			};

		} ]);
