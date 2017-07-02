/**
 * 
 */

'use strict';

angular.module('myApp').controller('CanhBao_TriGia_MH_PTHS_BDController', CanhBao_TriGia_MH_PTHS_BDController);
CanhBao_TriGia_MH_PTHS_BDController.$inject = ['$rootScope','$scope', 'CanhBao_TriGia_MH_PTHS_XNKService', '$uibModal',
       '$PopupMessage', 'contextPath'];

function CanhBao_TriGia_MH_PTHS_BDController($rootScope, $scope, CanhBao_TriGia_MH_PTHS_XNKService, $uibModal, $PopupMessage,
		contextPath) {
	var self = this;
	self.loai_bc = '5';
	
	$scope.lstCucHQ = [];
	$scope.lstChiCucHQ = [];
	$scope.lstChuong = [];
	$scope.lstNhom = [];
	
	self.cucHQSelected = null;
	self.chiCucHQSelected = null;
	self.TTSelected = null;
	self.chuongSelected = null;
	self.nhomSelected = null;
	
	$scope.loaiHinh = 'X';
	
	$scope.rbLoaiKy = {value: 'ky'};
	
	$scope.showData = false;
	$scope.showButton = false;
	
	function initComponent(){
		//Reset value
		self.cucHQSelected = null;
		self.chiCucHQSelected = null;
		self.TTSelected = null;
		self.chuongSelected = null;
		self.nhomSelected = null;
		$scope.showData = false;
		$scope.rbLoaiKy = {value: 'ky'};
		
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
}

angular.module('myApp').controller('feedbackQTXLDLModalCtrl', feedbackQTXLDLModalCtrl);
feedbackQTXLDLModalCtrl.$inject = ['$scope', '$uibModalInstance', 'CanhBao_TriGia_MH_PTHS_BDService', '$PopupMessage']
function feedbackQTXLDLModalCtrl($scope, $uibModalInstance, CanhBao_TriGia_MH_PTHS_BDService, $PopupMessage) {
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
		
		CanhBao_TriGia_MH_PTHS_BDService.doFeedbackInfo(param)
			.then(function(response){
				console.log("Respone received: " +  response);
			},
			function(errResponse){
				console.error(errResponse);
			}
		);
	};
}