<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div>
  <div class="modal-header">
      <h4 class="modal-title">Thêm mới/Cập nhật Biểu thuế</h4>
  </div>
  <div class="modal-body">
  	<div id ="messageArea" class="messageArea"></div>
	<div id="messageErrorArea" class="messageErrorArea" ng-model="showError"></div>
    <form name="bieuThueForm">
		<div class="row mab10">
	  		<label class="col-md-3">Mã biểu thuế *</label>
	  		<div class="col-md-5 pa0">
	  			<input class="form-control" type="text" name="maBieuThue" ng-model="self.entity.maBieuThue" required
	  				maxlength="12"/>
	  		</div>
	  		<span ng-show="bieuThueForm.maBieuThue.$error.required" class="col-md-4 input-warning">Mã biểu thuế là bắt buộc</span>
		</div>
		<div class="row mab10">
	  		<label class="col-md-3">Tên biểu thuế</label>
	  		<div class="col-md-5 pa0">
	  			<input class="form-control" type="text" name="tenBieuThue" ng-model="self.entity.tenBieuThue"/>
	  		</div>
		</div>
		<div class="row mab10">
	  		<label class="col-md-3">Thuế suất *</label>
	  		<div class="col-md-5 pa0">
	  			<input class="form-control" type="text" name="thueSuat" ng-model="self.entity.thueSuat" maxlength="10" 
	  				only-digits required/>
	  		</div>
	  		<span ng-show="bieuThueForm.thueSuat.$error.required" class="col-md-4 input-warning">Thuế suất là bắt buộc</span>
		</div>
		<div class="row mab10">
	  		<label class="col-md-3">Kiểu biểu thuế *</label>
	  		<div class="col-md-5 pa0">
	  			<input class="form-control" type="text" name="kieuBieuThue" ng-model="self.entity.kieuBieuThue" maxlength="10" 
	  				only-digits required/>
	  		</div>
	  		<span ng-show="bieuThueForm.kieuBieuThue.$error.required" class="col-md-4 input-warning">Kiểu biểu thuế là bắt buộc</span>
		</div>
		<div class="row mab10">
	  		<label class="col-md-3">Mã hàng hóa *</label>
	  		<div class="col-md-5 pa0">
	  			<input class="form-control" type="text" name="maHS" ng-model="self.entity.maHS" required
	  				maxlength="12"/>
	  		</div>
	  		<span ng-show="bieuThueForm.maHS.$error.required" class="col-md-4 input-warning">Mã hàng hóa là bắt buộc</span>
		</div>
		<div class="row mab10">
	  		<label class="col-md-3">Ngày hiệu lực *</label>
  			<div class="col-md-5 pa0">
		  		<input type="text" name="ngayHL" class="form-control" uib-datepicker-popup="" ng-model="self.entity.ngayHL"
		  			is-open="popup1.opened" datepicker-options="dateOptions" ng-required="true" close-text="Close"
		  			datepicker-Manually/>
          	</div>
          	<span class="col-md-2 input-group-btn">
	        	<button type="button" class="btn btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button>
	        </span>
          	<span ng-show="bieuThueForm.ngayHL.$error.required" class="col-md-4 input-warning">Ngày có hiệu lực là bắt buộc</span>
		</div>
		<div class="row">
	  		<label class="col-md-3">Ngày hết hiệu lực *</label>
  			<div class="col-md-5 pa0">
		  		<input type="text" name="ngayHHL" class="form-control" uib-datepicker-popup="" ng-model="self.entity.ngayHHL"
		  			is-open="popup2.opened" datepicker-options="dateOptions" ng-required="true" close-text="Close"
		  			datepicker-Manually/>
          	</div>
          	<span class="col-md-2 input-group-btn">
	        	<button type="button" class="btn btn-default" ng-click="open2()"><i class="glyphicon glyphicon-calendar"></i></button>
	        </span>
          	<span ng-show="bieuThueForm.ngayHHL.$error.required" class="col-md-4 input-warning">Ngày hết hiệu lực là bắt buộc</span>
		</div>		
	</form>
  </div>
  <div class="modal-footer">
      <button class="btn btn-primary" ng-click="self.saveData()"
      	ng-disabled="(bieuThueForm.maBieuThue.$error.required && bieuThueForm.maBieuThue.$invalid) 
      		|| (bieuThueForm.thueSuat.$error.required && bieuThueForm.thueSuat.$invalid)
      		|| (bieuThueForm.kieuBieuThue.$error.required && bieuThueForm.kieuBieuThue.$invalid)
      		|| (bieuThueForm.maHS.$error.required && bieuThueForm.maHS.$invalid)
      		|| (bieuThueForm.ngayHL.$error.required && bieuThueForm.ngayHL.$invalid)
      		|| (bieuThueForm.ngayHHL.$error.required && bieuThueForm.ngayHHL.$invalid)">Lưu</button>
      <button class="btn btn-primary" ng-click="self.cancel()">Hủy bỏ</button>
  </div>
</div>