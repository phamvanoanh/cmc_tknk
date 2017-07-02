package com.tkhq.global.model.bcptbangbieu;

public class SLTheoCTTK11Response {
	private String sub_name;
	private String avg;
	private SLTheoCTTK11DataKy data_ky;
	private SLTheoCTTK11DataThang data_thang;
	public SLTheoCTTK11Response() {
		// TODO Auto-generated constructor stub
		data_ky = new SLTheoCTTK11DataKy();
		data_thang = new SLTheoCTTK11DataThang();
	}
	public SLTheoCTTK11Response(String sub_name, String avg, SLTheoCTTK11DataKy data_ky,
			SLTheoCTTK11DataThang data_thang) {
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
	public SLTheoCTTK11DataKy getData_ky() {
		return data_ky;
	}
	public void setData_ky(SLTheoCTTK11DataKy data_ky) {
		this.data_ky = data_ky;
	}
	public SLTheoCTTK11DataThang getData_thang() {
		return data_thang;
	}
	public void setData_thang(SLTheoCTTK11DataThang data_thang) {
		this.data_thang = data_thang;
	}
}
