package com.tkhq.cmc.controller.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tkhq.cmc.common.JasperExport;
import com.tkhq.cmc.dto.BCHTX27HDTO;
import com.tkhq.cmc.dto.BCNKHH015KDTO;
import com.tkhq.cmc.dto.BCNKHHCOUDDTO;
import com.tkhq.cmc.dto.BCNKHHCUCHQDTO;
import com.tkhq.cmc.dto.BCNKHHPTVT026HDTO;
import com.tkhq.cmc.dto.BCNKHTDTK017K1DTO;
import com.tkhq.cmc.dto.BCNKHTDTK017KDTO;
import com.tkhq.cmc.dto.BCNKHTDTK017KMasterDTO;
import com.tkhq.cmc.dto.BCNKTDNCYDTO;
import com.tkhq.cmc.dto.BCSLDNTTTPDTO;
import com.tkhq.cmc.dto.BCTGNKCHIUTHUECUCHQDTO;
import com.tkhq.cmc.dto.BCTTXNKTCCHQDTO;
import com.tkhq.cmc.dto.BCUSBXKHHDTO;
import com.tkhq.cmc.dto.BCNKNUOCMHCY024TDTO;
import com.tkhq.cmc.dto.BCXKHH015KDTO;
import com.tkhq.cmc.dto.BCXKHHCUCHQDTO;
import com.tkhq.cmc.dto.BCXKHHPTVT025HDTO;
import com.tkhq.cmc.dto.BCXKHHTTTCHQDTO;
import com.tkhq.cmc.dto.BCXKMHCYTINHDTO;
import com.tkhq.cmc.dto.BCXKMHCYTPTVTTCHQDTO;
import com.tkhq.cmc.dto.BCXKMHCYTPTVTTCHQQUYDTO;
import com.tkhq.cmc.dto.BCXKNUOCMHCY023TDTO;
import com.tkhq.cmc.dto.BCXKNUOCMHCYTINHDTO;
import com.tkhq.cmc.dto.BCXKTDNCYDTO;
import com.tkhq.cmc.dto.BCXNKHHTNLHDTO;
import com.tkhq.cmc.dto.BCXNKTLHDNDTO;
import com.tkhq.cmc.dto.BCXNKHHTT19TDTO;
import com.tkhq.cmc.dto.BCXNKTTP022TDTO;
import com.tkhq.cmc.dto.BGHHNKTT55DTO;
import com.tkhq.cmc.dto.TMBCNKHH20TDTO;
import com.tkhq.cmc.dto.TMBCXKHH20TDTO;
import com.tkhq.cmc.dto.TTGXKPTVTDTO;
import com.tkhq.cmc.services.PHANHE_PBTKService;
import com.tkhq.cmc.services.Tbd_sys_userService;



@RestController
@RequestMapping(value="pbtk")
public class PHANHE_PBTKRestController {

	@Autowired
	PHANHE_PBTKService baocaoService;
	
	@Autowired
	Tbd_sys_userService userService;
	
