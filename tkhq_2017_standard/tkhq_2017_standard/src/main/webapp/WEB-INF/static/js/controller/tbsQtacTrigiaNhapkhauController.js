/**
 * Created by cmcsoft on 6/2/2017.
 */
'use strict';
var myApp = angular.module('myApp');

myApp.controller('tbsQtacTrigiaNhapkhauController', ['$scope',
                                                    '$PopupMessage',
                                                    'pagerService',
                                                    '$uibModal',
                                                    '$location',
                                                    'contextPath',
                                                    'tbsDmQtacService',
                                                    'tbsQtacTrigiaNhapkhauService',
                                                    function($scope,
                                                             $PopupMessage,
                                                             pagerService,
                                                             $uibModal,
                                                             $location,
                                                             contextPath,
                                                             tbsDmQtacService,
                                                             tbsQtacTrigiaNhapkhauService){

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
            trigiatinhthue  : "",
        }

        init();

        $scope.doSearch = function(currentPage, pageSize){
        	isSearch = true;
        	if(tbsDmQtacService.validateMa($scope.dto.mathongke)){
        		$PopupMessage.Error("Mã thống kê không lớn hơn 20 ký tự");
        		return;
        	}
        	if($scope.dto.trigiatinhthue !== null && !tbsDmQtacService.validateEmpty($scope.dto.trigiatinhthue)){
        		if(tbsDmQtacService.validateTriGia($scope.dto.trigiatinhthue)){
            		$PopupMessage.Error("Trị giá tính thuế không lớn hơn 14 ký tự");
            		return;
            	}
        		
        		if(tbsDmQtacService.validateDecimal($scope.dto.trigiatinhthue)){
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
            if(!checkMaSoDm($scope.dto.mathongke, $scope.dto.trigiatinhthue)){
            	return;
            }
//            checkTriGiaTt($scope.dto.trigiatinhthue);
            addData($scope.dto);
        }

        $scope.doUpdate = function () {
            if($scope.dto.id === ""){
                $PopupMessage.Error("Không thể thực hiện được thao tác này.");
                return;
            }
            if(!checkMaSoDm($scope.dto.mathongke, $scope.dto.trigiatinhthue)){
            	return;
            }
//            checkTriGiaTt($scope.dto.trigiatinhthue);
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
        
        function checkMaSoDm(maSoDm, triGiaNk){
        	if(tbsDmQtacService.validateEmpty(maSoDm)){
        		$PopupMessage.Error("Hãy nhập mã thống kê");
        		return false;
        	}
        	if(tbsDmQtacService.validateMa(maSoDm)){
        		$PopupMessage.Error("Mã thống kê không lớn hơn 20 ký tự");
        		return false;
        	}
        	
        	if(tbsDmQtacService.validateEmpty(triGiaNk)){
        		$PopupMessage.Error("Hãy nhập trị giá tính thuế");
        		return false;
        	}
        	if(tbsDmQtacService.validateTriGia(triGiaNk)){
        		$PopupMessage.Error("Trị giá tính thuế không lớn hơn 14 ký tự");
        		return false;
        	}
        	
        	if(tbsDmQtacService.validateDecimal(triGiaNk)){
    			$PopupMessage.Error("Phần thập phân không lớn hơn 2 ký tự");
    			return false;
    		}
        	
        	return true;
        }
        
//        function checkTriGiaTt(triGiaNk){
//        }

        function getDataById(id) {
            tbsQtacTrigiaNhapkhauService.GettbsQtacTrigiaNhapkhauById(id)
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
            tbsQtacTrigiaNhapkhauService.DoDeletetbsQtacTrigiaNhapkhau(idDelete)
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
            tbsQtacTrigiaNhapkhauService.DoAddtbsQtacTrigiaNhapkhau(data)
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
            tbsQtacTrigiaNhapkhauService.DoUpdatetbsQtacTrigiaNhapkhau(data)
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
            var formData = thietLapData($scope.dto.mathongke, $scope.dto.trigiatinhthue, currentPage, pageSize);
            tbsQtacTrigiaNhapkhauService.SearchtbsQtacTrigiaNhapkhau(formData)
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

        function thietLapData(mathongke, trigiatinhthue,currentPage, pageSize) {

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
	           	 formData.mathongke = mathongke;
	             formData.trigiatinhthue = trigiatinhthue;

	        } else {
	            isSearch = false;
	            formData.mathongke = "";
	            formData.trigiatinhthue = "";
	        }

            return formData;
        }

        function reloadForm() {
            $scope.dto = {
                id                   : "",
                mathongke            : "",
                trigiatinhthue       : "",
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

//        function getListtbsQtacTrigiaNhapkhau() {
//            tbsQtacTrigiaNhapkhauService.GetListtbsQtacTrigiaNhapkhau()
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