/**
 * Hiển thị và cảnh báo bất thường của diễn biến và xu thế số lượng tờ khai XNK
 * Version 1.0 Author
 */
'use strict';

angular.module('myApp').controller('CanhBaoSLToKhaiXNKController', CanhBaoSLToKhaiXNKController);
CanhBaoSLToKhaiXNKController.$inject = ['$rootScope', '$scope', 'CanhBaoSLToKhaiXNKService', '$uibModal', '$PopupMessage',
     '$timeout', 'contextPath'];

function CanhBaoSLToKhaiXNKController($rootScope, $scope, CanhBaoSLToKhaiXNKService, $uibModal, $PopupMessage,
		$timeout, contextPath) {
	var self = this;
	self.loai_bc = '2';

	$scope.lstCucHQ = [];
	$scope.lstChiCucHQ = [];
	$scope.lstWarnSLTKXNK = [];

	self.cucHQSelected = null;
	self.chiCucHQSelected = null;

	$scope.loaiHinh = 'X';
	$scope.rbLoaiKy = {value: 'ky'};

	$scope.showDataTable = false;
	$scope.showChart = false;
	$scope.showGrid = true;
	$scope.showButton = true;
	$scope.btnDisable = true;
	$scope.showError == false;

	function initComponent() {
		// Reset value
		self.cucHQSelected = null;
		self.chiCucHQSelected = null;
		$scope.lstCucHQ = [];
		$scope.lstChiCucHQ = [];
		$scope.lstWarnSLTKXNK = [];
		
		$scope.showDataTable = false;
		$scope.showChart = false;
		$scope.showGrid = true;
		$scope.btnDisable = true;
		$scope.showError == false;
		
		$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
		
		CanhBaoSLToKhaiXNKService.getLstCucHQ().then(function(deferred) {
			$scope.lstCucHQ = deferred;
			//self.cucHQSelected = deferred[28].ma;
		}, function(errResponse) {
			console.error(errResponse);
		});
	}

	$scope.changeCucHQ = function() {
		console.log("Selected item: " + self.cucHQSelected);
		if (self.cucHQSelected != "00") {
		CanhBaoSLToKhaiXNKService.getLstChiCucHQ(self.cucHQSelected).then(
			function(deferred) {
				$scope.lstChiCucHQ = deferred;
//				if(deferred.length >0)
//				{			
//					self.chiCucHQSelected = deferred[0].ten;
//				};
				
			}, function(errResponse) {
				console.error(errResponse);
			});
		} else{
			$scope.lstChiCucHQ = null;
		}
	};

	$scope.changeTab = function(index) {
		console.log("Tab selected: " + index);
		if (index == 0) {
			$scope.loaiHinh = 'X';
			initComponent();
		} else if (index == 1) {
			$scope.loaiHinh = 'N';
			initComponent();
		} else if (index == 2) {
			$scope.loaiHinh = 'NX';
			initComponent();
		} else {
			console.error("No tab index found!");
		}
	};

	$scope.search = function() {
		if(!checkInput()){
			return;
		}
		
		var param = {};
		param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
		param["maChiCucHQ"] = self.chiCucHQSelected == null ? '': self.chiCucHQSelected;
		param["nhx"] = $scope.loaiHinh;
		$rootScope.showLoading = true;

		CanhBaoSLToKhaiXNKService.getTTCanhBaoSLToKhaiXNK(param).then(
				function(response) {
					$scope.lstWarnSLTKXNK = response;
    				angular.forEach($scope.lstWarnSLTKXNK, function(value, key) {
    					angular.forEach(value.group_data, function(value2, key2){
							if((value2.data_ky.data.length%2)!= 0)
							{
								value2.data_ky.data.push({"gia_tri" : null, "ky" : null});
							}
    					});
    					
					});
    				
    				var currentDate = new Date();
    				var currentDay = currentDate.getDate();
    				var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    				var dataKy, dataThang;
    				var lengthDataKy = 0, lengthDataThang = 0;
    				var min = 0, max = 0;
    				for(var i = 0; i < $scope.lstWarnSLTKXNK.length; i++){
    					for(var k = 0; k < $scope.lstWarnSLTKXNK[i].group_data.length; k++){
	    					dataKy = $scope.lstWarnSLTKXNK[i].group_data[k].data_ky.data;
	    					dataThang = $scope.lstWarnSLTKXNK[i].group_data[k].data_thang.data;
	    					min = dataKy[0].gia_tri;
	    					max = dataKy[0].gia_tri;
	    					
	    					if(currentDay < 15){
	    						lengthDataKy = dataKy.length - 2;
	    						lengthDataThang = dataThang.length - 1;
	    					}
	    					else if(currentDay < lastDay){
	    						lengthDataKy = dataKy.length - 1;
	    						lengthDataThang = dataThang.length - 1;
	    					}
	    					else{
	    						lengthDataKy = dataKy.length;
	    						lengthDataThang = dataThang.length;
	    					}
	    					
	    					for(var j = 0; j < lengthDataKy; j++){
	    						if(dataKy[j].gia_tri != null && +min > +dataKy[j].gia_tri){
	    							min = dataKy[j].gia_tri;
	    						}
	    						
	    						if(+max < +dataKy[j].gia_tri){
	    							max = dataKy[j].gia_tri;
	    						}
	    					}
	    					
	    					for(var j = 0; j < lengthDataKy; j++){
	    						if(max == dataKy[j].gia_tri){
	    							angular.extend(dataKy[j], {background: 'bg_red'});
	    						}
	    						if(min == dataKy[j].gia_tri){
	    							angular.extend(dataKy[j], {background: 'bg_yellow'});
	    						}	    							    						
	    					}				
	    					
	    					min = dataThang[0].gia_tri;
	    					max = dataThang[0].gia_tri;
	    					for(var j = 0; j < lengthDataThang; j++){
	    						if(+min > +dataThang[j].gia_tri){
	    							min = dataThang[j].gia_tri;
	    						}
	    						
	    						if(+max < +dataThang[j].gia_tri){
	    							max = dataThang[j].gia_tri;
	    						}
	    					}
	    					
	    					for(var j = 0; j < lengthDataThang; j++){
	    						if(max == dataThang[j].gia_tri){
	    							angular.extend(dataThang[j], {background: 'bg_red'});
	    						}
	    						if(min == dataThang[j].gia_tri){
	    							angular.extend(dataThang[j], {background: 'bg_yellow'});
	    						}	    							    						
	    					}					
    					}
    				}
    				
    				$scope.showDataTable = true;
    				$rootScope.showLoading = false;
    				if($scope.lstWarnSLTKXNK.length == 0){
    					$scope.btnDisable = true;
    				}
    				else{
    					$scope.btnDisable = false;
    				}
				}, function(errResponse) {
					console.error(errResponse);
					$scope.lstWarnSLTKXNK = [];
					$scope.showDataTable = true;
					$rootScope.showLoading = false;
					$scope.btnDisable = true;
				});
	};
	
	function checkInput(){	
		if(self.cucHQSelected == null || typeof self.cucHQSelected == 'undefined' || self.cucHQSelected == ''){
			angular.element(document.querySelector('#messageErrorArea')).text('Trường Cục Hải quan là bắt buộc.');
			$scope.showError == true;
			
			return false;
		}
		
		angular.element(document.querySelector('#messageErrorArea')).text('');
		$scope.showError == false;
		return true;
	}

	$scope.showFeedback = function() {
//		var modalInstance = $uibModal.open({
//			animation : true,
//			ariaLabelledBy : 'modal-title',
//			ariaDescribedBy : 'modal-body',
//			size : 'lg',
//			templateUrl : '',
//			controller : 'feedbackQTXLDLModalCtrl',
//			controllerAs : 'self',
//			resolve : {}
//		});
//
//		modalInstance.result.then(function(data) {
//
//		}, function() {
//
//		});
	};

	$scope.doExport = function() {
		var param = {};
		param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
		param["maChiCucHQ"] = self.chiCucHQSelected == null ? ''
				: self.chiCucHQSelected;
		param["nhx"] = $scope.loaiHinh;

		CanhBaoSLToKhaiXNKService.doExport(param);
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
			param["maChiCucHQ"] = self.chiCucHQSelected == null ? '': self.chiCucHQSelected;
			param["nhx"] = $scope.loaiHinh;
			
			$scope.linkAPI_LuongTK = contextPath + '/bcpt/CanhBaoDBSLTK/doChart?nhx=' + param["nhx"] + '&loaiKy=' +
    			$scope.rbLoaiKy.value + '&maCucHQ=' + param["maCucHQ"] + '&maChicucHQ=' + param["maChiCucHQ"] + '&loaiTK=luongTK';
			$scope.linkAPI_LuongDH = contextPath + '/bcpt/CanhBaoDBSLTK/doChart?nhx=' + param["nhx"] + '&loaiKy=' +
        		$scope.rbLoaiKy.value + '&maCucHQ=' + param["maCucHQ"] + '&maChicucHQ=' + param["maChiCucHQ"] + '&loaiTK=luongDH';
	        
	        var iframe, iframe2;
	    	
			iframe = document.getElementById('frBDSLTK');
	    	iframe.src = iframe.src;
	    	iframe2 = document.getElementById('frBDSLDH');
			iframe2.src = iframe2.src;
	    	
			$scope.showData = true;
		}, 500);
	};
	
	$scope.closeChart = function(){
		$scope.showChart = false;
		$scope.showGrid = true;
	};
	
	$scope.searchChart = function() {
		if(!checkInput()){
			return;
		}
		
		var param = {};
		param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
		param["maChiCucHQ"] = self.chiCucHQSelected == null ? '': self.chiCucHQSelected;
		param["nhx"] = $scope.loaiHinh;
		
		$scope.linkAPI_LuongTK = contextPath + '/bcpt/CanhBaoDBSLTK/doChart?nhx=' + param["nhx"] + '&loaiKy=' +
			$scope.rbLoaiKy.value + '&maCucHQ=' + param["maCucHQ"] + '&maChicucHQ=' + param["maChiCucHQ"] + '&loaiTK=luongTK';
		$scope.linkAPI_LuongDH = contextPath + '/bcpt/CanhBaoDBSLTK/doChart?nhx=' + param["nhx"] + '&loaiKy=' +
    		$scope.rbLoaiKy.value + '&maCucHQ=' + param["maCucHQ"] + '&maChicucHQ=' + param["maChiCucHQ"] + '&loaiTK=luongDH';
        
        var iframe, iframe2;
    	
		iframe = document.getElementById('frBDSLTK');
    	iframe.src = iframe.src;
    	iframe2 = document.getElementById('frBDSLDH');
		iframe2.src = iframe2.src;
    	
		$scope.showData = true;
    };
}

angular.module('myApp').controller('feedbackQTXLDLModalCtrl', feedbackQTXLDLModalCtrl);
feedbackQTXLDLModalCtrl.$inject = [ '$scope', '$uibModalInstance', 'CanhBaoSLToKhaiXNKService', '$PopupMessage' ]
function feedbackQTXLDLModalCtrl($scope, $uibModalInstance, CanhBaoSLToKhaiXNKService, $PopupMessage) {
	var self = this;
	self.content = '';
	self.manager = null;
	self.lstManager = [];
	self.lstFeedbackInfo = [];

	self.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	self.doFeedbackInfo = function() {
		// var param = {};
		// param["content"] = self.content;
		// param["manager"] = self.manager;
		//		
		// CanhBaoSLToKhaiXNKService.doFeedbackInfo(param)
		// .then(function(response){
		// console.log("Respone received: " + response);
		// },
		// function(errResponse){
		// console.error(errResponse);
		// }
		// );
	};
}