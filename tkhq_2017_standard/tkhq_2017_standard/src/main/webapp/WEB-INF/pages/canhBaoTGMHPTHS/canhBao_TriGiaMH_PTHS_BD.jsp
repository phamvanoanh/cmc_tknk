<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:url value='/static/js/service/canhBao_TriGiaMH_PTHS_XNKService.js' />"></script>
<script src="<c:url value='/static/js/controller/canhBao_TriGiaMH_PTHS_BDController.js' />"></script>
<script src="<c:url value='/static/js/controller/PhanHoiQuyTrinhXLDLController.js' />"></script>
<script src="<c:url value='/static/js/service/PhanHoiQuyTrinhXLDLService.js' />"></script>

<div ng-app="myApp" class="content-wrapper">
	<section class="content-header">
		<h3 class="title">Diễn biến và xu thế trị giá mặt hàng theo phân tổ HS 02, 04 số XNK</h3>
	</section>
	<section class="content">
		<div class="modal-body" ng-controller="CanhBao_TriGia_MH_PTHS_BDController as ctrl">
			<div id ="messageArea" class="messageArea"></div>
			<div id="messageErrorArea" class="messageErrorArea" ng-model="showError"></div>
			<uib-tabset active="tabActiveIndex">
				<uib-tab index="0" heading="Xuất khẩu" select="changeTab(0)">
				</uib-tab>
				<uib-tab index="1" heading="Nhập khẩu" select="changeTab(1)">
				</uib-tab>
				<uib-tab index="2" heading="Xuất nhập khẩu" select="changeTab(2)">
				</uib-tab>
			</uib-tabset>
			
			<div class="">
				<%@ include file="canhBao_TriGiaMH_PTHS_BD_tab.jsp"%>
			</div>
		</div>
	</section>
	
	<div ng-controller="PhanHoiQuyTrinhXLDLController">
		<%@ include file="../PhanHoiQuyTrinhXLDL/PhanHoiQuyTrinhXLDL.jsp"%>
	</div>
</div>