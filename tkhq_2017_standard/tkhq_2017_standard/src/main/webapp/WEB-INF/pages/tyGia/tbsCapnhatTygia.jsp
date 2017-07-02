<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:url value='/static/js/service/tbsCapnhatTygiaService.js' />"></script>
<script src="<c:url value='/static/js/controller/tbsCapnhatTygiaController.js' />"></script>

<div class="" ng-controller="TbsCapnhatTygiaController as tygiaCtrl">
	<div class="box-search">
		<fieldset class="form-group">
			<form class="form-search">
				<table style="width: 100%">
					<tr>
						<td>
							<label class="col-sm-3">Mã ngoại tệ:</label>
							<div class="col-sm-3">
								<input type="text" id="maNt" ng-model="maNt" />
							</div>
						</td>
						<td>
							<label class="col-sm-3">Ngày:</label>
							<div class="col-sm-5 pa0">
		  						<input type="text" name="ngay" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="tygiaCtrl.ngay"
		  							is-open="popup1.opened" datepicker-options="dateOptions" close-text="Đóng"/>
          					</div>
          					<span class="col-sm-2 input-group-btn">
	        					<button type="button" class="btn btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button>
	        				</span>
						</td>
					</tr>					
				</table>
				<br/>
				<div class="form-group row form-btn-align" align="center">
					<button type="submit" id="btnSearch"
						ng-click="tygiaCtrl.search(1, tygiaCtrl.pageSize)" class="btn btn-primary">
						Tìm kiếm
					</button>
					<button type="button" id="addRow" class="btn btn-primary" ng-click="addRow()">
						Thêm mới
					</button>					
					<button type="button" id="btnDel" class="btn btn-danger"
						ng-click="tygiaCtrl.remove()">Xóa
					</button>
				</div>
			</form>
		</fieldset>
	</div>
	<div class="col-md-12">
		<div class ="col-sm-2 paging-record">Tổng số bản ghi: {{tygiaCtrl.totalItems}}</div>
		<div class ="col-sm-6">
			<uib-pagination total-items="tygiaCtrl.totalItems" ng-change="pageChanged()" ng-model="tygiaCtrl.currentPage" 
				max-size="tygiaCtrl.maxSize" class="pagination" boundary-links="true" rotate="false"></uib-pagination>
		</div>
	</div>	
		<!-- <div style="width:400px; overflow-x: scroll;"> -->
	<table id="tblTygia" class="table table-bordered table-striped table-responsive">
		<%-- <colgroup>
			<col width="6%" />
			<col width="17%" />
			<col width="27%" />
			<col width="22%" />
			<col width="25%" />			
		</colgroup> --%>
		<thead>
			<tr>
				<th><input type="checkbox" ng-model="tygiaCtrl.checkAll" ng-click="toggleAll()"></th>
				<!--<th>STT</th> -->
				<th>Mã ngoại tệ</th>
				<th>Ngày</th>
				<th>Tỷ giá VND</th>
				<th>Tỷ giá USD</th>				
				<th>Thao tác</th>
			</tr>
		</thead>
		<tbody align="center">
			<tr ng-repeat="row in tygiaCtrl.listTygia">
				<td><input type="checkbox" ng-checked="tygiaCtrl.checkAll"
					ng-model="row.isChecked"></td>
				<!--<td><input type="hidden" value="{{row.tygiaId}}" />
				<span>{{(tygiaCtrl.currentPage - 1) * tygiaCtrl.pageSize + ($index + 1)}}</span></td>		-->		
				<td ng-bind="row.maNt"></td>
				<td ng-bind="row.ngay | date : 'dd-MM-yyyy'"></td>
				<td ng-bind="row.tygiaVnd"></td>
				<td ng-bind="row.tygiaUsd"></td>				
				<td>
					<button type="button" ng-click="tygiaCtrl.editRow(row.tygiaId)"
						class="btn btn-warning custom-width">Sửa</button>
					<input type="hidden" value="{{row.tygiaId}}" />
				</td>
			</tr>
		</tbody>
	</table>
	<!-- </div> -->
	<div class="col-md-12">
		<div class ="col-sm-2"></div>
		<div class ="col-sm-6">
			<uib-pagination total-items="tygiaCtrl.totalItems" ng-change="pageChanged()" ng-model="tygiaCtrl.currentPage" 
				max-size="tygiaCtrl.maxSize" class="pagination" boundary-links="true" rotate="false"></uib-pagination>
		</div>
	</div>
</div>