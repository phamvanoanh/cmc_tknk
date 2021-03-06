
'use strict';

App.factory('CanhBao_TriGia_MH_PTHS_XNKService', ['$http', '$q', 'contextPath', CanhBao_TriGia_MH_PTHS_XNKService]);
function CanhBao_TriGia_MH_PTHS_XNKService($http, $q, contextPath){
	var REST_SERVICE_URI = contextPath+"/bcpt/";
	var REST_SERVICE_URI2 = REST_SERVICE_URI + "SoLieuTheoChiTieuThongKe05";
	
	var factory = {
	        getLstCucHQ: getLstCucHQ,
	        getLstChiCucHQ: getLstChiCucHQ,
	        getLstChuong: getLstChuong,
	        getLstNhom: getLstNhom,
	        getTTCanhBaoTriGiaMHXNK: getTTCanhBaoTriGiaMHXNK,
	        doExport: doExport,
	        doPrint: doPrint
	};
	
	return factory;
	
	function getTTCanhBaoTriGiaMHXNK(param){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI2 + '?maCucHQ=' + param['maCucHQ'] + '&maChicucHQ=' + param['maChiCucHQ']
        	+ '&trangthai=' + param['trangthai'] + '&nhx=' + param['nhx'] + '&chuong=' + param['chuong']
        	+ '&nhom=' + param['nhom'])
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin cảnh báo');
                deferred.reject(errResponse);
            }
        );
        
        return deferred.promise;
	}
	
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
	
	function getLstNhom(chuong){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'GetNhom?chuong=' + chuong)
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
	
	function doExport(param){
		console.log(param);
		
		$http({
    		headers: {
    			'Content-Type': 'application/json;charset=utf-8',
    			'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    		},
    		method: 'POST',
    		url: contextPath + '/bcpt/CanhBaoTGMHTPTHS/doExport',
    		data: JSON.stringify(param),
    		responseType: 'arraybuffer'
    	})
    	.then(
			function (response) {
    		var fileName = "Cảnh báo bất thường của diễn biến về trị giá mặt hàng theo phân tổ HS 02, 04 số_" 
    			+ (new Date()).getTime() + ".xls";
    		
    	    var blob = new Blob([response.data], {
    	        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    	    });
    	    saveAs(blob, fileName);
		},
		function(errResponse){
			console.log("Can't download file with error: " + errResponse);
		});
	}
	
	function doPrint(){
		
	}
	
}