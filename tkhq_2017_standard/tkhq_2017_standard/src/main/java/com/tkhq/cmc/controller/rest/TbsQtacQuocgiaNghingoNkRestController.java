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
import com.tkhq.cmc.dto.TbsQtacQuocgiaNghingoDTO;
import com.tkhq.cmc.model.TbsQtacQuocgiaNghingoNk;
import com.tkhq.cmc.services.TbsQtacQuocgiaNghingoNkService;

@RestController
public class TbsQtacQuocgiaNghingoNkRestController {
	
	@Autowired
	private TbsQtacQuocgiaNghingoNkService tbsQtacQuocgiaNghingoNkService;
	
	@RequestMapping(value="/tbsQtacQuocgiaNghingoNk", method=RequestMethod.GET)
	public ResponseEntity<TbsQtacQuocgiaNghingoDTO> getAllData (){
		
		TbsQtacQuocgiaNghingoDTO dto = new TbsQtacQuocgiaNghingoDTO();
		List<TbsQtacQuocgiaNghingoNk> listData = tbsQtacQuocgiaNghingoNkService.findAll();
		long totalCount = tbsQtacQuocgiaNghingoNkService.countTotal(Constants.EMPTY, Constants.EMPTY);
		dto.setContent(listData);
		dto.setTotalItems(totalCount);
		if(listData == null){
			return new ResponseEntity<TbsQtacQuocgiaNghingoDTO>(dto, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<TbsQtacQuocgiaNghingoDTO>(dto, HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/tbsQtacQuocgiaNghingoNkById", method=RequestMethod.GET)
	public ResponseEntity<TbsQtacQuocgiaNghingoNk> getDataById(String id){
		TbsQtacQuocgiaNghingoNk dto = tbsQtacQuocgiaNghingoNkService.findById(Long.parseLong(id));
		if(dto == null){
			return new ResponseEntity<TbsQtacQuocgiaNghingoNk>(dto, HttpStatus.CONFLICT);
		}
		return new ResponseEntity<TbsQtacQuocgiaNghingoNk>(dto, HttpStatus.OK);
	}
	
	@RequestMapping(value="/delete/tbsQtacQuocgiaNghingoNk", method=RequestMethod.GET)
	public ResponseEntity<Integer> doDeleteData(String id){
		Long idDelete = Long.parseLong(id);
		TbsQtacQuocgiaNghingoNk dto = tbsQtacQuocgiaNghingoNkService.findById(idDelete);
		if(dto == null){
			return new ResponseEntity<Integer>(Constants.FAILED, HttpStatus.CONFLICT);
		}
		tbsQtacQuocgiaNghingoNkService.delete(idDelete);
		return new  ResponseEntity<Integer>(Constants.SUCCESS, HttpStatus.OK);
	}
	
	@RequestMapping(value="/add/tbsQtacQuocgiaNghingoNk", method=RequestMethod.POST)
	public ResponseEntity<Integer> doAddData(@RequestBody TbsQtacQuocgiaNghingoNk tbsqtacdntrigianhapkhau){
		try {
			tbsQtacQuocgiaNghingoNkService.insert(tbsqtacdntrigianhapkhau);
			return new  ResponseEntity<Integer>(Constants.SUCCESS, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<Integer>(Constants.FAILED, HttpStatus.CONFLICT);
		}
	}
	
	@RequestMapping(value="/update/tbsQtacQuocgiaNghingoNk", method=RequestMethod.POST)
	public ResponseEntity<Integer> doUpdateData(@RequestBody TbsQtacQuocgiaNghingoDTO paramDto){
		try {
			TbsQtacQuocgiaNghingoNk dto = tbsQtacQuocgiaNghingoNkService.findById(paramDto.getId());
			if (dto == null){
				return new ResponseEntity<Integer>(Constants.FAILED, HttpStatus.CONFLICT);
			}
			tbsQtacQuocgiaNghingoNkService.update(paramDto);
			return new  ResponseEntity<Integer>(Constants.SUCCESS, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<Integer>(Constants.FAILED, HttpStatus.CONFLICT);
		}
	}
	
	@RequestMapping(value="/search/tbsQtacQuocgiaNghingoNk", method=RequestMethod.POST)
	public ResponseEntity<TbsQtacQuocgiaNghingoDTO> SearchData(@RequestBody TbsQtacQuocgiaNghingoDTO tbsqtacluongdto){
		TbsQtacQuocgiaNghingoDTO dto = null;
		List<TbsQtacQuocgiaNghingoNk> listData = null;
		try {
			int minRow = (tbsqtacluongdto.getCurrentPage() - 1) * tbsqtacluongdto.getPageSize();
			int maxRow = tbsqtacluongdto.getPageSize();
			
			long totalCount = tbsQtacQuocgiaNghingoNkService.countTotal(tbsqtacluongdto.getManuoc(), tbsqtacluongdto.getTennuoc());
			if (totalCount == 0) {
				dto = new TbsQtacQuocgiaNghingoDTO();
				dto.setContent(new ArrayList<TbsQtacQuocgiaNghingoDTO>());
				dto.setCurrentPage(Constants.CURRENT_PAGE);
				dto.setMaxPage(Constants.MAX_PAGE);
				dto.setPageSize(Constants.PAGE_SIZE_10);
				dto.setTotalItems(Constants.ZEZO);
				
				return new ResponseEntity<TbsQtacQuocgiaNghingoDTO>(dto, HttpStatus.ACCEPTED);
			}
			listData = tbsQtacQuocgiaNghingoNkService.searchData(tbsqtacluongdto.getManuoc(), tbsqtacluongdto.getTennuoc(),
															     minRow, maxRow);
			int maxPage = (int) Math.ceil(totalCount / Integer.valueOf(tbsqtacluongdto.getPageSize()));
			dto = new TbsQtacQuocgiaNghingoDTO();
			dto.setContent(listData);
	    	dto.setCurrentPage(tbsqtacluongdto.getCurrentPage());
	    	dto.setMaxPage(maxPage);
	    	dto.setPageSize(Integer.valueOf(Constants.PAGE_SIZE_10));
	    	dto.setTotalItems(totalCount);
	    	
			return new ResponseEntity<TbsQtacQuocgiaNghingoDTO>(dto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<TbsQtacQuocgiaNghingoDTO>(new TbsQtacQuocgiaNghingoDTO(), HttpStatus.ACCEPTED);
		}
	}
}
