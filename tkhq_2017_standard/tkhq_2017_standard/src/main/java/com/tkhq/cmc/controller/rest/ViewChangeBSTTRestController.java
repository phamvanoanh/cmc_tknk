package com.tkhq.cmc.controller.rest;

import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tkhq.cmc.common.CExcel;
import com.tkhq.cmc.utils.Utils;
import com.tkhq.global.dao.BaoCaoDuLieuThayDoiDao;
import com.tkhq.global.dao.XemToKhaiThayDoiParams;
import com.tkhq.global.model.bcdulieuthaydoi.XemThayDoiDoSDBS;

@RestController
@RequestMapping(value="/XemThayDoi")
public class ViewChangeBSTTRestController {
	
	@Autowired
	HttpServletRequest request;
	
	@Autowired
	private BaoCaoDuLieuThayDoiDao repository;

	@RequestMapping(value = "/doExport", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void doExport(@RequestBody Hashtable<String, String> params, HttpServletResponse response) {		
		List<XemThayDoiDoSDBS> list = new ArrayList<XemThayDoiDoSDBS>();
		XemThayDoiDoSDBS rowItem = new XemThayDoiDoSDBS();
		//ObjectMapper objectMapper = new ObjectMapper();
		
		int totalFields = rowItem.getClass().getDeclaredFields().length;
		
		String currentDate = Utils.getCurrentDate();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String excelDir = loader.getResource("ExcelTemplates/").getPath();
		String excelFilePath = excelDir + "\\ThaydoiDoBSTT.xls";
		String fileName = String.format("Thay đổi do Bổ sung thông tin nhập và cập nhật_%s.xls", currentDate);
		
		try{
//			String myURL = Utils.getBaseUrl(request) + "/bcpt/XemThayDoi/DoSDBSThongTin?"				 
//				+ "&maCucHQ=" + params.get("maCucHQ") + "&maChicucHQ=" + params.get("maChiCucHQ")
//				+ "nhx=" + params.get("nhx") + "&ma_hang=" + params.get("ma_hang") + "&loai_ky=" + params.get("loai_ky")
//				+ "&tu_ngay=" + params.get("tu_ngay") + "&den_ngay=" + params.get("den_ngay") + "&ky=" + params.get("ky")
//				+ "&thang=" + params.get("thang") + "&nam=" + params.get("nam");
//			String responeJson;
//			BufferedReader reader = null;
//		    try {
//		        URL url = new URL(myURL);
//		        reader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
//		        StringBuffer buffer = new StringBuffer();
//		        int read;
//		        char[] chars = new char[1024];
//		        while ((read = reader.read(chars)) != -1)
//		            buffer.append(chars, 0, read); 
//
//		        responeJson = buffer.toString();
//		    } finally {
//		        if (reader != null)
//		            reader.close();
//		    }
			
			XemToKhaiThayDoiParams requestParam = new XemToKhaiThayDoiParams();
			requestParam.setMaCucHQ(params.get("maCucHQ"));
			requestParam.setMaChicucHQ(params.get("maChiCucHQ"));
			requestParam.setNhx(params.get("nhx"));
			requestParam.setMa_hang(params.get("ma_hang"));
			requestParam.setLoai_ky(params.get("loai_ky"));
			requestParam.setTu_ngay(params.get("tu_ngay"));
			requestParam.setDen_ngay(params.get("den_ngay"));
			requestParam.setKy(params.get("ky"));
			requestParam.setThang(params.get("thang"));
			requestParam.setNam(params.get("nam"));
			
			list = repository.xemChitietThayDoi_SDBS(requestParam);
		    
			//Tao luong doc workbook
			InputStream is = new FileInputStream(excelFilePath);
			Workbook workbook = new HSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			Cell cell;	//store value of current cell
			Row row;	//store value of current row
			Map<String, CellStyle> styles = CExcel.createStyles(workbook);
			
			//Integer colNum = 0;	//position of column fill data
			Integer rowNum = 6; //position of row fill data
			
			//Conversion to two dimensional arrays
			String[][] detail = new String[list.size()][totalFields];
			Field[] fields = rowItem.getClass().getDeclaredFields();
			
			for(Field field : fields){
				field.setAccessible(true);
			}
			for(int i = 0; i < list.size(); i++){
				rowItem = list.get(i);
				for(int j = 0; j < totalFields; j++){
					if(fields[j].get(rowItem) == null){
						detail[i][j] = "";
						continue;
					}
					detail[i][j] = fields[j].get(rowItem).toString();	
				}
			}
			
			//fill data to cell
			for(int i = 0; i < list.size(); i++){
				row = sheet.createRow(i + rowNum);
				for(int j = 0; j < totalFields; j++){
					cell = row.createCell(j);
					cell.setCellValue(detail[i][j]);
					cell.setCellStyle(styles.get("cell_str_center"));
				}
			}
			
			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//			response.setContentType("charset=UTF-8;application/force-download");
//			response.setContentType("charset=UTF-8;application/vnd.ms-excel");
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
