package com.tkhq.global.model.bcptbangbieu;

public class DataThangObj {
	private String thang =" ";
	private String gia_tri=" ";
	public String getThang() {
		return thang;
	}
	public void setThang(String thang) {
		this.thang = thang;
	}
	public String getGia_tri() {
		if(gia_tri != null && gia_tri.charAt(0) == '.'){
			gia_tri = "0" + gia_tri;
		}
		return gia_tri;
	}
	public void setGia_tri(String gia_tri) {
		this.gia_tri = gia_tri;
	}
	public DataThangObj(String thang, String gia_tri) {
		this.thang = thang;
		this.gia_tri = gia_tri;
	}
	public DataThangObj() {
		// TODO Auto-generated constructor stub
	}
}
