package com.tkhq.cmc.dao;

import java.util.Date;
import java.util.List;

import com.tkhq.cmc.dto.BCT_BO_NGANH_DNXNK_TRIGIADTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_DSDNXKT_MAHS_THITRUONGDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_DSDNXNKDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_DSDNXNT_MATHANGDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_DSDNXNT_THITRUONGDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_DSDNXN_MSMH_THUYSANDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_MAHANGKB_TRIGIADTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_NHAPKHAU_CHITIET_MATHANG;
import com.tkhq.cmc.dto.BCT_BO_NGANH_NUOC_TRIGIADTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGHHLH_TAIXUATDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGHHT_THITRUONGDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGHHXKT_MAHS_THITRUONGDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGHH_VIETNAM_CHAUMYDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGNK_PHANMEMDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXK_GIAYDEP_LH_DOANHNGHIEPDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXK_TUIXACH_LH_DOANHNGHIEPDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXNT_DONGTIEN_THANHTOANDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXN_MH_CAFEDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXK_MH_HATTIEUDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXN_MOTSO_MAHANGKBDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXN_MOTSO_MATHANGDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXN_MSMH_THUYSANDTO;
import com.tkhq.cmc.dto.BCT_BO_NGANH_TGXN_THEO_NGOAITEDTO;

public interface BaoCaoTheoBoNganhDAO {
	public List<BCT_BO_NGANH_TGHHT_THITRUONGDTO> TS_TGHH_THEO_THITRUONG(final String maHQ ,final int quy, final int nam, final int maThiTruong , final String loaiXN);
	
	public List<BCT_BO_NGANH_DSDNXNT_THITRUONGDTO> TS_DSDNXN_THEO_THITRUONG(final String maHQ ,final int quy, final int nam, final int maThiTruong , final String loaiXN);
	
	public List<BCT_BO_NGANH_TGHH_VIETNAM_CHAUMYDTO> TS_TGHH_VIETNAM_CHAUMY(final String maHQ ,final int thang, final int nam, final String loaiXN);
	
	public List<BCT_BO_NGANH_TGHHLH_TAIXUATDTO> TS_TGHH_LH_TAIXUAT(final String maHQ ,final int thang, final int nam, final String loaiXN);
	
	public List<BCT_BO_NGANH_TGHHXKT_MAHS_THITRUONGDTO> TS_TGHHXK_THEO_MAHS_THITRUONG(final String maHQ ,final int tuNam, final int denNam, final String maHS, final int maThiTruong);
	
	public List<BCT_BO_NGANH_DSDNXKT_MAHS_THITRUONGDTO> TS_DSDNXK_THEO_MAHS_THITRUONG(final String maHQ ,final int tuNam, final int denNam, final String maHS, final int maThiTruong);
	
	public List<BCT_BO_NGANH_NHAPKHAU_CHITIET_MATHANG> TS_NHAPKHAU_CHITIET_MATHANG(final String maHQ ,final String tuNgay, final String denNgay, final String maTHKE);
	
	public List<BCT_BO_NGANH_DSDNXNT_MATHANGDTO> TS_DSDNXN_THEO_MATHANG(final String maHQ ,final String tuNgay, final String denNgay, final String maTHKE);
	
	public List<BCT_BO_NGANH_TGXN_MOTSO_MATHANGDTO> TS_TGXN_MOTSO_MATHANG(final String maHQ ,final int thang, final int nam, final String loaiXN);
	
	public List<BCT_BO_NGANH_TGXN_MSMH_THUYSANDTO> TS_TGXN_MSMH_THUYSAN(final String maHQ ,final int ky ,final int thang, final int nam, final String loaiXN);
	
	public List<BCT_BO_NGANH_DSDNXN_MSMH_THUYSANDTO> TS_DSDNXN_MSMH_THUYSAN(final String maHQ ,final int ky ,final int thang, final int nam, final String loaiXN);
	
	public List<BCT_BO_NGANH_TGXN_MOTSO_MAHANGKBDTO> TS_TGXN_MOTSO_MAHANGKB(final String maHQ, final int nam);
	
	public List<BCT_BO_NGANH_TGNK_PHANMEMDTO> TS_TGNK_PHANMEM(final String maHQ, final int nam);
	
	public List<BCT_BO_NGANH_DNXNK_TRIGIADTO> TS_TGNK_PMT_DOANHNGHIEP(final String maHQ, final int nam);
	
	public List<BCT_BO_NGANH_TGXNT_DONGTIEN_THANHTOANDTO> TS_TGXN_THEO_DONGTIENTT(final String maHQ ,final String tuNgay, final String denNgay,final String loaiXN);
	
	public List<BCT_BO_NGANH_TGXN_THEO_NGOAITEDTO> TS_TGXN_THEO_NGOAITE(final String maHQ ,final String tuNgay, final String denNgay);
	
	public List<BCT_BO_NGANH_TGXN_MH_CAFEDTO> TS_TGXN_MH_CAFE(final String maHQ, final int thang, final int nam, final String loaiXN);
	
	public List<BCT_BO_NGANH_DSDNXNKDTO> TS_DSDNXK_MH_CAFE(final String maHQ, final int tuThang, final int tuNam, final int denThang, final int denNam);
	
	public List<BCT_BO_NGANH_TGXK_MH_HATTIEUDTO> TS_TGXK_MH_HATTIEU(final String maHQ, final int thang, final int nam);
	
	public List<BCT_BO_NGANH_DNXNK_TRIGIADTO> TS_TGXK_MH_HATTIEU_THEO_DN(final String maHQ, final int thang, final int nam);
	
	public List<BCT_BO_NGANH_NUOC_TRIGIADTO> TS_TGXK_GIAYDEP_THEO_THITRUONG(final String maHQ, final int thang, final int nam);
	
	public List<BCT_BO_NGANH_NUOC_TRIGIADTO> TS_TGXK_GIAYDEP_THITRUONG_HS(final String maHQ, final int thang, final int nam);
	
	public List<BCT_BO_NGANH_MAHANGKB_TRIGIADTO> TS_TGXK_GIAYDEP_THEO_HS(final String maHQ, final int thang, final int nam);
	
	public List<BCT_BO_NGANH_TGXK_GIAYDEP_LH_DOANHNGHIEPDTO> TS_TGXK_GIAYDEP_LH_DOANHNGHIEP(final String maHQ, final int thang, final int nam);
	
	public List<BCT_BO_NGANH_TGXK_TUIXACH_LH_DOANHNGHIEPDTO> TS_TGXK_TUIXACH_LH_DOANHNGHIEP(final String maHQ, final int thang, final int nam);
}
