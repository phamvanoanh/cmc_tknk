/**
 * 
 */

'use strict';

App.factory('CanhBao_TriGiaTTService', ['$http', '$q', 'contextPath', CanhBao_TriGiaTTService]);
function CanhBao_TriGiaTTService($http, $q, contextPath){
	var REST_SERVICE_URI = contextPath+"/bcpt/";
	var REST_SERVICE_URI2 = REST_SERVICE_URI + "SoLieuTheoChiTieuThongKe08";
	
	var factory = {
	        getLstNuoc: getLstNuoc,
	        getLstKhoiKT: getLstKhoiKT,
	        getTTCanhBaoTriGiaTTXNK: getTTCanhBaoTriGiaTTXNK,
	        doExport: doExport,
	        doPrint: doPrint
	};
	
	return factory;
	
	function getTTCanhBaoTriGiaTTXNK(param){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI2 + '?trangthai=' + param['trangthai'] + '&nhx=' + param['nhx']
        	+ '&khoi=' + param['khoi'] + '&nuoc=' + param['nuoc'])
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin diễn biến');
                deferred.reject(errResponse);
            }
        );
        
        return deferred.promise;
	}
	
	function getLstNuoc(khoi){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'GetNuoc?khoi=' + khoi)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông nước');
                deferred.reject(errResponse);
            }
        );
        
        return deferred.promise;
	}
	
	function getLstKhoiKT(){
		var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + 'GetKhoi')
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi lấy thông tin khối KT');
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
    		url: contextPath + '/bcpt/CanhBaoTGTT/doExport',
    		data: JSON.stringify(param),
    		responseType: 'arraybuffer'
    	})
    	.then(
			function (response) {
    		var fileName = "Diễn biến và xu thế trị giá của thị trường, khối liên kết kinh tế khu vực_" 
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