package com.tkhq.cmc.controller.rest;

import java.util.ArrayList;
import java.util.List;

import org.jboss.logging.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.tkhq.cmc.dto.TbdSysFunctionsDTO;
import com.tkhq.cmc.dto.Tbd_sys_userDTO;
import com.tkhq.cmc.model.TbdSysUsers;
import com.tkhq.cmc.services.TbdSysFunctionsService;
import com.tkhq.cmc.services.Tbd_sys_GroupsService;
import com.tkhq.cmc.services.Tbd_sys_userService;

@RestController
public class Tbd_sys_userRestController {

	@Autowired
	private Tbd_sys_userService tbd_sys_userService;
	@Autowired
	private Tbd_sys_GroupsService tbd_sys_groupService;
	@Autowired
	private TbdSysFunctionsService tbdSysFunctionsService;
	@Autowired
	private PasswordEncoder encoder;

	@RequestMapping(value = "/tbd_sys_user/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TbdSysUsers>> getAllUser() {
		System.out.println("getAllUser");
		List<TbdSysUsers> listUser = new ArrayList<TbdSysUsers>();
		System.out.println("Find all");
		listUser = tbd_sys_userService.getAllUser();
		if (listUser == null) {
			System.out.println("Khong tim duoc ban ghi nao!");
			return new ResponseEntity<List<TbdSysUsers>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<TbdSysUsers>>(listUser,
				HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/tbd_sys_user/", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Integer> createNewUser(
			@RequestBody Tbd_sys_userDTO params, UriComponentsBuilder ucBuilder) {
		System.out.println("Create new User");

		if (tbd_sys_userService.findUserByUserName(params.getUsername()) != null) {
			return new ResponseEntity<Integer>(2, HttpStatus.OK);
		}
		TbdSysUsers entity = new TbdSysUsers();
		try {

			entity.setUsername(params.getUsername());
			entity.setPassword(encoder.encode(params.getPassword()));
			entity.setActive(params.getActive());
			entity.setIsLanhdao(params.getIsLanhdao());
			entity.setGroupId(params.getGroupId());
			entity.setMaHq(params.getMaHq());
			entity.setUserdescription(params.getUserdescription());
			entity.setWorkstation(params.getWorkstation());
			entity.setChucvu(params.getChucvu());
			entity.setEmailHQ(params.getEmailHQ());
			entity.setEmailKhac(params.getEmailKhac());
			entity.setDidong(params.getDidong());
			entity.setDienthoai(params.getDienthoai());
			entity.setFullName(params.getFullName());
			tbd_sys_userService.insertNewUser(entity);
		} catch (Exception ex) {
			return new ResponseEntity<Integer>(0, HttpStatus.CREATED);
		}
		return new ResponseEntity<Integer>(1, HttpStatus.OK);
	}

	@RequestMapping(value = "/tbd_sys_user/{username}", method = RequestMethod.DELETE)
	public ResponseEntity<TbdSysUsers> deleteUser(
			@PathVariable("username") String username) {

		System.out.println("Deleting data: " + username);

		TbdSysUsers tbs_sysUser = tbd_sys_userService
				.findUserByUserName(username);
		if (tbs_sysUser == null) {
			System.out
					.println("Unable to delete. Data not found with username: "
							+ username);
			return new ResponseEntity<TbdSysUsers>(HttpStatus.NOT_FOUND);
		}

		try {
			tbd_sys_userService.deleteByUserId(tbs_sysUser.getUserId());
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return new ResponseEntity<TbdSysUsers>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/tbd_sys_user/Search", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TbdSysUsers>> findUserByActive(
			@Param Integer active, @Param String maHQ) {
		System.out.println("findUserByActive");
		List<TbdSysUsers> listUser = new ArrayList<TbdSysUsers>();
		listUser = tbd_sys_userService.searchUser(active, maHQ);
		return new ResponseEntity<List<TbdSysUsers>>(listUser,
				HttpStatus.ACCEPTED);
	}

	@RequestMapping(value = "/tbd_sys_user/doimatkhau", method = RequestMethod.PUT)
	public ResponseEntity<Integer> changePassword(
			@RequestParam("username") String username,
			@RequestParam("oldPass") String oldPass,
			@RequestParam("newPass") String newPass) {
		System.out.println("Change Pass");
		TbdSysUsers tbdSysUsers = tbd_sys_userService
				.findUserByUserName(username);

		if (tbdSysUsers == null) {
			System.out.println("Data not found");
			return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
		}

		if (encoder.matches(oldPass, tbdSysUsers.getPassword())) {
			tbdSysUsers.setPassword(encoder.encode(newPass));
			tbd_sys_userService.updateTbd_sysUsers(tbdSysUsers);
			return new ResponseEntity<Integer>(1, HttpStatus.OK);
		}
		return new ResponseEntity<Integer>(2, HttpStatus.OK);

	}

	@RequestMapping(value = "/tbd_sys_user/{username}", method = RequestMethod.PUT)
	public ResponseEntity<Integer> updateSysUser(
			@PathVariable("username") String username,
			@RequestBody Tbd_sys_userDTO tbd_sys_userDTO) {
		System.out.println("Updating data with username:" + username);

		TbdSysUsers tbdSysUsers = tbd_sys_userService
				.findUserByUserName(username);

		if (tbdSysUsers == null) {
			System.out.println("Data not found");
			return new ResponseEntity<Integer>(0, HttpStatus.OK);
		}

		try {
			tbdSysUsers.setUsername(tbd_sys_userDTO.getUsername());
			tbdSysUsers.setPassword(tbd_sys_userDTO.getPassword());
			tbdSysUsers.setActive(tbd_sys_userDTO.getActive());
			tbdSysUsers.setGroupId(tbd_sys_userDTO.getGroupId());
			tbdSysUsers.setIsLanhdao(tbd_sys_userDTO.getIsLanhdao());
			tbdSysUsers.setMaHq(tbd_sys_userDTO.getMaHq());
			tbdSysUsers
					.setUserdescription(tbd_sys_userDTO.getUserdescription());
			tbdSysUsers.setWorkstation(tbd_sys_userDTO.getWorkstation());
			tbdSysUsers.setChucvu(tbd_sys_userDTO.getChucvu());
			tbdSysUsers.setEmailHQ(tbd_sys_userDTO.getEmailHQ());
			tbdSysUsers.setEmailKhac(tbd_sys_userDTO.getEmailKhac());
			tbdSysUsers.setDidong(tbd_sys_userDTO.getDidong());
			tbdSysUsers.setDienthoai(tbd_sys_userDTO.getDienthoai());
			tbdSysUsers.setFullName(tbd_sys_userDTO.getFullName());
			tbd_sys_userService.updateTbd_sysUsers(tbdSysUsers);
		} catch (Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity<Integer>(2, HttpStatus.OK);
		}
		return new ResponseEntity<Integer>(1, HttpStatus.OK);
	}

	@RequestMapping(value = "/tbd_sys_user/searchCondition", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TbdSysUsers>> search(
			@RequestBody Tbd_sys_userDTO userDTO) {
		List<TbdSysUsers> list = tbd_sys_userService.searchByCondition(
				userDTO.getUsername(), userDTO.getFullName(),
				userDTO.getMaHq(), userDTO.getGroupId(), userDTO.getActive());
		return new ResponseEntity<List<TbdSysUsers>>(list, HttpStatus.OK);
	}

	@RequestMapping(value = "/getAllFunctions", method = RequestMethod.GET)
	public ResponseEntity<List<TbdSysFunctionsDTO>> getAllFunctions() {
		List<TbdSysFunctionsDTO> functions = tbdSysFunctionsService.getAll();

		if (functions.size() > 0) {
			return new ResponseEntity<List<TbdSysFunctionsDTO>>(functions,
					HttpStatus.OK);
		} else {
			return new ResponseEntity<List<TbdSysFunctionsDTO>>(
					HttpStatus.NOT_FOUND);
		}

	}

	// @RequestMapping(value="/getAllFullName", method=RequestMethod.GET)
	// public ResponseEntity<List<Tbd_sys_userDTO>> getAllFullName(){
	// List<Tbd_sys_userDTO> list = tbd_sys_userService.getAllFullName();
	// return new ResponseEntity<List<Tbd_sys_userDTO>>(list,HttpStatus.OK);
	// }
}
