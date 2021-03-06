<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<script src="<c:url value='/static/js/function-common.js' />"></script>
	<script src="<c:url value='/static/js/service/ThayDoiDoNVHQService.js' />"></script>
	<script src="<c:url value='/static/js/controller/ThayDoiDoNVHQController.js' />"></script>
	<div ng-app="myApp" class="content-wrapper">
		<div ng-controller="ThayDoiDoNVHQController as Scope">
			<form ng-hide="Scope.showReport">
				<!-- <div class="panel panel-success"> -->
				<section class="content-header panel panel-success">
					<h5 class="title">Phân tích thay đổi do nghiệp vụ Hải quan</h5>
				</section>
				<section class="content">
				<!-- </div>		 -->		
				
				<uib-tabset active="activeForm"
					style="height: 42px !important;border: 0 !important;">
				<uib-tab index="1" heading="Xuất khẩu" select="Scope.tabSelected1()">
				<div class="messageArea"></div>
				<div class="messageErrorArea"></div>
				</uib-tab> <uib-tab
					index="2" heading="Nhập khẩu" select="Scope.tabSelected2()">
				<div class="messageArea"></div>
				<div class="messageErrorArea"></div>
				 </uib-tab></uib-tabset> 
				 <%@ include file="thayDoiDoNVHQ.jsp"%>
				</section>

			</form>
			<div style="width: 100%;" ng-show="Scope.showReport">
				<button type="button" style="float: right; margin: 10px 4px;"
					class="btn btn-info" ng-click="Scope.hideReport();">Hủy bỏ</button>
				<iframe id="frReport" src="{{Scope.srcReport}}" class=""
					style="display: block; width: 100%; height: 600px;"></iframe>
			</div>
		</div>
	</div>
