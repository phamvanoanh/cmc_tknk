package com.tkhq.cmc.controller.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tkhq.cmc.dto.Tbs_Cangnn_vnaccsDTO;
import com.tkhq.cmc.model.Tbs_Cangnn_vnaccs;
import com.tkhq.cmc.services.Tbs_cangnn_vnaccsService;

@RestController
public class Tbs_cangnn_vnaccsRestController {

	@Autowired
	Tbs_cangnn_vnaccsService tbs_cangnn_vnaccsService;
	
	@RequestMapping(value="/tbs_cangnn_vnaccs/Search/",method=RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Tbs_Cangnn_vnaccs>> getAllcangnnVnaccs(@RequestBody Tbs_Cangnn_vnaccsDTO params){
		System.out.println("getAllCangVnaccs");	
		List<Tbs_Cangnn_vnaccs> listCangNN = new ArrayList<Tbs_Cangnn_vnaccs>();
		System.out.println("Find all");		
		//Get params
		String maCang = params.getMaCang();    	
    	String tenNuoc = params.getTenNuoc();
    	String tenTP = params.getTenTP();
    	String maNuoc = params.getMaNuoc();
    	
    	// call function from service
		listCangNN = tbs_cangnn_vnaccsService.searchCangNN(maCang,tenNuoc,tenTP,maNuoc);	
		return new ResponseEntity<List<Tbs_Cangnn_vnaccs>>(listCangNN,HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value = "/tbs_cangnn_vnaccs/", method = RequestMethod.POST)
    public ResponseEntity<Integer> createCangNN(@RequestBody Tbs_Cangnn_vnaccsDTO params,
    		UriComponentsBuilder ucBuilder) {
        System.out.println("Creating data with MaCang:" + params.getMaCang());
 
        if (tbs_cangnn_vnaccsService.findByMaCang(params.getMaCang()) != null) {
            System.out.println("maCang da ton tai!");
            return new ResponseEntity<Integer>(3,HttpStatus.OK);
        }
        
        Tbs_Cangnn_vnaccs entity = new Tbs_Cangnn_vnaccs();
        
        try{	        
	        entity.setMaCang(params.getMaCang());
	        entity.setMaNuoc(params.getMaNuoc());
	        entity.setTenNuoc(params.getTenNuoc());
	        entity.setTenTP(params.getTenTP());
	       	        
	        tbs_cangnn_vnaccsService.insertTbs_Cangnn(entity);
        }catch(Exception ex){
        	ex.printStackTrace();
        }
        return new ResponseEntity<Integer>(1, HttpStatus.CREATED);
    }
	
	@RequestMapping(value = "/tbs_cangnn_vnaccs/{maCang}", method = RequestMethod.PUT)
    public ResponseEntity<Integer> updateCangNN(@PathVariable("maCang") String maCang, @RequestBody Tbs_Cangnn_vnaccsDTO tbs_cangnn_vnaccsDTO) {
        System.out.println("Updating data with maCang:" + maCang);
         
        Tbs_Cangnn_vnaccs tbs_cangnn_vnaccs = tbs_cangnn_vnaccsService.findByMaCang(maCang);
         
        if (tbs_cangnn_vnaccs == null) {
            System.out.println("Data not found");
            return new ResponseEntity<Integer>(0,HttpStatus.NOT_FOUND);
        }
 
        try{
        	tbs_cangnn_vnaccs.setMaCang(tbs_cangnn_vnaccsDTO.getMaCang());
        	tbs_cangnn_vnaccs.setMaNuoc(tbs_cangnn_vnaccsDTO.getMaNuoc());
        	tbs_cangnn_vnaccs.setTenNuoc(tbs_cangnn_vnaccsDTO.getTenNuoc());
        	tbs_cangnn_vnaccs.setTenTP(tbs_cangnn_vnaccsDTO.getTenTP());        	
        	tbs_cangnn_vnaccsService.updateTbs_cangnn(tbs_cangnn_vnaccs);
        }catch(Exception ex){
        	ex.printStackTrace();
        }
        return new ResponseEntity<Integer>(1, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/tbs_cangnn_vnaccs/", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> deleteCangNN(@RequestParam(value = "lstCangNN") String lstCangNN) {
    	
    	ObjectMapper objectMapper = new ObjectMapper();
    	List<String> lstMaCang = new ArrayList<String>();
    	
    	try{
    		lstMaCang = objectMapper.readValue(
    				lstCangNN, objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));
    	}catch(Exception ex){
    		ex.printStackTrace();
    	}
    	
        System.out.println("Deleting data: " + lstMaCang);
        
        for(int i = 0; i < lstMaCang.size(); i++){
        	Tbs_Cangnn_vnaccs tbs_cangnn_vnaccs = tbs_cangnn_vnaccsService.findByMaCang(lstMaCang.get(i));
	        if (tbs_cangnn_vnaccs == null) {
	            System.out.println("Unable to delete. Data not found with maCang: " + lstMaCang.get(i));
	            return new ResponseEntity<Integer>(0,HttpStatus.NOT_FOUND);
	        }
        }
        
        for(int i = 0; i < lstMaCang.size(); i++){
	        try{
	        	tbs_cangnn_vnaccsService.deleteByMaCang(lstMaCang.get(i));
	        }catch(Exception ex){
	        	ex.printStackTrace();
	        }
        }
        return new ResponseEntity<Integer>(1,HttpStatus.OK);
    }
}
