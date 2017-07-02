package com.tkhq.cmc.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.tkhq.cmc.dao.Tbd_sys_userDAO;
import com.tkhq.cmc.dto.QuanLyToChucDTO;
import com.tkhq.cmc.dto.Tbd_sys_userDTO;
import com.tkhq.cmc.model.TbdSysUsers;

@Service("tbd_sys_userService")
@Transactional
public class Tbd_sys_userServiceImpl implements Tbd_sys_userService {

	@Autowired
	Tbd_sys_userDAO tbs_sys_userDAO;

	public void insertNewUser(TbdSysUsers tbdSysUsers) throws Exception {
		tbs_sys_userDAO.insertNewUser(tbdSysUsers);
	}

	public TbdSysUsers findUserByUserName(String username) {
		return tbs_sys_userDAO.findUserByUsername(username);
	}

	public List<TbdSysUsers> getAllUser() {
		return tbs_sys_userDAO.getAllUser();
	}

	public void updateTbd_sysUsers(TbdSysUsers tbdSysUser) {
		tbs_sys_userDAO.updateTbd_sysUsers(tbdSysUser);
	}

	public List<TbdSysUsers> searchUser(Integer active, String maHQ) {
		return tbs_sys_userDAO.searchUser(active, maHQ);
	}

	public void deleteByUserId(Integer userId) {
		tbs_sys_userDAO.deleteByUserId(userId);

	}

	public boolean checkLogin(String username, String password) {
		if (tbs_sys_userDAO.checkLogin(username, password) == true) {
			return true;
		} else
			return false;
	}

	public List<String> getRole(int userId, int groupId) {
		return tbs_sys_userDAO.getRole(userId, groupId);
	}

	public List<TbdSysUsers> searchByCondition(String username, String fullname, String donviHQ, Integer groupId,Integer active) {
		return tbs_sys_userDAO.searchByCondition(username,fullname,donviHQ,groupId,active);
	}

	@Override
	public List<QuanLyToChucDTO> searchUser(int groupId, int trangthai,
			String maCuc, String maChiCuc) {
		return tbs_sys_userDAO.searchUser(groupId, trangthai, maCuc, maChiCuc);
	}

	@Override
	public boolean checkRoleBieu(int ky, int thang, int quy,
			int nam, String trangthai, String path) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		if(tbs_sys_userDAO.checkRoleBieu(username, ky, thang, quy, nam, trangthai, path)==0)
			return false;
		return true;
	}

	@Override
	public int ketXuatBieu(int ky, int thang, int nam,String loai_BC, String path) {
		return tbs_sys_userDAO.ketXuatBieu(ky, thang, nam, loai_BC, path);
		
	}

//	public List<Tbd_sys_userDTO> getAllFullName(){
//		
//		return tbs_sys_userDAO.getAllFullName();
//	}
	

}
