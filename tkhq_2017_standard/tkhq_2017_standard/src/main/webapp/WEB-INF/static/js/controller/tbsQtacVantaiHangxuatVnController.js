/**
 * Created by cmcsoft on 6/9/2017.
 */
'use strict';
var myApp = angular.module('myApp');

myApp.controller('tbsQtacVantaiHangxuatVnController', ['$scope',
                                                        '$PopupMessage',
                                                        'pagerService',
                                                        '$uibModal',
                                                        '$location',
                                                        'contextPath',
                                                        'tbsDmQtacService',
                                                        'tbsQtacVantaiHangxuatVnService',
                                                        function($scope,
                                                                 $PopupMessage,
                                                                 pagerService,
                                                                 $uibModal,
                                                                 $location,
                                                                 contextPath,
                                                                 tbsDmQtacService,
                                                                 tbsQtacVantaiHangxuatVnService){

        $scope.listData = [];

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.pageSize = 10;
        $scope.isDisplay = true;

        var idDelete = "";
        var isSearch = false;

        $scope.dto = {
            id                   :"",
            maphuongthucvanchuyen: "",
            macuakhauvn          : ""
        };

        init();

        $scope.doSearch = function(currentPage, pageSize){
        	isSearch = true;
        	if(tbsDmQtacService.validateMa($scope.dto.maphuongthucvanchuyen)){
        		$PopupMessage.Error("Mã phương thức vận chuyển không được quá 20 ký tự");
                return;
        	}
        	
        	if(tbsDmQtacService.validateMa($scope.dto.macuakhauvn)){
         		$PopupMessage.Error("Mã cửa khẩu trong nước không được quá 20 ký tự");
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
            if(!validateMaPtVc($scope.dto.maphuongthucvanchuyen, $scope.dto.macuakhauvn)){
            	return;
            }
//            valiDateMaCkVn($scope.dto.macuakhauvn);
            addData($scope.dto);
        }

        $scope.doUpdate = function () {
            if($scope.dto.id === ""){
                $PopupMessage.Error("Không thể thực hiện được thao tác này.");
                return;
            }
            if(!validateMaPtVc($scope.dto.maphuongthucvanchuyen, $scope.dto.macuakhauvn)){
            	return;
            }
//            valiDateMaCkVn($scope.dto.macuakhauvn);
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
        
        function validateMaPtVc(maTk, maNuoc){
        	if (maTk === ""){
                $PopupMessage.Error("Hãy nhập mã phương thức vận chuyển");
                return false;
        	}
        	
        	if(tbsDmQtacService.validateMa(maTk)){
        		$PopupMessage.Error("Mã phương thức vận chuyển không được quá 20 ký tự");
                return false;
        	}
        	if (maNuoc === ""){
                $PopupMessage.Error("Hãy nhập mã cửa khẩu trong nước.");
                return false;
            }
            
            if(tbsDmQtacService.validateMa(maNuoc)){
        		$PopupMessage.Error("Mã cửa khẩu trong nước không được quá 20 ký tự");
                return false;
        	}
            
            return true;
        }
        
        function getDataById(id) {
            tbsQtacVantaiHangxuatVnService.GettbsQtacVantaiHangxuatVnById(id)
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
            tbsQtacVantaiHangxuatVnService.DoDeletetbsQtacVantaiHangxuatVn(idDelete)
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
            tbsQtacVantaiHangxuatVnService.DoAddtbsQtacVantaiHangxuatVn(data)
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
            tbsQtacVantaiHangxuatVnService.DoUpdatetbsQtacVantaiHangxuatVn(data)
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
            var formData = thietLapData($scope.dto.maphuongthucvanchuyen, $scope.dto.macuakhauvn, currentPage, pageSize);
            tbsQtacVantaiHangxuatVnService.SearchtbsQtacVantaiHangxuatVn(formData)
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

        function thietLapData(maphuongthucvanchuyen, macuakhauvn,currentPage, pageSize) {

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
            	formData.maphuongthucvanchuyen = maphuongthucvanchuyen;
                formData.macuakhauvn = macuakhauvn;
            } else {
                isSearch = false;
                formData.maphuongthucvanchuyen = "";
                formData.macuakhauvn = "";
            }

            return formData;
        }

        function reloadForm() {
            $scope.dto = {
                id                   : "",
                maphuongthucvanchuyen: "",
                macuakhauvn          : ""
            };
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
//
//        function getListtbsQtacVantaiHangxuatVn() {
//            tbsQtacVantaiHangxuatVnService.GetListtbsQtacVantaiHangxuatVn()
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