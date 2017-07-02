package com.tkhq.global.model.bcptbangbieu;

import java.util.ArrayList;
import java.util.List;

public class SLTheoCTTK13DataThang {
	private List<DataThangObj> data;
	private String ss_thang_truoc=" ";
	private String ss_thang_nam_truoc=" ";
	public SLTheoCTTK13DataThang() {
		// TODO Auto-generated constructor stub
		data = new ArrayList<DataThangObj>();
	}
	public SLTheoCTTK13DataThang(List<DataThangObj> data, String ss_thang_truoc, String ss_thang_nam_truoc) {
		this.data = data;
		this.ss_thang_truoc = ss_thang_truoc;
		this.ss_thang_nam_truoc = ss_thang_nam_truoc;
	}
	public List<DataThangObj> getData() {
		return data;
	}
	public void setData(List<DataThangObj> data) {
		this.data = data;
	}
	public String getSs_thang_truoc() {
		return ss_thang_truoc;
	}
	public void setSs_thang_truoc(String ss_thang_truoc) {
		this.ss_thang_truoc = ss_thang_truoc;
	}
	public String getSs_thang_nam_truoc() {
		return ss_thang_nam_truoc;
	}
	public void setSs_thang_nam_truoc(String ss_thang_nam_truoc) {
		this.ss_thang_nam_truoc = ss_thang_nam_truoc;
	}
}
