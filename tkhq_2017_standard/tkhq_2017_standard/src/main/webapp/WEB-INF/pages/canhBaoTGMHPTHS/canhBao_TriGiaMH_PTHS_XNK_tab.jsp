<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="box-search mab10">
	<div class="container-fluid" style="overflow-x: auto;">
		<table>
			<tr>
				<td class="col-md-4 col-xs-4 col-sm-4"><label
					class="col-md-4 col-xs-4 col-sm-4">Trạng thái *</label>
					<div class="col-md-8 col-xs-8 col-sm-8">
						<select name="TTSelect" class="form-control"
							ng-model="ctrl.TTSelected">
							<option value="">---Chọn---</option>
							<option value="SB">Sơ bộ</option>
							<option value="CT">Chính thức</option>
						</select>
					</div></td>
				<td class="col-md-4 col-xs-4 col-sm-4"><label
					class="col-md-4 col-xs-4 col-sm-4 pa0">Chương *</label>
					<div class="col-md-8 col-xs-8 col-sm-8">
						<select name="chuongSelect" class="form-control"
							ng-model="ctrl.chuongSelected" ng-change="changeChuong()">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstChuong" value="{{option.ma}}">{{option.ten}}</option>
						</select>
					</div></td>
				<td class="col-md-4 col-xs-4 col-sm-4"><label
					class="col-md-4 col-xs-4 col-sm-4">Nhóm</label>
					<div class="col-md-8 col-xs-8 col-sm-8">
						<select name="nhomSelect" class="form-control"
							ng-model="ctrl.nhomSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstNhom" value="{{option.ma}}">{{option.ten}}</option>
						</select>
					</div></td>
			</tr>
			<tr>
				<td class="col-md-4 col-xs-4 col-sm-4"><label
					class="col-md-4 col-xs-4 col-sm-4">Cục Hải quan *</label>
					<div class="col-md-8 col-xs-8 col-sm-8">
						<select name="cucHQSelect" class="form-control"
							ng-model="ctrl.cucHQSelected" ng-change="changeCucHQ()">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstCucHQ" value="{{option.ma}}">{{option.ten}}</option>
						</select>
					</div></td>
				<td class="col-md-4 col-xs-4 col-sm-4"><label
					class="col-md-4 col-xs-4 col-sm-4 pa0">Chi cục Hải quan</label>
					<div class="col-md-8 col-xs-8 col-sm-8">
						<select name="chiCucHQSelect" class="form-control"
							ng-model="ctrl.chiCucHQSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstChiCucHQ"
								value="{{option.ma}}">{{option.ten}}</option>
						</select>
					</div></td>
			</tr>
		</table>
		<br />
		<div class="col-md-12" align="center">
			<button type="submit" id="btnSearchXK" ng-click="search()" class="btn btn-primary">
				Xem Báo cáo
			</button>
		</div>
	</div>
</div>
<div class="table-scroll" ng-show="showDataTable">
	<div class="col-md-12" align="right">
		<span>Đơn vị tính: Nghìn USD</span>
	</div>
	<table id="tblWarnTGMHPTHSXK" class="table table-bordered table-striped table-responsive" >
		<thead style="text-align: center;">
			<tr>
				<th>Chỉ tiêu</th>
				<th>Kỳ</th>
				<th colspan="{{lstWarnTGMHPTHSXNK[0].group_data[0].data_ky.data.length}}">Thời gian</th>
				<th>So sánh với kỳ trước</th>
				<th>So sánh với cùng kỳ năm trước</th>
				<th>Số liệu năm hiện thời</th>
				<th>Dự báo năm tiếp theo-Hàm Trend</th>
			</tr>
		</thead>
		<tbody ng-repeat="group in lstWarnTGMHPTHSXNK">
			<tr>
				<td ng-bind="group.group_name" colspan="{{lstWarnTGMHPTHSXNK[0].group_data[0].data_ky.data.length + 6}}"
					style="text-align: left;"></td>
			</tr>
			<tr ng-repeat-start="row in group.group_data">
				<td ng-bind="row.sub_name" rowspan="2" style="text-align: left;"></td>
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
				<td ng-bind="row.avg" colspan="{{lstWarnTGMHPTHSXNK[0].group_data[0].data_ky.data.length + 1}}" style="background-color: green;"></td>
				<td colspan="4">&nbsp;</td>
			</tr>
		</tbody>
	</table>
</div>
<br />
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
	<a id="btnChartXK" ng-click="showChartInfo()" ng-disabled="btnDisable" href=""
		style="text-decoration: underline; font-size: 14px; font-weight: 700;">Biểu đồ</a>
</div>
<br />
<br />