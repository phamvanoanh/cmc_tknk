package com.tkhq.cmc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tkhq.cmc.dao.TbsQtacDnTrigiaNhapkhauDao;
import com.tkhq.cmc.dto.TbsQtacDnTrigiaNhapkhauDTO;
import com.tkhq.cmc.model.TbsQtacDnTrigiaNhapkhau;

@Service("tbsQtacDnTrigiaNhapkhauService")
@Transactional
public class TbsQtacDnTrigiaNhapkhauServiceImpl implements TbsQtacDnTrigiaNhapkhauService{
	
	@Autowired
	private TbsQtacDnTrigiaNhapkhauDao tbsQtacDnTrigiaNhapkhauDao;
	
	@Override
	public void insert(TbsQtacDnTrigiaNhapkhau entity) {
		tbsQtacDnTrigiaNhapkhauDao.insert(entity);
		
	}

	@Override
	public void update(TbsQtacDnTrigiaNhapkhauDTO entityDto) {
		tbsQtacDnTrigiaNhapkhauDao.update(entityDto);
	}

	@Override
	public void delete(long id) {
		tbsQtacDnTrigiaNhapkhauDao.delete(id);
		
	}

	@Override
	public TbsQtacDnTrigiaNhapkhau findById(Long id) {
		return tbsQtacDnTrigiaNhapkhauDao.findById(id);
		
	}

	@Override
	public List<TbsQtacDnTrigiaNhapkhau> findAll() {
		return tbsQtacDnTrigiaNhapkhauDao.findAll();
	}

	@Override
	public long countTotal(String masodn, double trigianhapkhau,String tenDn) {
		return tbsQtacDnTrigiaNhapkhauDao.countTotal(masodn, trigianhapkhau, tenDn);
	}

	@Override
	public List<TbsQtacDnTrigiaNhapkhau> searchData(String masodn, double trigianhapkhau,String tenDn, int minRow, int maxRow) {
		return tbsQtacDnTrigiaNhapkhauDao.searchData(masodn, trigianhapkhau, tenDn, minRow, maxRow);
	}
	
	@Override
	public int insertList(List<TbsQtacDnTrigiaNhapkhau> listEntity){
		return tbsQtacDnTrigiaNhapkhauDao.insertList(listEntity);
	}
}
