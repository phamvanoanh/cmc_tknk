<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="table-scroll" style="text-align: center;">
	<table id="tblProcessInfo" class="table table-bordered" width="100%">
		<colgroup>
			<col width="10%" />
			<col width="25%" />
			<col width="5%" />
			<col width="5%" />
			<col width="5%" />
			<col width="10%" />
			<col width="10%" />
			<col width="30%" />
			<col width="10%" />
		</colgroup>
		<thead>
			<tr>
				<th>Tên đăng nhập</th>
				<th>Tên biểu</th>
				<th>Kỳ</th>
				<th>Tháng</th>
				<th>Năm</th>
				<th>Trạng thái biểu</th>
				<th>Thời gian</th>
				<th>Lý do</th>
				<th>Chọn</th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="row in lstProcessInfo">
				<td ng-bind="row.nguoiPheDuyet"></td>
				<td ng-bind="row.tenDanhMucBaoCao"></td>
				<td ng-bind="row.ky"></td>
				<td ng-bind="row.thang"></td>
				<td ng-bind="row.nam"></td>
				<td ng-bind="row.trangThai"></td>
				<td ng-bind="row.ngayPheDuyet | date : 'dd-MM-yyyy'"></td>
				<td ng-bind="row.lyDoThayDoiDL"></td>
				<td>
					<input type="radio" ng-model="rbChecked.value" ng-value="row.id"/>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<div class="box-search mab10">
	<div class="container-fluid">
		<div id="messageArea"></div>
		<div id="messageErrorArea"></div>
		<!-- <div class="col-md-12 mab10">
       		<label class ="col-sm-1 pa0">Tên biểu</label>
       		<div class="col-sm-6 pa0">
        		<select name="tenBieuSelect" class="form-control" ng-model="ctrl.tenBieuSelected" ng-change="changeBC()">
        			<option value="0">Tất cả</option>
   					<option ng-repeat="option in lstBieu" value="{{option.maDanhMucBaoCao}}">{{option.tenDanhMucBaoCao}}</option>
   					<option value="0">Các báo cáo khác</option>
 				</select>
			</div>
		</div>
		<div class="col-md-12 mab10">
			<div class="col-md-4" ng-show="showLoaiKy">
				<label class ="col-sm-3 pa0">Kỳ</label>
				<div class="col-sm-6 pa0">
					<select name="kySelect" class="form-control" ng-model="ctrl.kySelected">
	        			<option value="">---Please select---</option>
	   					<option ng-repeat="option in lstKy" value="{{option.ma}}">{{option.ten}}</option>
 					</select>
				</div>
			</div>
			<div class="col-md-4">
				<label class ="col-sm-3 pa0">Tháng</label>
				<div class="col-sm-6 pa0">
					<select name="thangSelect" class="form-control" ng-model="ctrl.thangSelected">
	        			<option value="">---Please select---</option>
	   					<option ng-repeat="option in lstThang" value="{{option.ma}}">{{option.ten}}</option>
 					</select>
				</div>
			</div>
			<div class="col-md-4">
				<label class ="col-sm-3 pa0">Năm</label>
				<div class="col-sm-6 pa0">
					<select name="namSelect" class="form-control" ng-model="ctrl.namSelected">
	        			<option value="">---Please select---</option>
	   					<option ng-repeat="option in lstNam" value="{{option.ma}}">{{option.ten}}</option>
 					</select>
				</div>
			</div>
		</div>
		<div class="col-md-12 mab10" ng-show="showTT">
			<label class="col-md-1">Trạng thái</label>
			<div class="col-md-3">
				<select name="TTSelect" class="form-control" ng-model="ctrl.TTSelected">
					<option value="">---Please select---</option>
					<option value="SB">Sơ bộ</option>
					<option value="DC">Điều chỉnh</option>
					<option value="CT">Chính thức</option>
				</select>
			</div>
		</div> -->
		<div class="col-md-12 mab10">
			<div class="col-md-4" style="text-align: right;">
				<input type="radio" ng-model="rbApproval.value" value="1" />&nbsp;Phê duyệt
			</div>
			<div class="col-md-2"></div>
			<div class="col-md-4">
				<input type="radio" ng-model="rbApproval.value" value="0" />&nbsp;Không phê duyệt
			</div>
		</div>
		<div class="col-md-12 mab10">
			<label class ="col-sm-1 pa0">Lý do</label>
			<div class="col-sm-9 pa0">
       			<textarea class="form-control" ng-model="ctrl.lydo" rows="3"></textarea>
			</div>
		</div>
	</div>
</div>
<div class="row" align="center">
	<button type="button" id="btnSearch" ng-click="viewBaoCao()" ng-disabled="btnDisable"
		class="btn btn-primary">Xem báo cáo</button>
	<button type="button" id="btnApproval" ng-click="doApproval()"
		class="btn btn-primary">Lưu</button>
</div>