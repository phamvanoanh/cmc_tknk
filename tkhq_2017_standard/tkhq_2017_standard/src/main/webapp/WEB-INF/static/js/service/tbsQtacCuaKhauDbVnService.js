/**
 * Created by cmcsoft on 6/2/2017.
 */

App.factory('tbsQuyTacService',['$http','$q', 'contextPath' , tbsQuyTacService]);

function tbsQuyTacService($http, $q, contextPath) {
    'use strict';
    var factory = {
        GetListTbsQuyTacCuaKhauDbVn: GetListTbsQuyTacCuaKhauDbVn,
        GetTbsQuyTacCuaKhauDbVnById: GetTbsQuyTacCuaKhauDbVnById,
        DoAddTbsQuyTacCuaKhauDbVn: DoAddTbsQuyTacCuaKhauDbVn,
        DoDeleteTbsQuyTacCuaKhauDbVn: DoDeleteTbsQuyTacCuaKhauDbVn,
        DoUpdateTbsQuyTacCuaKhauDbVn: DoUpdateTbsQuyTacCuaKhauDbVn,
        SearchTbsQuyTacCuaKhauDbVn : SearchTbsQuyTacCuaKhauDbVn,
        DoUploadFile : DoUploadFile,
    };

    return factory;
    
    
    function DoUploadFile(fileUpload) {
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append('fileUpLoad', fileUpload);
		var url = contextPath + "/uploadFileCkDbVn",formData;
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

    function GetListTbsQuyTacCuaKhauDbVn(currentPage, pageSize) {
        var deferred = $q.defer();
        $http.get(contextPath + "/tbsQuyTacCuaKhauDbVn" + "?currentPage=" + currentPage + "&pageSize=" + pageSize)
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
    function DoAddTbsQuyTacCuaKhauDbVn(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/add/tbsQuyTacCuaKhauDbVn", data)
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

    function DoDeleteTbsQuyTacCuaKhauDbVn(id) {
        var deferred = $q.defer();
        $http.get(contextPath + "/delete/tbsQuyTacCuaKhauDbVn?" + "id="+ id)
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
    function DoUpdateTbsQuyTacCuaKhauDbVn(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/update/tbsQuyTacCuaKhauDbVn", data)
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

    function GetTbsQuyTacCuaKhauDbVnById(id) {
        var deferred = $q.defer();
        $http.get(contextPath + "/tbsQuyTacCuaKhauDbVnById?" + "id="+ id)
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

    function SearchTbsQuyTacCuaKhauDbVn(data) {
        var deferred = $q.defer();
        $http.post(contextPath + "/search/tbsQuyTacCuaKhauDbVn", data)
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
}