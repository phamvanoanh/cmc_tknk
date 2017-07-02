<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script
	src="<c:url value='/static/js/service/dienBienXuTheChiSoService.js' />"></script>
<script
	src="<c:url value='/static/js/controller/dienBienXuTheChiSoController.js' />"></script>
<script
	src="<c:url value='/static/js/controller/PhanHoiQuyTrinhXLDLController.js' />"></script>
<script
	src="<c:url value='/static/js/service/PhanHoiQuyTrinhXLDLService.js' />"></script>

<div ng-controller="PhanHoiQuyTrinhXLDLController">
	<%@ include file="../PhanHoiQuyTrinhXLDL/PhanHoiQuyTrinhXLDL.jsp"%>
</div>

<div class="row">
	<div class="fade-in-out" ng-show="showLoading">
		<uib-progressbar class="progress-striped active progressBar"
			type="info"></uib-progressbar>
	</div>
</div>

<div ng-controller="dienBienXuTheChiSoController as chiSoTKNNCtrl"
	class="modal-body">
	<div class="generic-container" ng-hide="chiSoTKNNCtrl.showChart1">
		<fieldset class="form-group form-wrapper">
			<form class="form-search">
				<div class="row">


					<div class="col-md-4">
						<input type="radio" name="gender" value="THA" ng-model="radioBox"
							checked="true">
						<!-- ng-change="radioChecked()" > -->
						Tháng
					</div>

					<div class="col-md-4">
						<input type="radio" name="gender" value="QUY" ng-model="radioBox">
						<!-- ng-change="radioChecked()"> -->
						Quý
					</div>

					<div class="col-md-4">
						<input type="radio" name="gender" value="NAM" ng-model="radioBox">
						<!-- ng-change="radioChecked()"> -->
						Năm
					</div>
				</div>

				<div class="row">
					<div class="col-md-6">
						<label class="col-md-4">Trạng thái</label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in chiSoTKNNCtrl.lstTrangThai"
								ng-model="trangThai" ng-change=""></select>
						</div>
					</div>
					<div class="col-md-6">
						<label class="col-md-4">Chỉ số</label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in chiSoTKNNCtrl.lstChiSo"
								ng-model="chiSo" ng-change=""></select>
						</div>
					</div>

					<div class="col-md-6">
						<label class="col-md-4">Mặt hàng</label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in chiSoTKNNCtrl.lstMatHang"
								ng-model="matHang" ng-change=""></select>
						</div>
					</div>
					<div class="col-md-6">
						<label class="col-md-4">Loại chỉ số</label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in chiSoTKNNCtrl.lstLoaiChiSo"
								ng-model="loaiChiSo" ng-change=""></select>
						</div>
					</div>

				</div>

				<div align="center" class="row" style="margin-top: 10px">
					<button type="submit" id="btnSearch"
						ng-click="GetSoLieuChiTieuTK07()" class="btn btn-primary">Xem
						báo cáo</button>
				</div>
			</form>
		</fieldset>
		</br>
		<!-- <div class="row">
			<div  style="text-align:right">Đơn vị tính: Nghìn USD</div>			
		</div> -->
		<!-- <div style="width:96%; overflow-x: scroll;"> -->
		<div ng-hide="showReport1" >
		<div style="width: 100%; min-height: 50px;" class="table-scroll">
			<table id="tblSoLieuChiTieu"
				class="table table-bordered table-striped table-responsive">
				<thead>
					<tr>
						<th rowspan='2' style="text-align: center;">Chỉ tiêu</th>
						<th colspan='4' style="text-align: center;">{{chiSoTKNNCtrl.kyHienTai}}</th>
						<th rowspan='2' style="text-align: center;"
							ng-hide="chiSoTKNNCtrl.hideColum">{{chiSoTKNNCtrl.luyKe}}</th>
					</tr>
					<tr>
						<th>Kỳ gốc(2012)</th>
						<th ng-hide="chiSoTKNNCtrl.hideColum">{{chiSoTKNNCtrl.cungKyNamTruoc}}</th>
						<th ng-hide="chiSoTKNNCtrl.hideColum">{{chiSoTKNNCtrl.kyCuoiNamTruoc}}</th>
						<th>{{chiSoTKNNCtrl.kyTruoc}}</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="row in chiSoTKNNCtrl.soLieuChiTieuTK">
						<td ng-bind="row.chitieu"></td>
						<td ng-bind="row.ss_kygoc" align="right"></td>
						<td ng-hide="chiSoTKNNCtrl.hideColum"
							ng-bind="row.ss_cungky_namtruoc" align="right"></td>
						<td ng-hide="chiSoTKNNCtrl.hideColum"
							ng-bind="row.ss_kycuoi_namtruoc" align="right"></td>
						<td ng-bind="row.ss_kytruoc" align="right"></td>
						<td ng-hide="chiSoTKNNCtrl.hideColum" ng-bind="row.ss_luyke" align="right"></td>
					</tr>
					<%-- <tr>
					<td rowspan="2" ng-bind="chiSoTKNNCtrl.soLieuChiTieuTK.chi_tieu"></td>
					<td>Kỳ</td>
					<td ng-repeat="ky in chiSoTKNNCtrl.lstDataKy">
					<center>{{ky.ky}}</center><br/>
					<center>{{ky.gia_tri}}</center>
					</td>
					<td ng-bind="chiSoTKNNCtrl.soLieuChiTieuTK.ss_ky_truoc">ddd</td>
					<td ng-bind="chiSoTKNNCtrl.soLieuChiTieuTK.ss_ky_nam_truoc">dd</td>
				</tr>
				<tr>
					<td>Tháng</td>
					<td ng-repeat="thang in chiSoTKNNCtrl.lstDataThang" colspan="2">
					<center>{{thang.thang}}</center><br/>
					<center>{{thang.gia_tri}}</center>
					</td>
					<td ng-bind="chiSoTKNNCtrl.soLieuChiTieuTK.ss_ky_truoc">dd</td>
					<td ng-bind="chiSoTKNNCtrl.soLieuChiTieuTK.ss_ky_nam_truoc">dd</td>
				</tr>
				<tr>
					<td>AVG</td>
					<td colspan="{{chiSoTKNNCtrl.lstDataKy.length}}" ng-bind="chiSoTKNNCtrl.soLieuChiTieuTK.avg"></td>
				</tr>	 --%>
				</tbody>
			</table>
			</div>
			<div class="form-group row form-btn-align" align="center">
				<button type="button" class="btn btn-primary" data-toggle="modal"
					data-target="#myModal" ng-click="btnPhanHoi_Click()" style="width: 100px;">
					<!-- ng-click="chiSoTKNNCtrl.feedBack()"> -->
					<i class="glyphicon icon-white"></i>Phản hồi
				</button>
				<button type="submit" id="btnSearch" ng-click="doExport()"
					class="btn btn-primary" style="width: 100px;">
					<i class="glyphicon icon-white"></i>Kết xuất
				</button>
				<button type="button" id="addRow" class="btn btn-primary"
					ng-click="doExport()" style="width: 100px;">
					<i class="glyphicon icon-white"></i>In
				</button>
				<!-- <button type="button" id="btnDel" class="btn btn-primary" ng-click="">
				<i class="glyphicon icon-white"></i>Đóng
			</button> -->
			</div>
			<br />
			<div>
				<a ng-click="showChart()"
					style="text-decoration: underline; font-weight: bold" class="btn">Biểu
					đồ</a> &nbsp; &nbsp;
			</div>
			</br>
		</div>
	</div>
	<div ng-show="chiSoTKNNCtrl.showChart1">
		<%@ include
			file="../dienBienXuTheChiSo_chart/dienBienXuTheChiSo_chart.jsp"%>
	</div>
</div>

