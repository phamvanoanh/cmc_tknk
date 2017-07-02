/**
 * 
 */

'use strict';

angular.module('myApp').controller('CanhBao_TriGiaTTBDController', CanhBao_TriGiaTTBDController);
CanhBao_TriGiaTTBDController.$inject = ['$rootScope', '$scope', 'CanhBao_TriGiaTTService', '$uibModal', '$PopupMessage', 'contextPath'];

function CanhBao_TriGiaTTBDController($rootScope, $scope, CanhBao_TriGiaTTService, $uibModal, $PopupMessage, contextPath) {
	var self = this;
	self.loai_bc = '8';
	$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
	
	$scope.lstNuoc = [];
	$scope.lstKhoiKT = [];
	
	self.nuocSelected = null;
	self.khoiKTSelected = null;
	self.TTSelected = null;
	
	$scope.loaiHinh = 'X';
	$scope.rbLoaiKy = {value: 'ky'};
	
	$scope.showData = false;
	$scope.showButton = false;
	
	function initComponent(){
		//Reset value
		self.nuocSelected = null;
		self.khoiKTSelected = null;
		self.TTSelected = null;
		
		$scope.showData = false;
		$scope.rbLoaiKy = {value: 'ky'};
		$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
		
		CanhBao_TriGiaTTService.getLstNuoc()
			.then(
				function (deferred) {
					$scope.lstNuoc = deferred;
                },
                function (errResponse) {
                    console.error(errResponse);
                }
			);
		
		CanhBao_TriGiaTTService.getLstKhoiKT()
			.then(
				function (deferred) {
					$scope.lstKhoiKT = deferred;
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
	
	$scope.changeKhoi = function(){
		CanhBao_TriGiaTTService.getLstNuoc(self.khoiKTSelected)
		.then(
			function (deferred) {
				$scope.lstNuoc = deferred;
            },
            function (errResponse) {
                console.error(errResponse);
            }
		);
	}
	
	$scope.searchChart = function(){
		if(!checkInput()){
			return;
		}
		
    	var param = {};
    	param["trangthai"] = self.TTSelected == null ? '' : self.TTSelected;
    	param["nhx"] = $scope.loaiHinh;
    	param["khoi"] = self.khoiKTSelected == null ? '' : self.khoiKTSelected;
    	param["nuoc"] = self.nuocSelected == null ? '' : self.nuocSelected;
    	param["loaiKy"] = $scope.rbLoaiKy.value;
    	
    	var api = contextPath + "/bcpt/CanhBaoTGTT/doChart?trangthai=" + param["trangthai"] + "&nhx=" + param["nhx"]
    		+ "&khoi=" + param["khoi"] + "&nuoc=" + param["nuoc"] + "&loaiKy=" + param["loaiKy"];
    	$scope.srcBieuDo = api;
    	
    	var iframe;
    	
    	iframe = document.getElementById('frReportXNK');
    	iframe.src = iframe.src;
    	
    	$scope.showData = true;
	};
	
	function checkInput(){
		if(self.TTSelected == null || typeof self.TTSelected == 'undefined' || self.TTSelected == ''){
			angular.element(document.querySelector('#messageErrorArea')).text('Trường Trạng thái là bắt buộc.');
			$scope.showError == true;
			
			return false;
		}
		
		if(self.khoiKTSelected == null || typeof self.khoiKTSelected == 'undefined' || self.khoiKTSelected == ''){
			angular.element(document.querySelector('#messageErrorArea')).text('Trường Khối kinh tế là bắt buộc.');
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
feedbackQTXLDLModalCtrl.$inject = ['$scope', '$uibModalInstance', 'CanhBao_TriGiaTTService', '$PopupMessage']
function feedbackQTXLDLModalCtrl($scope, $uibModalInstance, CanhBao_TriGiaTTService, $PopupMessage) {
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
		
		CanhBao_TriGiaTTService.doFeedbackInfo(param)
			.then(function(response){
				console.log("Respone received: " +  response);
			},
			function(errResponse){
				console.error(errResponse);
			}
		);
	};
}