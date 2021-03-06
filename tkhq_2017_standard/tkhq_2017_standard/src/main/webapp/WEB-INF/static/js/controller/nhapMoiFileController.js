'use strict';
var myApp = angular.module('myApp');

myApp.controller('nhapMoiFileController', ['$scope',
											'$PopupMessage',
											'$uibModal',
											'$location',
											'nhapMoiFileService',
											function($scope,
												$PopupMessage,
												$uibModal,
												$location,
												nhapMoiFileService){
	$scope.listTotal = [];
	$scope.listCounty = [];
	$scope.listNhapMoiFiles = []
	$scope.country = {
			"maNuoc" 	: "",
			"tenNuoc" 	: ""	
		};
	$scope.nam = "";
	$scope.luongThang = 0;
	$scope.triGiaThang = 0;
	$scope.luongLuyKe = 0;
	$scope.triGiaLuyKe = 0;
	
	$scope.numPerPage = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 5;
	$scope.totalPage = [];
	
	$scope.chuDe = "";
	$scope.typeNhapXuat = "";
	
	init();
	
	$scope.insertThongTinNhapMoi = function(){
		InsertThongTinNhapMoi();		
	}
	$scope.xoaThongTinNhapMoi = function() {
		XoaThongTinNhapMoi();
	}
	
	$scope.doClose = function() {
		window.history.back();
	}
	
	$scope.popup3 = {
		opened: false
	};
	
	$scope.open3 = function() {
		console.log("Open date picker");
	    $scope.popup3.opened = true;
	};
	
	$scope.yearOptions = {            	    
	    formatYear: 'yyyy',   
	    startingDay: 1,
	    minMode: 'year'
	};      
	
	$scope.dateOptions = {            	    
		format: 'dd/MM/yyyy',            	    
	    startingDay: 1,
	    'show-weeks' : false        	   
	};
	
	function init() {
		
		
		var path = $location.absUrl().split("/");
		$scope.chuDe = path[path.length-2];
		$scope.typeNhapXuat =  path[path.length-1];
		
		getListNhapMoiFiles($scope.chuDe, $scope.typeNhapXuat);
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
		$scope.phantrang = $scope.listNhapMoiFiles.slice(begin, end);
	};

	function getListNhapMoiFiles(chuDe, typeNhapXuat) {
		nhapMoiFileService.getListNhapMoiFiles(chuDe, typeNhapXuat)
		.then(
				function(deferred) {
					$scope.listTotal = deferred;
					settingDisplayData($scope.listTotal);
				},
				function (errResponse) {
					console.error('Error while fetching data');
				}
			);	
	}
	
	function settingDisplayData(listTotal) {
		$scope.listCounty = listTotal[0];
		$scope.listNhapMoiFiles = listTotal[1];
		var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
		end = begin + $scope.numPerPage;
		$scope.phantrang = $scope.listNhapMoiFiles.slice(begin, end);
		getTotalPage($scope.listNhapMoiFiles.length);
	}
	
	function InsertThongTinNhapMoi() {
		
		if(!validateThang($scope.thang)){
			$PopupMessage.Error("Hãy lựa chọn tháng");
			return;
		}
		
		if(!validateYear($scope.nam)){
			$PopupMessage.Error("Hãy nhập năm.");
			return;
		}
		
		if($scope.nam === undefined){
			$PopupMessage.Error("Năm không hợp lệ.");
			return;
		}
		if($scope.nam !== "" && $scope.nam.getFullYear() > new Date().getFullYear()){
			$PopupMessage.Error("Năm không hợp lệ.");
			return;
		}
		
		if($scope.tenQuocGia === "" || $scope.tenQuocGia === undefined){
			$PopupMessage.Error("Hãy lựa chọn quốc gia.");
			return;
		}
		
		if(!validateOtherInfo($scope.luongThang)){
			$PopupMessage.Error("Thông tin lượng tháng phải là số nguyên");
			return;
		}
		
		if(!validateOtherInfo($scope.triGiaThang)){
			$PopupMessage.Error("Thông tin trị giá tháng phải là số nguyên");
			return;
		}
		
		if(!validateOtherInfo($scope.luongLuyKe)){
			$PopupMessage.Error("Thông tin lượng lũy kế phải là số nguyên");
			return;
		}
		
		if(!validateOtherInfo($scope.triGiaLuyKe)){
			$PopupMessage.Error("Thông tin trị giá lũy kế phải là số nguyên");
			return;
		}
		
		var thongTinEntity = thietLapThongTin();
		nhapMoiFileService.insertThongTinNhapMoi(thongTinEntity)
			.then(
					function(deferred){
						if(deferred === 1){
							getListNhapMoiFiles($scope.chuDe, $scope.typeNhapXuat);
							reload();
							$PopupMessage.Success("Cập nhật thành công");
							console.log("Creating data successfully!");
						} else {
							$PopupMessage.Error("Cập nhật không thành công.");
							console.error('Error while creating data!');
						}
					},
					function(errResponse){
						console.error('Error while creating data!');
					}
				);
	}

	function thietLapThongTin() {
		var thongTinEntity = {};
		if ($scope.chuDe == "1") {
			thongTinEntity.chuDe = "Dầu thô";
		}else {
			thongTinEntity.chuDe = "Phương tiện xuất nhập cảnh";
		}
		thongTinEntity.thang			= $scope.thang;
		thongTinEntity.nam 				= $scope.nam.getFullYear();
		thongTinEntity.tenNuoc			= $scope.tenQuocGia;
		thongTinEntity.luongThang 		= $scope.luongThang;
		thongTinEntity.triGiaThang  	= $scope.triGiaThang; 
		thongTinEntity.luongLuyKe		= $scope.luongLuyKe; 
		thongTinEntity.triGiaLuyKe		= $scope.triGiaLuyKe;
		thongTinEntity.typeNhapXuat 	= $scope.typeNhapXuat;
		return thongTinEntity;
	}
	
	function XoaThongTinNhapMoi (){
		$PopupMessage.Confirm('Bạn có chắc muốn xóa dữ liệu', reload, null);
	}
	
	function reload() {
		$scope.thang = "";
		$scope.nam = "";
		$scope.tenQuocGia = "";
		$scope.tenPhuongTien = 0;
		$scope.luongThang = 0;
		$scope.triGiaThang = 0;
		$scope.luongLuyKe = 0;
		$scope.triGiaLuyKe = 0;
	}
	
	function validateYear(year) {
		if (year === ""){
			return false;
		}else{
			return true;
		}
	}
	
	function validateThang(thang){
		if (thang === "" || thang === undefined){
			return false;
		}else{
			return true;
		}
	}
	
	function validateOtherInfo(giaTri){
		if(giaTri < 0){
			return false;
		}else {
			return true
		}
	}
}]);
