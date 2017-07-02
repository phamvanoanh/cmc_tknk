<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link href="<c:url value='/static/css/file_upload.css'/>" rel="stylesheet" type="text/css">
<script src="<c:url value='/static/js/controller/uploadFileCauTrucController.js'/>"></script>
<script src="<c:url value='/static/js/service/uploadFilePCauTrucService.js'/>"></script>

<div ng-app="myApp" class="content-wrapper" ng-controller="displayFileCauTrucController" ng-cloak>
	<section class="content-header panel panel-success">
		<h5 class="title">Danh sách tệp tin đã tải</h5>
	</section>
	<form class="form-search">
		<table style="margin-top:12px;width:900px">
			<tr>
			<td class="col-md-5">
				<label class="col-md-2">Chủ đề:</label>
				<div class="col-md-4">
					<select class="form-control"
							ng-model="chuDe"
							ng-change="selectTile(chuDe)">
							<option value="1">Dầu Thô</option>
							<option value="2">Chuyển phát nhanh</option>
							<option value="3">Phương tiện xuất nhập cảnh</option>
					</select>
				</div>
			</td>
			</tr>
		</table>
		<div class="col-md-12 pgcount">
			<h5 class="col-md-4" style="font-family: inherit;">Tổng số {{listFilePhiCauTrucs.length}} bản ghi</h5>
		</div>
	</form>
	<table class="table table-bordered table-striped">
		<thead>
			<tr>
				<th>STT</th>
				<th>Tệp tin</th>
				<th>Mô Tả</th>
				<th>Ngày tải lên</th>
				<th>Người tải lên</th>
				<th>Tải về</th>
				<th>Xóa</th>
			</tr>
		</thead>
		<tbody >
			<tr ng-repeat="file in phantrang | orderBy: '-updateLoadDate'">
				<td align="center">{{(currentPage - 1) * numPerPage + ($index + 1)}}</td>
				<td align="left">{{file.fileName}}</td>
				<td align="left">{{file.fileDescription}}</td>
				<td align="center">{{file.updateLoadDate}}</td>
				<td align="left">{{file.nguoiTaiLen}}</td> 
				<td align="center"><a ng-click="doDownloadFile(file.fileId)"><i class="fa fa-download" style="color:blue"></i></a></td>
				<td align="center"><a ng-click="doDeleteFile(file.fileId)"><i class="fa fa-remove" style="color:red" "></i></a></td>
			</tr>
		</tbody>
	</table>
	<div class="col-md-12">
		<div class="col-md-2" style="margin-top: 25px;">Trang {{currentPage}} / {{totalPage}}</div>
		<div class="col-md-6">
			<pagination total-items="listFilePhiCauTrucs.length"
				ng-change="pageChanged(currentPage)" ng-model="currentPage"
				max-size="maxSize" class="pagination" boundary-links="true"
				rotate="false"></pagination>
		</div>
		<div class="col-md-4 row action" style="margin-top: 21px;margin-left: -213px;">
			<button type="button" class="btn btn-primary" ng-click="doOpenUploadFile()">Tải tệp tin</button>
		</div>
	</div>
	<div style="width: 100%;" ng-show="showReport" class="row showReport">
		<iframe id="frReport" ng-src="{{srcReport}}" class="" style="display: block; width: 100%; height: 600px;"></iframe>
	</div>
</div>