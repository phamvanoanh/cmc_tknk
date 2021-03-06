/**
 * Created by cmcsoft on 6/2/2017.
 */
'use strict';
var myApp = angular.module('myApp');

myApp.controller('tbsQtacQuocgiaNghingoNkController', ['$scope',
                                                    '$PopupMessage',
                                                    'pagerService',
                                                    '$uibModal',
                                                    '$location',
                                                    'contextPath',
                                                    'tbsDmQtacService',
                                                    'tbsQtacQuocgiaNghingoNkService',
                                                    function($scope,
                                                             $PopupMessage,
                                                             pagerService,
                                                             $uibModal,
                                                             $location,
                                                             contextPath,
                                                             tbsDmQtacService,
                                                             tbsQtacQuocgiaNghingoNkService){

        $scope.listData = [];

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.pageSize = 10;
        
        $scope.isDisplay = true;
        var isSearch = false;

        var idDelete = "";

        $scope.dto = {
            id             :"",
            manuoc      : "",
            tennuoc  : "",
        }

        init();

        $scope.doSearch = function(currentPage, pageSize){
        	isSearch = true;
        	if(tbsDmQtacService.validateMa($scope.dto.manuoc)){
        		$PopupMessage.Error("Mã quốc gia không được quá 20 ký tự");
                return;
        	}
        	
        	if(tbsDmQtacService.valdateTenQuocGia($scope.dto.tennuoc)){
         		$PopupMessage.Error("Tên quốc gia không được quá 100 ký tự");
                 return;
         	}
        	
        	 search(currentPage, pageSize);
        	 isSearch = false;
        }

        $scope.pageChanged = function(currentPage){
            search(currentPage, $scope.pageSize);
        }

        $scope.doAdd = function () {
            if($scope.dto.id !== ""){
                reloadForm();
                $PopupMessage.Error("Không thể thực hiện được thao tác này.");
                return;
            }
            if(!validateMaQuocGia($scope.dto.manuoc,$scope.dto.tennuoc)){
            	return;
            }
//            valiDateTenQuocGia($scope.dto.tennuoc);
            addData($scope.dto);
        }

        $scope.doUpdate = function () {
            if($scope.dto.id === ""){
                $PopupMessage.Error("Không thể thực hiện được thao tác này.");
                return;
            }
            if(!validateMaQuocGia($scope.dto.manuoc,$scope.dto.tennuoc)){
            	return;
            }
//            valiDateTenQuocGia($scope.dto.tennuoc);
            upDateData($scope.dto);
        }

        $scope.doEditRow = function(id) {
            // check exist.
            copyData ($scope.listData ,id);
        }

        $scope.doDelete = function (id) {
            idDelete = id;
            $PopupMessage.Confirm('Ban có chắc muốn xóa bản ghi', deleteData, null);
        }
        
        function validateMaQuocGia(maQg,tenQg){
        	if (maQg === ""){
                $PopupMessage.Error("Hãy nhập mã quốc gia.");
                return false;
        	}
        	
        	if(tbsDmQtacService.validateMa(maQg)){
        		$PopupMessage.Error("Mã quốc gia không được quá 20 ký tự");
                return false;
        	}
        	
        	if (tenQg === ""){
                $PopupMessage.Error("Hãy nhập tên quốc gia!.");
                return false;
            }
            
            if(tbsDmQtacService.valdateTenQuocGia(tenQg)){
        		$PopupMessage.Error("Tên quốc gia không được quá 100 ký tự");
                return false; 
        	}
            return true;
        }
        
//        function valiDateTenQuocGia(tenQg){
//        	if (tenQg === ""){
//                $PopupMessage.Error("Hãy nhập tên quốc gia!.");
//                return;
//            }
//            
//            if(tbsDmQtacService.valdateTenQuocGia(tenQg)){
//        		$PopupMessage.Error("Tên quốc gia không được quá 100 ký tự");
//                return;
//        	}
//        }

        function getDataById(id) {
            tbsQtacQuocgiaNghingoNkService.GettbsQtacQuocgiaNghingoNkById(id)
                .then(
                    function (deferred) {
                        if(deferred !== null){
                            copyData ($scope.listData ,id);
                        }else {
                            $PopupMessage.Error("Dữ liệu đã bị xóa bởi một người sử dụng khác!");
                        }
                    },
                    function (errResponse) {
                        $PopupMessage.Error("Có lỗi trong quá trình xử lý thông tin!");
                    }

                );
        }

        function deleteData() {
            tbsQtacQuocgiaNghingoNkService.DoDeletetbsQtacQuocgiaNghingoNk(idDelete)
                .then(
                    function (deferred) {
                        if(deferred === 1){
                            $PopupMessage.Success("Xóa bỏ thông tin thành công!");
                            reloadForm();
                            $scope.currentPage =  1;
                            search($scope.currentPage, $scope.pageSize);
                        } else {
                            $PopupMessage.Error("Có lỗi trong quá trình xóa bỏ thông tin.!");
                        }
                    },
                    function (errResponse) {
                        $PopupMessage.Error("Có lỗi trong quá trình xóa bỏ thông tin.!");
                    }
                );
        }

        function addData(data) {
            tbsQtacQuocgiaNghingoNkService.DoAddtbsQtacQuocgiaNghingoNk(data)
                .then(
                    function (deferred) {
                        if(deferred === 1){
                            $PopupMessage.Success("Thêm mới thông tin thành công!");
                            reloadForm();
                            $scope.currentPage =  1;
                            search($scope.currentPage, $scope.pageSize);
                        }else {
                            $PopupMessage.Error("Có lỗi trong quá trình thêm mới thông tin.!");
                        }
                    },
                    function (errResponse) {
                        $PopupMessage.Error("Có lỗi trong quá trình thêm mới thông tin.!");
                        console.error("Có lỗi trong quá trình thêm mới thông tin.!");
                    }
                );
        }

        function upDateData(data) {
            tbsQtacQuocgiaNghingoNkService.DoUpdatetbsQtacQuocgiaNghingoNk(data)
                .then(
                    function (deferred) {
                        if(deferred === 1){
                            $PopupMessage.Success("Cập nhật thông tin thành công!");
                            $scope.currentPage =  1;
                            search($scope.currentPage, $scope.pageSize);
                        }else {
                            $PopupMessage.Error("Có lỗi trong quá trình cập nhật thông tin.!");
                        }
                    },
                    function (errResponse) {
                        $PopupMessage.Error("Có lỗi trong quá trình cập nhật thông tin.!");
                        console.error("Có lỗi trong quá trình cập nhật thông tin.!");
                    }
                );
        }

        function search(currentPage, pageSize) {
            var formData = thietLapData($scope.dto.manuoc, $scope.dto.tennuoc, currentPage, pageSize);
            tbsQtacQuocgiaNghingoNkService.SearchtbsQtacQuocgiaNghingoNk(formData)
                .then(
                    function (deferred) {
                        if (deferred.content.length > 0){
                        	$scope.isDisplay = true;
                        	$scope.listData = deferred.content;
                            $scope.totalItems = deferred.totalItems;
                            $scope.pageSize = deferred.pageSize;
                            $scope.currentPage = deferred.currentPage;
                        } else {
                        	$scope.isDisplay = false;
                            $PopupMessage.Error("Không có kết quả tìm kiếm!");
                        }
                    },
                    function (errResponse) {
                        $PopupMessage.Error("Không có kết quả tìm kiếm!");
                    }

                );
        }

        function thietLapData(manuoc, tennuoc,currentPage, pageSize) {

        	var formData = {};
          	 
            if(typeof currentPage === 'undefined' || currentPage ===''){
            	formData.currentPage = 1;
            }else {
            	formData.currentPage = currentPage;
            }
            if(typeof pageSize === 'undefined'){
            	 formData.pageSize = 10;
            }else {
            	  formData.pageSize = pageSize;
            }
            
            if(isSearch){
            	formData.manuoc = manuoc;
                formData.tennuoc = tennuoc;

           } else {
               isSearch = false;
               formData.manuoc = "";
               formData.tennuoc = "";
           }

            return formData;
        }

        function reloadForm() {
            $scope.dto = {
                id            : "",
                manuoc        : "",
                tennuoc       : "",
            }
        }
        
        function copyData (listData ,idCopy){
            for (var i = 0; i < listData.length; i++){
                if(listData[i].id === idCopy){
                    $scope.dto = angular.copy(listData[i]);
                    break;
                }
            }
        }

        function init() {
        	search($scope.currentPage,$scope.pageSize);
        }

//        function getListtbsQtacQuocgiaNghingoNk() {
//            tbsQtacQuocgiaNghingoNkService.GetListtbsQtacQuocgiaNghingoNk()
//                .then(
//                    function (deferred) {
//                        if (deferred !== null) {
//                            $scope.listData = deferred.content;
//                            $scope.totalItems = deferred.totalItems;
//                        }
//                    },
//                    function (errResponse) {
//                        console.error("Có lỗi trong quá trình lấy dữ liệu");
//                    }
//                );
//        }
    }]);