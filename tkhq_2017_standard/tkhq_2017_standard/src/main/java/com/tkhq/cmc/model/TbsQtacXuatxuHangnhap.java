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
@Table(name = "TBS_QTAC_XUATXU_HANGNHAP")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TbsQtacXuatxuHangnhap.findAll", query = "SELECT t FROM TbsQtacXuatxuHangnhap t")
    , @NamedQuery(name = "TbsQtacXuatxuHangnhap.findById", query = "SELECT t FROM TbsQtacXuatxuHangnhap t WHERE t.id = :id")
    , @NamedQuery(name = "TbsQtacXuatxuHangnhap.findByMathongke", query = "SELECT t FROM TbsQtacXuatxuHangnhap t WHERE t.mathongke = :mathongke")
    , @NamedQuery(name = "TbsQtacXuatxuHangnhap.findByManuoc", query = "SELECT t FROM TbsQtacXuatxuHangnhap t WHERE t.manuoc = :manuoc")})
public class TbsQtacXuatxuHangnhap implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GenericGenerator(name="TbsQtacXuatxuHangnhapSeq" , strategy="increment")
    @GeneratedValue(generator="TbsQtacXuatxuHangnhapSeq")
    @Column(name = "ID")
    private Long id;
    @Column(name = "MATHONGKE")
    private String mathongke;
    @Column(name = "MANUOC")
    private String manuoc;
    @Column(name = "TEN_HANG")
    private String tenHang;
    @Column(name = "TEN_NUOC")
    private String tenNuoc;
    @Column(name = "TRANG_THAI")
    private int trangThai;
    @Column(name = "MO_TA")
    private String moTa;
    
    public TbsQtacXuatxuHangnhap() {
    }

    public TbsQtacXuatxuHangnhap(Long id) {
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

    public String getManuoc() {
        return manuoc;
    }

    public void setManuoc(String manuoc) {
        this.manuoc = manuoc;
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
        if (!(object instanceof TbsQtacXuatxuHangnhap)) {
            return false;
        }
        TbsQtacXuatxuHangnhap other = (TbsQtacXuatxuHangnhap) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.tkhq.cmc.model.TbsQtacXuatxuHangnhap[ id=" + id + " ]";
    }

	public String getTenHang() {
		return tenHang;
	}

	public void setTenHang(String tenHang) {
		this.tenHang = tenHang;
	}

	public String getTenNuoc() {
		return tenNuoc;
	}

	public void setTenNuoc(String tenNuoc) {
		this.tenNuoc = tenNuoc;
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
