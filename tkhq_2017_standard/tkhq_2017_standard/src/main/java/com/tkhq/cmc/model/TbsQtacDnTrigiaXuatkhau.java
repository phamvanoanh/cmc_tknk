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
@Table(name = "TBS_QTAC_DN_TRIGIA_XUATKHAU")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TbsQtacDnTrigiaXuatkhau.findAll", query = "SELECT t FROM TbsQtacDnTrigiaXuatkhau t")
    , @NamedQuery(name = "TbsQtacDnTrigiaXuatkhau.findById", query = "SELECT t FROM TbsQtacDnTrigiaXuatkhau t WHERE t.id = :id")
    , @NamedQuery(name = "TbsQtacDnTrigiaXuatkhau.findByMasodn", query = "SELECT t FROM TbsQtacDnTrigiaXuatkhau t WHERE t.masodn = :masodn")
    , @NamedQuery(name = "TbsQtacDnTrigiaXuatkhau.findByTrigiaxuatkhau", query = "SELECT t FROM TbsQtacDnTrigiaXuatkhau t WHERE t.trigiaxuatkhau = :trigiaxuatkhau")})
public class TbsQtacDnTrigiaXuatkhau implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ID")
    @GenericGenerator(name="TbsQtacDnTrigiaXuatkhauSeq" , strategy="increment")
    @GeneratedValue(generator="TbsQtacDnTrigiaXuatkhauSeq")
    private Long id;
    @Column(name = "MASODN")
    private String masodn;
    @Column(name = "TRIGIAXUATKHAU")
    private Double trigiaxuatkhau;
    @Column(name = "TEN_DN")
    private String tenDn;
    @Column(name = "TRANG_THAI")
    private int trangThai;
    @Column(name = "MO_TA")
    private String moTa;
    
    public TbsQtacDnTrigiaXuatkhau() {
    }

    public TbsQtacDnTrigiaXuatkhau(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMasodn() {
        return masodn;
    }

    public void setMasodn(String masodn) {
        this.masodn = masodn;
    }

    public Double getTrigiaxuatkhau() {
        return trigiaxuatkhau;
    }

    public void setTrigiaxuatkhau(Double trigiaxuatkhau) {
        this.trigiaxuatkhau = trigiaxuatkhau;
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
        if (!(object instanceof TbsQtacDnTrigiaXuatkhau)) {
            return false;
        }
        TbsQtacDnTrigiaXuatkhau other = (TbsQtacDnTrigiaXuatkhau) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.tkhq.cmc.model.TbsQtacDnTrigiaXuatkhau[ id=" + id + " ]";
    }

	public String getTenDn() {
		return tenDn;
	}

	public void setTenDn(String tenDn) {
		this.tenDn = tenDn;
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
