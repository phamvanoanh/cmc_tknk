package com.tkhq.cmc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tkhq.cmc.dao.TbsQtacDnTrigiaXuatkhauDao;
import com.tkhq.cmc.dto.TbsQtacDnTrigiaXuatkhauDTO;
import com.tkhq.cmc.model.TbsQtacDnTrigiaXuatkhau;


@Service("tbsQtacDnTrigiaXuatkhauService")
@Transactional
public class TbsQtacDnTrigiaXuatkhauServiceImpl implements TbsQtacDnTrigiaXuatkhauService{
	
	@Autowired
	private TbsQtacDnTrigiaXuatkhauDao tbsqtacdntrigiaxuatkhaudao;
	
	@Override
	public void insert(TbsQtacDnTrigiaXuatkhau entity) {
		tbsqtacdntrigiaxuatkhaudao.insert(entity);
	}

	@Override
	public void update(TbsQtacDnTrigiaXuatkhauDTO entityDto) {
		tbsqtacdntrigiaxuatkhaudao.update(entityDto);
	}

	@Override
	public void delete(long id) {
		tbsqtacdntrigiaxuatkhaudao.delete(id);
	}

	@Override
	public TbsQtacDnTrigiaXuatkhau findById(Long id) {
		return tbsqtacdntrigiaxuatkhaudao.findById(id);
	}

	@Override
	public List<TbsQtacDnTrigiaXuatkhau> findAll() {
		return tbsqtacdntrigiaxuatkhaudao.findAll();
	}

	@Override
	public List<TbsQtacDnTrigiaXuatkhau> searchData(String masodn, double trigiaxuatkhau,String tenDn, int minRow, int maxRow) {
		return tbsqtacdntrigiaxuatkhaudao.searchData(masodn, trigiaxuatkhau, tenDn, minRow, maxRow);
	}

	@Override
	public long countTotal(String masodn, double trigiaxuatkhau,String tenDn) {
		return tbsqtacdntrigiaxuatkhaudao.countTotal(masodn, trigiaxuatkhau, tenDn);
	}
	
	public int insertList(List<TbsQtacDnTrigiaXuatkhau> listEntity){
		return tbsqtacdntrigiaxuatkhaudao.insertList(listEntity);
	}
}
