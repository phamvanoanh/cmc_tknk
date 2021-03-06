/**
 * Service of model TBS_BIEUTHUE
 * 
 */

'use strict';

App.factory('dienBienXNKVanTaiService',['$http','$q','contextPath', '$httpParamSerializerJQLike', dienBienXNKVanTaiService]);
function dienBienXNKVanTaiService($http, $q, contextPath, $httpParamSerializerJQLike){

	var REST_SERVICE_URI_CUCHQ = contextPath+'/bcpt/GetCustom';//contextPath + '/tbs_cuakhaunn_vnaccs/';
	var REST_SERVICE_URI_CHICUCHQ = contextPath+'/bcpt/GetSubCustom';
	var REST_SERVICE_URI_NHOMPTVT = contextPath+'/bcpt/GetGroupTransport';
	var REST_SERVICE_URI_PTVT = contextPath+'/bcpt/GetTransport';
	var REST_SERVICE_URI_SOLIEUCHITIEUTK13 = contextPath+'/bcpt/SoLieuTheoChiTieuThongKe13';
	var semaphore = false;

	var factory = {
		GetSoLieuChiTieuTK13:GetSoLieuChiTieuTK13,
		GetCucHQ:GetCucHQ,
    	GetChiCucHQByCuc: GetChiCucHQByCuc,
    	GetNhomPTVT:GetNhomPTVT,
    	GetPTVTByNhom: GetPTVTByNhom,
    	doExport : doExport
	};

	return factory;
	
	function GetSoLieuChiTieuTK13(trangThai, nhx, cucHQ, chiCucHQ, nhomPTVT, PTVT) {
        var deferred = $q.defer();
        console.log('Service GetSoLieuChiTieuTK13@trangThai:' + trangThai + "|nhx:" + nhx 
        		+ "|cucHQ:" + cucHQ+ "|chiCucHQ:" + chiCucHQ + "|nhomPTVT:" + nhomPTVT+ "|PTVT:" + PTVT);
        var chiCuc = "";
        if(chiCucHQ != null && chiCucHQ != ''){
        	chiCuc = "&maChicucHQ=" + chiCucHQ;
        }
        var maPtvt = "";
        if(PTVT != null && PTVT != ''){
        	maPtvt = "&transport=" + PTVT;
        }
        var urlAPI = REST_SERVICE_URI_SOLIEUCHITIEUTK13+"?nhx="+nhx+"&trangthai="+trangThai
		+"&maCucHQ="+cucHQ+chiCuc+"&group_transport="+nhomPTVT+maPtvt;
        console.log('Service GetSoLieuChiTieuTK13@urlAPI:'+urlAPI);
        $http.get(urlAPI)        		
            .then(
            function (response) {
            	console.log('Service@response:'+response);//+'|response.data:'+response.data[0].group_data[0].data_ky.data[0].ky);
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
	    
	    function GetNhomPTVT() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI_NHOMPTVT)
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

	    function GetPTVTByNhom(maNhom) {
	        var deferred = $q.defer();
	        console.log('GetPTVTByNhom@maCuc:'+maNhom);
	        $http.get(REST_SERVICE_URI_PTVT+'?maNhomPTVT='+ maNhom)
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
			console.log('dienBienXNKVanTaiService@doExport param'+param);
			
			$http({
	    		headers: {
	    			'Content-Type': 'application/json;charset=utf-8',
	    			'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	    		},
	    		method: 'POST',
	    		url: contextPath + '/doExport/dienBienXNKVanTai',
	    		data: JSON.stringify(param),
	    		responseType: 'arraybuffer'
	    	})
	    	.then(
	            function (response) {
	    		var fileName = "dienBienXNKVanTai_" + (new Date()).getTime() + ".xls";
	    		
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
