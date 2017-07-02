/**
 * Controller of model TBS_BIEUTHUE
 */

'use strict';

App.controller('thayDoiBoSungToKhaiHeThongController', thayDoiBoSungToKhaiHeThongController);
thayDoiBoSungToKhaiHeThongController.$inject = ['$scope', 'thayDoiBoSungToKhaiHeThongService', 'pagerService', '$uibModal', '$PopupMessage', '$rootScope', 'contextPath'];

function thayDoiBoSungToKhaiHeThongController($scope, thayDoiBoSungToKhaiHeThongService, pagerService, $uibModal, $PopupMessage, $rootScope, contextPath) {		
	console.log('start thayDoiBoSungToKhaiHeThongController');
		var self = this;
		self.lstCuaKhauNN = [];
		self.lstCucHQ = [];
		self.lstChiCucHQ = [];
		
		self.lstLoaiKy = [];
		self.lstKy = [];
		self.lstThang = [];	      
        self.selectedList = []; //Danh sach row da chon        
        self.checkAll = false;                      
        self.cuaKhaunnVnaccsEntity = {
        		mo_ta: '',
        		ma_hang: '',
        		ma_tk: '',
        		is_tk: true,        	
        		sd: '',
        		dvt_tk: '',
        		don_gia_usd: 0,
        		don_gia_vnd:0,
        		luong: 0,
        		luong_tk: 0,
        		tri_gia_usd: 0,
        		tri_gia_vnd: 0,
        		tri_gia_tk_usd: 0,
        		tri_gia_tk_vnd: 0,
        		ma_dv: '',
        		ma_hq: '',
        		ma_lh: '',
        		so_tk: '',
        		thang: 0,
        		ky: 0,
        		nuoc_nk: '',
        		nuoc_xx: '',
        		ma_nt: '',
        		ngay_dk: '',
        		cang_nn: '',
        		ma_cuakhau_nk: '',
        		ten_cuakhau_nk: '',
        		ma_cuakhau_xk: '',
        		ten_cuakhau_xk: '',        		
        		is_nghingo: false        		
        };
        self.lstMatHang = [self.cuaKhaunnVnaccsEntity];
        //Them moi row su dung popup start
//        self.editRow = editRow;                
        self.showPopup = showPopup;
//        self.remove = remove;
        self.animationsEnabled = true; 
        self.CucHQSelect = CucHQSelect;
//        self.MatHangSelect = MatHangSelect;
//        self.ChiCucHQSelect = ChiCucHQSelect;
        self.selectLoaiKy = selectLoaiKy;
        self.search = search;
        
        self.totalItems = 0;
        self.currentPage = 1;
        self.maxSize = 5;
        self.pageSize = 10;
        self.nhx = '';
        self.hideKy=true;
        self.hideThang=true;
        self.hideNam=true;
        self.hideFromDate=true;
        self.hideToDate=true;
        self.nuocXNK = '';
        $scope.showReport1 = false;
//        search(self.currentPage, self.pageSize);
//        self.year= new Date();
        self.fromDate= new Date();
        self.toDate= new Date(); 
        self.lstNam = [];
        
        GetCucHQ();
        GetNewPage();        
//        GetlstMatHang();
        
        $scope.popup1 = {
    		opened: false
        };
              
        $scope.open1 = function() {
        	console.log("Open date picker");
            $scope.popup1.opened = true;
        };
              
        $scope.popup2 = {
    		opened: false
        };
              
        $scope.open2 = function() {
        	console.log("Open date picker");
            $scope.popup2.opened = true;
        };
        
        $scope.popup3 = {
    		opened: false
        };
              
        $scope.open3 = function() {
        	console.log("Open date picker");
            $scope.popup3.opened = true;
        };
        
        $scope.yearOptions = {            	    
//        		format: 'yyyy',            	    
//        	    startingDay: 1,
//        	    'show-weeks' : false,
        	    formatYear: 'yyyy',   
        	    startingDay: 1,
        	    minMode: 'year'
        };      
        
        $scope.dateOptions = {            	    
        		format: 'dd/MM/yyyy',            	    
        	    startingDay: 1,
        	    'show-weeks' : false        	   
        };          
        
        $scope.doExport = function(){   
        	console.log('thayDoiBoSungToKhaiHeThongController@doExport START');
        	thayDoiBoSungToKhaiHeThongService.doExport(self.lstCuaKhauNN,self.nhx);
    	};
    	
    	$scope.doPrint = function(){
    		console.log('thayDoiBoSungToKhaiHeThongController@doPrint START');
    		var dateFromDate = self.fromDate.getDate();
        	if(dateFromDate < 10){
        		dateFromDate = '0'+dateFromDate;
        	}
        	var monthFromDate = self.fromDate.getMonth()+1;
        	if(monthFromDate < 10){
        		monthFromDate = '0'+monthFromDate;
        	}
        	var dateToDate = self.toDate.getDate();
        	if(dateToDate < 10){
        		dateToDate = '0'+dateToDate;
        	}
        	var monthToDate = self.toDate.getMonth()+1;
        	if(monthToDate < 10){
        		monthToDate = '0'+monthToDate;
        	}
        	var fromDate = dateFromDate+'/'+monthFromDate + '/'+self.fromDate.getFullYear();
        	var toDate = dateToDate+'/'+monthToDate + '/'+self.toDate.getFullYear();
        	var nam = '';
        	if ($scope.Nam != undefined && $scope.Nam != null)
    			nam = $scope.Nam;
        		
        	console.log('doPrint@$scope.CucHQ:','$scope.CucHQ.ma:'+$scope.CucHQ.ma+'|$scope.ChiCucHQ.ma:'+$scope.ChiCucHQ.ma
        			+'|self.nhx:' +self.nhx
        			+'|$scope.MatHang.ma:'+$scope.MatHang.ma+'|$scope.LoaiKy.ma:' +$scope.LoaiKy.ma
        			+'|$scope.Ky:' +$scope.Ky+'|$scope.Thang:'+$scope.Thang+'|self.year.getFullYear:'+nam//self.year.getFullYear()
        			+'|self.fromDate:'+fromDate
        			+'|self.toDate:'+toDate); 
    		
    		$scope.UrlIE="";
    		$scope.title = "Xem thay đổi bổ sung tờ khai từ các hệ thống";    	
//    		if(!isIE)
//    		{
    		$scope.UrlIE="&type=PDFINLINE"
//    		}
    		$scope.REST_SERVICE_URI = contextPath + '/pbtk/API_thayDoiBoSungToKhaiHeThong?maCucHQ='+$scope.CucHQ.ma
    		+'&maChicucHQ='+$scope.ChiCucHQ.ma+'&nhx='+self.nhx
    		+'&ma_hang='+$scope.MatHang.ma+'&loai_ky='+$scope.LoaiKy.ma
    		+'&ky='+$scope.Ky+'&thang='+$scope.Thang+'&nam='+nam//self.year.getFullYear()
    		+'&tu_ngay='+fromDate+'&den_ngay='+toDate;
    		
    		var modalInstance = $uibModal.open({
    			animation : self.animationsEnabled,
    			ariaLabelledBy : 'modal-title',
    			ariaDescribedBy : 'modal-body',
    			controller : ModalInstanceCtrl,
    			templateUrl : 'pageReport_thayDoiBosungTokhaiHeThong',
    			windowClass : 'app-modal-window',
    			resolve : {
    				Title: function() {
    					return $scope.title;},
    					
    				Url : function() {
    					return $scope.REST_SERVICE_URI;
    				},UrlIE : function() {
    					return $scope.UrlIE;
    				}
    			}
    		});
    	}
        
        function GetNewPage() {
        	self.lstLoaiKy = [{
    	                	    "ma": "NG",
    	                	    "ten": "Từ ngày… Đến ngày"
    	                	  },
    	                	  {
    	                	    "ma": "KY",
    	                	    "ten": "Kỳ"
    	                	  },
    	                	  {
    	                	    "ma": "TH",
    	                	    "ten": "Tháng năm"
    	                	  }];     
        	self.lstKy = ["1", "2"];
        	self.lstThang = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        	for (var i = (new Date()).getFullYear(); i >= 2012; i--) {
    			self.lstNam.push(i);
    		}
        	$scope.Ky=self.lstKy[0];
        	$scope.Thang=self.lstThang[0];
        	$scope.LoaiKy=self.lstLoaiKy[1];
        	$scope.Nam = self.lstNam[0];
        	self.hideKy = false;
    		self.hideThang = false;
    		self.hideNam = false;
    		self.hideFromDate = true;
    		self.hideToDate = true;    		
        }
        
        function selectLoaiKy(item){
        	if(item.ma == 'NG'){
        		self.hideKy = true;
        		self.hideThang = true;
        		self.hideNam = true;
        		self.hideFromDate = false;
        		self.hideToDate = false;
        	} else if(item.ma == 'KY'){
        		self.hideKy = false;
        		self.hideThang = false;
        		self.hideNam = false;
        		self.hideFromDate = true;
        		self.hideToDate = true;
        	} else if(item.ma == 'TH'){
        		self.hideKy = true;
        		self.hideThang = false;
        		self.hideNam = false;
        		self.hideFromDate = true;
        		self.hideToDate = true;
        	} else {
        		self.hideKy = true;
        		self.hideThang = true;
        		self.hideNam = true;
        		self.hideFromDate = true;
        		self.hideToDate = true;
        	}
        		        		        	
//        	console.log("selectLoaiKy@Item:"+$scope.Thang+"|"+$scope.Ky+"|"+self.year.getFullYear());         	
        }
        
        function CucHQSelect(Item) {
        	console.log("CucHQSelect@Item:"+Item);
        	$rootScope.showLoading = true;
        	if(Item.ma != '00'){
        	thayDoiBoSungToKhaiHeThongService.GetChiCucHQByCuc(Item.ma)
            	.then(
        			function (deferred) {
        				self.lstChiCucHQ = deferred;
        				self.lstChiCucHQ = [{"ma": "","ten": "---chọn---"}].concat(self.lstChiCucHQ);
        				$scope.ChiCucHQ = self.lstChiCucHQ[0];
        				$rootScope.showLoading = false;
                    },
                    function (errResponse) {
                        console.error('Error while fetching data');
                        $rootScope.showLoading = false;
                    }
                );   
        	} else{
        		self.lstChiCucHQ = [{"ma": "","ten": "---chọn---"}];
				$scope.ChiCucHQ = self.lstChiCucHQ[0];
				$rootScope.showLoading = false;
        	}
        }
        
        function GetCucHQ() {
        	$rootScope.showLoading = true;
        	thayDoiBoSungToKhaiHeThongService.GetCucHQ()
            	.then(
        			function (deferred) {
        				self.lstCucHQ = deferred;
        				$scope.CucHQ = self.lstCucHQ[0];
        				self.CucHQSelect($scope.CucHQ);
        				$rootScope.showLoading = false;
                    },
                    function (errResponse) {
                        console.error('Error while fetching data');
                        $rootScope.showLoading = false;
                    }
                ); 
        }  
        function GetlstMatHang(data) {
        	$rootScope.showLoading = true;
        	thayDoiBoSungToKhaiHeThongService.GetlstMatHang(data)
            	.then(
        			function (deferred) {
        				self.lstMatHang = deferred;
        				self.lstMatHang = [{"ma": "","ten": "---chọn---"}].concat(self.lstMatHang);
        				$scope.MatHang = self.lstMatHang[0];
        				$rootScope.showLoading = false;
                    },
                    function (errResponse) {
                        console.error('Error while fetching data');
                        $rootScope.showLoading = false;
                    }
                );        	
        }               
        
        $rootScope.$on('childEmit', function(event, data) {
            console.log(data);            
            self.nhx = data;
            GetlstMatHang(data);
            if(self.nhx == 'X'){
            	self.nuocXNK = 'Nước nhập khẩu';
            } else  if(self.nhx == 'N'){
            	self.nuocXNK = 'Nước xuất khẩu';
            }
          });
        
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
            search(self.currentPage, self.pageSize);
        };
        
        function search(){
        	if(validateDate(self.fromDate, self.toDate)){
        		$rootScope.showLoading = true;
	        	var dateFromDate = self.fromDate.getDate();
	        	if(dateFromDate < 10){
	        		dateFromDate = '0'+dateFromDate;
	        	}
	        	var monthFromDate = self.fromDate.getMonth()+1;
	        	if(monthFromDate < 10){
	        		monthFromDate = '0'+monthFromDate;
	        	}
	        	var dateToDate = self.toDate.getDate();
	        	if(dateToDate < 10){
	        		dateToDate = '0'+dateToDate;
	        	}
	        	var monthToDate = self.toDate.getMonth()+1;
	        	if(monthToDate < 10){
	        		monthToDate = '0'+monthToDate;
	        	}
	        	var fromDate = dateFromDate+'/'+monthFromDate + '/'+self.fromDate.getFullYear();
	        	var toDate = dateToDate+'/'+monthToDate + '/'+self.toDate.getFullYear();
	        	var nam = '';
	        	if ($scope.Nam != undefined && $scope.Nam != null)
	    			nam = $scope.Nam;
	        	
	        	console.log('search@$scope.CucHQ:','$scope.CucHQ.ma:'+$scope.CucHQ.ma+'|$scope.ChiCucHQ.ma:'+$scope.ChiCucHQ.ma+'|self.nhx:' +self.nhx
	        			+'|$scope.MatHang.ma:'+$scope.MatHang.ma+'|$scope.LoaiKy.ma:' +$scope.LoaiKy.ma
	        			+'|$scope.Ky:' +$scope.Ky+'|$scope.Thang:'+$scope.Thang+'|self.year.getFullYear:'+nam//self.year.getFullYear()
	        			+'|self.fromDate:'+fromDate
	        			+'|self.toDate:'+toDate);        	
	        	
	        	thayDoiBoSungToKhaiHeThongService.searchCuaKhauNN($scope.CucHQ.ma,$scope.ChiCucHQ.ma,self.nhx,
	        			$scope.MatHang.ma, $scope.LoaiKy.ma, $scope.Ky,$scope.Thang, nam, fromDate,toDate)
	        	.then(
	        			function (deferred) {
	        				self.lstCuaKhauNN = deferred;
	        				$rootScope.showLoading = false;
	        				$scope.showReport1 = true;
	                    },
	                    function (errResponse) {
	                        console.error('Error while fetching data');
	                        $rootScope.showLoading = false;
	                    }
	                ); 
        	}
        }           
    	
    	function showPopup(grid, row){
    		var modalInstance = $uibModal.open({
    			animation: self.animationsEnabled,
    			ariaLabelledBy: 'modal-title',
    			ariaDescribedBy: 'modal-body',
    			templateUrl: 'cuaKhaunnVnaccsEdit',
    			controller: 'cuaKhaunnVnaccsModalCtrl',
    			controllerAs: 'self',
    			resolve: {
    				grid : function() {
						return grid;
					},
					row : function() {						
						return row;
					}
    			}
    		});
    		
    		modalInstance.result.then(function (data) {
    				if(data == 'success'){
    					self.currentPage = 1;
    					search(self.currentPage, self.pageSize);
    				}else{
    					console.log('Co loi xay ra');
    				}
    		    }, function () {
    		      //$log.info('modal-component dismissed at: ' + new Date());
    		    });
    	}
    	
    	function validateDate(fromDate, toDate){
    		if($scope.LoaiKy.ma != 'NG'){
    			return true;
    		}
    	    var objFromDate = fromDate;
    	    var objToDate = toDate;    	     
    	    var date1 = new Date(objFromDate);
    	    var date2 = new Date(objToDate);    	     
	        if(date1 >= date2)
	        {
//	            alert("'Đến ngày' phải lớn hơn 'Từ ngày'");
	        	$PopupMessage.Success("'Đến ngày' phải lớn hơn 'Từ ngày'");
	            return false; 
	        }
    	    return true;
    	}

}

var ModalInstanceCtrl = function($scope, $modalInstance,Title, Url,UrlIE) {
	$scope.title =Title;
	console.log($scope.title);
	$scope.UrlPDF=Url+"&type=PDFATTACH";
	$scope.UrlExcel=Url+"&type=EXCEL";
	$scope.Url = Url + UrlIE;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
};

angular.module('myApp').controller('cuaKhaunnVnaccsModalCtrl', cuaKhaunnVnaccsModalCtrl);
cuaKhaunnVnaccsModalCtrl.$inject = ['$uibModalInstance', 'grid', 'row', 'Tbs_CuaKhauNNService', '$PopupMessage']
function cuaKhaunnVnaccsModalCtrl($uibModalInstance, grid, row, Tbs_CuaKhauNNService, $PopupMessage) {
	var self = this;
	self.lstCuaKhauNN = angular.copy(grid);
	self.entity = angular.copy(row);
	console.log('start save data!');
	console.log(self.entity.addOrUpdate);
	self.message = '';
	  
//	self.saveData = saveData;

	self.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};	  	
}
