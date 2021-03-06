package com.tkhq.cmc.dao;

import java.util.List;

import com.tkhq.cmc.dto.QuanLyToChucDTO;
import com.tkhq.cmc.dto.Tbd_sys_userDTO;
import com.tkhq.cmc.model.TbdSysLogSession;
import com.tkhq.cmc.model.TbdSysUsers;

public interface Tbd_sys_userDAO {

	void insertNewUser(TbdSysUsers tbdSysUser) throws Exception;
	TbdSysUsers findUserByUsername(String username);
	List<TbdSysUsers> getAllUser();
	void updateTbd_sysUsers(TbdSysUsers tbdSysUser);
	List<TbdSysUsers> searchUser(Integer active,String maHQ);
	void deleteByUserId(Integer userId);
	boolean checkLogin(String username,String password);
	public List<String> getRole(int userId, int groupId);
	List<TbdSysUsers> searchByCondition(String username, String fullname, String donviHQ, Integer groupId,Integer active);
	public List<QuanLyToChucDTO> searchUser(int groupId, int trangthai, String maCuc, String maChiCuc);
	int checkRoleBieu(String username,final int ky, final int thang, final int quy,final int nam,final String trangthai,final String path);
	//List<Tbd_sys_userDTO> getAllFullName();
	public int ketXuatBieu(int ky, int thang, int nam,String loai_BC, String path);
}
