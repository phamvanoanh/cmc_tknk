/**
 * Controller of TBD_KetXuatTNHT
 */

'use strict';

var myApp = angular.module('myApp');

myApp.controller('ketXuatTNHTController', 
  				['$scope',
  				 '$window',
  				 '$uibModal',
  				 '$PopupMessage',
  				 'contextPath',
  				 'ketXuatTNHTService',
  				  function ($scope,
  				  			$window,
  				  			$uibModal,
  				  			$PopupMessage,
  				  			contextPath,
  				  			ketXuatTNHTService) {

  	var DA_PHE_DUYET = 1;
  	var KHONG_PHE_DUYET = 0;
  	var CHO_PHE_DUYET = 2;

  	$scope.listData = [];
  	$scope.tuNgay = "";
  	$scope.denNgay = "";

  	$scope.strListId = "";
  	$scope.strListLoaiHangHoaKx = "";
  	$scope.showReport = false;
  	$scope.showModal = false;
  	$scope.isDisabled = false;
  	$scope.message = "";
  	var username = "";
  	
  	$scope.listKetXuat = [];
  	
  	$scope.numPerPage = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 5;
	$scope.totalPage = [];
	
	var dto = {
		maHq : "",
		tenHq: "",
		userId: "",
		userName: "",
	};

  	init();
  	
  	//Date picker
	$scope.popup1 = {
		opened: false
	};
	
    $scope.popup2 = {
		opened: false
    };
    
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    
    $scope.DayOptions = {
        	datepickerMode: 'day',
    	    formatYear: 'yy',
    	    startingDay: 1,
    	    'show-weeks' : false
        };

  	$scope.doSearch = function () {
  		if($scope.tuNgay  === undefined && !angular.isDate($scope.tuNgay)){
			$PopupMessage.Error("Từ ngày không hợp lệ.");
			return;
		}
		
		if($scope.denNgay === undefined && ! angular.isDate($scope.denNgay)){
			$PopupMessage.Error("Đến ngày không hợp lệ.");
			return;
		}
		
  		if($scope.tuNgay === undefined  || $scope.tuNgay === null){
			$scope.tuNgay = "";
		}
		
		if ($scope.denNgay === undefined || $scope.denNgay === null){
			$scope.denNgay = "";
		}

  		if ($scope.tuNgay !== ""){
			if ($scope.tuNgay.getFullYear() < 1990){
				$PopupMessage.Error("Từ ngày lớn hơn năm 1990!");
				return;
			}
			if (!compareYear($scope.tuNgay)){
				$PopupMessage.Error("Từ ngày không hợp lệ!");
				return;
			}
			
			if (!compareMouth($scope.tuNgay)){
				$PopupMessage.Error("Từ ngày không hợp lệ!");
				return;
			}
			
			if (!compareDate($scope.tuNgay)){
				$PopupMessage.Error("Từ ngày không hợp lệ!");
				return;
			}
			
			if(!checkDateItem($scope.tuNgay)){
				$PopupMessage.Error("Từ ngày không hợp lệ.");
				return;
			}
  		}
  		if($scope.denNgay !== ""){
  			if (!compareYear($scope.denNgay)){
				$PopupMessage.Error("Đến ngày không hợp lệ!");
				return;
			}
			
			if (!compareMouth($scope.denNgay)){
				$PopupMessage.Error("Đến ngày không hợp lệ!");
				return;
			}
			
			if (!compareDate($scope.denNgay)){
				$PopupMessage.Error("Đến ngày không hợp lệ!");
				return;
			}
  			
  			if(!checkDateItem($scope.denNgay)){
  				$PopupMessage.Error("Đến ngày không hợp lệ.");
  				return;
  			}
  		}
  		if(($scope.tuNgay !== "") && ($scope.denNgay !== "")){
	  		if($scope.tuNgay.getTime() > $scope.denNgay.getTime()){
	  			$PopupMessage.Error("Từ ngày phải nhỏ hơn đến ngày.");
				return;
	  		}
  		}
  		filterAllKetXuatTNHT(username, $scope.tuNgay, $scope.denNgay);
  	}
  	
  	$scope.pheDuyet = function (trangThaiPheDuyet) {
  		if (kiemTraTrangThaiPheDuyet()){  		
  			$PopupMessage.Error($scope.message);
  		}else {
  			setDataKeXuat();
  			updateTrangThaiPheDuyet(trangThaiPheDuyet);
  		}
	}

	$scope.doExport = function (typeKetXuat) {

		if($scope.tuNgay === undefined  || $scope.tuNgay === null){
			$scope.tuNgay = "";
		}
		
		if ($scope.denNgay === undefined || $scope.denNgay === null){
			$scope.denNgay = "";
		}
		
		if ($scope.tuNgay != "" ){
			$scope.tuNgay = formatDateToString($scope.tuNgay);
  		}
  		if ($scope.denNgay != "") {
  			$scope.denNgay= formatDateToString($scope.denNgay);
  		}
  		var username  = document.getElementById('username').innerHTML;
  		ExportKetXuatNTHT(username, $scope.tuNgay, $scope.denNgay, typeKetXuat );
		
	}
	
	$scope.hideReport = function () {
		$scope.srcReport = "";	
		$scope.showReport = false;

	}

	$scope.doClose = function () {
		window.history.back();
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
		var begin = ((currentPage - 1) * $scope.numPerPage), end = begin
				+ $scope.numPerPage;
		$scope.phantrang = $scope.listData.slice(begin, end);
	};
	
	function init() {
		username  = document.getElementById('username').innerHTML;
//		GetHqByUserLogin(username);
		$scope.showReport = false;
		filterAllKetXuatTNHT(username, $scope.tuNgay, $scope.denNgay);
	}
	
	function GetHqByUserLogin(userName){
		ketXuatTNHTService.GetHqByUserLogin(userName)
			.then(
				function(deferred) {
					dto = deferred;
				},
				function (errResponse) {
					console.error('Error while fetching data');
				}
			);
	}
	
	function ExportKetXuatNTHT(userName, tuNgay, denNgay, typeKetXuat ){
		$scope.srcReport =  contextPath + "/kxTnHT/printKetXuatTNHT?" + "userName=" + userName +"&tuNgay="
							+  tuNgay +"&denNgay=" + denNgay + "&typeKetXuat=" +  typeKetXuat;
		if(typeKetXuat === 1){
			var modalInstance = $uibModal.open({
				animation : self.animationsEnabled,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				controller : 'ModalInstanceCtrl',
				templateUrl : 'ReportPheDuyetKTDL',
				windowClass : 'app-modal-window',
				resolve : {
					Url : function() {
						return $scope.srcReport
					}
				}
			});
			
		}
		
	}
	function compareYear(dateCompare){
		var currentDate = new Date();
		var dateC = new Date(dateCompare);
		if (dateC.getFullYear() > currentDate.getFullYear()){
  			return false;
		}else {
			return true;
		}
	}
	
	function compareMouth(dateCompare){
		var currentDate = new Date();
		var dateC = new Date(dateCompare);
		if ((dateC.getFullYear() === currentDate.getFullYear()) && (dateC.getMonth()+ 1) > (currentDate.getMonth() + 1)){
  			return false;
		}else {
			return true;
		}
	}
	
	function compareDate(dateCompare){
		var currentDate = new Date();
		var dateC = new Date(dateCompare);
		if((dateC.getMonth()+ 1) === (currentDate.getMonth() + 1) && compareMouth(dateC) && dateC.getDate() > currentDate.getDate()){
			return false;
		}else {
			return true;
		}
		
	}

  	function checkDateItem(dateCompare){
  		var currentDate = new Date();
  		var dateC = new Date(dateCompare);
  		if ((dateC.getMonth() + 1) > 12 || (dateC.getMonth() + 1) < 1){
  			return false;
  		}else {
  			return true;
  		}
  		
  		if(dateC.getDate() > 31 || dateC.getDate() < 1){
  			return false;
  		}else {
  			return true;
  		}
  	}
  	
	function filterAllKetXuatTNHT (userName, tuNgay, denNgay) {

		if (tuNgay != "" ){
  			tuNgay = formatDateToString(tuNgay);
  		}
  		if (denNgay != "") {
	  		denNgay = formatDateToString(denNgay);
  		}

  		ketXuatTNHTService.GetListKetXuatTNHT(userName, tuNgay, denNgay)
  			.then(
  				function(deferred) {
  					$scope.listData = deferred;
  					
  					var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
					end = begin + $scope.numPerPage;
					$scope.phantrang = $scope.listData.slice(begin, end);
					getTotalPage($scope.listData.length);
					displayKetXuatTNHT($scope.listData);
					
  					if ($scope.listData.length <= 0){
  						$scope.isDisabled = true;
  					}else {
  						$scope.isDisabled = false;
  					}
  					
  				},
  				function (errResponse) {
  					console.error('Error while fetching data');
  				}
  			);
  	}

	function updateTrangThaiPheDuyet (trangThaiPheDuyet) {
		ketXuatTNHTService.UpdateKetXuatTNHT($scope.strListId, $scope.strListLoaiHangHoaKx,trangThaiPheDuyet)
			.then(
				function (deferred) {
					if(deferred === 1) {
						var userName = document.getElementById('username').innerHTML;
						filterAllKetXuatTNHT(userName, $scope.tuNgay, $scope.denNgay);
						$PopupMessage.Success("Cập nhật trạng thái phê duyệt thành công!")
					} else if (deferred === 0){
						$PopupMessage.Error("Cập nhật trạng thái phê duyệt không thành công!");
					}
				},
				function (errResponse) {
					console.error('Error while updating data');
				}
			);
	}

	function displayKetXuatTNHT (listData) {
		for (var i = 0; i < listData.length; i++) {
			if(listData[i].trangThaiPheDuyet === DA_PHE_DUYET) {
				listData[i].trangThaiPheDuyet = "Phê duyệt";
				continue;
			} 
  			if (listData[i].trangThaiPheDuyet === KHONG_PHE_DUYET) {
  				listData[i].trangThaiPheDuyet = "Không phê duyệt";
  				continue;
  			} 
  			if (listData[i].trangThaiPheDuyet === CHO_PHE_DUYET)  {
  				listData[i].trangThaiPheDuyet = "Chờ phê duyệt";
  				continue;
  			}
  		}
  	}

	function setDataKeXuat () {
		for (var i = 0; i < $scope.listData.length; i++) {
			if ($scope.listData[i].isChecked == true) {
				$scope.strListId += $scope.listData[i].ketXuatId + ",";
				$scope.strListLoaiHangHoaKx += $scope.listData[i].loaiHangHoaKetXuat + ",";
			}

		}
	}

	function kiemTraTrangThaiPheDuyet () {
		for (var i = 0; i < $scope.listData.length; i++) {
			if ($scope.listData[i].isChecked == true) {
				if ($scope.listData[i].trangThaiPheDuyet === "Phê duyệt") {
					$scope.message = "Tập tin đã được phê duyệt";
					$scope.listData[i].isChecked = false;
	  				return true;
				}
				if ($scope.listData[i].trangThaiPheDuyet === "Không phê duyệt") {
					$scope.message = "Tập tin không được phê duyệt";
					$scope.listData[i].isChecked = false;
	  				return true;
				}
			}
		}
		return false;
	}
	
	function formatDateToString(dateCondition) {
		var date = new Date(dateCondition);
		return date.getDate() + "/" + (date.getMonth()+ 1) + "/" + date.getFullYear();
	}

}]);

myApp.controller('ModalInstanceCtrl', 
		['$scope',
		 '$window',
		 '$uibModal',
		 '$PopupMessage',
		 '$modalInstance',
		 'Url',
		  function ($scope,
		  			$window,
		  			$uibModal,
		  			$PopupMessage,
		  			$modalInstance,
		  			Url) {
			
$scope.Url = Url;
$scope.UrlPDF=Url+"&type=PDFATTACH";
$scope.cancel = function() {
	$modalInstance.dismiss('cancel');
};
}]);
