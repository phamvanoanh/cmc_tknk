package com.tkhq.cmc.dao;

import java.util.List;

import com.tkhq.cmc.dto.TbsQtacXuatNhapDTO;
import com.tkhq.cmc.model.TbsQtacVantaiHangnhapVn;

public interface TbsQtacVantaiHangnhapVnDao {
	public void insert(TbsQtacVantaiHangnhapVn entity);

	public void update(TbsQtacXuatNhapDTO entityDto);

	public void delete(long id);

	public TbsQtacVantaiHangnhapVn findById(Long id);

	public List<TbsQtacVantaiHangnhapVn> findAll();
	
	public List<TbsQtacVantaiHangnhapVn> searchData(String mathongke, String macuakhauvn, int minRow, int maxRow);
	
	public long countTotal(String mathongke, String macuakhauvn);
}
