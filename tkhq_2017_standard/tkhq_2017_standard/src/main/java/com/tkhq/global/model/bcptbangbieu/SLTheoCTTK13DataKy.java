package com.tkhq.global.model.bcptbangbieu;

import java.util.ArrayList;
import java.util.List;

public class SLTheoCTTK13DataKy {
	private List<DataKyObj> data;
	private String ss_ky_truoc=" ";
	private String ss_ky_nam_truoc=" ";
	public SLTheoCTTK13DataKy(List<DataKyObj> data, String ss_ky_truoc, String ss_ky_nam_truoc) {
		this.data = data;
		this.ss_ky_truoc = ss_ky_truoc;
		this.ss_ky_nam_truoc = ss_ky_nam_truoc;
	}
	public SLTheoCTTK13DataKy() {
		// TODO Auto-generated constructor stub
		data = new ArrayList<DataKyObj>();
	}
	public List<DataKyObj> getData() {
		return data;
	}
	public void setData(List<DataKyObj> data) {
		this.data = data;
	}
	public String getSs_ky_truoc() {
		return ss_ky_truoc;
	}
	public void setSs_ky_truoc(String ss_ky_truoc) {
		this.ss_ky_truoc = ss_ky_truoc;
	}
	public String getSs_ky_nam_truoc() {
		return ss_ky_nam_truoc;
	}
	public void setSs_ky_nam_truoc(String ss_ky_nam_truoc) {
		this.ss_ky_nam_truoc = ss_ky_nam_truoc;
	}
}
