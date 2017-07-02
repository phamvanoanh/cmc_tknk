<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style>
.col-sm-5,.col-sm-6{
	padding-left:4px;
	padding-right:5px;
}
</style>
<div class="" style="height: 100%;">
	<section class="content-header panel panel-success"
		style="height: 50px;">
		<h2 class="title" style="font-size: 25px; padding: 2px">Thêm mới/Cập nhập chuyên đề</h2>
	</section>
	<section>
		<div class="modal-body">
			<form name="chuyendeForm">
				<div class="row">
						<div class="col-md-6"><label class="col-md-5 pa0">Mã Chuyên Đề *:</label>
							<div class="col-md-7">
								<input class="input" type="text" name="maCD" ng-model="self.entity.maCDe"
									maxlength="20" ng-required=true ng-pattern="/^[a-zA-Z0-9_]*$/"
									ng-disabled="self.entity.addOrUpdate == 'update' " />
									<span class="error "
							ng-show="chuyendeForm.maCD.$error.pattern">Mã chuyên đề
							không được có ký tự đặc biệt</span>
							<span
							class="error" ng-show="chuyendeForm.maCD.$error.required ">Vui
							lòng nhập mã chuyên đề</span>
							</div>
						</div>
						<div class="col-md-6"><label class="col-md-5 pa0">Tên Chuyên Đề:</label>
							<div class="col-md-7">
								<input class="input" type="text" ng-model="self.entity.tenCDe"
									maxlength="254" />
							</div>
						</div>
					</div>
					<div class="row">

						<div class="col-md-6"><label class="col-md-5 pa0">Mã Hàng:</label>
							<div class="col-md-7">
								<input class="input" type="text" ng-model="self.entity.maHang"
									maxlength="20" />
							</div></div>
						<div class="col-md-6"> <label class="col-md-5 pa0">Mô tả Hàng Hóa:</label>
							<div class="col-md-7">
								<input class="input" type="text" ng-model="self.entity.motaHH"
									maxlength="100" />
							</div></div>
						<div><input class="input" type="hidden"
							ng-model="self.entity.addOrUpdate" /></div>
					</div>
			</form>
		</div>
		</br>
		<div class="modal-footer" align="center">
			<button class="btn btn-primary" ng-click="self.saveData()"
				ng-disabled="chuyendeForm.$invalid">Lưu</button>
			<button class="btn btn-primary" ng-click="self.cancel()">Hủy bỏ</button>
		</div>
	</section>
</div>