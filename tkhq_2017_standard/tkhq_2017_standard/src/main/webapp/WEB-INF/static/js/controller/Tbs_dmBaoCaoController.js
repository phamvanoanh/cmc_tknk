/**
 * 
 */
'use strict';

angular.module('myApp').controller('Tbs_dmBaoCaoController',
		Tbs_dmBaoCaoController).constant('coquan', _coquan).constant('isIE',
		_isIE).constant('isKetXuat', _isKetXuat);
;
Tbs_dmBaoCaoController.$inject = [ '$scope', 'contextPath', 'coquan', 'isIE',
		'isKetXuat', 'Tbs_dmBaoCaoService', 'pagerService', '$uibModal',
		'$PopupMessage' ];
function Tbs_dmBaoCaoController($scope, contextPath, coquan, isIE, isKetXuat,
		Tbs_dmBaoCaoService, pagerService, $uibModal, $PopupMessage) {

	var self = this;
	self.tenbieu = [];
	self.ky = [];
	self.Months = [];
	self.Quy = [];
	self.Years = [];
	self.lstTTruong = [];
	self.lstTinh = [];
	self.lstCucHQ = [];
	self.lstChiCucHQ = [];
	self.lstThongKe = [];
	self.lstLoaiHinh = [];

	self.year = new Date();
	self.hideKy = true;
	self.hideTinh = true;
	self.hideMonth = true;
	self.hideYear = true;
	self.hideFromMonth = true;
	self.hideToMonth = true;
	self.hideToDate = true;
	self.hideFromDate = true;
	self.hideFromYear = true;
	self.hideToYear = true;
	self.hideCuc = true;
	self.hideChiCuc = true;
	self.hideHS = true;
	self.hideTKe = true;
	self.hideTTruong = true;
	self.hideNLH = true;
	self.hideQuy = true;
	self.hideLoaiBC = true;

	self.SelectBieu = SelectBieu;
	self.getLstTinh = getLstTinh;
	self.getCucHQ = getCucHQ;
	self.getChiCuc = getChiCuc;
	self.getTHKE = getTHKE;
	self.GetNewPage = GetNewPage;
	self.showPopup = showPopup;
	self.getLHinh = getLHinh;
	self.showPopupNotKetXuat = showPopupNotKetXuat;
	var params = "";
	// self.GetChiCucHQByCucHQ = GetChiCucHQByCucHQ;
	GetNewPage();
	function getLHinh() {
		Tbs_dmBaoCaoService.GetLHXNK().then(function(response) {
			var array_LH = angular.fromJson(response);
			self.lstLoaiHinh = array_LH;
			$scope.LoaiHinh = array_LH[0];
		}, function(errResponse) {
			console.error(errResponse);
		});
	}
	function getTHKE(nhx) {
		Tbs_dmBaoCaoService.getLstMATHKE(nhx).then(function(response) {
			var array_TKE = angular.fromJson(response);
			self.lstThongKe = array_TKE;
			$scope.ThongKe = array_TKE[0];
		}, function(errResponse) {
			console.error(errResponse);
		});
	}
	function getCucHQ() {
		Tbs_dmBaoCaoService.GetCucHQ().then(function(response) {
			var array_CucHQ = angular.fromJson(response);
			self.lstCucHQ = array_CucHQ;
			$scope.CucHQ = array_CucHQ[0];
			getChiCuc();
		}, function(errResponse) {
			console.error(errResponse);
		});
	}
	function getChiCuc() {
		Tbs_dmBaoCaoService.GetChiCucHQByCuc($scope.CucHQ.ma).then(
				function(response) {
					// var array_ChiCuc = angular.fromJson(response);
					if (response != null && response != undefined
							&& response.length > 0) {
						var tmpHQ = angular.copy(response[0]);
						tmpHQ.ma = "0";
						tmpHQ.ten = 'Tất cả';
						self.lstChiCucHQ = [];
						self.lstChiCucHQ.push(tmpHQ);

						var i;
						for (i = 0; i < response.length; i++)
							self.lstChiCucHQ.push(response[i]);
						/* self.lstChiCucHQ = response; */
						$scope.ChiCucHQ = self.lstChiCucHQ[0];
					} else {
						var tmpHQ = {
							ma : "0",
							ten : 'Tất cả'
						};
						self.lstChiCucHQ = [];
						self.lstChiCucHQ.push(tmpHQ);

						var i;
						for (i = 0; i < response.length; i++)
							self.lstChiCucHQ.push(response[i]);
						$scope.ChiCucHQ = self.lstChiCucHQ[0];
					}
				}, function(errResponse) {
					console.error(errResponse);
				});
	}
	function getLstTinh() {
		Tbs_dmBaoCaoService.getLstTinhTP().then(function(response) {
			var array_tinh = angular.fromJson(response);
			self.lstTinh = array_tinh;
			$scope.Tinh = array_tinh[0];
		}, function(errResponse) {
			console.error(errResponse);
		});
	}
	function reset() {
		$scope.fromDate = new Date();
		$scope.toDate = new Date();
		$scope.fromMonth = new Date();
		$scope.toMonth = new Date();
		$scope.fromyear = new Date();
		$scope.toyear = new Date();
		self.hideKy = true;
		self.hideTinh = true;
		self.hideMonth = true;
		self.hideYear = true;
		self.hideFromMonth = true;
		self.hideToMonth = true;
		self.hideToDate = true;
		self.hideFromDate = true;
		self.hideFromYear = true;
		self.hideToYear = true;
		self.hideCuc = true;
		self.hideChiCuc = true;
		self.hideHS = true;
		self.hideTKe = true;
		self.hideTTruong = true;
		self.hideNLH = true;
		self.hideQuy = true;
		self.hideLoaiBC = true;

	}
	function SelectBieu(array) {
		reset();
		if (array.maHS == 1) {
			self.hideHS = false;
		}
		if (array.maCuc == 1) {
			self.hideCuc = false;
			getCucHQ();
		}
		if (array.maHQ == 1) {
			self.hideChiCuc = false;
		}
		if (array.ky == 1) {
			self.hideKy = false;
		}
		if (array.thang == 1) {
			self.hideMonth = false;
		}
		if (array.quy == 1) {
			self.hideQuy = false;
		}
		if (array.nam == 1) {
			self.hideYear = false;
		}
		if (array.loaiBC == 1) {
			self.hideLoaiBC = false;
		}
		if (array.tungaydenngay == 1) {
			self.hideFromDate = false;
			self.hideToDate = false;
		}
		if (array.tuthangdenthang == 1) {
			self.hideFromMonth = false;
			self.hideToMonth = false;
		}

		if (array.tunamdennam == 1) {
			self.hideFromYear = false;
			self.hideToYear = false;
		}
		if (array.maTTruong == 1) {
			self.hideTTruong = false;
		}
		if (array.maTKe == 1) {
			self.hideTKe = false;
			getTHKE(array.nhx);
		}
		if (array.tinh == 1) {
			self.hideTinh = false;
			getLstTinh();
		}
		if (array.maNLH == 1) {
			self.hideNLH = false;
			getLHinh();
		}
	}
	$scope.popup1 = {
		opened : false
	};

	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};
	$scope.popup2 = {
		opened : false
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};
	$scope.dateOptions = {
		format : 'dd/MM/yyyy',
		'show-weeks' : false
	};

	$scope.popup3 = {
		opened : false
	};

	$scope.open3 = function() {
		$scope.popup3.opened = true;
	};
	$scope.popup4 = {
		opened : false
	};

	$scope.open4 = function() {
		$scope.popup4.opened = true;
	};
	$scope.monthOptions = {
		format : 'MM/yyyy',
		startingDay : 1,
		'show-weeks' : false
	};
	$scope.popup5 = {
		opened : false
	};

	$scope.open5 = function() {
		$scope.popup5.opened = true;
	};
	$scope.popup6 = {
		opened : false
	};

	$scope.open6 = function() {
		$scope.popup6.opened = true;
	};
	$scope.yearOptions = {
		format : 'yyyy',
		startingDay : 1,
		'show-weeks' : false
	};
	function GetCondittion() {
		var array = $scope.tenbieu;
		params = "";
		if (array.maHS == 1) {
			params = params + "&maHS=" + $scope.MaHS;
		}
		if (array.maCuc == 1) {
			var macuc = angular.isUndefined($scope.CucHQ.ma) ? null
					: $scope.CucHQ.ma;
			params = params + "&maCuc=" + macuc;
		} else {
			params = params + "&maHQ=00";
		}
		if (array.maHQ == 1) {
			var machicuc = (angular.isUndefined($scope.ChiCucHQ)) ? null
					: $scope.ChiCucHQ.ma;
			params = params + "&maHQ=" + machicuc;
		}
		if (array.ky == 1) {
			params = params + "&ky=" + $scope.ky.ma;
		}
		if (array.thang == 1) {
			params = params + "&thang=" + $scope.month.ma;
		}
		if (array.quy == 1) {
			params = params + "&quy=" + $scope.Quy.ma;
		}
		if (array.nam == 1) {
			params = params + "&nam=" + $scope.Year.ma;
		}
		if (array.loaiBC == 1) {
			params = params + "&loai_BC=" + $scope.TrangThai.ma;
		}
		if (array.tungaydenngay == 1) {
			var fromDate = "";
			if (!angular.isUndefined($scope.fromDate)
					&& $scope.fromDate != null) {
				fromDate = $scope.fromDate.getDate() + "/"
						+ ($scope.fromDate.getMonth() + 1) + "/"
						+ $scope.fromDate.getFullYear();

			}
			var toDate = "";
			if (!angular.isUndefined($scope.toDate)
					&& $scope.toDate != null) {
				toDate = $scope.toDate.getDate() + "/"
						+ ($scope.toDate.getMonth() + 1) + "/"
						+ $scope.toDate.getFullYear();
			}
			params = params + "&tuNgay=" + fromDate + "&denNgay=" + toDate;

		}
		if (array.tuthangdenthang == 1) {
			var fromMonth = $scope.fromMonth.getMonth() + 1 + "/"
					+ $scope.fromMonth.getFullYear();
			var toMonth = $scope.toMonth.getMonth() + 1 + "/"
					+ $scope.toMonth.getFullYear();

			params = params + "&tuThang=" + ($scope.fromMonth.getMonth() + 1)
					+ "&tuNam=" + $scope.fromMonth.getFullYear() + "&denThang="
					+ ($scope.toMonth.getMonth() + 1) + "&denNam="
					+ $scope.toMonth.getFullYear();
			;
		}
		if (array.tunamdennam == 1) {
			params = params + "&tuNam=" + $scope.fromyear.getFullYear()
					+ "&denNam=" + $scope.toyear.getFullYear();
		}
		if (array.maTTruong == 1) {
			params = params + "&maThiTruong=" + $scope.ThiTruong.ma;
		}
		if (array.maTKe == 1) {
			params = params + "&maTHKE=" + $scope.ThongKe.maThke;
		}
		if (array.tinh == 1) {
			params = params + "&tinhTP=" + $scope.Tinh.ma;
		}
		if (array.maNLH == 1) {
			params = params + "&maNlh=" + $scope.LoaiHinh.ma;
		}

	}
	function GetNewPage() {
		Tbs_dmBaoCaoService.GetDmBcByType(coquan).then(function(response) {
			var array = angular.fromJson(response);
			self.tenbieu = array;
			$scope.tenbieu = array[0];
			SelectBieu(array[0]);
		});
		for (var i = 1; i < 13; i++) {
			self.Months.push({
				"ma" : i,
				"ten" : "Tháng " + i
			});
		}
		$scope.month = self.Months[0];

		var d = new Date();
		var n = d.getFullYear();
		for (var i = n; i >= 1990; i--) {
			self.Years.push({
				"ma" : i,
				"ten" : "Năm " + i
			});
		}
		$scope.Year = self.Years[0];
		for (var i = 1; i < 3; i++) {
			self.ky.push({
				"ma" : i,
				"ten" : "Kỳ " + i
			});
		}
		$scope.ky = self.ky[0];

		for (var i = 1; i < 5; i++) {
			self.Quy.push({
				"ma" : i,
				"ten" : "Quý " + i
			});
		}
		$scope.Quy = self.Quy[0];

		self.lstTTruong = [ {
			"ma" : "0",
			"ten" : "Châu Phi"
		}, {
			"ma" : "1",
			"ten" : "Châu Á"
		}, {
			"ma" : "2",
			"ten" : "Châu Âu"
		}, {
			"ma" : "3",
			"ten" : "Châu Mỹ"
		} ];
		$scope.ThiTruong = self.lstTTruong[0];
		self.lstTrangThai = [ {
			"ma" : "SB",
			"ten" : "Sơ bộ"
		}, {
			"ma" : "DC",
			"ten" : "Điều chỉnh"
		}, {
			"ma" : "CT",
			"ten" : "Chính thức"
		} ];
		$scope.TrangThai = self.lstTrangThai[0];
		$scope.fromDate = new Date();
		$scope.toDate = new Date();
		$scope.fromMonth = new Date();
		$scope.toMonth = new Date();
		$scope.fromyear = new Date();
		$scope.toyear = new Date();
	}
	$scope.open3 = function() {
		$scope.popup3.opened = true;
	};
	$scope.yearOptions = {
		// format: 'yyyy',
		// startingDay: 1,
		// 'show-weeks' : false,
		formatYear : 'yyyy',
		startingDay : 1,
		minMode : 'year'
	};

	function showPopup() {
		GetCondittion();
		$scope.UrlIE = "";
		$scope.title = $scope.tenbieu.ten;

		if (!isIE) {
			$scope.UrlIE = "&type=PDFINLINE"
		}
		if (isKetXuat) {
			$scope.UrlIE = $scope.UrlIE + "&isKetXuat=1"
		}
		$scope.REST_SERVICE_URI = contextPath + "/pbtk/" + $scope.tenbieu.path
				+ "?" + params.substring(1);
		var modalInstance = $uibModal.open({
			animation : self.animationsEnabled,
			ariaLabelledBy : 'modal-title',
			ariaDescribedBy : 'modal-body',
			controller : ModalInstanceCtrl,
			templateUrl : 'pageReport',
			windowClass : 'app-modal-window',
			resolve : {
				Title : function() {
					return $scope.title;
				},

				Url : function() {
					return $scope.REST_SERVICE_URI;
				},
				UrlIE : function() {
					return $scope.UrlIE;
				}
			}
		});
	}

	$scope.doExport = function() {

	}

	function showPopupNotKetXuat() {
		GetCondittion();
		$scope.UrlIE = "";
		$scope.title = $scope.tenbieu.ten;

		if (!isIE) {
			$scope.UrlIE = "&type=PDFINLINE"
		}
		$scope.REST_SERVICE_URI = contextPath + "/pbtk/" + $scope.tenbieu.path
				+ "?" + params.substring(1);
		var modalInstance = $uibModal.open({
			animation : self.animationsEnabled,
			ariaLabelledBy : 'modal-title',
			ariaDescribedBy : 'modal-body',
			controller : ModalInstanceCtrl,
			templateUrl : 'pageReport',
			windowClass : 'app-modal-window',
			resolve : {
				Title : function() {
					return $scope.title;
				},

				Url : function() {
					return $scope.REST_SERVICE_URI;
				},
				UrlIE : function() {
					return $scope.UrlIE;
				}
			}
		});
	}

	$scope.doExport = function() {

	}
	$scope.checkvalid = false;
	$scope.changeDate = function() {
		if ($scope.fromDate > $scope.toDate) {
			$PopupMessage.Error('Từ ngày phải nhỏ hơn đến ngày');
			$scope.checkvalid = true;
		} else {
			$scope.checkvalid = false;
		}
	}
	$scope.changeYear = function() {
		if ($scope.fromyear > $scope.toyear) {
			$PopupMessage.Error('Từ năm đến phải nhỏ hơn đến năm');
			$scope.checkvalid = true;
		} else {
			$scope.checkvalid = false;
		}
	}
	$scope.changeMonth = function() {

		if ($scope.fromMonth > $scope.toMonth) {
			$PopupMessage.Error('Từ tháng đi phải nhỏ hơn đến tháng');
			$scope.checkvalid = true;
		} else {
			$scope.checkvalid = false;
		}

	}

}
var ModalInstanceCtrl = function($scope, $modalInstance, Title, Url, UrlIE) {
	$scope.title = Title;
	console.log($scope.title);
	$scope.UrlPDF = Url + "&type=PDFATTACH";
	$scope.UrlExcel = Url + "&type=EXCEL";
	$scope.Url = Url + UrlIE;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
};