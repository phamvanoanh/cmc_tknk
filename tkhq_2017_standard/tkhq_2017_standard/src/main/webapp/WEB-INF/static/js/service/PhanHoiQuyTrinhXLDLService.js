App.factory('PhanHoiQuyTrinhXLDLService', [ '$http', '$q', 'contextPath', function($http, $q, contextPath) {
	return {
		GetManager: function () {
			var deferred = $q.defer();
			var myURL = contextPath + "/bcpt/GetManager?username=usercc1"
            $http.get(myURL)
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
            },
            GetPhanHoiSoLieuTheoChiTieuThongKe: function (loai_bc) {
    			var deferred = $q.defer();
    			var myURL = contextPath + "/bcpt/GetPhanHoiSoLieuTheoChiTieuThongKe?loai_bc="+ loai_bc
                $http.get(myURL)
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
                },
             PhanHoiSoLieuTheoChiTieuThongKe: function (param) {
    			var deferred = $q.defer();
    			var myURL = contextPath+'/bcpt/PhanHoiSoLieuTheoChiTieuThongKe';
    			console.log('PhanHoiQuyTrinhXLDLService@PhanHoiSoLieuTheoChiTieuThongKe param'+param.loai_bc+'|myURL:'+myURL);    			
    			$http({
    	    		headers: {
    	    			'Content-Type': 'application/json;charset=utf-8'
    	    		},
    	    		method: 'POST',
    	    		url: myURL+'?loai_bc='+param.loai_bc+'&noidung='+param.noidung
    	    	})
                .then(
                        function (response) {
                            deferred.resolve(response.data);
                        },
                        function(errResponse){
                            console.error('Có lỗi xảy ra:'+errResponse.data);
                            deferred.reject(errResponse);
                        }
                    );
                    
                    return deferred.promise;
                }
	}
} ]);