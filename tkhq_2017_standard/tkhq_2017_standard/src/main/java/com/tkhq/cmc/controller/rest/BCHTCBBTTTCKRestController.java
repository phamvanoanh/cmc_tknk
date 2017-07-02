package com.tkhq.cmc.controller.rest;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.ss.util.RegionUtil;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.tkhq.cmc.common.Constants.ExportType;
import com.tkhq.cmc.common.CExcel;
import com.tkhq.cmc.common.JasperExport;
import com.tkhq.cmc.dto.BCThayDoiDoTHQTNV;
import com.tkhq.cmc.dto.BDHTCBBTDBXTLDTO;
import com.tkhq.cmc.dto.BDHTCBBTDBXTL_GROUP_DATADTO;
import com.tkhq.cmc.dto.BDHTCBBTGTMHSITCDTO;
import com.tkhq.cmc.dto.KyDataDTO;
import com.tkhq.cmc.dto.ThangDataDTO;
import com.tkhq.cmc.dto.ThayDoiDoNVHQTongThe;
import com.tkhq.cmc.utils.Utils;
import com.tkhq.global.dao.SLTheoCTTKDao;
import com.tkhq.global.dao.SLTheoCTTKRequestParams;
import com.tkhq.global.model.bcptbangbieu.SLTheoCTTK06Response;
import com.tkhq.global.model.bcptbangbieu.SLTheoCTTK15Response;

@RestController
@RequestMapping(value = "BCHTCBBTTTCK")
public class BCHTCBBTTTCKRestController {

	@Autowired
	ServletContext context;
	
	@Autowired
	HttpServletRequest request;
	
	@Autowired
	private SLTheoCTTKDao repository;
	
	@Autowired
	ObjectMapper mapper;
	

	@RequestMapping(value = "/BieuDoTriGiaTK", method = RequestMethod.GET)
	public ResponseEntity<byte[]> BieuDo(String maCucHQ, String maChicucHQ,
			String trangthai, String nhx, String cuakhau, String phamvi,
			String loaihinh, String loaiBD) throws IOException {
		
		SLTheoCTTKRequestParams requestParams = new SLTheoCTTKRequestParams();
		requestParams.setNhx(nhx);
		requestParams.setTrangthai(trangthai);
		requestParams.setMaCucHQ(maCucHQ);
		requestParams.setMaChicucHQ(maChicucHQ);
		requestParams.setUsername(Utils.getPrincipalLogin().getUser().getUserName());
		
		List<SLTheoCTTK15Response> result = repository.getSLTheoCTTK15(requestParams, cuakhau, phamvi, loaihinh);
		
		String responeJson = mapper.writeValueAsString(result);

		List<BDHTCBBTDBXTL_GROUP_DATADTO> listdata = (List<BDHTCBBTDBXTL_GROUP_DATADTO>) Utils
				.getDataStringFromStringReturnList(responeJson, BDHTCBBTDBXTL_GROUP_DATADTO.class);
		// Trá»‹ GiÃ¡ thá»‘ng kÃª BDHTCBBTDBXTLDTO Index 0
		if (listdata.size() > 0) {
			BDHTCBBTDBXTL_GROUP_DATADTO lstgrData = listdata.get(0);

			if ("KY".equals(loaiBD.trim().toUpperCase())) {
				List<KyDataDTO> BieuDoData = lstgrData.getData_ky().getData();

				JRBeanCollectionDataSource listData1 = new JRBeanCollectionDataSource(
						BieuDoData);
				Map<String, Object> param = new HashMap<String, Object>();

				return JasperExport.ExportReport("BieuDoKyGiaTri1-1",
						listData1, param, ExportType.HTML);
			} else {
				List<ThangDataDTO> BieuDoData = lstgrData.getData_thang()
						.getData();

				JRBeanCollectionDataSource listData1 = new JRBeanCollectionDataSource(
						BieuDoData);
				Map<String, Object> param = new HashMap<String, Object>();

				return JasperExport.ExportReport("BieuDoThangGiaTri1-1",
						listData1, param, ExportType.HTML);
			}
		} else
			return null;

	}
	
