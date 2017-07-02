package com.tkhq.cmc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tkhq.cmc.dao.Tbs_ChuyenDeDAO;
import com.tkhq.cmc.model.Tbs_ChuyenDe;

@Service("tbs_chuyendeService")
@Transactional
public class Tbs_ChuyenDeServiceImpl implements Tbs_ChuyenDeService {
	
	@Autowired
	Tbs_ChuyenDeDAO tbs_chuyendeDAO;
	
	public void insertTbs_ChuyenDe(Tbs_ChuyenDe tbs_chuyende) throws Exception {
		tbs_chuyendeDAO.insertTbs_ChuyenDe(tbs_chuyende);
	}

	public Tbs_ChuyenDe findByMaCDe(String maCDe) {
		return tbs_chuyendeDAO.findByMaCDe(maCDe);
	}

	public void updateTbs_chuyende(Tbs_ChuyenDe tbs_chuyende) {
		tbs_chuyendeDAO.updateTbs_chuyende(tbs_chuyende);
		
	}

	public void deleteByMaCDe(String maCDe) {
		tbs_chuyendeDAO.deleteByMaCDe(maCDe);
		
	}

	public List<Tbs_ChuyenDe> searchChuyenDe(String maCDe, String tenCDe,
			String maHang,String motaHH) {
		
		return tbs_chuyendeDAO.searchChuyenDe(maCDe, tenCDe, maHang,motaHH);
	}

	public long countTotal(String maCDe, String tenCDe, String maHang,String motaHH) {
		
		return tbs_chuyendeDAO.countTotal(maCDe, tenCDe, maHang, motaHH);
	}

}
