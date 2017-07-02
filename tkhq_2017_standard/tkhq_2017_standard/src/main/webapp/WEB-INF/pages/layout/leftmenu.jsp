<%@page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript"
	src="<c:url value='/static/js/ddsmoothmenu.js' />"></script>

<link rel="stylesheet" type="text/css"
	href="<c:url value='/static/css/ddsmoothmenu.css' />">
<link rel="stylesheet" type="text/css"
	href="<c:url value='/static/css/ddsmoothmenu-v.css' />">
<script type="text/javascript">
	ddsmoothmenu.init({
		mainmenuid : "smoothmenu1", //menu DIV id
		orientation : 'h', //Horizontal or vertical menu: Set to "h" or "v"
		classname : 'ddsmoothmenu', //class added to menu's outer DIV
		//customtheme: ["#1c5a80", "#18374a"],
		contentsource : "markup" //"markup" or ["container_id", "path_to_menu_file"]
	})
	function redirectPage(page) {
		window.location.href = "${pageContext.request.contextPath}" + "/"
				+ page;
	};
	
	function downloadfile(url){
		window.location.assign("${pageContext.request.contextPath}" +"/"+ url);
	};
</script>
<style>
.menu-2 li {
	position: fixed !important;
}
/*  .menu-1 li {
	min-width: 310px;
}



.menu-3 li {
	min-width: 400px;
}

.menu-4 li {
	min-width: 505px;
} */ 
</style>
<aside style="margin-bottom: 1px;">
	<!-- sidebar: style can be found in sidebar.less -->
	<section class="">
		<div id="smoothmenu1" class="ddsmoothmenu">
			<ul>
				<li><a href="#" style="text-align: center">1.Quản trị hệ thống</a>
					<ul>
						<li><a href="#" onclick="redirectPage('danhsachNhomNSD')">1.1.Danh sách nhóm</a></li>
						<li><a href="#" onclick="redirectPage('danhsachNSD')">1.2.Danh sách người dùng</a></li>
						<li><a href="#"
							onclick="redirectPage('pheDuyetKhaiThacDuLieu')">1.3.Phê duyệt khai thác dữ liệu</a></li>
						<li><a href="#"
							onclick="redirectPage('quanLyToChucCaNhanTK')">1.4.Quản lý tổ chức cá nhân làm công tác thống kê</a></li>
						<li><a href="#" onclick="redirectPage('qlUserSDTK')">1.5.Quản lý cá nhân tổ chức sử dụng sản phẩm thống kê</a></li>
						<li><a href="#" onclick="redirectPage('phanquyenNSD')">1.6.Phân quyền người dùng</a></li>
						<li><a href="#" onclick="redirectPage('quanLyNhatKyHT')">1.7.Quản lý nhật ký hệ thống</a></li>
						<li><a href="#" onclick="redirectPage('lockUsers')">1.8.Xóa và cảnh báo người sử dụng treo</a></li>
						<li><a href="#" >1.9.Quản lý bảng, danh mục thống kê tiêu chuẩn</a>
						<ul>
								<li ><a href="#" onclick="redirectPage('dm_tonghop')">1.9.1.Danh mục thống kê tiêu chuẩn</a></li>
								<li ><a href="#" onclick="redirectPage('dm_quytac')">1.9.2.Danh mục quy tắc đánh giá chất lượng dữ liệu</a></li>
							</ul>
						</li>
						<li><a href="#" onclick="redirectPage('thietlapthamso')">1.10.Quản lý thiết lập tham số</a></li>
						<li><a href="#" onclick="redirectPage('phanCong')">1.11.Phân công công việc</a></li>
					</ul></li>
				<li><a href="#" style="text-align: center">2.Thu thập dữ liệu</a>
					<ul>
						<li><a href="#"
							onclick="redirectPage('uploadFileCauTrucXuatKhau')">2.1.Nhập import) file dữ liệu xuất khẩu đầu vào có cấu trúc </a></li>
						<li><a href="#"
							onclick="redirectPage('uploadFileCauTrucNhapKhau')">2.2.Nhập (import) file dữ liệu nhập khẩu đầu vào có cấu trúc</a></li>
						<li><a href="#"
							onclick="redirectPage('uploadFilePhiCauTrucXuatKhau')">2.3.Nhập (import) file phi/không có cấu trúc có các thông tin liên quan đến hàng hóa xuất khẩu</a></li>
						<li><a href="#"
							onclick="redirectPage('uploadFilePhiCauTrucNhapKhau')">2.4.Nhập (import) file phi/không có cấu trúc có các thông tin liên quan đến hàng hóa nhập khẩu</a></li>
					</ul></li>
				<li><a href="#" style="text-align: center">3.Phân tích dữ
						liệu tổng hợp</a>
					<ul>
						<li><a href="#">3.1.Phân tích thay đổi của dữ liệu</a>
							<ul>
								<li ><a href="#" onclick="redirectPage('thayDoiDoNVHQ')">3.1.1.Thay đổi do nghiệp vụ hải quan</a></li>
								<li ><a href="#"
									onclick="redirectPage('thayDoiBoSungToKhaiHeThong')">3.1.2.Thay đổi do bổ sung tờ khai từ các hệ thống </a></li>
								<li><a href="#" onclick="redirectPage('XemThayDoi')">3.1.3.Thay đổi do bổ sung thông tin nhập và cập nhật </a></li>
								<li><a href="#" onclick="redirectPage('thayDoiDoTHQTNV')">3.1.4.Thay đổi do thực hiện các quy trình, nghiệp vụ, bước nghiệp vụ thống kê   </a></li>
							</ul></li>
						<li><a href="thayDoiBoSungToKhaiHeThong">3.2. Phân tích dữ
								liệu sử dụng bảng biểu</a>
							<ul>
								<li><a href="#"
									onclick="redirectPage('dienBienSoLieuChiTieuTK')">3.2.1.Diễn
										biến số liệu theo chỉ tiêu Thống kê tổng hợp theo thời gian</a></li>
								<li><a href="#"
									onclick="redirectPage('canhBaoDienbienSLTK')">3.2.2.Diễn biến
										số lượng tờ khai theo Cục, Chi cục Hải quan</a></li>
								<li><a href="#" onclick="redirectPage('HTCBTGTXNK')">3.2.3.Diễn biến tổng trị giá xuất nhập khẩu</a></li>
								<li><a href="#" onclick="redirectPage('dienbienHHXNK')">3.2.4.Diễn biến về lượng, đơn giá, trị giá mặt hàng</a></li>
								<li><a href="#"
									onclick="redirectPage('canhBaoTriGiaMHPTHS')">3.2.5.Diễn biến
										về trị giá mặt hàng theo phân tổ theo HS 02, 04 số</a></li>
								<li><a href="#" onclick="redirectPage('HTCBBTGTMHSITC')">3.2.6.Diễn biến về trị giá mặt hàng theo phân tổ SITC</a></li>
								<li><a href="#"
									onclick="redirectPage('dienBienXuTheChiSo')">3.2.7.Diễn biến
										số liệu theo định gốc, liên hoàn</a></li>
								<li><a href="#" onclick="redirectPage('canhBaoTriGiaTT')">3.2.8.Diễn biến về trị giá theo thị trường, khối kinh tế</a></li>
								<li><a href="#" onclick="redirectPage('HTCBBTDBXTL')">3.2.9.Diễn biến về lượng, đơn giá, trị giá mặt hàng của thị trường
										xuất nhập khẩu</a></li>
								<li><a href="#"
									onclick="redirectPage('dienBienSLDoanhNghiepFDI')">3.2.10.Diễn
										biến về lượng, đơn giá, trị giá mặt hàng của các Doanh nghiệp FDI</a></li>
								<li><a href="#"
									onclick="redirectPage('canhBaoTriGiaXNKTTP')">3.2.11.Diễn biến
										về trị giá xuất nhập khẩu của tỉnh, thành phố</a></li>
								<li><a href="#" onclick="redirectPage('HTCBBTTGXNKHQ')">3.2.12.Diễn biến về trị giá XNK của Cục Hải quan, Chi cục Hải quan</a></li>
								<li><a href="#" onclick="redirectPage('dienBienXNKVanTai')">3.2.13.Diễn biến về trị giá XNK theo phương thức vận tải</a></li>
								<li><a href="#" onclick="redirectPage('canhBaoSoTKTTG')">3.2.14.Diễn biến số tờ khai, trị giá theo ngày, tuần, quý, tháng, năm</a></li>
								<li><a href="#" onclick="redirectPage('HTCBBTTTCK')">3.2.15.Diễn biến theo các tiêu chí khác theo chỉ tiêu thống kê</a></li>
							</ul></li>
						<li><a href="bcpt/XemThayDoi">3.3.Phân tích dữ liệu sử
								dụng biểu đồ</a>
							<ul>
								<li><a href="#"
									onclick="redirectPage('dienBienSoLieuChiTieuTK_chart')">3.3.1.Diễn biến số liệu theo chỉ tiêu TK tổng hợp theo thời gian</a></li>
								<li><a href="#"
									onclick="redirectPage('canhBao_SLToKhaiXNK_chart')">3.3.2.Diễn
										biến số lượng tờ khai theo Cục, Chi cục Hải quan</a></li>
								<li><a href="#" onclick="redirectPage('HTCBTGTXNK_chart')">3.3.3.Diễn biến tổng trị giá xuất nhập khẩu</a></li>
								<li><a href="#"
									onclick="redirectPage('dienBienHangHoaXNK_chart')">3.3.4.Diễn
										biến về lượng, đơn giá, trị giá mặt hàng</a></li>
								<li><a href="#"
									onclick="redirectPage('canhBaoTriGiaMHPTHSBD')">3.3.5.Diễn
										biến về trị giá mặt hàng theo phân tổ theo HS 02, 04 số</a></li>
								<li><a href="#"
									onclick="redirectPage('HTCBBTGTMHSITCBieuDo')">3.3.6.Diễn biến
										về trị giá mặt hàng theo phân tổ SITC</a></li>
								<li><a href="#"
									onclick="redirectPage('dienBienXuTheChiSo_chart')">3.3.7.Diễn
										biến số liệu theo định gốc, liên hoàn</a></li>
								<li><a href="#" onclick="redirectPage('canhBaoTriGiaTTBD')">3.3.8.Diễn biến về trị giá theo thị trường, khối kinh tế</a></li>
								<li><a href="#" onclick="redirectPage('HTCBBTDBXTLBieuDo')">3.3.9.Diễn biến về lượng, đơn giá, trị giá mặt hàng của thị trường
										xuất nhập khẩu</a></li>
								<li><a href="#"
									onclick="redirectPage('dienBienSLDoanhNghiepFDI_chart')">3.3.10.Diễn biến về lượng, đơn giá, trị giá mặt hàng của các Doanh nghiệp FDI</a></li>
								<li><a href="#"
									onclick="redirectPage('canhBaoTriGiaXNKTTPBD')">3.3.11.Diễn
										biến về trị giá xuất nhập khẩu của tỉnh, thành phố</a></li>
								<li><a href="#"
									onclick="redirectPage('HTCBBTTGXNKHQBieuDo')">3.3.12.Diễn biến
										về trị giá xuất nhập khẩu của Cục Hải quan, Chi cục Hải quan</a></li>
								<li><a href="#"
									onclick="redirectPage('dienBienXNKVanTai_chart')">3.3.13.Diễn
										biến về trị giá xuất nhập khẩu theo phương thức vận tải</a></li>
								<li><a href="#" onclick="redirectPage('canhBaoSoTKTTGBD')">3.3.14.Diễn biến số tờ khai, trị giá theo ngày, tuần, quý, tháng, năm</a></li>
								<li><a href="#" onclick="redirectPage('HTCBBTTTCKBieuDo')">3.3.15.Diễn biến theo các tiêu chí khác theo chỉ tiêu thống kê</a></li>
							</ul></li>
						<li><a href="#">3.4.Khai thác dữ liệu bằng Pivot table và Dashboard</a></li>
						<li><a href="#">3.5.Rà soát sản phầm thống kê đầu ra</a>
							<ul>
								<li><a href="#" onclick="redirectPage('rasoatqd15')">3.5.1.Rà soát quyết định 15</a></li>
								<li><a href="#" onclick="redirectPage('rasoatbaocaokhac')">3.5.2.Rà soát các báo cáo khác</a></li>
								<li><a href="#"
									onclick="redirectPage('hoanThanhRaXoatSanPhamTK')">3.5.3.Hoàn
										thành rà soát</a></li>
							</ul></li>
					</ul></li>
				<li><a href="#" style="text-align: center">4. Phổ biến thông
						tin thống kê</a>
					<ul >
						<li><a href="#" onclick="redirectPage('lichCBTTTK')">4.1.Lịch công bố thông tin thống kê </a></li>
						<li><a href="#" onclick="redirectPage('QLLDTPB')">4.2.Quản lý của lãnh đạo trước khi phổ biến </a></li>
						<li><a href="#">4.3.Phổ biến trong nước</a>
							<ul>
								<li><a href="#"
									onclick="redirectPage('phobienbangbieuQD15')">4.3.1.Phổ biến
										bảng, biểu số liệu theo quy định trong Quyết định 15/2014 </a></li>
								<li><a href="#"
									onclick="redirectPage('phobienbangbieuBTC')">4.3.2.Phổ biến
										bảng, biểu số liệu theo yêu cầu Bộ Tài chính</a></li>
								<li><a href="#" onclick="redirectPage('phobienbangbieuTC')">4.3.3. Phổ
										biến bảng, biểu số liệu theo yêu cầu Tổng cục Hải quan</a></li>
								<li><a href="#"
									onclick="redirectPage('phobienbangbieuCQK')">4.3.4.Phổ biến
										bảng biểu, số liệu của các bộ, ngành, cơ quan, tổ chức khác</a></li>
								<li><a href="#" onclick="redirectPage('phobienbangbieuSP')">4.3.5. Phổ
										biến song phương, khu vực và quốc tế</a></li>
								<li><a href="#"
									onclick="redirectPage('phobienbangbieuCHQ')">4.3.6.Phổ biến số
										liệu đến các Cục Hải quan</a></li>
							</ul></li>
					</ul></li>
					
					<li><a href="#" style="text-align: center">5.Hỗ trợ người sử dụng</a>
					<ul>
						<li><a href="#" onclick="downloadfile('hotrohethong')">5.1.Hướng dẫn người sử dụng hệ thống </a></li>
						<li><a href="#" onclick="downloadfile('hotrosanpham')">5.2.Hướng dẫn người sử dụng sản phẩm thống kê </a></li>
					</ul></li>
			</ul>
			<br style="clear: left" />
		</div>
	</section>
</aside>


