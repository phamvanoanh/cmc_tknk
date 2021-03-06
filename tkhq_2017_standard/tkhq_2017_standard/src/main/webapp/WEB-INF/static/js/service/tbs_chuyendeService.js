/**
 * Service of model TBS_CHUYENDE
 */
'use strict';

App.factory('Tbs_ChuyenDeService', [ '$http', '$q', 'contextPath',
		'$httpParamSerializerJQLike', Tbs_ChuyenDeService ]);
function Tbs_ChuyenDeService($http, $q, contextPath, $httpParamSerializerJQLike) {

	console.log('sss');
	var REST_SERVICE_URI = contextPath + '/tbs_chuyende/';
	console.log(REST_SERVICE_URI);
	// var semaphore = false;
	var factory = {
			searchChuyenDe : searchChuyenDe,
			crtChuyenDe : crtChuyenDe,
			updChuyenDe : updChuyenDe,
			delChuyenDe : delChuyenDe,
	}

	return factory;

	function searchChuyenDe(formData) {
		console.log('Tbs_ChuyenDeService@searchChuyenDe START:');
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
	function crtChuyenDe(chuyenDeEntity) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, chuyenDeEntity)
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
	
	function updChuyenDe(chuyenDeEntity, maCDe) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI + maCDe, chuyenDeEntity)
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
	
	function delChuyenDe(selectedList) {
    	console.log("Json: " + JSON.stringify(selectedList));
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI, {params: {lstChuyenDe: JSON.stringify(selectedList)}})
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
				//templateUrl : 'chuyendeEdit',
				controller : 'Tbs_ChuyenDeController',
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