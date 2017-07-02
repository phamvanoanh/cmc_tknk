package com.tkhq.cmc.controller.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tkhq.cmc.common.Constants;
import com.tkhq.cmc.dto.TbsQtacXuatNhapDTO;
import com.tkhq.cmc.model.TbsQtacXuatxuHangnhap;
import com.tkhq.cmc.services.TbsQtacXuatxuHangnhapService;

@RestController
public class TbsQtacXuatxuHangnhapRestController {
	@Autowired
	private TbsQtacXuatxuHangnhapService tbsQtacXuatxuHangnhapService;
	
	@RequestMapping(value="/tbsQtacXuatxuHangnhap", method=RequestMethod.GET)
	public ResponseEntity<TbsQtacXuatNhapDTO> getAllData (){
		
		TbsQtacXuatNhapDTO dto = new TbsQtacXuatNhapDTO();
		
		List<TbsQtacXuatxuHangnhap> listData = tbsQtacXuatxuHangnhapService.findAll();
		long totalCount = tbsQtacXuatxuHangnhapService.countTotal(Constants.EMPTY, Constants.EMPTY);
		dto.setContent(listData);
		dto.setTotalItems(totalCount);
		if(listData == null){
			return new ResponseEntity<TbsQtacXuatNhapDTO>(dto, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<TbsQtacXuatNhapDTO>(dto, HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/tbsQtacXuatxuHangnhapById", method=RequestMethod.GET)
	public ResponseEntity<TbsQtacXuatxuHangnhap> getDataById(String id){
		TbsQtacXuatxuHangnhap dto = tbsQtacXuatxuHangnhapService.findById(Long.parseLong(id));
		if(dto == null){
			return new ResponseEntity<TbsQtacXuatxuHangnhap>(dto, HttpStatus.CONFLICT);
		}
		return new ResponseEntity<TbsQtacXuatxuHangnhap>(dto, HttpStatus.OK);
	}
	
	@RequestMapping(value="/delete/tbsQtacXuatxuHangnhap", method=RequestMethod.GET)
	public ResponseEntity<Integer> doDeleteData(String id){
		Long idDelete = Long.parseLong(id);
		TbsQtacXuatxuHangnhap dto = tbsQtacXuatxuHangnhapService.findById(idDelete);
		if(dto == null){
			return new ResponseEntity<Integer>(Constants.FAILED, HttpStatus.CONFLICT);
		}
		tbsQtacXuatxuHangnhapService.delete(idDelete);
		return new  ResponseEntity<Integer>(Constants.SUCCESS, HttpStatus.OK);
	}
	
	@RequestMapping(value="/add/tbsQtacXuatxuHangnhap", method=RequestMethod.POST)
	public ResponseEntity<Integer> doAddData(@RequestBody TbsQtacXuatxuHangnhap tbsQtacXuatxuHangnhap){
		try {
			tbsQtacXuatxuHangnhapService.insert(tbsQtacXuatxuHangnhap);
			return new  ResponseEntity<Integer>(Constants.SUCCESS, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<Integer>(Constants.FAILED, HttpStatus.CONFLICT);
		}
	}
	
	@RequestMapping(value="/update/tbsQtacXuatxuHangnhap", method=RequestMethod.POST)
	public ResponseEntity<Integer> doUpdateData(@RequestBody TbsQtacXuatNhapDTO paramDto){
		try {
			TbsQtacXuatxuHangnhap dto = tbsQtacXuatxuHangnhapService.findById(paramDto.getId());
			if (dto == null){
				return new ResponseEntity<Integer>(Constants.FAILED, HttpStatus.CONFLICT);
			}
			tbsQtacXuatxuHangnhapService.update(paramDto);
			return new  ResponseEntity<Integer>(Constants.SUCCESS, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<Integer>(Constants.FAILED, HttpStatus.CONFLICT);
		}
	}
	
	@RequestMapping(value="/search/tbsQtacXuatxuHangnhap", method=RequestMethod.POST)
	public ResponseEntity<TbsQtacXuatNhapDTO> SearchData(@RequestBody TbsQtacXuatNhapDTO tbsQtacXuaNhapDTO){
		List<TbsQtacXuatxuHangnhap> listData = null;
		TbsQtacXuatNhapDTO dto = null;
		
		try {
			int minRow = (tbsQtacXuaNhapDTO.getCurrentPage() - 1) * tbsQtacXuaNhapDTO.getPageSize();
			int maxRow = tbsQtacXuaNhapDTO.getPageSize();
			
			long totalCount = tbsQtacXuatxuHangnhapService.countTotal(tbsQtacXuaNhapDTO.getMathongke(), tbsQtacXuaNhapDTO.getManuoc());
			
			if (totalCount == 0) {

				dto = new TbsQtacXuatNhapDTO();
				dto.setContent(new ArrayList<TbsQtacXuatNhapDTO>());
				dto.setCurrentPage(Constants.CURRENT_PAGE);
				dto.setMaxPage(Constants.MAX_PAGE);
				dto.setPageSize(Constants.PAGE_SIZE_10);
				dto.setTotalItems(Constants.ZEZO);
				
				return new ResponseEntity<TbsQtacXuatNhapDTO>(dto, HttpStatus.ACCEPTED);
			}
			listData = tbsQtacXuatxuHangnhapService.searchData(tbsQtacXuaNhapDTO.getMathongke(),
																tbsQtacXuaNhapDTO.getManuoc(),
															    minRow, maxRow);
			int maxPage = (int) Math.ceil(totalCount / Integer.valueOf(tbsQtacXuaNhapDTO.getPageSize()));
			dto = new TbsQtacXuatNhapDTO();
			dto.setContent(listData);
	    	dto.setCurrentPage(tbsQtacXuaNhapDTO.getCurrentPage());
	    	dto.setMaxPage(maxPage);
	    	dto.setPageSize(Integer.valueOf(Constants.PAGE_SIZE_10));
	    	dto.setTotalItems(totalCount);
	    	
			return new ResponseEntity<TbsQtacXuatNhapDTO>(dto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<TbsQtacXuatNhapDTO>(new TbsQtacXuatNhapDTO(), HttpStatus.ACCEPTED);
		}
	}
}
