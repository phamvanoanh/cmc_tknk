package com.tkhq.cmc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tkhq.cmc.dao.TbsQtacVantaiHangnhapNnDao;
import com.tkhq.cmc.dto.TbsQtacXuatNhapDTO;
import com.tkhq.cmc.model.TbsQtacVantaiHangnhapNn;

@Service("tbsQtacVantaiHangnhapNnService")
@Transactional
public class TbsQtacVantaiHangnhapNnServiceImpl implements TbsQtacVantaiHangnhapNnService{
	
	@Autowired
	private TbsQtacVantaiHangnhapNnDao tbsQtacVantaiHangnhapNnDao;
	
	@Override
	public void insert(TbsQtacVantaiHangnhapNn entity) {
		tbsQtacVantaiHangnhapNnDao.insert(entity);
	}

	@Override
	public void update(TbsQtacXuatNhapDTO entityDto) {
		tbsQtacVantaiHangnhapNnDao.update(entityDto);
	}

	@Override
	public void delete(long id) {
		tbsQtacVantaiHangnhapNnDao.delete(id);
	}

	@Override
	public TbsQtacVantaiHangnhapNn findById(Long id) {
		return tbsQtacVantaiHangnhapNnDao.findById(id);
	}

	@Override
	public List<TbsQtacVantaiHangnhapNn> findAll() {
		return tbsQtacVantaiHangnhapNnDao.findAll();
	}

	@Override
	public List<TbsQtacVantaiHangnhapNn> searchData(String mathongke, String macuakhaunn, int minRow, int maxRow) {
		return tbsQtacVantaiHangnhapNnDao.searchData(mathongke, macuakhaunn, minRow, maxRow);
	}

	@Override
	public long countTotal(String mathongke, String macuakhaunn) {
		return tbsQtacVantaiHangnhapNnDao.countTotal(mathongke, macuakhaunn);
	}
}
