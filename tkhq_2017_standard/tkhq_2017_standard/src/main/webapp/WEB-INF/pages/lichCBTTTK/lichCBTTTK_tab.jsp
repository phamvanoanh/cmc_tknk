<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="box-search mab10">
	<div class="container-fluid">
		<div class="col-md-12 mab10">
			<label class ="col-md-3 pa0">Năm</label>
			<div class="col-md-3 pa0">
				<input type="text" class="form-control" ng-model="ctrl.namCB" maxlength="4" ng-blur="search()"
					onlyDigits/>
			</div>
			<span ng-show="errorNamCB" class="col-md-4 input-warning">Nhập sai định dạng năm</span>
		</div>
		<div class="col-md-12 mab10">
      		<label class ="col-md-3 pa0">Cơ quan công bố</label>
      		<div class="col-md-9 pa0">
       			<input type="text" class="form-control" ng-model="ctrl.coquanCB" maxlength="100"/>
			</div>
		</div>
		<div class="col-md-12 mab10">
			<label class ="col-md-3 pa0">Hình thức công bố</label>
			<div class="col-md-9 pa0">
       			<textarea class="form-control" ng-model="ctrl.hinhthucCB" rows="4"></textarea>
			</div>
		</div>
		<div class="col-md-12 mab10">
      		<label class ="col-md-3 pa0">Định dạng file dữ liệu</label>
      		<div class="col-md-9 pa0">
       			<input type="text" class="form-control" ng-model="ctrl.formatFile" maxlength="100"/>
			</div>
		</div> 				
		<div class="col-md-12 mab10">
      		<label class ="col-md-3 pa0">Niên giám thống kê</label>
      		<div class="col-md-9 pa0">
       			<input type="text" class="form-control" ng-model="ctrl.niengiamTK" maxlength="100"/>
			</div>
		</div>
		<div class="col-md-12 mab10">
			<label class ="col-md-3 pa0">Các loại báo cáo công bố</label>
			<div class="col-md-9 pa0">
       			<textarea class="form-control" ng-model="ctrl.loaiBCCB" rows="3"></textarea>
			</div>
		</div>
		<div ng-show="showTabCT">
			<div class="col-md-12 mab10">
				<div class="col-md-3" ng-show="showNam"></div>
				<div class="col-md-3 pa0">
		      		<label class ="col-md-4 pa0">Loại kỳ báo cáo *</label>
		      		<div class="col-md-6">
			       		<select name="loaiBCSelect" class="form-control" ng-model="ctrl.loaiKyBCSelected" ng-change="changeLoaiKy()">
			  				<option ng-repeat="option in lstLoaiKyBC" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
				</div>
				<div class="col-md-4 pa0" ng-show="showKy">
					<label class="col-md-3 pa0">Kỳ</label>
					<div class="col-md-6 pa0">
						<select name="kySelect" class="form-control" ng-model="ctrl.kySelected">
							<option value="">---Chọn---</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</div>
				</div>
				<div class="col-md-4 pa0" ng-show="showThang">
					<label class="col-md-3 pa0">Tháng</label>
					<div class="col-md-6 pa0">
						<select name="thangSelect" class="form-control" ng-model="ctrl.thangSelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstThang" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
				</div>
				<div class="col-md-4 pa0" ng-show="showQuy">
					<label class="col-md-3 pa0">Quý</label>
					<div class="col-md-6 pa0">
						<select name="quySelect" class="form-control" ng-model="ctrl.quySelected">
							<option value="">---Chọn---</option>
							<option ng-repeat="option in lstQuy" value="{{option.id}}">{{option.name}}</option>
						</select>
					</div>
				</div>
			</div>
			<div class="col-md-12 mab10">
	      		<label class ="col-md-3 pa0">Loại báo cáo *</label>
	      		<div class="col-md-6 pa0">
		       		<select name="loaiBCSelect" class="form-control" ng-model="ctrl.loaiBCSelected">
		       			<option value="">---Chọn---</option>
		  				<option ng-repeat="option in lstLoaiBC" value="{{option.ma}}">{{option.ten}}</option>
					</select>
				</div>
			</div>
		</div>
		<div ng-show="showTabNB">
			<div class="col-md-12 mab10">
				<label class ="col-md-3 pa0">Loại báo cáo *</label>
				<div class="col-md-6 pa0">
					<input type="text" class="form-control" ng-model="ctrl.loaiBCNB" maxlength="100"/>
				</div>
			</div>
		</div>
		<div class="col-md-3 mab10">
			<label class ="col-md-4 pa0">Số liệu Sơ bộ *</label>
			<div class="col-md-8" style="padding-left: 22px;">
  				<input type="text" name="soboDate" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="ctrl.slSobo"
  					is-open="popup1.opened" datepicker-options="DayOptions" close-text="Đóng" ng-click="open1()"/>
  				<i class="fa fa-calendar form-control-feedback" ng-click="open1()"
					style="top: 3px;"></i>
			</div>
		</div>
		<div class="col-md-5 mab10" style="padding: 0px 0px 0px 10px;">
			<label class ="col-md-6 pa0">Số liệu điều chỉnh 6 tháng đầu năm *</label>
			<div class="col-md-4">
  				<input type="text" name="dieuchinhDate" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="ctrl.sl6TDN"
  					is-open="popup2.opened" datepicker-options="DayOptions" close-text="Đóng" ng-click="open2()"/>
  				<i class="fa fa-calendar form-control-feedback" ng-click="open2()"
					style="top: 3px;"></i>
			</div>
		</div>
		<div class="col-md-4 mab10">
			<label class ="col-md-4 pa0">Số liệu chính thức *</label>
			<div class="col-md-5">
  				<input type="text" name="chinhthucDate" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="ctrl.slChinhthuc"
  					is-open="popup3.opened" datepicker-options="DayOptions" close-text="Đóng" ng-click="open3()"/>
  				<i class="fa fa-calendar form-control-feedback" ng-click="open3()"
					style="top: 3px;"></i>
			</div>
		</div>
		<div class="col-md-12 mab10">
      		<label class ="col-md-3 pa0">Người phụ trách *</label>
      		<div class="col-md-6 pa0">
       			<select name="NSDSelect" class="form-control" ng-model="ctrl.NSDSelected">
       				<option value="">---Chọn---</option>
  					<option ng-repeat="option in lstNSD" value="{{option.userId}}">{{option.fullName}}</option>
				</select>
			</div>
		</div>
	</div>
