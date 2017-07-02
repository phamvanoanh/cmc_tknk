<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script
	src="<c:url value='/static/js/service/dienBienXNKVanTaiService.js' />"></script>
<script
	src="<c:url value='/static/js/controller/dienBienXNKVanTaiController.js' />"></script>
<script
	src="<c:url value='/static/js/controller/PhanHoiQuyTrinhXLDLController.js' />"></script>
<script
	src="<c:url value='/static/js/service/PhanHoiQuyTrinhXLDLService.js' />"></script>

<div ng-controller="PhanHoiQuyTrinhXLDLController">
	<%@ include file="../PhanHoiQuyTrinhXLDL/PhanHoiQuyTrinhXLDL.jsp"%>
</div>
<style>
.col-md-4 {
	padding-left: 5px;
	padding-right: 1px;
}
</style>
<div class="row">
	<div class="fade-in-out" ng-show="showLoading">
		<uib-progressbar class="progress-striped active progressBar"
			type="info"></uib-progressbar>
	</div>
</div>

<div class="modal-body" ng-controller="dienBienXNKVanTaiController as XNKVanTaiCtrl">
	<div class="generic-container" ng-hide="XNKVanTaiCtrl.showChart1">
		<fieldset class="form-group form-wrapper">
			<form class="form-search">
				<div class="row">

					<div class="col-md-4">
						<label class="col-md-4">Trạng thái </label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in XNKVanTaiCtrl.lstTrangThai"
								ng-model="trangThai" ng-change=""></select>
						</div>
					</div>
					<div class="col-md-4">
						<label class="col-md-4">Nhóm PTVT </label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in XNKVanTaiCtrl.lstNhomPTVT"
								ng-model="nhomPTVT"
								ng-change="XNKVanTaiCtrl.NhomPTVTSelect(nhomPTVT)"></select>
						</div>
					</div>
					<div class="col-md-4">
						<label class="col-md-4">Phương thức VT </label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in XNKVanTaiCtrl.lstPTVT"
								ng-model="PTVT" ng-change=""></select>
						</div>
					</div>

					<div class="col-md-4">
						<label class="col-md-4">Cục Hải quan </label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in XNKVanTaiCtrl.lstCucHQ"
								ng-model="CucHQ" ng-change="XNKVanTaiCtrl.CucHQSelect(CucHQ)"></select>
						</div>
					</div>
					<div class="col-md-4">
						<label class="col-md-4">Chi cục Hải quan </label>
						<div class="col-md-8">
							<select class="form-control"
								ng-options="item as item.ten for item in XNKVanTaiCtrl.lstChiCucHQ"
								ng-model="ChiCucHQ" ng-change=""></select>
						</div>
					</div>

				</div>
				<br />
				<div align="center">
					<button type="submit" id="btnSearch" ng-click="getBaoCao()"
						class="btn btn-primary">Xem báo cáo</button>
				</div>
			</form>
		</fieldset>
		<div ng-hide="showReport1">
			<div class="row">
				<div style="text-align: right">Đơn vị tính: Nghìn USD</div>
			</div>
			<div style="width: 100%; min-height: 50px;" class="table-scroll">
				<table id="tblSoLieuChiTieu"
					class="table table-bordered table-striped table-responsive">
					<thead>
						<th>Chỉ tiêu</th>
						<th>Kỳ</th>
						<th
							colspan={{XNKVanTaiCtrl.soLieuChiTieuTK[0].group_data[0].data_ky.data.length}}>Thời
							gian</th>
						<th>So sánh với kỳ trước</th>
						<th>So sánh cùng kỳ năm trước</th>
					</thead>
					<tbody ng-repeat="row1 in XNKVanTaiCtrl.soLieuChiTieuTK">
						<tr>
							<td colspan="{{row1.group_data[0].data_ky.data.length +4}}"
								ng-bind="row1.group_name"></td>
						</tr>
						<!-- <tbody> -->

						<tr ng-repeat-start="row in row1.group_data">
							<td rowspan="2">{{row.sub_name}}</td>
							<td>Kỳ</td>
							<td ng-repeat="ky in row.data_ky.data"
								ng-class='{red : (ky.gia_tri != null && ky.gia_tri.trim() != "" && ky.gia_tri == row.data_ky.maxKy && ky.ky != row.data_ky.tenKY), 
								yellow : (ky.gia_tri != null && ky.gia_tri.trim() != "" && ky.gia_tri == row.data_ky.minKy && ky.ky != row.data_ky.tenKY)}'>
								<center>{{ky.ky}}</center> <br />
								<center>{{ky.gia_tri}}</center>
							</td>
							<td ng-bind="row.data_ky.ss_ky_truoc" align="center"></td>
							<td ng-bind="row.data_ky.ss_ky_nam_truoc" align="center"></td>
							<!-- 	<td ng-bind="row.data_ky.trend"></td>
					<td ng-bind="row.data_ky.forecast"></td> -->
						</tr>

						<tr>
							<td>Tháng</td>
							<td ng-repeat="thang in row.data_thang.data" colspan="2"
								ng-class='{red : (thang.gia_tri != null && thang.gia_tri.trim() != "" && thang.gia_tri == row.data_thang.maxThang && thang.thang != row.data_thang.tenTHANG), 
								yellow : (thang.gia_tri != null && thang.gia_tri.trim() != "" && thang.gia_tri == row.data_thang.minThang && thang.thang != row.data_thang.tenTHANG)}'>
								<center>{{thang.thang}}</center> <br />
								<center>{{thang.gia_tri}}</center>
							</td>
							<td ng-bind="row.data_thang.ss_thang_truoc" align="center"></td>
							<td ng-bind="row.data_thang.ss_thang_nam_truoc" align="center"></td>
							<!-- <td ng-bind="row.data_thang.trend"></td>
					<td ng-bind="row.data_thang.forecast"></td> -->
						</tr>
						<tr ng-repeat-end>
							<td>AVG</td>
							<!-- <td ng-class='{green : true}' -->
							<td class="green" colspan="{{row.data_ky.data.length +1}}"
								ng-bind="row.avg"></td>
							<td></td>
							<td></td>
							<!-- <td></td>
					<td></td> -->
						</tr>
						<!-- </tbody> -->
					</tbody>
				</table>
			</div>
			</br>
			<div class="form-group row form-btn-align" align="center">
				<button type="button" class="btn btn-primary" data-toggle="modal"
					data-target="#myModal" ng-click="btnPhanHoi_Click()" style="width: 100px;">
					<!-- ng-click="XNKVanTaiCtrl.feedBack()"> -->
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
			</br>
			<div>
				<a ng-click="showChart()"
					style="font-weight: bold; text-decoration: underline;" class="btn">Biểu
					đồ</a> &nbsp; &nbsp;
			</div>
			</br>
		</div>
	</div>
	<div ng-show="XNKVanTaiCtrl.showChart1">
		<%@ include
			file="../dienBienXNKVanTai_chart/dienBienXNKVanTai_chart.jsp"%>
	</div>
</div>
