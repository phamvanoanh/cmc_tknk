/**
 * Thay đổi do bổ sung thông tin nhập và cập nhật
 */

'use strict';

angular.module('myApp').controller('ThaydoiBSTTController', ThaydoiBSTTController);
ThaydoiBSTTController.$inject = ['$rootScope','$scope', 'ThaydoiBSTTService', '$PopupMessage', '$filter'];

function ThaydoiBSTTController($rootScope, $scope, ThaydoiBSTTService, $PopupMessage, $filter) {
	var self = this;
	
	//$scope.tabActiveIndex = 0;
	
	$scope.lstCucHQ = [];
	$scope.lstChiCucHQ = [];
	$scope.lstMatHang = [];
	$scope.lstLoaiKy = [
        {id: "NG", name: "Từ ngày...Đến ngày"},
        {id: "KY", name: "Kỳ"},
        {id: "TH", name: "Tháng"}
    ];
	$scope.lstMonth = [];
	$scope.lstYear = [];
	$scope.lstTTBS = [];
	
	self.cucHQSelected = null;
	self.chiCucHQSelected = null;
	self.matHangSelected = null;
	self.loaiKySelected = 'NG';
	self.fromDate = '';
	self.toDate = '';
	self.kySelected = '';
	self.kyThangSelected = '';
	self.kyYearSelected = '';
	self.fromMonth = '';
	
	$scope.loaiHinh = 'X';
	$scope.showDay = true;
	$scope.showKy = false;
	$scope.showMonth = false;
	$scope.showDataTable = false;
	
	//Date picker
	$scope.popup1 = {
		opened: false
	};
    $scope.popup2 = {
		opened: false
    };
    $scope.popup3 = {
		opened: false
	};
    
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    $scope.open3 = function() {
        $scope.popup3.opened = true;
    };
    
    $scope.DayOptions = {
    	datepickerMode: 'day',
	    formatYear: 'yy',
	    startingDay: 1,
	    'show-weeks' : false
    };
	
	function initComponent(){
		//Reset value
		self.cucHQSelected = null;
		self.chiCucHQSelected = null;
		self.matHangSelected = null;
		self.loaiKySelected = 'NG';
		$scope.showDay = true;
		$scope.showKy = false;
		$scope.showMonth = false;
		$scope.showDataTable = false;
		
		$scope.lstCucHQ = [];
		$scope.lstChiCucHQ = [];
		$scope.lstMatHang = [];
		
		ThaydoiBSTTService.getLstCucHQ()
			.then(
				function (deferred) {
					$scope.lstCucHQ = deferred;
                },
                function (errResponse) {
                    console.error(errResponse);
                }
			);
		ThaydoiBSTTService.getLstMatHang($scope.loaiHinh)
			.then(
				function (deferred) {
					$scope.lstMatHang = deferred;
                },
                function (errResponse) {
                    console.error(errResponse);
                }	
			);
		
		$scope.lstMonth = [];
		for(var i = 1; i <= 12; i++){
			$scope.lstMonth.push(
				{ id: i, name: i}
			);
		}
		
		$scope.lstYear = [];
		for (var i = (new Date()).getFullYear(); i >= 2012; i--) {
			$scope.lstYear.push(
				{ id: i, name: i}
			);
		}
	}
	
	$scope.changeCucHQ = function(){
		console.log("Selected item: " + self.cucHQSelected);
		ThaydoiBSTTService.getLstChiCucHQ(self.cucHQSelected)
			.then(
				function (deferred) {
					$scope.lstChiCucHQ = deferred;
                },
                function (errResponse) {
                    console.error(errResponse);
                }
			);
	};
	
	$scope.changeTab = function(index){
		console.log("Tab selected: " + index);
		if(index == 0){
			$scope.loaiHinh = 'X';
			initComponent();
		}
		else if(index == 1){
			$scope.loaiHinh = 'N';
			initComponent();
		}else{
			console.error("No tab index found!");
		}
	};
	
	$scope.changeTG = function(){
		if(self.loaiKySelected == 'NG'){
			$scope.showDay = true;
			$scope.showKy = false;
			$scope.showMonth = false;
		}
		else if(self.loaiKySelected == 'KY'){
			$scope.showDay = false;
			$scope.showKy = true;
			$scope.showMonth = false;
		}
		else if(self.loaiKySelected == 'TH'){
			$scope.showDay = false;
			$scope.showKy = false;
			$scope.showMonth = true;
		}
		else{
			$scope.showDay = false;
			$scope.showKy = false;
			$scope.showMonth = false;
		}
	};
	
	$scope.search = function(){
		if(!checkInput()){
			return;
		}
		
    	var param = {};
    	param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
    	param["maChiCucHQ"] = self.chiCucHQSelected == null ? '' : self.chiCucHQSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["ma_hang"] = self.matHangSelected == null ? '' : self.matHangSelected;
    	param["loai_ky"] = self.loaiKySelected;
    	if(self.loaiKySelected == 'NG'){
    		var fDate = $filter('date')(self.fromDate, "dd/MM/yyyy");
    		var tDate = $filter('date')(self.toDate, "dd/MM/yyyy");
    		param["tu_ngay"] = fDate;
    		param["den_ngay"] = tDate;
    		param["ky"] = '';
    		param["thang"] = '';
    		param["nam"] = '';
    	}
    	else if(self.loaiKySelected == 'KY'){
    		param["ky"] = self.kySelected;
    		param["thang"] = self.kyThangSelected;
    		param["nam"] = self.kyYearSelected;
    		param["tu_ngay"] = '';
    		param["den_ngay"] = '';
    	}
    	else if(self.loaiKySelected == 'TH'){
    		var month = $filter('date')(self.fromMonth, "MMyyyy");
    		param["ky"] = '';
    		param["thang"] = $filter('limitTo')(month, 2);
    		param["nam"] = $filter('limitTo')(month, 4, month.length - 4);;
    		param["tu_ngay"] = '';
    		param["den_ngay"] = '';
    	}
    	
    	$rootScope.showLoading = true;
    	
    	ThaydoiBSTTService.getThaydoiBSTT(param)
    		.then(function(response){
    				console.log("Respone received: " +  response);
    				$scope.lstTTBS = response;
    				
    				$scope.showDataTable = true;
    				$rootScope.showLoading = false;
    			},
    			function(errResponse){
    				console.error(errResponse);
    				if(errResponse == 404){
    					$scope.lstTTBS = [];
    				}
    				$scope.showDataTable = true;
    				$rootScope.showLoading = false;
    			}
    		);
	};
	
	function checkInput(){
		if(self.loaiKySelected == 'NG'){
			if(typeof self.fromDate == 'undefined' || typeof self.toDate == 'undefined'){
				angular.element(document.querySelector('#messageErrorArea')).text('Sai định dạng ngày.');
				$scope.showError == true;
				return false;
			}
			
			if(self.fromDate != '' && self.fromDate != null && self.toDate != '' && self.toDate != null){
				var fromDate = new Date(self.fromDate);
				var toDate = new Date(self.toDate);
				
				if(fromDate > toDate){
					angular.element(document.querySelector('#messageErrorArea')).text('Ngày bắt đầu phải nhỏ hơn ngày kết thúc.');
					$scope.showError == true;
					return false;
				}
			}
			
			if(self.fromDate == '' || self.fromDate == null || self.toDate == '' || self.toDate == null){
				angular.element(document.querySelector('#messageErrorArea')).text('Chưa nhập thời gian bắt đầu và thời gian kết thúc.');
				$scope.showError == true;
				return false;
			}
		}
		else if(self.loaiKySelected == 'TH'){
			if(typeof self.fromMonth == 'undefined'){
				angular.element(document.querySelector('#messageErrorArea')).text('Sai định dạng tháng.');
				$scope.showError == true;
				return false;
			}
			
			if(self.fromMonth == '' || self.fromMonth == null){
				angular.element(document.querySelector('#messageErrorArea')).text('Chưa nhập tháng.');
				$scope.showError == true;
				return false;
			}
		}
		
		angular.element(document.querySelector('#messageErrorArea')).text('');
		$scope.showError == false;
		return true;
	}
	
	$scope.doExport = function(){
		var param = {};
    	param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
    	param["maChiCucHQ"] = self.chiCucHQSelected == null ? '' : self.chiCucHQSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["ma_hang"] = self.matHangSelected == null ? '' : self.matHangSelected;
    	param["loai_ky"] = self.loaiKySelected;
    	if(self.loaiKySelected == 'NG'){
    		var fDate = $filter('date')(self.fromDate, "dd/MM/yyyy");
    		var tDate = $filter('date')(self.toDate, "dd/MM/yyyy");
    		param["tu_ngay"] = fDate;
    		param["den_ngay"] = tDate;
    		param["ky"] = '';
    		param["thang"] = '';
    		param["nam"] = '';
    	}
    	else if(self.loaiKySelected == 'KY'){
    		param["ky"] = self.loaiKySelected;
    		param["thang"] = self.kyThangSelected;
    		param["nam"] = self.kyYearSelected;
    		param["tu_ngay"] = '';
    		param["den_ngay"] = '';
    	}
    	else if(self.loaiKySelected == 'TH'){
    		var month = $filter('date')(self.fromMonth, "MMyyyy");
    		param["ky"] = '';
    		param["thang"] = $filter('limitTo')(month, 2);
    		param["nam"] = $filter('limitTo')(month, 4, month.length - 4);;
    		param["tu_ngay"] = '';
    		param["den_ngay"] = '';
    	}
		
		ThaydoiBSTTService.doExport(param);
	};
	
	$scope.doPrint = function(){
		$scope.doExport();
	}
	
}