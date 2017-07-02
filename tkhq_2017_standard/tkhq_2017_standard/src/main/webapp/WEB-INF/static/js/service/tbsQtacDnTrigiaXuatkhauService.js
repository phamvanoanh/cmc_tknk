/**
 * Created by cmcsoft on 6/2/2017.
 */

App.factory('tbsQtacDnTrigiaXuatkhauService',['$http','$q', 'contextPath' , tbsQtacDnTrigiaXuatkhauService]);

function tbsQtacDnTrigiaXuatkhauService($http, $q, contextPath) {
    'use strict';
    var factory = {
        GetListTbsQtacDnTrigiaXuatkhau: GetListTbsQtacDnTrigiaXuatkhau,
        GetTbsQtacDnTrigiaXuatkhauById: GetTbsQtacDnTrigiaXuatkhauById,
        DoAddTbsQtacDnTrigiaXuatkhau: DoAddTbsQtacDnTrigiaXuatkhau,
        DoDeleteTbsQtacDnTrigiaXuatkhau: DoDeleteTbsQtacDnTrigiaXuatkhau,
        DoUpdateTbsQtacDnTrigiaXuatkhau: DoUpdateTbsQtacDnTrigiaXuatkhau,
        SearchTbsQtacDnTrigiaXuatkhau  : SearchTbsQtacDnTrigiaXuatkhau,
        DoUploadFile				   : DoUploadFile,
    };

    return factory;
    
    function DoUploadFile(fileUpload) {
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append('fileUpLoad', fileUpload);
		var url = contextPath + "/uploadFileDnTrigiaXuatkhau",formData;
		$http.post(url, formData,
					{
						transformRequest : angular.identity,
						headers : {
							'Content-Type': undefined,
						}
					}
			)
			.then(
				function(response) {
					deferred.resolve(response.data)	
				 },
			    function(errResponse) {
					console.log("Có lỗi xảy ra trong khi hoàn thành rà xoát ");
					deferred.resolve(errResponse.data)	
			    }
		);
		return deferred.promise;
	}
    
    function SearchTbsQtacDnTrigiaXuatkhau(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/search/tbsQtacDnTrigiaXuatkhau", data)
            .then(
                function(response) {
                    deferred.resolve(response.data)
                },
                function(errResponse) {
                    console.log("Có lỗi xảy ra trong khi hoàn thành rà xoát ");
                    deferred.resolve(errResponse.data)
                }
            );
        return deferred.promise;
    }

    function GetListTbsQtacDnTrigiaXuatkhau() {
        var deferred = $q.defer();
        $http.get(contextPath + "/tbsQtacDnTrigiaXuatkhau")
            .then(
                function(response) {
                    deferred.resolve(response.data)
                },
                function (errResponse) {
                    deferred.reject(errResponse);
                    console.log("Có lỗi xảy ra trong khi lấy thông tin");
                }
            );
        return deferred.promise;
    }
    function DoAddTbsQtacDnTrigiaXuatkhau(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/add/tbsQtacDnTrigiaXuatkhau", data)
            .then(
                function(response) {
                    deferred.resolve(response.data)
                },
                function(errResponse) {
                    console.log("Có lỗi xảy ra trong khi hoàn thành rà xoát ");
                    deferred.resolve(errResponse.data)
                }
            );
        return deferred.promise;
    }

    function DoDeleteTbsQtacDnTrigiaXuatkhau(id) {
        var deferred = $q.defer();
        $http.get(contextPath + "/delete/tbsQtacDnTrigiaXuatkhau?" + "id="+ id)
            .then(
                function(response)   {
                    deferred.resolve(response.data)
                },
                function (errResponse) {
                    deferred.reject(errResponse);
                    console.log("Có lỗi xảy ra trong khi dowload thông tin");
                }
            );
        return deferred.promise;
    }
    function DoUpdateTbsQtacDnTrigiaXuatkhau(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/update/tbsQtacDnTrigiaXuatkhau", data)
            .then(
                function(response) {
                    deferred.resolve(response.data)
                },
                function(errResponse) {
                    console.log("Có lỗi xảy ra trong khi hoàn thành rà xoát ");
                    deferred.resolve(errResponse.data)
                }
            );
        return deferred.promise;
    }

    function GetTbsQtacDnTrigiaXuatkhauById(id) {
        var deferred = $q.defer();
        $http.get(contextPath + "tbsQtacDnTrigiaXuatkhauById?" + "id="+ id)
            .then(
                function(response) {
                    deferred.resolve(response.data)
                },
                function (errResponse) {
                    deferred.reject(errResponse);
                    console.log("Có lỗi xảy ra trong khi lấy thông tin");
                }
            );
        return deferred.promise;
    }

}