package com.tkhq.cmc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tkhq.cmc.dao.Tbd_KetXuatTNHTDAO;
import com.tkhq.cmc.dto.TbdHqByUserNameDTO;
import com.tkhq.cmc.dto.Tbd_KetXuatTNHTDTO;

@Service
@Transactional
public class Tbd_KetXuatTNHTServiceImpl implements Tbd_KetXuatTNHTService{
	
	@Autowired
	Tbd_KetXuatTNHTDAO ketXuatDao;

	public List<Tbd_KetXuatTNHTDTO> getKetXuatTHHT(String userName, String tuNgay, String denNgay) {
		return ketXuatDao.ts_KetXuatTNHT(userName, tuNgay, denNgay);
	}

	public Tbd_KetXuatTNHTDTO getKetXuatTHHTById(String id, String loaiHangHoaKx) {
		return ketXuatDao.getKetXuatTNHTById(id, loaiHangHoaKx);
	}

	public int updateTrangThaiPheDuyetKetXuatTNHT(String id, int trangThaiPheDuyet) throws Exception {
		return ketXuatDao.updateTrangThaiPheDuyetKetXuatTNHT(id, trangThaiPheDuyet);
	}

	@Override
	public TbdHqByUserNameDTO getHqByUserLogin(String userName) {
		return ketXuatDao.getHqByUserLogin(userName);
	}
}
