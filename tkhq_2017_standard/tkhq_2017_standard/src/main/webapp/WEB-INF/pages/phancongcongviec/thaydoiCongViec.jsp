<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>

.table-bordered>tbody>tr>td {
	white-space: nowrap;
}

/* .app-modal-window .modal-dialog { */
/* 	width: 800px !important; */
/* } */
	
#tenCv {
	width: 607px;
}

td {
	padding-top: 5px
}

select {
	width: 150px;
}
</style>

	<div style="background-color: #ecf0f5;">
		<section class="content-header panel panel-success"
			style="height: 50px;">
			<h2 class="title" style="font-size: 25px; padding: 2px;">{{title}}</h2>
		</section>
		<section class="content">
			<div class="modal-body">
				<form name="congviecFrm" ng-submit="submitForm()" novalidate>
					<fieldset class="form-group form-wrapper">
						<div class="form-search">
							<div class="container-fluid">
								<div class="col-md-12" style="margin-bottom: 10px;">
									<div class="col-md-6">
										<label class="col-md-5">Tên công việc: </label>
										<div class="col-md-7">
											<input type="text" class="form-control" ng-model="tenCv" readonly="readonly" id="tenCv"/>
										</div>
									</div>
								</div>
								<div class="col-md-12" style="margin-bottom: 10px;">
									<div class="col-md-6" >
										<label class="col-md-5">Mặt hàng</label>
										<div class="col-md-7">
											<input type="text" id="type1" class="form-control" ng-disabled="type2"
												ng-model="matHang">
										</div>
									</div> 
									<div class="col-md-6">
										<label class="col-md-5">Tên cục:</label>
										<div class="col-md-7">
											<select class="form-control" ng-model="donVi.ma"
												ng-change="chageListUserByMaHq(donVi.ma)" ng-disabled="type1">
												<option ng-repeat="donVi in listDonVi" value="{{donVi.ma}}">{{donVi.ten}}</option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-md-12" style="margin-bottom: 10px;">
									<div class="col-md-6">
										<label class="col-md-5">Từ ngày:</label>
										<div class="col-md-7">
											<input type="text" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="tuNgay"
							  					is-open="popup1.opened" datepicker-options="DayOptions" close-text="Close" ng-click="open1()"/>
							  					<i class="fa fa-calendar form-control-feedback" ng-click="open1()" style="top:3px;"></i>
										</div>
									</div>
									<div class="col-md-6">
										<label class="col-md-5">Đến ngày:</label>
										<div class="col-md-7">
											<input type="text" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="denNgay"
								  					is-open="popup2.opened" datepicker-options="DayOptions" close-text="Close" ng-click="open2()"/>
								  				<i class="fa fa-calendar form-control-feedback" ng-click="open2()" style="top:3px;"></i>
										</div>
									</div>
								</div>
								<div class="col-md-12" style="margin-bottom: 10px;">
									<div class="col-md-6">
										<label class="col-md-5">Tên đăng nhập1:</label>
										<div class="col-md-7">
											<select class="form-control" ng-model="user.userId"
												ng-change="changeUserName1(user.userId)">
												<option ng-value="{{user.userId}}" selected="selected">{{user.userName}}</option>
												<option ng-repeat="user in listUserNamesOfTongCuc"
													value="{{user.userId}}">{{user.userName}}</option>
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<label class="col-md-5">Tên đầy đủ1:</label>
										<div class="col-md-7">
											<input type="text" class="form-control"
												ng-model="fullNamePa1" readonly="readonly">
										</div>
									</div>
								</div>
								<div class="col-md-12" style="margin-bottom: 10px;">
									<div class="col-md-6">
										<label class="col-md-5">Tên đăng nhập2:</label>
										<div class="col-md-7">
											<select class="form-control" ng-model="user2.userId"
												ng-change="changeUserName2(user2.userId)">
												<option ng-value="{{user2.userId}}" selected="selected">{{user2.userName}}</option>
												<option ng-repeat="user2 in listUserNamesOfTongCuc"
													value="{{user2.userId}}">{{user2.userName}}</option>
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<label class="col-md-5">Tên đầy đủ2:</label>
										<div class="col-md-7">
											<input type="text" class="form-control"
												ng-model="fullNamePa2" readonly="readonly">
										</div>
									</div>
								</div>
								<div class="col-md-12" style="margin-bottom: 10px;">
									<div class="col-md-6">
										<label class="col-md-5">Tên đăng nhập3:</label>
										<div class="col-md-7">
											<select class="form-control" ng-model="user3.userId"
												ng-change="changeUserName3(user3.userId)">
												<option ng-value="{{user3.userId}}" selected="selected">{{user3.userName}}</option>
												<option ng-repeat="user3 in listUserNamesOfTongCuc"
													value="{{user3.userId}}">{{user3.userName}}</option>
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<label class="col-md-5">Tên đầy đủ3:</label>
										<div class="col-md-7">
											<input type="text" class="form-control"
												ng-model="fullNamePa3" readonly="readonly">
										</div>
									</div>
								</div>
								<div class="col-md-12" style="margin-bottom: 10px;">
									<div class="col-md-6">
										<label class="col-md-5">Ghi chú</label>
										<div class="col-md-7">
											<textarea rows="3" cols="99" ng-model="ghiChu"></textarea>
										</div>
									</div>
								</div>
							</div>
						</div>
					</fieldset>
					<div class="" style="text-align: center;">
						<button type="button" name="btnGhilai" ng-if="isCreate"
							class="btn btn-primary" ng-click="doChange(1)">Thêm mới</button>
						<button type="button" name="btnUpdate" ng-if="isModify"
							class="btn btn-primary" ng-click="doChange(0)">Cập nhật</button>
						<button type="button" name="btnThoat" class="btn btn-primary"
							ng-click="doClose()">Thoát</button>
					</div>
				</form>
			</div>
		</section>
	</div>