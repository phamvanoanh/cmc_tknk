<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	var _contextPath = "${pageContext.request.contextPath}";
</script>
<script
	src="<c:url value='/static/js/service/tbs_chuyendeService.js' />"></script>
<script
	src="<c:url value='/static/js/controller/tbs_chuyendeController.js' />"></script>

<div class="modal-body"
	ng-controller="Tbs_ChuyenDeController as chuyenDeCtrl">
	<div class="">
		<fieldset class="form-group form-wrapper">
			<form class="form-search">
				<table style="width: 100%">
					<tr>
						<td class="col-sm-6"><label class="col-sm-5">Mã
								chuyên đề:</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="maCDe"
									ng-model="maCDe" />
							</div></td>
						<td class="col-sm-6"><label class="col-sm-5">Tên
								chuyên đề:</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="tenCDe"
									ng-model="tenCDe" />
							</div></td>

					</tr>

					<tr>

						<td class="col-sm-6"><label class="col-sm-5">Mã hàng:</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="maHang"
									ng-model="maHang" />
							</div></td>
						<td class="col-sm-6"><label class="col-sm-5">Mô tả
								hàng hóa:</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" id="motaHH"
									ng-model="motaHH" />
							</div></td>
						<td></td>
					</tr>
				</table>

				</br>

				<div class="form-group row form-btn-align" align="center">
					<button type="submit" id="btnSearch"
						ng-click="chuyenDeCtrl.search(1,chuyenDeCtrl.pageSize)"
						class="btn btn-primary">
						Tìm kiếm
					</button>
					<button type="button" id="addRow" class="btn btn-primary"
						ng-click="addRow()">
						Thêm mới
					</button>
					<button type="submit" id="btnDel" class="btn btn-danger"
						ng-click="chuyenDeCtrl.remove()">
						Xóa
					</button>
				</div>
				</br>

			</form>
		</fieldset>
	</div>
	<div class="row">
		<div>Tổng số {{chuyenDeCtrl.lstChuyenDe.length}} bản ghi</div>
	</div>
	<div class="box" style="overflow-x: scroll; overflow-y: hidden;width: 100%">
		<table id="tblChuyenDe"
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
					<th style="width: 10px;"><input type="checkbox" ng-model="chuyenDeCtrl.checkAll"></th>
					<!--<th>STT</th> -->
					<th >Mã chuyên đề</th>
					<th>Tên chuyên đề</th>
					<th>Mã hàng hóa</th>
					<th>Mô tả hàng hóa</th>
					<th style="width: 100px;">Thao tác</th>
				</tr>
			</thead>
			<tbody align="center">
				<tr ng-if="chuyenDeCtrl.lstChuyenDe"></tr>
				<tr ng-repeat="row in phantrang">
					<td style="vertical-align: middle;"><input type="checkbox" ng-checked="chuyenDeCtrl.checkAll"
						ng-model="row.isChecked"></td>
					<td ng-bind="row.maCDe" style="vertical-align: middle;"></td>
					<td ng-bind="row.tenCDe"></td>
					<td ng-bind="row.maHang"></td>
					<td ng-bind="row.motaHH"></td>
					<td style="vertical-align: middle;">
						<button type="button" ng-click="chuyenDeCtrl.editRow(row.maCDe)"
							class="btn btn-warning custom-width">Sửa</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="col-md-12">
		<div class="col-sm-2 paging-record">Trang {{currentPage}} /
			{{totalPage}}</div>
		<div class="col-sm-6">
			<pagination total-items="chuyenDeCtrl.lstChuyenDe.length"
				ng-change="pageChanged()" ng-model="currentPage" max-size="maxSize"
				class="pagination" boundary-links="true" rotate="false"></pagination>
		</div>
	</div>
	
</div>
