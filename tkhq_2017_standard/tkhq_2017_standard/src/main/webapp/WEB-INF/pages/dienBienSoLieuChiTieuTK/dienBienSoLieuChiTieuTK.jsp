<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:url value='/static/js/service/dienBienSoLieuChiTieuTKService.js' />"></script>
<script src="<c:url value='/static/js/controller/dienBienSoLieuChiTieuTKController.js' />"></script>

<script src="<c:url value='/static/js/controller/PhanHoiQuyTrinhXLDLController.js' />"></script>
<script src="<c:url value='/static/js/service/PhanHoiQuyTrinhXLDLService.js' />"></script>

<div ng-controller="PhanHoiQuyTrinhXLDLController">
	<%@ include file="../PhanHoiQuyTrinhXLDL/PhanHoiQuyTrinhXLDL.jsp"%>
</div>
<div class="row">
	<div class="fade-in-out" ng-show="showLoading">
		<uib-progressbar class="progress-striped active progressBar" type="info"></uib-progressbar>
	</div>
</div>
<div class="modal-body"
	ng-controller="dienBienSoLieuChiTieuTKController as soLieuChiTieuTKNNCtrl">
	<div class="generic-container"
		ng-hide="soLieuChiTieuTKNNCtrl.showChart1">
		<fieldset class="form-group form-wrapper">
			<form class="form-search">
				<table style="width: 60%" align="center">
					<tr>
						<td class="col-md-3"><label class="col-md-3" >Trạng thái:</label>
							<div class="col-md-6">
								<select class="form-control"
									ng-options="item as item.ten for item in soLieuChiTieuTKNNCtrl.lstTrangThai"
									ng-model="trangThai" ng-change=""></select>
							</div></td>
					</tr>
				</table>
				<br/>
				<div align="center">
					<button type="submit" id="btnSearch"
						ng-click="selectTrangThai(trangThai)" class="btn btn-primary">Xem
						báo cáo</button>
				</div>
			</form>
			
		</fieldset>

	<!-- </div> -->
	<div ng-show="!showReport1">
	<div class="row">
		<div style="text-align: right">Đơn vị tính: Nghìn USD</div>
	</div>
	<div style="width: 100%; overflow-x: scroll;">
		<table id="tblSoLieuChiTieu"
			class="table table-bordered table-striped table-responsive">
			<thead>
				<th>Chỉ tiêu</th>
				<th>Kỳ</th>
				<th colspan={{soLieuChiTieuTKNNCtrl.lstDataKy.length}}>Thời
					gian</th>
				<th>So sánh với kỳ trước</th>
				<th>So sánh cùng kỳ năm trước</th>

			</thead>
			<tbody>
				<tr>
					<td rowspan="2"
						ng-bind="soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.sub_name"></td>
					<td>Kỳ</td>
					<td ng-repeat="ky in soLieuChiTieuTKNNCtrl.lstDataKy"
						ng-class='{red : (ky.gia_tri != null && ky.gia_tri.trim() != "" && ky.gia_tri == soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_ky.maxKy && ky.ky != soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_ky.tenKY), 
						yellow : (ky.gia_tri != null && ky.gia_tri.trim() != "" && ky.gia_tri == soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_ky.minKy && ky.ky != soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_ky.tenKY)}'>
						<!-- ng-class='{red : (ky.ky == "K1T1N12")}'> -->
						<center>{{ky.ky}}</center> <br />
						<center>{{ky.gia_tri}}</center>
					</td>
					<td ng-bind="soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_ky.ss_ky_truoc" align="center"></td>
					<td ng-bind="soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_ky.ss_ky_nam_truoc" align="center"></td>
				</tr>
				<tr>
					<td>Tháng</td>
					<td ng-repeat="thang in soLieuChiTieuTKNNCtrl.lstDataThang"
						ng-class='{red : (thang.gia_tri != null && thang.gia_tri.trim() != "" && thang.gia_tri == soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_thang.maxThang && thang.thang != soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_thang.tenTHANG), 
						yellow : (thang.gia_tri != null && thang.gia_tri.trim() != "" && thang.gia_tri == soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_thang.minThang && thang.thang != soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_thang.tenTHANG)}'
						colspan="2">
						<center>{{thang.thang}}</center> <br />
						<center>{{thang.gia_tri}}</center>
					</td>
					<td ng-bind="soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_thang.ss_thang_truoc" align="center"></td>
					<td ng-bind="soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.data_thang.ss_thang_nam_truoc" align="center"></td>
				</tr>
				<tr>
					<td>AVG</td>
					<!-- <td class="green" -->
					<td ng-class='{green : true}'					
						colspan="{{soLieuChiTieuTKNNCtrl.lstDataKy.length + 1}}"
						ng-bind="soLieuChiTieuTKNNCtrl.soLieuChiTieuTK.avg"></td>
					<td></td>
					<td></td>
				</tr>

			</tbody>
		</table>
	</div>
	<div class="form-group row form-btn-align" align="center">
		<button type="button" class="btn btn-primary" data-toggle="modal"
			data-target="#myModal" ng-click="btnPhanHoi_Click()" style="width: 100px;">
			<!-- ng-click="soLieuChiTieuTKNNCtrl.feedBack()"> -->
			<i class="glyphicon icon-white"></i>Phản hồi
		</button>
		<button type="submit" id="btnSearch" ng-click="doExport()"
			class="btn btn-primary" style="width: 100px;">
			<i class="glyphicon icon-white"></i>Kết xuất
		</button>
		<button type="button" id="addRow" class="btn btn-primary" ng-click="doExport()" style="width: 100px;">
			<i class="glyphicon icon-white"></i>In
		</button>
		<!-- <button type="button" id="btnDel" class="btn btn-primary" ng-click="">
			<i class="glyphicon icon-white"></i>Đóng
		</button> -->
	</div>
	</br>
	<div>
		<a ng-click="showChart()" style="text-decoration: underline; font-weight: bold" class="btn">Biểu đồ</a> &nbsp; &nbsp;
	</div>
	</div>
	</div>

	<div ng-show="soLieuChiTieuTKNNCtrl.showChart1">
		<%@ include
			file="../dienBienSoLieuChiTieuTK_chart/dienBienSoLieuChiTieuTK_chart.jsp"%>
	</div>
</div>
