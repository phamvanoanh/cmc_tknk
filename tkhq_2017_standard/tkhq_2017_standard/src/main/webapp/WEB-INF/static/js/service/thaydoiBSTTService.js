'use strict';

App.factory('ThaydoiBSTTService', ['$http', '$q', 'contextPath', ThaydoiBSTTService]);
function ThaydoiBSTTService($http, $q, contextPath){
	var REST_SERVICE_URI = contextPath+"/bcpt/";
	
	var factory = {
	        getLstCucHQ: getLstCucHQ,
	        getLstChiCucHQ: getLstChiCucHQ,
	        getLstMatHang: getLstMatHang,
	        getThaydoiBSTT: getThaydoiBSTT,
	        doExport: doExport,
	        doPrint: doPrint
	    };
	
	return factory;
	
	function getThaydoiBSTT(param){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'XemThayDoi/DoSDBSThongTin' + '?maCucHQ=' + param['maCucHQ'] + '&maChicucHQ=' 
    		+ param['maChiCucHQ'] + '&nhx=' + param['nhx'] + '&ma_hang=' + param['ma_hang'] + '&loai_ky=' + param['loai_ky']
        	+ '&tu_ngay=' + param['tu_ngay'] + '&den_ngay=' + param['den_ngay'] + '&ky=' + param['ky']
        	+ '&thang=' + param['thang'] + '&nam=' + param['nam'])
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thay đổi BSTT nhập và cập nhật');
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
	
	function getLstMatHang(loaiHinh){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'DSMatHangChuYeuMATHKE?nhx=' + loaiHinh)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin mặt hàng');
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
    		url: contextPath + '/XemThayDoi/doExport',
    		data: JSON.stringify(param),
    		responseType: 'arraybuffer'
    	})
    	.then(
            function (response) {
            	var fileName = "Thay đổi do Bổ sung thông tin nhập và cập nhật_" + (new Date()).getTime() + ".xls";
        		
        	    var blob = new Blob([response.data], {
        	        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        	    });
        	    saveAs(blob, fileName);
            },
            function(errResponse){
            	console.error("Can't download file with error: " + errResponse.data);
            }
        );
	}
	
	function doPrint(){
		
	}
	
}