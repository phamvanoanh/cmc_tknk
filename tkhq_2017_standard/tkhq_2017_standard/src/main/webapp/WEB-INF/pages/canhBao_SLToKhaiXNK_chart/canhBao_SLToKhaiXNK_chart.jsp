<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="box-search mab10">
	<div class="container-fluid">
		<table>
			<tr>
				<td class="col-md-3 col-xs-3 col-lg-3 col-sm-3"><input
					type="radio" ng-model="rbLoaiKy.value" value="ky" />&nbsp;Kỳ</td>
				<td class="col-md-3 col-xs-3 col-lg-3 col-sm-3"><input
					type="radio" ng-model="rbLoaiKy.value" value="thang" />&nbsp;Tháng</td>
			</tr>
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
			<button type="submit" id="btnSearch" ng-click="searchChart()"
					class="btn btn-primary">Xem biểu đồ</button>
				<button type="button" id="btnClose" ng-click="closeChart()" class="btn btn-primary" ng-show="showButton">
					Đóng
				</button>
		</div>
	</div>
</div>

<table id="tblSoLieuChiTieu" style="width: 100%; border-spacing: 5px; border-collapse: separate;"
	ng-show="showData">
	<tr>
		<td class="col-md-6">
			<label class="col-md-6">Biểu đồ số lượng tờ khai</label>
			<iframe ng-src="{{linkAPI_LuongTK}}" id="frBDSLTK"
				style="width: 100%; height: 320px; border: 1px solid grey;"
				scrolling="none" allowtransparency="true">
			</iframe>
		</td>
		<td class="col-md-6">
			<label class="col-md-6">Biểu đồ số lượng dòng hàng</label>
			<iframe ng-src="{{linkAPI_LuongDH}}" id="frBDSLDH"
				style="width: 100%; height: 320px; border: 1px solid grey;"
				scrolling="none" allowtransparency="true">
			</iframe>
		</td>
	</tr>
</table>
<div class="col-md-12" align="center" ng-show="showData">
	<button type="button" class="btn btn-primary" ng-click="showFeedback()"
		data-toggle="modal" data-target="#myModal">
		Phản hồi
	</button>
</div>
