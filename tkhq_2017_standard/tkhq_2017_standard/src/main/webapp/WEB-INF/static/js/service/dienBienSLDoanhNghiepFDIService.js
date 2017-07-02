/**
 * Service of model TBS_BIEUTHUE
 * 
 */

'use strict';

App.factory('dienBienSLDoanhNghiepFDIService',['$http','$q','contextPath', '$httpParamSerializerJQLike', dienBienSLDoanhNghiepFDIService]);
function dienBienSLDoanhNghiepFDIService($http, $q, contextPath, $httpParamSerializerJQLike){

	var REST_SERVICE_URI_CUCHQ = contextPath+'/bcpt/GetCustom';//contextPath + '/tbs_cuakhaunn_vnaccs/';
	var REST_SERVICE_URI_CHICUCHQ = contextPath+'/bcpt/GetSubCustom';
	var REST_SERVICE_URI_SOLIEUCHITIEUTK10 = contextPath+'/bcpt/SoLieuTheoChiTieuThongKe10';
	var rootApi = contextPath+"/bcpt";
	var semaphore = false;

	var factory = {
		GetSoLieuChiTieuTK10:GetSoLieuChiTieuTK10,
		GetCucHQ:GetCucHQ,
    	GetChiCucHQByCuc: GetChiCucHQByCuc,
    	doExport: doExport,
    	getMathang:getMathang
	};

	return factory;
	function getMathang (nhx) {
    	var deferred = $q.defer();
		$http.get(rootApi + "/DSMatHangChuYeu?nhx=" + nhx)
        .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra');
                deferred.reject(errResponse);
            }
        );
            
        return deferred.promise;
    }
	function GetSoLieuChiTieuTK10(trangThai, nhx, cucHQ, chiCucHQ,mathang) {
        var deferred = $q.defer();
        var chiCuc = "";
        if(chiCucHQ != null && chiCucHQ != ''){
        	chiCuc = "&maChicucHQ=" + chiCucHQ;
        }
        console.log(REST_SERVICE_URI_SOLIEUCHITIEUTK10+"?nhx="+nhx+"&trangthai="+trangThai+"&mathang="+mathang+"&maCucHQ="+cucHQ+chiCuc);
        $http.get(REST_SERVICE_URI_SOLIEUCHITIEUTK10+"?nhx="+nhx+"&trangthai="+trangThai+"&mathang="+mathang+"&maCucHQ="+cucHQ+chiCuc)
            .then(
            function (response) {
            	console.log('Service@response:'+response+'|response.data:'+response.data[0].data_ky.data[0].ky);
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin service:'+ errResponse);
                deferred.reject(errResponse);
            }
        );
                
        return deferred.promise;
    }

	 function GetCucHQ() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI_CUCHQ)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Có lỗi xảy ra trong khi lấy thông tin');
	                deferred.reject(errResponse);
	            }
	        );
	        
	        return deferred.promise;
	    }

	    function GetChiCucHQByCuc(maCuc) {
	        var deferred = $q.defer();
	        console.log('GetChiCucHQByCuc@maCuc:'+maCuc);
	        $http.get(contextPath+'/bcpt/GetSubCustom?maCucHQ='+ maCuc)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Có lỗi xảy ra trong khi lấy thông tin');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function doExport(param){
			console.log('dienBienSLDoanhNghiepFDIService@doExport param'+param);
			
			$http({
	    		headers: {
	    			'Content-Type': 'application/json;charset=utf-8',
	    			'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	    		},
	    		method: 'POST',
	    		url: contextPath + '/doExport/dienBienSLDoanhNghiepFDI',
	    		data: JSON.stringify(param),
	    		responseType: 'arraybuffer'
	    	})
	    	.then(
	            function (response) {
	    		var fileName = "dienBienSLDoanhNghiepFDI_" + (new Date()).getTime() + ".xls";
	    		
	    	    var blob = new Blob([response.data], {
	    	        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	    	    });
	    	    saveAs(blob, fileName);
			},
			function(errResponse){
				console.log("Can't download file with error: " + errResponse.data);
			});
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
				angular.extend(tempModalDefaults, modalDefaults);

				return $uibModal.open(tempModalDefaults).result;
			};

		} ]);
