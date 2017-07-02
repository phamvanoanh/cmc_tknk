/**
 * Controller of model TBS_BIEUTHUE
 */

'use strict';

angular.module('myApp').controller('Tbs_BieuThueController', Tbs_BieuThueController);
Tbs_BieuThueController.$inject = ['$rootScope', '$scope', 'TBS_BieuThueService', 'pagerService', '$uibModal', '$PopupMessage'];

function Tbs_BieuThueController($rootScope, $scope, TBS_BieuThueService, pagerService, $uibModal, $PopupMessage) {
		
		var self = this;
		//define variable
		self.lstBieuThue = [];
        self.bieuthueEntity = {
        		bieuThueId: 0,
        		maBieuThue: '',
        		tenBieuThue: '',
        		thueSuat: 0.00,
        		kieuBieuThue: 0,
        		maHS: '',
        		ngayHL: new Date(),
        		ngayHHL: new Date(),
        		isChecked: false
        };
        self.selectedList = []; //Danh sach row da chon        
        self.checkAll = false;
        
        //method handle action in form
        self.remove = remove;	//Xoa ban ghi da chon        
        self.editRow = editRow;	//Cap nhat ban ghi da chon
        self.showPopup = showPopup;	//Hien thi popup cho them moi va cap nhat du lieu
        self.search = search;	//Tim kiem tren form
        
        //option of popup
        self.animationsEnabled = true;
        
        //pagination
        self.pager = {};
        //self.setPage = setPage;
        //variable of paging
        self.totalItems = 0;
        self.currentPage = 1;
        self.maxSize = 5;
        self.pageSize = 10;
        
        //Progress bar
        $rootScope.showLoading = true;
        
        //get all data after initialize property of controller
        //fetchAllBieuThues();
        search(self.currentPage, self.pageSize);

        function fetchAllBieuThues() {
        	
        	TBS_BieuThueService.fetchAllBieuThues()
            	.then(
        			function (deferred) {
        				//self.totalItems = deferred.totalItems;
        				//setPage(self.totalItems, selft.currentPage, selft.pageSize);
        				
        				self.lstBieuThue = deferred;
        				for(var i = 0; i < self.lstBieuThue.length; i++){
        					angular.extend(self.lstBieuThue[i], {isChecked: false}); 
        				}
                    },
                    function (errResponse) {
                        console.error(errResponse);
                    }
                );
        }
        
//        function setPage(totalItems, currentPage, pageSize){
//        	selft.pager = pagerService.GetPager(totalItems, currentPage, pageSize);
//        }
        
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
            search(self.currentPage, self.pageSize);
        };

        function delBieuThue(selectedList) {
        	
        	TBS_BieuThueService.delBieuThue(selectedList)
                .then(
                	function (response){
                		self.checkAll = false;
                		search();
                	},
                    function (errResponse) {
                        console.error(errResponse);
                    }
                );
        }
        
        function search(currentPage, pageSize){
        	if(typeof currentPage == 'undefined' || currentPage == ''){
        		currentPage = 1;
        	}
        	if(typeof pageSize == 'undefined'){
        		pageSize = self.pageSize;
        	}
        	
        	var param = {};
        	param["maBieuThue"] = $scope.maBieuThue;
        	param["tenBieuThue"] = $scope.tenBieuThue;
        	param["maHS"] = $scope.maHS;
        	param["currentPage"] = currentPage;
        	param["pageSize"] = pageSize;
        	
        	//var data = angular.toJson(param);
        	$rootScope.showLoading = true;
        	
        	TBS_BieuThueService.searchBieuThue(param)
        		.then(function(respone){
        				console.log("Respone received: " +  respone);
        				self.lstBieuThue = respone.content;
        				self.totalItems = respone.totalItems;
        				self.pageSize = respone.pageSize;
        			
        				for(var i = 0; i < self.lstBieuThue.length; i++){
        					angular.extend(self.lstBieuThue[i], {isChecked: false}); 
        				}
        				//$state.forceReload(); reload data
        				$rootScope.showLoading = false;
        			},
        			function(errResponse){
        				console.error(errResponse);
    					self.lstBieuThue = [];
    					self.totalItems = 0;
        				$rootScope.showLoading = false;
        			}
        		);
        }
        
        $scope.toggleAll = function(){
        	for(var i = 0; i < self.lstBieuThue.length; i++){
        		self.lstBieuThue[i].isChecked = self.checkAll;
        	}
        };

        function remove() {
        	self.selectedList = [];
        	var selectedId = "";
        	for(var i = 0; i < self.lstBieuThue.length; i++){
        		if(self.lstBieuThue[i].isChecked == true){
        			selectedId = self.lstBieuThue[i].bieuThueId;
        			self.selectedList.push(selectedId);
        		}
        	}
            console.log('Id to be deleted: ', self.selectedList);
            if(self.selectedList.length == 0){
            	//angular.element(document.querySelector('.messageErrorArea')).text("Chưa chọn bản ghi nào để xóa");
            	$PopupMessage.Warning('Chưa chọn bản ghi nào để xóa!');
            	return;
            }

            $PopupMessage.Confirm('Bạn có chắc muốn xóa bản ghi?', DeleteData , null);
        }
        
        function DeleteData()
        {
        	//console.log("function ok");
        	/*modalInstance.result.then(function (data) {
				if(data == 'ok'){
					$rootScope.showLoading = true;*/
					delBieuThue(self.selectedList);
				/*}
				else if (data == 'cancel'){
					console.log("Delete cancel");
				}
				else{
					console.log("Error");
				}
		    });*/
        }
        
        function reset() {
        	self.bieuthueEntity = {
        			bieuThueId: 0,
            		maBieuThue: '',
            		tenBieuThue: '',
            		thueSuat: 0.00,
            		kieuBieuThue: 0,
            		maHS: '',
            		ngayHL: new Date(),
            		ngayHHL: new Date(),
            		isChecked: false
            		
            };
            //$scope.myForm.$setPristine(); //reset Form
        }
        
        $scope.addRow = function() {
        	reset(); //Lam moi entity
    		self.showPopup(self.lstBieuThue, self.bieuthueEntity);
    	};
    	
    	function editRow(id){
    		console.log('Id to be edited', id);
            for (var i = 0; i < self.lstBieuThue.length; i++) {
                if (self.lstBieuThue[i].bieuThueId === id) {
                    self.bieuthueEntity = angular.copy(self.lstBieuThue[i]);
                    self.bieuthueEntity.ngayHL = new Date(self.bieuthueEntity.ngayHL);
                    self.bieuthueEntity.ngayHHL = new Date(self.bieuthueEntity.ngayHHL);
                    break;
                }
            }
            self.showPopup(self.lstBieuThue, self.bieuthueEntity);
    	}   	
    	
    	function showPopup(grid, row){
    		var modalInstance = $uibModal.open({
    			animation: self.animationsEnabled,
    			ariaLabelledBy: 'modal-title',
    			ariaDescribedBy: 'modal-body',
    			size: 'lg',
    			templateUrl: 'bieuThueEdit',
    			controller: 'bieuThueModalCtrl',
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
    					console.log('Lỗi close popup');
    				}
    		    }, function () {
    		      //$log.info('modal-component dismissed at: ' + new Date());
    		    });
    	}

}

