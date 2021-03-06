/**
 * Controller of model TBS_TINHTP
 */

'use strict';

angular.module('myApp').controller('Tbs_TinhTPController', Tbs_TinhTPController);
Tbs_TinhTPController.$inject = ['$rootScope','$scope', 'TBS_TinhTPService', '$uibModal', '$PopupMessage'];

function Tbs_TinhTPController($rootScope, $scope, TBS_TinhTPService, $uibModal, $PopupMessage) {
		
		var self = this;
		//define variable
		self.lstTinhTP = [];
        self.tinhTPEntity = {
    		maTinhTP: '00',
    		tenTinhTP: '',
    		isChecked: false
        };
        self.selectedList = []; //Danh sach row da chon        
        self.checkAll = false;
        
        //method handle action in form
        self.remove = remove;	//Xoa ban ghi da chon
        self.addRow = addRow;	//Them moi
        self.editRow = editRow;	//Cap nhat ban ghi da chon
        self.showPopup = showPopup;	//Hien thi popup cho them moi va cap nhat du lieu
        self.search = search;	//Tim kiem tren form
        
        //option of popup
        self.animationsEnabled = true;
        
        //pagination
        self.pager = {};
        //variable of paging
        self.totalItems = 0;
        self.currentPage = 1;
        self.maxSize = 5;
        self.pageSize = 10;
        
        //Progress bar
        $rootScope.showLoading = true;
        
        //get all data after initialize property of controller
        setTimeout(function() {
        	search(self.currentPage, self.pageSize);
        }, 500);
        //search(self.currentPage, self.pageSize);
        
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
            search(self.currentPage, self.pageSize);
        };
        
        function search(currentPage, pageSize){
        	if(typeof currentPage == 'undefined' || currentPage == ''){
        		currentPage = 1;
        	}
        	if(typeof pageSize == 'undefined'){
        		pageSize = self.pageSize;
        	}
        	
        	var param = {};
        	param["maTinhTP"] = $scope.maTinhTP;
        	param["tenTinhTP"] = $scope.tenTinhTP;
        	param["currentPage"] = currentPage;
        	param["pageSize"] = pageSize;
        	
        	//$PopupMessage.showProgress();
        	$rootScope.showLoading = true;
        	
        	TBS_TinhTPService.searchTinhTP(param)
        		.then(function(respone){
        			self.lstTinhTP = respone.content;
        			self.totalItems = respone.totalItems;
        			self.pageSize = respone.pageSize;
        			
        			for(var i = 0; i < self.lstTinhTP.length; i++){
    					angular.extend(self.lstTinhTP[i], {isChecked: false}); 
    				}
        			//$state.forceReload(); reload data
        			
        			//$PopupMessage.hideProgress();
        			$rootScope.showLoading = false;
        			},
        			function(errResponse){
        				console.error(errResponse);
        				if(errResponse == 404){
        					self.lstTinhTP = [];
        					self.totalItems = 0;
        				}
        				$rootScope.showLoading = false;
        			}
        		);
        }
        
        $scope.toggleAll = function(){
        	for(var i = 0; i < self.lstTinhTP.length; i++){
        		self.lstTinhTP[i].isChecked = self.checkAll;
        	}
        };

        function remove() {
        	self.selectedList = [];
        	var selectedId = "";
        	for(var i = 0; i < self.lstTinhTP.length; i++){
        		if(self.lstTinhTP[i].isChecked == true){
        			selectedId = self.lstTinhTP[i].maTinhTP;
        			self.selectedList.push(selectedId);
        		}
        	}

            if(self.selectedList.length == 0){
            	//angular.element(document.querySelector('.messageErrorArea')).text("Chưa chọn bản ghi nào để xóa");
            	$PopupMessage.Warning('Chưa chọn bản ghi nào để xóa!');
            	return;
            }

//            var modalInstance = $PopupMessage.Confirm('Bạn có chắc muốn xóa bản ghi?');
//            
//            modalInstance.result.then(function (data) {
//				if(data == 'ok'){
//					//$PopupMessage.showProgress();
//					$rootScope.showLoading = true;
//					delTinhTP(self.selectedList);
//				}
//				else if (data == 'cancel'){
//					console.log("Delete cancel");
//				}
//				else{
//					console.log("Error");
//				}
//		    });
            
            $PopupMessage.Confirm('Bạn có chắc muốn xóa bản ghi?',DeleteData,null);
        }
        
        function DeleteData()
        {
        	delTinhTP(self.selectedList);
        }
        
        function delTinhTP(selectedList) {
        	TBS_TinhTPService.delTinhTP(selectedList)
                .then(function (response) {
                	self.checkAll = false;
                	self.currentPage = 1;
                	search(self.currentPage, self.pageSize);
                },
                function (errResponse) {
                    console.error(errResponse);
                }
            );
        }

        function reset() {
        	self.tinhTPEntity = {
    			maTinhTP: '00',
        		tenTinhTP: '',
        		isChecked: false
            };
            //$scope.myForm.$setPristine(); //reset Form
        }
    	
    	function addRow(){
    		reset(); //Lam moi entity
    		self.showPopup(self.lstTinhTP, self.tinhTPEntity);
    	}
    	
    	function editRow(id){
            for (var i = 0; i < self.lstTinhTP.length; i++) {
                if (self.lstTinhTP[i].maTinhTP === id) {
                    self.tinhTPEntity = angular.copy(self.lstTinhTP[i]);
                    break;
                }
            }
            self.showPopup(self.lstTinhTP, self.tinhTPEntity);
    	}   	
    	
    	function showPopup(grid, row){
    		var modalInstance = $uibModal.open({
    			animation: self.animationsEnabled,
    			ariaLabelledBy: 'modal-title',
    			ariaDescribedBy: 'modal-body',
    			templateUrl: 'tinhTPEdit',
    			controller: 'tinhTPModalCtrl',
    			controllerAs: 'self',
    			resolve: {
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
    					console.log('Có lỗi xảy ra');
    				}
    		    }, function () {
    		      //$log.info('modal-component dismissed at: ' + new Date());
    		    });
    	}

}

angular.module('myApp').controller('tinhTPModalCtrl', tinhTPModalCtrl);
tinhTPModalCtrl.$inject = ['$uibModalInstance', 'row', 'TBS_TinhTPService', '$PopupMessage']
function tinhTPModalCtrl($uibModalInstance, row, TBS_TinhTPService, $PopupMessage) {
	var self = this;
	self.entity = angular.copy(row);
	self.message = '';
	  
	self.saveData = saveData;

	self.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	  
	function saveData() {
		if (self.entity.maTinhTP == '00') {
			console.log('Saving New Row', self.entity);
			crtTinhTP(self.entity);
        } else {
        	console.log('Updated row with id ', self.entity.maTinhTP);
        	updTinhTP(self.entity, self.entity.maTinhTP);
        }
  	}
	
	function crtTinhTP(entity) {
		TBS_TinhTPService.crtTinhTP(entity)
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
	
	function updTinhTP(entity, id) {
		TBS_TinhTPService.updTinhTP(entity, id)
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
}
