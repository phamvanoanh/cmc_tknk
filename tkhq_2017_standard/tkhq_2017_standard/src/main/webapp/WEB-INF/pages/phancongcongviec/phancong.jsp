<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="<c:url value='/static/js/service/PhancongService.js' />"></script>
<script src="<c:url value='/static/js/controller/PhancongController.js' />"></script>
<script src="<c:url value='/static/js/service/quanLyToChucCNCTTKService.js'/>"></script>

<div ng-app="myApp" ng-controller="PhanCong_Controller"
	class="content-wrapper" ng-cloak>
	
	<section class="content-header">
		<h3 class="title">PHÂN CÔNG CÔNG VIỆC</h3>
	</section>
	<section class="content">
		<div class="modal-body" style="padding: 6px !important;">
		<form class="form-search">
			<div class="row" style="margin-top: 10px;">
				<div class="col-md-5">
					<label class="col-md-4">Tên công việc :</label> 
					<div class="col-md-8">
						<select class="form-control" ng-model="congviec.maCv" ng-change="changeCongViec(congviec.maCv)">
							<option value="{{congviec.maCv}}" >{{congviec.tenCv}}</option>
							<option ng-repeat="congviec in lstCongViec" value="{{congviec.maCv}}" >{{congviec.tenCv}}</option>
						</select>
					</div>
				</div>
			</div>
		</form>
		<div class="box-body">
			<div ng-if="isDisplayType1" id="example" class="row">
				<%@ include file="phanCongCVType1.jsp"%>
			</div>
			<div ng-if="isDisplayType2" class="type2" style="margin-top: 27px;">
				<form name="outerForm" class="tab-form-demo">
					<uib-tabset active="activeForm"> 
						<uib-tab index="1" heading="Xuất khẩu" select="tabSelected1('X')"></uib-tab>
						<uib-tab index="2" heading="Nhập khẩu" select="tabSelected2('N')"></uib-tab>
						<uib-tab index="3" heading="Xuất nhập khẩu" select="tabSelected3('XN')"></uib-tab>
						<uib-tab index="4" heading="Khác" select="tabSelected4('K')"></uib-tab>
					 </uib-tabset>
				</form>
				<%@ include file="phanCongCVType2.jsp"%>
			</div>
			<div ng-if="isDisplayType3" class="type3" style="margin-top: 27px;"> 
				<form name="outerForm" class="tab-form-demo">
					<uib-tabset active="activeForm"> 
						<uib-tab index="1" heading="Xuất khẩu" select="tabSelected1('X')"></uib-tab>
						<uib-tab index="2" heading="Nhập khẩu" select="tabSelected2('N')"></uib-tab>
					 </uib-tabset>
				</form>
				<%@ include file="phanCongCVType3.jsp"%>
			</div>
		</div>
		<div class="row hoanthanhArea" style="margin-top: 21px;text-align: center;">
			<button type="button" class="btn btn-primary createBtn" ng-click="doOpenCreate(2)">Thêm mới</button>	
			<button type="button" class="btn btn-primary ketXuatBtn" ng-click="doExport(1)">Kết xuất</button>	
		</div>
		<div style="width: 100%;" ng-show="showReport" class="row showReport">
			<button type="button" style="float: right; margin: 10px 4px;" class="btn btn-info" ng-click="hideReport()">Hủy bỏ</button>
			<iframe id="frReport" ng-src="{{srcReport}}" class="" style="display: block; width: 100%; height: 600px;"></iframe>
		</div>	<!-- end report -->
		</div>
	</section>
</div>