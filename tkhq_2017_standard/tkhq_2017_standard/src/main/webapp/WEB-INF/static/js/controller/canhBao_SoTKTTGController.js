/**
 * 
 */

'use strict';

angular.module('myApp').controller('CanhBao_SoTKTTGController', CanhBao_SoTKTTGController);
CanhBao_SoTKTTGController.$inject = ['$rootScope', '$scope', '$filter', 'CanhBao_SoTKTTGService', '$uibModal', '$PopupMessage',
     '$timeout', 'contextPath'];

function CanhBao_SoTKTTGController($rootScope, $scope, $filter, CanhBao_SoTKTTGService, $uibModal, $PopupMessage,
		$timeout, contextPath) {
	var self = this;
	self.loai_bc = '14';
	
	$scope.lstCucHQ = [];
	$scope.lstChiCucHQ = [];
	
	$scope.lstLoaiNgay = [
      { id: 'LV', name: 'Làm việc'},
      {id: 'NG', name: 'Ngày nghỉ'},
      {id: 'ALL', name: 'Ngày làm việc và ngày nghỉ'}
	];
	
	$scope.lstTG = [
      { id: 'NG', name: 'Ngày'},
      {id: 'TU', name: 'Tuần'},
      {id: 'TH', name: 'Tháng'},
      {id: 'QU', name: 'Quý'},
      {id: 'NA', name: 'Năm'}
	];
	$scope.lstWeek = [
    ];
	$scope.lstYear = [
    ];
	
	$scope.lstWarnSoTKTTG = [];
	
	self.cucHQSelected = null;
	self.chiCucHQSelected = null;
	self.loaiNgaySelected = null;
	self.thoigianSelected = null;
	
	self.fweekSelected = '';
	self.fweekYearSelected = '';
	self.tweekSelected = '';
	self.tweekYearSelected = '';
	self.fQuarterSelected = '';
	self.fQuarterYearSelected = '';
	self.tQuarterSelected = '';
	self.tQuarterYearSelected = '';
	
	self.fromDate = '';
	self.toDate = '';
	self.fromMonth = '';
	self.toMonth = '';
	self.year = '';
	
	$scope.loaiHinh = 'X';
	$scope.rbLoaiKy = {value: 'ky'};
	
	$scope.showDataTable = false;
	$scope.showDay = false;
	$scope.showWeek = false;
	$scope.showMonth = false;
	$scope.showQuarter = false;
	$scope.showYear = false;
	$scope.showChart = false;
	$scope.showGrid = true;
	$scope.showButton = true;
	$scope.btnDisable = true;
	
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
    $scope.popup4 = {
		opened: false
    };
    $scope.popup5 = {
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
    $scope.open4 = function() {
        $scope.popup4.opened = true;
    };
    $scope.open5 = function() {
        $scope.popup5.opened = true;
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
		$scope.lstCucHQ = [];
		$scope.lstChiCucHQ = [];
		$scope.lstWarnSoTKTTG = [];
		
		$scope.showDataTable = false;
		$scope.showChart = false;
		$scope.showGrid = true;
		$scope.btnDisable = true;
		
		$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
		
		CanhBao_SoTKTTGService.getLstCucHQ()
			.then(
				function (deferred) {
					$scope.lstCucHQ = deferred;
                },
                function (errResponse) {
                    console.error(errResponse);
                }
			);
		
		$scope.lstWeek = [];
		for(var i = 1; i <= 53; i++){
			$scope.lstWeek.push(
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
		if (self.cucHQSelected != "00") {
		CanhBao_SoTKTTGService.getLstChiCucHQ(self.cucHQSelected)
			.then(
				function (deferred) {
					$scope.lstChiCucHQ = deferred;
                },
                function (errResponse) {
                    console.error(errResponse);
                }
			);
		} else{
			$scope.lstChiCucHQ = null;
		}
	};
	
	$scope.changeTG = function(){
		resetAllTG();
		if(self.thoigianSelected == 'NG'){
			$scope.showDay = true;
			$scope.showWeek = false;
			$scope.showMonth = false;
			$scope.showQuarter = false;
			$scope.showYear = false;
		}
		else if(self.thoigianSelected == 'TU'){
			$scope.showWeek = true;
			$scope.showDay = false;
			$scope.showMonth = false;
			$scope.showQuarter = false;
			$scope.showYear = false;
		}
		else if(self.thoigianSelected == 'TH'){
			$scope.showMonth = true;
			$scope.showDay = false;
			$scope.showWeek = false;
			$scope.showQuarter = false;
			$scope.showYear = false;
		}
		else if(self.thoigianSelected == 'QU'){
			$scope.showQuarter = true;
			$scope.showDay = false;
			$scope.showWeek = false;
			$scope.showMonth = false;
			$scope.showYear = false;
		}
		else if(self.thoigianSelected == 'NA'){
			$scope.showYear = true;
			$scope.showDay = false;
			$scope.showWeek = false;
			$scope.showMonth = false;
			$scope.showQuarter = false;
		}
		else{
			$scope.showDay = false;
			$scope.showWeek = false;
			$scope.showMonth = false;
			$scope.showQuarter = false;
			$scope.showYear = false;
		}
	}
	
	function resetAllTG(){
		self.fweekSelected = '';
		self.fweekYearSelected = '';
		self.tweekSelected = '';
		self.tweekYearSelected = '';
		self.fQuarterSelected = '';
		self.fQuarterYearSelected = '';
		self.tQuarterSelected = '';
		self.tQuarterYearSelected = '';
		
		self.fromDate = '';
		self.toDate = '';
		self.fromMonth = '';
		self.toMonth = '';
		self.year = '';
	}
	
	$scope.changeTab = function(index){
		console.log("Tab selected: " + index);
		if(index == 0){
			$scope.loaiHinh = 'X';
			initComponent();
		}
		else if(index == 1){
			$scope.loaiHinh = 'N';
			initComponent();
		}
		else if(index == 2){
			$scope.loaiHinh = 'NX';
			initComponent();
		}
		else{
			console.error("No tab index found!");
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
    	param["loai_ngay"] = self.loaiNgaySelected == null ? '' : self.loaiNgaySelected;
    	param["thoi_gian"] = self.thoigianSelected == null ? '' : self.thoigianSelected;
    	if(self.thoigianSelected == 'NG'){
    		console.log("Từ ngày: " + self.fromDate + " Đến ngày: " + self.toDate);
    		var fDate = $filter('date')(self.fromDate, "ddMMyyyy");
    		var tDate = $filter('date')(self.toDate, "ddMMyyyy");
    		param["tu_thoigian"] = fDate;
    		param["den_thoigian"] = tDate;
    		param["tu_nam"] = $filter('limitTo')(fDate, 4, fDate.length - 4);
        	param["den_nam"] = $filter('limitTo')(tDate, 4, tDate.length - 4);
    	}
    	else if(self.thoigianSelected == 'TU'){
    		param["tu_thoigian"] = self.fweekSelected;
    		param["den_thoigian"] = self.tweekSelected;
    		param["tu_nam"] = self.fweekYearSelected;
        	param["den_nam"] = self.tweekYearSelected;
    	}
    	else if(self.thoigianSelected == 'TH'){
    		var fMonth = $filter('date')(self.fromMonth, "MMyyyy");
    		var tMonth = $filter('date')(self.toMonth, "MMyyyy");
    		param["tu_thoigian"] = $filter('limitTo')(fMonth, 2);
    		param["den_thoigian"] = $filter('limitTo')(tMonth, 2);
    		param["tu_nam"] = $filter('limitTo')(fMonth, 4, fMonth.length - 4);
        	param["den_nam"] = $filter('limitTo')(tMonth, 4, tMonth.length - 4);
    	}
    	else if(self.thoigianSelected == 'QU'){
    		param["tu_thoigian"] = self.fQuarterSelected;
    		param["den_thoigian"] = self.tQuarterSelected;
    		param["tu_nam"] = self.fQuarterYearSelected;
        	param["den_nam"] = self.tQuarterYearSelected;
    	}
    	else if(self.thoigianSelected == 'NA'){
    		var year = $filter('date')(self.year, "yyyy");
    		param["tu_thoigian"] = year;
    		param["den_thoigian"] = year;
    		param["tu_nam"] = year;
        	param["den_nam"] = year;
    	}
    	else{
    		param["tu_thoigian"] = '';
    		param["den_thoigian"] = '';
    		param["tu_nam"] = '';
        	param["den_nam"] = '';
    	}
    	
    	$rootScope.showLoading = true;
    	
    	CanhBao_SoTKTTGService.getTTCanhBaoSoTKTTG(param)
    		.then(function(response){
    				$scope.lstWarnSoTKTTG = response;
    				
    				if(self.thoigianSelected == 'TU' || self.thoigianSelected == 'TH' || self.thoigianSelected == 'QU'){
	    				var dataKy;
	    				var min, max;
	    				for(var i = 0; i < $scope.lstWarnSoTKTTG.length; i++){
	    					for(var k = 0; k < $scope.lstWarnSoTKTTG[i].group_data.length; k++){
		    					dataKy = $scope.lstWarnSoTKTTG[i].group_data[k].data_ky.data;
		    					min = dataKy[0].gia_tri;
		    					max = dataKy[0].gia_tri;
		    					
		    					for(var j = 0; j < dataKy.length; j++){
		    						if(dataKy[j].gia_tri != null && parseFloat(min) > parseFloat(dataKy[j].gia_tri)){
		    							min = dataKy[j].gia_tri;
		    						}
		    						
		    						if(parseFloat(max) < parseFloat(dataKy[j].gia_tri)){
		    							max = dataKy[j].gia_tri;
		    						}
		    					}
		    					
		    					for(var j = 0; j < dataKy.length; j++){
		    						if(max == dataKy[j].gia_tri){
		    							angular.extend(dataKy[j], {background: 'bg_red'});
		    						}
		    						if(min == dataKy[j].gia_tri){
		    							angular.extend(dataKy[j], {background: 'bg_yellow'});
		    						}   						
		    					}
	    					}
	    				}
    				}
    				
    				$scope.showDataTable = true;
    				$rootScope.showLoading = false;
    				
    				if($scope.lstWarnSoTKTTG.length == 0){
    					$scope.btnDisable = true;
    				}
    				else{
    					$scope.btnDisable = false;
    				}
    			},
    			function(errResponse){
    				console.error(errResponse);
    				$scope.lstWarnSoTKTTG = [];
    				$scope.showDataTable = true;
    				$rootScope.showLoading = false;
    				$scope.btnDisable = true;
    			}
    		);
	};
	
	function checkInput(){
		var regexDay = /^\d{2}\/\d{2}\/\d{4}$/;
		var regexMonth = /^\d{2}\/\d{4}$/;
		var regexYear = /^\d{4}$/;
		if(self.thoigianSelected == 'NG'){
			if(!regexDay.test($filter('date')(self.fromDate, "dd/MM/yyyy"))
				|| !regexDay.test($filter('date')(self.toDate, "dd/MM/yyyy"))){
				angular.element(document.querySelector('#messageErrorArea')).text('Sai định dạng ngày.');
				$scope.showError == true;
				return false;
			}
		}
		else if(self.thoigianSelected == 'TH'){
			if(!regexMonth.test($filter('date')(self.fromMonth, "MM/yyyy"))
				|| !regexMonth.test($filter('date')(self.toMonth, "MM/yyyy"))){
				angular.element(document.querySelector('#messageErrorArea')).text('Sai định dạng tháng.');
				$scope.showError == true;
				return false;
			}
		}
		else if(self.thoigianSelected == 'NA'){
			if(!regexYear.test($filter('date')(self.year, "yyyy"))){
				angular.element(document.querySelector('#messageErrorArea')).text('Sai định dạng năm.');
				$scope.showError == true;
				return false;
			}
		}
		
//		if(self.cucHQSelected == null || typeof self.cucHQSelected == 'undefined' || self.cucHQSelected == ''){
//			angular.element(document.querySelector('#messageErrorArea')).text('Trường Cục Hải quan là bắt buộc.');
//			$scope.showError == true;
//			
//			return false;
//		}
		
		angular.element(document.querySelector('#messageErrorArea')).text('');
		$scope.showError == false;
		return true;
	}
	
	$scope.showFeedback = function(){
//		var modalInstance = $uibModal.open({
//			animation: true,
//			ariaLabelledBy: 'modal-title',
//			ariaDescribedBy: 'modal-body',
//			size: 'lg',
//			templateUrl: '',
//			controller: 'feedbackQTXLDLModalCtrl',
//			controllerAs: 'self',
//			resolve: {
//			}
//		});
//		
//		modalInstance.result.then(function (data) {
//				
//		    }, function () {
//		    	
//		    });
	};
	
	$scope.doExport = function(){
		var param = {};
    	param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
    	param["maChiCucHQ"] = self.chiCucHQSelected == null ? '' : self.chiCucHQSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["loai_ngay"] = self.loaiNgaySelected == null ? '' : self.loaiNgaySelected;
    	param["thoi_gian"] = self.thoigianSelected == null ? '' : self.thoigianSelected;
    	if(self.thoigianSelected == 'NG'){
    		var fDate = $filter('date')(self.fromDate, "ddMMyyyy");
    		var tDate = $filter('date')(self.toDate, "ddMMyyyy");
    		param["tu_thoigian"] = fDate;
    		param["den_thoigian"] = tDate;
    		param["tu_nam"] = $filter('limitTo')(fDate, 4, fDate.length - 4);
        	param["den_nam"] = $filter('limitTo')(tDate, 4, tDate.length - 4);
    	}
    	else if(self.thoigianSelected == 'TU'){
    		param["tu_thoigian"] = self.fweekSelected;
    		param["den_thoigian"] = self.tweekSelected;
    		param["tu_nam"] = self.fweekYearSelected;
        	param["den_nam"] = self.tweekYearSelected;
    	}
    	else if(self.thoigianSelected == 'TH'){
    		var fMonth = $filter('date')(self.fromMonth, "MMyyyy");
    		var tMonth = $filter('date')(self.toMonth, "MMyyyy");
    		param["tu_thoigian"] = $filter('limitTo')(fMonth, 2);
    		param["den_thoigian"] = $filter('limitTo')(tMonth, 2);
    		param["tu_nam"] = $filter('limitTo')(fMonth, 4, fMonth.length - 4);
        	param["den_nam"] = $filter('limitTo')(tMonth, 4, tMonth.length - 4);
    	}
    	else if(self.thoigianSelected == 'QU'){
    		param["tu_thoigian"] = self.fQuarterSelected;
    		param["den_thoigian"] = self.tQuarterSelected;
    		param["tu_nam"] = self.fQuarterYearSelected;
        	param["den_nam"] = self.tQuarterYearSelected;
    	}
    	else if(self.thoigianSelected == 'NA'){
    		var year = $filter('date')(self.year, "yyyy");
    		param["tu_thoigian"] = year;
    		param["den_thoigian"] = year;
    		param["tu_nam"] = year;
        	param["den_nam"] = year;
    	}
    	else{
    		param["tu_thoigian"] = '';
    		param["den_thoigian"] = '';
    		param["tu_nam"] = '';
        	param["den_nam"] = '';
    	}
    	
    	CanhBao_SoTKTTGService.doExport(param);
	};
	
	$scope.doPrint = function() {
		$scope.doExport();
	};
	
	$scope.showChartInfo = function(){
		$scope.showChart = true;
		$scope.showGrid = false;
		
		$timeout(function(){
			var param = {};
	    	param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
	    	param["maChiCucHQ"] = self.chiCucHQSelected == null ? '' : self.chiCucHQSelected;
	    	param["nhx"] = $scope.loaiHinh;
	    	param["loai_ngay"] = self.loaiNgaySelected == null ? '' : self.loaiNgaySelected;
	    	param["thoi_gian"] = self.thoigianSelected == null ? '' : self.thoigianSelected;
	    	
	    	if(self.thoigianSelected == 'NG'){
	    		var fDate = $filter('date')(self.fromDate, "ddMMyyyy");
	    		var tDate = $filter('date')(self.toDate, "ddMMyyyy");
	    		param["tu_thoigian"] = fDate;
	    		param["den_thoigian"] = tDate;
	    		param["tu_nam"] = $filter('limitTo')(fDate, 4, fDate.length - 4);
	        	param["den_nam"] = $filter('limitTo')(tDate, 4, tDate.length - 4);
	        	
	        	//Khong ve bieu do
	        	$scope.showData = false;
	        	return;
	    	}
	    	else if(self.thoigianSelected == 'TU'){
	    		param["tu_thoigian"] = self.fweekSelected;
	    		param["den_thoigian"] = self.tweekSelected;
	    		param["tu_nam"] = self.fweekYearSelected;
	        	param["den_nam"] = self.tweekYearSelected;
	    	}
	    	else if(self.thoigianSelected == 'TH'){
	    		var fMonth = $filter('date')(self.fromMonth, "MMyyyy");
	    		var tMonth = $filter('date')(self.toMonth, "MMyyyy");
	    		param["tu_thoigian"] = $filter('limitTo')(fMonth, 2);
	    		param["den_thoigian"] = $filter('limitTo')(tMonth, 2);
	    		param["tu_nam"] = $filter('limitTo')(fMonth, 4, fMonth.length - 4);
	        	param["den_nam"] = $filter('limitTo')(tMonth, 4, tMonth.length - 4);
	    	}
	    	else if(self.thoigianSelected == 'QU'){
	    		param["tu_thoigian"] = self.fQuarterSelected;
	    		param["den_thoigian"] = self.tQuarterSelected;
	    		param["tu_nam"] = self.fQuarterYearSelected;
	        	param["den_nam"] = self.tQuarterYearSelected;
	    	}
	    	else if(self.thoigianSelected == 'NA'){
	    		var year = $filter('date')(self.year, "yyyy");
	    		param["tu_thoigian"] = year;
	    		param["den_thoigian"] = year;
	    		param["tu_nam"] = year;
	        	param["den_nam"] = year;
	    	}
	    	else{
	    		param["tu_thoigian"] = '';
	    		param["den_thoigian"] = '';
	    		param["tu_nam"] = '';
	        	param["den_nam"] = '';
	    	}
	    	
	    	var api = contextPath + "/bcpt/CanhBaoSoTKTTG/doChart?maCucHQ=" + param["maCucHQ"]
		    	+ "&maChicucHQ=" + param["maChiCucHQ"] + '&nhx=' + param['nhx'] + '&loai_ngay=' + param['loai_ngay']
	    		+ '&thoi_gian=' + param['thoi_gian'] + '&tu_thoigian=' + param['tu_thoigian'] + '&den_thoigian='
	    		+ param['den_thoigian'] + '&tu_nam=' + param['tu_nam'] + '&den_nam=' + param['den_nam'];
	    	$scope.srcBieuDoSLTK = api;
	    	
	    	var api2 = contextPath + "/bcpt/CanhBaoSoTKTTG/doChart2?maCucHQ=" + param["maCucHQ"]
	    	+ "&maChicucHQ=" + param["maChiCucHQ"] + '&nhx=' + param['nhx'] + '&loai_ngay=' + param['loai_ngay']
			+ '&thoi_gian=' + param['thoi_gian'] + '&tu_thoigian=' + param['tu_thoigian'] + '&den_thoigian='
			+ param['den_thoigian'] + '&tu_nam=' + param['tu_nam'] + '&den_nam=' + param['den_nam'];
	    	$scope.srcBieuDoSLDongHang = api2;
		
	    	var iframe, iframe2;
			iframe = document.getElementById('frReportXNK');
			iframe.src = iframe.src;
			iframe2 = document.getElementById('frReportXNK2');
			iframe2.src = iframe2.src;
			
			$scope.showData = true;
		}, 500);
	};
	
	$scope.closeChart = function(){
		$scope.showChart = false;
		$scope.showGrid = true;
	};
	
	$scope.searchChart = function(){
		if(!checkInput()){
			return;
		}
		
		var param = {};
    	param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
    	param["maChiCucHQ"] = self.chiCucHQSelected == null ? '' : self.chiCucHQSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["loai_ngay"] = self.loaiNgaySelected == null ? '' : self.loaiNgaySelected;
    	param["thoi_gian"] = self.thoigianSelected == null ? '' : self.thoigianSelected;
    	
    	if(self.thoigianSelected == 'NG'){
    		var fDate = $filter('date')(self.fromDate, "ddMMyyyy");
    		var tDate = $filter('date')(self.toDate, "ddMMyyyy");
    		param["tu_thoigian"] = fDate;
    		param["den_thoigian"] = tDate;
    		param["tu_nam"] = $filter('limitTo')(fDate, 4, fDate.length - 4);
        	param["den_nam"] = $filter('limitTo')(tDate, 4, tDate.length - 4);
        	
        	//Khong ve bieu do
        	$scope.showData = false;
        	return;
    	}
    	else if(self.thoigianSelected == 'TU'){
    		param["tu_thoigian"] = self.fweekSelected;
    		param["den_thoigian"] = self.tweekSelected;
    		param["tu_nam"] = self.fweekYearSelected;
        	param["den_nam"] = self.tweekYearSelected;
    	}
    	else if(self.thoigianSelected == 'TH'){
    		var fMonth = $filter('date')(self.fromMonth, "MMyyyy");
    		var tMonth = $filter('date')(self.toMonth, "MMyyyy");
    		param["tu_thoigian"] = $filter('limitTo')(fMonth, 2);
    		param["den_thoigian"] = $filter('limitTo')(tMonth, 2);
    		param["tu_nam"] = $filter('limitTo')(fMonth, 4, fMonth.length - 4);
        	param["den_nam"] = $filter('limitTo')(tMonth, 4, tMonth.length - 4);
    	}
    	else if(self.thoigianSelected == 'QU'){
    		param["tu_thoigian"] = self.fQuarterSelected;
    		param["den_thoigian"] = self.tQuarterSelected;
    		param["tu_nam"] = self.fQuarterYearSelected;
        	param["den_nam"] = self.tQuarterYearSelected;
    	}
    	else if(self.thoigianSelected == 'NA'){
    		var year = $filter('date')(self.year, "yyyy");
    		param["tu_thoigian"] = year;
    		param["den_thoigian"] = year;
    		param["tu_nam"] = year;
        	param["den_nam"] = year;
    	}
    	else{
    		param["tu_thoigian"] = '';
    		param["den_thoigian"] = '';
    		param["tu_nam"] = '';
        	param["den_nam"] = '';
    	}
    	
    	var api = contextPath + "/bcpt/CanhBaoSoTKTTG/doChart?maCucHQ=" + param["maCucHQ"]
	    	+ "&maChicucHQ=" + param["maChiCucHQ"] + '&nhx=' + param['nhx'] + '&loai_ngay=' + param['loai_ngay']
    		+ '&thoi_gian=' + param['thoi_gian'] + '&tu_thoigian=' + param['tu_thoigian'] + '&den_thoigian='
    		+ param['den_thoigian'] + '&tu_nam=' + param['tu_nam'] + '&den_nam=' + param['den_nam'];
    	$scope.srcBieuDoSLTK = api;
    	
    	var api2 = contextPath + "/bcpt/CanhBaoSoTKTTG/doChart2?maCucHQ=" + param["maCucHQ"]
    	+ "&maChicucHQ=" + param["maChiCucHQ"] + '&nhx=' + param['nhx'] + '&loai_ngay=' + param['loai_ngay']
		+ '&thoi_gian=' + param['thoi_gian'] + '&tu_thoigian=' + param['tu_thoigian'] + '&den_thoigian='
		+ param['den_thoigian'] + '&tu_nam=' + param['tu_nam'] + '&den_nam=' + param['den_nam'];
    	$scope.srcBieuDoTGTK = api2;
	
    	var iframe, iframe2;
		iframe = document.getElementById('frReportXNK');
		iframe.src = iframe.src;
		iframe2 = document.getElementById('frReportXNK2');
		iframe2.src = iframe2.src;
		
		$scope.showData = true;
	};
}

angular.module('myApp').controller('feedbackQTXLDLModalCtrl', feedbackQTXLDLModalCtrl);
feedbackQTXLDLModalCtrl.$inject = ['$scope', '$uibModalInstance', 'CanhBao_SoTKTTGService', '$PopupMessage']
function feedbackQTXLDLModalCtrl($scope, $uibModalInstance, CanhBao_SoTKTTGService, $PopupMessage) {
	var self = this;
	self.content = '';
	self.manager = null;
	self.lstManager = [];
	self.lstFeedbackInfo = [];

	self.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	self.doFeedbackInfo = function(){
//		var param = {};
//		param["content"] = self.content;
//		param["manager"] = self.manager;
//		
//		CanhBaoSLToKhaiXNKService.doFeedbackInfo(param)
//			.then(function(response){
//				console.log("Respone received: " +  response);
//			},
//			function(errResponse){
//				console.error(errResponse);
//			}
//		);
	};
}