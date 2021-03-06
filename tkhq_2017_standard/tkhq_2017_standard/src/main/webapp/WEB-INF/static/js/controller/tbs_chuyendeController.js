/**
 * 
 */
'use strict';

angular.module('myApp').controller('Tbs_ChuyenDeController',
		Tbs_ChuyenDeController);
Tbs_ChuyenDeController.$inject = [ '$scope', 'Tbs_ChuyenDeService',
		'pagerService', '$uibModal', '$PopupMessage' ];

function Tbs_ChuyenDeController($scope, Tbs_ChuyenDeService, pagerService,
		$uibModal, $PopupMessage) {
	console.log('start Tbs_ChuyenDeController');
	var self = this;
	self.lstChuyenDe = [];
	self.chuyenDeEntity = {
		maCDe : '',
		tenCDe : '',
		maHang : '',
		motaHH : '',
		isChecked : false,
		addOrUpdate : ''
	}
	self.selectedList = [];
	self.checkAll = false;

	// Them moi row su dung popup start
	self.editRow = editRow;
	self.showPopup = showPopup;
	self.remove = remove;
	self.animationsEnabled = true;

	self.search = search;
	search();
	// Phân trang
	$scope.numPerPage = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 5;
	self.getTotalPage = getTotalPage;
	$scope.totalPage = [];
	self.getTotalPage = getTotalPage;
	function getTotalPage(total) {
		if (total % $scope.numPerPage > 0) {
			$scope.totalPage = Math.floor(total / $scope.numPerPage) + 1;
		} else {
			$scope.totalPage = Math.floor(total / $scope.numPerPage);
		}
		if (total == 0) {
			$scope.totalPage = 1;
		}
	}
	$scope.$watch("currentPage + numPerPage", function() {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
				+ $scope.numPerPage;
		$scope.phantrang = self.lstChuyenDe.slice(begin, end);
	});
	function search() {
		var param = {};
		param["maCDe"] = $scope.maCDe;
		param["tenCDe"] = $scope.tenCDe;
		param["maHang"] = $scope.maHang;
		param["motaHH"] = $scope.motaHH;
		Tbs_ChuyenDeService
				.searchChuyenDe(param)
				.then(
						function(response) {
							
							self.lstChuyenDe = response;
							getTotalPage(self.lstChuyenDe.length);
							var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
									+ $scope.numPerPage;
							$scope.phantrang = self.lstChuyenDe.slice(begin,
									end);
							if(self.lstChuyenDe.length == 0)
								{
								$PopupMessage.Error('Không có kết quả tìm kiếm');
								}

						}, function(errResponse) {
							console.error(errResponse);
						});
	}
	function remove() {
		self.selectedList = [];
		var selectedId = "";
		if (self.checkAll == true) {
			for (var i = 0; i < self.lstChuyenDe.length; i++) {

				selectedId = self.lstChuyenDe[i].maCDe;
				self.selectedList.push(selectedId);

			}
		} else {
			for (var i = 0; i < self.lstChuyenDe.length; i++) {
				if (self.lstChuyenDe[i].isChecked == true) {
					selectedId = self.lstChuyenDe[i].maCDe;
					self.selectedList.push(selectedId);
				}
			}
		}
		console.log('Id to be deleted: ', self.selectedList);
		if (self.selectedList.length == 0) {
			//angular.element(document.querySelector('.messageErrorArea')).text("Chưa chọn bản ghi nào để xóa");
			$PopupMessage.Error('Chưa chọn bản ghi nào để xóa!');
        	return;
		}
		$PopupMessage.Confirm('Bạn có chắc muốn xóa bản ghi?', DeleteObject, null);

	}

	function DeleteObject() {
		delChuyenDe(self.selectedList);
	}
	function delChuyenDe(chooseList) {
		Tbs_ChuyenDeService.delChuyenDe(chooseList).then(function(errResponse) {
			switch (errResponse) {
			case 1:
				$PopupMessage.Success('Xóa chuyên đề thành công');
				search();
				break;
			case 0:
				$PopupMessage.Error('Chuyên đề không còn tồn tại');
				break;
			}
		});
	}

	$scope.pageChanged = function() {
		search();
	};

	function reset() {
		self.chuyenDeEntity = {
			maCDe : '',
			tenCDe : '',
			maHang : '',
			motaHH : '',
			isChecked : false,
			addOrUpdate : ''
		};
	}

	$scope.addRow = function() {
		reset(); // Lam moi entity
		self.chuyenDeEntity.addOrUpdate = 'add';
		self.showPopup(self.lstChuyenDe, self.chuyenDeEntity);
	};

	function editRow(maCDe) {
		for (var i = 0; i < self.lstChuyenDe.length; i++) {
			if (self.lstChuyenDe[i].maCDe === maCDe) {
				self.chuyenDeEntity = angular.copy(self.lstChuyenDe[i]);
				break;
			}
		}
		self.chuyenDeEntity.addOrUpdate = 'update';
		self.showPopup(self.lstChuyenDe, self.chuyenDeEntity);
	}

	function showPopup(grid, row) {
		var modalInstance = $uibModal.open({
			animation : self.animationsEnabled,
			ariaLabelledBy : 'modal-title',
			ariaDescribedBy : 'modal-body',
			templateUrl : 'chuyendeEdit',
			controller : 'chuyenDeModalCtrl',
			controllerAs : 'self',
			resolve : {
				grid : function() {
					search();
					return grid;
				},
				row : function() {
					return row;
				}
			}
		});

		modalInstance.result.then(function(data) {
			search();
		}, function() {

		});
	}
}
angular.module('myApp').controller('chuyenDeModalCtrl', chuyenDeModalCtrl);
chuyenDeModalCtrl.$inject = [ '$uibModalInstance', 'grid', 'row',
		'Tbs_ChuyenDeService', '$PopupMessage' ]
function chuyenDeModalCtrl($uibModalInstance, grid, row, Tbs_ChuyenDeService,
		$PopupMessage) {
	var self = this;
	self.lstChuyenDe = angular.copy(grid);
	self.entity = angular.copy(row);
	console.log('start save data!');
	self.message = '';

	self.saveData = saveData;

	self.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	function saveData() {
		if (self.entity.addOrUpdate == 'add') {
			crtChuyenDe(self.entity);
		} else {
			updChuyenDe(self.entity, self.entity.maCDe);
		}

	}

	function crtChuyenDe(entity) {
		Tbs_ChuyenDeService.crtChuyenDe(entity).then(function(response) {
			self.message = response;
			switch (self.message) {
			case 0:
				$PopupMessage.Error('Chuyên đề không tồn tại');
				break;
			case 1:
				$PopupMessage.Success('Cập nhật thành công ');
				$uibModalInstance.close(self.message);
				break;
			case 2:
				$PopupMessage.Error('Có lỗi trong quá trình xử lý ');
				break;
			case 3:
				$PopupMessage.Error('Đã tồn tại chuyên đề này ');
				break;
			default:
				return false;
			}
		});
	}

	function updChuyenDe(entity, maCDe) {
		Tbs_ChuyenDeService.updChuyenDe(entity, maCDe).then(function(response) {
			self.message = response;
			switch (self.message) {
			case 0:
				$PopupMessage.Error('Chuyên đề không tồn tại');
				break;
			case 1:
				$PopupMessage.Success('Cập nhật thành công ');
				$uibModalInstance.close(self.message);
				break;
			case 2:
				$PopupMessage.Error('Có lỗi trong quá trình xử lý ');
				break;
			case 3:
				$PopupMessage.Error('Đã tồn tại chuyên đề này ');
				break;
			default:
				return false;
			}
		});
	}
}