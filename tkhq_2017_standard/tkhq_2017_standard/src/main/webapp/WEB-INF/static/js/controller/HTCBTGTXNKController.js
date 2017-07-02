App.controller('HTCBTGTXNKController', ['$scope', 'HTCBTGTXNKService', 'pagerService', '$uibModal', '$PopupMessage', '$timeout', '$rootScope', 'contextPath', 
		function($scope, HTCBTGTXNKService, pagerService, $uibModal, $PopupMessage, $timeout, $rootScope, contextPath) {
			var self = this;
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
			$scope.lstResult = [];
			$scope.nhx = 'X';
			$scope.lstCucHQ = [];
			$scope.lstChiCucHQ = [];
			$scope.lstChiCucHQ1 = [];
			$scope.noiDung = '';
			$scope.loai_bc= '3';
			$scope.showReport = false;
			$scope.srcReport = "";			
			$scope.tenCucHQ = "";
			$scope.showChart1 = false;
			self.linkAPI_LuongTK = '';
	        self.linkAPI_TongGtr = '';
	        self.CucHQSelect1 = CucHQSelect1;
	        $scope.showReport1 = true;
			$scope.btnXemBC_Click = function() {
				$rootScope.showLoading = true;				
				var maCucHQ = "";
				var maChicucHQ = "";
				var nhx = "";
				if ($scope.cmbCucHQ != undefined && $scope.cmbCucHQ != null)
					if ($scope.cmbCucHQ.ma != undefined && $scope.cmbCucHQ.ma != null)
						maCucHQ = $scope.cmbCucHQ.ma;
				if ($scope.cmbChiCucHQ != undefined && $scope.cmbChiCucHQ != null)
					if ($scope.cmbChiCucHQ.ma != undefined && $scope.cmbChiCucHQ.ma != null)
						maChicucHQ = $scope.cmbChiCucHQ.ma;
				
				if ($scope.nhx != undefined && $scope.nhx != null)
					nhx = $scope.nhx;
				HTCBTGTXNKService.getData(maCucHQ, maChicucHQ,nhx)
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
//									if ($scope.lstResult[0].data_ky.data.length % 2 == 1) {
										lengthKY = $scope.lstResult[i].data_ky.data.length -1;
										lengthTHANG = $scope.lstResult[i].data_thang.data.length -1;
										tenKY = $scope.lstResult[i].data_ky.data[lengthKY].ky;
										tenTHANG = $scope.lstResult[i].data_thang.data[lengthTHANG].thang;
//									}
									
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
//								console.log('#########################'+$scope.lstResult[0].data_ky.data.length);
						$scope.showReport1 = false;
						$rootScope.showLoading = false;
						if($scope.cmbChiCucHQ == $scope.lstChiCucHQ[0]){
							$scope.tenCucHQ = $scope.cmbCucHQ.ten;
						} else{							
							$scope.tenCucHQ = $scope.cmbChiCucHQ.ten;
						}
						
						}, function(error) {
							console.log('formData retrieval failed. ' + error);
							$rootScope.showLoading = false;
						});				
				console.log('##########################$scope.tenCucHQ:'+$scope.tenCucHQ);
			};

			$rootScope.$on('childEmit', function(event, data) {
				console.log(data);
				loadDefualtForm();
				$scope.nhx = data;
				
			});
			$scope.CucHQSelected = function (Item) {
				if(Item.ma != '00'){
					HTCBTGTXNKService.getChiCucHQByCuc(Item.ma).then(function(deferred) {
						$scope.lstChiCucHQ = deferred;
						$scope.lstChiCucHQ = [{"ma": "","ten": "---chọn---"}].concat($scope.lstChiCucHQ);
						$scope.cmbChiCucHQ = $scope.lstChiCucHQ[0];
						$scope.lstChiCucHQ1 = deferred;
						$scope.lstChiCucHQ1 = [{"ma": "","ten": "---chọn---"}].concat($scope.lstChiCucHQ1);
						$scope.cmbChiCucHQ1 = $scope.lstChiCucHQ1[0];
					}, function(errResponse) {
						console.error('Error while fetching data');
					});
				} else{
					$scope.lstChiCucHQ = [{"ma": "","ten": "---chọn---"}];
					$scope.cmbChiCucHQ = $scope.lstChiCucHQ[0];
					$scope.lstChiCucHQ1 = [{"ma": "","ten": "---chọn---"}];
					$scope.cmbChiCucHQ1 = $scope.lstChiCucHQ1[0];
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
			
			function CucHQSelect1(Item) {
	        	console.log("CucHQSelect@Item:"+Item);
	        	HTCBTGTXNKService.getChiCucHQByCuc(Item.ma)
	            	.then(
	        			function (deferred) {
	        				$scope.lstChiCucHQ1 = deferred;
	        				$scope.lstChiCucHQ1 = [{"ma": "","ten": "---chọn---"}].concat($scope.lstChiCucHQ1);
	        				$scope.cmbChiCucHQ1 = $scope.lstChiCucHQ1[0];
	                    },
	                    function (errResponse) {
	                        console.error('Error while fetching data');
	                    }
	                );        	
	        }

			function loadDefualtForm() {
				$scope.cmbTrangThai = $scope.lstTrangThai[0];
				$scope.lstResult = {};
				$scope.radLoaiBD = {value: 'ky'};
				$scope.radioBox = 'KY';
			}
			function getCucChiCucHQ() {
				HTCBTGTXNKService.getCucHQ().then(function(deferred) {
					$scope.lstCucHQ = deferred;
					$scope.cmbCucHQ = $scope.lstCucHQ[0];
					$scope.CucHQSelected($scope.cmbCucHQ);
				}, function(errResponse) {
					console.error('Error while fetching data');
				});
//				$timeout(function() {
//					$scope.CucHQSelected($scope.cmbCucHQ);
//				}, 200);
				$rootScope.$emit('PhanHoiQuyTrinhXLDL', $scope.loai_bc);
			}
			(function init() {
				$timeout(function() {
					getCucChiCucHQ();
					loadDefualtForm();
					console.log('System controller with timeout fired');
				}, 500);
			})();
			
			$scope.showChart = function() {
				self.linkAPI_LuongTK = contextPath+'/pbtk/API_HTCBTGTXNK_ky?nhx='
        			+$scope.nhx+'&radioBox='+$scope.radioBox+'&maCucHQ='+$scope.cmbCucHQ.ma+'&maChicucHQ='+$scope.cmbChiCucHQ.ma+'&loaiTK=luongTK';
	            self.linkAPI_TongGtr = contextPath+'/pbtk/API_HTCBTGTXNK_ky?nhx='
	            	+$scope.nhx+'&radioBox='+$scope.radioBox+'&maCucHQ='+$scope.cmbCucHQ.ma+'&maChicucHQ='+$scope.cmbChiCucHQ.ma+'&loaiTK=tongGtr';
	            	
	            console.log('showChart@self.linkAPI_LuongTK:'+self.linkAPI_LuongTK+'||'+self.linkAPI_DongiaTK);
	            $scope.cmbCucHQ1 =$scope.cmbCucHQ;
	            $scope.lstChiCucHQ1 = $scope.lstChiCucHQ;
	            $scope.cmbChiCucHQ1 = $scope.cmbChiCucHQ;
	            $scope.showChart23 = true;
				$scope.showChart1 = true;
	        };
	        
	        $scope.showChart2 = function() {        	
	        	self.linkAPI_LuongTK = contextPath+'/pbtk/API_HTCBTGTXNK_ky?nhx='
	        		+$scope.nhx+'&radioBox='+$scope.radioBox+'&maCucHQ='+$scope.cmbCucHQ1.ma+'&maChicucHQ='+$scope.cmbChiCucHQ1.ma+'&loaiTK=luongTK';
	            self.linkAPI_TongGtr = contextPath+'/pbtk/API_HTCBTGTXNK_ky?nhx='
	            	+$scope.nhx+'&radioBox='+$scope.radioBox+'&maCucHQ='+$scope.cmbCucHQ1.ma+'&maChicucHQ='+$scope.cmbChiCucHQ1.ma+'&loaiTK=tongGtr';
	            	
	            console.log('showChart2@self.linkAPI_LuongTK:'+self.linkAPI_LuongTK+'||'+self.linkAPI_DongiaTK);            
	        };
			
	        $scope.clickDongButton = function() {
//	            console.log('clickDongButton@$scope.trangThai:'+$scope.trangThai.ma);
//	            window.location.href = contextPath;
	        	$scope.showChart1 = false;
	        };
	        
			$scope.btnClose_Click = function()
			{
				window.location.href = "HTCBTGTXNK";
			};
			
			$scope.btnKetXuat_Click = function(){
				var maCucHQ = "";
				var tenCucHQ = "";
				var maChicucHQ = "";
				var nhx = "";
				var tenChicucHQ = "";
				if ($scope.cmbCucHQ != undefined && $scope.cmbCucHQ != null)
					if ($scope.cmbCucHQ.ma != undefined && $scope.cmbCucHQ.ma != null){
						maCucHQ = $scope.cmbCucHQ.ma;
						tenCucHQ = $scope.cmbCucHQ.ten;
					}
				if ($scope.cmbChiCucHQ != undefined && $scope.cmbChiCucHQ != null && $scope.cmbChiCucHQ != $scope.lstChiCucHQ[0])
					if ($scope.cmbChiCucHQ.ma != undefined && $scope.cmbChiCucHQ.ma != null){
						maChicucHQ = $scope.cmbChiCucHQ.ma;
						tenChicucHQ = $scope.cmbChiCucHQ.ten;
					}
				if ($scope.nhx != undefined && $scope.nhx != null)
					nhx = $scope.nhx;
				var param = {};
		    	param["maCucHQ"] = maCucHQ;
		    	param["tenCucHQ"] = tenCucHQ;
		    	param["maChiCucHQ"] = maChicucHQ;
		    	param["tenChicucHQ"] = tenChicucHQ;
		    	param["nhx"] = nhx;
		    	console.log('***************btnKetXuat_Click@maCucHQ:'+maCucHQ+'|tenCucHQ:'+tenCucHQ+'|maChicucHQ:'+maChicucHQ
		    			+'|tenChicucHQ:'+tenChicucHQ);
		    	
		    	HTCBTGTXNKService.doExport(param);
			};
} ]);
