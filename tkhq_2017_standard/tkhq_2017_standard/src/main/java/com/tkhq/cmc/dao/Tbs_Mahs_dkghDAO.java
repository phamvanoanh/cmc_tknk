package com.tkhq.cmc.dao;

import java.util.List;
import com.tkhq.cmc.model.Tbs_Mahs_dkgh;

public interface Tbs_Mahs_dkghDAO {
	Tbs_Mahs_dkgh findById(Long STT);
//	
//	List<Tbs_BieuThue> findByName(String tenBieuThue);
//	
	void insertTbs_Mahs_dkgh(Tbs_Mahs_dkgh tbsBieuThue) throws Exception;
	
	void updateTbs_Mahs_dkgh(Tbs_Mahs_dkgh tbsBieuThue);
	
	void deleteById(Long sTT);

	List<Tbs_Mahs_dkgh> findAll();
	
//	void deleteAll();
//	
//	Integer getSequence();
//	
//	List<Tbs_BieuThue> searchBieuThue(String maBieuThue, String tenBieuThue, String maHS, int minRow, int maxRow);
//	
//	long countTotal(String maBieuThue, String tenBieuThue, String maHS);
}
