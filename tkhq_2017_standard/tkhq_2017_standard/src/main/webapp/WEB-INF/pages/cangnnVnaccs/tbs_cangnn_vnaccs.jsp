<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	var _contextPath = "${pageContext.request.contextPath}";
</script>

<script src="<c:url value='/static/js/service/tbs_cangnnService.js' />"></script>
<script
	src="<c:url value='/static/js/controller/tbs_cangnnController.js' />"></script>

<!-- <div class="col-md-9 col-md-offset-3 col-md-9 col-md-offset-2 main bgwhite"> -->
<div class="modal-body"
	ng-controller="Tbs_CangNNController as cangNNCtrl">
	<div class="">
		<fieldset class="form-group form-wrapper">
			<form class="form-search">
				<table style="width: 100%">
					<tr>
						<td class="col-md-6"><label class="col-md-5">Mã cảng:</label>
							<div class="col-md-7">
								<input type="text" id="maCang" ng-model="maCang"class="form-control" />
							</div></td>
						<td class="col-md-6"><label class="col-md-5">Tên nước:</label>
							<div class="col-md-7">
								<input type="text" id="tenNuoc" ng-model="tenNuoc" class="form-control"/>
							</div></td>

					</tr>

					<tr>

						<td class="col-md-6"><label class="col-md-5">Mã nước:</label>
							<div class="col-md-7">
								<input type="text" id="maNuoc" ng-model="maNuoc" class="form-control"/>
							</div></td>
						<td class="col-md-6"><label class="col-md-5">Tên thành phố:</label>
							<div class="col-md-7">
								<input type="text" id="tenTP" ng-model="tenTP" class="form-control" />
							</div></td>
						<td></td>
					</tr>
				</table>

				</br>

				<div class="form-group row form-btn-align" align="center">
					<button type="submit" id="btnSearch"
						ng-click="cangNNCtrl.search(1,cangNNCtrl.pageSize)"
						class="btn btn-primary">
						<i class="icon-white"></i>Tìm kiếm
					</button>
					<button type="button" id="addRow" class="btn btn-primary"
						ng-click="addRow()">
						<i class="icon-white"></i>Thêm mới
					</button>
					<button type="submit" id="btnDel" class="btn btn-danger"
						ng-click="cangNNCtrl.remove()">
						<i class=icon-white"></i>Xóa
					</button>
				</div>
				</br>

			</form>
		</fieldset>
	</div>
	<div class="col-md-12">
		<div class="col-md-2">Tổng số {{cangNNCtrl.lstCangNN.length}}
			bản ghi</div>
	</div>
		<div class="box" style="overflow-x: scroll; overflow-y: hidden;width: 100%">
	<table id="tblCangNN"
		class="table table-bordered table-striped table-responsive">
		<%-- <colgroup>
				<col width="11%" />
				<col width="21%" />
				<col width="25%" />
				<col width="25%" />
				<col width="15%" />
			</colgroup> --%>
		<thead>
			<tr>
				<th style="width: 30px;"><input type="checkbox" ng-model="cangNNCtrl.checkAll"></th>
				<!--<th>STT</th> -->
				<th>Mã cảng</th>
				<th>Tên thành phố</th>
				<th>Mã nước</th>
				<th>Tên nước</th>
				<th style="width: 50px;">Thao tác</th>
			</tr>
		</thead>
		<tbody align="center">
			<tr ng-if="cangNNCtrl.lstCangNN"></tr>
			<tr ng-repeat="row in phantrang">
				<td style="vertical-align: middle;"><input type="checkbox" ng-checked="cangNNCtrl.checkAll"
					ng-model="row.isChecked"></td>
				<td style="vertical-align: middle;" ng-bind="row.maCang" ></td>
				<td ng-bind="row.tenTP"></td>
				<td ng-bind="row.maNuoc"></td>
				<td ng-bind="row.tenNuoc"></td>
				<td style="vertical-align: middle;">
					<button type="button" ng-click="cangNNCtrl.editRow(row.maCang)"
						class="btn btn-warning custom-width">Sửa</button>
				</td>

			</tr>

		</tbody>
	</table>
	</div>
	<div class="row">
		<div class="col-md-2 paging-record">Trang {{currentPage}} /
			{{totalPage}}</div>
		<div class="col-md-6">
			<pagination total-items="cangNNCtrl.lstCangNN.length"
				ng-model="currentPage" max-size="maxSize" class="pagination"
				boundary-links="true" rotate="false"></pagination>
		</div>
	</div>
</div>
<!-- </div> -->