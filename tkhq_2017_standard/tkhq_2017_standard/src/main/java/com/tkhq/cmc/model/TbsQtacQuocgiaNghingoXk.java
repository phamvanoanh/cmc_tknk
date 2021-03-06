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
@Table(name = "TBS_QTAC_QUOCGIA_NGHINGO_XK")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TbsQtacQuocgiaNghingoXk.findAll", query = "SELECT t FROM TbsQtacQuocgiaNghingoXk t")
    , @NamedQuery(name = "TbsQtacQuocgiaNghingoXk.findById", query = "SELECT t FROM TbsQtacQuocgiaNghingoXk t WHERE t.id = :id")
    , @NamedQuery(name = "TbsQtacQuocgiaNghingoXk.findByManuoc", query = "SELECT t FROM TbsQtacQuocgiaNghingoXk t WHERE t.manuoc = :manuoc")
    , @NamedQuery(name = "TbsQtacQuocgiaNghingoXk.findByTennuoc", query = "SELECT t FROM TbsQtacQuocgiaNghingoXk t WHERE t.tennuoc = :tennuoc")})
public class TbsQtacQuocgiaNghingoXk implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ID")
    @GenericGenerator(name="TbsQtacQuocgiaNghingoXkSeq" , strategy="increment")
    @GeneratedValue(generator="TbsQtacQuocgiaNghingoXkSeq")
    private Long id;
    @Column(name = "MANUOC")
    private String manuoc;
    @Column(name = "TENNUOC")
    private String tennuoc;
    @Column(name = "TRANG_THAI")
    private int trangThai;
    @Column(name = "MO_TA")
    private String moTa;
    
    public TbsQtacQuocgiaNghingoXk() {
    }

    public TbsQtacQuocgiaNghingoXk(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getManuoc() {
        return manuoc;
    }

    public void setManuoc(String manuoc) {
        this.manuoc = manuoc;
    }

    public String getTennuoc() {
        return tennuoc;
    }

    public void setTennuoc(String tennuoc) {
        this.tennuoc = tennuoc;
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
        if (!(object instanceof TbsQtacQuocgiaNghingoXk)) {
            return false;
        }
        TbsQtacQuocgiaNghingoXk other = (TbsQtacQuocgiaNghingoXk) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.tkhq.cmc.model.TbsQtacQuocgiaNghingoXk[ id=" + id + " ]";
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
