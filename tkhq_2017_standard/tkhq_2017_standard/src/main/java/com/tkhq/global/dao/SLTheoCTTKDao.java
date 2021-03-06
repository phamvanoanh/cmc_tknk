package com.tkhq.global.dao;

import java.util.List;

import com.tkhq.global.model.bcptbangbieu.*;

public interface SLTheoCTTKDao {
	public SLTheoCTTK01Response getSLTheoCTTK01(SLTheoCTTKRequestParams params);

	public List<SLTheoCTTK02Response> getSLTheoCTTK02(SLTheoCTTKRequestParams params);
	public List<SLTheoCTTK03Response> getSLTheoCTTK03(SLTheoCTTKRequestParams params);
	public List<SLTheoCTTK04Response> getSLTheoCTTK04(SLTheoCTTKRequestParams params, String mathang);
	
	public List<SLTheoCTTK05Response> getSLTheoCTTK05(SLTheoCTTKRequestParams params, String chuong, String nhom);
	public List<SLTheoCTTK06Response> getSLTheoCTTK06(SLTheoCTTKRequestParams params, String phan);
	
	public List<SLTheoCTTK07Response> getSLTheoCTTK07(SLTheoCTTKRequestParams params, 
			String thoigian, String mathang, String chiso, String loaichiso);
	
	public List<SLTheoCTTK08Response> getSLTheoCTTK08(SLTheoCTTKRequestParams params, String khoi, String nuoc);
	public List<SLTheoCTTK09Response> getSLTheoCTTK09(SLTheoCTTKRequestParams params, String thitruong, String mathang);
	
	public List<SLTheoCTTK10Response> getSLTheoCTTK10(SLTheoCTTKRequestParams params, String mathang);

	public List<SLTheoCTTK11Response> getSLTheoCTTK11(SLTheoCTTKRequestParams params, String tinh);

	public List<SLTheoCTTK12Response> getSLTheoCTTK12(SLTheoCTTKRequestParams params);
	public List<SLTheoCTTK13Response> getSLTheoCTTK13(SLTheoCTTKRequestParams params, String group_transport, String transport);
	
	public List<SLTheoCTTK15Response> getSLTheoCTTK15(SLTheoCTTKRequestParams params, String cuakhau, String phamvi, String loaihinh);
	
	public List<SLTheoCTTK14Response> getSLTheoCTTK14(final SLTheoCTTKRequestParams params, 
			final String loai_ngay, final String thoi_gian, final String tu_thoigian, final String tu_nam,
			final String den_thoigian,final String den_nam );
}
