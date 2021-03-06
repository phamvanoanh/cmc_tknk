package com.tkhq.global.model.bcptbangbieu;

public class SLTheoCTTK13SubGroupData {
	private String sub_name;
	private String avg=" ";
	private SLTheoCTTK13DataKy data_ky;
	private SLTheoCTTK13DataThang data_thang;
	public SLTheoCTTK13SubGroupData() {
		// TODO Auto-generated constructor stub
		data_ky = new SLTheoCTTK13DataKy();
		data_thang = new SLTheoCTTK13DataThang();
	}
	public SLTheoCTTK13SubGroupData(String sub_name, String avg, SLTheoCTTK13DataKy data_ky,
			SLTheoCTTK13DataThang data_thang) {
		this.sub_name = sub_name;
		this.avg = avg;
		this.data_ky = data_ky;
		this.data_thang = data_thang;
	}
	public String getSub_name() {
		return sub_name;
	}
	public void setSub_name(String sub_name) {
		this.sub_name = sub_name;
	}
	public String getAvg() {
		if(avg != null && avg.charAt(0) == '.')
			avg = "0" + avg;
		return avg;
	}
	public void setAvg(String avg) {
		this.avg = avg;
	}
	public SLTheoCTTK13DataKy getData_ky() {
		return data_ky;
	}
	public void setData_ky(SLTheoCTTK13DataKy data_ky) {
		this.data_ky = data_ky;
	}
	public SLTheoCTTK13DataThang getData_thang() {
		return data_thang;
	}
	public void setData_thang(SLTheoCTTK13DataThang data_thang) {
		this.data_thang = data_thang;
	}
}
