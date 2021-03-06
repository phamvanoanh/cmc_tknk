<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
.col-md-4{
padding-right: 5px;
    padding-left: 1px;
}.btn-danger {
    visibility: hidden;}
</style>

<div class="row">
	<div class="fade-in-out" ng-show="showLoading">
		<uib-progressbar class="progress-striped active progressBar"
			type="info"></uib-progressbar>
	</div>
</div>

<!-- <div style="background-color: white !important; border: 0px !important;"> -->
<div class="generic-container">
	<fieldset class="form-group form-wrapper">
		<!-- <legend class="form-wrapper">Thông tin tìm kiếm</legend> -->
		<form class="form-search">
			<div class="col-md-12">

				<div class="col-md-4">
					<label class="col-md-4">Loại kỳ</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.TenLoaiKy for item in Scope.lstLoaiKy"
							ng-model="cmbLoaiKy"
							ng-change="Scope.cmbLoaiKySelect(cmbLoaiKy.MaLoaiKy)"></select>
					</div>
				</div>
				<div class="col-md-4">
					<label class="col-md-4">Cục Hải quan</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in Scope.lstCucHQ"
							ng-model="CucHQ" ng-change="Scope.CucHQSelect(CucHQ)"></select>
					</div>
				</div>
				<div class="col-md-4">
					<label class="col-md-4">Chi cục Hải quan</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in Scope.lstChiCucHQ"
							ng-model="ChiCucHQ"></select>
					</div>
				</div>
				<div ng-hide="Scope.hideKy" class="col-md-4">
					<label class="col-md-4">Kỳ</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item for item in Scope.lstKy"
							ng-model="cmbKy"></select>
					</div>
				</div>
				<div ng-hide="Scope.hideThang" class="col-md-4">
					<label class="col-md-4">Tháng</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item for item in Scope.lstThang"
							ng-model="cmbThang"></select>
					</div>
				</div>
				<div ng-hide="Scope.hideNam" class="col-md-4">
					<label class="col-md-4">Năm</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item for item in Scope.lstNam"
							ng-model="cmbNam"></select>
					</div>
				</div>
				<div ng-hide="Scope.hideTuNgay" class="col-md-4">
					<label class="col-md-4">Từ ngày</label>
					<div class="col-md-8">
						<input type="text" uib-datepicker-popup="dd/MM/yyyy" readonly="readonly" style="background-color: white;"
						ng-click="open1()" is-open="popup1.opened" ng-model="txtTuNgay" class="form-control"><i
							class="fa fa-calendar form-control-feedback" ng-click="open2()"
							style="margin-top: -22px;"></i>
					</div>
				</div>
				<div ng-hide="Scope.hideDenNgay" class="col-md-4">
					<label class="col-md-4">Đến ngày</label>
					<div class="col-md-8">
						<input type="text" ng-model="txtDenNgay" uib-datepicker-popup="dd/MM/yyyy"
						 readonly="readonly" style="background-color: white;"  
						 ng-click="open2()" is-open="popup2.opened" class="form-control"><i
							class="fa fa-calendar form-control-feedback" ng-click="open2()"
							style="margin-top: -22px;"></i>
					</div>
				</div>
				<div class="col-md-4">
					<label class="col-md-4">Nghiệp vụ</label>
					<div class="col-md-8">
						<select class="form-control"
							ng-options="item as item.ten for item in Scope.lstNghiepVu"
							ng-model="NghiepVu"
							ng-change="Scope.NghiepVuSelect(NghiepVu.manv)"></select>
					</div>
				</div>

			</div>
		</form>
	</fieldset>
</div>

<div class="form-group row form-btn-align" align="center">
	<button type="submit" id="btnTaiDuLieu" ng-click="Scope.TaiDuLieu()"
		class="btn btn-primary">
		<i class="glyphicon icon-white"></i>Xem báo cáo
	</button>
	<!-- <button type="submit" id="btnKetXuat" ng-click="Scope.KetXuat()"
		class="btn btn-primary" style="width: 100px;">
		<i class="glyphicon icon-white"></i>Kết xuất
	</button>
	<button type="button" id="btnIn" class="btn btn-primary"
		ng-click="Scope.In()" style="width: 100px;">
		<i class="glyphicon icon-white"></i>In
	</button> -->
	<!-- <button type="button" id="btnClose" class="btn btn-danger"
		ng-click="Scope.Close()">
		<i class="glyphicon icon-white"></i>Đóng
	</button> -->
