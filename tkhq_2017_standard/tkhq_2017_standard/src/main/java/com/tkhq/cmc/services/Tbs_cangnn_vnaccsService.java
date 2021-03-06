package com.tkhq.cmc.services;

import java.util.List;

import com.tkhq.cmc.model.Tbs_Cangnn_vnaccs;

public interface Tbs_cangnn_vnaccsService {	

	List<Tbs_Cangnn_vnaccs> findAll();
	
	List<Tbs_Cangnn_vnaccs> searchCangNN(String maCang, String tenNuoc, String tenTP, String maNuoc);
	
	long countTotal(String maCang, String tenNuoc, String tenTP, String maNuoc);
	
	void insertTbs_Cangnn(Tbs_Cangnn_vnaccs tbs_cangnn_vnaccs)	throws Exception;	

	void updateTbs_cangnn(Tbs_Cangnn_vnaccs tbs_cangnn_vnaccs);

	void deleteByMaCang(String maCang);	

	Tbs_Cangnn_vnaccs findByMaCang(String maCang);
}
