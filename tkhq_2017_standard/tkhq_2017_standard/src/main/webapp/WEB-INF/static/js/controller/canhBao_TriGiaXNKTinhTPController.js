/**
 * 
 */

'use strict';

angular.module('myApp').controller('CanhBao_TriGiaXNKTinhTPController', CanhBao_TriGiaXNKTinhTPController);
CanhBao_TriGiaXNKTinhTPController.$inject = ['$rootScope','$scope', 'CanhBao_TriGiaXNKTinhTPService', '$uibModal', '$PopupMessage',
     '$timeout', 'contextPath'];

function CanhBao_TriGiaXNKTinhTPController($rootScope, $scope, CanhBao_TriGiaXNKTinhTPService, $uibModal, $PopupMessage,
		$timeout, contextPath) {
	var self = this;
	self.loai_bc = '11';
	
	$scope.lstTinhTP = [];
	$scope.lstWarnTGXNKTinhTP = [];
	
	self.tinhTPSelected = null;
	self.TTSelected = null;
	
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
		self.tinhTPSelected = null;
		self.TTSelected = null;
		
		$scope.lstWarnTGXNKTinhTP = [];
		$scope.showDataTable = false;
		$scope.showChart = false;
		$scope.showGrid = true;
		$scope.btnDisable = true;
		$scope.showError == false;
		
		$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
		
		CanhBao_TriGiaXNKTinhTPService.getLstTinhTP()
			.then(
				function (deferred) {
					$scope.lstTinhTP = deferred;
                },
                function (errResponse) {
                    console.error(errResponse);
                }
			);
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
    	param["trangthai"] = self.TTSelected == null ? '' : self.TTSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["tinh"] = self.tinhTPSelected == null ? '' : self.tinhTPSelected;
    	
    	$rootScope.showLoading = true;
    	
    	CanhBao_TriGiaXNKTinhTPService.getTTCanhBaoTGXNKTTP(param)
    		.then(function(response){
    				$scope.lstWarnTGXNKTinhTP = response;
    				angular.forEach($scope.lstWarnTGXNKTinhTP, function(value, key) {
						if((value.data_ky.data.length%2)!=0)
						{
							value.data_ky.data.push({"gia_tri":null, "ky":null, background: "ky_null"});
						}		
					});
    				
    				var currentDate = new Date();
    				var currentDay = currentDate.getDate();
    				var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    				var dataKy, dataThang;
    				var lengthDataKy = 0, lengthDataThang = 0;
    				var min, max;
    				for(var i = 0; i < $scope.lstWarnTGXNKTinhTP.length; i++){
    					dataKy = $scope.lstWarnTGXNKTinhTP[i].data_ky.data;
    					dataThang = $scope.lstWarnTGXNKTinhTP[i].data_thang.data;
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
    						if(+min > +dataKy[j].gia_tri){
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
    				if($scope.lstWarnTGXNKTinhTP.length == 0){
    					$scope.btnDisable = true;
    				}
    				else{
    					$scope.btnDisable = false;
    				}
    			},
    			function(errResponse){
    				console.error(errResponse);
    				$scope.lstWarnTGXNKTinhTP = [];
    				$scope.showDataTable = true;
    				$rootScope.showLoading = false;
    				$scope.btnDisable = true;
    			}
    		);
	};
	
	function checkInput(){
		if(self.TTSelected == null || typeof self.TTSelected == 'undefined' || self.TTSelected == ''){
			angular.element(document.querySelector('#messageErrorArea')).text('Trường Trạng thái là bắt buộc.');
			$scope.showError == true;
			
			return false;
		}
		if(self.tinhTPSelected == null || typeof self.tinhTPSelected == 'undefined' || self.tinhTPSelected == ''){
			angular.element(document.querySelector('#messageErrorArea')).text('Trường Tỉnh/Thành phố là bắt buộc.');
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
		var param = {};
		param["trangthai"] = self.TTSelected == null ? '' : self.TTSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["tinh"] = self.tinhTPSelected == null ? '' : self.tinhTPSelected;
    	
    	CanhBao_TriGiaXNKTinhTPService.doExport(param);
	};
	
	$scope.doPrint = function() {
		$scope.doExport();
	};
	
	$scope.showChartInfo = function(){
		$scope.showChart = true;
		$scope.showGrid = false;
		
		$timeout(function(){
			var param = {};
	    	param["trangthai"] = self.TTSelected == null ? '' : self.TTSelected;
	    	param["nhx"] = $scope.loaiHinh;
	    	param["tinh"] = self.tinhTPSelected == null ? '' : self.tinhTPSelected;
	    	param["loaiKy"] = $scope.rbLoaiKy.value;
	    	
	    	var api = contextPath + "/bcpt/CanhBaoTGXNKTTP/doChart?trangthai=" + param["trangthai"] + "&nhx=" + param["nhx"]
	    		+ "&tinh=" + param["tinh"] + "&loaiKy=" + param["loaiKy"];
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
    	param["trangthai"] = self.TTSelected == null ? '' : self.TTSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["tinh"] = self.tinhTPSelected == null ? '' : self.tinhTPSelected;
    	param["loaiKy"] = $scope.rbLoaiKy.value;
    	
    	var api = contextPath + "/bcpt/CanhBaoTGXNKTTP/doChart?trangthai=" + param["trangthai"] + "&nhx=" + param["nhx"]
    		+ "&tinh=" + param["tinh"] + "&loaiKy=" + param["loaiKy"];
    	$scope.srcBieuDo = api;
    	
    	var iframe;
		iframe = document.getElementById('frReportXNK');
		iframe.src = iframe.src;
    	
    	$scope.showData = true;
	};
}

angular.module('myApp').controller('feedbackQTXLDLModalCtrl', feedbackQTXLDLModalCtrl);
feedbackQTXLDLModalCtrl.$inject = ['$scope', '$uibModalInstance', 'CanhBao_TriGiaXNKTinhTPService', '$PopupMessage']
function feedbackQTXLDLModalCtrl($scope, $uibModalInstance, CanhBao_TriGiaXNKTinhTPService, $PopupMessage) {
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
		
		CanhBao_TriGiaXNKTinhTPService.doFeedbackInfo(param)
			.then(function(response){
				console.log("Respone received: " +  response);
			},
			function(errResponse){
				console.error(errResponse);
			}
		);
	};
}