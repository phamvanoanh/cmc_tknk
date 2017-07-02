<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div ng-controller="PhanHoiQuyTrinhXLDLController">
	<%@ include file="../PhanHoiQuyTrinhXLDL/PhanHoiQuyTrinhXLDL.jsp"%>
</div>

<div class="row">
	<div class="fade-in-out" ng-show="showLoading">
		<uib-progressbar class="progress-striped active progressBar" type="info"></uib-progressbar>
	</div>
</div>

<div ng-hide="showChart1"> <!-- style="border: 0px !important;"> -->
	<form:form modelAttribute="mform" action="/" method="post">
	<div class="generic-container">
		<fieldset class="form-group form-wrapper">
			<form class="form-search">
				</br>
				<table style="width: 100%">
					<tr>
						<td class="col-md-4"><label class="col-md-4">Cục Hải quan</label>
							<div class="col-md-8">
								<select class="form-control"
									ng-options="item as item.ten for item in lstCucHQ"
									ng-model="cmbCucHQ" ng-change="CucHQSelected(cmbCucHQ)"></select>
							</div></td>
						<td class="col-md-4"><label class="col-md-4">Chi cục Hải quan</label>
							<div class="col-md-8">
								<select class="form-control"
									ng-options="item as item.ten for item in lstChiCucHQ"
									ng-model="cmbChiCucHQ"></select>
							</div></td>
					</tr>
				</table>
				</br>
			</form>
		</fieldset>
	</div>
	<div class="form-group row form-btn-align" align="center">
		<button type="submit" id="btnPhanHoi" ng-click="btnXemBC_Click()"
			class="btn btn-primary">
			<i class="glyphicon icon-white"></i>Xem báo cáo
		</button>
	</div>
	</br>
	<div ng-hide="showReport1">
	<div class="row">
		<!-- <div>Total: {{Scope.totalItems}}</div> -->
		<div>
			<!-- <pagination total-items="Scope.totalItems" ng-change="pageChanged()" ng-model="Scope.currentPage" max-size="Scope.maxSize" class="pagination" boundary-links="true" rotate="false"></pagination> -->
		</div>
	</div>
	<div style="width: 100%;  min-height: 50px;" class="table-scroll">
		<table id="tbTongThe" class="table table-bordered table-responsive">
			<thead>
				<tr>
					<th>Chỉ tiêu</th>
					<th>Kỳ</th>
					<th colspan="{{lstResult[0].data_ky.data.length}}">Thời gian</th>
					<th>So sánh với kỳ trước</th>
					<th>So sánh với cùng kỳ năm trước</th>
					<th>Số liệu năm hiện thời</th>
					<th>Dự báo năm tiếp theo – Hàm Trend</th>					
				</tr>
			</thead>
			<tbody> <!-- ng-repeat="row in lstResult"> -->
				<tr>
					<td colspan="{{lstResult[0].data_ky.data.length + 6}}">{{tenCucHQ}}</td>					
				</tr>
				<tr ng-repeat-start="row in lstResult">
					<td rowspan="2">{{row.sub_name}}</td>
					<td>Kỳ</td>
					<td ng-repeat="ky in row.data_ky.data" 
					ng-class='{red : (ky.gia_tri != null && ky.gia_tri.trim() != "" && ky.gia_tri == row.data_ky.maxKy && ky.ky != row.data_ky.tenKY), 
					yellow : (ky.gia_tri != null && ky.gia_tri.trim() != "" && ky.gia_tri == row.data_ky.minKy && ky.ky != row.data_ky.tenKY)}'>
					<!-- <span ng-if="!$last"> -->
						<center>{{ky.ky}}</center> 
						<br />
						<center>{{ky.gia_tri}}</center>
						<!-- </span> -->
					</td>
					<td ng-bind="row.data_ky.ss_ky_truoc" align="center"></td>
					<td ng-bind="row.data_ky.ss_ky_nam_truoc" align="center"></td>
					<td ng-bind="row.data_ky.forecast" align="center"></td>
					<td ng-bind="row.data_ky.trend" align="center"></td>					
				</tr>

				<tr>
					<td>Tháng</td>
					<td ng-repeat="thang in row.data_thang.data" colspan="2"
					ng-class='{red : (thang.gia_tri != null && thang.gia_tri.trim() != "" && thang.gia_tri == row.data_thang.maxThang && thang.thang != row.data_thang.tenTHANG), 
					yellow : (thang.gia_tri != null && thang.gia_tri.trim() != "" && thang.gia_tri == row.data_thang.minThang && thang.thang != row.data_thang.tenTHANG)}'>
						<center>{{thang.thang}}</center>
						<br />
						<center>{{thang.gia_tri}}</center>
						</td>
					<td ng-bind="row.data_thang.ss_thang_truoc" align="center"></td>
					<td ng-bind="row.data_thang.ss_thang_nam_truoc" align="center"></td>
					<td ng-bind="row.data_thang.forecast" align="center"></td>
					<td ng-bind="row.data_thang.trend" align="center"></td>				
				</tr>
				<tr ng-repeat-end>
					<td>AVG</td>
					<!-- <td ng-class='{green : true}' -->
					<td class="green"
						colspan="{{row.data_ky.data.length +1}}"
						ng-bind="row.avg"></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>

			</tbody>
		</table>
	</div>
	<div class="form-group row form-btn-align" align="center">
		<button type="button" class="btn btn-primary" data-toggle="modal"
			data-target="#myModal" ng-click="btnPhanHoi_Click()" style="width: 100px;">
			<i class="glyphicon icon-white" ></i> Phản hồi
		</button>
		<button type="button" id="btnKetXuat" ng-click="btnKetXuat_Click()"
			class="btn btn-primary" style="width: 100px;">
			<i class="glyphicon icon-white"></i> Kết xuất
		</button>
		<button type="button" id="btnIn" class="btn btn-primary"
			ng-click="btnKetXuat_Click()" style="width: 100px;">
			<i class="glyphicon icon-white"></i> In
		</button>
		<!-- <button type="button" id="btnClose" class="btn btn-primary"
			ng-click="btnClose_Click()">
			<i class="glyphicon icon-white"></i> Đóng
		</button> -->
	</div>
	</br>
	<div class="form-group row form-btn-align" align="center">
		<div class="row">
			<div></div>
			<div></div>
		</div>
	</div>
	<!-- <a href="HTCBTGTXNK_chart" style="text-decoration: underline; font-weight: bold">Biểu đồ</a> -->
	<br/>	
	<div>
    	<a ng-click="showChart()" style="text-decoration: underline; font-weight: bold" class="btn"><span>Biểu đồ</span></a> &nbsp; &nbsp;
    </div>			
	<br/>
	<br/>
	</div>	
	</form:form>
</div>
<div ng-show="showChart1">
		<%@ include file="../HTCBTGTXNK_chart/HTCBTGTXNK_chart.jsp"%>
</div>

