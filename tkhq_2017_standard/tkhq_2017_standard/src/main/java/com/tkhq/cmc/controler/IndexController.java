package com.tkhq.cmc.controler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

	@RequestMapping(value="/index",method= RequestMethod.GET)
	public String index(){
		return "index";
	}
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home() {
		return "home";
	}

	@RequestMapping(value = "/dm_tonghop", method = RequestMethod.GET)
	public String danhmuc() {
		return "dm_tonghop";
	}
	@RequestMapping(value = "/dm_quytac", method = RequestMethod.GET)
	public String danhmucquytac() {
		return "dm_quytac";
	}
	@RequestMapping(value = "/bieuThueEdit", method = RequestMethod.GET)
	public String showBieuThueEdit() {
		return "bieuThueEdit";
	}

	@RequestMapping(value = "/tinhTPEdit", method = RequestMethod.GET)
	public String showTinhTPEdit() {
		return "tinhTPEdit";
	}

	@RequestMapping(value = "/dmCuaKhauNN", method = RequestMethod.GET)
	public String danhmucCuaKhau() {
		return "cuakhaunnVnaccs/dm_cuakhaunn";
	}

//	@RequestMapping(value = "/cuaKhaunnVnaccsEdit", method = RequestMethod.GET)
//	public String cuaKhaunnVnaccsEditPopup() {
//		return "cuakhaunnVnaccs/cuaKhaunnVnaccsEdit";
//	}

	@RequestMapping(value = "/dmDvtVnaccs", method = RequestMethod.GET)
	public String danhmucDvtVnaccs() {
		return "dvtVnaccs/tbsDvtVnaccs";
	}

	@RequestMapping(value = "/dvtVnaccsEdit", method = RequestMethod.GET)
	public String dvtVnaccsEditPopup() {
		return "dvtVnaccsEdit";
	}

	@RequestMapping(value = "/mahs_dkgh", method = RequestMethod.GET)
	public String mahs_dkgh() {
		return "mahs_dkgh/tbs_mahs_dkghMaster";
	}

	@RequestMapping(value = "/mahs_dkghEdit", method = RequestMethod.GET)
	public String mahs_dkghEdit() {
		return "mahs_dkgh/Mahs_dkghEdit";
	}

	@RequestMapping(value = "/tbsCapnhatTygia", method = RequestMethod.GET)
	public String danhmucTygia() {
		return "tyGia/tbsCapnhatTygia";
	}

	@RequestMapping(value = "/tygiaEdit", method = RequestMethod.GET)
	public String tygiaEditPopup() {
		return "tygiaEdit";
	}

	@RequestMapping(value = "/thayDoiBoSungToKhaiHeThong", method = RequestMethod.GET)
	public String thayDoiBosungToKhaiHeThong() {
		return "thayDoiBoSungToKhaiHeThong";
	}

	@RequestMapping(value = "/thayDoiDoNVHQ", method = RequestMethod.GET)
	public String thayDoiDoNVHQ() {
		return "thayDoiDoNVHQ";
	}

	@RequestMapping(value = "/dienBienSoLieuChiTieuTK", method = RequestMethod.GET)
	public String dienBienSoLieuChiTieuTK() {
		return "dienBienSoLieuChiTieuTK";// "dienBienSoLieuChiTieuTK/dienBienSoLieuChiTieuTK_home";
	}

	@RequestMapping(value = "/phanHoiQuyTrinhXLDL", method = RequestMethod.GET)
	public String phanHoiQuyTrinhXLDL() {
		return "phanHoiQuyTrinhXLDL";
	}

	@RequestMapping(value = "/XemThayDoi", method = RequestMethod.GET)
	public String thaydoiBSTT() {
		return "thaydoiBSTT";
	}

	@RequestMapping(value = "/thayDoiDoTHQTNV", method = RequestMethod.GET)
	public String thayDoiDoTHQTNV() {
		return "thayDoiDoTHQTNV";
	}

	@RequestMapping(value = "/dmCangNN", method = RequestMethod.GET)
	public String danhmucCang() {
		return "dmCangNN";
	}

	@RequestMapping(value = "/cangnnVnaccsEdit", method = RequestMethod.GET)
	public String danhmucCangEdit() {
		return "cangnnVnaccsEdit";
	}

	@RequestMapping(value = "/dmchuyende", method = RequestMethod.GET)
	public String danhmucChuyenDe() {
		return "dmchuyende";
	}

	@RequestMapping(value = "/chuyendeEdit", method = RequestMethod.GET)
	public String danhmucChuyenDeEditPopup() {
		return "chuyendeEdit";
	}

	@RequestMapping(value = "/HTCBBTSL", method = RequestMethod.GET)
	public String HTCBBTSL() {
		return "HTCBBTSL";
	}

	@RequestMapping(value = "/HTCBTGTXNK", method = RequestMethod.GET)
	public String HTCBTGTXNK() {
		return "HTCBTGTXNK";
	}

	@RequestMapping(value = "/canhBaoDienbienSLTK", method = RequestMethod.GET)
	public String canhBaoDienbienSLTK() {
		return "canhBaoDienbienSLTK";
	}

	@RequestMapping(value = "/dienBienXuTheChiSo", method = RequestMethod.GET)
	public String dienBienXuTheChiSo() {
		return "dienBienXuTheChiSo";
	}

	@RequestMapping(value = "/HTCBBTGTMHSITC", method = RequestMethod.GET)
	public String HTCBBTGTMHSITC() {
		return "HTCBBTGTMHSITC";
	}

	@RequestMapping(value = "/HTCBBTDBXTL", method = RequestMethod.GET)
	public String HTCBBTDBXTL() {
		return "HTCBBTDBXTL";
	}

	@RequestMapping(value = "/dienBienSLDoanhNghiepFDI", method = RequestMethod.GET)
	public String dienBienSLDoanhNghiepFDI() {
		return "dienBienSLDoanhNghiepFDI";
	}

	@RequestMapping(value = "/dienBienXNKVanTai", method = RequestMethod.GET)
	public String dienBienXNKVanTai() {
		return "dienBienXNKVanTai";
	}

	@RequestMapping(value = "/dienbienHHXNK", method = RequestMethod.GET)
	public String dienbienhanghoaXNK() {
		return "dienbienHHXNK";
	}

	@RequestMapping(value="/danhsachNSD",method = RequestMethod.GET)
	public String danhsachNSD()
	{
		return "danhsachNSD";
	}
	@RequestMapping(value="/danhsachNhomNSD",method = RequestMethod.GET)
	public String danhsachNhomNSD()
	{
		return "danhsachNhomNSD";
	}
	@RequestMapping(value="/phanquyenNSD",method = RequestMethod.GET)
	public String phanquyenNSD()
	{
		return "phanquyenNSD";
	}
	@RequestMapping(value="/themnguoidung",method = RequestMethod.GET)
	public String themnguoidung()
	{
		return "themnguoidung";
	}
	@RequestMapping(value="/themnhomNSD",method = RequestMethod.GET)
	public String themnhomNSD()
	{
		return "themnhomNSD";
	}
	@RequestMapping(value="/quanlynhomNSD",method = RequestMethod.GET)
	public String quanlynhomNSD()
	{
		return "quanlynhomNSD";
	}

	@RequestMapping(value="/pageReportChart",method=RequestMethod.GET)
	public String pageReportChart(){
		return "pageReportChart";
	}
	
	@RequestMapping(value="/qlUserSDTK",method = RequestMethod.GET)
	public String qlUserSDTK()
	{
		return "qlUserSDTK";
	}
	
	@RequestMapping(value="/EditUserSDTK",method = RequestMethod.GET)
	public String EditUserSDTK()
	{
		return "EditUserSDTK";
	}
	
	@RequestMapping(value = "/canhBaoTriGiaMHPTHS", method = RequestMethod.GET)
	public String canhBaoTriGiaMHPTHS() {
		return "canhBaoTriGiaMHPTHS";
	}

	@RequestMapping(value = "/canhBaoTriGiaTT", method = RequestMethod.GET)
	public String canhBaoTriGiaTT() {
		return "canhBaoTriGiaTT";
	}

	@RequestMapping(value = "/HTCBBTTGXNKHQ", method = RequestMethod.GET)
	public String HTCBBTTGXNKHQ() {
		return "HTCBBTTGXNKHQ";
	}
	@RequestMapping(value = "/HTCBBTTGXNKHQBieuDo", method = RequestMethod.GET)
	public String HTCBBTTGXNKHQBieuDo() {
		return "HTCBBTTGXNKHQBieuDo";
	}
	@RequestMapping(value = "/canhBaoTriGiaXNKTTP", method = RequestMethod.GET)
	public String canhBaoTriGiaXNKTTP() {
		return "canhBaoTriGiaXNKTTP";
	}

	@RequestMapping(value = "/canhBaoSoTKTTG", method = RequestMethod.GET)
	public String canhBaoSoTKTTG() {
		return "canhBaoSoTKTTG";
	}
	@RequestMapping(value="/HTCBBTTTCK",method=RequestMethod.GET)
	public String HTCBBTTTCK(){
		return "HTCBBTTTCK";
	}
	@RequestMapping(value="/phobienbangbieu",method=RequestMethod.GET)
	public String phobienbangbieu(){
		return "phobienbangbieu";
	}
	@RequestMapping(value="/phobienbangbieuQD15",method=RequestMethod.GET)
	public String phobienbangbieuQD15(){
		return "phobienbangbieuQD15";
	}
	@RequestMapping(value="/phobienbangbieuBTC",method=RequestMethod.GET)
	public String phobienbangbieuBTC(){
		return "phobienbangbieuBTC";
	}
	@RequestMapping(value="/phobienbangbieuTC",method=RequestMethod.GET)
	public String phobienbangbieuTC(){
		return "phobienbangbieuTC";
	}
	@RequestMapping(value="/phobienbangbieuCQK",method=RequestMethod.GET)
	public String phobienbangbieuCQK(){
		return "phobienbangbieuCQK";
	}
	@RequestMapping(value="/phobienbangbieuCHQ",method=RequestMethod.GET)
	public String phobienbangbieuCHQ(){
		return "phobienbangbieuCHQ";
	}
	@RequestMapping(value="/pageReport",method=RequestMethod.GET)
	public String pageReport(){
		return "pageReport";
	}

	
	@RequestMapping(value="/errors",method=RequestMethod.GET)
	public String errors(){
		return "errors";
	}

	
	@RequestMapping(value="/dienBienSoLieuChiTieuTK_chart",method=RequestMethod.GET)
	public String dienBienSoLieuChiTieuTK_chart(){
		return "dienBienSoLieuChiTieuTK_chart";
	}
	
	@RequestMapping(value="/HTCBBTGTMHSITCBieuDo",method=RequestMethod.GET)
	public String HTCBBTGTMHSITCBieuDo(){
		return "HTCBBTGTMHSITCBieuDo";
	}
	@RequestMapping(value="/HTCBBTDBXTLBieuDo",method=RequestMethod.GET)
	public String HTCBBTDBXTLBieuDo(){
		return "HTCBBTDBXTLBieuDo";
	}
	
	@RequestMapping(value="/canhBaoTriGiaMHPTHSBD",method=RequestMethod.GET)
	public String canhBaoTriGiaMHPTHSBD(){
		return "canhBaoTriGiaMHPTHSBD";
	}
	
	@RequestMapping(value="/dienBienSLDoanhNghiepFDI_chart",method=RequestMethod.GET)
	public String dienBienSLDoanhNghiepFDI_chart(){
		return "dienBienSLDoanhNghiepFDI_chart";
	}
	
	@RequestMapping(value="/dienBienXNKVanTai_chart",method=RequestMethod.GET)
	public String dienBienXNKVanTai_chart(){
		return "dienBienXNKVanTai_chart";
	}
	
	@RequestMapping(value="/HTCBTGTXNKBieuDo",method=RequestMethod.GET)
	public String HTCBTGTXNKBieuDo(){
		return "HTCBTGTXNKBieuDo";
	}
	
	@RequestMapping(value="/canhBaoTriGiaTTBD",method=RequestMethod.GET)
	public String canhBaoTriGiaTTBD(){
		return "canhBaoTriGiaTTBD";
	}
	
	@RequestMapping(value="/canhBaoTriGiaXNKTTPBD",method=RequestMethod.GET)
	public String canhBaoTriGiaXNKTTPBD(){
		return "canhBaoTriGiaXNKTTPBD";
	}

	@RequestMapping(value="/canhBao_SLToKhaiXNK_chart",method=RequestMethod.GET)
	public String canhBao_SLToKhaiXNK_chart(){
		return "canhBao_SLToKhaiXNK_chart";
	}
	
	@RequestMapping(value="/HTCBTGTXNK_chart",method=RequestMethod.GET)
	public String HTCBTGTXNK_chart(){
		return "HTCBTGTXNK_chart";
	}
	
	@RequestMapping(value="/dienBienHangHoaXNK_chart",method=RequestMethod.GET)
	public String dienBienHangHoaXNK_chart(){
		return "dienBienHangHoaXNK_chart";
	}
	
	@RequestMapping(value="/dienBienXuTheChiSo_chart",method=RequestMethod.GET)
	public String dienBienXuTheChiSo_chart(){
		return "dienBienXuTheChiSo_chart";
	}
	
	@RequestMapping(value="/HTCBBTTTCKBieuDo",method=RequestMethod.GET)
	public String HTCBBTTTCKBieuDo(){
		return "HTCBBTTTCKBieuDo";
	}

	@RequestMapping(value="/pheDuyetKhaiThacDuLieu", method=RequestMethod.GET)
	public String pheDuyetKhaiThacDuLieu(){
		return "pheDuyetKhaiThacDuLieu";
	}
	
	@RequestMapping(value="/ReportPheDuyetKTDL", method=RequestMethod.GET)
	public String reportPheDuyetKTDL(){
		return "ReportPheDuyetKTDL";
	}
	
	@RequestMapping(value="/hoanThanhRaXoatSanPhamTK", method=RequestMethod.GET)
	public String hoanThanhRaXoatSanPhamTK(){
		return "hoanThanhRaXoatSanPhamThongKeDauRaMaster";
	}
	
	@RequestMapping(value = "/canhBaoSoTKTTGBD", method = RequestMethod.GET)
	public String canhBaoSoTKTTGBD() {
		return "canhBaoSoTKTTGBD";
	}
	
	@RequestMapping(value="/uploadFilePhiCauTrucXuatKhau", method=RequestMethod.GET)
	public String uploadFileXuatKhau(){
		return "displayImportFilePhiCauTruc";
	}
	
	@RequestMapping(value="/uploadFilePhiCauTrucNhapKhau", method=RequestMethod.GET)
	public String uploadFileNhapKhau(){
		return "displayImportFilePhiCauTruc";
	}
	
	@RequestMapping(value="/importFilePhiCauTrucHome", method=RequestMethod.GET)
	public String displayModalUpload(){
		return "importFilePhiCauTrucHome";
	}
	
	@RequestMapping(value = "/lichCBTTTK", method = RequestMethod.GET)
	public String lichCBTTTK() {
		return "lichCBTTTK";
	}
	@RequestMapping(value = "/doimatkhau", method = RequestMethod.GET)
	public String doimatkhau() {
		return "doimatkhau";
	}
	
	@RequestMapping(value = "/rasoatqd15", method = RequestMethod.GET)
	public String rasoatqd15() {
		return "rasoatqd15";
	}
	
	@RequestMapping(value = "/rasoatbaocaokhac", method = RequestMethod.GET)
	public String rasoatbaocaokhac() {
		return "rasoatbaocaokhac";
	}

	@RequestMapping(value="/pageReport_thayDoiBosungTokhaiHeThong",method=RequestMethod.GET)
	public String pageReport_thayDoiBosungTokhaiHeThong(){
		return "pageReport_thayDoiBosungTokhaiHeThong";
	}
	
	@RequestMapping(value="/uploadFileCauTrucXuatKhau", method=RequestMethod.GET)
	public String uploadFileCauTrucXuatKhau(){
		return "displayFileCauTrucScreen";
	}
	
	@RequestMapping(value="/uploadFileCauTrucNhapKhau", method=RequestMethod.GET)
	public String uploadFileCauTrucNhapKhau(){
		return "displayFileCauTrucScreen";
	}
	
	@RequestMapping(value="/uploadFileCauTruc", method=RequestMethod.GET)
	public String uploadFileCauTruc(){
		return "uploadFileCauTrucScreen";
	}
	
	@RequestMapping(value = "/thaoTacFileCauTruc/{chuDe}/{typeNhapXuat}", method = RequestMethod.GET)
	public String thietLapFileCauTruc(@PathVariable(value="chuDe") String chuDe,  @PathVariable("typeNhapXuat") String typeNhapXuat) {
		return "thaoTacFileCauTrucScreen";
	}
	
	@RequestMapping(value = "/QLLDTPB", method = RequestMethod.GET)
	public String QLLDTPB() {
		return "QLLDTPB";
	}

	@RequestMapping(value ="/quanLyToChucCaNhanTK", method = RequestMethod.GET)
	public String displayQuanLyToChucCaNhan(){
		return "quanLyToChucCaNhanTK";
	}
	
	@RequestMapping(value="/Report",method=RequestMethod.GET)
	public String report(){
		return "Report";
	}
	
	@RequestMapping(value="/phobienbangbieuSP",method=RequestMethod.GET)
	public String phobienbangbieuSP(){
		return "phobienbangbieuSP";
	}
	
	@RequestMapping(value="/quanLyNhatKyHT",method=RequestMethod.GET)
	public String quanLyNhatKyHT (){
		return "QuanLyNhatKyHT";
	}
	
	@RequestMapping(value="/ReportQuanLyNhatKyHT",method=RequestMethod.GET)
	public String ReportQuanLyNhatKyHT(){
		return "ReportQuanLyNhatKyHT";
	}
	
	@RequestMapping(value="/lockUsers",method=RequestMethod.GET)
	public String listLockUsers(){
		return "deleteLockUsers";
	}
	@RequestMapping(value="thietlapthamso",method = RequestMethod.GET)
	public String thietlapthamso(){
		return "thietlapthamso";
	}
	
	@RequestMapping(value = "/cuaKhaunnVnaccsEdit", method = RequestMethod.GET)
	public String cuaKhaunnVnaccsEdit() {
		return "cuaKhaunnVnaccsEdit";
	}
	

	@RequestMapping(value="/phanCong",method=RequestMethod.GET)
	public String phanCongCongViec(){
		return "phanCong";
	}

	@RequestMapping(value="/phanCong/back/{maCv}/{typeNhapXuat}", method=RequestMethod.GET)
	public String phanCongCongViecBack(@PathVariable(value="maCv") String maCv,  @PathVariable("typeNhapXuat") String typeNhapXuat){
		return "phanCong";
	}

	@RequestMapping(value="/thaydoiCongViec",method=RequestMethod.GET)
	public String thaydoiCongViec(){
		return "thaydoiCongViec";
	}
	
	@RequestMapping(value="/ReportPhanCong",method=RequestMethod.GET)
	public String ReportPhanCong(){
		return "ReportPhanCong";
	}
	
	@RequestMapping(value="/danhsachcongviec",method=RequestMethod.GET)
	public String danhsachcongviec(){
		return "danhsachcongviec";
	}
	
	
}