</div>
<div class="table-scroll" ng-show="showDataTable">
	<table id="tblScheduleInfo" class="table table-bordered">						
		<colgroup>
		</colgroup>
		<thead>
			<tr>
				<th rowspan="2" width="5%">STT</th>
				<th rowspan="2" width="35%">Loại báo cáo</th>
				<th rowspan="2">Kỳ</th>
				<th rowspan="2">Tháng</th>
				<th rowspan="2">Quý</th>
				<th rowspan="2">Năm</th>
				<th colspan="3">Dự kiến thời gian công bố</th>
				<th rowspan="2" width="16%">Người phụ trách</th>
				<th rowspan="2" width="8%">Thao tác</th>	
			</tr>
			<tr>
				<th width="12%">Số liệu sơ bộ</th>
				<th width="12%">Số liệu điều chỉnh<br/>6 tháng đầu năm</th>
				<th width="12%">Số liệu chính thức</th>
			</tr>
		</thead>
		<tbody ng-repeat="group in lstScheduleInfo">
			<tr>
				<td></td>
				<td ng-bind="group.thangBC"></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr ng-repeat="row in group.dataMonth">
				<td><input type="hidden" value="{{row.lichCBTTId}}"/>{{$index + 1}}</td>
				<td ng-bind="row.tbsDmBaocao.ten"></td>
				<td ng-bind="row.solieuSB" align="center"></td>
				<td ng-bind="row.solieu6TDN" align="center"></td>
				<td ng-bind="row.solieuCT" align="center"></td>
				<td align="center">
					<span ng-bind="row.tbdSysUser.userName"></span>-<span ng-bind="row.tbdSysUser.fullName"></span>
				</td>
				<td align="center">
					<button type="button" ng-click="editRow(row.lichCBTTId)"
						class="btn btn-warning">Sửa</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<div class="row" align="center" style="margin: 20px 0px;">
	<button type="button" id="btnInsUpdCT" ng-click="doInsUpd()"
		class="btn btn-primary">Lưu</button>
	<button type="button" id="btnExportCT" ng-click="doExport()"
		class="btn btn-primary">Kết xuất</button>
	<button type="button" id="btnPrintCT" ng-click="doPrint()"
		class="btn btn-info">In</button>
	<button type="button" id="btnUploadCT" ng-click="doUpload()"
		class="btn btn-primary">Tải tệp tin</button>
</div>