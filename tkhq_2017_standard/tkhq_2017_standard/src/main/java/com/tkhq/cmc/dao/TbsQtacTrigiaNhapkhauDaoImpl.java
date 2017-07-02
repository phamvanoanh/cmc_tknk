package com.tkhq.cmc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.tkhq.cmc.common.Constants;
import com.tkhq.cmc.dto.TbsQtacTrigiaDTO;
import com.tkhq.cmc.model.TbsQtacTrigiaNhapkhau;
import com.tkhq.cmc.utils.Utils;

@Repository
public class TbsQtacTrigiaNhapkhauDaoImpl extends BaseDAO<Long, TbsQtacTrigiaNhapkhau> implements TbsQtacTrigiaNhapkhauDao{

	@Override
	public void insert(TbsQtacTrigiaNhapkhau entity) {
		try{
			this.persist(entity);
		}catch(Exception ex){
			ex.printStackTrace();
		}	
		
	}

	@Override
	public void update(TbsQtacTrigiaDTO entityDto) {
		TbsQtacTrigiaNhapkhau dtos = new TbsQtacTrigiaNhapkhau();
		dtos.setId(entityDto.getId());
		dtos.setMathongke(entityDto.getMathongke());
		dtos.setTrigiatinhthue(Double.valueOf(entityDto.getTrigiatinhthue()));
		try{
			this.update(dtos);
		}catch(Exception ex){
			ex.printStackTrace();
		}	
		
	}

	@Override
	public void delete(long id) {
		TbsQtacTrigiaNhapkhau entity = new TbsQtacTrigiaNhapkhau();
		entity.setId(id);
		try{
			this.delete(entity);
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
	}

	@Override
	@SuppressWarnings("unchecked")
	public TbsQtacTrigiaNhapkhau findById(Long id) {
		Criteria cr =  this.createCriteria();
		cr.add(Restrictions.eq("id", id));
		List<TbsQtacTrigiaNhapkhau> results = cr.list();
		if(results != null){
			return (TbsQtacTrigiaNhapkhau)results.get(0);
		}
		return null;
	}

	@Override
	@SuppressWarnings({ "unchecked"})
	public List<TbsQtacTrigiaNhapkhau> findAll() {
		Criteria cr =  this.getSession().createCriteria(TbsQtacTrigiaNhapkhau.class);
		cr.setMaxResults(Constants.PAGE_SIZE_10);
		List<TbsQtacTrigiaNhapkhau> results = (List<TbsQtacTrigiaNhapkhau>)cr.list();
		return (results.size() > 0) ? results : null;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<TbsQtacTrigiaNhapkhau> searchData(String mathongke, String trigiatinhthue, int minRow, int maxRow) {
		Criteria cr =  this.createCriteria();
		if(!Utils.isEmpty(mathongke) && !"".equals(mathongke)){
			cr.add(Restrictions.ilike("mathongke", mathongke + Constants.PERCENT_CHARACTER));
		}
		if(!Utils.isEmpty(trigiatinhthue) && !"".equals(trigiatinhthue)){
			cr.add(Restrictions.eq("trigiatinhthue", Double.parseDouble(trigiatinhthue)));
		}
		cr.setFirstResult(minRow);
		cr.setMaxResults(maxRow);
		List<TbsQtacTrigiaNhapkhau> results = (List<TbsQtacTrigiaNhapkhau>)cr.list();
		return (results.size() > 0) ? results : null;
	}

	@Override
	public long countTotal(String mathongke, String trigiatinhthue) {
		Criteria cr =  this.createCriteria();
		if(!Utils.isEmpty(mathongke) && !"".equals(mathongke)){
			cr.add(Restrictions.ilike("mathongke", mathongke + Constants.PERCENT_CHARACTER));
		}
		if(!Utils.isEmpty(trigiatinhthue) && !"".equals(trigiatinhthue)){
			cr.add(Restrictions.eq("trigiatinhthue", Double.parseDouble(trigiatinhthue)));
		}
		cr.setProjection(Projections.rowCount());
		long count = (Long)cr.uniqueResult();
		
		return count;
	}

}