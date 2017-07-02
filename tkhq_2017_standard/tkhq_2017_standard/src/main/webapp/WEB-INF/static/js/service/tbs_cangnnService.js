/**
 * Service of model TBS_CANGNN_VNACCS
 */
'use strict';

App.factory('Tbs_CangNNService', [ '$http', '$q', 'contextPath','$httpParamSerializerJQLike', Tbs_CangNNService ]);
function Tbs_CangNNService($http, $q, contextPath, $httpParamSerializerJQLike) {

	var REST_SERVICE_URI = contextPath + '/tbs_cangnn_vnaccs/';
	console.log(REST_SERVICE_URI);
	// var semaphore = false;
	var factory = {
			searchCangNN : searchCangNN,
			crtCangNN : crtCangNN,
			updCangNN : updCangNN,
			delCangNN : delCangNN,
	}

	return factory;

	function searchCangNN(formData) {
		var deferred = $q.defer();
		$http({
			headers : {
				'Content-Type' : 'application/json;charset=utf-8'
			},
			method : 'POST',
			url : REST_SERVICE_URI + "Search/" ,
			data : formData
		})
//		.success(function(data, status) {
//			console.log('Return data: ' + data);
//			deferred.resolve(data);
//		}).error(function(data, status) {
//			console.error('Return data: ' + data);
//			deferred.reject(data);
//		}
		.then(function(response) {
			deferred.resolve(response.data);
			},
			function(errorResponse) {
				console.error('Return data & status: ' + errorResponse.data + " " + errorResponse.status);
				deferred.reject(errorResponse.status);
			}
		);
		return deferred.promise;
	}
	function crtCangNN(cangNNEntity) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, cangNNEntity)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Không thể tạo mới cang nước ngoài');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function updCangNN(cangNNEntity, maCang) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI + maCang, cangNNEntity)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Không thể sửa cang nước ngoài');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
	
	function delCangNN(selectedList) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI, {params: {lstCangNN: JSON.stringify(selectedList)}})
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
}

angular.module('myApp').service('modalService',
		[ '$uibModal', function($uibModal) {

			var modalDefaults = {
				backdrop : true,
				keyboard : true,
				modalFade : true,
				animation : true,
				
				controller : 'Tbs_CangNNController',
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