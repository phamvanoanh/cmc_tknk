/**
 * Service of model TBS_BIEUTHUE
 * 
 */

'use strict';

App.factory('thayDoiBoSungToKhaiHeThongService',['$http','$q','contextPath', '$httpParamSerializerJQLike', thayDoiBoSungToKhaiHeThongService]);
function thayDoiBoSungToKhaiHeThongService($http, $q, contextPath, $httpParamSerializerJQLike){

	var REST_SERVICE_URI_CUCHQ = contextPath+'/bcpt/GetCustom';//contextPath + '/tbs_cuakhaunn_vnaccs/';
	var REST_SERVICE_URI_CHICUCHQ = contextPath+'/bcpt/GetSubCustom';
	var REST_SERVICE_URI_MATHANG = contextPath+'/bcpt/DSMatHangChuYeuMATHKE';
	var REST_SERVICE_URI_XEMTHAYDOI = contextPath+'/bcpt/XemThayDoi/DoBSTK';
	var semaphore = false;
	

	var factory = {
//		fetchAllBieuThues : fetchAllBieuThues,
//		crtCuaKhauNN: crtCuaKhauNN,
//		updCuaKhauNN: updCuaKhauNN,
//		delCuaKhauNN: delCuaKhauNN,
		GetCucHQ:GetCucHQ,
    	GetChiCucHQByCuc: GetChiCucHQByCuc,
    	GetlstMatHang: GetlstMatHang,
		searchCuaKhauNN: searchCuaKhauNN,
		doExport: doExport
	};

	return factory;

	 function GetCucHQ() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI_CUCHQ)
	            .then(
	            function (response) {
//	            	console.log('Service@response:'+response+'|response.data:'+response.data);
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
        $http.get(REST_SERVICE_URI_CHICUCHQ+'?maCucHQ='+ maCuc)
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
    
    function GetlstMatHang(data) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI_MATHANG +'?nhx='+data)
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
    
    function searchCuaKhauNN(maCucHQ, maChicucHQ, nhx, ma_hang, loai_ky, ky, thang, nam, fromDate, toDate){						    	
    	var deferred = $q.defer();
    	
    	var myURI = REST_SERVICE_URI_XEMTHAYDOI +'?maCucHQ='+maCucHQ+'&maChicucHQ='+maChicucHQ+'&nhx='+nhx
		+'&ma_hang='+ma_hang+'&loai_ky='+loai_ky;
    	if(loai_ky == 'NG'){
    		myURI += '&tu_ngay='+fromDate+'&den_ngay='+toDate;
    	} else if(loai_ky == 'KY'){
    		myURI += '&ky='+ky+'&thang='+thang+'&nam='+nam;
    	} else if(loai_ky == 'TH'){
    		myURI += '&thang='+thang+'&nam='+nam;
    	}
    	console.log(myURI);
    	
        $http.get(myURI)
        		//contextPath+'/bcpt/XemThayDoi/DoBSTK?maCucHQ=01&maChicucHQ=01DD&nhx=N&ma_hang=6102&loai_ky=KY&ky=1&thang=1&nam=2017')
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
    
    function doExport(param, nhx){
		console.log('thayDoiBoSungToKhaiHeThongService@doExport param'+param);
		
		$http({
    		headers: {
    			'Content-Type': 'application/json;charset=utf-8'
    		},
    		method: 'POST',
    		url: contextPath + '/doExport/thaydoibosungtokhaihethong?nhx='+nhx,
    		data: param,
    		responseType: 'arraybuffer'
    	})
    	.then(
            function (response) {
    		var fileName = "thayDoiBoSungToKhaiHeThong_" + (new Date()).getTime() + ".xls";
    		
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
				// var tempModalOptions = {};

				// Map angular-ui modal custom defaults to modal defaults
				// defined in service
				angular.extend(tempModalDefaults, modalDefaults);

				return $uibModal.open(tempModalDefaults).result;
			};

		} ]);
