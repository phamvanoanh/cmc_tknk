<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:url value='/static/js/controller/danhsachcongviecController.js'/>"></script>
<script src="<c:url value='/static/js/service/danhsachcongviecService.js'/>"></script>

<div ng-app="myApp" class="content-wrapper" ng-controller="danhsachcongviecController">
	<section class="content-header">
		<h3 class="title">
			<span style="vertical-align: middle;">DANH SÁCH CÔNG VIỆC</span>
		</h3>
	</section>
	<section class="content">
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Nội dung</th>
						<th>Hàng hóa</th>
						<th>Mã hải quan</th>
						<th>Mã loại hình</th>
						<th>Số TK VNACCS</th>
						<th>Năm</th>
						<th>Tháng</th>
						<th>Trạng Thái</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="cv in listCongviec" align="center">
						<td align="left">{{cv.lydo_nghingo}}</td>
						<td align="left">{{cv.ten_hang}}</td>
						<td>{{cv.ma_hq}}</td>
						<td>{{cv.ma_lh}}</td>
						<td>{{cv.so_tk_vnacss}}</td> 
						<td>{{cv.namdk}}</td>
						<td>{{cv.sttthang}}</td>
						<td align="left">{{cv.trang_thai}}</td> 
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</div>