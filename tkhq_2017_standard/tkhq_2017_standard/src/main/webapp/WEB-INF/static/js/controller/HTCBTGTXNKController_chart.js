/**
 * Controller of model TBS_BIEUTHUE
 */

'use strict';

angular.module('myApp').controller('HTCBTGTXNKController_chart', HTCBTGTXNKController_chart);
HTCBTGTXNKController_chart.$inject = ['$scope', 'dienBienSLDoanhNghiepFDIService', 'pagerService', '$uibModal', '$PopupMessage', '$rootScope', 'contextPath'];

function HTCBTGTXNKController_chart($scope, dienBienSLDoanhNghiepFDIService, 
		pagerService, $uibModal, $PopupMessage, $rootScope, contextPath) {		
	console.log('start HTCBTGTXNKController_chart');
		var self = this;
		self.lstTrangThai = [];
		self.lstManager = [];		
		self.soLieuChiTieuTK = [];               
		$scope.lstCucHQ = [];
		$scope.lstChiCucHQ1 = [];
        self.feedBack = feedBack;                
        self.showPopup = showPopup;
        self.animationsEnabled = true;
        self.nhx = 'X';
        self.linkAPI_LuongTK = '';//contextPath+'/pbtk/API_HTCBTGTXNK_ky?nhx=X&radioBox=KY&maCucHQ=29&maChicucHQ=32d&loaiTK=luongTK';
        self.linkAPI_TongGtr = '';//contextPath+'/pbtk/API_HTCBTGTXNK_ky?nhx=X&radioBox=KY&maCucHQ=29&maChicucHQ=32d&loaiTK=tongGtr';        
        self.loai_bc = '3';
        $scope.showChart23 = false;
        self.CucHQSelect1 = CucHQSelect1;
        GetCucHQ();
        GetNewPage();
//        GetSoLieuChiTieuTK01();
        
        function GetCucHQ() {
        	dienBienSLDoanhNghiepFDIService.GetCucHQ()
            	.then(
        			function (deferred) {
        				$scope.lstCucHQ = deferred;
        				$scope.cmbCucHQ1 = $scope.lstCucHQ[0];
        				self.CucHQSelect1($scope.cmbCucHQ1);
                    },
                    function (errResponse) {
                        console.error('Error while fetching data');
                    }
                );        	
        }  
        
        function CucHQSelect1(Item) {
        	console.log("CucHQSelect@Item:"+Item);
        	if(Item.ma != '00'){
        		dienBienSLDoanhNghiepFDIService.GetChiCucHQByCuc(Item.ma)
            		.then(
	        			function (deferred) {
	        				$scope.lstChiCucHQ1 = deferred;
	        				$scope.lstChiCucHQ1 = [{"ma": "","ten": "---chọn---"}].concat($scope.lstChiCucHQ1);
	        				$scope.cmbChiCucHQ1 = $scope.lstChiCucHQ1[0];
	                    },
	                    function (errResponse) {
	                        console.error('Error while fetching data');
	                    }
            		); 
        	} else{
        		$scope.lstChiCucHQ1 = [{"ma": "","ten": "---chọn---"}];
				$scope.cmbChiCucHQ1 = $scope.lstChiCucHQ1[0];
        	}
        }
        
        function GetSoLieuChiTieuTK10() {
        	console.log('Controller GetSoLieuChiTieuTK10@trangThai:'+$scope.trangThai.ma+'|self.nhx:'+self.nhx+
        			'|ChiCucHQ:'+$scope.cmbChiCucHQ1.ma+'|CucHQ:'+$scope.cmbCucHQ1.ma);        	
        	dienBienSLDoanhNghiepFDIService.GetSoLieuChiTieuTK10($scope.trangThai.ma, 
        			self.nhx, $scope.cmbCucHQ1.ma, $scope.cmbChiCucHQ1.ma)
    		.then(function(respone){        			
    			self.soLieuChiTieuTK = respone;    			    			
    			console.log('Controller GetSoLieuChiTieuTK10@length respone:'+self.soLieuChiTieuTK[0].data_thang.data.length);
    			},
    			function(errResponse){
    				console.error(errResponse);
    			}
    		); 
        }
        
        function GetNewPage() {
        	self.lstTrangThai = [{
    	                	    "ma": "SB",
    	                	    "ten": "Sơ bộ"
    	                	  },
    	                	  {
    	                	    "ma": "DC",
    	                	    "ten": "Điều chỉnh"
    	                	  },
    	                	  {
    	                	    "ma": "CT",
    	                	    "ten": "Chính thức"
    	                	  }];
        	$scope.trangThai = self.lstTrangThai[0];
        	$scope.radioBox = 'KY';
        	$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
        }                                           
        
        $rootScope.$on('childEmit', function(event, data) {
            console.log(data);
            self.nhx = data;
          });
        
//        $scope.getBaoCao = function() {            
//        	GetSoLieuChiTieuTK10();
//        };        
        $scope.showChart2 = function() {        	
        	self.linkAPI_LuongTK = contextPath+'/pbtk/API_HTCBTGTXNK_ky?nhx='
        		+self.nhx+'&radioBox='+$scope.radioBox+'&maCucHQ='+$scope.cmbCucHQ1.ma+'&maChicucHQ='+$scope.cmbChiCucHQ1.ma+'&loaiTK=luongTK';
            self.linkAPI_TongGtr = contextPath+'/pbtk/API_HTCBTGTXNK_ky?nhx='
            	+self.nhx+'&radioBox='+$scope.radioBox+'&maCucHQ='+$scope.cmbCucHQ1.ma+'&maChicucHQ='+$scope.cmbChiCucHQ1.ma+'&loaiTK=tongGtr';
            $scope.showChart23 = true;	
            console.log('showChart@self.linkAPI_LuongTK:'+self.linkAPI_LuongTK+'||'+self.linkAPI_DongiaTK);            
        };
        
        $scope.clickDongButton = function() {
            console.log('clickDongButton@$scope.trangThai:'+$scope.trangThai.ma);
            window.location.href = contextPath;
        };
    	
    	function feedBack(){
    		console.log('Id to be edited');            
            self.showPopup(self.soLieuChiTieuTK);
    	}    	
    	
    	function showPopup(grid){
    		var modalInstance = $uibModal.open({
    			animation: self.animationsEnabled,
    			ariaLabelledBy: 'modal-title',
    			ariaDescribedBy: 'modal-body',
    			templateUrl: 'phanHoiQuyTrinhXLDL',
    			controller: 'dienBienSLDoanhNghiepFDIModalCtrl',
    			controllerAs: 'self',
    			resolve: {
    				grid : function() {
						return grid;
					}
    			}
    		});
    		
    		modalInstance.result.then(function (data) {
//				if(data == 'success'){
//					self.currentPage = 1;
//					search(self.currentPage, self.pageSize);
//				}else{
//					console.log('Có lỗi xảy ra');
//				}
		    }, function () {
		    	});
    	} 
}

angular.module('myApp').controller('dienBienSLDoanhNghiepFDIModalCtrl', dienBienSLDoanhNghiepFDIModalCtrl);
dienBienSLDoanhNghiepFDIModalCtrl.$inject = ['$uibModalInstance', 'grid', 'dienBienSLDoanhNghiepFDIService']
function dienBienSLDoanhNghiepFDIModalCtrl($uibModalInstance, grid, dienBienSLDoanhNghiepFDIService) {
	var self = this;
//	self.soLieuChiTieuTK = angular.copy(grid);
	self.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};	  
	
}
