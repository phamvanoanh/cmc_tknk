/**
* Controller of upload file phi cau truc.
*/
'use strict';
var myApp = angular.module('myApp');

myApp.controller('displayFilePhiCauTrucController', ['$scope',
													'$PopupMessage',
													'$uibModal',
													'$location',
													'contextPath',
													'displayFilePhiCauTrucService',
													function($scope,
															$PopupMessage,
															$uibModal,
															$location,
															contextPath,
															displayFilePhiCauTrucService){

	$scope.listFilePhiCauTrucs = [];
	$scope.typeNhapXuat = "";
	$scope.isDeleteId = "";
	$scope.showReport= false;

	$scope.chuDe = "1";
	$scope.restDto = {
		"fileSize" : "",
		"fileName" : ""
	};
	
	$scope.numPerPage = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 5;
	$scope.totalPage = [];

	init();

	$scope.selectTile = function(chuDe) {
		getListFilePhiCauTruc(chuDe, $scope.typeNhapXuat);

	}

	$scope.doOpenUploadFile = function() {
		var typeNhapXuat = $scope.typeNhapXuat;
		showPopup(typeNhapXuat, $scope.chuDe);
	}
	
	function thietLapChuDe (chuDe){
		var chuDeTmp = "";
		
		if (chuDe === "1"){
			chuDeTmp = "Mặt hàng";
		}else {
			chuDeTmp = "Thị trường";
		}
		return chuDeTmp;
	}
	
	function getTotalPage(total) {
		if (total % $scope.numPerPage > 0) {
			$scope.totalPage = Math.floor(total / $scope.numPerPage) + 1;
		} else {
			$scope.totalPage = Math.floor(total / $scope.numPerPage);
		}
		if (total == 0) {
			$scope.totalPage = 1;
		}
	}
	$scope.pageChanged = function(currentPage) {
		$scope.currentPage = currentPage;
		var begin = ((currentPage - 1) * $scope.numPerPage), end = begin
				+ $scope.numPerPage;
		$scope.phantrang = $scope.listFilePhiCauTrucs.slice(begin, end);
	};
	
	function showPopup(typeNhapXuat, chuDe){
		var title = "";
		if (typeNhapXuat === 'X') {
			title = "Nhập file phi cấu trúc xuất khẩu";
		}else {
			title = "Nhập file phi cấu trúc nhập khẩu khẩu";
		}
		
		var modalInstance = $uibModal.open({
			animation: self.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'importFilePhiCauTrucHome',
			controller: 'uploadFilePhiCauTrucController',
			backdrop: 'static',
			resolve: {
				title : function() {
					return title;
				},
				typeNhapXuat : function (){
					return typeNhapXuat;
				},
				chuDe : function () {
					return chuDe;
                }
			}
		});
		modalInstance.result.then(function (data) {
		    $scope.chuDe= data.chuDe;
		    if($scope.chuDe !== null){
		        getListFilePhiCauTruc($scope.chuDe, $scope.typeNhapXuat);
		    }
		}, function () {
		    //$log.info('modal-component dismissed at: ' + new Date());
		});
	}

	$scope.doDownloadFile = function (fileId) {
		$scope.srcReport = contextPath + "/downLoadFile/?" + "fileId="+ fileId;
	}

	$scope.doDeleteFile = function (fileId) {
		$scope.isDeleteId = fileId;
		$PopupMessage.Confirm('Bạn chắc có muốn xóa bản ghi?', deleteFilePhiCauTruc, null);
		
	}

	$scope.doClose = function () {
		window.location.reload();
	};
	
	function deleteFilePhiCauTruc() {
		displayFilePhiCauTrucService.DoDeleteFile($scope.isDeleteId)
			.then(
				function(deferred) {
					if (deferred == 1) {
						getListFilePhiCauTruc($scope.chuDe, $scope.typeNhapXuat);
					}
				},
				function (errResponse) {
					console.log('Error while fetching data');
				}
			);
	}


	function init() {
		var path = $location.absUrl().indexOf("uploadFilePhiCauTrucXuatKhau");
		if(path != -1){
			$scope.typeNhapXuat = "X";
		}else {
			$scope.typeNhapXuat = "N";
		}
		getListFilePhiCauTruc($scope.chuDe, $scope.typeNhapXuat);
	}

	function getListFilePhiCauTruc(chuDe, typeNhapXuat)	{
		displayFilePhiCauTrucService.GetListFilePhiCauTruc(chuDe, typeNhapXuat)
			.then(
				function(deferred) {
					$scope.listFilePhiCauTrucs = deferred;
					var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
					end = begin + $scope.numPerPage;
					$scope.phantrang = $scope.listFilePhiCauTrucs.slice(begin, end);
					getTotalPage($scope.listFilePhiCauTrucs.length);
					
					console.log("Display data successfully");
				},
				function (errResponse) {
					console.error('Error while fetching data');
				}
			);
	}

}]);


