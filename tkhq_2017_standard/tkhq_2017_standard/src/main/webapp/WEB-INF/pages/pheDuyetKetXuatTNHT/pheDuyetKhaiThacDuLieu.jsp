<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:url value='/static/js/controller/tbd_KetXuatTNHTController.js'/>"></script>
<script src="<c:url value='/static/js/service/KetXuatTNHTService.js'/>"></script>
<div ng-app="myApp" class="content-wrapper" ng-controller="ketXuatTNHTController" ng-cloak>
	<section class="content-header panel panel-success">
		<h5 class="title">Phê duyệt và quản lý khai thác dữ liệu</h5>
	</section>
	<section class="content">
		<div class="box-search" style="margin-top: 20px;">
			 <div class="container-fluid">
				<form class="form-search" style="text-align:center;">
					<div class="col-md-5 mab10">
						<label class ="col-sm-3 pa0">Từ Ngày</label>
						<div class="col-sm-5 pa0">
			  				<input type="text" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="tuNgay"
			  					is-open="popup1.opened" datepicker-options="DayOptions" close-text="Close" ng-click="open1()"/>
			  					<i class="fa fa-calendar form-control-feedback" ng-click="open1()" style="top:3px;"></i>
						</div>
					</div>
					
					<div class="col-md-5 mab10">
						<label class ="col-sm-3 pa0">Đến Ngày</label>
						<div class="col-sm-5 pa0">
			  				<input type="text" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="denNgay"
			  					is-open="popup2.opened" datepicker-options="DayOptions" close-text="Close" ng-click="open2()"/>
			  					<i class="fa fa-calendar form-control-feedback" ng-click="open2()" style="top:3px;"></i>
						</div>
					</div>
					<div class="col-md-2" style="width: 111px;height: 27px;">
						<button type="button" class="btn btn-primary" ng-click="doSearch()">Lọc dữ liệu</button>
					</div>
				</form>
			</div>
		</div>
		<div class="" style="margin-top: 20px;">
			<div class="col-md-12">
				<h4 class="col-md-4" style="font-family: inherit;">Tổng số {{listData.length}} bản ghi</h4>
			</div>
			<table class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>STT</th>
						<th>Công Chức</th>
						<th>Mô Tả</th>
						<th>File kết xuất</th>
						<th>Ngày kết xuất</th>
						<th>Lý do kết xuất</th>
						<th>Trạng Thái</th>
						<th>Chọn</th>
					</tr>
				</thead>
				 <tbody >
					<tr ng-repeat="data in phantrang">
						<td align="center">{{(currentPage - 1) * numPerPage + ($index + 1)}}</td>
						<td>{{data.userKetXuat}}</td>
						<td class="col-md-3">
							<span>- Cục Hải quan :</span>{{data.tenHaiQuan}}<br>
							<span>- Mặt hàng :</span>{{data.tenHang}}<br>
							<span>- Nguồn số liệu : {{data.nguonSLKetXuat}}</span><br>
							<span>- Loại dữ liệu : {{data.loaiDuLieuKetXuat}}</span><br>
							<span>- Loại hàng hóa kết xuất :{{data.loaiHangHoaKetXuat}}</span><br>
							<span>- Tên loại hình doanh nghiệp : {{data.tenLoaiHinhDN}}</span><br>
							<span>- Tên tỉnh/Tp : {{data.tenTinhTP}}</span><br>
							<span>- Tên đơn vị : {{data.tenDonVi}}</span><br>
							<span>- Danh sách nước: {{data.dsNuoc}}</span><br>
							<span>- Loại hàng hóa kết xuất : {{data.loaiHangHoaKetXuat}}</span><br>
							<span>- Kiểu kết xuất : {{data.kieuKetXuat}}</span><br>
							<span>- Thời gian kết xuất : {{data.tuNgayKetXuat | date:'dd/MM/yyyy'}} - {{data.denNgayKetXuat | date:'dd/MM/yyyy'}}</span><br>
							<span>- Người phê duyệt : {{data.userPheDuyet}}</span><br>
							<span>- Ngày phê duyệt : {{data.ngayPheDuyet | date:'dd/MM/yyyy'}}</span><br>
							<span>- Các chỉ tiêu kết xuất : {{data.dsChiTieuKetXuat}}</span><br>
						</td>
						<td>{{data.fileName}}</td>
						<td class="col-md-2" style="text-align: center;">{{data.ngayKetXuat | date:'dd/MM/yyyy'}}</td> 
						<td class="col-md-3">{{data.lyDoKetXuat}}</td>
						<td >{{data.trangThaiPheDuyet}}</td>
						<td align="center"><input type="checkbox" ng-model="data.isChecked"></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-md-12">
			<div class="col-md-2" style="margin-top: 25px;">Trang {{currentPage}} / {{totalPage}}</div>
			<div class="col-md-6">
				<pagination total-items="listData.length"
					ng-change="pageChanged(currentPage)" ng-model="currentPage"
					max-size="maxSize" class="pagination" boundary-links="true"
					rotate="false"></pagination>
			</div>
		</div>
		<div class="form-group row form-btn-align" align="center">
				<button type="button" class="btn btn-primary" ng-click="pheDuyet(1)">Phê duyệt</button>

				<button type="button" class="btn btn-primary" ng-click="pheDuyet(0)">Không phê duyệt</button>

				<button type="button" class="btn btn-primary" ng-disabled="isDisabled" ng-click="doExport(1)">Kết xuất</button>

				<button type="button" class="btn btn-primary"  ng-disabled="isDisabled" ng-click="doExport(0)">In</button>
		</div> 
		<div style="width: 100%;" ng-show="showReport" class="row showReport">
			<button type="button" style="float: right; margin: 10px 4px;" class="btn btn-info" ng-click="hideReport()">Hủy bỏ</button>
			<iframe id="frReport" ng-src="{{srcReport}}" class="" style="display: block; width: 100%; height: 600px;"></iframe>
		</div>	<!-- end report -->
	</section>
</div>
