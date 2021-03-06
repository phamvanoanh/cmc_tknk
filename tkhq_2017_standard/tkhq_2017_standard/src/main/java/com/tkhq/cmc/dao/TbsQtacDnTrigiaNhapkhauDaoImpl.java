package com.tkhq.cmc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.tkhq.cmc.common.Constants;
import com.tkhq.cmc.dto.TbsQtacDnTrigiaNhapkhauDTO;
import com.tkhq.cmc.model.TbsQtacDnTrigiaNhapkhau;
import com.tkhq.cmc.utils.Utils;
@Repository
public class TbsQtacDnTrigiaNhapkhauDaoImpl extends BaseDAO<Long, TbsQtacDnTrigiaNhapkhau> implements TbsQtacDnTrigiaNhapkhauDao{
	
	@SuppressWarnings("unchecked")
	@Override
	public TbsQtacDnTrigiaNhapkhau findById(Long id) {
		Criteria cr =  this.createCriteria();
		cr.add(Restrictions.eq("id", id));
		List<TbsQtacDnTrigiaNhapkhau> results = cr.list();
		if(results != null){
			return (TbsQtacDnTrigiaNhapkhau)results.get(0);
		}
		return null;
	}
	
	@Override
	@SuppressWarnings({ "unchecked"})
	public List<TbsQtacDnTrigiaNhapkhau> findAll() {
		Criteria cr =  this.getSession().createCriteria(TbsQtacDnTrigiaNhapkhau.class);
		cr.setMaxResults(Constants.PAGE_SIZE_10);
		List<TbsQtacDnTrigiaNhapkhau> results = (List<TbsQtacDnTrigiaNhapkhau>)cr.list();
		return (results.size() > 0) ? results : null;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<TbsQtacDnTrigiaNhapkhau> searchData(String masodn, double trigianhapkhau,String tenDn, int minRow, int maxRow) {
		Criteria cr =  this.createCriteria();
		if(!Utils.isEmpty(masodn) && !"".equals(masodn)){
			cr.add(Restrictions.ilike("masodn", masodn + Constants.PERCENT_CHARACTER));
		}
		if(!(trigianhapkhau == 0.0)){
			cr.add(Restrictions.eq("trigianhapkhau", trigianhapkhau));
		}
		if(!Utils.isEmpty(tenDn) && !"".equals(tenDn)){
			cr.add(Restrictions.ilike("tenDn", tenDn + Constants.PERCENT_CHARACTER));
		}
		
		cr.setFirstResult(minRow);
		cr.setMaxResults(maxRow);
		List<TbsQtacDnTrigiaNhapkhau> results = (List<TbsQtacDnTrigiaNhapkhau>)cr.list();
		return (results.size() > 0) ? results : null;
	}
	
	@Override
	public void insert(TbsQtacDnTrigiaNhapkhau entity) {
		try{
			this.persist(entity);
		}catch(Exception ex){
			ex.printStackTrace();
		}	
		
	}

	@Override
	public void update(TbsQtacDnTrigiaNhapkhauDTO entityDto) {
		TbsQtacDnTrigiaNhapkhau dtos = new TbsQtacDnTrigiaNhapkhau();
		dtos.setId(entityDto.getId());
		dtos.setMasodn(entityDto.getMasodn());
		dtos.setTrigianhapkhau(entityDto.getTrigianhapkhau());
		dtos.setTenDn(entityDto.getTenDn());
		dtos.setTrangThai(0);
		dtos.setMoTa(entityDto.getMoTa());
		try{
			this.update(dtos);
		}catch(Exception ex){
			ex.printStackTrace();
		}	
		
	}

	@Override
	public void delete(long id) {
		TbsQtacDnTrigiaNhapkhau entity = new TbsQtacDnTrigiaNhapkhau();
		entity.setId(id);
		try{
			this.delete(entity);
		}catch(Exception ex){
		}
		
	}

	@Override
	public long countTotal(String masodn, double trigianhapkhau, String tenDn) {
		Criteria cr =  this.createCriteria();
		if(!Utils.isEmpty(masodn) && !"".equals(masodn)){
			cr.add(Restrictions.ilike("masodn", masodn + Constants.PERCENT_CHARACTER));
		}
		if(!(trigianhapkhau == 0.0)){
			cr.add(Restrictions.eq("trigianhapkhau", trigianhapkhau));
		}
		if(!Utils.isEmpty(tenDn) && !"".equals(tenDn)){
			cr.add(Restrictions.ilike("tenDn", tenDn + Constants.PERCENT_CHARACTER));
		}
		cr.setProjection(Projections.rowCount());
		long count = (Long)cr.uniqueResult();
		
		return count;
	}
	
	@Override
	public int insertList(List<TbsQtacDnTrigiaNhapkhau> listEntity){
		try{
			this.insertBatch(listEntity);
			return Constants.SUCCESS;
		}catch(Exception ex){
			return Constants.FAILED;
		}
		
	}

}
