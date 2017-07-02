<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div id="myModal" role="dialog" style="height: 270px;width:600px;margin:auto;background-color:aliceblue">
	<section class="content-header panel panel-success">
		<h4 class="modal-title" >{{title}}</h4>
	</section>
	<section class="content">
	<div class="modal-body">
		<form name="uploadFileForm"  ng-submit="doUploadFile()">
			<fieldset class="form-group form-wrapper">
			<table style="width: 100%;height: 125px;">
				<tr >
					<td class="col-md-3">
						<label class="col-md-2">Chủ đề:</label>
						<div class="col-md-8">
							<select class="form-control" ng-model="chuDe" ng-change="disableEvent()">
								<option value="1">Mặt hàng</option>
								<option value="2">Thị trường</option>
							</select>
						</div>
					</td>	
				</tr>
				<tr>
					<td class="col-md-3">
						<label class="col-md-2">Tệp tin:</label>
						<div class="col-md-8 fileContainer">
							<div class="col-md-4 file-input">
								<a class="btn btn-default btn-file" type="button" onclick="document.getElementById('file').click(); return false;">Chọn tệp tin</a>
								 <input id="file" name="file" file-model="myFile" type="file" style="visibility: hidden; display: none;" onchange="angular.element(this).scope().handleFile(this)" />
							 </div>
							 <label for="file" class="col-md-6 lable-file">{{nameFile}}</label>
						</div>
					</td>
				</tr>
				<tr>
					<td class="col-md-3">
						<label class="col-md-2">Mô tả:</label>
						<div class="col-md-4">
							<textarea  rows="3" cols="54"  ng-model="moTa" ng-change="disableEvent()"></textarea>
						</div>
					</td>
				</tr>
			</table>
			</fieldset>
		</form>
		<div class="btnMobal" style="margin-top: 10px;text-align: center;">
			<button type="submit" class="btn btn-primary" ng-disabled="disbleBtn" ng-click="doUploadFile()">Tải tệp tin</button>
			<button class="btn btn-primary thoat" ng-click="doCancel()" style="width: 84px;">Thoát</button>
		</div>
	</div>
	</section>
</div>