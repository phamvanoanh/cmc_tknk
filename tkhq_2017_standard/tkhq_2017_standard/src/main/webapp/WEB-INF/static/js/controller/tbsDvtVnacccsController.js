/**
 * Controller of model TBS_BIEUTHUE
 */

'use strict';

angular.module('myApp').controller('TbsDvtVnacccsController', TbsDvtVnacccsController);
TbsDvtVnacccsController.$inject = ['$scope', 'TbsDvtVnaccsService', 'pagerService', '$uibModal', '$PopupMessage'];

function TbsDvtVnacccsController($scope, TbsDvtVnaccsService, pagerService, $uibModal, $PopupMessage) {		
	console.log('start TbsDvtVnacccsController');
		var self = this;
		self.lstDvtVnaccs = [];		
        self.dvtVnaccsEntity = {
        		maDvt: '',
        		tenDvt: '',
        		tenDvtv: '',
        		tenDvtUni: '',        	        		
        		isChecked: false,
        		addOrUpdate: ''
        };        
        self.selectedList = []; //Danh sach row da chon        
        self.checkAll = false;                      
        
        //Them moi row su dung popup start
        self.editRow = editRow;                
        self.showPopup = showPopup;
        self.remove = remove;
        self.animationsEnabled = true;        
        self.search = search;
        
        self.totalItems = 0;
        self.currentPage = 1;
        self.maxSize = 5;
        self.pageSize = 10;
        search(self.currentPage, self.pageSize);
        
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
            search(self.currentPage, self.pageSize);
        };
        
        function delDvtVnaccs(chooseList) {
        	console.log('start delDvtVnaccs');
        	TbsDvtVnaccsService.delDvtVnaccs(chooseList)
                .then(
            		function (response){
                		self.checkAll = false;
                		search(1, self.pageSize);
                	},
                    function (errResponse) {
                        console.error(errResponse);
                    }
                );
        }
        
        $scope.toggleAll = function(){
        	for(var i = 0; i < self.lstDvtVnaccs.length; i++){
        		self.lstDvtVnaccs[i].isChecked = self.checkAll;
        	}
        };

        function remove() {
        	self.selectedList = [];        	
        	var selectedId = "";        	
        	for(var i = 0; i < self.lstDvtVnaccs.length; i++){
        		console.log('isChecked:',self.lstDvtVnaccs[i].isChecked);
        		if(self.lstDvtVnaccs[i].isChecked == true){
        			selectedId = self.lstDvtVnaccs[i].maDvt;        			
        			self.selectedList.push(selectedId);
        		}
        	}
            console.log('Id to be deleted: ', self.selectedList);
            if(self.selectedList.length == 0){
            	//angular.element(document.querySelector('.messageErrorArea')).text("Chưa chọn bản ghi nào để xóa");
            	$PopupMessage.Warning('Chưa chọn bản ghi nào để xóa!');
            	return;
            }
            $PopupMessage.Confirm('Bạn có chắc muốn xóa bản ghi?',DeleteObject,null);
        }
        
        function DeleteObject()
        {
        	//alert('Delete thanh cong ');
        	delDvtVnaccs(self.selectedList);
        };
        
        function search(currentPage, pageSize){
        	var param = {};
        	param["maDvt"] = $scope.maDvt;
        	param["tenDvt"] = $scope.tenDvt;
        	param["tenDvtv"] = $scope.tenDvtv;
        	param["tenDvtUni"] = $scope.tenDvtUni;        	
        	param["currentPage"] = currentPage;
        	param["pageSize"] = pageSize;
        	
        	console.log('search@param:',param);        	
        	
        	TbsDvtVnaccsService.searchDvtVnaccs(param)
        		.then(function(respone){        			
        			self.lstDvtVnaccs = respone.lstDvtVnaccs;
        			self.totalItems = respone.totalCount;
        			self.pageSize = parseInt(respone.pageSize);
        			self.currentPage = parseInt(respone.currentPage);
        			},
        			function(errResponse){
        				console.error(errResponse);
        			}
        		);        	
        }

        function reset() {
        	self.dvtVnaccsEntity = {
        			maDvt: '',
            		tenDvt: '',
            		tenDvtv: '',
            		tenDvtUni: '',
            		isChecked: false,
            		addOrUpdate: ''
            };
            //$scope.myForm.$setPristine(); //reset Form
        }
        
        $scope.addRow = function() {
        	reset(); //Lam moi entity
        	self.dvtVnaccsEntity.addOrUpdate = 'add';
    		self.showPopup(self.lstDvtVnaccs, self.dvtVnaccsEntity);
    	};
    	
    	function editRow(maDvt){
    		console.log('Id to be edited', maDvt);
            for (var i = 0; i < self.lstDvtVnaccs.length; i++) {
                if (self.lstDvtVnaccs[i].maDvt === maDvt) {
                    self.dvtVnaccsEntity = angular.copy(self.lstDvtVnaccs[i]);
                    break;
                }
            }
            self.dvtVnaccsEntity.addOrUpdate = 'update';
            self.showPopup(self.lstDvtVnaccs, self.dvtVnaccsEntity);
    	}    	
    	
    	function showPopup(grid, row){
    		var modalInstance = $uibModal.open({
    			animation: self.animationsEnabled,
    			ariaLabelledBy: 'modal-title',
    			ariaDescribedBy: 'modal-body',
    			templateUrl: 'dvtVnaccsEdit',
    			controller: 'dvtVnaccsModalCtrl',
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

}

angular.module('myApp').controller('dvtVnaccsModalCtrl', dvtVnaccsModalCtrl);
dvtVnaccsModalCtrl.$inject = ['$uibModalInstance', 'grid', 'row', 'TbsDvtVnaccsService', '$PopupMessage']
function dvtVnaccsModalCtrl($uibModalInstance, grid, row, TbsDvtVnaccsService, $PopupMessage) {
	var self = this;
	self.lstDvtVnaccs = angular.copy(grid);
	self.entity = angular.copy(row);
	console.log('start save data!');
	console.log(self.entity.addOrUpdate);
	self.message = '';
	  
	self.saveData = saveData;

	self.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	  
	function saveData() {
		if (self.entity.addOrUpdate == 'add') {
			console.log('Saving New Row', self.entity);
			crtDvtVnaccs(self.entity);
        } else {
        	console.log('Updated row with maCang ', self.entity.maDvt);
        	updDvtVnaccs(self.entity, self.entity.maDvt);
        }
  	}
	
	function crtDvtVnaccs(entity) {
		TbsDvtVnaccsService.crtDvtVnaccs(entity)
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
                    self.message = 'error';
            		var modalInstance;
            		if(errResponse.status == 409){
            			modalInstance = $PopupMessage.Error('Mã đơn vị tính đã tồn tại không thể thêm mới');
            		}
            		else{
            			modalInstance = $PopupMessage.Error('Không thể thêm mới xin hãy thử lại');
            		}
					
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
	
	function updDvtVnaccs(entity, maDvt) {
		TbsDvtVnaccsService.updDvtVnaccs(entity, maDvt)
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
