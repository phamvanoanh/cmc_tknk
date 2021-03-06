App.controller('HTCBBTTTCKController', ['$scope', 'HTCBBTTTCKService', 'pagerService', '$uibModal', '$PopupMessage', '$timeout', '$rootScope', 'contextPath',
		function($scope, HTCBBTTTCKService, pagerService, $uibModal, $PopupMessage, $timeout, $rootScope, contextPath) {
			$scope.lstTrangThai = [ {
				Ma : 'SB',
				Ten : 'Sơ bộ'
			}, {
				Ma : 'CT',
				Ten : 'Chính thức'
			}];
			$scope.lstPhamViTK = [ {
				Ma : 0,
				Ten : 'Ngoài phạm vi thống kê'
			}, {
				Ma : 1,
				Ten : 'Trong phạm vi thống kê'
			}
			, {
				Ma : 2,
				Ten : 'Tất cả'
			}];
			
			$scope.lstResult = [];
			$scope.nhx = 'X';
			$scope.lstCucHQ = [];
			$scope.lstChiCucHQ = [];
			$scope.noiDung = '';
			$scope.loai_bc= "15";
			$scope.showReport = false;
			$scope.srcReport = "";
			$scope.showChart1 = false;
			$scope.showReport1 = true;
			$scope.showChart2 = false;
			var RootApi = contextPath;
			$scope.btnXemBC_Click = function() {
				$rootScope.showLoading = true;
				var maCucHQ = "";
				var maChicucHQ = "";
				var nhx = "";
				var trangthai = "";
				var cuakhau = "";
				var phamvi = "";
				var loaihinh = "";
				var loaiBD = "ky";
				if ($scope.cmbCucHQ != undefined && $scope.cmbCucHQ != null)
					if ($scope.cmbCucHQ.ma != undefined && $scope.cmbCucHQ.ma != null)
						maCucHQ = $scope.cmbCucHQ.ma;
				if ($scope.cmbChiCucHQ != undefined && $scope.cmbChiCucHQ != null)
					if ($scope.cmbChiCucHQ.ma != undefined && $scope.cmbChiCucHQ.ma != null)
						maChicucHQ = $scope.cmbChiCucHQ.ma;
				if ($scope.cmbTrangThai != undefined && $scope.cmbTrangThai != null)
					if ($scope.cmbTrangThai.Ma != undefined && $scope.cmbTrangThai.Ma != null)
						trangthai = $scope.cmbTrangThai.Ma;
				if ($scope.nhx != undefined && $scope.nhx != null)
					nhx = $scope.nhx;
				if ($scope.cmbCuaKhau != undefined && $scope.cmbCuaKhau != null)
					if ($scope.cmbCuaKhau.ma != undefined && $scope.cmbCuaKhau.ma != null)
						cuakhau = $scope.cmbCuaKhau.ma;
				if ($scope.cmbPhamViTK != undefined && $scope.cmbPhamViTK != null)
					if ($scope.cmbPhamViTK.Ma != undefined && $scope.cmbPhamViTK.Ma != null)
						phamvi = $scope.cmbPhamViTK.Ma;
				if ($scope.cmbLHXNK != undefined && $scope.cmbLHXNK != null)
					if ($scope.cmbLHXNK.ma != undefined && $scope.cmbLHXNK.ma != null)
						loaihinh = $scope.cmbLHXNK.ma;
				HTCBBTTTCKService.getData(maCucHQ, maChicucHQ, trangthai, nhx, cuakhau, phamvi, loaihinh)
						.then(function(dataResponse) {
							$scope.lstResult = dataResponse;
							
							for(var i = 0; i < $scope.lstResult.length; i++){
								var maxKy = 0;
								var minKy = $scope.lstResult[i].data_ky.data[0].gia_tri;
								var maxThang = 0;
								var minThang = $scope.lstResult[i].data_thang.data[0].gia_tri;
								
								var lengthKY = $scope.lstResult[i].data_ky.data.length;
								var lengthTHANG = $scope.lstResult[i].data_thang.data.length;
								var tenKY = '';
								var tenTHANG = '';
//								if ($scope.lstResult[0].data_ky.data.length % 2 == 1) {
									lengthKY = $scope.lstResult[i].data_ky.data.length -1;
									lengthTHANG = $scope.lstResult[i].data_thang.data.length -1;
									tenKY = $scope.lstResult[i].data_ky.data[lengthKY].ky;
									tenTHANG = $scope.lstResult[i].data_thang.data[lengthTHANG].thang;
//								}
								
								for(var j = 0; j < lengthKY; j++){
									if(parseFloat($scope.lstResult[i].data_ky.data[j].gia_tri) > parseFloat(maxKy)){
										maxKy = $scope.lstResult[i].data_ky.data[j].gia_tri;
									}
									if(parseFloat($scope.lstResult[i].data_ky.data[j].gia_tri) < parseFloat(minKy)){
										minKy = $scope.lstResult[i].data_ky.data[j].gia_tri;
									}
								}
								for(var k = 0; k < lengthTHANG; k++){
									if(parseFloat($scope.lstResult[i].data_thang.data[k].gia_tri) > parseFloat(maxThang)){
										maxThang = $scope.lstResult[i].data_thang.data[k].gia_tri;
									}
									if(parseFloat($scope.lstResult[i].data_thang.data[k].gia_tri) < parseFloat(minThang)){
										minThang = $scope.lstResult[i].data_thang.data[k].gia_tri;
									}
								}
								$scope.lstResult[i].data_ky["maxKy"] = maxKy;
								$scope.lstResult[i].data_ky["minKy"] = minKy;
								$scope.lstResult[i].data_thang["maxThang"] = maxThang;
								$scope.lstResult[i].data_thang["minThang"] = minThang;
								
								$scope.lstResult[i].data_ky["tenKY"] = tenKY;
								$scope.lstResult[i].data_thang["tenTHANG"] = tenTHANG;
							}
							
							if ($scope.lstResult[0].data_ky.data.length % 2 == 1) {
								var objky  = angular.copy( $scope.lstResult[0].data_ky.data[0]);
								objky.ky = null;
								objky.gia_tri = null;
								for(var i = 0; i<$scope.lstResult.length; i++)
								{
									$scope.lstResult[i].data_ky.data.push(objky);
								}
							}
							$scope.showReport1 = false;
							$rootScope.showLoading = false;
							
						}, function(error) {
							console.log('formData retrieval failed. ' + error);
							$rootScope.showLoading = false;
						});
			};
			
			$scope.doExport = function(){
				var maCucHQ = "";
				var maChicucHQ = "";
				var nhx = "";
				var trangthai = "";
				var cuakhau = "";
				var phamvi = "";
				var loaihinh = "";
				if ($scope.cmbCucHQ != undefined && $scope.cmbCucHQ != null)
					if ($scope.cmbCucHQ.ma != undefined && $scope.cmbCucHQ.ma != null)
						maCucHQ = $scope.cmbCucHQ.ma;
				if ($scope.cmbChiCucHQ != undefined && $scope.cmbChiCucHQ != null)
					if ($scope.cmbChiCucHQ.ma != undefined && $scope.cmbChiCucHQ.ma != null)
						maChicucHQ = $scope.cmbChiCucHQ.ma;
				if ($scope.cmbTrangThai != undefined && $scope.cmbTrangThai != null)
					if ($scope.cmbTrangThai.Ma != undefined && $scope.cmbTrangThai.Ma != null)
						trangthai = $scope.cmbTrangThai.Ma;
				if ($scope.nhx != undefined && $scope.nhx != null)
					nhx = $scope.nhx;
				if ($scope.cmbCuaKhau != undefined && $scope.cmbCuaKhau != null)
					if ($scope.cmbCuaKhau.ma != undefined && $scope.cmbCuaKhau.ma != null)
						cuakhau = $scope.cmbCuaKhau.ma;
				if ($scope.cmbPhamViTK != undefined && $scope.cmbPhamViTK != null)
					if ($scope.cmbPhamViTK.Ma != undefined && $scope.cmbPhamViTK.Ma != null)
						phamvi = $scope.cmbPhamViTK.Ma;
				if ($scope.cmbLHXNK != undefined && $scope.cmbLHXNK != null)
					if ($scope.cmbLHXNK.ma != undefined && $scope.cmbLHXNK.ma != null)
						loaihinh = $scope.cmbLHXNK.ma;
				
				var param = {};
				param["maCucHQ"] = maCucHQ;
		    	param["maChiCucHQ"] = maChicucHQ;
		    	param["trangthai"] = trangthai;
		    	param["nhx"] = nhx;
		    	param["cuakhau"] = cuakhau;
		    	param["phamvi"] = phamvi;
		    	param["loaihinh"] = loaihinh;
		    	
		    	HTCBBTTTCKService.doExport(param);
			}

			$rootScope.$on('childEmit', function(event, data) {
				console.log(data);
				loadDefualtForm();
				self.nhx = data;
			});
			$scope.CucHQSelected = function (Item) {
				$rootScope.showLoading = true;
				if(Item.ma != '00'){
					HTCBBTTTCKService.getChiCucHQByCuc(Item.ma).then(function(deferred) {
						$scope.lstChiCucHQ = deferred;
						$scope.lstChiCucHQ = [{"ma": "","ten": "---chọn---"}].concat($scope.lstChiCucHQ);
						$scope.cmbChiCucHQ = $scope.lstChiCucHQ[0];
						$rootScope.showLoading = false;
					}, function(errResponse) {
						console.error('Error while fetching data');
						$rootScope.showLoading = false;
					});
				} else{
					$scope.lstChiCucHQ = [{"ma": "","ten": "---chọn---"}];
					$scope.cmbChiCucHQ = $scope.lstChiCucHQ[0];
					$rootScope.showLoading = false;
				}
			};
			$scope.btnPhanHoi_Click = function () {
				$rootScope.$emit('PhanHoiQuyTrinhXLDL', $scope.loai_bc);
			};
			$scope.hideReport = function () {
				$scope.srcReport = "";
				$scope.showReport = false;
			};
			
			$scope.tab1_Selected = function () {
				$scope.nhx = "X";
				getLHXNK();
				loadDefualtForm();
				console.log($scope.nhx);
			};
			$scope.tab2_Selected = function () {
				$scope.nhx = "N";
				getLHXNK();
				loadDefualtForm();
				console.log($scope.nhx);
			};
			$scope.tab3_Selected = function () {
				$scope.nhx = "XN";
				getLHXNK();
				loadDefualtForm();
				console.log($scope.nhx);
			};
			
			$scope.showChart = function() { 
				$scope.btnXemBieuDo_Click();
				$scope.showChart2 = true;
				$scope.showChart1 = true;
	        };
			
			$scope.btnClose_Click = function()
			{
				$scope.showChart1 = false;
//				window.location.href = "HTCBBTTTCK";
			};
			
			$scope.btnIn_Click =  function () {
				$scope.srcReport = contextPath+"/pbtk/Ts_TEST?maHQ=00&ky=1&thang=1&nam=2016&loai_BC=SB";
				$scope.showReport = true;
			};
			$scope.btnXemBieuDo_Click =  function () {
				var maCucHQ = "";
				var maChicucHQ = "";
				var nhx = "";
				var trangthai = "";
				var cuakhau = "";
				var phamvi = "";
				var loaihinh="";
				var loaiBD = "ky";
				if ($scope.cmbCucHQ != undefined && $scope.cmbCucHQ != null)
					if ($scope.cmbCucHQ.ma != undefined && $scope.cmbCucHQ.ma != null)
						maCucHQ = $scope.cmbCucHQ.ma;
				if ($scope.cmbChiCucHQ != undefined && $scope.cmbChiCucHQ != null)
					if ($scope.cmbChiCucHQ.ma != undefined && $scope.cmbChiCucHQ.ma != null)
						maChicucHQ = $scope.cmbChiCucHQ.ma;
				if ($scope.cmbTrangThai != undefined && $scope.cmbTrangThai != null)
					if ($scope.cmbTrangThai.Ma != undefined && $scope.cmbTrangThai.Ma != null)
						trangthai = $scope.cmbTrangThai.Ma;
				if ($scope.nhx != undefined && $scope.nhx != null)
					nhx = $scope.nhx;
				if ($scope.cmbCuaKhau != undefined && $scope.cmbCuaKhau != null)
					if ($scope.cmbCuaKhau.ma != undefined && $scope.cmbCuaKhau.ma != null)
						cuakhau = $scope.cmbCuaKhau.ma;
				if ($scope.cmbPhamViTK != undefined && $scope.cmbPhamViTK != null)
					if ($scope.cmbPhamViTK.Ma != undefined && $scope.cmbPhamViTK.Ma != null)
						phamvi = $scope.cmbPhamViTK.Ma;
				if ($scope.cmbLHXNK != undefined && $scope.cmbLHXNK != null)
					if ($scope.cmbLHXNK.ma != undefined && $scope.cmbLHXNK.ma != null)
						loaihinh = $scope.cmbLHXNK.ma;
				if ($scope.radLoaiBD != undefined && $scope.radLoaiBD != null)
					loaiBD = $scope.radLoaiBD.value;
				
				if(loaiBD != undefined && loaiBD!=null){
					var api = RootApi + "/BCHTCBBTTTCK/BieuDoTriGiaTK?maCucHQ="
				+ maCucHQ + "&maChicucHQ=" + maChicucHQ
				+ "&trangthai=" + trangthai + "&nhx=" + nhx + "&cuakhau=" + cuakhau 
				+ "&phamvi=" + phamvi + "&loaihinh=" + loaihinh+ "&loaiBD=" + loaiBD;
					$scope.srcBieuDo = api;
				}
				$scope.showChart2 = true;
				
			};
			

			function loadDefualtForm() {
				$scope.cmbTrangThai = $scope.lstTrangThai[0];
				$scope.cmbPhamViTK = $scope.lstPhamViTK[0];
				$scope.lstResult = {};
				$scope.radLoaiBD = {value: 'ky'};
				$scope.srcBieuDo = null;
			}
			function getCucChiCucHQ() {
				HTCBBTTTCKService.getCucHQ().then(function(deferred) {
					$scope.lstCucHQ = deferred;
					$scope.cmbCucHQ = $scope.lstCucHQ[0];
					$scope.CucHQSelected($scope.cmbCucHQ);
				}, function(errResponse) {
					console.error('Error while fetching data');
				});
//				$timeout(function() {
//					$scope.CucHQSelected($scope.cmbCucHQ);
//				}, 200);
			}
			function getCuaKhau() {
				HTCBBTTTCKService.getCuaKhau().then(function(deferred) {
					$scope.lstCuaKhau = deferred;
					$scope.cmbCuaKhau = $scope.lstCuaKhau[0];
				}, function(errResponse) {
					console.error('Error while fetching data');
				});
			}
			function getLHXNK() {
				HTCBBTTTCKService.getLHXNK($scope.nhx).then(function(deferred) {
					$scope.lstLHXNK = deferred;
					$scope.cmbLHXNK = $scope.lstLHXNK[0];
				}, function(errResponse) {
					console.error('Error while fetching data');
				});
			}
			(function init() {
				$timeout(function() {
					getCucChiCucHQ();
					getCuaKhau();
					getLHXNK();
					loadDefualtForm();
					$rootScope.$emit('PhanHoiQuyTrinhXLDL', $scope.loai_bc);
					console.log('System controller with timeout fired');
				}, 500);
			})();
		} ]);