	@RequestMapping(value = "/doExport", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void doExport(@RequestBody Hashtable<String, String> params, HttpServletResponse response) {
		String currentDate = Utils.getCurrentDate();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String excelDir = loader.getResource("ExcelTemplates/").getPath();
		String excelFilePath = excelDir + "\\DienBienTTCK.xls";
		String fileName = String.format("Diễn biến theo tiêu chí khác_%s.xls", currentDate);
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		try{
			
			SLTheoCTTKRequestParams requestParams = new SLTheoCTTKRequestParams();
			requestParams.setNhx(params.get("nhx"));
			requestParams.setTrangthai(Utils.escapeNull(params.get("trangthai")));
			requestParams.setMaCucHQ(Utils.escapeNull(params.get("maCucHQ")));
			requestParams.setMaChicucHQ(Utils.escapeNull(params.get("maChiCucHQ")));
			requestParams.setUsername(Utils.getPrincipalLogin().getUser().getUserName());
			
			List<SLTheoCTTK15Response> result = repository.getSLTheoCTTK15(requestParams, Utils.escapeNull(params.get("cuakhau")), Utils.escapeNull(params.get("phamvi")), Utils.escapeNull(params.get("loaihinh")));
			
			String responeJson = mapper.writeValueAsString(result);
			
		    JSONArray jsonArray = new JSONArray(responeJson);
		    
		    for(int i = 0; i < jsonArray.length(); i++){
		    	JSONObject groupJson = jsonArray.getJSONObject(i);
		    	Map<String, Object> map = Utils.jsonToMap(groupJson);
		    	list.add(map);
		    }
			
		    //Tao luong doc workbook
			InputStream is = new FileInputStream(excelFilePath);
			Workbook workbook = new HSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			Cell cell;	//store value of current cell
			Row row;	//store value of current row
			
			 Map<String, CellStyle> styles = CExcel.createStyles(workbook);
			
			Integer colNum = 0;	//position of first column fill data
			Integer rowNum = 3; //position of first row fill data
			String mergeRange = "";
			
			Map<String, Object> dataKy = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataKy = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataThang = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataThang = new ArrayList<Map<String, Object>>();
			
			//fill data to cell
			for(int i = 0; i < list.size(); i++){
				colNum = 0;
				rowNum++;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				cell.setCellValue(list.get(i).get("sub_name").toString());
				cell.setCellStyle(styles.get("cell_str_center"));
				
				mergeRange = "$" + CellReference.convertNumToColString(0) + "$" + (rowNum + 1)  + ":$"
						+ CellReference.convertNumToColString(0) + "$" + (rowNum + 2);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
				
				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue("Kỳ");
				cell.setCellStyle(styles.get("cell_str_center"));
				
				dataKy = (Map<String, Object>)list.get(i).get("data_ky");
				lstDataKy = (List<Map<String, Object>>)dataKy.get("data");
				
				for(int k = 0; k < lstDataKy.size(); k++){
					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(lstDataKy.get(k).get("ky").toString() + "\n"
							+ lstDataKy.get(k).get("gia_tri").toString());
					cell.setCellStyle(styles.get("cell_str_center"));
					sheet.setColumnWidth(colNum, 10 * 256);
				}
				
				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataKy.get("ss_ky_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));
				
				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataKy.get("ss_ky_nam_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));			
				
				rowNum++;
				colNum = 1;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				row.setHeight((short)550);
				cell.setCellValue("Tháng");
				cell.setCellStyle(styles.get("cell_str_center"));
				
				dataThang = (Map<String, Object>)list.get(i).get("data_thang");
				lstDataThang = (List<Map<String, Object>>)dataThang.get("data");
				
				for(int k = 0; k < lstDataThang.size(); k++){
					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(lstDataThang.get(k).get("thang").toString() + "\n"
							+ lstDataThang.get(k).get("gia_tri").toString());
					cell.setCellStyle(styles.get("cell_str_center"));	
					sheet.setColumnWidth(colNum, 10 * 256);
					
					if(k == (lstDataThang.size() - 1) && lstDataKy.size()%2 != 0)
						continue;
					
					mergeRange = "$" + CellReference.convertNumToColString(colNum) + "$" + (rowNum + 1)  + ":$"
							+ CellReference.convertNumToColString(colNum + 1) + "$" + (rowNum + 1);
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
					RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet);
					
					colNum++;
				}
				
				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataThang.get("ss_thang_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));
				
				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataThang.get("ss_thang_nam_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));
				
				rowNum++;
				colNum = 0;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				cell.setCellValue("AVG");
				cell.setCellStyle(styles.get("cell_str_center"));
				
				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(list.get(i).get("avg").toString());
//				cell.setCellStyle(styles.get("cell_str_center"));
				
				mergeRange = "$" + CellReference.convertNumToColString(1) + "$" + (rowNum + 1) + ":$"
						+ CellReference.convertNumToColString(lstDataKy.size() + 1) + "$" + (rowNum + 1);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
				RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet);
				RegionUtil.setBorderRight(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet);
				
				mergeRange = "$" + CellReference.convertNumToColString(lstDataKy.size() + 2) + "$" + (rowNum + 1) + ":$"
						+ CellReference.convertNumToColString(lstDataKy.size() + 3) + "$" + (rowNum + 1);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
				RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet);
				RegionUtil.setBorderRight(CellStyle.BORDER_THIN, CellRangeAddress.valueOf(mergeRange), sheet);
			}
			
			//create header
			colNum = 0;
			rowNum = 3;
			
			List<String> header = new ArrayList<String>();
			header.add("Chỉ tiêu");
			header.add("Kỳ");
			header.add("Thời gian");
			header.add("So sánh với kỳ trước");
			header.add("So sánh với cùng kỳ năm trước");
			
			row = sheet.createRow(rowNum);
             
            for(int i = 0; i < header.size(); i++){
            	if(i == 2){
            		cell = row.createCell(colNum);
    				cell.setCellValue(header.get(i));
    				cell.setCellStyle(styles.get("header"));
    				colNum += lstDataKy.size() - 1;
 					mergeRange = "$" + CellReference.convertNumToColString(i) + "$4" + ":$"
 							+ CellReference.convertNumToColString(colNum) + "$4";
 					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
 					
 					colNum++;
 					continue;
 				}
            	
				cell = row.createCell(colNum);
				cell.setCellValue(header.get(i));
				cell.setCellStyle(styles.get("header"));
				colNum++;
			}
			
			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
			
			//Tao luong ghi
			ServletOutputStream out = response.getOutputStream();
			workbook.write(out);

			out.flush();
			
			out.close();
			workbook.close();
			is.close();	
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
}
