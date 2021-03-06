/**
 * 
 */

'use strict';

App.factory('CanhBao_TriGia_MH_PTHS_BDService', ['$http', '$q', 'contextPath', CanhBao_TriGia_MH_PTHS_BDService]);
function CanhBao_TriGia_MH_PTHS_BDService($http, $q, contextPath){
	var REST_SERVICE_URI = contextPath+"/bcpt/";
	var REST_SERVICE_URI2 = REST_SERVICE_URI + "SoLieuTheoChiTieuThongKe05";
	
	var factory = {
	        getLstCucHQ: getLstCucHQ,
	        getLstChiCucHQ: getLstChiCucHQ,
	        getLstChuong: getLstChuong,
	        getLstNhom: getLstNhom
	};
	
	return factory;
	
	function getLstCucHQ(){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'GetCustom')
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin cục');
                deferred.reject(errResponse);
            }
        );
        
        return deferred.promise;
	}
	
	function getLstChiCucHQ(maCucHQ){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'GetSubCustom?maCucHQ=' + maCucHQ)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin chi cục');
                deferred.reject(errResponse);
            }
        );
        
        return deferred.promise;
	}
	
	function getLstChuong(){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'GetChuong')
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin chương');
                deferred.reject(errResponse);
            }
        );
        
        return deferred.promise;
	}
	
	function getLstNhom(){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'GetNhom')
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin nhóm');
                deferred.reject(errResponse);
            }
        );
        
        return deferred.promise;
	}
}