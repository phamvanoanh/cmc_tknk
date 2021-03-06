<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="box-search mab10">
	<div class="container-fluid">
		<table>
			<tr>
				<td class="col-md-4 mab10">
					<label class="col-md-4 pa0">Cục Hải quan *</label>
					<div class="col-md-8 pa0">
						<select name="cucHQSelect" class="form-control"
							ng-model="ctrl.cucHQSelected" ng-change="changeCucHQ()">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstCucHQ" value="{{option.ma}}">{{option.ten}}</option>
						</select>
					</div></td>
				<td class="col-md-4 mab10">
					<label class="col-md-4 pa0">Chi cục Hải quan</label>
					<div class="col-md-8 pa0">
						<select name="chiCucHQSelect" class="form-control" ng-model="ctrl.chiCucHQSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstChiCucHQ" value="{{option.ma}}">{{option.ten}}</option>
						</select>
					</div>
				</td>
			</tr>
		</table>
		<br />
		<div class="col-md-12" align="center">
			<button type="submit" id="btnSearchXK" ng-click="search()" class="btn btn-primary"
				width="116">Xem Báo cáo
			</button>
		</div>
	</div>
</div>
<div class="table-scroll" ng-show="showDataTable" style="min-height: 50px;">
	<table id="tblWarnSLToKhaiXK" class="table table-bordered table-striped table-responsive" >
		<thead>
			<tr>
				<th style="text-align: center;">Chỉ tiêu</th>
				<th style="text-align: center;">Kỳ</th>
				<th colspan="{{lstWarnSLTKXNK[0].group_data[0].data_ky.data.length}}" style="text-align: center;">Thời gian</th>
				<th style="text-align: center;">So sánh với kỳ trước</th>
				<th style="text-align: center;">So sánh với cùng kỳ năm trước</th>
				<th style="text-align: center;">Số liệu năm hiện thời</th>
				<th style="text-align: center;">Dự báo năm tiếp theo-Hàm Trend</th>
			</tr>
		</thead>
		<tbody ng-repeat="group in lstWarnSLTKXNK">
			<tr>
				<td ng-bind="group.group_name" colspan="{{lstWarnSLTKXNK[0].group_data[0].data_ky.data.length + 6}}"
					style="text-align: left;"></td>
			</tr>
			<tr ng-repeat-start="row in group.group_data">
				<td ng-bind="row.subname" rowspan="2" style="text-align: left;"></td>
				<td>Kỳ</td>
				<td ng-repeat="dataKy in row.data_ky.data" class="{{dataKy.background}}" style="text-align: center;">
					<span ng-bind="dataKy.ky"></span>
					<br />
					<span ng-bind="dataKy.gia_tri"></span>
				</td>
				<td ng-bind="row.data_ky.ss_ky_truoc" style="text-align: center;"></td>
				<td ng-bind="row.data_ky.ss_ky_nam_truoc" style="text-align: center;"></td>
				<td ng-bind="row.data_ky.trend" style="text-align: center;"></td>
				<td ng-bind="row.data_ky.forecast" style="text-align: center;"></td>
			</tr>
			<tr>
				<td>Tháng</td>
				<td ng-repeat="dataThang in row.data_thang.data" class="{{dataThang.background}}" colspan="2" style="text-align: center;">
					<span ng-bind="dataThang.thang"></span>
					<br />
					<span ng-bind="dataThang.gia_tri"></span>
				</td>
				<td ng-bind="row.data_thang.ss_thang_truoc" style="text-align: center;"></td>
				<td ng-bind="row.data_thang.ss_thang_nam_truoc" style="text-align: center;"></td>
				<td ng-bind="row.data_thang.trend" style="text-align: center;"></td>
				<td ng-bind="row.data_thang.forecast" style="text-align: center;"></td>
			</tr>
			<tr ng-repeat-end>
				<td style="text-align: left;">AVG</td>
				<td ng-bind="row.avg" colspan="{{lstWarnSLTKXNK[0].group_data[0].data_ky.data.length + 1}}" style="background-color: green;"></td>
				<td colspan="4">&nbsp;</td>
			</tr>
		</tbody>
	</table>
</div>

<div class="col-md-12" align="center" ng-show="showDataTable">
	<button type="button" id="btnReportXK" ng-click="showFeedback()" data-toggle="modal"
		data-target="#myModal" class="btn btn-primary" style="width: 100px;">
		Phản hồi
	</button>
	<button type="button" id="btnExportXK" ng-click="doExport()" class="btn btn-primary"
		style="width: 100px;">Kết xuất
	</button>
	<button type="button" id="btnPrintXK" ng-click="doPrint()" class="btn btn-primary"
		style="width: 100px;">In
	</button>
</div>
<div class="col-md-12" align="left" ng-show="showDataTable">
	<a id="btnChartXK" ng-click="showChartInfo()" ng-disabled="btnDisable" width="116" href=""
		style="text-decoration: underline; font-size: 14px; font-weight: 700;">Biểu đồ</a>
</div>