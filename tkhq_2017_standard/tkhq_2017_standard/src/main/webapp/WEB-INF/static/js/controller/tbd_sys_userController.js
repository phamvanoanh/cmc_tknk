/**
 * 
 */
'use district;'

angular.module('myApp').controller('Tbs_sysUserController',
		Tbs_sysUserController).constant('userlogin', _userlogin);
Tbs_sysUserController.$inject = [ '$scope', 'Tbs_sysUserService',
		'pagerService', '$uibModal', '$PopupMessage', 'userlogin',
		'contextPath' ];

function Tbs_sysUserController($scope, Tbs_sysUserService, pagerService,
		$uibModal, $PopupMessage, userlogin, contextPath) {
	console.log('start Tbs_sysUserController');
	var self = this;
	self.lstUser = [];
	self.lstHQ = [];
	self.lstCucHQ = [];
	self.lstChiCuc = [];
	self.lstNhomNSD = [];
	self.selectedList = [];
	self.lstActive = [ {
		"ma" : 0,
		"ten" : "Không hoạt động"
	}, {
		"ma" : 1,
		"ten" : "Đang hoạt động"
	}, {
		"ma" : 2,
		"ten" : "Tất cả"
	} ];
	$scope.lstActive = [ {
		"ma" : "0",
		"ten" : "Không hoạt động"
	}, {
		"ma" : "1",
		"ten" : "Đang hoạt động"
	} ];
	self.entity = {
		userId : '',
		groupId : '',
		username : '',
		password : '',
		fullName : '',
		maHq : '',
		chucvu : '',
		workstation : '',
		emailHQ : '',
		emailKhac : '',
		dienthoai : '',
		didong : '',
		userdescription : '',
		isLanhdao : '',
		active : '',
		addOrUpdate : ''
	}
	$scope.hideSuccessMessage = true;
	$scope.hideSuccess = true;
	self.hideError = true;
	self.hideCF = true;
	$scope.hidecheckOld = true;
	$scope.hidecheckcfnewPass = true;
	$scope.IsMatch = false;
	$scope.hidenewlikeold = true;
	self.showPopup = showPopup;
	self.editRow = editRow;
	self.remove = remove;
	self.getNhomNSD = getNhomNSD;
	self.getlstHQ = getlstHQ;
	self.getCucHQ = getCucHQ;
	self.getdsUser = getdsUser;
	self.doimatkhau = doimatkhau;
	self.confirmnewpass = confirmnewpass;
	self.GetChiCucHQByCuc = GetChiCucHQByCuc;
	$scope.modified = false;
	getdsUser();
	getlstHQ();
	getCucHQ();

	// $scope.Act = $scope.lstActive[1];
	$scope.active = self.lstActive[2];
	$scope.hideErrorMessage = true;
	$scope.oldblank = true;
	$scope.newblank = true;
	$scope.cfblank = true;
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
		$scope.phantrang = self.lstUser.slice(begin, end);
	});
	$scope.inputOldPass = function() {
		$scope.oldblank = true;
		$scope.hidecheckOld = true;
	}
	$scope.inputNewPass = function() {
		$scope.hidenewlikeold = true;
		$scope.newblank = true;
	}
	$scope.inputCfPass = function() {
		$scope.cfblank = true;
		$scope.hidecheckcfnewPass = true;
	}
	function doimatkhau(username) {

		if ($scope.oldPass != undefined && $scope.oldPass != null) {
			$scope.oldblank = true;
			if ($scope.newPass != undefined && $scope.newPass != null
					&& $scope.newPass != "") {
				$scope.newblank = true;
				if ($scope.oldPass != $scope.newPass) {
					$scope.hidenewlikeold = true;
					if ($scope.cfPass != undefined && $scope.cfPass != null
							&& $scope.cfPass != "") {
						$scope.cfblank = true;
						if ($scope.cfPass === $scope.newPass) {
							$scope.hidecheckcfnewPass = true; //
							Tbs_sysUserService
									.doimatkhau(username, $scope.oldPass,
											$scope.newPass)
									.then(
											function(response) {
												switch (response) {
												case 0:

													break;
												case 1:
													$scope.hidecheckOld = true;
													$PopupMessage
															.Success('Cập nhập thành công. ');
													break;
												case 2:
													$scope.hidecheckOld = false;
													break;
												}

											});
						} else {
							$scope.newPass = null;
							$scope.cfPass = null;
							$scope.hidecheckcfnewPass = false; // } }
						}
					} else {
						$scope.newPass = null;
						$scope.cfblank = false;
					}
				} else {
					$scope.newPass = null;
					$scope.hidenewlikeold = false;
				}

			} else {
				$scope.newPass = null;
				$scope.newblank = false;
			}
		} else {
			$scope.oldblank = false;
			//			
		}

	}
	$scope.Search = function() {
		reset();
		var param = [];

		if ($scope.active.ma < 2) {

			self.entity.active = $scope.active.ma;
			;
		}
		if (!angular.isUndefined($scope.findHQ) && $scope.findHQ.ma != "0") {
			self.entity.maHq = $scope.findHQ.ma;
		}
		self.entity.username = $scope.userName;
		self.entity.fullName = $scope.fullName;
		if (!angular.isUndefined($scope.findGroup)
				&& $scope.findGroup.groupId != 0) {
			self.entity.groupId = $scope.findGroup.groupId;
		}
		Tbs_sysUserService
				.Search(self.entity)
				.then(
						function(response) {
							// var array = angular.fromJson(response);
							self.lstUser = response;
							getTotalPage(self.lstUser.length);
							var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
									+ $scope.numPerPage;
							$scope.phantrang = self.lstUser.slice(begin, end);
							$scope.currentPage = 1;
						});
	}
	function getlstHQ() {
		Tbs_sysUserService.GetHaiQuan().then(function(response) {
			var array = angular.fromJson(response);
			self.lstHQ = array;
			self.lstHQ.splice(0, 0, {
				"ma" : "0",
				"ten" : "Vui lòng chọn"
			});
			$scope.findHQ = self.lstHQ[0];
		})
	}
	function confirmnewpass() {
		if ($scope.cfPass == $scope.newPass) {
			$scope.hideCF = true;
		} else {
			$scope.hideCF = false;
		}
	}
	$scope.lstNhom = [];
	function getNhomNSD() {
		var array = [];
		$scope.lstNhom = [];
		Tbs_sysUserService.GetNhomNSD().then(function(response) {
			var array = angular.fromJson(response);
			for (var int = 0; int < array.length; int++) {
				$scope.lstNhom.push(array[int]);
			}
			self.lstNhomNSD = array;
			self.lstNhomNSD.splice(0, 0, {
				"groupId" : "0",
				"groupCode" : "Vui lòng chọn"
			});
			$scope.lstNhom.splice(0, 0, {
				"groupId" : "0",
				"groupCode" : "Vui lòng chọn"
			});
			$scope.findGroup = self.lstNhomNSD[0];
		})
	}
	function getdsUser() {

		Tbs_sysUserService
				.GetDSNguoiDung()
				.then(
						function(response) {
							var array = angular.fromJson(response);
							self.lstUser = array;
							self.lstUser.sort(function(a, b) {
								return parseFloat(a.userId)
										- parseFloat(b.userId);
							});
							var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin
									+ $scope.numPerPage;
							$scope.phantrang = self.lstUser.slice(begin, end);
							getTotalPage(self.lstUser.length);
						})
		getNhomNSD();
	}
	$scope.getUserByActive = function() {
		$scope.Search()
	}
	function reset() {
		$scope.confirmpassword = "";
		$scope.Group = $scope.lstNhom[0];
		$scope.cucHQ = self.lstCucHQ[0];
		self.entity = {
			userId : '',
			groupId : '',
			username : '',
			password : '',
			fullName : '',
			maHq : '',
			chucvu : '',
			workstation : '',
			emailHQ : '',
			emailKhac : '',
			dienthoai : '',
			didong : '',
			userdescription : '',
			isLanhdao : '',
			active : '',
			addOrUpdate : ''
		};
		// $scope.myForm.$setPristine(); //reset Form
	}
	$scope.addRow = function() {
		// Lam moi entity
		$scope.modified = false;
		$scope.hidePass = false;
		reset();
		self.entity.addOrUpdate = 'add';
		$scope.Title = "Thêm mới người sử dụng";
		$scope.Group = $scope.lstNhom[0];
		// self.showPopup(self.lstUser, self.entity);

	}

	function showPopup(grid, row) {
		/*
		 * $scope.$modalInstance = $uibModal.open({ animation :
		 * self.animationsEnabled, scope : $scope, ariaLabelledBy :
		 * 'modal-title', ariaDescribedBy : 'modal-body', templateUrl :
		 * 'themnguoidung', });
		 */

	}$scope.hidecheckemail =true;
	$scope.inputemailKhac =function()
	{
		if(self.entity.emailKhac )
			var regex= /^([a-zA-Z0-9._%+-])+\@(([a-zA-Z]))+\.(([a-zA-Z]){2,6})$/;
			if (regex.test(self.entity.emailKhac) == false) {
				$scope.hidecheckemail =false;
			}
			else
				{
				$scope.hidecheckemail =true;
				}
	}
	$scope.changePass = function() {
		$scope.formatPass = false;
		$scope.blankPass = false;
	}
	$scope.blankPass = false;
	$scope.formatPass = false;
	$scope.saveData = function() {
		if (!angular.isUndefined($scope.ChiCuc) && $scope.ChiCuc != null
				&& $scope.ChiCuc.ma != "000") {
			self.entity.maHq = $scope.ChiCuc.ma;
		} else {
			self.entity.maHq = $scope.cucHQ.ma;
		}
		self.entity.active = $scope.Act.ma;
		if ($scope.Group.groupId == "0") {
			self.entity.groupId = null;
		} else {
			self.entity.groupId = $scope.Group.groupId;
		}
		if($scope.hidecheckemail ==false)
			return;
		if (self.entity.addOrUpdate == 'add') {
			// var patt = new
			// RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d\w)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}[\w
			// -]*$/");
			var patt = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
			if (angular.isUndefined(self.entity.password)
					|| self.entity.password == "") {
				$scope.blankPass = true;
			} else {
				$scope.blankPass = false;
				if (patt.test(self.entity.password) == false) {
					$scope.formatPass = true;
				} else {
					$scope.formatPass = false;
					if ($scope.confirmpassword != self.entity.password) {
						$scope.IsMatch = true;
					} else {
						$scope.IsMatch = false;
						Tbs_sysUserService
								.crtUser(self.entity)
								.then(
										function(response) {
											if (response == 1) {
												$scope.hideErrorMessage = true;
												$scope.hideSuccessMessage = false;
												reset();
												$PopupMessage
														.Success('Cập nhập thành công. ');
												$scope.Search();
												reset();
												self.entity.addOrUpdate = 'add';
											} else if (response == 2) {
												$scope.hideErrorMessage = false;
												$scope.hideSuccessMessage = true;
												$PopupMessage
														.Error("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác");
											} else if (response == 0) {
												$scope.hideErrorMessage = false;
												$scope.hideSuccessMessage = true;
												$PopupMessage
														.Error("Có lỗi trong quá trình tạo mới tài khoản . Vui lòng kiểm tra lại");
											}
										});
					}
				}
			}
		}
		if (self.entity.addOrUpdate == 'update') {
			Tbs_sysUserService.updUser(self.entity, self.entity.username).then(
					function(response) {
						$scope.Title = "";
						$PopupMessage.Success('Cập nhập thành công ');
						$('#myModal').modal('hide');
						$scope.Search();
						reset();
					});
		}
	}
	$scope.cancel = function() {
		$('#myModal').modal('hide');
		$scope.$modalInstance.dismiss('cancel');
	}
	function editRow(username) {
		$scope.modified = true;
		reset();
		$scope.hidePass = true;
		$scope.Title = "Thay đổi thông tin người sử dụng";
		for (var i = 0; i < self.lstUser.length; i++) {
			if (self.lstUser[i].username == username) {
				self.entity = self.lstUser[i];
			}
		}
		var mahq = self.entity.maHq;
		if (mahq.length > 2) {
			for (var i = 0; i < self.lstHQ.length; i++) {
				if (self.lstHQ[i].ma == self.entity.maHq) {
					for (var j = 0; j < self.lstCucHQ.length; j++) {
						if (self.lstCucHQ[j].ma == self.lstHQ[i].maHQCT) {
							$scope.cucHQ = self.lstCucHQ[j];
							Tbs_sysUserService
									.GetChiCucHQByCuc(self.lstCucHQ[j].ma)
									.then(
											function(response) {
												var array = angular
														.fromJson(response);
												array.push({
													"ma" : "000",
													"ten" : "--Vui lòng chọn--"
												})
												self.lstChiCuc = array;
												for (var k = 0; k < self.lstChiCuc.length; k++) {
													if (self.lstChiCuc[k].ma == mahq) {
														$scope.ChiCuc = self.lstChiCuc[k];
													}
												}
											});
						}
					}
				}
			}
		} else {
			for (var j = 0; j < self.lstCucHQ.length; j++) {
				if (self.lstCucHQ[j].ma == mahq) {
					$scope.cucHQ = self.lstCucHQ[j];
				}
			}
		}
		if (self.entity.groupId == null
				|| angular.isUndefined(self.entity.groupId)) {
			$scope.Group = $scope.lstNhom[0];
		} else {
			for (var i = 0; i < $scope.lstNhom.length; i++) {
				if ($scope.lstNhom[i].groupId == self.entity.groupId) {
					$scope.Group = $scope.lstNhom[i];
				}
			}
		}
		if (self.entity.active == 0) {
			$scope.Act = $scope.lstActive[0];
		} else if (self.entity.active == 1) {
			$scope.Act = $scope.lstActive[1];
		}
		self.entity.addOrUpdate = 'update';
	}
	function remove(username) {
		if (username == userlogin) {
			$PopupMessage.Error("Không thể xóa tài khoản đang sử dụng");
		} else {
			$scope.Message = "Bạn có muốn xóa người dùng này không ?"
			$scope.Title = "Xóa người sử dụng ?"
			$scope.deleteuser = username;
			$scope.$modalInstance = $uibModal.open({
				animation : self.animationsEnabled,
				scope : $scope,
				ariaLabelledBy : 'modal-title',
				ariaDescribedBy : 'modal-body',
				templateUrl : contextPath + '/static/dialogs/Confirm_Fix.html'
			});
		}
	}

	$scope.Delete = function() {
		Tbs_sysUserService.delUser($scope.deleteuser).then(function(response) {
			$scope.$modalInstance.close();
			$scope.Search();
		});
	}
	function getCucHQ() {
		Tbs_sysUserService.GetCucHQ().then(function(response) {
			var array = angular.fromJson(response);
			self.lstCucHQ = array;
			$scope.cucHQ = array[0];
			self.GetChiCucHQByCuc(array[0].ma);
		})

	}

	function GetChiCucHQByCuc(ma) {
		if (ma != '00') {
			Tbs_sysUserService.GetChiCucHQByCuc(ma).then(function(response) {
				var array = angular.fromJson(response);
				array.push({
					"ma" : "000",
					"ten" : "--Vui lòng chọn--"
				})
				self.lstChiCuc = array;
				$scope.ChiCuc = array[array.length - 1];
			});
		} else {
			console.log("ss");
			self.lstChiCuc = null;
		}
	}
}
