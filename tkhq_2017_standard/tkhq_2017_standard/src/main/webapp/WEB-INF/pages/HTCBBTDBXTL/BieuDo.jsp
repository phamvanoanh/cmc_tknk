<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div ng-controller="PhanHoiQuyTrinhXLDLController">
	<%@ include file="../PhanHoiQuyTrinhXLDL/PhanHoiQuyTrinhXLDL.jsp"%>
</div>
<style>
.col-md-4 {
	padding-left: 5px;
	padding-right: 1px;
}
</style>
<div class="generic-container" style="width: 100%; height: 30%;">
	<fieldset class="form-group form-wrapper">
		<form class="form-search">
			<div class="row">

				<div class="col-md-4">
					<div class="col-md-4">
						<input type="radio" ng-model="radLoaiBD.value" value="ky">
						Kỳ
					</div>
				</div>
				<div class="col-md-4">
					<div class="col-md-4">
						<input type="radio" ng-model="radLoaiBD.value" value="thang">
						Tháng
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<label class="col-md-4">Trạng thái</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.Ten for item in lstTrangThai"
							ng-model="cmbTrangThai"></select>
					</div>
				</div>
				<div class="col-md-4">
					<label class="col-md-4">Mặt hàng</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in lstMatHang"
							ng-model="cmbMatHang"></select>
					</div>
				</div>
				<div class="col-md-4">
					<label class="col-md-4">Thị trường</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in lstThiTruong"
							ng-model="cmbThiTruong"></select>
					</div>
				</div>				

				<div class="col-md-4">
					<label class="col-md-4">Cục Hải quan</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in lstCucHQ"
							ng-model="cmbCucHQ" ng-change="CucHQSelected(cmbCucHQ)"></select>
					</div>
				</div>
				<div class="col-md-4">
					<label class="col-md-4">Chi cục Hải quan</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in lstChiCucHQ"
							ng-model="cmbChiCucHQ"></select>
					</div>
				</div>


			</div>
		</form>
	</fieldset>

	</br>
	<div class="form-group row form-btn-align" align="center">
		<button type="button" class="btn btn-primary"
			ng-click="btnXemBieuDo_Click()">
			<i class="glyphicon icon-white"></i> Xem biểu đồ
		</button>
	</div>
	</br>
	<div ng-show="showChart2">
		<table
			style="width: 100%; border-spacing: 5px; border-collapse: separate;">
			<tr style="border-spacing: 100px;">
				<td class="col-md-6"><label class="col-md-5">Biểu đồ
						lượng thống kê</label>
					<div style="width: 100%; height: 100%">
						<iframe id="frBDLuongTK" ng-src="{{srcBieuDoLuongTK}}" class=""
							style="display: block; width: 100%; height: 320px;"></iframe>
					</div></td>
				<td class="col-md-6"><label class="col-md-5">Biểu đồ
						đơn giá thống kê</label>
					<div style="width: 100%; height: 100%;">
						<iframe id="frBDDonGiaTK" ng-src="{{srcBieuDoDonGiaTK}}" class=""
							style="display: block; width: 100%; height: 320px;"></iframe>
					</div></td>
			</tr>
			<tr>
				<td class="col-md-6"><label class="col-md-5">Biểu đồ
						trị giá thống kê (USD)</label>
					<div style="width: 100%; height: 100%;">
						<iframe id="frBDTGTK" ng-src="{{srcBieuTriGiaTK}}" class=""
							style="display: block; width: 100%; height: 320px;"></iframe>
					</div></td>
			</tr>
		</table>
		<div class="form-group row form-btn-align" align="center">
			<button type="button" class="btn btn-primary" data-toggle="modal"
				data-target="#myModal" ng-click="btnPhanHoi_Click()">
				<i class="glyphicon icon-white"></i> Phản hồi
			</button>
			<button type="button" id="btnClose" class="btn btn-primary"
				ng-click="btnClose_Click()" ng-show="showChart1">
				<i class="glyphicon icon-white"></i> Đóng
			</button>
		</div>
		</br>
		<div class="form-group row form-btn-align" align="center">
			<div class="row">
				<div></div>
				<div></div>

			</div>
		</div>
	</div>
</div>
<style>
.red {
	background-color: red;
}

.green {
	background-color: green;
}
</style>
