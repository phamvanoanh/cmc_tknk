package com.tkhq.cmc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tkhq.cmc.dao.Tbs_cangnn_vnaccsDAO;
import com.tkhq.cmc.model.Tbs_Cangnn_vnaccs;

@Service("tbs_cangnn_vnaccsService")
@Transactional
public class Tbs_cangnn_vnaccsServiceImpl implements Tbs_cangnn_vnaccsService {

	@Autowired
	private Tbs_cangnn_vnaccsDAO tbs_cangnn_vnaccsDAO;
	
	public List<Tbs_Cangnn_vnaccs> findAll() {
		
		return tbs_cangnn_vnaccsDAO.findAll();
	}

	public List<Tbs_Cangnn_vnaccs> searchCangNN(String maCang,
			String tenNuoc, String tenTP, String maNuoc) {
		
		return tbs_cangnn_vnaccsDAO.searchCangNN(maCang, tenNuoc, tenTP, maNuoc);
	}
	
	public long countTotal(String maCang, String tenNuoc, String tenTP,
			String maNuoc) {
		
		return tbs_cangnn_vnaccsDAO.countTotal(maCang, tenNuoc, tenTP, maNuoc);
	}
	public void deleteByMaCang(String maCang) {
		tbs_cangnn_vnaccsDAO.deleteByMaCang(maCang);
		
	}

	public Tbs_Cangnn_vnaccs findByMaCang(String maCang) {
		
		return tbs_cangnn_vnaccsDAO.findByMaCang(maCang);
	}
	
	public void insertTbs_Cangnn(Tbs_Cangnn_vnaccs tbs_cangnn_vnaccs)
			throws Exception {
		
			tbs_cangnn_vnaccsDAO.insertTbs_Cangnn(tbs_cangnn_vnaccs);
	}
	
	public void updateTbs_cangnn(Tbs_Cangnn_vnaccs tbs_cangnn_vnaccs) {
		
		tbs_cangnn_vnaccsDAO.updateTbs_cangnn(tbs_cangnn_vnaccs);
	}			

}
