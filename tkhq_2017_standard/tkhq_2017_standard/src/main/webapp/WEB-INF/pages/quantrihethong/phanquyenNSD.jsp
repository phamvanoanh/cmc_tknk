<%@page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link href="<c:url value='/static/css/tree.css' />" rel="stylesheet"
	type="text/css">
<script src="<c:url value='/static/js/service/phanquyenService.js' />"></script>
<script
	src="<c:url value='/static/js/controller/phanquyen_Controller.js' />"></script>
<div ng-app="myApp" ng-controller="PhanQuyen_Controller as ctrl"
	class="content-wrapper" style="min-height: 550px !important;">
	<section class="content-header">
		<h3 class="title">Phân quyền người sử dụng</h3>
	</section>
	<section class="content">
		<div class="modal-body">
			<div class="container-fluid">
				<div class="col-md-12" style="margin: 0">
					<div class="col-md-4">
						<label class="col-md-4">Loại</label> <select class="form-control "
							ng-options="type as type.label for type in ctrl.lstType"
							ng-change="ctrl.changeType()" ng-model="Type">
						</select>
					</div>
					<div ng-hide="ctrl.hideNNSD">
						<div class="col-md-4">
							<label>Mã nhóm</label> <select class="form-control "
								ng-options="group as group.groupId for group in ctrl.lstNhomNSD "
								ng-model="Group" ng-change="ctrl.changeGroup()">
							</select>
						</div>
						<div class="col-md-4">
							<label>Tên nhóm</label> <select class="form-control "
								ng-options="group as group.groupCode for group in ctrl.lstNhomNSD "
								ng-model="Group" ng-change="ctrl.changeGroup()">
							</select>
						</div>
					</div>
					<div ng-hide="ctrl.hideNSD">
						<div class="col-md-4">
							<label>Tên Đăng nhập</label> <select class="form-control "
								ng-options="item as item.userName for item in ctrl.lstNSD "
								ng-model="User" ng-change="ctrl.changeUser()"><option></option>
							</select>
						</div>
						<div class="col-md-4">
							<label>Tên đầy đủ</label> <input class="form-control"
								value="{{tenUser}}" disabled />
						</div>
					</div>
				</div>
				<br />
				<div class="col-md-12" class="content"
					style="border: 1px solid currentColor; margin-top: 10px;margin-left: 10px; background-color: white; height: 400px; width: 100%; overflow-x: hidden; overflow-y: auto; padding: 5px ;">
					<ul class="tree">
						<li
							ng-repeat="role in ctrl.lstRole | filter : {parentId : 0} :true | orderBy :functionId">
							<input ng-click='ctrl.selectCheckbox(role.functionId)'
							name='{{role.functionId}}' id='{{role.functionId}}'
							ng-checked="role.checked" type="checkbox"
							ng-value="role.functionName" /> <label>{{role.functionName}}</label>
							<ul>
								<li
									ng-repeat="role1 in ctrl.lstRole | filter : {parentId : role.functionId} :true | orderBy :functionId">
									<input ng-checked="role1.checked"
									ng-click='ctrl.selectCheckbox(role1.functionId)'
									name='{{role1.functionId}}' id='{{role1.functionId}}'
									type="checkbox" />{{role1.functionName}}
									<ul>
										<li
											ng-repeat="role2 in ctrl.lstRole | filter : {parentId : role1.functionId} :true | orderBy :functionId">
											<input ng-checked="role2.checked"
											ng-click='ctrl.selectCheckbox(role2.functionId)'
											name='{{role2.functionId}}' id='{{role2.functionId}}'
											type="checkbox" />{{role2.functionName}}
									</ul>
							</ul>
						</li>
					</ul>
				</div>
				<br />
				<div class="col-md-12" align="center"
					style="margin-top: 5px; margin-bottom: 10px">
					<button type="button" id="btnUpdate"
						ng-click="ctrl.updatePermission()" class="btn btn-primary">Cập
						nhập</button>
				</div>
			</div>

		</div>
	</section>
</div>
