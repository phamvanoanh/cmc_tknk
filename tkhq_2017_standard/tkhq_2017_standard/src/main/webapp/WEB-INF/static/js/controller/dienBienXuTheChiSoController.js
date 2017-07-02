/**
 * Controller of model TBS_BIEUTHUE
 */

'use strict';

angular.module('myApp').controller('dienBienXuTheChiSoController', dienBienXuTheChiSoController);
dienBienXuTheChiSoController.$inject = ['$scope', 'dienBienXuTheChiSoService', 'pagerService', '$uibModal', '$PopupMessage', '$rootScope', 'contextPath'];

function dienBienXuTheChiSoController($scope, dienBienXuTheChiSoService, pagerService, $uibModal, $PopupMessage, $rootScope, contextPath) {		
	console.log('start dienBienXuTheChiSoController');
		var self = this;
		self.lstTrangThai = [];
		self.lstManager = [];
		self.lstDataKy = [];
		self.lstDataThang = [];
		self.soLieuChiTieuTK = '';
		self.lstChiSo = [];
		self.lstLoaiChiSo = [];
		self.lstMatHang = [];
		self.hideColum = false;
		self.kyHienTai = '';
		self.cungKyNamTruoc = '';
		self.kyCuoiNamTruoc = '';
		self.kyTruoc = '';
		self.luyKe = '';
        self.feedBack = feedBack;                
        self.showPopup = showPopup;      
//        self.search = search;;
        self.nhx = 'X'; 
        self.linkAPI = '';//contextPath + '/pbtk/API_dienBienXuTheChiSo_ky?nhx=X&trangThai=CT&radioBox=THA&chiso=DG&loaichiso=LA&mathang=18&loaiTK=';
        self.loai_bc = '7';
        self.showChart1 = false;
        $scope.showReport1 = true;
        self.dateTest = new Date();        
        self.month = self.dateTest.getMonth() + 1;
        self.quy = 1;
        $scope.tenloaichiso = '';
        $scope.tenmathang = '';
        if(self.month >= 4 && self.month <= 6){
        	self.quy = 2;
        } else if(self.month >= 7 && self.month <= 9){
        	self.quy = 3;
        } else if(self.month >= 10){
        	self.quy = 4;
        }
        GetNewPage();        
//        self.date = new Date();
        
        function GetNewPage() {
        	self.lstTrangThai = [{
    	                	    "ma": "SB",
    	                	    "ten": "Sơ bộ"
    	                	  },    	                	  
    	                	  {
    	                	    "ma": "CT",
    	                	    "ten": "Chính thức"
    	                	  }];
        	$scope.trangThai = self.lstTrangThai[0];
        	self.lstChiSo = [{
				        		"ma": "DG",
				        		"ten": "Đơn giá"
			        		},
			        		{
				        		"ma": "TG",
				        		"ten": "Trị giá"
			        		},
			        		{
				        		"ma": "SL",
				        		"ten": "Số lượng"
			        		}];
        	$scope.chiSo = self.lstChiSo[0];
        	self.lstLoaiChiSo = [{
				        		"ma": "LA",
				        		"ten": "Lasprey"
				    		},
				    		{
				        		"ma": "PA",
				        		"ten": "Paasche"
				    		},
				    		{
				        		"ma": "FI",
				        		"ten": "Fisher"
				    		}];
        	$scope.loaiChiSo = self.lstLoaiChiSo[0];
        	$scope.radioBox = 'THA';
        	console.log(self.dateTest+'|'+self.month+'/'+self.dateTest.getFullYear());
        	self.kyHienTai ='Tháng ' + self.month + '/' + self.dateTest.getFullYear()+' so với';
        	self.cungKyNamTruoc ='Tháng ' + self.month + '/' + (self.dateTest.getFullYear()-1);
        	self.kyCuoiNamTruoc = 'Tháng 12/' + (self.dateTest.getFullYear()-1);
        	if(self.month == 1)
        		self.kyTruoc = 'Tháng 12/' + (self.dateTest.getFullYear()-1);
        	else
        		self.kyTruoc = 'Tháng ' + (self.month - 1) + '/' + self.dateTest.getFullYear();
        	self.luyKe = self.month + ' Tháng' + '/' + self.dateTest.getFullYear()+' so với' + ' '
    		+ self.month +  ' Tháng' + '/' + (self.dateTest.getFullYear()-1);
        	
        	$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
        }                                           
        function GetlstMatHang(data) {
        	dienBienXuTheChiSoService.GetlstMatHang(data)
            	.then(
        			function (deferred) {
        				self.lstMatHang = deferred;
        				self.lstMatHang = [{"ma": "","ten": "---chọn---"}].concat(self.lstMatHang);
        				$scope.matHang = self.lstMatHang[0];
                    },
                    function (errResponse) {
                        console.error('Error while fetching data');
                    }
                );        	
        }   
        
        $scope.GetSoLieuChiTieuTK07 = function() {
        	console.log('Controller GetSoLieuChiTieuTK07@trangThai:'+$scope.trangThai.ma+'|self.nhx:'+self.nhx+
        			'|chiSo:'+$scope.chiSo.ma+'|loaiChiSo:'+$scope.loaiChiSo.ma +'|matHang:'+$scope.matHang.ma); 
        	$rootScope.showLoading = true;
        	
        	dienBienXuTheChiSoService.GetSoLieuChiTieuTK07($scope.trangThai.ma, 
        			self.nhx, $scope.radioBox,  $scope.chiSo.ma, $scope.loaiChiSo.ma, $scope.matHang.ma)
    		.then(function(respone){        			
    			self.soLieuChiTieuTK = respone;    			    			    			
    			$scope.showReport1 = false;
    			$rootScope.showLoading = false;
//    			console.log('Controller GetSoLieuChiTieuTK07@length respone:'+self.soLieuChiTieuTK[0].chitieu);
    			$scope.radioChecked();
    			},
    			function(errResponse){
    				console.error(errResponse);
    				$rootScope.showLoading = false;
    			}
    		); 
        }
        
        $scope.doExport = function(){
    		var param = {};
        	param["trangthai"] = $scope.trangThai.ma == null ? '' : $scope.trangThai.ma;
        	param["chiSo"] = $scope.chiSo.ma;
        	param["loaiChiSo"] = $scope.loaiChiSo.ma;
        	param["nhx"] = self.nhx;
        	param["matHang"] = $scope.matHang.ma == null ? '' : $scope.matHang.ma;  
        	param["thoigian"] = $scope.radioBox;
        	dienBienXuTheChiSoService.doExport(param);
    	};
        
        $rootScope.$on('childEmit', function(event, data) {
            console.log(data);
            self.nhx = data;
            GetlstMatHang(data);            
        });
        
        $scope.radioData = [
                            { label: 'Thang', value: 'THA' },
                            { label: 'Quý', value: 'QUY' },
                            { label: 'Năm', value: 'NAM'}
                          ];
        
//        $scope.selectTrangThai = function(item) {
//            console.log('selectTrangThai@item:' + item.ten+"|"+item.ma);
//            GetSoLieuChiTieuTK01();
//        };
        
        $scope.radioChecked = function() {
            console.log('radioChecked@item:' + $scope.radioBox);
            if($scope.radioBox == 'NAM'){
            	self.hideColum =  true;
            	self.kyHienTai ='Năm ' + self.dateTest.getFullYear()+' so với';
            	self.kyTruoc ='Năm ' + (self.dateTest.getFullYear()-1);
            }else if($scope.radioBox == 'THA') {
            	self.hideColum = false;            	            	
            	self.kyHienTai ='Tháng ' + self.month + '/' + self.dateTest.getFullYear()+' so với';
            	self.cungKyNamTruoc ='Tháng ' + self.month + '/' + (self.dateTest.getFullYear()-1);
            	self.kyCuoiNamTruoc = 'Tháng 12/' + (self.dateTest.getFullYear()-1);
            	if(self.month == 1)
            		self.kyTruoc = 'Tháng 12/' + (self.dateTest.getFullYear()-1);
            	else
            		self.kyTruoc = 'Tháng ' + (self.month - 1) + '/' + self.dateTest.getFullYear();
            	
            	self.luyKe = self.month + ' Tháng' + '/' + self.dateTest.getFullYear()+' so với' + ' '
            		+ self.month +  ' Tháng' + '/' + (self.dateTest.getFullYear()-1);
            }else if($scope.radioBox == 'QUY') {
            	self.hideColum = false;            	            	
            	self.kyHienTai ='Quý ' + self.quy + '/' + self.dateTest.getFullYear()+' so với';
            	self.cungKyNamTruoc ='Quý ' + self.quy + '/' + (self.dateTest.getFullYear()-1);
            	self.kyCuoiNamTruoc = 'Quý 4/' + (self.dateTest.getFullYear()-1);
            	if(self.quy == 1)
            		self.kyTruoc = 'Quý 4/' + (self.dateTest.getFullYear()-1);
            	else
            		self.kyTruoc = 'Quý ' + (self.quy - 1) + '/' + self.dateTest.getFullYear();
            	
            	self.luyKe = self.quy + ' Quý' + '/' + self.dateTest.getFullYear()+' so với' + ' '
            		+ self.quy + ' Quý' + '/' + (self.dateTest.getFullYear()-1);
            }
        }; 
        
//        $scope.showChart = function() {        	
//        	self.showChart1 = true;
//        };
        
        $scope.clickDongButton = function() {
        	self.showChart1 = false;
        };
        
        $scope.showChart = function() {
        	self.linkAPI = contextPath+'/pbtk/API_dienBienXuTheChiSo_ky?nhx='
        		+self.nhx+'&trangThai='+$scope.trangThai.ma+'&radioBox='+$scope.radioBox
        		+'&chiso='+$scope.chiSo.ma+'&loaichiso='+$scope.loaiChiSo.ma+ '&ten_chiso='+ $scope.chiSo.ten +'&mathang='+$scope.matHang.ma+'&loaiTK=';
            console.log('showChart@self.linkAPI:'+self.linkAPI);
            $scope.tenloaichiso = $scope.chiSo.ten +' - '+$scope.loaiChiSo.ten;
            if($scope.matHang != self.lstMatHang[0]){
            	$scope.tenmathang = $scope.matHang.ten;
            }  else
            	$scope.tenmathang = '';
            $scope.showChart2 = true;
            self.showChart1 = true;
        };
        
        $scope.btnPhanHoi_Click = function () {
			$rootScope.$emit('PhanHoiQuyTrinhXLDL', self.loai_bc);
		};
        
        function search(){
        	var param = {};
        	param["maCang"] = $scope.maCang;
        	param["loaiCang"] = $scope.loaiCang;        	
        	
        	console.log('search@param:',param);        	
        	
        	dienBienXuTheChiSoService.searchCuaKhauNN(param)
        		.then(function(respone){        			
        			self.lstCuaKhauNN = respone.lstCuaKhauNN;        			
        			},
        			function(errResponse){
        				console.error(errResponse);
        			}
        		);        	
        }
    	
    	function feedBack(){
    		console.log('Id to be edited');            
            self.showPopup(self.lstManager);
    	}    	
    	
    	function showPopup(grid){
    		var modalInstance = $uibModal.open({
    			animation: self.animationsEnabled,
    			ariaLabelledBy: 'modal-title',
    			ariaDescribedBy: 'modal-body',
    			templateUrl: 'phanHoiQuyTrinhXLDL',
    			controller: 'dienBienSoLieuChiTieuTKModalCtrl',
    			controllerAs: 'self',
    			resolve: {
    				grid : function() {
						return grid;
					}
    			}
    		});
    		modalInstance.result.then(function (data) {
    			
		    }, function () {
		    	});
    	}    	

}

angular.module('myApp').controller('dienBienSoLieuChiTieuTKModalCtrl', dienBienSoLieuChiTieuTKModalCtrl);
dienBienSoLieuChiTieuTKModalCtrl.$inject = ['$uibModalInstance', 'grid', 'dienBienXuTheChiSoService', '$PopupMessage']
function dienBienSoLieuChiTieuTKModalCtrl($uibModalInstance, grid, dienBienXuTheChiSoService, $PopupMessage) {
	var self = this;
	self.lstManager = angular.copy(grid);
	self.message = '';

	self.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};	  
	
}
