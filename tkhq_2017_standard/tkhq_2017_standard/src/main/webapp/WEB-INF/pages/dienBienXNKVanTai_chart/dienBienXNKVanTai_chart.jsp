<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- <script src="<c:url value='/static/js/service/dienBienXNKVanTaiService.js' />"></script>
<script src="<c:url value='/static/js/controller/dienBienXNKVanTaiController_chart.js' />"></script>  --%>
<style>
.col-md-6 {
	padding-left: 5px;
	padding-right: 1px;
}
</style>
<div class="modal-body">
	<!-- "generic-container"> -->
	<!-- ng-controller="dienBienXNKVanTaiController_chart as XNKVanTaiCtrl">	 -->
	<fieldset class="form-group form-wrapper">
		<form class="form-search">
			<div class="row">
				<div class="col-md-4">
					<input type="radio" name="gender" value="KY" ng-model="radioBox">
					Kỳ
				</div>
				<div class="col-md-4">
					<input type="radio" name="gender" value="THA" ng-model="radioBox"
						checked="true"> Tháng
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<label class="col-md-4">Cục Hải quan </label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in XNKVanTaiCtrl.lstCucHQ"
							ng-model="CucHQ" ng-change="XNKVanTaiCtrl.CucHQSelect(CucHQ)"></select>
					</div>
				</div>
				<div class="col-md-6">
					<label class="col-md-4">Chi cục Hải quan </label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in XNKVanTaiCtrl.lstChiCucHQ"
							ng-model="ChiCucHQ" ng-change=""></select>
					</div>
				</div>

				<div class="col-md-6">
					<label class="col-md-4">Nhóm PTVT </label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in XNKVanTaiCtrl.lstNhomPTVT"
							ng-model="nhomPTVT"
							ng-change="XNKVanTaiCtrl.NhomPTVTSelect(nhomPTVT)"></select>
					</div>
				</div>
				<div class="col-md-6">
					<label class="col-md-4">Phương thức vận tải </label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in XNKVanTaiCtrl.lstPTVT"
							ng-model="PTVT" ng-change=""></select>
					</div>
				</div>

			</div>

			<div align="center">
				<button type="submit" id="btnSearch" ng-click="showChart()"
					class="btn btn-primary">Xem biểu đồ</button>
			</div>
		</form>
	</fieldset>
</div>
<!-- <div class="row">
			<div  style="text-align:right">Đơn vị tính: Triệu USD</div>	
		</div> -->
<!-- <div style="width:100%; overflow-x: scroll;"> -->
<div ng-show="showChart2">
	<div style="text-align: right">Đơn vị tính: Nghìn USD</div>
	<table id="tblSoLieuChiTieu"
		style="width: 100%; border-spacing: 5px; border-collapse: separate;">
		<tr class="row">
			<td><label>Biểu đồ trị giá thống kê(USD)</label> <iframe
					ng-src="{{XNKVanTaiCtrl.linkAPI}}"
					style="width: 100%; height: 320px; border: 1px solid grey;"
					scrolling="none" allowtransparency="true"></iframe></td>
		</tr>
	</table>
	<!-- </div> -->
	</br>
	<div class="form-group row form-btn-align" align="center">
		<button type="button" class="btn btn-primary" data-toggle="modal"
			data-target="#myModal">
			<!-- ng-click="XNKVanTaiCtrl.feedBack()"> -->
			<i class="glyphicon icon-white"></i>Phản hồi
		</button>
		<button type="button" id="btnDel" class="btn btn-primary"
			ng-click="clickDongButton()">
			<i class="glyphicon icon-white"></i>Đóng
		</button>
	</div>
	<br /> <br />
</div>
