package com.tkhq.cmc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.tkhq.cmc.common.Constants;
import com.tkhq.cmc.dto.TbsQtacLuongDTO;
import com.tkhq.cmc.model.TbsQtacLuongNhapkhau;
import com.tkhq.cmc.utils.Utils;

@Repository
public class TbsQtacLuongNhapkhauDaoImpl extends BaseDAO<Long, TbsQtacLuongNhapkhau> implements TbsQtacLuongNhapkhauDao{

	@Override
	public void insert(TbsQtacLuongNhapkhau entity) {
		try{
			this.persist(entity);
		}catch(Exception ex){
			ex.printStackTrace();
		}	
		
	}

	@Override
	public void update(TbsQtacLuongDTO entityDto) {
		TbsQtacLuongNhapkhau dtos = new TbsQtacLuongNhapkhau();
		dtos.setId(entityDto.getId());
		dtos.setMathongke(entityDto.getMathongke());
		dtos.setLuonglonnhat(Double.valueOf(entityDto.getLuonglonnhat()));
		try{
			this.update(dtos);
		}catch(Exception ex){
			ex.printStackTrace();
		}	
		
	}

	@Override
	public void delete(long id) {
		TbsQtacLuongNhapkhau entity = new TbsQtacLuongNhapkhau();
		entity.setId(id);
		try{
			this.delete(entity);
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
	}

	@Override
	@SuppressWarnings("unchecked")
	public TbsQtacLuongNhapkhau findById(Long id) {
		Criteria cr =  this.createCriteria();
		cr.add(Restrictions.eq("id", id));
		List<TbsQtacLuongNhapkhau> results = cr.list();
		if(results != null){
			return (TbsQtacLuongNhapkhau)results.get(0);
		}
		return null;
	}

	@Override
	@SuppressWarnings({ "unchecked"})
	public List<TbsQtacLuongNhapkhau> findAll() {
		Criteria cr =  this.getSession().createCriteria(TbsQtacLuongNhapkhau.class);
		cr.setMaxResults(Constants.PAGE_SIZE_10);
		List<TbsQtacLuongNhapkhau> results = (List<TbsQtacLuongNhapkhau>)cr.list();
		return (results.size() > 0) ? results : null;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<TbsQtacLuongNhapkhau> searchData(String mathongke, String luonglonnhat, int minRow, int maxRow) {
		Criteria cr =  this.createCriteria();
		if(!Utils.isEmpty(mathongke) && !"".equals(mathongke)){
			cr.add(Restrictions.ilike("mathongke", mathongke + Constants.PERCENT_CHARACTER));
		}
		if(!Utils.isEmpty(luonglonnhat) && !"".equals(luonglonnhat)){
			cr.add(Restrictions.eq("luonglonnhat", Double.parseDouble(luonglonnhat)));
		}
		cr.setFirstResult(minRow);
		cr.setMaxResults(maxRow);
		List<TbsQtacLuongNhapkhau> results = (List<TbsQtacLuongNhapkhau>)cr.list();
		return (results.size() > 0) ? results : null;
	}

	@Override
	public long countTotal(String mathongke, String luonglonnhat) {
		Criteria cr =  this.createCriteria();
		if(!Utils.isEmpty(mathongke) && !"".equals(mathongke)){
			cr.add(Restrictions.ilike("mathongke", mathongke + Constants.PERCENT_CHARACTER));
		}
		if(!Utils.isEmpty(luonglonnhat) && !"".equals(luonglonnhat)){
			cr.add(Restrictions.eq("luonglonnhat", Double.parseDouble(luonglonnhat)));
		}
		cr.setProjection(Projections.rowCount());
		long count = (Long)cr.uniqueResult();
		
		return count;
	}
}
