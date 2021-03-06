/**
 * Controller of upload file phi cau truc.
 */
'use strict';
var myApp = angular.module('myApp');

myApp.controller('tbsQuyTacController', ['$scope',
                                        '$PopupMessage',
                                        'pagerService',
                                        '$uibModal',
                                        '$location',
                                        'contextPath',
                                        'tbsDmQtacService',
                                        'tbsQuyTacService',
                                        function($scope,
                                                 $PopupMessage,
                                                 pagerService,
                                                 $uibModal,
                                                 $location,
                                                 contextPath,
                                                 tbsDmQtacService,
                                                 tbsQuyTacService){

        $scope.lstTbsQuyTacDb = [];

        $scope.listMaCuaKhau = [];
        $scope.listMaNuocDen = [];
        $scope.listMaCuaKhauDen = [];
        
        $scope.isDisplay = true;

        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.pageSize = 10;

        var tbsQuyTacDbId = "";
        
        var isSearch = false;
        
        $scope.dto = {
            id            :"",
            macuakhau     : "",
            manuocden     : "",
            macuakhauden  : "",
            tenCuaKhau	  : "",
            tenNuocDen	  : "",
            tenCuaKhauDen : "",
            moTa          : ""
        }

        init();

        $scope.doSearch = function(currentPage, pageSize){
        	$scope.isCollapsed = false;
        	isSearch = true;
        	if(tbsDmQtacService.validateMa($scope.dto.macuakhau)){
        		$PopupMessage.Error("Mã cửa khẩu không được quá 20 ký tự");
                return;
        	}
        	
        	if(tbsDmQtacService.validateMa($scope.dto.manuocden)){
         		$PopupMessage.Error("Mã nước đến không được quá 20 ký tự");
                 return;
         	}
        	
        	if(tbsDmQtacService.validateMa($scope.dto.macuakhauden)){
        		$PopupMessage.Error("Mã cửa khẩu đến không được quá 20 ký tự");
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
        	
        	if(!validateMaCk($scope.dto.macuakhau,$scope.dto.manuocden, $scope.dto.macuakhauden)){
        		return;
        	}
            addData($scope.dto);
        }

        $scope.doUpdate = function () {
        	if($scope.dto.id === ""){
        		$PopupMessage.Error("Không thể thực hiện được thao tác này.");
        		return;
        	}
        	if(!validateMaCk($scope.dto.macuakhau,$scope.dto.manuocden, $scope.dto.macuakhauden)){
        		return;
        	}
        	
            upDateData($scope.dto);
        }

        $scope.doEditRow = function(id) {
        	$scope.isCollapsed = false;
        	copyData ($scope.lstTbsQuyTacDb ,id);
        }

        $scope.doDelete = function (id) {
            tbsQuyTacDbId = id;
            $PopupMessage.Confirm('Ban có chắc muốn xóa bản ghi', deleteData, null);
        };
        
        $scope.doUpload = function() {
        	var file = $scope.myFile
			doUpload(file)
		};
        
        function validateMaCk(maCk, maNuocDen, maCkDen){
        	if (maCk === ""){
                $PopupMessage.Error("Hãy nhập mã cửa khẩu");
                return false;
        	}
        	
        	if(tbsDmQtacService.validateMa(maCk)){
        		$PopupMessage.Error("Mã cửa khẩu không được quá 20 ký tự");
                return false;
        	}
        	
        	if (maNuocDen === ""){
                $PopupMessage.Error("Hãy nhập mã nước đến");
                return false;
            }
            
            if(tbsDmQtacService.validateMa(maNuocDen)){
        		$PopupMessage.Error("Mã nước đến không được quá 20 ký tự");
                return false;
        	}
            
            if (maCkDen === ""){
                $PopupMessage.Error("Hãy nhập mã cửa khẩu đến đến");
                return false;
            }
            
            if(tbsDmQtacService.validateMa(maCkDen)){
        		$PopupMessage.Error("Mã cửa khẩu đến không được quá 20 ký tự");
                return false;
        	}
            return true;
        }

        function getDataById(id) {
            tbsQuyTacService.GetTbsQuyTacCuaKhauDbVnById(id)
                .then(
                    function (deferred) {
                        if(deferred !== null){
                            copyData ($scope.lstTbsQuyTacDb ,id);
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
            tbsQuyTacService.DoDeleteTbsQuyTacCuaKhauDbVn(tbsQuyTacDbId)
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
            tbsQuyTacService.DoAddTbsQuyTacCuaKhauDbVn(data)
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
            tbsQuyTacService.DoUpdateTbsQuyTacCuaKhauDbVn(data)
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
        	
            var formData = thietLapData($scope.dto.macuakhau, $scope.dto.manuocden, $scope.dto.macuakhauden,
            			$scope.dto.tenCuaKhau,$scope.dto.tenNuocDen, $scope.dto.tenCuaKhauDen, $scope.dto.moTa,currentPage, pageSize);
            
            tbsQuyTacService.SearchTbsQuyTacCuaKhauDbVn(formData)
                .then(
                    function (deferred) {
                        if (deferred.content.length > 0){
                        	$scope.isDisplay = true;
                            $scope.lstTbsQuyTacDb = deferred.content;
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
        
        function doUpload(file) {
        	tbsQuyTacService.DoUploadFile(file)
	        	.then(
	    				function(deferred) {
	    					if(deferred == 1){
	    						$PopupMessage.Success("Tải tệp tin thành công.!");
	    						init();
	    					} else {
	    						$PopupMessage.Error("Có lỗi trong quá trình xử lí thông tin.");
	    					}
	    				},
	    				function (errResponse) {
	    					console.error('Error while fetching data');
	    				}
	    			 );
			
		}
        
        function thietLapData(maCuaKhau, maNuocDen, maCuaKhauDen,tenCuaKhau, tenNuocDen, tenCuaKhauDen, moTa, currentPage, pageSize) {
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
				formData.macuakhau     = maCuaKhau;
			    formData.manuocden     = maNuocDen;
			    formData.macuakhauden  = maCuaKhauDen;
			    formData.tenCuaKhau	   = tenCuaKhau;
			    formData.tenNuocDen	   = tenNuocDen;
			    formData.tenCuaKhauDen = tenCuaKhauDen;
			    formData.moTa          = moTa;

            }else {
            	isSearch = false;
            	formData.macuakhau = "";
			    formData.manuocden = "";
			    formData.macuakhauden = "";
			    formData.tenCuaKhau	  = "",
			    formData.tenNuocDen	  = "",
			    formData.tenCuaKhauDen = "",
			    formData.moTa          = ""
            }
            
            return formData;
        }
        
        function reloadForm() {
            $scope.dto = {
            	id            :"",
                macuakhau     : "",
                manuocden     : "",
                macuakhauden  : "",
                tenCuaKhau	  : "",
                tenNuocDen	  : "",
                tenCuaKhauDen : "",
                moTa          : ""
            }
        }
        
        function getListTbsQuyTacCuaKhauDbVn(currentPage, pageSize) {
            tbsQuyTacService.GetListTbsQuyTacCuaKhauDbVn(currentPage, pageSize)
                .then(
                    function (deferred) {
                        if (deferred.content.length > 0){
                            $scope.lstTbsQuyTacDb = deferred.content;
                            $scope.totalItems = deferred.totalItems;
                        }
                    },
                    function (errResponse) {
                        console.error("Có lỗi trong quá trình lấy dữ liệu");
                    }
                );
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
        	$scope.nameFile = "Chưa chọn tệp tin";
        	search($scope.currentPage,$scope.pageSize);
        }
        
        $scope.handleFile = function(elem) {
    		var x = elem.files[0].webkitRelativePath || elem.files[0].name
    				|| elem.value.slice(elem.value.lastIndexOf("\\") + 1);
    		if (x.length > 200) {
    			$scope.nameFile = "Chưa chọn tệp tin";
    			$PopupMessage.Error("Tên tệp tin quá dài.");
    			return;
    		} else if (x.length > 40) {
    			var ex = getExtensionFile(x);
    			$scope.nameFile = x.substring(0, 10) + "..." + ex;
    		}else {
    			$scope.nameFile = x;
    		}

    	}
        
        function getExtensionFile(fileName){
    		var index =  fileName.lastIndexOf(".");
    		return fileName.substring(index);
    	}

      
}]);


