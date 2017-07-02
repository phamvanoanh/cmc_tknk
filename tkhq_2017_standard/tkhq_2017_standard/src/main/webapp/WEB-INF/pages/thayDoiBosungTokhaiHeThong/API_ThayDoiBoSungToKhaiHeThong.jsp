<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

 <script src="<c:url value='/static/js/service/thayDoiBoSungToKhaiHeThongService.js' />"></script>
<script src="<c:url value='/static/js/controller/thayDoiBoSungToKhaiHeThongController.js' />"></script> 

<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

 <div class="generic-container1"
	ng-controller="thayDoiBoSungToKhaiHeThongController as heThongNNCtrl">
	<!-- <div ng-controller="thayDoiBoSungToKhaiHeThongController as heThongNNCtrl">  -->
	<!-- <div class="panel panel-success">
		<h3 class="panel-heading">Xem thay đổi do bổ sung tờ khai từ các hệ thống</h3>
	</div> -->
	<div class="container">
		<fieldset class="form-group form-wrapper">
			<legend class="form-wrapper">Thông tin tìm kiếm</legend>
			<form class="form-search">
				<table style="width: 100%">
					<tr>
						<td><label class="col-sm-3">Loại kỳ:</label>							
							<div class="col-sm-6">
								<select class="form-control"  ng-options="item as item.ten for item in heThongNNCtrl.lstLoaiKy" 
								ng-model="LoaiKy" ng-change="heThongNNCtrl.selectLoaiKy()"></select>
							</div></td>							
						<td><label class="col-sm-3">Kỳ:</label>
							<div class="col-sm-6">
								<select class="form-control"  ng-options="item for item in heThongNNCtrl.lstKy" 
								ng-model="Ky" ng-change="" ng-hide="heThongNNCtrl.hideKy"></select>
							</div></td>
						<td><label class="col-sm-3">Tháng:</label>
							<div class="col-sm-6">
								<select class="form-control"  ng-options="item for item in heThongNNCtrl.lstThang" 
								ng-model="Thang" ng-change=""></select>
							</div></td>
						<td><label class="col-sm-3">Năm:</label>
							<div class="col-sm-6">
								<p class="input-group">
							  		<input type="text" name="ngayHHL" class="form-control" uib-datepicker-popup="yyyy"  
							  			ng-model="heThongNNCtrl.year"
							  			is-open="popup2.opened" ng-click="open2()" 
							  			datepicker-options="dateOptions" close-text="Close"
							  			required/>
							  		<span class="input-group-btn">
						            	<button type="button" class="btn btn-default" ng-click="open2()"><i class="glyphicon glyphicon-calendar"></i></button>
						          	</span>
						          	<!-- <span ng-show="bieuThueForm.ngayHHL.$error.required">Ngày hết hiệu lực is required</span> -->
					          	</p>
							</div></td>
						
					</tr>									
				</table>
				</br>
				<table style="width: 100%">
					<tr>
						<td><label class="col-sm-3">Cục Hải quan:</label>
							<div class="col-sm-6">
								<select class="form-control"  ng-options="item as item.ten for item in heThongNNCtrl.lstCucHQ" 
								ng-model="CucHQ" ng-change="heThongNNCtrl.CucHQSelect(CucHQ)"></select>
							</div></td>
						<td><label class="col-sm-3">Chi cục Hải quan:</label>
							<div class="col-sm-6">
								<select class="form-control"  ng-options="item as item.ten for item in heThongNNCtrl.lstChiCucHQ" 
								ng-model="ChiCucHQ" ng-change=""></select>
							</div></td>
					</tr>
					<tr>
						<td><label class="col-sm-3">Mặt hàng:</label>
							<div class="col-sm-6">
								<select class="form-control"  ng-options="item as item.ten for item in heThongNNCtrl.lstMatHang" 
								ng-model="MatHang" ng-change=""></select>
							</div></td>
						<td></td>
					</tr>					
				</table>
				</br>
				<div class="form-group row form-btn-align" align="center">
					<button type="submit" id="btnSearch"
						ng-click="heThongNNCtrl.search(1, heThongNNCtrl.pageSize)" class="btn btn-success">
						<i class="glyphicon glyphicon-search icon-white"></i>Tìm kiếm
					</button>
					<button type="button" id="addRow" class="btn btn-success"
						ng-click="addRow()">
						<i class="glyphicon glyphicon-plus icon-white"></i>Thêm mới
					</button>					
					<button type="button" id="btnDel" class="btn btn-danger"
						ng-click="heThongNNCtrl.remove()">
						<i class="glyphicon glyphicon-remove icon-white"></i>Xóa
					</button>
				</div>
			</form>
		</fieldset>
	</div>
	<div class="row">
			<div>Total: {{heThongNNCtrl.totalItems}}</div>
			<div>
	<!-- <pagination total-items="cuaKhauNNCtrl.totalItems" ng-change="pageChanged()" 
	ng-model="cuaKhauNNCtrl.currentPage" max-size="cuaKhauNNCtrl.maxSize" class="pagination" 
	boundary-links="true" rotate="false"></pagination> -->
	
	<ul uib-pagination total-items="heThongNNCtrl.totalItems" ng-model="heThongNNCtrl.currentPage" max-size="heThongNNCtrl.maxSize" 
					ng-change="pageChanged()" class="pagination-sm" boundary-link-numbers="true" rotate="false"></ul>
	</div>
		</div>
		<div style="width:96%; overflow-x: scroll;">
	<table id="tblHethong" class="table table-bordered table-responsive">		 
		<thead>
			<tr>
				<!-- <th><input type="checkbox" ng-model="heThongNNCtrl.checkAll"></th> -->
				<!--<th>STT</th> -->
				<th>Mô tả hàng hóa</th>
				<th>Mã hàng</th>
				<th>Mã thống kê</th>
				<th>Nghi ngờ</th>
				<th>Is_tk</th>
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
				<th>Ngày đăng kí</th>
				<th>Cảng nước ngoài</th>
				<th>Mã cửa khẩu nhập</th>
				<th>Tên cửa khẩu nhập</th>
				<th>Mã cửa khẩu xuất</th>
				<th>Tên cửa khẩu xuất</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="row in heThongNNCtrl.lstCuaKhauNN">
				<td ng-bind="row.mo_ta"></td>
				<td ng-bind="row.ma_hang"></td>
				<td ng-bind="row.ma_tk"></td>
				<td><input type="checkbox" ng-checked="heThongNNCtrl.checkAll"
					ng-model="row.isChecked"></td>				
				<td ng-bind="row.is_tk"></td>
				<td ng-bind="row.sd"></td>
				<td ng-bind="row.dvt_tk"></td>
				<td ng-bind="row.don_gia_usd"></td>
				<td ng-bind="row.don_gia_vnd"></td>
				<td ng-bind="row.luong"></td>
				<td ng-bind="row.luong_tk"></td>
				<td ng-bind="row.tri_gia_usd"></td>
				<td ng-bind="row.tri_gia_vnd"></td>
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
				
				<!-- <td>
					<button type="button" ng-click="heThongNNCtrl.editRow(row.maCang)"
						class="btn btn-success custom-width">Edit</button>
				</td> -->
			</tr>
		</tbody>
	</table>
	</div>
	<div class="row">
			<div></div>
			<div>
	<pagination total-items="heThongNNCtrl.totalItems" ng-change="pageChanged()" ng-model="heThongNNCtrl.currentPage" max-size="heThongNNCtrl.maxSize" class="pagination" boundary-links="true" rotate="false"></pagination>
	</div>
		</div>	
	
</div>