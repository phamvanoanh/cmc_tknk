App.controller('HTCBBTTGXNKHQController', [
		'$scope',
		'HTCBBTTGXNKHQService',
		'pagerService',
		'$uibModal',
		'$PopupMessage',
		'$timeout',
		'$rootScope',
		'contextPath',
		function($scope, HTCBBTTGXNKHQService, pagerService, $uibModal,
				$PopupMessage, $timeout, $rootScope, contextPath) {
			$scope.lstTrangThai = [ {
				Ma : 'SB',
				Ten : 'Sơ bộ'
			}, {
				Ma : 'DC',
				Ten : 'Điều chỉnh'
			}, {
				Ma : 'CT',
				Ten : 'Chính thức'
			}];
			$scope.loai_bc = "12";
			$scope.lstResult = [];
			$scope.nhx = 'X';
			$scope.lstCucHQ = [];
			$scope.lstChiCucHQ = [];
			$scope.lstPhan = [];
			$scope.showReport = false;
			$scope.srcReport = "";
			$scope.showChart1 = false;
			$scope.showReport1 = true;
			$scope.showChart2 = false;

			$scope.btnXemBC_Click = function() {
				$rootScope.showLoading = true;				
				var maCucHQ = "";
				var maChicucHQ = "";
				var nhx = "";
				var trangthai = "";
				if ($scope.cmbCucHQ != undefined && $scope.cmbCucHQ != null)
					if ($scope.cmbCucHQ.ma != undefined && $scope.cmbCucHQ.ma != null)
						maCucHQ = $scope.cmbCucHQ.ma;
				if ($scope.cmbChiCucHQ != undefined && $scope.cmbChiCucHQ != null)
					if ($scope.cmbChiCucHQ.ma != undefined && $scope.cmbChiCucHQ.ma != null)
						maChicucHQ = $scope.cmbChiCucHQ.ma;
				if ($scope.lstTrangThai != undefined && $scope.lstTrangThai != null)
					if ($scope.cmbTrangThai.Ma != undefined && $scope.cmbTrangThai.Ma != null)
						trangthai = $scope.cmbTrangThai.Ma;
				if ($scope.nhx != undefined && $scope.nhx != null)
					nhx = $scope.nhx;
				HTCBBTTGXNKHQService.getData(maCucHQ, maChicucHQ, trangthai,nhx)
						.then(function(dataResponse) {
							$scope.lstResult = dataResponse;																
								for(var i = 0; i < $scope.lstResult.length; i++){
									for(var ii = 0; ii < $scope.lstResult[i].group_data.length; ii++){
										var maxKy = 0;
										var minKy = $scope.lstResult[i].group_data[ii].data_ky.data[0].gia_tri;
										var maxThang = 0;
										var minThang = $scope.lstResult[i].group_data[ii].data_thang.data[0].gia_tri;
										
										var lengthKY = $scope.lstResult[i].group_data[ii].data_ky.data.length;
										var lengthTHANG = $scope.lstResult[i].group_data[ii].data_thang.data.length;
										var tenKY = '';
										var tenTHANG = '';
//										if ($scope.lstResult[i].group_data[ii].data_ky.data.length % 2 == 1) {
											lengthKY = $scope.lstResult[i].group_data[ii].data_ky.data.length -1;
											lengthTHANG = $scope.lstResult[i].group_data[ii].data_thang.data.length -1;
											tenKY = $scope.lstResult[i].group_data[ii].data_ky.data[lengthKY].ky;
											tenTHANG = $scope.lstResult[i].group_data[ii].data_thang.data[lengthTHANG].thang;
//										}
										
										for(var j = 0; j < lengthKY; j++){
											if(parseFloat($scope.lstResult[i].group_data[ii].data_ky.data[j].gia_tri) > parseFloat(maxKy)){
												maxKy = $scope.lstResult[i].group_data[ii].data_ky.data[j].gia_tri;
											}
											if(parseFloat($scope.lstResult[i].group_data[ii].data_ky.data[j].gia_tri) < parseFloat(minKy)){
												minKy = $scope.lstResult[i].group_data[ii].data_ky.data[j].gia_tri;
											}
										}
										for(var k = 0; k < lengthTHANG; k++){
											if(parseFloat($scope.lstResult[i].group_data[ii].data_thang.data[k].gia_tri) > parseFloat(maxThang)){
												maxThang = $scope.lstResult[i].group_data[ii].data_thang.data[k].gia_tri;
											}
											if(parseFloat($scope.lstResult[i].group_data[ii].data_thang.data[k].gia_tri) < parseFloat(minThang)){
												minThang = $scope.lstResult[i].group_data[ii].data_thang.data[k].gia_tri;
											}
										}
										$scope.lstResult[i].group_data[ii].data_ky["maxKy"] = maxKy;
										$scope.lstResult[i].group_data[ii].data_ky["minKy"] = minKy;
										$scope.lstResult[i].group_data[ii].data_thang["maxThang"] = maxThang;
										$scope.lstResult[i].group_data[ii].data_thang["minThang"] = minThang;
										
										$scope.lstResult[i].group_data[ii].data_ky["tenKY"] = tenKY;
										$scope.lstResult[i].group_data[ii].data_thang["tenTHANG"] = tenTHANG;
									}
								}
								if ($scope.lstResult[0].group_data[0].data_ky.data.length % 2 == 1) {
									var objky  = angular.copy( $scope.lstResult[0].group_data[0].data_ky.data[0]);
									objky.ky = "  ";
									objky.gia_tri = null;
									for(var i = 0; i<$scope.lstResult.length; i++)
									{
										$scope.lstResult[i].group_data[0].data_ky.data.push(objky);
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
				if ($scope.cmbCucHQ != undefined && $scope.cmbCucHQ != null)
					if ($scope.cmbCucHQ.ma != undefined && $scope.cmbCucHQ.ma != null)
						maCucHQ = $scope.cmbCucHQ.ma;
				if ($scope.cmbChiCucHQ != undefined && $scope.cmbChiCucHQ != null)
					if ($scope.cmbChiCucHQ.ma != undefined && $scope.cmbChiCucHQ.ma != null)
						maChicucHQ = $scope.cmbChiCucHQ.ma;
				if ($scope.lstTrangThai != undefined && $scope.lstTrangThai != null)
					if ($scope.cmbTrangThai.Ma != undefined && $scope.cmbTrangThai.Ma != null)
						trangthai = $scope.cmbTrangThai.Ma;
				if ($scope.nhx != undefined && $scope.nhx != null)
					nhx = $scope.nhx;
				
				var param = {};
				param["maCucHQ"] = maCucHQ;
		    	param["maChiCucHQ"] = maChicucHQ;
		    	param["trangthai"] = trangthai;
		    	param["nhx"] = nhx;
		    	
		    	HTCBBTTGXNKHQService.doExport(param);
			}

			$rootScope.$on('childEmit', function(event, data) {
				console.log(data);
				loadDefualtForm();
				self.nhx = data;
			});
			$scope.CucHQSelected = function (Item) {
//				$rootScope.showLoading = true;	
				if(Item.ma != '00'){
					HTCBBTTGXNKHQService.getChiCucHQByCuc(Item.ma).then(function(deferred) {
						$scope.lstChiCucHQ = deferred;
						$scope.lstChiCucHQ = [{"ma": "","ten": "---chọn---"}].concat($scope.lstChiCucHQ);
						$scope.cmbChiCucHQ = $scope.lstChiCucHQ[0];
	//					$rootScope.showLoading = false;	
					}, function(errResponse) {
						console.error('Error while fetching data');
					});
				} else{
					$scope.lstChiCucHQ = [{"ma": "","ten": "---chọn---"}];
					$scope.cmbChiCucHQ = $scope.lstChiCucHQ[0];
				}
			};
			$scope.btnPhanHoi_Click = function () {
				$rootScope.$emit('PhanHoiQuyTrinhXLDL', $scope.loai_bc);
			};
			$scope.tab1_Selected = function () {
				$scope.nhx = "X";
				loadDefualtForm();
				console.log($scope.nhx);
			};
			$scope.tab2_Selected = function () {
				$scope.nhx = "N";
				loadDefualtForm();
				console.log($scope.nhx);
			};
			$scope.tab3_Selected = function () {
				$scope.nhx = "XN";
				loadDefualtForm();
				console.log($scope.nhx);
			};
			
			$scope.btnIn_Click =  function () {
				$scope.srcReport = contextPath+"/pbtk/Ts_TEST?maHQ=00&ky=1&thang=1&nam=2016&loai_BC=SB";
				$scope.showReport = true;
			};
			$scope.hideReport =  function () {
				$scope.srcReport = "";
				$scope.showReport = false;
			};
			$scope.btnXemBieuDo_Click = function() {
				var maCucHQ = "";
				var maChicucHQ = "";
				var nhx = "";
				var trangthai = "";
				var loaiBD = "ky";
				if ($scope.cmbCucHQ != undefined
						&& $scope.cmbCucHQ != null)
					if ($scope.cmbCucHQ.ma != undefined
							&& $scope.cmbCucHQ.ma != null)
						maCucHQ = $scope.cmbCucHQ.ma;
				if ($scope.cmbChiCucHQ != undefined
						&& $scope.cmbChiCucHQ != null)
					if ($scope.cmbChiCucHQ.ma != undefined
							&& $scope.cmbChiCucHQ.ma != null)
						maChicucHQ = $scope.cmbChiCucHQ.ma;
				if ($scope.cmbTrangThai != undefined
						&& $scope.cmbTrangThai != null)
					if ($scope.cmbTrangThai.Ma != undefined
							&& $scope.cmbTrangThai.Ma != null)
						trangthai = $scope.cmbTrangThai.Ma;
				if ($scope.nhx != undefined
						&& $scope.nhx != null)
					nhx = $scope.nhx;
				if ($scope.radLoaiBD != undefined
						&& $scope.radLoaiBD != null)
					loaiBD = $scope.radLoaiBD.value;
				if (loaiBD != undefined && loaiBD != null) {
					var rootApi = contextPath+"/BCHTCBTGTXNK";
					var apiLuongTK = rootApi
							+ "/BieuDoTriGiaTK?maCucHQ="
							+ maCucHQ + "&maChicucHQ="
							+ maChicucHQ + "&trangthai="
							+ trangthai + "&nhx=" + nhx
							+ "&loaiBD=" + loaiBD;
					$scope.srcBieuDo = apiLuongTK;
				}
				$scope.showChart2 = true;
			};
			
			$scope.showChart = function() {  
				$scope.btnXemBieuDo_Click();
				$scope.showChart2 = true;
				$scope.showChart1 = true;
	        };
			
			$scope.btnClose_Click = function()
			{
				$scope.showChart1 = false;
//				window.location.href = "HTCBBTTGXNKHQ";
			};
			

			function loadDefualtForm() {
				$scope.cmbTrangThai = $scope.lstTrangThai[0];
				$scope.lstResult = {};
				$scope.srcBieuDo = "";
//				$scope.radLoaiBD.value = 'ky';
				$scope.radLoaiBD = {value: 'ky'};
			}
			function getCucChiCucHQ() {
				HTCBBTTGXNKHQService.getCucHQ().then(function(deferred) {
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
			function getPhan() {
				HTCBBTTGXNKHQService.getPhan().then(function(deferred) {
					$scope.lstPhan = deferred;
					
				}, function(errResponse) {
					console.error('Error while fetching data');
				});
			}
			(function init() {
				$timeout(function() {
					getCucChiCucHQ();
					getPhan();
					loadDefualtForm();
					$rootScope.$emit('PhanHoiQuyTrinhXLDL', $scope.loai_bc);
					console.log('System controller with timeout fired');
				}, 500);
			})();
		} ]);
