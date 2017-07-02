<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style type="text/css">
.col-sm-4 span {
	color: red;
	font-size: xx-small;
}

.app-modal-window .modal-dialog {
	width: 800px;
}

.content-wrapper {
	margin-left: 0px;
	min-height: 100%;
}

td {
	padding-top: 5px
}

select {
	width: 150px;
}
</style>
<div class="" style="height: 100%;" >
	<section class="content-header panel panel-success"
		style="height: 50px;">
		<h2 class="title" style="font-size: 25px; padding: 2px"">{{Title}}</h2>
	</section>
	<section class="">
		<div class="modal-body">
			<form name="userForm" ng-submit="submitForm()" novalidate>
				<div class="col-md-12" style="margin: 5px">
					<label class="col-md-4">Tên viết tắt: </label>
					<div class="col-md-8">
						<input type="text" name="groupCode"
						ng-maxlength="48"
							ng-model="tbsSysGroupsCtrl.entity.groupCode" ng-pattern="/^[a-zA-Z0-9_]*$/" style="width: 100%" ng-required=true /> <span
							class="error" ng-show="userForm.groupCode.$error.required ">Vui lòng nhập tên nhóm viết tắt</span>
							<span class="error " ng-show="userForm.groupCode.$error.pattern">Tên viết tắt không được có ký tự đặc biệt</span>
					<span class="error" ng-show="userForm.groupCode.$error.maxlength">Tên viết tắt quá dài</span>
					</div>

				</div>

				<div class="col-md-12" style="margin: 5px">
					<label class="col-md-4">Tên đầy đủ: </label>
					<div class="col-md-8">
						<input type="text" name="txtgroupName" ng-maxlength="128" ng-pattern="/^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ0-9&._ ]*$/"
							ng-model="tbsSysGroupsCtrl.entity.groupName" required style="width: 100%"  ng-required=true />
							 <span class="error " ng-show="userForm.txtgroupName.$error.pattern">Tên đầy đủ không được có ký tự đặc biệt</span>
							 <span class="error" ng-show="userForm.txtgroupName.$error.required">Vui lòng nhập tên đầy đủ</span>
							 <span class="error" ng-show="userForm.txtgroupName.$error.maxlength">Tên đầy đủ quá dài</span>
					</div>
				</div>
				<div class="col-md-12" style="margin: 5px">
					<label class="col-md-4">Ghi chú: </label>
					<div class="col-md-8">
						<input type="text" name="txtdescription" ng-maxlength="128" maxlength="128"
							ng-model="tbsSysGroupsCtrl.entity.description" style="width: 100%" />
							
							 <span class="error" ng-show="userForm.txtdescription.$error.maxlength">Ký tự nhập vào quá dài.</span>
					</div>

				</div>
				<br />
				<div ng-hide="hideErrorMessage" class="col-md-12" style="margin: 5px">
					<h5 style="color: red">Tên viết tắt đã tồn tại. Vui lòng đặt tên viết tắt khác.</h5>>
				</div>
				<div class="form-group row form-btn-align" align="center">
					<button type="button" name="btnGhilai" class="btn btn-success"
						ng-click="AddNewGroup()" ng-disabled="userForm.$invalid">Ghi Lại</button>
					<button type="button" name="btnThoat" class="btn btn-danger"
						ng-click="cancel()">Đóng</button>
				</div>
			</form>
		</div>
	</section>
</div>