	@RequestMapping(value="/Ts_BCXKHH20T", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHH20T(String maHQ,int thang, int nam, String loai_BC, 
			@RequestParam(value="isKetXuat",required=false) String isKetXuat,
			@RequestParam(value="type",required=false) String type){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(0, thang, nam, loai_BC, "Ts_BCXKHH20T");
		
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXKHH20T");
				
		List<TMBCXKHH20TDTO> list = baocaoService.ts_BCXKHH20T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		return JasperExport.ExportReport("BCXKHH20T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKHH20T1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHH20T1(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXKHH20T1");
				
		List<TMBCXKHH20TDTO> list = baocaoService.ts_BCXKHH20T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		return JasperExport.ExportReport("BCXKHH20T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHTDTK017K", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHTDTK017K(String maHQ,int ky,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(ky, thang, nam, loai_BC, "Ts_BCNKHTDTK017K");
		
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKHTDTK017K");
		
		List<BCNKHTDTK017KDTO> list1 = baocaoService.ts_BCNKHTDTK017K(maHQ, ky, thang, nam, loai_BC);
		List<BCNKHTDTK017K1DTO> list2 = baocaoService.ts_BCNKHTDTK017K1(maHQ, ky, thang, nam);
		
		BCNKHTDTK017KMasterDTO data = new BCNKHTDTK017KMasterDTO(ky, thang, nam, loai_BC, list1, list2);
		
		List<BCNKHTDTK017KMasterDTO> lst= new ArrayList<BCNKHTDTK017KMasterDTO>();
		if(list1.size() > 0){
			lst.add(data);
		}
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(lst);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHTDTK017KMaster",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHTDTK017K1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHTDTK017K1(String maHQ,int ky,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKHTDTK017K1");
		
		List<BCNKHTDTK017KDTO> list1 = baocaoService.ts_BCNKHTDTK017K(maHQ, ky, thang, nam, loai_BC);
		List<BCNKHTDTK017K1DTO> list2 = baocaoService.ts_BCNKHTDTK017K1(maHQ, ky, thang, nam);
		
		BCNKHTDTK017KMasterDTO data = new BCNKHTDTK017KMasterDTO(ky, thang, nam, loai_BC, list1, list2);
		
		List<BCNKHTDTK017KMasterDTO> lst= new ArrayList<BCNKHTDTK017KMasterDTO>();
		if(list1.size() > 0){
			lst.add(data);
		}
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(lst);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHTDTK017KMaster",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHH20T", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHH20T(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(0, thang, nam, loai_BC, "Ts_BCNKHH20T");
		
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKHH20T");
		
		List<TMBCNKHH20TDTO> list = baocaoService.ts_BCNKHH20T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHH20T",listData, param, type, hasRole);
	}
	@RequestMapping(value="/Ts_BCNKHH20T1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHH20T1(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKHH20T1");
		
		List<TMBCNKHH20TDTO> list = baocaoService.ts_BCNKHH20T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHH20T",listData, param, type, hasRole);
	}
	@RequestMapping(value="/Ts_BCXKHH015K", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHH015K(String maHQ,int ky,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(ky, thang, nam, loai_BC, "Ts_BCXKHH015K");

		boolean hasRole = userService.checkRoleBieu(ky, thang, 0, nam, loai_BC, "Ts_BCXKHH015K");
		
		List<BCXKHH015KDTO> list = baocaoService.ts_BCXKHH015K(maHQ, ky, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHH015K",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKHH015K1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHH015K1(String maHQ,int ky,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(ky, thang, 0, nam, loai_BC, "Ts_BCXKHH015K1");
		
		List<BCXKHH015KDTO> list = baocaoService.ts_BCXKHH015K(maHQ, ky, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHH015K",listData, param, type, hasRole);
	}
	
	
	@RequestMapping(value="/Ts_BCXKHH015K2", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHH015K2(String maCuc,String maHQ,int ky,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(ky, thang, 0, nam, loai_BC, "Ts_BCXKHH015K2");
		List<BCXKHH015KDTO> list;
		if(maHQ.equals("0")){
			list = baocaoService.ts_BCXKHH015K(maCuc, ky, thang, nam, loai_BC);
		}
		else{
			list = baocaoService.ts_BCXKHH015K(maHQ, ky, thang, nam, loai_BC);
		}
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHH015K",listData, param, type, hasRole);
	}
	
	
	@RequestMapping(value="/Ts_BCNKHH015K", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHH015K(String maHQ,int ky,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(ky, thang, nam, loai_BC, "Ts_BCNKHH015K");

		boolean hasRole = userService.checkRoleBieu(ky, thang, 0, nam, loai_BC, "Ts_BCNKHH015K");
		
		List<BCNKHH015KDTO> list = baocaoService.ts_BCNKHH015K(maHQ, ky, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHH015K",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHH015K1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHH015K1(String maHQ,int ky,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(ky, thang, 0, nam, loai_BC, "Ts_BCNKHH015K1");
		
		List<BCNKHH015KDTO> list = baocaoService.ts_BCNKHH015K(maHQ, ky, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHH015K",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHH015K2", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHH015K2(String maCuc,String maHQ,int ky,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(ky, thang, 0, nam, loai_BC, "Ts_BCNKHH015K2");
		List<BCNKHH015KDTO> list;
		if(maHQ.equals("0")){
			list = baocaoService.ts_BCNKHH015K(maCuc, ky, thang, nam, loai_BC);
		}else{
			list = baocaoService.ts_BCNKHH015K(maHQ, ky, thang, nam, loai_BC);
		}
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHH015K",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXNKTTP022T", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXNKTTP022T(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(0, thang, nam, loai_BC, "Ts_BCXNKTTP022T");

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXNKTTP022T");
		
		List<BCXNKTTP022TDTO> list = baocaoService.ts_BCXNKTTP022T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXNKTTP022T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXNKTTP022T1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXNKTTP022T1(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXNKTTP022T1");
		
		List<BCXNKTTP022TDTO> list = baocaoService.ts_BCXNKTTP022T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXNKTTP022T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCUSBXKHH", method =RequestMethod.GET)
	public ResponseEntity<byte[]> Ts_BCUSBXKHH(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCUSBXKHH");
		
		List<BCUSBXKHHDTO> list = baocaoService.Ts_BCUSBXKHH(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCUSBXKHH",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCUSBNKHH", method =RequestMethod.GET)
	public ResponseEntity<byte[]> Ts_BCUSBNKHH(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCUSBNKHH");
		
		List<BCUSBXKHHDTO> list = baocaoService.Ts_BCUSBNKHH(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCUSBNKHH",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKNUOCMHCY023T", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKNUOCMHCY023T(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(0, thang, nam, loai_BC, "Ts_BCXKNUOCMHCY023T");

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXKNUOCMHCY023T");
		
		List<BCXKNUOCMHCY023TDTO> list = baocaoService.ts_BCXKNUOCMHCY023T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKNUOCMHCY023T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKNUOCMHCY023T1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKNUOCMHCY023T1(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXKNUOCMHCY023T1");
		
		List<BCXKNUOCMHCY023TDTO> list = baocaoService.ts_BCXKNUOCMHCY023T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKNUOCMHCY023T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKNUOCMHCY024T", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKNUOCMHCY024T(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(0, thang, nam, loai_BC, "Ts_BCNKNUOCMHCY024T");

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKNUOCMHCY024T");
		
		List<BCNKNUOCMHCY024TDTO> list = baocaoService.ts_BCNKNUOCMHCY024T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKNUOCMHCY024T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKNUOCMHCY024T1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKNUOCMHCY024T1(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKNUOCMHCY024T1");
		
		List<BCNKNUOCMHCY024TDTO> list = baocaoService.ts_BCNKNUOCMHCY024T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKNUOCMHCY024T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKHHPTVT025H", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHHPTVT025H(String maHQ,int quy, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
		{	
			switch (quy) {
			case 1:
				userService.ketXuatBieu(0, 1, nam, loai_BC, "Ts_BCXKHHPTVT025H");
				userService.ketXuatBieu(0, 2, nam, loai_BC, "Ts_BCXKHHPTVT025H");
				userService.ketXuatBieu(0, 3, nam, loai_BC, "Ts_BCXKHHPTVT025H");
			case 2:
				userService.ketXuatBieu(0, 4, nam, loai_BC, "Ts_BCXKHHPTVT025H");
				userService.ketXuatBieu(0, 5, nam, loai_BC, "Ts_BCXKHHPTVT025H");
				userService.ketXuatBieu(0, 6, nam, loai_BC, "Ts_BCXKHHPTVT025H");
			case 3:
				userService.ketXuatBieu(0, 7, nam, loai_BC, "Ts_BCXKHHPTVT025H");
				userService.ketXuatBieu(0, 8, nam, loai_BC, "Ts_BCXKHHPTVT025H");
				userService.ketXuatBieu(0, 9, nam, loai_BC, "Ts_BCXKHHPTVT025H");
			case 4:
				userService.ketXuatBieu(0, 10, nam, loai_BC, "Ts_BCXKHHPTVT025H");
				userService.ketXuatBieu(0, 11, nam, loai_BC, "Ts_BCXKHHPTVT025H");
				userService.ketXuatBieu(0, 12, nam, loai_BC, "Ts_BCXKHHPTVT025H");
			}
			
		}

		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, loai_BC, "Ts_BCXKHHPTVT025H");
		
		List<BCXKHHPTVT025HDTO> list = baocaoService.ts_BCXKHHPTVT025H(maHQ, quy, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHHPTVT025H",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKHHPTVT025H1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHHPTVT025H1(String maHQ,int quy, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, loai_BC, "Ts_BCXKHHPTVT025H1");
		
		List<BCXKHHPTVT025HDTO> list = baocaoService.ts_BCXKHHPTVT025H(maHQ, quy, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHHPTVT025H",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHHPTVT026H", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHHPTVT026H(String maHQ,int quy, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
		{	
			switch (quy) {
			case 1:
				userService.ketXuatBieu(0, 1, nam, loai_BC, "Ts_BCNKHHPTVT026H");
				userService.ketXuatBieu(0, 2, nam, loai_BC, "Ts_BCNKHHPTVT026H");
				userService.ketXuatBieu(0, 3, nam, loai_BC, "Ts_BCNKHHPTVT026H");
			case 2:
				userService.ketXuatBieu(0, 4, nam, loai_BC, "Ts_BCNKHHPTVT026H");
				userService.ketXuatBieu(0, 5, nam, loai_BC, "Ts_BCNKHHPTVT026H");
				userService.ketXuatBieu(0, 6, nam, loai_BC, "Ts_BCNKHHPTVT026H");
			case 3:
				userService.ketXuatBieu(0, 7, nam, loai_BC, "Ts_BCNKHHPTVT026H");
				userService.ketXuatBieu(0, 8, nam, loai_BC, "Ts_BCNKHHPTVT026H");
				userService.ketXuatBieu(0, 9, nam, loai_BC, "Ts_BCNKHHPTVT026H");
			case 4:
				userService.ketXuatBieu(0, 10, nam, loai_BC, "Ts_BCNKHHPTVT026H");
				userService.ketXuatBieu(0, 11, nam, loai_BC, "Ts_BCNKHHPTVT026H");
				userService.ketXuatBieu(0, 12, nam, loai_BC, "Ts_BCNKHHPTVT026H");
			}
			
		}

		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, loai_BC, "Ts_BCNKHHPTVT026H");
		
		List<BCNKHHPTVT026HDTO> list = baocaoService.ts_BCNKHHPTVT026H(maHQ, quy, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHHPTVT026H",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHHPTVT026H1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHHPTVT026H1(String maHQ,int quy, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, "", "Ts_BCNKHHPTVT026H1");
		
		List<BCNKHHPTVT026HDTO> list = baocaoService.ts_BCNKHHPTVT026H(maHQ, quy, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHHPTVT026H",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCHTX27H", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCHTX27H(String maHQ,int quy, int nam,String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, "", "Ts_BCHTX27H");
		
		List<BCHTX27HDTO> list = baocaoService.ts_BCHTX27H(maHQ, quy, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCHTX27H",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCHTX27H1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCHTX27H1(String maHQ,int quy, int nam,String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, "", "Ts_BCHTX27H1");
		
		List<BCHTX27HDTO> list = baocaoService.ts_BCHTX27H(maHQ, quy, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCHTX27H",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKHHTT18T", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHHTT18T(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(0, thang, nam, loai_BC, "Ts_BCXKHHTT18T");

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXKHHTT18T");
		
		List<BCXNKHHTT19TDTO> list = baocaoService.ts_BCXKHHTT18T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHHTT18T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKHHTT18T1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHHTTTCHQ(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXKHHTT18T1");
		
		List<BCXKHHTTTCHQDTO> list = baocaoService.ts_BCXKHHTTTCHQ(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHHTTTCHQ",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCXKHHTT18T2", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHHTT18T2(String maCuc,String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCXKHHTT18T2");
		List<BCXNKHHTT19TDTO> list;
		if(maHQ.equals("0")){
			list = baocaoService.ts_BCXKHHTT18T(maCuc, thang, nam, loai_BC);
		}else{
			list = baocaoService.ts_BCXKHHTT18T(maHQ, thang, nam, loai_BC);
		}		
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHHTT18T",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHHTT19T", method =RequestMethod.GET)
	public ResponseEntity<byte[]> Ts_BCXKHHTT19T(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type,
			@RequestParam(value="isKetXuat",required=false) String isKetXuat){
		
		if(isKetXuat != null && isKetXuat.equals("1"))
			userService.ketXuatBieu(0, thang, nam, loai_BC, "Ts_BCNKHHTT19T");

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKHHTT19T");
		
		List<BCXNKHHTT19TDTO> list = baocaoService.ts_BCNKHHTT19T(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHHTT19T",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHHTT19T1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> Ts_BCXKHHTT19T1(String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKHHTT19T1");
		
		List<BCXKHHTTTCHQDTO> list = baocaoService.ts_BCNKHHTTTCHQ(maHQ, thang, nam, loai_BC);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHHTTTCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCNKHHTT19T2", method =RequestMethod.GET)
	public ResponseEntity<byte[]> Ts_BCXKHHTT19T2(String maCuc,String maHQ,int thang, int nam, String loai_BC, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, loai_BC, "Ts_BCNKHHTT19T2");
		List<BCXNKHHTT19TDTO> list;
		if(maHQ.equals("0")){
			list = baocaoService.ts_BCNKHHTT19T(maCuc, thang, nam, loai_BC);
		}else{
			list = baocaoService.ts_BCNKHHTT19T(maHQ, thang, nam, loai_BC);
		}	
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHHTT19T",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/Ts_BCSLDNTTTP", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCSLDNTTTP(String maHQ,int nam, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, 0, 0, nam, "", "Ts_BCSLDNTTTP");
		
		List<BCSLDNTTTPDTO> list = baocaoService.ts_BCSLDNTTTP(maHQ, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCSLDNTTTP",listData, param, type, hasRole);
	}
	
	
	@RequestMapping(value="/ts_BGHHNKTT55", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BGHHNKTT55(String maHQ,int ky, int thang, int nam, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BGHHNKTT55");
		
		List<BGHHNKTT55DTO> list = baocaoService.ts_BGHHNKTT55(maHQ, ky, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BGHHNKTT55",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCNKHHCOUD", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHHCOUD(String maHQ, int quy, int nam, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, "", "ts_BCNKHHCOUD");
		
		List<BCNKHHCOUDDTO> list = baocaoService.ts_BCNKHHCOUD(maHQ, quy, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHHCOUD",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXKTLHDN", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXNKTLHDN(String maCuc,String maHQ,int thang, int nam, @RequestParam(value="type",required=false) String type){

		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCXKTLHDN");
		
		List<BCXNKTLHDNDTO> list = baocaoService.ts_BCXNKTLHDN(maCuc,maHQ, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXNKTLHDN",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXKTDNCY", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKTDNCY(String maCuc,int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCXKTDNCY");
		
		List<BCXKTDNCYDTO> list = baocaoService.ts_BCXKTDNCY(maCuc, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKTDNCY",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCNKTDNCY", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKTDNCY(String maCuc,int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCNKTDNCY");
		
		List<BCNKTDNCYDTO> list = baocaoService.ts_BCNKTDNCY(maCuc, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKTDNCY",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXKMHCYTINH", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKMHCYTINH(String tinhTP,int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCXKMHCYTINH");
		
		List<BCXKMHCYTINHDTO> list = baocaoService.ts_BCXKMHCYTINH(tinhTP, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKMHCYTINH",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXNKHHTNLH", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXNKHHTNLH(String maCuc,int thang, int nam, int maNlh, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCXNKHHTNLH");
		List<BCXNKHHTNLHDTO> list = baocaoService.ts_BCXNKHHTNLH(maCuc, thang, nam, maNlh);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXNKHHTNLH",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXKNUOCMHCYTINH", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKNUOCMHCYTINH(String maHQ,String tinhTP,int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCXKNUOCMHCYTINH");
		
		List<BCXKNUOCMHCYTINHDTO> list = baocaoService.ts_BCXKNUOCMHCYTINH(tinhTP, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKNUOCMHCYTINH",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXKHHCUCHQ", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKHHCUCHQ(String maCuc,int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCXKHHCUCHQ");
		
		List<BCXKHHCUCHQDTO> list = baocaoService.ts_BCXKHHCUCHQ(maCuc, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKHHCUCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCNKHHCUCHQ", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKHHCUCHQ(String maCuc,int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCNKHHCUCHQ");
		
		List<BCNKHHCUCHQDTO> list = baocaoService.ts_BCNKHHCUCHQ(maCuc, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKHHCUCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_TTGXKTPTVT", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_TTGXKTPTVT(String maHQ, int quy, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, "", "ts_TTGXKTPTVT");
		
		List<TTGXKPTVTDTO> list = baocaoService.ts_TTGXKTPTVT(maHQ, quy, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("quy", quy);
		param.put("nam", nam);
		
		return JasperExport.ExportReport("TTGXKTPTVT",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/ts_TTGNKTPTVT", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_TTGNKTPTVT(String maHQ, int quy, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, "", "ts_TTGNKTPTVT");
		
		List<TTGXKPTVTDTO> list = baocaoService.ts_TTGNKTPTVT(maHQ, quy, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("quy", quy);
		param.put("nam", nam);
		
		return JasperExport.ExportReport("TTGNKTPTVT",listData, param, type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXKMHCYTPTVTTCHQ", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKMHCYTPTVTTCHQ(int ky,int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(ky, thang, 0, nam, "", "ts_BCXKMHCYTPTVTTCHQ");
		
		List<BCXKMHCYTPTVTTCHQDTO> list = baocaoService.ts_BCXKMHCYTPTVTTCHQ(ky, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKMHCYTPTVTTCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCNKMHCYTPTVTTCHQ", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKMHCYTPTVTTCHQ(int ky,int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(ky, thang, 0, nam, "", "ts_BCNKMHCYTPTVTTCHQ");
		
		List<BCXKMHCYTPTVTTCHQDTO> list = baocaoService.ts_BCNKMHCYTPTVTTCHQ(ky, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKMHCYTPTVTTCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXKMHCYTPTVTTCHQ1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKMHCYTPTVTTCHQ1(int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCXKMHCYTPTVTTCHQ1");
		
		List<BCXKMHCYTPTVTTCHQDTO> list = baocaoService.ts_BCXKMHCYTPTVTTCHQ(0, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKMHCYTPTVTTCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCNKMHCYTPTVTTCHQ1", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKMHCYTPTVTTCHQ1(int thang, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCNKMHCYTPTVTTCHQ1");
		
		List<BCXKMHCYTPTVTTCHQDTO> list = baocaoService.ts_BCNKMHCYTPTVTTCHQ(0, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKMHCYTPTVTTCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCXKMHCYTPTVTTCHQQUY", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCXKMHCYTPTVTTCHQQUY(int quy, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, "", "ts_BCXKMHCYTPTVTTCHQQUY");
		
		List<BCXKMHCYTPTVTTCHQQUYDTO> list = baocaoService.ts_BCXKMHCYTPTVTTCHQQUY(quy, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCXKMHCYTPTVTTCHQQUY",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCNKMHCYTPTVTTCHQQUY", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCNKMHCYTPTVTTCHQQUY(int quy, int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, 0, quy, nam, "", "ts_BCNKMHCYTPTVTTCHQ1");
		
		List<BCXKMHCYTPTVTTCHQQUYDTO> list = baocaoService.ts_BCNKMHCYTPTVTTCHQQUY(quy, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCNKMHCYTPTVTTCHQQUY",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCTTXNKTCCHQ", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCTTXNKTCCHQ(int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, 0, 0, nam, "", "ts_BCTTXNKTCCHQ");
		
		List<BCTTXNKTCCHQDTO> list = baocaoService.ts_BCTTXNKTCCHQ(nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCTTXNKTCCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCTGNKCHIUTHUECUCHQ", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCTGNKCHIUTHUECUCHQ(String maCuc,int thang,int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCTGNKCHIUTHUECUCHQ");
		
		List<BCTGNKCHIUTHUECUCHQDTO> list = baocaoService.ts_BCTGNKCHIUTHUECUCHQ(maCuc, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCTGNKCHIUTHUECUCHQ",listData, param,type, hasRole);
	}
	
	@RequestMapping(value="/ts_BCTGXKCHIUTHUECUCHQ", method =RequestMethod.GET)
	public ResponseEntity<byte[]> ts_BCTGXKCHIUTHUECUCHQ(String maCuc,int thang,int nam, @RequestParam(value="type",required=false) String type){
		boolean hasRole = userService.checkRoleBieu(0, thang, 0, nam, "", "ts_BCTGXKCHIUTHUECUCHQ");
		
		List<BCTGNKCHIUTHUECUCHQDTO> list = baocaoService.ts_BCTGXKCHIUTHUECUCHQ(maCuc, thang, nam);
		
		JRBeanCollectionDataSource listData = new JRBeanCollectionDataSource(list);
		Map<String, Object> param= new HashMap<String, Object>();
		
		return JasperExport.ExportReport("BCTGXKCHIUTHUECUCHQ",listData, param,type, hasRole);
	}
	
}
