<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="box-search mab10">
	<div class="container-fluid pa0">
		<div class="col-md-4">
			<label class="col-md-4 pa0">Cục Hải quan</label>
			<div class="col-md-6 pa0">
				<select name="cucHQSelect" class="form-control"
					ng-model="ctrl.cucHQSelected" ng-change="changeCucHQ()">
					<option value="">---Chọn---</option>
					<option ng-repeat="option in lstCucHQ" value="{{option.ma}}">{{option.ten}}</option>
				</select>
			</div>
		</div>
		<div class="col-md-4">
			<label class="col-md-4 pa0">Chi cục Hải quan</label>
			<div class="col-md-6 pa0">
				<select name="chiCucHQSelect" class="form-control"
					ng-model="ctrl.chiCucHQSelected">
					<option value="">---Chọn---</option>
					<option ng-repeat="option in lstChiCucHQ" value="{{option.ma}}">{{option.ten}}</option>
				</select>
			</div>
		</div>
		<div class="col-md-4">
			<label class="col-md-3 pa0">Mặt hàng</label>
			<div class="col-md-6 pa0">
				<select name="matHangSelect" class="form-control"
					ng-model="ctrl.matHangSelected">
					<option value="">---Chọn---</option>
					<option ng-repeat="option in lstMatHang" value="{{option.ma}}">{{option.ten}}</option>
				</select>
			</div>
		</div>
		<div class="col-md-4">
			<label class="col-md-4 pa0">Loại kỳ</label>
			<div class="col-md-6 pa0">
				<select name="loaiKySelect" class="form-control" ng-model="ctrl.loaiKySelected" ng-change="changeTG()">
					<option ng-repeat="option in lstLoaiKy" value="{{option.id}}">{{option.name}}</option>
				</select>
			</div>				
		</div>
		<div id="daySelect" ng-show="showDay">
			<div class="col-md-4">								
				<label class="col-md-4 pa0">Từ ngày</label>
				<div class="col-md-6 pa0">
					<input type="text" name="fromDate" class="form-control"
						uib-datepicker-popup="dd/MM/yyyy" ng-model="ctrl.fromDate"
						is-open="popup1.opened" datepicker-options="DayOptions"
						close-text="Đóng" ng-click="open1()"/>
						<i class="fa fa-calendar form-control-feedback" ng-click="open1()"
							style="top: 3px; right: -12px;"></i>
				</div>
			</div>
			<div class="col-md-4">
				<label class="col-md-3 pa0">Đến ngày</label>
				<div class="col-md-6 pa0">
					<input type="text" name="toDate" class="form-control"
						uib-datepicker-popup="dd/MM/yyyy" ng-model="ctrl.toDate"
						is-open="popup2.opened" datepicker-options="DayOptions"
						close-text="Đóng" ng-click="open2()"/>
						<i class="fa fa-calendar form-control-feedback" ng-click="open2()"
							style="top: 3px; right: -12px;"></i>
				</div>
			</div>
		</div>
		<div id="kySelect" ng-show="showKy">
			<div class="col-md-4">
				<label class="col-md-4 pa0">Kỳ</label>
				<div class="col-md-6 pa0">
					<select name="kySelect" class="form-control" ng-model="ctrl.kySelected">
						<option value="">---Chọn---</option>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</div>
			</div>
			<div class="col-md-4">
				<label class="col-md-3 pa0">Tháng</label>
				<div class="col-md-6 pa0">
					<select name="kyThangSelect" class="form-control" ng-model="ctrl.kyThangSelected">
						<option value="">---Chọn---</option>
						<option ng-repeat="option in lstMonth" value="{{option.id}}">{{option.name}}</option>
					</select>
				</div>
			</div>
			<div class="col-md-4">
				<label class="col-md-4 pa0">Năm</label>
				<div class="col-md-6 pa0">
					<select name="kyYearSelect" class="form-control" ng-model="ctrl.kyYearSelected">
						<option value="">---Chọn---</option>
						<option ng-repeat="option in lstYear" value="{{option.id}}">{{option.name}}</option>
					</select>
				</div>
			</div>
		</div>
		<div id="monthSelect" ng-show="showMonth" style="height: 30px;">
			<div class="col-md-4">
				<label class="col-md-4 pa0">Tháng</label>
				<div class="col-md-6 pa0">
					<input type="text" name="fromMonth" class="form-control"
						uib-datepicker-popup="MM/yyyy" ng-model="ctrl.fromMonth"
						is-open="popup3.opened"
						datepicker-options="{minMode: 'month'}"
						datepicker-mode="'month'" close-text="Đóng" ng-click="open3()"/>
						<i class="fa fa-calendar form-control-feedback" ng-click="open3()"
							style="top: 3px; right: -12px;"></i>
				</div>
			</div>
		</div>

		<div class="col-md-12" align="center">
			<button type="submit" id="btnSearchXK" ng-click="search()" class="btn btn-primary">
				Tìm kiếm
			</button>
		</div>
	</div>
