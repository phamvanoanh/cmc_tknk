<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div id="myModal" class="modal fade" role="dialog">
	<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Phản hồi quy trình xử lý dữ liệu chi
					tiết</h4>
			</div>
			<div class="modal-body">
				<div class="block">
					<label class="col-sm-4">Nội dung:</label>
					<textarea class="form-control" id="noiDung" rows="5" ng-focus="focus=true" ng-blur="focus=false"
						ng-model="noiDung" value="noiDung" maxlength="255" placeholder='Phản hồi BC{{loai_bc}}...'></textarea>

				</div>
				</br>
				<!-- <div>
					<label class="col-sm-4">Công chức quản lý:</label>
					<div class="col-sm-5">
						<select class="form-control"
							ng-options="item as item.username for item in lstManager"
							ng-model="manager" id="manager"></select>
					</div>
				</div> -->
				</br>
				<div>
					<label class="col-sm-4">Thông tin phản hồi</label>
				</div>
				<div>
					<form name="phanHoiQuyTrinhXLDLForm">
						<table class="table table-bordered" style="width: 100%">
							<thead>
								<tr>
									<th>Nội dung</th>
									<th>Người sử dụng</th>
									<th>Thời gian</th>
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat="row in lstTTPhanHoi">
									<td ng-bind="row.noidung"></td>
									<td ng-bind="row.username"></td>
									<td ng-bind="row.thoigian"></td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
			<!-- <div class="modal-footer" align="center"> -->
			<div align="center">
				<button class="btn btn-primary" ng-click="btnChuyen_Click()">Chuyển</button>
				<button type="btn btn-primary" class="btn btn-primary"
					data-dismiss="modal">Đóng</button>
			</div>
			<br />
		</div>
	</div>
</div>