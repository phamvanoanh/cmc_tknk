<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:url value='/static/js/service/tbsQtacLuongNhapkhauService.js'/>"></script>
<script src="<c:url value='/static/js/controller/tbsQtacLuongNhapkhauController.js'/>"></script>
<script src="<c:url value='/static/js/service/tbsDmQtacService.js' />"></script>

<div ng-controller="tbsQtacLuongNhapkhauController">
	<div class="box-search">
		<fieldset class="form-group">
			<form class="form-search">
				<div class="col-md-12">
					<div class="col-md-6 mab10">
						<label class="col-sm-3 pa0">Mã số thống kê:</label>
						<div class="col-sm-8 pa0">
                            <input type="text" class="form-control" id="mathongke" ng-model="dto.mathongke" />
						</div>
					</div>
					<div class="col-md-6 mab10">
						<label class="col-sm-3 pa0">Lượng lớn nhất:</label>
						<div class="col-sm-8 pa0">
							<input type="number" class="form-control" id="luonglonnhat" ng-model="dto.luonglonnhat" />
						</div>
					</div>
				</div>
				<div class="col-md-12" align="center">
                    <button type="submit" id="btnSearch" ng-click="doSearch(1, pageSize)" class="btn btn-primary"></i>Tìm kiếm</button>
					<button type="button" id="addRow" class="btn btn-primary"  ng-click="doAdd()">Thêm mới</button>
					<button type="button" id="upDateRow" class="btn btn-primary"  ng-click="doUpdate()">Cập nhật</button>
				</div>
			</form>

		</fieldset>
	</div>
	<div ng-show="isDisplay">
	    <div class="col-md-12">
	        <div class="col-sm-3 paging-record">Tổng số bản ghi: {{totalItems}}</div>
	    </div>
		<table id="tbsQtacDnTrigiaNhapkhau"
			class="table table-bordered table-striped table-responsive">
			<thead>
				<tr>
					<th>STT</th>
					<th width="40%">Mã thống kê</th>
					<th width="40%">Lượng lớn nhất</th>
					<th width="13%"></th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="row in listData">
	                <td align="center"><span>{{(currentPage - 1) * pageSize + ($index + 1)}}</span></td>
					<td align="left" width="40%" ng-bind="row.mathongke" ></td>
					<td align="left" width="40%">{{row.luonglonnhat | number}}</td>
					<td width="13%"  align="center">
						<button type="button" ng-click="doEditRow(row.id)" class="btn btn-primary">Sửa</button>
						<button type="button" ng-click="doDelete(row.id)" class="btn btn-danger">Xóa</button>
					</td>
				</tr>
			</tbody>
		</table>
	    <div class="col-md-12">
	        <div class="col-sm-6">
	            <ul uib-pagination total-items="totalItems" ng-model="currentPage"
	                 max-size="maxSize" ng-change="pageChanged(currentPage)" class="pagination-sm"
	                 boundary-link-numbers="true" rotate="false" boundary-links="true">
	            </ul>
	        </div>
	    </div>
    </div>
</div>