</div>

<div class="table-scroll" ng-show="showDataTable" style="min-height: 50px;">
	<table id="tblTTXK" class="table table-bordered">
		<colgroup>
		</colgroup>
		<thead>
			<tr>
				<th>Mô tả hàng hóa</th>
				<th>Mã hàng</th>
				<th>Mã thống kê</th>
				<th>Nghi ngờ</th>
				<th>Is_TK</th>
				<th>SD</th>
				<th>ĐVT TK</th>
				<th>Đơn giá(USD)</th>
				<th>Đơn giá(VND)</th>
				<th>Lượng</th>
				<th>Lượng thống kê</th>
				<th>Trị giá(USD)</th>
				<th>Trị giá(VND)</th>
				<th>Trị giá thống kê(USD)</th>
				<th>Trị giá thống kê(VND)</th>
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
			<tr ng-repeat="row in lstTTBS">
				<td ng-bind="row.mo_ta"></td>
				<td ng-bind="row.ma_hang"></td>
				<td ng-bind="row.maTK"></td>
				<td><input type="checkbox" ng-bind="row.nghiNgo"></td>
				<td ng-bind="row.is_tk"></td>
				<td ng-bind="row.sd"></td>
				<td ng-bind="row.dvt_tk"></td>
				<td ng-bind="row.don_gia_usd"></td>
				<td ng-bind="row.don_gia_vnd"></td>
				<td ng-bind="row.luong"></td>
				<td ng-bind="row.luong_tk"></td>
				<td ng-bind="row.tri_gia_usd"></td>
				<td ng-bind="row.tri_gia_vnd"></td>
				<td ng-bind="row.tri_gia_tk_usd"></td>
				<td ng-bind="row.tri_gia_tk_vnd"></td>
				<td ng-bind="row.ma_dv"></td>
				<td ng-bind="row.ma_hq"></td>
				<td ng-bind="row.ma_lh"></td>
				<td ng-bind="row.so_tk"></td>
				<td ng-bind="row.thang"></td>
				<td ng-bind="row.ky"></td>
				<td ng-bind="row.nuoc_nk"></td>
				<td ng-bind="row.nuoc_xx"></td>
				<td ng-bind="row.ma_nt"></td>
				<td ng-bind="row.ngay_dk"></td>
				<td ng-bind="row.cang_nn"></td>
				<td ng-bind="row.ma_cuakhau_nk"></td>
				<td ng-bind="row.ten_cuakhau_nk"></td>
				<td ng-bind="row.ma_cuakhau_xk"></td>
				<td ng-bind="row.ten_cuakhau_xk"></td>
			</tr>
		</tbody>
	</table>
</div>
<div class="col-md-12" align="center" ng-show="showDataTable" style="margin-top: 10px;">
	<button type="button" id="btnExportXK" ng-click="doExport()" class="btn btn-primary" style="width: 100px;">
		Kết xuất
	</button>
	<button type="button" id="btnPrintXK" ng-click="doPrint()" class="btn btn-info" style="width: 100px;">
		In
	</button>
</div>