<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style>
.col-md-4 {
	padding-right: 1px;
	padding-left: 5px;
}

.col-md-8, .col-md-6 {
	padding-right: 0;
	padding-left: 0;
}
</style>
<div class="box-search">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4">
				<label class="col-md-4">Cục Hải quan</label>
				<div class="col-md-8">
					<select name="cucHQSelect" class="form-control"
						ng-model="ctrl.cucHQSelected" ng-change="changeCucHQ()">
						<option value="">---Chọn---</option>
						<option ng-repeat="option in lstCucHQ" value="{{option.ma}}">{{option.ten}}</option>
					</select>
				</div>
			</div>
			<div class="col-md-4">
				<label class="col-md-4">Chi cục Hải quan</label>
				<div class="col-md-8">
					<select name="chiCucHQSelect" class="form-control"
						ng-model="ctrl.chiCucHQSelected">
						<option value="">---Chọn---</option>
						<option ng-repeat="option in lstChiCucHQ" value="{{option.ma}}">{{option.ten}}</option>
					</select>
				</div>
			</div>


			<div class="col-md-4">
				<label class="col-md-4">Loại ngày</label>
				<div class="col-md-8">
					<select name="loaiNgaySelect" class="form-control"
						ng-model="ctrl.loaiNgaySelected">
						<option value="">---Chọn---</option>
						<option ng-repeat="option in lstLoaiNgay" value="{{option.id}}">{{option.name}}</option>
					</select>
				</div>
			</div>
			<div class="col-md-4">
				<label class="col-md-4">Thời gian</label>
				<div class="col-md-8">
					<select name="thoigianSelect" class="form-control"
						ng-model="ctrl.thoigianSelected" ng-change="changeTG()">
						<option value="">---Chọn---</option>
						<option ng-repeat="option in lstTG" value="{{option.id}}">{{option.name}}</option>
					</select>
				</div>
			</div>


			<div class="col-md-4" id="daySelect" ng-show="showDay">
				<label class="col-md-4">Từ ngày</label>
				<div class="col-md-8">
					<input type="text" name="fromDate" class="form-control"
						uib-datepicker-popup="dd/MM/yyyy" ng-model="ctrl.fromDate"
						is-open="popup1.opened" datepicker-options="DayOptions"
						ng-click="open1()" close-text="Close" /> <i
						class="fa fa-calendar form-control-feedback"
						style="margin-top: -22px; right: -12px;" ng-click="open1()"></i>
				</div>
			</div>
			<div class="col-md-4" id="daySelect" ng-show="showDay">
				<label class="col-md-4">Đến ngày</label>
				<div class="col-md-8">
					<input type="text" name="toDate" class="form-control"
						uib-datepicker-popup="dd/MM/yyyy" ng-model="ctrl.toDate"
						ng-click="open2()" is-open="popup2.opened"
						datepicker-options="DayOptions" close-text="Close" /> <i
						class="fa fa-calendar form-control-feedback"
						style="margin-top: -22px; right: -12px;" ng-click="open2()"></i>
				</div>
			</div>


			<div class="col-md-4" id="weekSelect" ng-show="showWeek">
				<label class="col-md-4">Từ tuần</label>
				<div class="col-md-8">
					<div class="col-md-6">
						<select name="weekSelect" class="form-control"
							ng-model="ctrl.fweekSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstWeek" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
					<div class="col-md-6">
						<select name="yearSelect" class="form-control"
							ng-model="ctrl.fweekYearSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstYear" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
				</div>


			</div>
			<div class="col-md-4" id="weekSelect" ng-show="showWeek">
				<label class="col-md-4">Đến tuần</label>
				<div class="col-md-8">
					<div class="col-md-6">
						<select name="weekSelect" class="form-control"
							ng-model="ctrl.tweekSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstWeek" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
					<div class="col-md-6">
						<select name="yearSelect" class="form-control"
							ng-model="ctrl.tweekYearSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstYear" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
				</div>
			</div>


			<div class="col-md-4" id="monthSelect" ng-show="showMonth">
				<label class="col-md-4">Từ tháng</label>
				<div class="col-md-8">
					<input type="text" name="fromMonth" class="form-control"
						uib-datepicker-popup="MM/yyyy" ng-model="ctrl.fromMonth"
						is-open="popup3.opened" ng-click="open3()"
						datepicker-options="{minMode: 'month'}" datepicker-mode="'month'"
						close-text="Close" /> <i
						class="fa fa-calendar form-control-feedback"
						style="margin-top: -22px; right: -12px;" ng-click="open3()"></i>
				</div>

			</div>
			<div class="col-md-4" id="monthSelect" ng-show="showMonth">
				<label class="col-md-4">Đến tháng</label>
				<div class="col-md-8">
					<input type="text" name="toMonth" class="form-control"
						uib-datepicker-popup="MM/yyyy" ng-model="ctrl.toMonth"
						is-open="popup4.opened" ng-click="open4()"
						datepicker-options="{minMode: 'month'}" datepicker-mode="'month'"
						close-text="Close" /> <i
						class="fa fa-calendar form-control-feedback"
						style="margin-top: -22px; right: -12px;" ng-click="open4()"></i>
				</div>

			</div>

			<div class="col-md-4" ng-show="showQuarter">
				<label class="col-md-4">Từ quý</label>
				<div class="col-md-8">
					<div class="col-md-6">
						<select name="quarterSelect" class="form-control"
							ng-model="ctrl.fQuarterSelected">
							<option value="">---Chọn---</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>
					<div class="col-md-6">
						<select name="yearSelect" class="form-control"
							ng-model="ctrl.fQuarterYearSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstYear" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
				</div>
			</div>
			<div class="col-md-4" ng-show="showQuarter">
				<label class="col-md-4">Đến quý</label>
				<div class="col-md-8">
					<div class="col-md-6">
						<select name="quarterSelect" class="form-control"
							ng-model="ctrl.tQuarterSelected">
							<option value="">---Chọn---</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>
					<div class="col-md-6">
						<select name="yearSelect" class="form-control"
							ng-model="ctrl.tQuarterYearSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstYear" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
				</div>
			</div>


			<div class="col-md-4" ng-show="showYear" id="yearSelect">
				<label class="col-md-4">Năm</label>
				<div class="col-md-8">
					<input type="text" name="year" class="form-control"
						uib-datepicker-popup="yyyy" ng-model="ctrl.year"
						ng-click="open5()" is-open="popup5.opened"
						datepicker-options="{minMode: 'year'}" datepicker-mode="'year'"
						close-text="Close" /> <i
						class="fa fa-calendar form-control-feedback"
						style="margin-top: -22px; right: -12px;" ng-click="open5()"></i>
				</div>
			</div>

		</div>
		<br />
		<div class="col-md-12" align="center">
			<button type="submit" id="btnSearchXK" ng-click="searchChart()"
				class="btn btn-primary">Xem Biểu đồ</button>
			<button type="button" id="btnClose" ng-click="closeChart()"
				class="btn btn-primary" ng-show="showButton">Đóng</button>
		</div>
	</div>
</div>

<div class="" ng-show="showData">
	<table style="width: 100%; border-spacing: 5px; border-collapse: separate;">
		<tr>
			<td class="col-md-5">
				<label class="col-md-5">Biểu đồ số lượng tờ khai</label>
				<iframe id="frReportXNK" ng-src="{{srcBieuDoSLTK}}"
					style="width: 100%; height: 400px; border: 1px solid grey;"
					scrolling="none" allowtransparency="true"></iframe>
			</td>
			<td class="col-md-5">
				<label class="col-md-12">
					<span class="col-sm-4 pa0">Biểu đồ trị giá thống kê</span>
					<span class="col-sm-8 pa0" style="text-align: right;">Đơn vị tính: Nghìn USD</span></label>
				<iframe id="frReportXNK2"
					ng-src="{{srcBieuDoTGTK}}"
					style="width: 100%; height: 400px; border: 1px solid grey;"
					scrolling="none" allowtransparency="true"> </iframe>
			</td>
		</tr>
	</table>
	
	<div class="col-md-12" align="center">
		<button type="button" id="btnReportXK" ng-click="showFeedback()"
			class="btn btn-primary" data-toggle="modal" data-target="#myModal">
			Phản hồi</button>
	</div>
</div>