/**
 * 
 */

'use strict';

angular.module('myApp').controller('CanhBao_TriGia_MH_PTHS_XNKController', CanhBao_TriGia_MH_PTHS_XNKController);
CanhBao_TriGia_MH_PTHS_XNKController.$inject = ['$rootScope','$scope', 'CanhBao_TriGia_MH_PTHS_XNKService', '$uibModal',
    '$PopupMessage', '$timeout', 'contextPath'];

function CanhBao_TriGia_MH_PTHS_XNKController($rootScope, $scope, CanhBao_TriGia_MH_PTHS_XNKService, $uibModal,
		$PopupMessage, $timeout, contextPath) {
	var self = this;
	self.loai_bc = '5';
	
	$scope.lstCucHQ = [];
	$scope.lstChiCucHQ = [];
	$scope.lstChuong = [];
	$scope.lstNhom = [];
	$scope.lstWarnTGMHPTHSXNK = [];
	
	self.cucHQSelected = null;
	self.chiCucHQSelected = null;
	self.TTSelected = null;
	self.chuongSelected = null;
	self.nhomSelected = null;
	
	$scope.loaiHinh = 'X';
	$scope.rbLoaiKy = {value: 'ky'};
	
	$scope.showDataTable = false;
	$scope.showChart = false;
	$scope.showGrid = true;
	$scope.showButton = true;
	$scope.btnDisable = true;
	$scope.showError == false;
	
	function initComponent(){
		//Reset value
		self.cucHQSelected = null;
		self.chiCucHQSelected = null;
		self.TTSelected = null;
		self.chuongSelected = null;
		self.nhomSelected = null;
		
		$scope.lstWarnTGMHPTHSXNK = [];
		$scope.showDataTable = false;
		$scope.showChart = false;
		$scope.showGrid = true;
		$scope.btnDisable = true;
		$scope.showError == false;
		$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
		
		CanhBao_TriGia_MH_PTHS_XNKService.getLstCucHQ()
			.then(
				function (deferred) {
					$scope.lstCucHQ = deferred;
                },
                function (errResponse) {
                    console.error(errResponse);
                }
			);
		
		CanhBao_TriGia_MH_PTHS_XNKService.getLstChuong()
			.then(
				function (deferred) {
					$scope.lstChuong = deferred;
	            },
	            function (errResponse) {
	                console.error(errResponse);
	            }
			);		
	}
	
	$scope.changeCucHQ = function(){
		console.log("Selected item: " + self.cucHQSelected);
		if (self.cucHQSelected != "00") {
		CanhBao_TriGia_MH_PTHS_XNKService.getLstChiCucHQ(self.cucHQSelected)
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
	
	$scope.changeChuong = function(){
		CanhBao_TriGia_MH_PTHS_XNKService.getLstNhom(self.chuongSelected)
		.then(
			function (deferred) {
				$scope.lstNhom = deferred;
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
    	param["maCucHQ"] = self.cucHQSelected;
    	param["maChiCucHQ"] = self.chiCucHQSelected == null ? '' : self.chiCucHQSelected;
    	param["trangthai"] = self.TTSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["chuong"] = self.chuongSelected;
    	param["nhom"] = self.nhomSelected == null ? '' : self.nhomSelected;
    	
    	$rootScope.showLoading = true;
    	
    	CanhBao_TriGia_MH_PTHS_XNKService.getTTCanhBaoTriGiaMHXNK(param)
    		.then(function(response){
    				$scope.lstWarnTGMHPTHSXNK = response;
    				angular.forEach($scope.lstWarnTGMHPTHSXNK, function(value, key) {
						if((value.group_data[0].data_ky.data.length%2)!=0)
						{
							value.group_data[0].data_ky.data.push({"gia_tri":null,"ky":null});
						}					
					});
    				
    				var currentDate = new Date();
    				var currentDay = currentDate.getDate();
    				var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    				var dataKy, dataThang;
    				var lengthDataKy = 0, lengthDataThang = 0;
    				var min, max;
    				for(var i = 0; i < $scope.lstWarnTGMHPTHSXNK.length; i++){
    					dataKy = $scope.lstWarnTGMHPTHSXNK[i].group_data[0].data_ky.data;
    					dataThang = $scope.lstWarnTGMHPTHSXNK[i].group_data[0].data_thang.data;
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
    				
    				$scope.showDataTable = true;
    				$rootScope.showLoading = false;
    				if($scope.lstWarnTGMHPTHSXNK.length == 0){
    					$scope.btnDisable = true;
    				}
    				else{
    					$scope.btnDisable = false;
    				}
    			},
    			function(errResponse){
    				console.error(errResponse);
    				$scope.lstWarnTGMHPTHSXNK = [];
    				$scope.showDataTable = true;
    				$rootScope.showLoading = false;
    				$scope.btnDisable = true;
    			}
    		);
	};
	
	function checkInput(){
		if(self.TTSelected == null || typeof self.TTSelected == 'undefined' || self.TTSelected == ''){
			angular.element(document.querySelector('#messageErrorArea')).text('Trường trạng thái là bắt buộc.');
			$scope.showError == true;
			
			return false;
		}
		
		if(self.chuongSelected == null || typeof self.chuongSelected == 'undefined' || self.chuongSelected == ''){
			angular.element(document.querySelector('#messageErrorArea')).text('Trường Chương là bắt buộc.');
			$scope.showError == true;
			
			return false;
		}
		
		if(self.cucHQSelected == null || typeof self.cucHQSelected == 'undefined' || self.cucHQSelected == ''){
			angular.element(document.querySelector('#messageErrorArea')).text('Trường Cục Hải quan là bắt buộc.');
			$scope.showError == true;
			
			return false;
		}
		
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
		if($scope.lstWarnTGMHPTHSXNK.length == 0){
			return;
		}
		
		var param = {};
		param["maCucHQ"] = self.cucHQSelected == null ? '' : self.cucHQSelected;
    	param["maChiCucHQ"] = self.chiCucHQSelected == null ? '' : self.chiCucHQSelected;
    	param["trangthai"] = self.TTSelected == null ? '' : self.TTSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["chuong"] = self.chuongSelected == null ? '' : self.chuongSelected;
    	param["nhom"] = self.nhomSelected == null ? '' : self.nhomSelected;
    	
    	CanhBao_TriGia_MH_PTHS_XNKService.doExport(param);
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
    	param["trangthai"] = self.TTSelected == null ? '' : self.TTSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["chuong"] = self.chuongSelected == null ? '' : self.chuongSelected;
    	param["nhom"] = self.nhomSelected == null ? '' : self.nhomSelected;
    	param["loaiKy"] = $scope.rbLoaiKy.value;
    	
    	var api = contextPath + "/bcpt/CanhBaoTGMHTPTHS/doChart?maCucHQ=" + param["maCucHQ"] + "&maChicucHQ="
    		+ param["maChiCucHQ"] + "&trangthai=" + param["trangthai"] + "&nhx=" + param["nhx"] + "&chuong=" + param["chuong"]
    		+ "&nhom=" + param["nhom"] + "&loaiKy=" + param["loaiKy"];
		$scope.srcBieuDo = api;
		
		var iframe;
    	
		iframe = document.getElementById('frReportXNK');
    	iframe.src = iframe.src;
    	
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
    	param["trangthai"] = self.TTSelected == null ? '' : self.TTSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["chuong"] = self.chuongSelected == null ? '' : self.chuongSelected;
    	param["nhom"] = self.nhomSelected == null ? '' : self.nhomSelected;
    	param["loaiKy"] = $scope.rbLoaiKy.value;
    	
    	var api = contextPath + "/bcpt/CanhBaoTGMHTPTHS/doChart?maCucHQ=" + param["maCucHQ"] + "&maChicucHQ="
    		+ param["maChiCucHQ"] + "&trangthai=" + param["trangthai"] + "&nhx=" + param["nhx"] + "&chuong=" + param["chuong"]
    		+ "&nhom=" + param["nhom"] + "&loaiKy=" + param["loaiKy"];
		$scope.srcBieuDo = api;
		
		var iframe;
    	
		iframe = document.getElementById('frReportXNK');
    	iframe.src = iframe.src;
    	
		$scope.showData = true;
	};
}

angular.module('myApp').controller('feedbackQTXLDLModalCtrl', feedbackQTXLDLModalCtrl);
feedbackQTXLDLModalCtrl.$inject = ['$scope', '$uibModalInstance', 'CanhBao_TriGia_MH_PTHS_XNKService', '$PopupMessage']
function feedbackQTXLDLModalCtrl($scope, $uibModalInstance, CanhBao_TriGia_MH_PTHS_XNKService, $PopupMessage) {
	var self = this;
	self.content = '';
	self.manager = null;
	self.lstManager = [];
	self.lstFeedbackInfo = [];

	self.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	self.doFeedbackInfo = function(){
		var param = {};
		param["content"] = self.content;
		param["manager"] = self.manager;
		
		CanhBao_TriGia_MH_PTHS_XNKService.doFeedbackInfo(param)
			.then(function(response){
				console.log("Respone received: " +  response);
			},
			function(errResponse){
				console.error(errResponse);
			}
		);
	};
}