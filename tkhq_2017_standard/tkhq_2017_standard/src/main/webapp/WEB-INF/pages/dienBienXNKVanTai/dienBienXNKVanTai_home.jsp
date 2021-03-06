<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<title>Phân tích dữ liệu tổng hợp sử dụng bảng biểu</title>
<!-- </head> -->


	<style type="text/css">
form.tab-form-demo .tab-pane {
	margin: 20px 20px;
}
</style>
<div ng-app="myApp" class="content-wrapper">
	<div ng-controller="TabsDemoCtrl" >
	<section class="content-header panel panel-success">
	<h5 class="title">Hiển thị và cảnh báo bất thường của diễn biến về trị giá xuất nhập khẩu theo phương thức vận tải</h5>
	</section>
	<section class="content">
		<form name="outerForm" class="tab-form-demo">
			<uib-tabset active="activeForm"> 
				<uib-tab index="1"
					heading="Xuất khẩu" select="tabSelected1()">  </uib-tab> 
				<uib-tab index="2"
					heading="Nhập khẩu" select="tabSelected2()"> </uib-tab> 
				<uib-tab index="3"
					heading="Xuất nhập khẩu" select="tabSelected3()"> </uib-tab>				
			</uib-tabset>
		</form>

		<div class="messageArea"></div>
		<div class="messageErrorArea"></div>
		<%@ include file="dienBienXNKVanTai.jsp"%>

	</div>
</div>


