package com.tkhq.cmc.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.jdbc.ReturningWork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import com.tkhq.cmc.dto.TbdHqByUserNameDTO;
import com.tkhq.cmc.dto.Tbd_KetXuatTNHTDTO;
import com.tkhq.cmc.utils.Utils;

import oracle.jdbc.internal.OracleTypes;

@Repository
public class Tbd_KetXuatTNHTDAOIplm implements Tbd_KetXuatTNHTDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public List<Tbd_KetXuatTNHTDTO> ts_KetXuatTNHT(final String userName, final String tuNgay, final String denNgay) {

		return sessionFactory.getCurrentSession().doReturningWork(
			new ReturningWork<List<Tbd_KetXuatTNHTDTO>>() {
				public List<Tbd_KetXuatTNHTDTO> execute(Connection con) throws SQLException {
	
					List<Tbd_KetXuatTNHTDTO> listDto = new ArrayList<Tbd_KetXuatTNHTDTO>();

					CallableStatement callStm = con.prepareCall("{call "
						+ Utils.readProperties("PK_TBD_LOG_KXTNHT.ts_readKXTNHT")
						+ "(?, TO_DATE(?, 'dd-mm-yy'),"
						+ " TO_DATE(?, 'dd-mm-yy'),?)}");
	
					callStm.setString(1, userName);
					callStm.setString(2, tuNgay);
					callStm.setString(3, denNgay);

					callStm.registerOutParameter(4, OracleTypes.CURSOR);
	
					callStm.execute();
	
					ResultSet rs = (ResultSet) callStm.getObject(4);
					Tbd_KetXuatTNHTDTO dto = null;
					while (rs.next()) {
						dto = new Tbd_KetXuatTNHTDTO(tuNgay, denNgay);
						dto.setFileName(rs.getString("LOCAL_FILE_NAME"));
						dto.setNgayKetXuat(rs.getDate("NGAY_KX"));
						dto.setLyDoKetXuat(rs.getString("LYDO_KX"));
						dto.setUserPheDuyet(rs.getString("USER_PD"));
						dto.setTrangThaiPheDuyet(rs.getInt("TRANGTHAI_PD"));
						dto.setKetXuatId(rs.getInt("KETXUAT_ID"));
						dto.setUserIdKetXuat(rs.getInt("USERID_KX"));
						dto.setUserKetXuat(rs.getString("USER_KX"));
						dto.setKieuKetXuat(rs.getString("KIEU_KX"));
						dto.setLoaiDuLieuKetXuat(rs.getString("LOAIDL_KX"));
						dto.setNguonSLKetXuat(rs.getInt("NGUONSL_KX"));
						dto.setMaHaiQuan(rs.getString("MA_HQ"));
						dto.setLoaiHangHoaKetXuat(rs.getString("LOAIHH_KX"));
						dto.setMaDichVu(rs.getString("MA_DV"));
						dto.setMaHang(rs.getString("MA_HANG"));
						dto.setMaThongKe(rs.getString("MA_THKE"));
						dto.setMaTinhTP(rs.getString("MATINHTP"));
						dto.setMaLHDN(rs.getString("MALHDN"));
						dto.setLyDoKetXuat(rs.getString("LYDO_KX"));
						dto.setDsNuoc(rs.getString("DS_NUOC"));
						dto.setDsChiTieuKetXuat(rs.getString("DS_CHITIEUKX"));
						dto.setTenHang(rs.getString("TEN_HANG"));
						dto.setTenHaiQuan(rs.getString("TEN"));
						dto.setMaDonVi(rs.getString("MA_DV"));
						dto.setTenDonVi(rs.getString("TEN_DV"));
						dto.setTenTinhTP(rs.getString("TENTINHTP"));
						dto.setTenLoaiHinhDN(rs.getString("TENLH_DN"));
						dto.setNgayPheDuyet(rs.getDate("NGAY_PD"));
						dto.setTuNgayKetXuat(rs.getDate("TUNGAY"));
						dto.setDenNgayKetXuat(rs.getDate("DENNGAY"));

						listDto.add(dto);
					}
					return listDto;
				}
			});
	}

	public Tbd_KetXuatTNHTDTO getKetXuatTNHTById(final String id, final String loaiHangHoaKx) {
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<Tbd_KetXuatTNHTDTO>() {

			public Tbd_KetXuatTNHTDTO execute(Connection con) throws SQLException {

				CallableStatement callStm = con.prepareCall("{call "
					+ Utils.readProperties("PK_TBD_LOG_KXTNHT.ts_readKXTNHTById")
					+ "(?,?,?)}");

				callStm.setString(1, id);
				callStm.setString(2, loaiHangHoaKx);
				callStm.registerOutParameter(3, OracleTypes.CURSOR);

				callStm.execute();

				ResultSet rs = (ResultSet) callStm.getObject(3);
				Tbd_KetXuatTNHTDTO dto = null;
				while (rs.next()) {
					dto = new Tbd_KetXuatTNHTDTO();
					dto.setFileName(rs.getString("LOCAL_FILE_NAME"));
					dto.setNgayKetXuat(rs.getDate("NGAY_KX"));
					dto.setLyDoKetXuat(rs.getString("LYDO_KX"));
					dto.setUserPheDuyet(rs.getString("USER_PD"));
					dto.setTrangThaiPheDuyet(rs.getInt("TRANGTHAI_PD"));
					dto.setKetXuatId(rs.getInt("KETXUAT_ID"));
					dto.setUserIdKetXuat(rs.getInt("USERID_KX"));
					dto.setKieuKetXuat(rs.getString("KIEU_KX"));
					dto.setLoaiDuLieuKetXuat(rs.getString("LOAIDL_KX"));
					dto.setNguonSLKetXuat(rs.getInt("NGUONSL_KX"));
					dto.setMaHaiQuan(rs.getString("MA_HQ"));
					dto.setLoaiHangHoaKetXuat(rs.getString("LOAIHH_KX"));
					dto.setMaDichVu(rs.getString("MA_DV"));
					dto.setMaHang(rs.getString("MA_HANG"));
					dto.setMaThongKe(rs.getString("MA_THKE"));
					dto.setMaTinhTP(rs.getString("MATINHTP"));
					dto.setMaLHDN(rs.getString("MALHDN"));
					dto.setLyDoKetXuat(rs.getString("LYDO_KX"));
					dto.setDsNuoc(rs.getString("DS_NUOC"));
					dto.setDsChiTieuKetXuat(rs.getString("DS_CHITIEUKX"));
					dto.setTenHang(rs.getString("TEN_HANG"));
					dto.setTenHaiQuan(rs.getString("TEN"));
				}
				return dto;
			}
		});
			
		
	}

	public int updateTrangThaiPheDuyetKetXuatTNHT(final String id, final int trangThaiPheDuyet) {
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<Integer>() {

			public Integer execute(Connection con) throws SQLException {
				CallableStatement callStm = con.prepareCall("{call "
						+ Utils.readProperties("PK_TBD_LOG_KXTNHT.ts_updateKXTNHTById")
						+ "(?,?,?)}");

				callStm.setString(1, id);
				callStm.setString(2, getUserLogin());
				callStm.setInt(3, trangThaiPheDuyet);

				return callStm.executeUpdate();
			}
			
		});
	}
	
	private String getUserLogin(){
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}

	@Override
	public TbdHqByUserNameDTO getHqByUserLogin(final String userName) {
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<TbdHqByUserNameDTO>() {

			public TbdHqByUserNameDTO execute(Connection con) throws SQLException {

				CallableStatement callStm = con.prepareCall("{call "
					+ Utils.readProperties("PK_TBD_LOG_KXTNHT.ts_getMaHqByUserNameLogin")
					+ "(?,?)}");

				callStm.setString(1, userName);
				callStm.registerOutParameter(2, OracleTypes.CURSOR);

				callStm.execute();

				ResultSet rs = (ResultSet) callStm.getObject(2);
				TbdHqByUserNameDTO dto = null;
				while (rs.next()) {
					dto = new TbdHqByUserNameDTO();
					dto.setMaHq(rs.getString("MA"));
					dto.setTenHq(rs.getString("TEN"));
				}
				return dto;
			}
		});
	}
}

