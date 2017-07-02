package com.tkhq.cmc.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.hibernate.jdbc.ReturningWork;
import org.springframework.stereotype.Repository;

import com.tkhq.cmc.dto.TbdSysPhancongCvDTO;
import com.tkhq.cmc.dto.TbdSysUserPhancongCvDTO;
import com.tkhq.cmc.model.TbdSysPhancongCv;
import com.tkhq.cmc.utils.Utils;

import oracle.jdbc.internal.OracleTypes;

@Repository
public class TbdSysPhancongCvDAOImpl extends BaseDAO<Long, TbdSysPhancongCv> implements TbdSysPhancongCvDAO {

	public Integer createPhancong(TbdSysPhancongCvDTO entity) {
		int result = 0;
		try {
			TbdSysPhancongCv phancong = new TbdSysPhancongCv();
			phancong.setMaCv(entity.getMaCv());
			phancong.setTenCv(entity.getTenCv());
			phancong.setTuNgay(entity.getTuNgay());
			phancong.setDenNgay(entity.getDenNgay());
			phancong.setMatHang(entity.getMatHang());
			phancong.setMaThke(entity.getMaThke());
			phancong.setNhx(entity.getNhx());
			phancong.setUserIdPa1(entity.getUserIdPa1());
			phancong.setUserNamePa1(entity.getUserNamePa1());
			phancong.setUserIdPa2(entity.getUserIdPa2());
			phancong.setUserNamePa2(entity.getUserNamePa2());
			phancong.setUserIdPa3(entity.getUserIdPa3());
			phancong.setUserNamePa3(entity.getUserNamePa3());
			phancong.setGhiChu(entity.getGhiChu());
			phancong.setMaHq(entity.getMaHq());
		
			this.persist(phancong);
			result =1;
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}

	public void deletePhancong(long status) {
		TbdSysPhancongCv entity = new TbdSysPhancongCv();
		entity.setStt(status);
		try {
			this.delete(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public TbdSysPhancongCv update(TbdSysPhancongCvDTO entity) {
		try {
			TbdSysPhancongCv phancong = new TbdSysPhancongCv(entity.getStt(),entity.getMaCv(), entity.getTenCv(), entity.getTuNgay(),
					entity.getDenNgay(), entity.getMatHang(), entity.getMaThke(), entity.getUserIdPa1(),
					entity.getUserNamePa1(), entity.getUserIdPa2(), entity.getUserNamePa2(), entity.getUserIdPa3(),
					entity.getUserNamePa3(), entity.getGhiChu(), entity.getMaHq(), entity.getNhx()

			);

			this.update(phancong);
			return phancong;
		} catch (Exception e) {
			return null;
		}

	}

	@SuppressWarnings("unchecked")
	public List<TbdSysPhancongCvDTO> getAllPhancong() {
		Criteria cri = this.getSession().createCriteria(TbdSysPhancongCv.class);
		List<TbdSysPhancongCvDTO> listPhancong = cri.list();
		if (listPhancong != null) {
			return listPhancong;
		} else
			return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<TbdSysPhancongCv> findByMaCV(String maCv) {
		Criteria cri = this.getSession().createCriteria(TbdSysPhancongCv.class);
		List<TbdSysPhancongCv> list = cri.add(Restrictions.eq("maCv", maCv)).list();
		if (list != null) {
			return list;
		} else {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	public List<TbdSysPhancongCvDTO> search(final String type, final String maCv) {
		/*
		 * Criteria cri =
		 * this.getSession().createCriteria(TbdSysPhancongCv.class);
		 * 
		 * if (!Utils.isEmpty(type) && !"".equals(type)) {
		 * cri.add(Restrictions.eq("nhx", type)); } if (!Utils.isEmpty(maCv) &&
		 * !"".equals(maCv)) { cri.add(Restrictions.eq("maCv", maCv)); }
		 * 
		 * List<TbdSysPhancongCv> list = cri.list();
		 * 
		 * return list;
		 */

		return this.getSession().doReturningWork(new ReturningWork<List<TbdSysPhancongCvDTO>>() {

			@Override
			public List<TbdSysPhancongCvDTO> execute(Connection connection) throws SQLException {
				List<TbdSysPhancongCvDTO> list = new ArrayList<TbdSysPhancongCvDTO>();

				try {
					CallableStatement call = connection.prepareCall(
							"{call " + Utils.readProperties("PK_NGUOIDUNG.ts_SearchPhancong") + "(?,?,?)}");

					call.setString(1, type);
					call.setString(2, maCv);
					call.registerOutParameter(3, OracleTypes.CURSOR);
					call.execute();

					ResultSet result = (ResultSet) call.getObject(3);
					TbdSysPhancongCvDTO phancong2 = null;
					while (result.next()) {
//						TbdSysPhancongCvDTO phancong = new TbdSysPhancongCvDTO(result.getLong("STT"),
//								result.getString("TEN_CV"), convertDateToString(result.getDate("TU_NGAY")), convertDateToString(result.getDate("DEN_NGAY")),
//								result.getString("MAT_HANG"), result.getString("MA_THKE"), result.getString("NHX"),
//								result.getString("USER_NAME_PA1"), result.getString(12),
//								result.getString("USER_NAME_PA2"), result.getString(13),
//								result.getString("USER_NAME_PA3"), result.getString(14), result.getString("GHI_CHU"),
//								result.getString("TEN"),result.getString("MA_HQ"), result.getLong("USER_ID_PA1"),result.getLong("USER_ID_PA2"),result.getLong("USER_ID_PA3"));
						
						phancong2 = new TbdSysPhancongCvDTO();
						phancong2.setStt(result.getLong("STT"));
						phancong2.setTenCv(result.getString("TEN_CV"));
						phancong2.setTuNgay(result.getDate("TU_NGAY"));
						phancong2.setDenNgay(result.getDate("DEN_NGAY"));
						phancong2.setMatHang(result.getString("MAT_HANG"));
						phancong2.setMaThke(result.getString("MA_THKE"));
						phancong2.setNhx(result.getString("NHX"));
						phancong2.setUserNamePa1(result.getString("USER_NAME_PA1"));
						phancong2.setUserNamePa2(result.getString("USER_NAME_PA2"));
						phancong2.setUserNamePa3(result.getString("USER_NAME_PA3"));
						phancong2.setGhiChu(result.getString("GHI_CHU"));
						phancong2.setFullNamePa1(result.getString("FULL_NAME_PA1"));
						phancong2.setFullNamePa2(result.getString("FULL_NAME_PA2"));
						phancong2.setFullNamePa3(result.getString("FULL_NAME_PA3"));
						phancong2.setTenHq(result.getString("TEN")); // ten hai quan
						phancong2.setMaHq(result.getString("MA_HQ"));
						phancong2.setUserIdPa1(result.getLong("USER_ID_PA1"));
						phancong2.setUserIdPa2(result.getLong("USER_ID_PA2"));
						phancong2.setUserIdPa3(result.getLong("USER_ID_PA3"));
						
						list.add(phancong2);

					}
					return list;
				} catch (Exception e) {
					return null;
				}
			}
		});
	}

	@Override
	public void deleteList(String s) {
		//List<String> compile = new ArrayList<String>(Arrays.asList(s.split(",")));
		// List<Long> stts = new ArrayList<Long>();
		//for (int i = 0; i < compile.size(); i++) {
		//  Long l = Long.parseLong(compile.get(i));
			Long l = Long.parseLong(s);
			TbdSysPhancongCv pc = new TbdSysPhancongCv();
			pc.setStt(l);
			delete(pc);

		//}
		// Query query = this.getSession()
		// .createQuery("Delete from TBD_SYS_PHANCONG_CV pc where pc.stt
		// in(:list)" );
		// query.setParameterList("list", stts);
		// query.executeUpdate();

	}

	@Override
	public List<TbdSysUserPhancongCvDTO> getListUserOfTongCuc() {
		return this.getSession().doReturningWork(new ReturningWork<List<TbdSysUserPhancongCvDTO>>() {
			@Override
			public List<TbdSysUserPhancongCvDTO> execute(Connection connection) throws SQLException {
				List<TbdSysUserPhancongCvDTO> list = new ArrayList<TbdSysUserPhancongCvDTO>();
				try {
					CallableStatement call = connection.prepareCall(
							"{call " + Utils.readProperties("PK_NGUOIDUNG.ts_getListUserofTongCuc") + "(?)}");

					call.registerOutParameter(1, OracleTypes.CURSOR);
					call.execute();

					ResultSet result = (ResultSet) call.getObject(1);
					TbdSysUserPhancongCvDTO phancong2 = null;
					while (result.next()) {
						phancong2 = new TbdSysUserPhancongCvDTO();
						phancong2.setUserId(result.getInt("USER_ID"));
						phancong2.setUserName(result.getString("USERNAME"));
						phancong2.setMaHq(result.getString("MA_HQ"));
						phancong2.setFullName(result.getString("FULL_NAME"));
						list.add(phancong2);
					}
					return list;
				} catch (Exception e) {
					return new ArrayList<TbdSysUserPhancongCvDTO>();
				}
			}
		});
		
	}

	@Override
	public TbdSysPhancongCvDTO getPhanCongByStt(final int stt, final String typNhapxuat) {
		return this.getSession().doReturningWork(new ReturningWork<TbdSysPhancongCvDTO>() {

			@Override
			public TbdSysPhancongCvDTO execute(Connection connection) throws SQLException {

				try {
					CallableStatement call = connection.prepareCall(
							"{call " + Utils.readProperties("PK_NGUOIDUNG.ts_GetPhanCongByStt") + "(?,?,?)}");

					call.setInt(1, stt);
					call.setString(2, typNhapxuat);
					call.registerOutParameter(3, OracleTypes.CURSOR);
					call.execute();

					ResultSet result = (ResultSet) call.getObject(3);
					TbdSysPhancongCvDTO phancong2 = null;
					while (result.next()) {
						phancong2 = new TbdSysPhancongCvDTO();
						phancong2.setStt(result.getLong("STT"));
					}
					return phancong2;
				} catch (Exception e) {
					return null;
				}
			}
		});
	}
	
}
