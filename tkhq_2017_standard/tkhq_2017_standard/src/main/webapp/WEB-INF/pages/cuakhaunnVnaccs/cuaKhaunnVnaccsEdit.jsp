<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div>
	<div class="modal-header">
		<h4 class="modal-title">Thêm mới/Cập nhật cửa khẩu nước ngoài</h4>
	</div>
	<div class="modal-body">
		<form name="cuaKhaunnVnaccsForm">
			<table style="width: 100%">
				<tr>
					<td>
						<label class="col-sm-3">Mã cảng *:</label>
						<div class="col-sm-4">
							<input class="input" type="text" name="maCang" ng-model="self.entity.maCang" maxlength="254"
								ng-disabled="self.entity.addOrUpdate == 'update' " required/>
						</div>
						<span ng-show="cuaKhaunnVnaccsForm.maCang.$error.required" class="col-sm-4 input-warning">Mã cảng là bắt buộc</span>
					</td>
				</tr>
				<tr>
					<td>
						<label class="col-sm-3">Loại cảng:</label>
						<div class="col-sm-3">
							<input class="input" type="text" ng-model="self.entity.loaiCang" maxlength="254"/>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<label class="col-sm-3">Mã nước *:</label>
						<div class="col-sm-4">
							<input class="input" type="text" name="maNuoc" ng-model="self.entity.maNuoc" maxlength="254" required/>
						</div>
						<span ng-show="cuaKhaunnVnaccsForm.maNuoc.$error.required" class="col-sm-4 input-warning">Mã nước là bắt buộc</span>
					</td>
				</tr>
				<tr>
					<td>
						<label class="col-sm-3">Tên nước:</label>
						<div class="col-sm-3">
							<input class="input" type="text" ng-model="self.entity.tenNuoc" maxlength="254"/>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<label class="col-sm-3">Tên thành phố:</label>
						<div class="col-sm-3">
							<input class="input" type="text" ng-model="self.entity.tenTP" maxlength="254"/>
						</div>
					</td>
					<td>
						<input class="input" type="hidden" ng-model="self.entity.addOrUpdate" />
					</td>
				</tr>
			</table>
		</form>
	</div>
	<br/>
	<div class="modal-footer" align="center">
		<button class="btn btn-primary" ng-click="self.saveData()"
			ng-disabled="(cuaKhaunnVnaccsForm.maCang.$error.required && cuaKhaunnVnaccsForm.maCang.$invalid) 
      			|| (cuaKhaunnVnaccsForm.maNuoc.$error.required && cuaKhaunnVnaccsForm.maNuoc.$invalid)">Lưu</button>
		<button class="btn btn-primary" ng-click="self.cancel()">Hủy bỏ</button>
	</div>
</div>