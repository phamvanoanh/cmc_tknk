<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
.col-md-4{
	padding-right: 1px;
	padding-left: 5px; 
}
label {
	text-align: left !important;
}
</style>
<div ng-controller="hoanThanhRaXoatSanPhamThongKeDauRaController">
<fieldset class="form-group form-wrapper" style="font-family: inherit;">
		<div class="container-fluid">
			<form class="form-search" style="text-align:center;margin-top: 10px;">
				<div class="col-md-12">
					<div class="col-md-4">
						<label class="col-md-4">Tên Biểu:</label>
						<div class="col-md-8">
							<select class="form-control"
									ng-model="baoCao.maDanhMucBaoCao"
									ng-change="selectDanhMucBaoCao(baoCao.maDanhMucBaoCao)">
									<option ng-repeat="baoCao in listDanhMucBaoCao" value="{{baoCao.maDanhMucBaoCao}}">{{baoCao.tenDanhMucBaoCao}}</option>
							</select>
						</div>
					</div>
					
					<div class="col-md-4">
						<label class="col-md-4">Trạng Thái:</label>
						<div class="col-md-8">
							<select class="form-control" ng-model="trangThai" ng-disabled="isDisplayTrangThai">
								<option value="SB">Sơ Bộ</option>
								<option value="DC">Điều chỉnh</option>
								<option value="CT">Chính thức</option>
							</select>
						</div>
					</div>
					<div class="col-md-4">
						<label class="col-md-4">Công chức:</label>
						<div class="col-md-8">
							<select class="form-control" ng-model="tenCongChucQuanLy">
		 						<option ng-repeat="congChuc in listCongChucQuanLy" value="{{congChuc.tenCongChucQuanLy}}">{{congChuc.tenCongChucQuanLy}}</option>
		 					</select>
	 					</div>
					</div>
					<div class="col-md-4">
						<label class="col-md-4">Kỳ:</label>
						<div class="col-md-8" >
							<select class="form-control" ng-model="ky" ng-disabled="isDisplayKy">
								<option value="1">1</option>
								<option value="2">2</option>
							</select>
						</div>
					</div>
					<div class="col-md-4">
						<label class="col-md-4">Tháng:</label>
						<div class="col-md-8">
							<select class="form-control" ng-model="thang">
								<option ng-repeat="thang in [1,2,3,4,5,6,7,8,9,10,11,12]">{{thang}}</option>
							</select>
						</div>
					</div>
					<div class="col-md-4">
						<label class="col-md-4">Năm:</label>
						<div class="form-group has-feedback col-md-8" style="margin-bottom: 0px">
							<input type="text" name="year" class="form-control date-picker" 
								uib-datepicker-popup="yyyy" ng-model="year"
								is-open="popup3.opened" ng-click="open3()"
								datepicker-options="yearOptions" close-text="Close" required/>
							<i class="fa fa-calendar form-control-feedback" ng-click="open3()" style="top:3px;"></i>
						</div>
					</div>
					<div class="col-md-4">
						<label class="col-md-5" style="margin-left: -11px;">Thay đổi dữ liệu:</label>
						<div class="col-md-2">
							<input type="checkbox" value="" ng-model="isCheck" style="margin-left: -33px;"/>
	 					</div>
					</div>
				</div>
				<div class="col-md-12">
					<div class="col-md-5">
						<label class="col-md-3" style="margin-left: -18px;">Lý do:</label>
						<div class="col-md-9" style="width:835px;margin-left: 94px;">
							<textarea rows="3" cols="90" ng-disabled="!isCheck" ng-model="lyDo"  class="form-control" maxlength="100"></textarea>
						</div>
					</div>
				</div>
			</form>
		</div>
	<div class="row" style="margin-top:7px;" ng-show="isDisplay">
		<h4>Thông tin xử lý</h4>
		<table class="table table-bordered table-striped">
			<thead>
				<tr>
					<th>STT</th>
					<th>Tên đăng nhập</th>
					<th>Thời gian</th>
					<th>Trạng thái</th>
					<th>Lý do thay đổi dữ liệu</th>
<!-- 					<th>Lý do phê duyệt</th> -->
				</tr>
			</thead>
			<tbody >
				<tr ng-repeat="data in listThongTinXuLy | orderBy : '-ngayPheDuyet'">
					<td align="center">{{$index + 1}}</td>
					<td align="left">{{data.nguoiPheDuyet}}</td>
					<td align="left">{{data.ngayPheDuyet}}</td>
					<td align="left">{{data.pheDuyet}}</td>
					<td align="left">{{data.lyDoThayDoiDL}}</td>
<!-- 					<td align="left">{{data.lyDoPheDuyet}}</td> -->
				</tr>
			</tbody>
		</table>
	</div>
	<div class="row" style="text-align: center; margin-top: 7px;">
		<button type="button" class="btn btn-primary" ng-click="insertThongTin()">Hoàn thành ra soát</button>	
	</div>
</fieldset>
</div>
