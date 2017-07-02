package com.tkhq.global.model.bcptbangbieu;

public class SLTheoCTTK14SubGroupData {
	private String sub_name;
	private String avg=" ";
	private SLTheoCTTK14DataKy data_ky;
	public SLTheoCTTK14SubGroupData() {
		// TODO Auto-generated constructor stub
		data_ky = new SLTheoCTTK14DataKy();
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
	public SLTheoCTTK14DataKy getData_ky() {
		return data_ky;
	}
	public void setData_ky(SLTheoCTTK14DataKy data_ky) {
		this.data_ky = data_ky;
	}
}
