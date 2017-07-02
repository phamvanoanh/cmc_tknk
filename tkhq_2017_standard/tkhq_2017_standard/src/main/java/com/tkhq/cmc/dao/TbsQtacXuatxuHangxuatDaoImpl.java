package com.tkhq.cmc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.tkhq.cmc.common.Constants;
import com.tkhq.cmc.dto.TbsQtacXuatNhapDTO;
import com.tkhq.cmc.model.TbsQtacXuatxuHangxuat;
import com.tkhq.cmc.utils.Utils;

@Repository
public class TbsQtacXuatxuHangxuatDaoImpl extends BaseDAO<Long, TbsQtacXuatxuHangxuat> implements TbsQtacXuatxuHangxuatDao{

	@Override
	public void insert(TbsQtacXuatxuHangxuat entity) {
		try{
			this.persist(entity);
		}catch(Exception ex){
			ex.printStackTrace();
		}	
		
	}

	@Override
	public void update(TbsQtacXuatNhapDTO entityDto) {
		TbsQtacXuatxuHangxuat dtos = new TbsQtacXuatxuHangxuat();
		dtos.setId(entityDto.getId());
		dtos.setMathongke(entityDto.getMathongke());
		dtos.setManuoc(entityDto.getManuoc());
		try{
			this.update(dtos);
		}catch(Exception ex){
			ex.printStackTrace();
		}	
		
	}

	@Override
	public void delete(long id) {
		TbsQtacXuatxuHangxuat entity = new TbsQtacXuatxuHangxuat();
		entity.setId(id);
		try{
			this.delete(entity);
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
	}

	@Override
	@SuppressWarnings("unchecked")
	public TbsQtacXuatxuHangxuat findById(Long id) {
		Criteria cr =  this.createCriteria();
		cr.add(Restrictions.eq("id", id));
		List<TbsQtacXuatxuHangxuat> results = cr.list();
		if(results != null){
			return (TbsQtacXuatxuHangxuat)results.get(0);
		}
		return null;
	}

	@Override
	@SuppressWarnings({ "unchecked"})
	public List<TbsQtacXuatxuHangxuat> findAll() {
		Criteria cr =  this.getSession().createCriteria(TbsQtacXuatxuHangxuat.class);
		cr.setMaxResults(Constants.PAGE_SIZE_10);
		List<TbsQtacXuatxuHangxuat> results = (List<TbsQtacXuatxuHangxuat>)cr.list();
		return (results.size() > 0) ? results : null;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<TbsQtacXuatxuHangxuat> searchData(String mathongke, String manuoc, int minRow, int maxRow) {
		Criteria cr =  this.createCriteria();
		if(!Utils.isEmpty(mathongke) && !"".equals(mathongke)){
			cr.add(Restrictions.ilike("mathongke", mathongke + Constants.PERCENT_CHARACTER));
		}
		if(!Utils.isEmpty(manuoc) && !"".equals(manuoc)){
			cr.add(Restrictions.ilike("manuoc", manuoc + Constants.PERCENT_CHARACTER));
		}
		cr.setFirstResult(minRow);
		cr.setMaxResults(maxRow);
		List<TbsQtacXuatxuHangxuat> results = (List<TbsQtacXuatxuHangxuat>)cr.list();
		return (results.size() > 0) ? results : null;
	}

	@Override
	public long countTotal(String mathongke, String manuoc) {
		Criteria cr =  this.createCriteria();
		if(!Utils.isEmpty(mathongke) && !"".equals(mathongke)){
			cr.add(Restrictions.ilike("mathongke", mathongke + Constants.PERCENT_CHARACTER));
		}
		if(!Utils.isEmpty(manuoc) && !"".equals(manuoc)){
			cr.add(Restrictions.ilike("manuoc", manuoc + Constants.PERCENT_CHARACTER));
		}
		cr.setProjection(Projections.rowCount());
		long count = (Long)cr.uniqueResult();
		
		return count;
	}

}
