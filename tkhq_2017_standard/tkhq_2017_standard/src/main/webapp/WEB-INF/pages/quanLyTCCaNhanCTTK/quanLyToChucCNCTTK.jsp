

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:url value='/static/js/controller/quanLyToChucCNCTTKController.js'/>"></script>
<script src="<c:url value='/static/js/service/quanLyToChucCNCTTKService.js'/>"></script>
<script src="<c:url value='/static/js/service/tbd_sys_groupsService.js'/>"></script>

<style>
	td.col-md-5 {
	    padding-top: .3em;
	    padding-bottom: .3em;
	}
	label.col-md-5 {
    	text-align: left;
	}
</style>

<div ng-app="myApp" class="content-wrapper" ng-controller="quanLyToChucCNCTTKController">
	<fieldset class="form-group form-wrapper" >
	<section class="content-header panel panel-success">
		<h5 class="title">Quản lý tổ chức cá nhân làm công tác thống kê</h5>
	</section>
	<section class="content">
		<div class="box-search" style="margin-top: 20px;">
			<div class="container-fluid">
				<form class="form-search">
					<table style="margin-top:12px;width:900px">
						<tr>
							<td class="col-md-5">
								<label class="col-md-5">Nhóm NSD</label>
								<div class="col-md-7">
									<select class="form-control" ng-model="nhom.groupId">
										<option value="0">Tất cả</option>
										<option ng-repeat="nhom in listNhomNguoiSD" value="{{nhom.groupId}}">{{nhom.groupCode}}</option>
									</select>
								</div>
							</td>
							<td class="col-md-5">
								<label class="col-md-5">Trạng thái</label>
								<div class="col-md-7">
									<select class="form-control" ng-model="trangThai">
											<option value="2">Tất cả</option>
											<option value="1">Đang hoạt động</option>
											<option value="0">Ngừng hoạt động</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<td class="col-md-5">
								<label class="col-md-5">Tổng cục, Cục</label>
								<div class="col-md-7">
									<select class="form-control" ng-model="cuc.ma" ng-change="selectTongCuc(cuc.ma)">
										<option ng-repeat="cuc in listTongCuc" value="{{cuc.ma}}">{{cuc.ten}}</option>
									</select>
								</div>
							</td>
							<td class="col-md-5">
								<label class="col-md-5">Chi cục</label>
								<div class="col-md-7">
									<select class="form-control" ng-model="chiCucId">
											<option value=""></option>
											<option ng-repeat="chiCuc in listChiCuc" value="{{chiCuc.ma}}">{{chiCuc.ten}}</option>
									</select>
								</div>
							</td>
						</tr>
					</table>
					<br>
					<div class="traCuBtn" style="margin-left: 471px;">
						<button class="btn btn-primary" ng-click="doSearch()">Tra cứu</button>
					</div>
				</form>
			</div>
		</div>
			<div class="box-body" ng-if="listPerson.length > 0">
				<table class="table table-bordered table-striped">
					<thead>
						<tr>
							<th>STT</th>
							<th>Tên đăng nhập</th>
							<th>Tên đầy đủ</th>
							<th>Mã hải quan</th>
							<th>Đơn vị</th>
							<th>Nhóm</th>
							<th>Trạng thái</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="person in listPerson">
							<td style="text-align:center">{{$index + 1}}</td>
							<td align="left">{{person.tenDangNhap}}</td>
							<td align="left">{{person.tenDayDu}}</td>
							<td align="left">{{person.maHaiQuan}}</td>
							<td align="left">{{person.tenDonvi}}</td> 
							<td align="left">{{person.nhom}}</td>
							<td style="text-align:left">{{person.trangThai}}</td>
						</tr>
					</tbody>
				</table>
				<div class="tableBtn" style="text-align: center;margin-top: 10px;">
					<button class="btn btn-primary" ng-disabled="isExport" ng-click="doExport(1)" style="margin-left: 22px">Kết xuất</button>
					<button class="btn btn-primary inBtn" ng-disabled="isExport" ng-click="doExport(0)" style="width: 74px;">In</button>
				</div>
			</div>
			<div style="width: 100%;" ng-show="showReport" class="row showReport">
				<button type="button" style="float: right; margin: 10px 4px;" class="btn btn-info" ng-click="hideReport()">Hủy bỏ</button>
				<iframe id="frReport" ng-src="{{srcReport}}" class="" style="display: block; width: 100%; height: 600px;"></iframe>
			</div>
		</section>
	</fieldset>
</div>