myApp.controller('uploadFilePhiCauTrucController', ['$scope',
													'$PopupMessage',
													'$uibModal',
													'$uibModalInstance',
													'$location',
													'title',
													'typeNhapXuat',
													'chuDe',
													'displayFilePhiCauTrucService',
													 function($scope,
													 		 $PopupMessage,
													 		 $uibModal,
													 		 $uibModalInstance,
													 		 $location,
													 		 title,
													 		 typeNhapXuat,
															  chuDe,
													 		 displayFilePhiCauTrucService){

	var MAX_SIZE_ESSAY_UPLOAD = 5242880 * 2;
	$scope.disbleBtn = false;
    $scope.chuDe = "";
	 var file = "";

	init()

	$scope.doUploadFile = function() {
		file = $scope.myFile;
		
		if($scope.chuDe == ""){
			$PopupMessage.Error("Hãy chọn chủ đề.!");
			$('#chuDe').focus();
			return false;
		}
		 
		if(file === undefined){
			$PopupMessage.Error("Hãy lựa chọn file!");
			return;
		}
		
		if(file != null) { 
			if($scope.myFile.size > MAX_SIZE_ESSAY_UPLOAD){
				$PopupMessage.Error("Kích thước tệp tin tối đa là 10MB.");
				return ;
			} else if (file.size == 0){
				$PopupMessage.Error("Kích thước tệp tin tối đa là 10MB.");
				return ;
			}
		}
		
		if ($scope.moTa == "") {
			$PopupMessage.Error("Chưa nhập nội dung mô tả.!");
			$('#moTa').focus();
			return false;
		}
		
		if($scope.moTa.length > 200){
			$PopupMessage.Error("Mô tả quá dài.");
			return;
		}

        $scope.disbleBtn = false;
		var fileObject = thietLapFileObject();
		var mota = $scope.moTa;
		displayFilePhiCauTrucService.DoUploadFile(file, fileObject, mota)
		 	.then(
				function(deferred) {
					if(deferred == 1){
						init();
						$PopupMessage.Success("Tải tệp tin thành công.!");
						 console.log("Display data successfully");
					} else {
						$PopupMessage.Error("Tải tệp tin không thành công.!");
						init()
					}
				},
				function (errResponse) {
					console.error('Error while fetching data');
				}
			 );
	}
	
	$scope.readFile = function(){
		file = $scope.myFile;
		console.log(file);
	}
	
	$scope.doCancel = function () {
        var object = {
            chuDe 	: $scope.chuDe
        };
        $uibModalInstance.close(object);
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
	
	function thietLapFileObject (){
		var fileObj = {};
		fileObj.fileTitle = $scope.chuDe;
		fileObj.typeNhapXuat = $scope.typeNhapXuat;

		return fileObj;
	}

	function init(){
		$scope.title = title;
		$scope.typeNhapXuat = typeNhapXuat;
		$scope.chuDe = chuDe;
		$scope.nameFile = "Chưa chọn tệp tin";
		$scope.moTa = "";
		$('#file').val('');
	}

}]);

myApp.directive('fileModel', ['$parse', function ($parse) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs) {
         var model = $parse(attrs.fileModel);
         var modelSetter = model.assign;
         
         element.bind('change', function(){
            scope.$apply(function(){
               modelSetter(scope, element[0].files[0]);
            });
         });
      }
   };
}]);