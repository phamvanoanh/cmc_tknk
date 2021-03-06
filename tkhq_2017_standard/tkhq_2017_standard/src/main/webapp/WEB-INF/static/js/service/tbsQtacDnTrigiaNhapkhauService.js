/**
 * Created by cmcsoft on 6/2/2017.
 */

App.factory('tbsQtacDnTrigiaNhapkhauService',['$http','$q', 'contextPath' , tbsQtacDnTrigiaNhapkhauService]);

function tbsQtacDnTrigiaNhapkhauService($http, $q, contextPath) {
    'use strict';
    var factory = {
        GetListTbsQtacDnTrigiaNhapkhau : GetListTbsQtacDnTrigiaNhapkhau,
        GetTbsQtacDnTrigiaNhapkhauById : GetTbsQtacDnTrigiaNhapkhauById,
        DoAddTbsQtacDnTrigiaNhapkhau   : DoAddTbsQtacDnTrigiaNhapkhau,
        DoDeleteTbsQtacDnTrigiaNhapkhau: DoDeleteTbsQtacDnTrigiaNhapkhau,
        DoUpdateTbsQtacDnTrigiaNhapkhau: DoUpdateTbsQtacDnTrigiaNhapkhau,
        SearchTbsQtacDnTrigiaNhapkhau  : SearchTbsQtacDnTrigiaNhapkhau,
        DoUploadFile				   : DoUploadFile,
    };

    return factory;
    
    function DoUploadFile(fileUpload) {
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append('fileUpLoad', fileUpload);
		var url = contextPath + "/uploadFileDnTrigiaNhapkhau",formData;
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

    function SearchTbsQtacDnTrigiaNhapkhau(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/search/tbsQtacDnTrigiaNhapkhau", data)
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

    function GetListTbsQtacDnTrigiaNhapkhau() {
        var deferred = $q.defer();
        $http.get(contextPath + "/tbsQtacDnTrigiaNhapkhau")
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
    function DoAddTbsQtacDnTrigiaNhapkhau(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/add/tbsQtacDnTrigiaNhapkhau", data)
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

    function DoDeleteTbsQtacDnTrigiaNhapkhau(id) {
        var deferred = $q.defer();
        $http.get(contextPath + "/delete/tbsQtacDnTrigiaNhapkhau?" + "id="+ id)
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
    function DoUpdateTbsQtacDnTrigiaNhapkhau(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/update/tbsQtacDnTrigiaNhapkhau", data)
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

    function GetTbsQtacDnTrigiaNhapkhauById(id) {
        var deferred = $q.defer();
        $http.get(contextPath + "tbsQtacDnTrigiaNhapkhauById?" + "id="+ id)
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