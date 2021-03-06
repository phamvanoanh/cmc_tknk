package com.tkhq.cmc.controller.rest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tkhq.cmc.common.Constants;
import com.tkhq.cmc.dto.ImportFilePhiCauTrucDto;
import com.tkhq.cmc.services.ImportFilePhiCauTrucService;
import com.tkhq.cmc.utils.Utils;

@RestController
public class ImportFilePhiCauTrucRestController {
	
	private static final Logger log = Logger.getLogger(ImportFilePhiCauTrucRestController.class);
	
	private static final String MA_CHU_DE_MAT_HANG = "1";
	
	private static final String CHU_DE_MAT_HANG = "Mặt hàng";
	
	private static final String CHU_DE_THI_TRUONG = "Thị trường";
	
	private static final String EMPTY = "";
	
	//Save the uploaded file to this folder
    private static String UPLOADED_FOLDER = "C://temp//";
   
	@Autowired
	ImportFilePhiCauTrucService importFilePhiCauTrucService;
	
	@RequestMapping(value = "/hienThiFile", method = RequestMethod.GET)
	public ResponseEntity<List<ImportFilePhiCauTrucDto>> getListFilePhiCauTruc(String chuDe, String typeNhapXuat ){
		String tmpChuDe = settingFileTitle(chuDe);
		List<ImportFilePhiCauTrucDto> listFileDto = importFilePhiCauTrucService.getListFilePhiCauTruc(tmpChuDe, typeNhapXuat);
		if(listFileDto == null) {
			new ResponseEntity<List<ImportFilePhiCauTrucDto>>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<List<ImportFilePhiCauTrucDto>>(listFileDto, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public ResponseEntity<Integer> deleteFilePhiCauTruc(int fileId){
		int deleteFlg = 0;
		boolean isDelete = false;
		ImportFilePhiCauTrucDto fileDto = importFilePhiCauTrucService.getFilePhiCauTrucById(fileId);
		if(fileDto == null) {
			deleteFlg = 2;
			new ResponseEntity<Integer>(deleteFlg, HttpStatus.CONFLICT);
		}
		// logical delete.
		deleteFlg = importFilePhiCauTrucService.deleteFilePhiCauTruc(fileId);
		
		// physical delete.
		if(new File(fileDto.getFileUrl()).delete()){
			isDelete = true;
		}
		
		if(deleteFlg == 0 && !isDelete) {
			new ResponseEntity<Integer>(deleteFlg, HttpStatus.CONFLICT);
		}
		return new ResponseEntity<Integer>(deleteFlg, HttpStatus.OK);
	}
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public ResponseEntity<Integer> uploadFilePhiCauTruc(@RequestParam("fileObject") String fileJson,
														@RequestParam("mota") String mota,
													    @RequestParam("fileUpLoad") MultipartFile file) {
		ImportFilePhiCauTrucDto fileDto = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			int insertFlg = 0;
			fileDto = mapper.readValue(fileJson,ImportFilePhiCauTrucDto.class);
			if(fileDto != null){
				String titleTmp = settingFileTitle(fileDto.getFileTitle());
				fileDto.setFileTitle(titleTmp);
			}
			fileDto.setFileDescription(setingDescription(mota));
			if(!file.isEmpty()){
				// upload file.
				uploadFile(file);

				// insert file.
				ImportFilePhiCauTrucDto insDto = settingDataToInsert(fileDto, file, setFilePath(file));
				
				insertFlg = importFilePhiCauTrucService.upLoadFilePhiCauTruc(insDto);
				
				if(insertFlg == 1) {
					return new ResponseEntity<Integer>(insertFlg, HttpStatus.OK);
				} else {
					return new ResponseEntity<Integer>(HttpStatus.CONFLICT);
				}
			} else {
				return new ResponseEntity<Integer>(insertFlg, HttpStatus.NOT_FOUND);
			}
		} catch (JsonParseException e) {
			 log.error("Parse json error " + e.getMessage());
		} catch (JsonMappingException e) {
			 log.error("Json mapping error " + e.getMessage());
		} catch (IOException e) {
			log.error("IO exception :" + e.getMessage());
		}
		return new ResponseEntity<Integer>(HttpStatus.CONFLICT);
	}
	
	private String setingDescription(String mota){
		if (mota != null){
			String motaTmp = mota.trim();  
			byte[] bytes = motaTmp.getBytes(StandardCharsets.ISO_8859_1);
			return new String(bytes, StandardCharsets.UTF_8);
		} else {
			return EMPTY;
		}
	}
	
	@RequestMapping(value = "/downLoadFile", method = RequestMethod.GET) 
	public ResponseEntity<byte[]> downloadReportFile(int fileId, HttpServletResponse response) {

		log.debug("REST request to download report file");
		ImportFilePhiCauTrucDto fileDto = importFilePhiCauTrucService.getFilePhiCauTrucById(fileId);

		byte[] bFile = null;
		if(fileDto == null) {
			return new ResponseEntity<byte[]>(bFile, HttpStatus.CONFLICT);
		}
		File file = new File(fileDto.getFileUrl());

		if (!file.exists()) { // handle FNF
			return new ResponseEntity<byte[]>(bFile, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
		 try {
			 bFile = Files.readAllBytes(new File(fileDto.getFileUrl()).toPath());
			 HttpHeaders headers = new HttpHeaders();
			 headers.add("content-disposition", "attachment; filename=" + URLEncoder.encode(file.getName(), "UTF-8"));
			 
			 return new ResponseEntity<byte[]>(bFile, headers, HttpStatus.OK);
	    } catch (IOException e) {
	        log.error("Failed to download file ", e);
	        return new ResponseEntity<byte[]>(bFile, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	private ImportFilePhiCauTrucDto settingDataToInsert (ImportFilePhiCauTrucDto paramsDto, MultipartFile file, String filePath) {
		ImportFilePhiCauTrucDto insDto = new ImportFilePhiCauTrucDto();

		insDto.setFileTitle(paramsDto.getFileTitle());
		insDto.setFileUrl(filePath);
		insDto.setFileName(getFileName(file));
		insDto.setTypeNhapXuat(paramsDto.getTypeNhapXuat());
		insDto.setFileDescription(paramsDto.getFileDescription());
		insDto.setFileSize(getFileSize(file));
		insDto.setNguoiTaiLen(getUserLogin());

		return insDto;
	}

	private void uploadFile(final MultipartFile uploadFile) {

		BufferedOutputStream outStream = null;
		String filePath = setFilePath(uploadFile);
		try {
			File file = new File(filePath);
			File parentDir = file.getParentFile();


			if (!parentDir.exists()) {
				parentDir.mkdirs();
			}
			outStream = new BufferedOutputStream(new FileOutputStream(file));
			outStream.write(getFileSize(uploadFile));
		} catch (FileNotFoundException e) {
			log.info("File not found exception:" + e.getMessage());
		} catch (IOException e) {
			log.info("IOexception:" + e.getMessage());
		} finally {
			try {
				if (outStream != null) {
					outStream.close();
				}
			} catch (IOException e) {
				log.info("IOexception when close stream:" + e.getMessage());
			}
		}
	}
	
	/**
	* @param file
	* @return String
	*/
	private String setFilePath (MultipartFile file) {
		return Paths.get(UPLOADED_FOLDER, getFileName(file)).toString();
	}
	
	/**
	* @param file
	* @return
	*/
	private String getFileName (MultipartFile file){
		return new StringBuilder().append(setingDescription(getBaseFileName(file)))
								  .append(Constants.UNDERSCORES)
								  .append(getUserLogin())
								  .append(getSufferFileName())
								  .append(getExtension(file))
								  .toString();
	}
	
	private String getSufferFileName (){
		DateFormat dateFormat = new SimpleDateFormat(Constants.DATE_FORMAT_5);
		return Constants.UNDERSCORES + dateFormat.format(new Date());
	}
	
	private String getBaseFileName(MultipartFile file) {
		return FilenameUtils.getBaseName(file.getOriginalFilename());
	}
	
	private String getExtension(MultipartFile file){
		return Constants.DOT + FilenameUtils.getExtension(file.getOriginalFilename());
	}
	
	/**
	* @param file
	* @return
	*/
	private byte[] getFileSize (MultipartFile file){
		try {
			return file.getBytes();
		} catch (IOException e) {
			log.info(e.getMessage());
			return new byte[0];
			
		}
	}

	private String getUserLogin(){
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
	
	private String settingFileTitle(String title){
		if (Utils.equals(title, MA_CHU_DE_MAT_HANG)){
			return CHU_DE_MAT_HANG;
		} 
		 else {
			return CHU_DE_THI_TRUONG;
		}
	}
}
