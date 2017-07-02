<%@page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script
	src="<c:url value='/static/js/service/tbd_sys_groupsService.js' />"></script>
<script
	src="<c:url value='/static/js/controller/tbd_groupsController.js' />"></script>

<div ng-app="myApp" class="content-wrapper"
	ng-controller="Tbs_sysGroupsController as ctrl">
	<section class="content-header">
		<h3 class="title">
			<span style="vertical-align: middle;">QUẢN LÝ NHÓM NGƯỜI DÙNG</span>
		</h3>
	</section>
	<section class="content">
		<div class="modal-body" style="margin-left: 5px">
			<div  class="col-md-12" style="margin-bottom: 10px;">
				<div class="col-md-6">
					<label class="col-md-5">Tổng cục/Cục Hải quan: </label>
					<div class="col-md-7">
						<select class="form-control"
							ng-options="cuc as cuc.ten for cuc in ctrl.lstCucHQ | orderBy:'ma'"
							ng-model="cucHQ" ng-change="GetChiCucHQByCuc(cuc.ma)"></select>
					</div>
				</div>
				<div class="col-md-6">
					<label class="col-md-5">Chi cục :</label>
					<div class="col-md-7">
						<select class="form-control"
							ng-options="item as item.ten for item in ctrl.lstChiCuc | orderBy:'ma'"
							ng-model="chiCucSelected" ng-change=""></select>
					</div>
				</div>
			</div>
			<div  class="col-md-12" style="margin-bottom: 10px;">
				<div class="col-md-6">
					<label class="col-md-5">Mã Nhóm: </label>
					<div class="col-md-7">
						<select class="form-control"
							ng-options="item as item.groupId for item in lstNhom"
							ng-model="GroupQL" ng-change="changeGroup()"></select>
					</div>
				</div>
				<div class="col-md-6">
					<label class="col-md-5">Tên nhóm :</label>
					<div class="col-md-7">
						<select class="form-control"
							ng-options="item as item.groupCode for item in lstNhom"
							ng-model="GroupQL" ng-change="changeGroup()"></select>
					</div>
				</div>

			</div>
			<div class="col-md-12" align="center" style="margin-top: 5px;margin-bottom: 10px">
				<button id="btnDSNSD" name="btnDSNSD" class="btn btn-primary"
					ng-click="getdsNSD();">Tìm kiếm</button>
			</div>

			<table style="width: 100%">
				<tr>
					<td class="col-md-5"><label>Danh sách người sử dụng :</label>
					</td>
					<td class="col-md-2"></td>
					<td class="col-md-5"><label>Danh sách người trong
							nhóm:</label></td>
				</tr>
				<tr>
					<td class="col-md-5">
						<div class="col-md-12">
							<select class="form-control"
								ng-options="item as item.username for item in ctrl.dsNSD"
								ng-model="addNSD" ng-change="" multiple></select>
						</div>
					</td>
					<td class="col-md-2" style="margin-top: 10px" align="center">
						<button ng-click="addNhom();" class="btn btn-primary">
							<span> >> </span>
						</button>

						<button ng-click="removeNhom();" class="btn btn-primary">
							<span> << </span>
						</button>
					</td>
					<td class="col-md-5">
						<div class="col-md-12">
							<select class="form-control"
								ng-options="item as item.username for item in ctrl.dsNSDinN"
								ng-model="removeNSD" ng-change="" multiple></select>
						</div>
					</td>
				</tr>
			</table>
			<div class="form-group row form-btn-align" align="center" style="margin-top: 10px">
				<button type="button" name="btnGhilai" class="btn btn-primary"
					ng-click="saveQL()">Ghi Lại</button>
					<a href="danhsachNhomNSD"  name="" class="btn btn-primary"
					>Quay lại</a>
			</div>
		</div>
	</section>
</div>