/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tkhq.cmc.model;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author TUANDIEP
 */
@Entity
@Table(name = "TBS_QTAC_LUONG_NHAPKHAU")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TbsQtacLuongNhapkhau.findAll", query = "SELECT t FROM TbsQtacLuongNhapkhau t")
    , @NamedQuery(name = "TbsQtacLuongNhapkhau.findById", query = "SELECT t FROM TbsQtacLuongNhapkhau t WHERE t.id = :id")
    , @NamedQuery(name = "TbsQtacLuongNhapkhau.findByMathongke", query = "SELECT t FROM TbsQtacLuongNhapkhau t WHERE t.mathongke = :mathongke")
    , @NamedQuery(name = "TbsQtacLuongNhapkhau.findByLuonglonnhat", query = "SELECT t FROM TbsQtacLuongNhapkhau t WHERE t.luonglonnhat = :luonglonnhat")})
public class TbsQtacLuongNhapkhau implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GenericGenerator(name="TbsQtacLuongNhapkhauSeq" , strategy="increment")
    @GeneratedValue(generator="TbsQtacLuongNhapkhauSeq")
    @Column(name = "ID")
    private Long id;
    @Column(name = "MATHONGKE")
    private String mathongke;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "LUONGLONNHAT")
    private Double luonglonnhat;
    @Column(name = "TEN_HANG")
    private String tenHang;
    @Column(name = "TRANG_THAI")
    private int trangThai;
    @Column(name = "MO_TA")
    private String moTa;
    
    public TbsQtacLuongNhapkhau() {
    }

    public TbsQtacLuongNhapkhau(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMathongke() {
        return mathongke;
    }

    public void setMathongke(String mathongke) {
        this.mathongke = mathongke;
    }

    public Double getLuonglonnhat() {
        return luonglonnhat;
    }

    public void setLuonglonnhat(Double luonglonnhat) {
        this.luonglonnhat = luonglonnhat;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TbsQtacLuongNhapkhau)) {
            return false;
        }
        TbsQtacLuongNhapkhau other = (TbsQtacLuongNhapkhau) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.tkhq.cmc.model.TbsQtacLuongNhapkhau[ id=" + id + " ]";
    }

	public String getTenHang() {
		return tenHang;
	}

	public void setTenHang(String tenHang) {
		this.tenHang = tenHang;
	}

	public int getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(int trangThai) {
		this.trangThai = trangThai;
	}

	public String getMoTa() {
		return moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}
    
}
