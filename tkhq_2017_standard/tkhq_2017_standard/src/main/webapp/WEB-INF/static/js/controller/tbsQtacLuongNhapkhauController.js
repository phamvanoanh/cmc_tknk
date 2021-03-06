/**
 * Created by cmcsoft on 6/2/2017.
 */
'use strict';
var myApp = angular.module('myApp');

myApp.controller('tbsQtacLuongNhapkhauController', ['$scope',
                                                    '$PopupMessage',
                                                    'pagerService',
                                                    '$uibModal',
                                                    '$location',
                                                    'contextPath',
                                                    'tbsDmQtacService',
                                                    'tbsQtacLuongNhapkhauService',
                                                    function($scope,
                                                             $PopupMessage,
                                                             pagerService,
                                                             $uibModal,
                                                             $location,
                                                             contextPath,
                                                             tbsDmQtacService,
                                                             tbsQtacLuongNhapkhauService){

        $scope.listData = [];

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.pageSize = 10;

        var idDelete = "";
        $scope.isDisplay = true;
        var isSearch = false;

        $scope.dto = {
            id             :"",
            mathongke      : "",
            luonglonnhat  : "",
        }

        init();

        $scope.doSearch = function(currentPage, pageSize){
        	isSearch = true;
        	if(tbsDmQtacService.validateMa($scope.dto.mathongke)){
        		$PopupMessage.Error("Mã thống kê không lớn hơn 20 ký tự");
        		return;
        	}
        	if($scope.dto.luonglonnhat !== null && !tbsDmQtacService.validateEmpty($scope.dto.luonglonnhat)){
        		if(tbsDmQtacService.validateTriGia($scope.dto.luonglonnhat)){
            		$PopupMessage.Error("Lượng lớn nhất không lớn hơn 14 ký tự");
            		return;
            	}
        		if(tbsDmQtacService.validateDecimal($scope.dto.luonglonnhat)){
        			$PopupMessage.Error("Phần thập phân không lớn hơn 2 ký tự");
        			return;
        		}
        		
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
            if(!checkMaTK($scope.dto.mathongke, $scope.dto.luonglonnhat)){
            	return;
            }
//            checluongLn($scope.dto.luonglonnhat);
            addData($scope.dto);
        }

        $scope.doUpdate = function () {
            if($scope.dto.id === ""){
                $PopupMessage.Error("Không thể thực hiện được thao tác này.");
                return;
            }
            if(!checkMaTK($scope.dto.mathongke, $scope.dto.luonglonnhat)){
            	return;
            }
//            checluongLn($scope.dto.luonglonnhat);
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
        
        function checkMaTK(maTk, dongialonnhat) {
        	if(tbsDmQtacService.validateEmpty(maTk)){
        		$PopupMessage.Error("Hãy nhập mã thống kê");
        		return false;
        	}
        	if(tbsDmQtacService.validateMa(maTk)){
        		$PopupMessage.Error("Mã thống kê không lớn hơn 20 ký tự");
        		return false;
        	}
        	
        	if(tbsDmQtacService.validateEmpty(dongialonnhat)){
        		$PopupMessage.Error("Hãy nhập lượng lớn nhất");
        		return false;
        	}
        	if(tbsDmQtacService.validateTriGia(dongialonnhat)){
        		$PopupMessage.Error("Lượng lớn nhất không lớn hơn 14 ký tự");
        		return false;
        	}
        	
        	if(tbsDmQtacService.validateDecimal(dongialonnhat)){
    			$PopupMessage.Error("Phần thập phân không lớn hơn 2 ký tự");
    			return false;
    		}
        	return true;
		}
        
//        function checluongLn(dongialonnhat) {
//        	if(tbsDmQtacService.validateEmpty(dongialonnhat)){
//        		$PopupMessage.Error("Hãy nhập lượng lớn nhất");
//        		return;
//        	}
//        	if(tbsDmQtacService.validateTriGia(dongialonnhat)){
//        		$PopupMessage.Error("Lượng lớn nhất không lớn hơn 18 ký tự");
//        		return;
//        	}
//		}
        
        function getDataById(id) {
            tbsQtacLuongNhapkhauService.GettbsQtacLuongNhapkhauById(id)
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
            tbsQtacLuongNhapkhauService.DoDeletetbsQtacLuongNhapkhau(idDelete)
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
            tbsQtacLuongNhapkhauService.DoAddtbsQtacLuongNhapkhau(data)
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
            tbsQtacLuongNhapkhauService.DoUpdatetbsQtacLuongNhapkhau(data)
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
            var formData = thietLapData($scope.dto.mathongke, $scope.dto.luonglonnhat, currentPage, pageSize);
            tbsQtacLuongNhapkhauService.SearchtbsQtacLuongNhapkhau(formData)
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

        function thietLapData(mathongke, luonglonnhat, currentPage, pageSize) {

        	var formData = {};
          	 
            if(typeof currentPage === 'undefined' || currentPage ===''){
            	formData.currentPage = 1;
            }else {
            	formData.currentPage = currentPage;
            }
            if(typeof pageSize == 'undefined'){
            	 formData.pageSize = 10;
            }else {
            	  formData.pageSize = pageSize;
            }
            
            if (isSearch) {
				formData.mathongke = mathongke;
				formData.luonglonnhat = luonglonnhat;
			} else {
				isSearch = false;
				formData.mathongke = "";
				formData.luonglonnhat = "";
			}

            return formData;
        }

        function reloadForm() {
            $scope.dto = {
                id            :"",
                mathongke     : "",
                luonglonnhat : "",
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

//        function getListtbsQtacLuongNhapkhau() {
//            tbsQtacLuongNhapkhauService.GetListtbsQtacLuongNhapkhau()
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