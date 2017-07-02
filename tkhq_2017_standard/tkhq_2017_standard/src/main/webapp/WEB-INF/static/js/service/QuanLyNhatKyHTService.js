/**
 * Service of model QLNKHT.
 * 
 */

'use strict';
App.factory('quanLyNhatKyHTService',['$http','$q', 'contextPath',quanLyNhatKyHTService]);

function quanLyNhatKyHTService($http, $q, contextPath) {
	
	var factory = {
		GetListNhatKyHeThong	: GetListNhatKyHeThong,
		ExportNhatKyHT  		: ExportNhatKyHT,
		GetCucHQ		 		: GetCucHQ
	};

	return factory;

	function GetListNhatKyHeThong(tuNgay, denNgay, tenDangNhap, maDonVi) {
		var deferred = $q.defer();
		$http.get(contextPath + "/lisNhatKyHT?" + "&tuNgay="+ tuNgay +
															"&denNgay=" + denNgay + 
															"&tenDangNhap=" + tenDangNhap + 
															"&maDonVi=" + maDonVi)
			.then(
				function(response) {
					deferred.resolve(response.data)
				},
				function (errResponse) {
					console.log("Có lỗi xảy ra trong khi lấy thông tin");
					deferred.reject(errResponse);
				}
		);
		return deferred.promise;
	}
	
	function ExportNhatKyHT(typeKetXuat, tuNgay, denNgay, tenDangNhap, maDonVi) {
		var deferred = $q.defer();
		$http.get(contextPath + "/exportNhatKyHT?" + "&typeKetXuat="+ typeKetXuat +
															"&tuNgay="+ tuNgay +
															"&denNgay=" + denNgay + 
															"&tenDangNhap=" + tenDangNhap + 
															"&maDonVi=" + maDonVi)
			.then (
				function (response) {
					deferred.resolve(response.data);
				},
				function (errResponse) {
					console.log("Có lỗi xảy ra trong khi kết xuất thông tin ra file.");
					deferred.reject(errResponse);	
				}
		);
		return deferred.promise;
	}

	function GetCucHQ() {
        var deferred = $q.defer();
        $http.get(contextPath+'/bcpt/GetCustom')
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Có lỗi xảy ra trong khi get HQ');
                deferred.reject(errResponse);
            }
        );
        
        return deferred.promise;
    }
}