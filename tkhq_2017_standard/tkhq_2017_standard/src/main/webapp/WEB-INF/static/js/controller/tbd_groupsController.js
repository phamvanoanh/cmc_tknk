/**
 * 
 */
'use district;'
angular.module('myApp').controller('Tbs_sysGroupsController',
		Tbs_sysGroupsController);
Tbs_sysGroupsController.$inject = [ '$scope', 'Tbs_sysGroupsService',
		'pagerService', '$uibModal', '$PopupMessage', 'contextPath' ];
function Tbs_sysGroupsController($scope, Tbs_sysGroupsService, pagerService,
		$uibModal, $PopupMessage, contextPath) {
	console.log('start Tbs_sysGroupsController');
	var self = this;
	self.lstNhomNSD = [];
	self.entity = {
		groupId : "",
		groupName : "",
		groupCode : "",
		description : "",
		addOrUpdate : ''
	};
	self.getCucHQ = getCucHQ;
	getCucHQ();
	self.lstChiCuc = [];
	self.dsNSDinN = [];
	self.dsNSD = [];
	var lstDSND = [];
	$scope.hideErrorMessage = true;
	self.showPopup = showPopup;
	self.editRow = editRow;
	self.remove = remove;
	self.getlstNSD = getlstNSD;
	getNhomNSD();
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
		$scope.phantrang = self.lstNhomNSD.slice(begin, end);
	});

	// Load page
	function getCucHQ() {
		Tbs_sysGroupsService.GetCucHQ().then(function(response) {
			var array = angular.fromJson(response);
			self.lstCucHQ = array;
			$scope.cucHQ = array[0];
		})

	}
	$scope.GetChiCucHQByCuc = function() {
		if ($scope.cucHQ.ma != '00') {
			Tbs_sysGroupsService.GetChiCucHQByCuc($scope.cucHQ.ma).then(
					function(response) {
						var array = angular.fromJson(response);
						array.push({
							"ma" : "000",
							"ten" : "--Vui lòng chọn--"
						})
						self.lstChiCuc = array;
						$scope.chiCucSelected = array[array.length - 1];
					});
		} else {
			self.lstChiCuc = null;
		}
	}
	function getNhomNSD() {
		$scope.lstNhom = [];
		Tbs_sysGroupsService
				.GetGroups()
				.then(
						function(response) {
							var array = angular.fromJson(response);
							self.lstNhomNSD = array;
							var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
									+ $scope.numPerPage;
							$scope.phantrang = self.lstNhomNSD
									.slice(begin, end);
							getTotalPage(self.lstNhomNSD.length);

							for (var int = 0; int < array.length; int++) {
								$scope.lstNhom.push(array[int]);
							}
							$scope.lstNhom.push({
								"groupId" : "Vui lòng chọn",
								"groupCode" : "Vui lòng chọn"
							});
							$scope.GroupName = $scope.GroupQL = $scope.lstNhom[$scope.lstNhom.length - 1];

						})

	}

	// Reset entity
	function reset() {
		self.entity = {
			groupId : "",
			groupName : "",
			groupCode : "",
			description : "",
			addOrUpdate : ''
		};
	}
	// function thêm mới
	$scope.addRow = function() {
		reset(); // Lam moi entity
		self.entity.addOrUpdate = 'add';
		$scope.Title = "Thêm mới nhóm người dùng"
		self.showPopup(self.lstNhomNSD, self.entity);
	};

	// function sửa đổi
	function editRow(groupId) {
		console.log('groupId to be edited', groupId);
		for (var i = 0; i < self.lstNhomNSD.length; i++) {
			if (self.lstNhomNSD[i].groupId === groupId) {
				self.entity = angular.copy(self.lstNhomNSD[i]);
				break;
			}
		}
		self.entity.addOrUpdate = 'update';
		$scope.Title = "Thay đổi thông tin nhóm người dùng"
		self.showPopup(self.lstNhomNSD, self.entity);
	}
	// show model thêm sửa
	function showPopup(grid, row) {
		$scope.$modalInstance = $uibModal.open({
			animation : self.animationsEnabled,
			scope : $scope,
			backdrop: 'static',
			ariaLabelledBy : 'modal-title',
			ariaDescribedBy : 'modal-body',
			templateUrl : 'themnhomNSD'
		});

	}
	// cập nhập dữ liệu lên database
	$scope.AddNewGroup = function() {
		if (self.entity.addOrUpdate == 'add') {
			Tbs_sysGroupsService
					.crtGroups(self.entity)
					.then(
							function(response) {
								switch (response) {
								case 1:
									$PopupMessage
											.Success('Cập nhập thành công. ');
									$scope.hideErrorMessage = true;
									$scope.$modalInstance.close();
									$scope.Title = "";
									$scope.Search();
									break;
								case 2:
									$PopupMessage
									.Error('Có lỗi trong quá trình tạo mới . Vui lòng kiểm tra lại');
									break;
								case 3:
									$PopupMessage
									.Error('Tên nhóm viết tắt đã tồn tại . Vui lòng chọn tên khác');
									break;
								default:
									break;
								}
							});
		}
		if (self.entity.addOrUpdate == 'update') {
			Tbs_sysGroupsService.updGroups(self.entity, self.entity.groupId)
					.then(function(errResponse) {
						$PopupMessage.Success('Cập nhập thành công. ');
						$scope.$modalInstance.close();
						$scope.Search();

					});
		}
	}

	// function Xóa
	function remove(groupId) {
		$scope.Message = "Bạn có muốn xóa nhóm này không ?"
		$scope.Title = "Xóa nhóm người dùng ?"
		$scope.deleteId = groupId;
		$scope.$modalInstance = $uibModal.open({
			animation : self.animationsEnabled,
			scope : $scope,
			ariaLabelledBy : 'modal-title',
			ariaDescribedBy : 'modal-body',
			templateUrl : contextPath + '/static/dialogs/Confirm_Fix.html'
		});

	}
	$scope.Delete = function() {
		Tbs_sysGroupsService.delGroups($scope.deleteId).then(
				function(response) {
					$scope.$modalInstance.close();
					$scope.Search();
				});
	}

	// function tìm kiếm
	$scope.Search = function() {
		var groupCode = angular.isUndefined($scope.groupCode) ? ""
				: $scope.groupCode;
		var groupName = angular.isUndefined($scope.groupName) ? ""
				: $scope.groupName;
		Tbs_sysGroupsService
				.SearchGroup(groupCode, groupName)
				.then(
						function(response) {
							// var array = angular.fromJson(response);
							self.lstNhomNSD = response;
							var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
									+ $scope.numPerPage;
							$scope.phantrang = self.lstNhomNSD
									.slice(begin, end);
							getTotalPage(self.lstNhomNSD.length);
						});
	}

	$scope.cancel = function() {
		$scope.$modalInstance.dismiss('cancel');
	}

	// Quản lý người dùng.
	// Thêm người dùng vào nhóm
	var lstAddNhom = [];
	var lstRemoveNhom = [];
	$scope.addNhom = function() {
		var groupId = angular.isUndefined($scope.GroupQL) ? ""
				: $scope.GroupQL.groupId;
		var userId = angular.isUndefined($scope.addNSD[0]) ? ""
				: $scope.addNSD[0].userId;
		if (groupId != "" && userId != "") {
			for (var int = 0; int < lstDSND.length; int++) {
				if (lstDSND[int].userId == $scope.addNSD[0].userId) {
					lstDSND[int].groupId = $scope.GroupQL.groupId;
					getlstNSD();
				}
			}
		}
	}
	// Xóa người dùng khỏi nhóm
	$scope.removeNhom = function() {
		var groupId = angular.isUndefined($scope.GroupQL) ? ""
				: $scope.GroupQL.groupId;
		var userId = angular.isUndefined($scope.removeNSD[0]) ? ""
				: $scope.removeNSD[0].userId;
		if (groupId != "" && userId != "") {
			for (var int = 0; int < lstDSND.length; int++) {
				if (lstDSND[int].userId == $scope.removeNSD[0].userId) {
					lstDSND[int].groupId = null;
					getlstNSD();
				}
			}
		}
	}
	// Save vào database
	$scope.saveQL = function() {
		var groupId = angular.isUndefined($scope.GroupQL) ? ""
				: $scope.GroupQL.groupId;
		if (lstDSND.length > 0) {
			if (groupId != "" && groupId != "Vui lòng chọn") {
				for (i = 0; i < lstDSND.length; i++) {
					Tbs_sysGroupsService.updUser(lstDSND[i],
							lstDSND[i].username).then(function(response) {
					})
				}
				$PopupMessage.Success("Cập nhật thành công");
				getlstNSD();
			} else {
				$PopupMessage
				.Error('Vui lòng chọn nhóm người dùng');
			}
		} else {
			$PopupMessage
			.Error('Không có dữ liệu để ghi lại.');

		}

	}
	// lấy danh sách người sử dụng phân loại thuộc nhóm hoặc không thuộc nhóm
	function getlstNSD() {
		self.dsNSDinN = [];
		self.dsNSD = [];
		if (lstDSND.length > 0) {
			self.dsNSD = lstDSND.filter(function(el) {
				return el.groupId == null;
			});
			var groupId = angular.isUndefined($scope.GroupQL) ? ""
					: $scope.GroupQL.groupId;
			if (groupId != "") {
				self.dsNSDinN = lstDSND.filter(function(el) {
					return el.groupId === groupId;
				});
			}
		}
	}
	// Lấy danh sách người dùng theo Hải quan
	$scope.getdsNSD = function() {
		lstAddNhom = [];
		lstRemoveNhom = [];
		lstDSND = [];
		var maHQ;
		if (!angular.isUndefined($scope.chiCucSelected)
				&& $scope.chiCucSelected != null
				&& $scope.chiCucSelected.ma != "000") {
			maHQ = $scope.chiCucSelected.ma;
		} else {
			maHQ = $scope.cucHQ.ma;
		}
		Tbs_sysGroupsService.GetDsNguoiDung(maHQ).then(function(response) {
			lstDSND = response;
			getlstNSD();
		});
	}
}