</div>
<br />
<!-- <div class="row">
	<div>Total: {{Scope.totalItems}}</div>
	<div>
		<pagination total-items="Scope.totalItems" ng-change="pageChanged()" ng-model="Scope.currentPage" max-size="Scope.maxSize" class="pagination" boundary-links="true" rotate="false"></pagination>
	</div>
</div> -->
<div ng-show="showReport1">
<div style="width: 96%;min-height: 50px;" class="table-scroll" >
	<table id="tbTongThe" ng-hide="Scope.hideTableTongThe"
		class="table table-bordered table-responsive table-striped">

		<thead>
			<tr>
				<th>Lý do thay đổi</th>
				<th>Tổng số tờ khai</th>
				<th>Tổng số dòng hàng</th>
				<th>Giá trị thống kê USD cũ</th>
				<th>Giá trị thống kê USD mới</th>
				<th>Thay đổi</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="row in Scope.lstKxTongThe">
				<td ng-bind="row.lydo"></td>
				<td ng-bind="row.tong_tk" align="right"></td>
				<td ng-bind="row.tong_dh" align="right"></td>
				<td ng-bind="row.trigia_cu" align="right"></td>
				<td ng-bind="row.trigia_moi" align="right"></td>
				<td ng-bind="row.thaydoi" align="right"></td>

			</tr>
		</tbody>
	</table>

	<table id="tbBSToKhai" ng-hide="Scope.hideTableBSToKhai"
		class="table table-bordered table-responsive table-striped">

		<thead>
			<tr>
				<th>Mô tả hàng hóa</th>
				<th>Mã hàng</th>
				<th>Mã thống kê</th>
				<th>Nghi ngờ</th>
				<th>Is_tk</th>
				<th>SD</th>
				<th>ĐVT TK</th>
				<th>Đơn giá (USD)</th>
				<th>Đơn giá (VND)</th>
				<th>Lượng</th>
				<th>Lượng thống kê</th>
				<th>Trị giá (USD)</th>
				<th>Trị giá (VND)</th>
				<th>Trị giá thống kê (USD)</th>
				<th>Trị giá thống kê (VND)</th>
				<th>Mã đơn vị</th>
				<th>Mã hải quan</th>
				<th>Mã loại hình</th>
				<th>Số tờ khai</th>
				<th>Tháng</th>
				<th>Kỳ</th>
				<th>Nước nhập khẩu</th>
				<th>Nước XX</th>
				<th>Mã nguyên tệ</th>
				<th>Ngày đăng ký</th>
				<th>Cảng nước ngoài</th>
				<th>Mã cửa khẩu nhập</th>
				<th>Tên cửa khẩu nhập</th>
				<th>Mã cửa khẩu xuất</th>
				<th>Tên cửa khẩu xuất</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="row in Scope.lstKxBoSungTK">
				<td ng-bind="row.mo_ta"></td>
				<td ng-bind="row.ma_hang"></td>
				<td ng-bind="row.ma_tk"></td>
				<!-- <td ng-bind="row.is_nn"></td> -->
				<td><input type="checkbox" ng-checked="row.is_nn" ng-model="row.is_nn"></td>
				<td ng-bind="row.is_tk"></td>
				<td ng-bind="row.sd"></td>
				<td ng-bind="row.dvt_tk" align="center"></td>
				<td ng-bind="row.don_gia_usd" align="right"></td>
				<td ng-bind="row.don_gia_vnd" align="right"></td>
				<td ng-bind="row.luong" align="right"></td>
				<td ng-bind="row.luong_tk" align="right"></td>
				<td ng-bind="row.tri_gia_usd" align="right"></td>
				<td ng-bind="row.tri_gia_vnd" align="right"></td>
				<td ng-bind="row.tri_gia_tk_usd" align="right"></td>
				<td ng-bind="row.tri_gia_tk_vnd" align="right"></td>
				<td ng-bind="row.ma_dv"></td>
				<td ng-bind="row.ma_hq"></td>
				<td ng-bind="row.ma_lh"></td>
				<td ng-bind="row.so_tk"></td>
				<td ng-bind="row.thang" align="center"></td>
				<td ng-bind="row.ky" align="center"></td>
				<td ng-bind="row.nuoc_nk"></td>
				<td ng-bind="row.nuoc_xx"></td>
				<td ng-bind="row.ma_nt" align="center"></td>
				<td align="center">{{formatDateToString(row.ngay_dk)}}</td>
				<td ng-bind="row.cang_nn"></td>
				<td ng-bind="row.ma_cuakhau_nk"></td>
				<td ng-bind="row.ten_cuakhau_nk"></td>
				<td ng-bind="row.ma_cuakhau_xk"></td>
				<td ng-bind="row.ten_cuakhau_xk"></td>
			</tr>
		</tbody>
	</table>


	<table id="tbHuyXoa" ng-hide="Scope.hideTableHuyXoa"
		class="table table-bordered table-responsive table-striped">
		<thead>
			<tr>
				<th>Số tờ khai</th>
				<th>Mã Hải quan</th>
				<th>Mã loại hình</th>
				<th>Ngày tháng năm đăng ký</th>
				<th>Lý do huỷ</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="row in Scope.lstKxHuyXoa">
				<td ng-bind="row.so_tk"></td>
				<td ng-bind="row.ma_hq"></td>
				<td ng-bind="row.ma_lh"></td>
				<td ng-bind="row.ngay_dk" align="center"></td>
				<td ng-bind="row.lydo_huy"></td>
			</tr>
		</tbody>
	</table>

	<table id="tbSDBS" ng-hide="Scope.hideTableSDBS"
		class="table table-bordered table-responsive table-striped">
		<thead>
			<tr>
				<th rowspan="2">Số tờ khai</th>
				<th rowspan="2">Số TT dòng hàng</th>
				<th rowspan="2">Mã Hải quan</th>
				<th rowspan="2">Mã loại hình</th>
				<th rowspan="2">Ngày tháng năm đăng ký</th>
				<th colspan="2">Số lượng</th>
				<th colspan="2">Trị giá khai báo USD</th>
				<th colspan="2">Trị giá tính thuế USD</th>
				<th colspan="2">Nước xuất khẩu</th>
				<th colspan="2">Nước xuất xứ</th>
				<th colspan="2">Đơn vị tính</th>
				<th colspan="2">Mã số hàng hóa</th>
				<th colspan="2">Mô tả hàng hóa</th>
				<th colspan="2">Ngày đăng ký</th>
			</tr>
			<tr>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
				<th>Giá trị cũ</th>
				<th>Giá trị mới</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="row in Scope.lstSuaDoiBoSung">
				<td ng-bind="row.so_tk"></td>
				<td ng-bind="row.so_tt"></td>
				<td ng-bind="row.ma_hq	"></td>
				<td ng-bind="row.ma_lh"></td>
				<td ng-bind="row.ngay_dk" align="center"></td>
				<td ng-bind="row.soluong_cu" align="right"></td>
				<td ng-bind="row.soluong_moi" align="right"></td>
				<td ng-bind="row.trigiakb_cu" align="right"></td>
				<td ng-bind="row.trigiakb_moi" align="right"></td>
				<td ng-bind="row.trigiatt_cu" align="right"></td>
				<td ng-bind="row.trigiatt_moi" align="right"></td>
				<td ng-bind="row.nuocxk_cu" align="center"></td>
				<td ng-bind="row.nuocxk_moi" align="center"></td>
				<td ng-bind="row.nuocxx_cu" align="center"></td>
				<td ng-bind="row.nuocxx_moi" align="center"></td>
				<td ng-bind="row.dvt_cu" align="center"></td>
				<td ng-bind="row.dvt_moi" align="center"></td>
				<td ng-bind="row.mahs_cu" align="center"></td>
				<td ng-bind="row.mahs_moi" align="center"></td>
				<td ng-bind="row.mota_cu" align="center"></td>
				<td ng-bind="row.mota_moi" align="center"></td>
				<td ng-bind="row.ngaydk_cu" align="center"></td>
				<td ng-bind="row.ngaydk_moi" align="center"></td>
				
			</tr>
		</tbody>
	</table>
</div>
<div class="form-group row form-btn-align" align="center">
	<button type="submit" id="btnKetXuat" ng-click="Scope.KetXuat()"
		class="btn btn-primary" style="width: 100px;">
		<i class="glyphicon icon-white"></i>Kết xuất
	</button>
	<button type="button" id="btnIn" class="btn btn-primary"
		ng-click="Scope.In()" style="width: 100px;">
		<i class="glyphicon icon-white"></i>In
	</button>
</div>
</div>
</br>
<br />
<br />
<!-- <div class="form-group row form-btn-align" align="center">
	<div class="row">
		<div></div>
		<div></div>

	</div>
</div> -->
<!-- </div> -->

