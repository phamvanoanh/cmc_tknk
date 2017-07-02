/**
 * Service of model TBS_BIEUTHUE
 * 
 */

'use strict';

App.factory('dienBienXuTheChiSoService',['$http','$q','contextPath', '$httpParamSerializerJQLike', dienBienXuTheChiSoService]);
function dienBienXuTheChiSoService($http, $q, contextPath, $httpParamSerializerJQLike){
	var REST_SERVICE_URI_MATHANG = contextPath+'/bcpt/DSMatHangChuYeu';
	var REST_SERVICE_URI_SOLIEUCHITIEUTK07 = contextPath+'/bcpt/SoLieuTheoChiTieuThongKe07';
	
	var semaphore = false;

	var factory = {
		GetlstMatHang: GetlstMatHang,
		searchCuaKhauNN: searchCuaKhauNN,
		GetSoLieuChiTieuTK07 : GetSoLieuChiTieuTK07,
		doExport: doExport
	};

	return factory;	
	    
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
    
    function GetSoLieuChiTieuTK07(trangThai, nhx, radioBox, chiSo, loaiChiSo, matHang) {
        var deferred = $q.defer();
        console.log('Service GetSoLieuChiTieuTK07@trangThai:' + trangThai + "|nhx:" + nhx +"|radioBox" + radioBox
        		+ "|chiSo:" + chiSo+ "|loaiChiSo:" + loaiChiSo + "|matHang"+matHang);
        var mh = "&mathang=";
        if(matHang != null && matHang != ''){
        	mh = "&mathang=" + matHang;
        }
        var myURI =  REST_SERVICE_URI_SOLIEUCHITIEUTK07+"?nhx="+nhx+"&trangthai="+trangThai+"&thoigian="+radioBox
		+ "&chiso="+chiSo+"&loaichiso="+loaiChiSo+ mh;
        console.log(myURI);
        $http.get(myURI)
            .then(
            function (response) {
            	console.log('Service@response:'+response);
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin service:'+ errResponse);
                deferred.reject(errResponse);
            }
        );
                
        return deferred.promise;
    }
    
    function doExport(param){
		console.log('dienBienXuTheChiSoService@doExport param'+param);
		
		$http({
    		headers: {
    			'Content-Type': 'application/json;charset=utf-8',
    			'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    		},
    		method: 'POST',
    		url: contextPath + '/doExport/dienBienXuTheChiSo',
    		data: JSON.stringify(param),
    		responseType: 'arraybuffer'
    	})
    	.then(
            function (response) {
    		var fileName = "dienBienXuTheChiSo_" + (new Date()).getTime() + ".xls";
    		
    	    var blob = new Blob([response.data], {
    	        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    	    });
    	    saveAs(blob, fileName);
		},
		function(errResponse){
			console.log("Can't download file with error: " + errResponse.data);
		});
	}
    
    function searchCuaKhauNN(formData){						    	
    	console.log('dienBienXuTheChiSoService@searchCuaKhauNN START formData:',formData);
    	var deferred = $q.defer();
    	$http({
    		headers: {'Content-Type': 'application/json;charset=utf-8'},
    		method: 'POST',
    		url: REST_SERVICE_URI_CUCHQ + 'search',
    		data: formData
    	})
		.success(function(data, status) {
			console.log('Return data: ' + data);
			deferred.resolve(data);
		})
		.error(function(data, status) {
			console.error('Return data: ' + data);
			deferred.reject(data);
		});
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