angular.module('myApp').controller('bieuThueModalCtrl', bieuThueModalCtrl);
bieuThueModalCtrl.$inject = ['$scope', '$uibModalInstance', 'grid', 'row', 'TBS_BieuThueService', '$PopupMessage']
function bieuThueModalCtrl($scope, $uibModalInstance, grid, row, TBS_BieuThueService, $PopupMessage) {
	var self = this;
	self.lstBieuThue = angular.copy(grid);
	self.entity = angular.copy(row);
	self.message = '';
	  
	self.saveData = saveData;

	self.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	$scope.showError == false;
	
	//Date picker
	$scope.popup1 = {
		opened: false
	};
    $scope.popup2 = {
		opened: false
    };
    
    $scope.open1 = function() {
    	console.log("Open date picker");
        $scope.popup1.opened = true;
    };
    
    $scope.open2 = function() {
    	console.log("Open date picker");
        $scope.popup2.opened = true;
    };
    
    $scope.dateOptions = {
    	    //dateDisabled: disabled,
    	    formatYear: 'yy',
    	    //maxDate: new Date(2020, 5, 22),
    	    //minDate: new Date(),
    	    startingDay: 1,
    	    'show-weeks' : false
    };
    
    // Disable weekend selection
//    function disabled(data) {
//      var date = data.date,
//        mode = data.mode;
//      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
//    }
	  
	function saveData() {
		console.log("Ngày HL: " + self.entity.ngayHL + " Ngày HHL: " + self.entity.ngayHHL);
		if(!Date.parse(self.entity.ngayHL) || !Date.parse(self.entity.ngayHHL)){
			angular.element(document.querySelector('#messageErrorArea')).text('Sai định dạng ngày tháng.');
			$scope.showError == true;
			return;
		}
		
		var ngayHL = new Date(self.entity.ngayHL);
		var ngayHHL = new Date(self.entity.ngayHHL);
		
		if(ngayHL > ngayHHL){
			angular.element(document.querySelector('#messageErrorArea')).text('Ngày hiệu lực phải nhỏ hơn ngày hết hiệu lực.');
			$scope.showError == true;
			return;
		}
		
		if (self.entity.bieuThueId == '0') {
			console.log('Saving New Row', self.entity);
			crtBieuThue(self.entity);
        } else {
        	console.log('Updated row with id ', self.entity.bieuThueId);
        	updBieuThue(self.entity, self.entity.bieuThueId);
        }
  	}
	
	function crtBieuThue(entity) {
		TBS_BieuThueService.crtBieuThue(entity)
            .then(
            	function (response){
            		self.message = 'Create success';
            		var modalInstance = $PopupMessage.Success('Thêm mới thành công');
        			
        			modalInstance.result.then(function (data) {
        				if(data == 'close'){
        					$uibModalInstance.close("success");
        				}
        				else{
        					$uibModalInstance.close("error");
        				}
        		    });
            	},
                function (errResponse) {
            		console.error(errResponse);
            		self.message = 'error';
            		var modalInstance = $PopupMessage.Error('Không thể thêm mới xin hãy thử lại');
					
					modalInstance.result.then(function (data) {
						if(data == 'close'){
							console.log("Đóng modal");
						}
						else{
							console.log("Lỗi khi đóng modal");
						}
				    });
                }
            );
    }
	
	function updBieuThue(entity, id) {
    	TBS_BieuThueService.updBieuThue(entity, id)
            .then(
            	function (ressponse){
            		self.message = 'Update success';
            		var modalInstance = $PopupMessage.Success('Cập nhật thành công');
        			
        			modalInstance.result.then(function (data) {
        				if(data == 'close'){
        					$uibModalInstance.close("success");
        				}
        				else{
        					$uibModalInstance.close("error");
        				}
        		    });
            	},
                function (errResponse) {
                    console.error(errResponse);
                    self.message = 'error';
                    var modalInstance = $PopupMessage.Error('Không thể cập nhật xin hãy thử lại');
					
					modalInstance.result.then(function (data) {
						if(data == 'close'){
							console.log("Đóng modal");
						}
						else{
							console.log("Lỗi khi đóng modal");
						}
				    });
                }
            );
    }
	
//	function fetchAllBieuThues() {
//    	TBS_BieuThueService.fetchAllBieuThues()
//        	.then(
//    			function (deferred) {
//    				self.lstBieuThue = deferred;
//                },
//                function (errResponse) {
//                    console.error('Error while fetching data');
//                }
//            );
//    }
}