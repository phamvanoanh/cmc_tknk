<%@page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript">
	var _isIE = /*@cc_on!@*/false || !!document.documentMode;
</script>
<style>
.col-md-4 {
	padding-right: 5px;
	padding-left: 1px;
}
</style>
<section class="content">
	<div class="modal-body">
		<div class="col-md-12" style="margin-bottom: 5px;">
			<div class="col-md-4">
				<label class="col-md-4">Tên biểu:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="tenbieu as tenbieu.ten for tenbieu in controller.tenbieu "
						ng-model="tenbieu" ng-change="controller.SelectBieu(tenbieu)">
					</select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideMonth">
				<label class="col-md-4">Tháng:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="month as month.ten for month in controller.Months "
						ng-model="month"></select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideQuy">
				<label class="col-md-4">Qúy:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="quy as quy.ten for quy in controller.Quy "
						ng-model="Quy"></select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideYear">
				<label class="col-md-4">Năm:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="Year as Year.ten for Year in controller.Years "
						ng-model="Year"></select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideLoaiBC">
				<label class="col-md-4">Loại báo cáo:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="TrangThai as TrangThai.ten for TrangThai in controller.lstTrangThai "
						ng-model="TrangThai"></select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideTinh">
				<label class="col-md-4">Tên thành phố:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="tinh as tinh.ten for tinh in controller.lstTinh "
						ng-model="Tinh"></select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideKy">
				<label class="col-md-4">Kỳ:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="ky as ky.ten for ky in controller.ky " ng-model="ky">
					</select>
				</div>
			</div>

			<div class="col-md-4" ng-hide="controller.hideFromDate">
				<label class="col-md-4">Từ ngày:</label>
				<div class="col-md-8">
					<input type="text" name="fromDate" class="form-control"
						uib-datepicker-popup="dd/MM/yyyy" ng-model="fromDate"
						is-open="popup1.opened" ng-click="open1()"
						datepicker-options="dateOptions" close-text="Close" required /> <i
						class="fa fa-calendar form-control-feedback" ng-click="open1()" style="    margin-top: -22px;"></i>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideToDate">
				<label class="col-md-4">Đến ngày:</label>
				<div class="col-md-8">
					<input type="text" name="toDate" class="form-control"
						uib-datepicker-popup="dd/MM/yyyy" ng-model="toDate"
						is-open="popup2.opened" ng-click="open2()"
						datepicker-options="dateOptions" close-text="Close" required /><i
						class="fa fa-calendar form-control-feedback" ng-click="open2()" style="    margin-top: -22px;"></i>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideFromMonth">
				<label class="col-md-4">Từ tháng</label>
				<div class="col-md-8">
					<input type="text" name="fromMonth" class="form-control"
						uib-datepicker-popup="MM/yyyy" ng-model="fromMonth"
						is-open="popup3.opened" ng-click="open3()"
						datepicker-options="{minMode: 'month'}" datepicker-mode="'month'"
						close-text="Close" /> <i
						class="fa fa-calendar form-control-feedback" ng-click="open3()" style="    margin-top: -22px;"></i>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideToMonth">
				<label class="col-md-4">Đến tháng</label>
				<div class="col-md-8">
					<input type="text" name="toMonth" class="form-control"
						uib-datepicker-popup="MM/yyyy" ng-model="toMonth"
						is-open="popup4.opened" ng-click="open4()"
						datepicker-options="{minMode: 'month'}" datepicker-mode="'month'"
						close-text="Close" /> <i
						class="fa fa-calendar form-control-feedback" ng-click="open4()" style="    margin-top: -22px;"></i>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideFromYear">
				<label class="col-md-4">Từ năm</label>
				<div class="col-md-8">
					<input type="text" name="year" class="form-control"
						uib-datepicker-popup="yyyy" ng-model="fromyear"
						is-open="popup5.opened" datepicker-options="{minMode: 'year'}"
						ng-click="open5()" datepicker-mode="'year'" close-text="Close" />
					<i class="fa fa-calendar form-control-feedback" ng-click="open5()" style="    margin-top: -22px;"></i>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideToYear">
				<label class="col-md-4">Đến năm</label>
				<div class="col-md-8">
					<input type="text" name="year" class="form-control"
						uib-datepicker-popup="yyyy" ng-model="toyear"
						is-open="popup6.opened" ng-click="open6()"
						datepicker-options="{minMode: 'year'}" datepicker-mode="'year'"
						close-text="Close" /> <i
						class="fa fa-calendar form-control-feedback" ng-click="open6()" style="    margin-top: -22px;"></i>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideCuc">
				<label class="col-md-4">Cục Hải quan:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="item as item.ten for item in controller.lstCucHQ"
						ng-model="CucHQ" ng-change="controller.getChiCuc()">
					</select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideChiCuc">
				<label class="col-md-4">Chi cục Hải quan:</label>
				<div class="col-md-8">
					<select class="form-control" class="form-control "
						ng-options="item as item.ten for item in controller.lstChiCucHQ"
						ng-model="ChiCucHQ" ng-change="">
					</select>
					<!-- <select ng-model="ChiCucHQ">
					<option  value="0" selected="true" >--Tất cả--</option>
					<option ng-repeat="item in controller.lstChiCucHQ" value="item.ma" >{{item.ten}}</option>
				</select> -->
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideTKe">
				<label class="col-md-4">Thống kê:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="thongke as thongke.tenHang for thongke in controller.lstThongKe"
						ng-model="ThongKe" ng-change=""></select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideHS">
				<label class="col-md-4">Mã HS:</label>
				<div class="col-md-8">
					<input type="text" ng-model="MaHS" class="form-control" />
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideTTruong">
				<label class="col-md-4">Thị trường:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="thitruong as thitruong.ten for thitruong in controller.lstTTruong"
						ng-model="ThiTruong" ng-change=""></select>
				</div>
			</div>
			<div class="col-md-4" ng-hide="controller.hideNLH">
				<label class="col-md-4">Loại hình:</label>
				<div class="col-md-8">
					<select class="form-control "
						ng-options="loaihinh as loaihinh.ten for loaihinh in controller.lstLoaiHinh"
						ng-model="LoaiHinh" ng-change=""></select>
				</div>
			</div>
		</div>
		<div align="center">
			<button class="btn btn-primary" ng-click="controller.showPopup()">Kết
				xuất</button>
				<button class="btn btn-primary"
				ng-click="controller.showPopupNotKetXuat()">In kiểm tra</button>
		</div>
	</div>

</section>
