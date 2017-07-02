/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tkhq.cmc.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "TBD_SYS_PHANCONG_CV")

public class TbdSysPhancongCv implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "STT")
//	@GeneratedValue(strategy = GenerationType.AUTO)
	@GenericGenerator(name="sysPhancongSeq" , strategy="increment")
    @GeneratedValue(generator="sysPhancongSeq")
	private Long stt;
	@Basic(optional = false)
	@NotNull
	@Size(min = 1, max = 10)
	@Column(name = "MA_CV")
	private String maCv;
	@Size(max = 100)
	@Column(name = "TEN_CV")
	private String tenCv;
	@Column(name = "TU_NGAY")
	@Temporal(TemporalType.DATE)
	private Date tuNgay;
	@Column(name = "DEN_NGAY")
	@Temporal(TemporalType.DATE)
	private Date denNgay;
	@Size(max = 100)
	@Column(name = "MAT_HANG")
	private String matHang;
	@Size(max = 4)
	@Column(name = "MA_THKE")
	private String maThke;
	@Size(max = 4)
	@Column(name = "NHX")
	private String nhx;
	@Column(name = "USER_ID_PA1")
	private Long userIdPa1;
	@Size(max = 40)
	@Column(name = "USER_NAME_PA1")
	private String userNamePa1;
	@Column(name = "USER_ID_PA2")
	private Long userIdPa2;
	@Size(max = 40)
	@Column(name = "USER_NAME_PA2")
	private String userNamePa2;
	@Column(name = "USER_ID_PA3")
	private Long userIdPa3;
	@Size(max = 40)
	@Column(name = "USER_NAME_PA3")
	private String userNamePa3;
	@Size(max = 255)
	@Column(name = "GHI_CHU")
	private String ghiChu;
	@Size(max = 6)
	@Column(name = "MA_HQ")
	private String maHq;

	public TbdSysPhancongCv() {
	}

	public TbdSysPhancongCv(Long stt) {
		this.stt = stt;
	}

	public TbdSysPhancongCv(Long stt, String maCv) {
		this.stt = stt;
		this.maCv = maCv;
	}

	public Long getStt() {
		return stt;
	}

	public void setStt(Long stt) {
		this.stt = stt;
	}

	public String getMaCv() {
		return maCv;
	}

	public void setMaCv(String maCv) {
		this.maCv = maCv;
	}

	public String getTenCv() {
		return tenCv;
	}

	public void setTenCv(String tenCv) {
		this.tenCv = tenCv;
	}

	public Date getTuNgay() {
		return tuNgay;
	}

	public void setTuNgay(Date tuNgay) {
		this.tuNgay = tuNgay;
	}

	public Date getDenNgay() {
		return denNgay;
	}

	public void setDenNgay(Date denNgay) {
		this.denNgay = denNgay;
	}

	public String getMatHang() {
		return matHang;
	}

	public void setMatHang(String matHang) {
		this.matHang = matHang;
	}

	public String getMaThke() {
		return maThke;
	}

	public void setMaThke(String maThke) {
		this.maThke = maThke;
	}

	public String getNhx() {
		return nhx;
	}

	public void setNhx(String nhx) {
		this.nhx = nhx;
	}

	public Long getUserIdPa1() {
		return userIdPa1;
	}

	public void setUserIdPa1(Long userIdPa1) {
		this.userIdPa1 = userIdPa1;
	}

	public String getUserNamePa1() {
		return userNamePa1;
	}

	public void setUserNamePa1(String userNamePa1) {
		this.userNamePa1 = userNamePa1;
	}

	public Long getUserIdPa2() {
		return userIdPa2;
	}

	public void setUserIdPa2(Long userIdPa2) {
		this.userIdPa2 = userIdPa2;
	}

	public String getUserNamePa2() {
		return userNamePa2;
	}

	public void setUserNamePa2(String userNamePa2) {
		this.userNamePa2 = userNamePa2;
	}

	public Long getUserIdPa3() {
		return userIdPa3;
	}

	public void setUserIdPa3(Long userIdPa3) {
		this.userIdPa3 = userIdPa3;
	}

	public String getUserNamePa3() {
		return userNamePa3;
	}

	public void setUserNamePa3(String userNamePa3) {
		this.userNamePa3 = userNamePa3;
	}

	public String getGhiChu() {
		return ghiChu;
	}

	public void setGhiChu(String ghiChu) {
		this.ghiChu = ghiChu;
	}

	public String getMaHq() {
		return maHq;
	}

	public void setMaHq(String maHq) {
		this.maHq = maHq;
	}

	public TbdSysPhancongCv(long stt, String maCv, String tenCv, Date tuNgay, Date denNgay, String matHang, String maThke,
			long userIdPa1, String userNamePa1, long userIdPa2, String userNamePa2, long userIdPa3,
			String userNamePa3, String ghichu, String maHq,String nhx) {
		this.stt = stt;
		this.maCv = maCv;
		this.tenCv = tenCv;
		this.tuNgay = tuNgay;
		this.denNgay = denNgay;
		this.matHang = matHang;
		this.maThke = maThke;
		this.userIdPa1 = userIdPa1;
		this.userIdPa2 = userIdPa2;
		this.userIdPa3 = userIdPa3;
		this.userNamePa1 = userNamePa1;
		this.userNamePa2 = userNamePa2;
		this.userNamePa3 = userNamePa3;
		this.ghiChu = ghichu;
		this.maHq = maHq;
		this.nhx = nhx;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (stt != null ? stt.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are
		// not set
		if (!(object instanceof TbdSysPhancongCv)) {
			return false;
		}
		TbdSysPhancongCv other = (TbdSysPhancongCv) object;
		if ((this.stt == null && other.stt != null) || (this.stt != null && !this.stt.equals(other.stt))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "com.tkhq.cmc.model.TbdSysPhancongCv[ stt=" + stt + " ]";
	}

}
