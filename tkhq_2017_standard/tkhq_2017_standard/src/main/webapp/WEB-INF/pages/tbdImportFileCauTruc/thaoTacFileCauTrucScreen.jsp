<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:url value='/static/js/controller/nhapMoiFileController.js'/>"></script>
<script src="<c:url value='/static/js/service/nhapMoiFileService.js'/>"></script>
<style>
	td.col-md-5 {
	    padding-top: .3em;
	    padding-bottom: .3em;
	}
</style>
<div ng-app="myApp" class="content-wrapper" ng-controller="nhapMoiFileController" ng-cloak>
	<section class="content-header panel panel-success">
		<h5 class="title">Nhập mới</h5>
	</section>
	<form class="form-search">
		<p ng-model="essayErrorMsg" id="chuDe"></p>
		<table style="margin-top:12px;width:900px">
			<tr>
				<td class="col-md-5">
					<label class="col-md-5">Tháng:</label>
					<div class="col-md-7">
						<select class="form-control" ng-model="thang">
							<option ng-repeat="thang in [1,2,3,4,5,6,7,8,9,10,11,12]">{{thang}}</option>
						</select>
					</div>
				</td>
				<td class="col-md-5">
					<label class="col-md-5">Năm:</label>
					<div class="form-group has-feedback col-md-7" style="margin-bottom: 0px">
						<input type="text" name="year" class="form-control date-picker" 
							uib-datepicker-popup="yyyy" ng-model="nam"
							is-open="popup3.opened" ng-click="open3()"
							datepicker-options="yearOptions" close-text="Close" required />
							<i class="fa fa-calendar form-control-feedback" ng-click="open3()" style="top:3px;"></i>
					</div>
				</td>
			</tr>
			<tr>
				<td class="col-md-5">
					<label class="col-md-5">Tên nước:</label>
					<div class="col-md-7">
						<select class="form-control" ng-model="tenQuocGia">
							<option ng-repeat="country in listCounty" value="{{country.tenNuoc}}">{{country.tenNuoc}}</option>
						</select>
					</div>
				</td>
			</tr>
			<tr>
				<td class="col-md-5">
					<label class="col-md-5">Lượng tháng:</label>
					<div class="col-md-7">
						 <input type="number" id="inputLuongThang" class="form-control" ng-model="luongThang" required="required" style="text-align: right;"/>
					</div>
				</td>
				<td class="col-md-5">
					<label class="col-md-5">Trị giá tháng</label>
					<div class="col-md-7">
						 <input type="number" id="inputTriGiaThang" class="form-control" ng-model="triGiaThang" required="required" style="text-align: right;"/>
					</div>
				</td>
			</tr>
			<tr>
				<td class="col-md-5">
					<label class="col-md-5">Lượng lũy kế:</label>
					<div class="col-md-7">
						 <input type="number" id="inputLuongLuyKe" class="form-control" ng-model="luongLuyKe" required="required" style="text-align: right;"/>
					</div>
				</td>
				<td class="col-md-5">
					<label class="col-md-5">Trị giá lũy kế:</label>
					<div class="col-md-7">
						 <input type="number" id="inputTriGiaLuyKe" class="form-control" ng-model="triGiaLuyKe" required="required"  style="text-align: right;"/>
					</div>
				</td>
			</tr>
		</table>
	</form>
	<div class="tableBtn" style="text-align: center;margin-top: 7px;">
			<button class="btn btn-primary" ng-click="insertThongTinNhapMoi()">Cập nhật</button>
			<button class="btn btn-primary xoa" ng-click="xoaThongTinNhapMoi()" style="width: 82px;">Xóa</button>
	</div>
	<div class="col-md-12">
		<h5 class="col-md-4" style="font-family: inherit;">Tổng số {{listNhapMoiFiles.length}} bản ghi</h5>
	</div>
	<table class="table table-bordered table-striped">
		<thead>
			<tr>
				<th>Tháng</th>
				<th>Năm</th>
				<th>Tên nước</th>
				<th>Lượng tháng</th>
				<th>Trị giá tháng</th>
				<th>Lượng lũy kế</th>
				<th>Trị giá lũy kế</th>
			</tr>
		</thead>
		<tbody >
			<tr ng-repeat="thongTinFile in phantrang | orderBy : '-nam'">
				<td align="right">{{thongTinFile.thang}}</td>
				<td align="right">{{thongTinFile.nam}}</td>
				<td class="col-md-2" align="left">{{thongTinFile.tenNuoc}}</td>
				<td align="right">{{thongTinFile.luongThang}}</td> 
				<td align="right">{{thongTinFile.triGiaThang}}</td>
				<td align="right">{{thongTinFile.luongLuyKe}}</td>
				<td align="right">{{thongTinFile.triGiaLuyKe}}</td>
			</tr>
		</tbody>
	</table>
	<div class="col-md-2" style="margin-top: 25px;">Trang {{currentPage}} / {{totalPage}}</div>
	<div class="col-md-6">
		<pagination total-items="listNhapMoiFiles.length"
			ng-change="pageChanged(currentPage)" ng-model="currentPage"
			max-size="maxSize" class="pagination" boundary-links="true"
			rotate="false"></pagination>
	</div>
</div>