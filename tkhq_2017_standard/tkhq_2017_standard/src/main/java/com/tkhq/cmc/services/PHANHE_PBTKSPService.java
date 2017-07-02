package com.tkhq.cmc.services;

import java.util.List;

import com.tkhq.cmc.dto.BCSLVNBELARUTDTO;
import com.tkhq.cmc.dto.BCSLVNUCRAINADTO;
import com.tkhq.cmc.dto.BCSLVN_ASIANDTO;
import com.tkhq.cmc.dto.BCSLVN_LAODTO;
import com.tkhq.cmc.dto.BCSLVN_NGADTO;
import com.tkhq.cmc.dto.BCSLVN_TOWORLDDTO;

public interface PHANHE_PBTKSPService {
	public List<BCSLVNUCRAINADTO> Ts_BCSLVN_UCRAINA(int ky,int nam);
	public List<BCSLVNBELARUTDTO> Ts_BCSLVN_BELARUT(int ky,int nam,String nhx);
	public List<BCSLVN_LAODTO> ts_BCSLVN_LAO(int ky, int nam);
	public List<BCSLVN_NGADTO> ts_BCSLVN_NGA(int ky, int nam);
	public List<BCSLVN_ASIANDTO> ts_BCSLVN_ASIAN(int quy, int nam,String nhx);
	public List<BCSLVN_TOWORLDDTO> ts_BCSLVN_TOWORLD (int nam,String nhx);
}
