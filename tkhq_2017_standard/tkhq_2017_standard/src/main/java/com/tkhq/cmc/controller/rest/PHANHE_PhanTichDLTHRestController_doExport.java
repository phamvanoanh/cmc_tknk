package com.tkhq.cmc.controller.rest;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.ss.util.RegionUtil;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
//import org.jxls.area.Area;
//import org.jxls.builder.AreaBuilder;
//import org.jxls.builder.xls.XlsCommentAreaBuilder;
//import org.jxls.common.CellRef;
//import org.jxls.common.Context;
//import org.jxls.transform.poi.PoiTransformer;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tkhq.cmc.common.CExcel;
import com.tkhq.cmc.dto.thayDoiBSToKhaiHeThongDTO;
import com.tkhq.cmc.utils.Utils;
import com.tkhq.global.dao.SLTheoCTTKDao;
import com.tkhq.global.dao.SLTheoCTTKRequestParams;
import com.tkhq.global.model.bcptbangbieu.SLTheoCTTK01Response;
import com.tkhq.global.model.bcptbangbieu.SLTheoCTTK04Response;
import com.tkhq.global.model.bcptbangbieu.SLTheoCTTK07Response;
import com.tkhq.global.model.bcptbangbieu.SLTheoCTTK10Response;
import com.tkhq.global.model.bcptbangbieu.SLTheoCTTK13Response;

@RestController
@RequestMapping(value = "/doExport")
public class PHANHE_PhanTichDLTHRestController_doExport {

	@Autowired
	HttpServletRequest request;
	
	@Autowired
	private SLTheoCTTKDao repository;
	
	@Autowired 
	private ObjectMapper mapper;

	@RequestMapping(value = "/dienBienSoLieuChiTieuTK", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void dienBienSoLieuChiTieuTK(
			@RequestBody Hashtable<String, String> params,
			HttpServletResponse response) {
		String currentDate = Utils.getCurrentDate();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String excelFilePath = loader.getResource(
				"ExcelTemplates/dienBienSoLieuChiTieuTK.xls").getPath();

		String fileName = String.format(
				"Diá»…n biáº¿n sá»‘ liá»‡u chá»‰ tiÃªu thá»‘ng kÃª.xls",
				currentDate);

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> lstDataKyGetsize = new ArrayList<Map<String, Object>>();

		String Path = Utils.getBaseUrl(request);
		try {
			
			SLTheoCTTKRequestParams requestParams = new SLTheoCTTKRequestParams();
			requestParams.setNhx(params.get("nhx"));
			requestParams.setTrangthai(params.get("trangthai"));
			requestParams.setUsername(Utils.escapeNull(Utils.getPrincipalLogin().getUser().getUserName()));
			requestParams.setMaCucHQ(Utils.escapeNull(Utils.getPrincipalLogin().getMaCuc()));
			requestParams.setMaChicucHQ(Utils.escapeNull(Utils.getPrincipalLogin().getMaChiCuc()));
			
			SLTheoCTTK01Response result = repository.getSLTheoCTTK01(requestParams);
			
			String responeJson = mapper.writeValueAsString(result);
			
			
//			String myURL = Path + "/bcpt/SoLieuTheoChiTieuThongKe01?" + "nhx="
//					+ params.get("nhx") + "&trangthai=" + params.get("trangthai")
//					+ "&maCucHQ=" + Utils.escapeNull(Utils.getPrincipalLogin().getMaCuc()) 
//					+ "&maChicucHQ=" + Utils.escapeNull(Utils.getPrincipalLogin().getMaChiCuc());
			// + "&maCucHQ=" + Utils.getPrincipalLogin().getUser().getMaHq()
			// + "&maChicucHQ=" + Utils.getPrincipalLogin().getUser().getMaHq();
//			String responeJson = mapper.writeValueAsString(slTheoCTTK01Response);
//			BufferedReader reader = null;
//			try {
//				URL url = new URL(myURL);
//				reader = new BufferedReader(new InputStreamReader(
//						url.openStream(), "UTF-8"));
//				StringBuffer buffer = new StringBuffer();
//				int read;
//				char[] chars = new char[1024];
//				while ((read = reader.read(chars)) != -1)
//					buffer.append(chars, 0, read);
//
//				responeJson = buffer.toString();
//			} finally {
//				if (reader != null)
//					reader.close();
//			}

			// JSONArray jsonArray = new JSONArray(responeJson);

			// for(int i = 0; i < jsonArray.length(); i++){
			// JSONObject groupJson = jsonArray.getJSONObject(i);
			JSONObject groupJson = new JSONObject(responeJson);
			Map<String, Object> map = Utils.jsonToMap(groupJson);
			Map<String, Object> dataKy123 = (Map<String, Object>) map
					.get("data_ky");
			lstDataKyGetsize = (List<Map<String, Object>>) dataKy123
					.get("data");
			list.add(map);
			// }

			// Tao luong doc workbook
			InputStream is = new FileInputStream(excelFilePath);
			Workbook workbook = new HSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			Cell cell; // store value of current cell
			Row row; // store value of current row

			Map<String, CellStyle> styles = CExcel.createStyles(workbook);

			Integer colNum = 0; // position of first column fill data
			Integer rowNum = 3; // position of first row fill data
			String mergeRange = "";

			List<Map<String, Object>> groupData = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataKy = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataKy = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataThang = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataThang = new ArrayList<Map<String, Object>>();

			// create header
			List<String> header = new ArrayList<String>();
			header.add(Utils.getMessageProperties("chitieu"));
			header.add(Utils.getMessageProperties("ky"));
			header.add(Utils.getMessageProperties("thoigian"));
			header.add(Utils.getMessageProperties("sskytruoc"));
			header.add(Utils.getMessageProperties("sscungkynamtruoc"));

			row = sheet.createRow(rowNum);

			for (int i = 0; i < header.size(); i++) {
				if (i == 2) {
					cell = row.createCell(colNum);
					cell.setCellValue(header.get(i));
					cell.setCellStyle(styles.get("header"));
					colNum += (lstDataKyGetsize.size() - 1);
					mergeRange = "$" + CellReference.convertNumToColString(i)
							+ "$4" + ":$"
							+ CellReference.convertNumToColString(colNum)
							+ "$4";
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

					colNum++;
					continue;
				}

				cell = row.createCell(colNum);
				cell.setCellValue(header.get(i));
				cell.setCellStyle(styles.get("header"));
				colNum++;
			}

			colNum = 0;

			// fill data to cell
			// for(int i = 0; i < list.size(); i++){
			// rowNum++;
			// row = sheet.createRow(rowNum);
			// cell = row.createCell(colNum);
			// cell.setCellValue(list.get(i).get("group_name").toString());
			// cell.setCellStyle(styles.get("cell_str"));
			//
			// mergeRange = "$" + CellReference.convertNumToColString(0) + "$" +
			// (rowNum + 1) + ":$"
			// + CellReference.convertNumToColString(110) + "$" + (rowNum + 1);
			// sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
			//
			groupData = list;

			for (int j = 0; j < groupData.size(); j++) {
				colNum = 0;
				rowNum++;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				cell.setCellValue(groupData.get(j).get("sub_name").toString());
				cell.setCellStyle(styles.get("cell_str_center"));

				mergeRange = "$" + CellReference.convertNumToColString(0) + "$"
						+ (rowNum + 1) + ":$"
						+ CellReference.convertNumToColString(0) + "$"
						+ (rowNum + 2);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.getMessageProperties("ky"));
				cell.setCellStyle(styles.get("cell_str_center"));

				dataKy = (Map<String, Object>) groupData.get(j).get("data_ky");
				lstDataKy = (List<Map<String, Object>>) dataKy.get("data");

				for (int k = 0; k < lstDataKy.size(); k++) {
					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(lstDataKy.get(k).get("ky").toString()
							+ "\n"
							+ Utils.escapeNullString(lstDataKy.get(k)
									.get("gia_tri").toString()));
					cell.setCellStyle(styles.get("cell_str_center"));
					sheet.setColumnWidth(colNum, 10 * 256);
				}

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNullString(dataKy
						.get("ss_ky_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNullString(dataKy
						.get("ss_ky_nam_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));

				// colNum++;
				// cell = row.createCell(colNum);
				// cell.setCellValue(Utils.escapeNull(dataKy.get("trend")));
				// cell.setCellStyle(styles.get("cell_str_center"));
				//
				// colNum++;
				// cell = row.createCell(colNum);
				// cell.setCellValue(Utils.escapeNull(dataKy.get("forecast")));
				// cell.setCellStyle(styles.get("cell_str_center"));

				rowNum++;
				colNum = 1;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				row.setHeight((short)550);
				cell.setCellValue(Utils.getMessageProperties("thang"));
				cell.setCellStyle(styles.get("cell_str_center"));

				dataThang = (Map<String, Object>) groupData.get(j).get(
						"data_thang");
				lstDataThang = (List<Map<String, Object>>) dataThang
						.get("data");

				for (int k = 0; k < lstDataThang.size(); k++) {
					if ((k != (lstDataThang.size() - 1))
							|| (lstDataKyGetsize.size() % 2 == 0)) {
						colNum += 2;
						cell = row.createCell(colNum - 1);
					} else {
						colNum++;
						cell = row.createCell(colNum);
					}
					cell.setCellValue(lstDataThang.get(k).get("thang")
							.toString()
							+ "\n"
							+ Utils.escapeNullString(lstDataThang.get(k)
									.get("gia_tri").toString()));
					cell.setCellStyle(styles.get("cell_str_center"));
					sheet.setColumnWidth(colNum, 10 * 256);
					if ((k != (lstDataThang.size() - 1))
							|| (lstDataKyGetsize.size() % 2 == 0)) {
						sheet.addMergedRegion(new CellRangeAddress(rowNum,
								rowNum, colNum - 1, colNum));
						RegionUtil.setBorderBottom(CellStyle.BORDER_THIN,
								new CellRangeAddress(rowNum, rowNum,
										colNum - 1, colNum), sheet);
					}
				}

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNullString(dataThang
						.get("ss_thang_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNullString(dataThang
						.get("ss_thang_nam_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));

				// colNum++;
				// cell = row.createCell(colNum);
				// cell.setCellValue(Utils.escapeNull(dataKy.get("trend")));
				// cell.setCellStyle(styles.get("cell_str_center"));
				//
				// colNum++;
				// cell = row.createCell(colNum);
				// cell.setCellValue(Utils.escapeNull(dataKy.get("forecast")));
				// cell.setCellStyle(styles.get("cell_str_center"));

				rowNum++;
				colNum = 0;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				cell.setCellValue("AVG");
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNullString(groupData.get(j)
						.get("avg").toString()));
				// cell.setCellStyle(styles.get("cell_str_center"));

				mergeRange = "$"
						+ CellReference.convertNumToColString(1)
						+ "$"
						+ (rowNum + 1)
						+ ":$"
						+ CellReference.convertNumToColString(lstDataKyGetsize
								.size() + 3) + "$" + (rowNum + 1);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
				RegionUtil.setBorderBottom(CellStyle.BORDER_THIN,
						CellRangeAddress.valueOf(mergeRange), sheet);
				RegionUtil.setBorderRight(CellStyle.BORDER_THIN,
						CellRangeAddress.valueOf(mergeRange), sheet);
			}
			// }

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ fileName + "\"");

			// Tao luong ghi
			ServletOutputStream out = response.getOutputStream();
			workbook.write(out);

			out.flush();

			out.close();
			workbook.close();
			is.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@RequestMapping(value = "/dienBienSLDoanhNghiepFDI", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void dienBienSLDoanhNghiepFDI(
			@RequestBody Hashtable<String, String> params,
			HttpServletResponse response) {
		String currentDate = Utils.getCurrentDate();
		// String excelDir = "D:\\ExcelDir";
		// String excelFilePath = excelDir + "\\DienBienSLTK_XNK.xls";
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String excelFilePath = loader.getResource(
				"ExcelTemplates/dienBienSLDoanhNghiepFDI.xls").getPath();
		String fileName = String.format(
				"Diá»…n biáº¿n sá»‘ lÆ°á»£ng doanh nghiá»‡p FDI.xls",
				currentDate);
				
		SLTheoCTTKRequestParams requestParams = new SLTheoCTTKRequestParams();
		requestParams.setTrangthai(params.get("trangthai"));
		requestParams.setNhx(params.get("nhx"));
		requestParams.setMaCucHQ(params.get("maCucHQ"));
		requestParams.setMaChicucHQ(params.get("maChiCucHQ"));
		requestParams.setUsername(Utils.escapeNull(Utils.getPrincipalLogin().getUser().getUserName()));
		List<SLTheoCTTK10Response> lst = repository.getSLTheoCTTK10(requestParams, params.get("mathang"));		
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> lstDataKyGetsize = new ArrayList<Map<String, Object>>();
		String Path = Utils.getBaseUrl(request);
		try {
//			String myURL = Path + "/bcpt/SoLieuTheoChiTieuThongKe10?" + "nhx="
//					+ params.get("nhx") + "&trangthai="
//					+ params.get("trangthai") + "&maCucHQ="
//					+ params.get("maCucHQ") + "&maChicucHQ="
//					+ params.get("maChiCucHQ")+ "&mathang="
//							+ params.get("mathang");
//			String responeJson;
//			BufferedReader reader = null;
//			try {
//				URL url = new URL(myURL);
//				reader = new BufferedReader(new InputStreamReader(
//						url.openStream(), "UTF-8"));
//				StringBuffer buffer = new StringBuffer();
//				int read;
//				char[] chars = new char[1024];
//				while ((read = reader.read(chars)) != -1)
//					buffer.append(chars, 0, read);
//
//				responeJson = buffer.toString();
//			} finally {
//				if (reader != null)
//					reader.close();
//			}
			String responeJson = mapper.writeValueAsString(lst);
			JSONArray jsonArray = new JSONArray(responeJson);

			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject groupJson = jsonArray.getJSONObject(i);
				Map<String, Object> map = Utils.jsonToMap(groupJson);
				Map<String, Object> dataKy123 = (Map<String, Object>) map.get("data_ky");
				lstDataKyGetsize = (List<Map<String, Object>>) dataKy123.get("data");
				list.add(map);
			}

			// Tao luong doc workbook
			InputStream is = new FileInputStream(excelFilePath);
			Workbook workbook = new HSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			Cell cell; // store value of current cell
			Row row; // store value of current row

			Map<String, CellStyle> styles = CExcel.createStyles(workbook);

			Integer colNum = 0; // position of first column fill data
			Integer rowNum = 3; // position of first row fill data
			String mergeRange = "";

			List<Map<String, Object>> groupData = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataKy = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataKy = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataThang = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataThang = new ArrayList<Map<String, Object>>();

			// create header
			List<String> header = new ArrayList<String>();
			header.add(Utils.getMessageProperties("chitieu"));
			header.add(Utils.getMessageProperties("ky"));
			header.add(Utils.getMessageProperties("thoigian"));
			header.add(Utils.getMessageProperties("sskytruoc"));
			header.add(Utils.getMessageProperties("sscungkynamtruoc"));
			header.add(Utils.getMessageProperties("solieunamhienthoi"));
			header.add(Utils.getMessageProperties("dubaonamtiep_trend"));

			row = sheet.createRow(rowNum);

			for (int i = 0; i < header.size(); i++) {
				if (i == 2) {
					cell = row.createCell(colNum);
					cell.setCellValue(header.get(i));
					cell.setCellStyle(styles.get("header"));
					colNum += (lstDataKyGetsize.size() - 1);
					mergeRange = "$" + CellReference.convertNumToColString(i)
							+ "$4" + ":$"
							+ CellReference.convertNumToColString(colNum)
							+ "$4";
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

					colNum++;
					continue;
				}

				cell = row.createCell(colNum);
				cell.setCellValue(header.get(i));
				cell.setCellStyle(styles.get("header"));
				colNum++;
			}

			colNum = 0;

			// fill data to cell
			// for(int i = 0; i < list.size(); i++){
			// rowNum++;
			// row = sheet.createRow(rowNum);
			// cell = row.createCell(colNum);
			// cell.setCellValue(list.get(i).get("group_name").toString());
			// cell.setCellStyle(styles.get("cell_str"));
			//
			// mergeRange = "$" + CellReference.convertNumToColString(0) + "$" +
			// (rowNum + 1) + ":$"
			// + CellReference.convertNumToColString(110) + "$" + (rowNum + 1);
			// sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
			//
			// groupData = (List<Map<String,
			// Object>>)list.get(i).get("group_data");
			groupData = list;

			for (int j = 0; j < groupData.size(); j++) {
				colNum = 0;
				rowNum++;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				cell.setCellValue(groupData.get(j).get("subname").toString());
				cell.setCellStyle(styles.get("cell_str_center"));

				mergeRange = "$" + CellReference.convertNumToColString(0) + "$"
						+ (rowNum + 1) + ":$"
						+ CellReference.convertNumToColString(0) + "$"
						+ (rowNum + 2);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.getMessageProperties("ky"));
				cell.setCellStyle(styles.get("cell_str_center"));

				dataKy = (Map<String, Object>) groupData.get(j).get("data_ky");
				lstDataKy = (List<Map<String, Object>>) dataKy.get("data");

				for (int k = 0; k < lstDataKy.size(); k++) {
					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(lstDataKy.get(k).get("ky").toString()
							+ "\n" + lstDataKy.get(k).get("gia_tri").toString());
					cell.setCellStyle(styles.get("cell_str_center"));
					sheet.setColumnWidth(colNum, 10 * 256);
				}

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataKy.get("ss_ky_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataKy
						.get("ss_ky_nam_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataKy.get("forecast")));
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataKy.get("trend")));
				cell.setCellStyle(styles.get("cell_str_center"));

				rowNum++;
				colNum = 1;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				row.setHeight((short)550);
				cell.setCellValue(Utils.getMessageProperties("thang"));
				cell.setCellStyle(styles.get("cell_str_center"));

				dataThang = (Map<String, Object>) groupData.get(j).get(
						"data_thang");
				lstDataThang = (List<Map<String, Object>>) dataThang
						.get("data");

				// for(int k = 0; k < lstDataThang.size(); k++){
				// colNum++;
				// cell = row.createCell(colNum);
				// cell.setCellValue(lstDataThang.get(k).get("thang").toString()
				// + "\n"
				// + lstDataThang.get(k).get("gia_tri").toString());
				// cell.setCellStyle(styles.get("cell_str_center"));
				// }

				for (int k = 0; k < lstDataThang.size(); k++) {
					if ((k != (lstDataThang.size() - 1))
							|| (lstDataKyGetsize.size() % 2 == 0)) {
						colNum += 2;
						cell = row.createCell(colNum - 1);
					} else {
						colNum++;
						cell = row.createCell(colNum);
					}
					cell.setCellValue(lstDataThang.get(k).get("thang")
							.toString()
							+ "\n"
							+ lstDataThang.get(k).get("gia_tri").toString());
					cell.setCellStyle(styles.get("cell_str_center"));
					if ((k != (lstDataThang.size() - 1))
							|| (lstDataKyGetsize.size() % 2 == 0)) {
						sheet.addMergedRegion(new CellRangeAddress(rowNum,
								rowNum, colNum - 1, colNum));
						RegionUtil.setBorderBottom(CellStyle.BORDER_THIN,
								new CellRangeAddress(rowNum, rowNum,
										colNum - 1, colNum), sheet);
					}
				}

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataThang
						.get("ss_thang_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataThang
						.get("ss_thang_nam_truoc")));
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataThang.get("forecast")));
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(Utils.escapeNull(dataThang.get("trend")));
				cell.setCellStyle(styles.get("cell_str_center"));

				rowNum++;
				colNum = 0;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				cell.setCellValue("AVG");
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(groupData.get(j).get("avg").toString());
//				cell.setCellStyle(styles.get("cell_str_center"));

				mergeRange = "$"
						+ CellReference.convertNumToColString(1)
						+ "$"
						+ (rowNum + 1)
						+ ":$"
						+ CellReference.convertNumToColString(lstDataKyGetsize
								.size() + 5) + "$" + (rowNum + 1);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
				RegionUtil.setBorderBottom(CellStyle.BORDER_THIN,
						CellRangeAddress.valueOf(mergeRange), sheet);
				RegionUtil.setBorderRight(CellStyle.BORDER_THIN,
						CellRangeAddress.valueOf(mergeRange), sheet);
			}
			// }

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ fileName + "\"");

			// Tao luong ghi
			ServletOutputStream out = response.getOutputStream();
			workbook.write(out);

			out.flush();

			out.close();
			workbook.close();
			is.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@RequestMapping(value = "/dienBienXNKVanTai", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void dienBienXNKVanTai(
			@RequestBody Hashtable<String, String> params,
			HttpServletResponse response) {
		String currentDate = Utils.getCurrentDate();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String excelFilePath = loader.getResource(
				"ExcelTemplates/dienBienXNKVanTai.xls").getPath();
		String fileName = String.format(
				"Diá»…n biáº¿n trá»‹ giÃ¡ XNK theo PTVT.xls", currentDate);
		
		SLTheoCTTKRequestParams requestParams = new SLTheoCTTKRequestParams();
		requestParams.setTrangthai(params.get("trangthai"));
		requestParams.setNhx(params.get("nhx"));
		requestParams.setMaCucHQ(params.get("maCucHQ"));
		requestParams.setMaChicucHQ(params.get("maChiCucHQ"));
		requestParams.setUsername(Utils.escapeNull(Utils.getPrincipalLogin().getUser().getUserName()));
		List<SLTheoCTTK13Response> lst = repository.getSLTheoCTTK13(requestParams, params.get("nhomPTVT"), params.get("PTVT"));
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> lstDataKyGetsize = new ArrayList<Map<String, Object>>();
		String Path = Utils.getBaseUrl(request);
		try {
//			String myURL = Path + "/bcpt/SoLieuTheoChiTieuThongKe13?" + "nhx="
//					+ params.get("nhx") + "&trangthai="
//					+ params.get("trangthai") + "&maCucHQ="
//					+ params.get("maCucHQ") + "&maChicucHQ="
//					+ params.get("maChiCucHQ") + "&group_transport="
//					+ params.get("nhomPTVT") + "&transport="
//					+ params.get("PTVT");
//			String responeJson;
//			BufferedReader reader = null;
//
//			System.out.println(myURL);
//
//			try {
//				URL url = new URL(myURL);
//				reader = new BufferedReader(new InputStreamReader(
//						url.openStream(), "UTF-8"));
//				StringBuffer buffer = new StringBuffer();
//				int read;
//				char[] chars = new char[1024];
//				while ((read = reader.read(chars)) != -1)
//					buffer.append(chars, 0, read);
//
//				responeJson = buffer.toString();
//			} finally {
//				if (reader != null)
//					reader.close();
//			}
			String responeJson =  mapper.writeValueAsString(lst);
			JSONArray jsonArray = new JSONArray(responeJson);

			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject groupJson = jsonArray.getJSONObject(i);
				Map<String, Object> map = Utils.jsonToMap(groupJson);
				list.add(map);
			}

			List<Map<String, Object>> groupDataGetsize = (List<Map<String, Object>>) list
					.get(0).get("group_data");
			Map<String, Object> dataKy123 = (Map<String, Object>) groupDataGetsize
					.get(0).get("data_ky");
			lstDataKyGetsize = (List<Map<String, Object>>) dataKy123
					.get("data");

			// Tao luong doc workbook
			InputStream is = new FileInputStream(excelFilePath);
			Workbook workbook = new HSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			Cell cell; // store value of current cell
			Row row; // store value of current row

			Map<String, CellStyle> styles = CExcel.createStyles(workbook);

			Integer colNum = 0; // position of first column fill data
			Integer rowNum = 3; // position of first row fill data
			String mergeRange = "";

			List<Map<String, Object>> groupData = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataKy = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataKy = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataThang = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataThang = new ArrayList<Map<String, Object>>();

			// create header
			List<String> header = new ArrayList<String>();
			header.add(Utils.getMessageProperties("chitieu"));
			header.add(Utils.getMessageProperties("ky"));
			header.add(Utils.getMessageProperties("thoigian"));
			header.add(Utils.getMessageProperties("sskytruoc"));
			header.add(Utils.getMessageProperties("sscungkynamtruoc"));
			// header.add("Sá»‘ liá»‡u nÄƒm hiá»‡n thá»�i");
			// header.add("Dá»± bÃ¡o nÄƒm tiáº¿p theo - HÃ m Trend");

			row = sheet.createRow(rowNum);

			for (int i = 0; i < header.size(); i++) {
				if (i == 2) {
					cell = row.createCell(colNum);
					cell.setCellValue(header.get(i));
					cell.setCellStyle(styles.get("header"));
					colNum += (lstDataKyGetsize.size() - 1);
					mergeRange = "$" + CellReference.convertNumToColString(i)
							+ "$4" + ":$"
							+ CellReference.convertNumToColString(colNum)
							+ "$4";
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

					colNum++;
					continue;
				}

				cell = row.createCell(colNum);
				cell.setCellValue(header.get(i));
				cell.setCellStyle(styles.get("header"));
				colNum++;
			}

			colNum = 0;

			// fill data to cell
			for (int i = 0; i < list.size(); i++) {
				rowNum++;
				colNum = 0;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				String a = list.get(i).get("group_name").toString();
				cell.setCellValue(list.get(i).get("group_name").toString());
				cell.setCellStyle(styles.get("cell_str"));

				mergeRange = "$"
						+ CellReference.convertNumToColString(0)
						+ "$"
						+ (rowNum + 1)
						+ ":$"
						+ CellReference.convertNumToColString(lstDataKyGetsize
								.size() + 3) + "$" + (rowNum + 1);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
				RegionUtil.setBorderRight(CellStyle.BORDER_THIN,
						CellRangeAddress.valueOf(mergeRange), sheet);

				groupData = (List<Map<String, Object>>) list.get(i).get(
						"group_data");
				// groupData = list;

				for (int j = 0; j < groupData.size(); j++) {
					colNum = 0;
					rowNum++;
					row = sheet.createRow(rowNum);
					cell = row.createCell(colNum);
					cell.setCellValue(groupData.get(j).get("sub_name")
							.toString());
					cell.setCellStyle(styles.get("cell_str_center"));

					mergeRange = "$" + CellReference.convertNumToColString(0)
							+ "$" + (rowNum + 1) + ":$"
							+ CellReference.convertNumToColString(0) + "$"
							+ (rowNum + 2);
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.getMessageProperties("ky"));
					cell.setCellStyle(styles.get("cell_str_center"));

					dataKy = (Map<String, Object>) groupData.get(j).get(
							"data_ky");
					lstDataKy = (List<Map<String, Object>>) dataKy.get("data");

					for (int k = 0; k < lstDataKy.size(); k++) {
						colNum++;
						cell = row.createCell(colNum);
						cell.setCellValue(lstDataKy.get(k).get("ky").toString()
								+ "\n"
								+ lstDataKy.get(k).get("gia_tri").toString());
						cell.setCellStyle(styles.get("cell_str_center"));
						sheet.setColumnWidth(colNum, 10 * 256);
					}

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy
							.get("ss_ky_truoc")));
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy
							.get("ss_ky_nam_truoc")));
					cell.setCellStyle(styles.get("cell_str_center"));

					// colNum++;
					// cell = row.createCell(colNum);
					// cell.setCellValue(Utils.escapeNull(dataKy.get("forecast")));
					// cell.setCellStyle(styles.get("cell_str_center"));
					//
					// colNum++;
					// cell = row.createCell(colNum);
					// cell.setCellValue(Utils.escapeNull(dataKy.get("trend")));
					// cell.setCellStyle(styles.get("cell_str_center"));

					rowNum++;
					colNum = 1;
					row = sheet.createRow(rowNum);
					cell = row.createCell(colNum);
					row.setHeight((short)550);
					cell.setCellValue(Utils.getMessageProperties("thang"));
					cell.setCellStyle(styles.get("cell_str_center"));

					dataThang = (Map<String, Object>) groupData.get(j).get(
							"data_thang");
					lstDataThang = (List<Map<String, Object>>) dataThang
							.get("data");

					for (int k = 0; k < lstDataThang.size(); k++) {
						if ((k != (lstDataThang.size() - 1))
								|| (lstDataKyGetsize.size() % 2 == 0)) {
							colNum += 2;
							cell = row.createCell(colNum - 1);
						} else {
							colNum++;
							cell = row.createCell(colNum);
						}
						cell.setCellValue(lstDataThang.get(k).get("thang")
								.toString()
								+ "\n"
								+ lstDataThang.get(k).get("gia_tri").toString());
						cell.setCellStyle(styles.get("cell_str_center"));
						if ((k != (lstDataThang.size() - 1))
								|| (lstDataKyGetsize.size() % 2 == 0)) {
							sheet.addMergedRegion(new CellRangeAddress(rowNum,
									rowNum, colNum - 1, colNum));
							RegionUtil.setBorderBottom(CellStyle.BORDER_THIN,
									new CellRangeAddress(rowNum, rowNum,
											colNum - 1, colNum), sheet);
						}
					}

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy
							.get("ss_thang_truoc")));
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy
							.get("ss_thang_nam_truoc")));
					cell.setCellStyle(styles.get("cell_str_center"));

					// colNum++;
					// cell = row.createCell(colNum);
					// cell.setCellValue(Utils.escapeNull(dataKy.get("forecast")));
					// cell.setCellStyle(styles.get("cell_str_center"));
					//
					// colNum++;
					// cell = row.createCell(colNum);
					// cell.setCellValue(Utils.escapeNull(dataKy.get("trend")));
					// cell.setCellStyle(styles.get("cell_str_center"));

					rowNum++;
					colNum = 0;
					row = sheet.createRow(rowNum);
					cell = row.createCell(colNum);
					cell.setCellValue("AVG");
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(groupData.get(j).get("avg").toString());
					// cell.setCellStyle(styles.get("cell_str_center"));

					mergeRange = "$"
							+ CellReference.convertNumToColString(1)
							+ "$"
							+ (rowNum + 1)
							+ ":$"
							+ CellReference
									.convertNumToColString(lstDataKyGetsize
											.size() + 1) + "$" + (rowNum + 1);
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
					RegionUtil.setBorderBottom(CellStyle.BORDER_THIN,
							CellRangeAddress.valueOf(mergeRange), sheet);
					RegionUtil.setBorderRight(CellStyle.BORDER_THIN,
							CellRangeAddress.valueOf(mergeRange), sheet);
				}
			}

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ fileName + "\"");

			// Tao luong ghi
			ServletOutputStream out = response.getOutputStream();
			workbook.write(out);

			out.flush();

			out.close();
			workbook.close();
			is.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@RequestMapping(value = "/dienBienXuTheChiSo", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void dienBienXuTheChiSo(
			@RequestBody Hashtable<String, String> params,
			HttpServletResponse response) {
		String currentDate = Utils.getCurrentDate();
		// String excelDir = "D:\\ExcelDir";
		// String excelFilePath = excelDir + "\\DienBienSLTK_XNK.xls";
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String excelFilePath = loader.getResource(
				"ExcelTemplates/dienBienXuTheChiSo.xls").getPath();
		String fileName = String.format(
				"Diá»…n biáº¿n sá»‘ liá»‡u theo Ä‘á»‹nh gá»‘c liÃªn hoÃ n.xls",
				currentDate);

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> lstDataKyGetsize = new ArrayList<Map<String, Object>>();

		String mh = "&mathang=";
		String matHang = params.get("matHang");
		if (matHang != null && !"".equals(matHang)) {
			mh = "&mathang=" + matHang;
		}
		String radioBoxChecked = params.get("thoigian");

		SimpleDateFormat yearFormatFull = new SimpleDateFormat("yyyy");
		SimpleDateFormat monthFormat = new SimpleDateFormat("M");
		Date dateCurrent = new Date();
		int monthCurrent = Integer.parseInt(monthFormat.format(dateCurrent));
		int yearCurrentFull = Integer.parseInt(yearFormatFull
				.format(dateCurrent));
		int quyCurrent = 1;
		if (monthCurrent >= 4 && monthCurrent <= 6) {
			quyCurrent = 2;
		} else if (monthCurrent >= 7 && monthCurrent <= 9) {
			quyCurrent = 3;
		} else if (monthCurrent >= 10) {
			quyCurrent = 4;
		}
		
		SLTheoCTTKRequestParams requestParams = new SLTheoCTTKRequestParams();
		requestParams.setTrangthai(params.get("trangthai"));
		requestParams.setNhx(params.get("nhx"));
		requestParams.setMaCucHQ(Utils.getPrincipalLogin().getMaCuc());
		requestParams.setMaChicucHQ(Utils.getPrincipalLogin().getMaChiCuc());
		requestParams.setUsername(Utils.escapeNull(Utils.getPrincipalLogin().getUser().getUserName()));
		List<SLTheoCTTK07Response> lst = repository.getSLTheoCTTK07(requestParams, params.get("thoigian"), params.get("matHang"),
				params.get("chiSo"), params.get("loaiChiSo"));

		try {
//			String Path = Utils.getBaseUrl(request);
//			String myURL = Path + "/bcpt/SoLieuTheoChiTieuThongKe07?" + "nhx="
//					+ params.get("nhx") + "&trangthai="
//					+ params.get("trangthai") + "&thoigian="
//					+ params.get("thoigian") + "&chiso=" + params.get("chiSo")
//					+ "&loaichiso=" + params.get("loaiChiSo") //+ "&maCucHQ=00"
//					+ mh
//					+ "&username=" + Utils.escapeNull(Utils.getPrincipalLogin().getUser().getUserName()) 
//					+ "&maCucHQ=" + Utils.escapeNull(Utils.getPrincipalLogin().getMaCuc()) 
//					+ "&maChicucHQ=" + Utils.escapeNull(Utils.getPrincipalLogin().getMaChiCuc());
//			String responeJson;
//			BufferedReader reader = null;
//
//			System.out.println(myURL);
//
//			try {
//				URL url = new URL(myURL);
//				reader = new BufferedReader(new InputStreamReader(
//						url.openStream(), "UTF-8"));
//				StringBuffer buffer = new StringBuffer();
//				int read;
//				char[] chars = new char[1024];
//				while ((read = reader.read(chars)) != -1)
//					buffer.append(chars, 0, read);
//
//				responeJson = buffer.toString();
//			} finally {
//				if (reader != null)
//					reader.close();
//			}
			String responeJson = mapper.writeValueAsString(lst);
			JSONArray jsonArray = new JSONArray(responeJson);

			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject groupJson = jsonArray.getJSONObject(i);
				Map<String, Object> map = Utils.jsonToMap(groupJson);
				list.add(map);
			}

			// Tao luong doc workbook
			InputStream is = new FileInputStream(excelFilePath);
			Workbook workbook = new HSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			Cell cell; // store value of current cell
			Row row; // store value of current row

			Map<String, CellStyle> styles = CExcel.createStyles(workbook);

			Integer colNum = 0; // position of first column fill data
			Integer rowNum = 3; // position of first row fill data
			Integer colNumPlus = 3;
			String mergeRange = "";

			// create header
			List<String> header = new ArrayList<String>();
			header.add(Utils.getMessageProperties("chitieu"));

			row = sheet.createRow(rowNum);
			if ("NAM".equals(radioBoxChecked)) {
				colNumPlus = 1;
				header.add(Utils.getMessageProperties("nam") + " "
						+ yearCurrentFull + " "
						+ Utils.getMessageProperties("sovoi"));
				header.add(Utils.getMessageProperties("kygoc"));
				header.add(Utils.getMessageProperties("nam") + " "
						+ (yearCurrentFull - 1));

			} else if ("THA".equals(radioBoxChecked)) {
				colNumPlus = 3;
				header.add(Utils.getMessageProperties("thang01") + " "
						+ monthCurrent + "/" + yearCurrentFull + " "
						+ Utils.getMessageProperties("sovoi"));
				header.add(Utils.getMessageProperties("kygoc"));
				header.add(Utils.getMessageProperties("thang01") + " "
						+ monthCurrent + "/" + (yearCurrentFull - 1));
				header.add(Utils.getMessageProperties("thang01") + " 12/"
						+ (yearCurrentFull - 1));
				if (monthCurrent == 1)
					header.add(Utils.getMessageProperties("thang01") + " 12/"
							+ (yearCurrentFull - 1));
				else
					header.add(Utils.getMessageProperties("thang01") + " "
							+ (monthCurrent - 1) + '/' + yearCurrentFull);

				header.add(monthCurrent + " "
						+ Utils.getMessageProperties("thang02") + "/"
						+ yearCurrentFull + " "
						+ Utils.getMessageProperties("sovoi") + " "
						+ monthCurrent + " "
						+ Utils.getMessageProperties("thang02") + "/"
						+ (yearCurrentFull - 1));
			} else if ("QUY".equals(radioBoxChecked)) {
				colNumPlus = 3;
				header.add(Utils.getMessageProperties("quy01") + " "
						+ quyCurrent + '/' + yearCurrentFull + " "
						+ Utils.getMessageProperties("sovoi"));
				header.add(Utils.getMessageProperties("kygoc"));
				header.add(Utils.getMessageProperties("quy01") + " "
						+ quyCurrent + '/' + (yearCurrentFull - 1));
				header.add(Utils.getMessageProperties("quy01") + " 4/"
						+ (yearCurrentFull - 1));
				if (quyCurrent == 1)
					header.add(Utils.getMessageProperties("quy01") + " 4/"
							+ (yearCurrentFull - 1));
				else
					header.add(Utils.getMessageProperties("quy01") + " "
							+ (quyCurrent - 1) + '/' + yearCurrentFull);

				header.add(quyCurrent + " " + Utils.getMessageProperties("quy")
						+ "/" + yearCurrentFull + " "
						+ Utils.getMessageProperties("sovoi") + " "
						+ quyCurrent + " " + Utils.getMessageProperties("quy")
						+ "/" + (yearCurrentFull - 1));
			}
			for (int i = 0; i < header.size(); i++) {
				if (i == 0) {
					cell = row.createCell(colNum);
					cell.setCellValue(header.get(i));
					cell.setCellStyle(styles.get("header"));
					sheet.addMergedRegion(new CellRangeAddress(rowNum,
							rowNum + 1, colNum, colNum));

					colNum++;
					continue;
				}
				if (i == 1) {
					cell = row.createCell(colNum);
					cell.setCellValue(header.get(i));
					cell.setCellStyle(styles.get("header"));
					sheet.addMergedRegion(new CellRangeAddress(rowNum, rowNum,
							colNum, colNum + colNumPlus));
					if(!"NAM".equals(radioBoxChecked)){
						cell = row.createCell(colNum + colNumPlus + 1);
						cell.setCellValue(header.get(header.size() - 1));
						cell.setCellStyle(styles.get("header"));
						sheet.addMergedRegion(new CellRangeAddress(rowNum, rowNum +1, colNum + colNumPlus + 1, colNum + colNumPlus + 1));
					}
					rowNum++;
					row = sheet.createRow(rowNum);
					continue;
				}
				if (i == (header.size() - 1) && !"NAM".equals(radioBoxChecked)) {
					sheet.setColumnWidth(colNum, 20 * 256);
					break;
				}
				cell = row.createCell(colNum);
				cell.setCellValue(header.get(i));
				cell.setCellStyle(styles.get("header"));
				colNum++;
			}

			colNum = 0;

			// fill data to cell
			if ("NAM".equals(radioBoxChecked)) {
				for (int i = 0; i < list.size(); i++) {
					colNum = 0;
					rowNum++;
					row = sheet.createRow(rowNum);
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("chitieu").toString());
					cell.setCellStyle(styles.get("cell_str"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("ss_kygoc").toString());
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("ss_kytruoc").toString());
					cell.setCellStyle(styles.get("cell_str_center"));
				}
			} else {
				for (int i = 0; i < list.size(); i++) {
					colNum = 0;
					rowNum++;
					row = sheet.createRow(rowNum);
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("chitieu").toString());
					cell.setCellStyle(styles.get("cell_str"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("ss_kygoc").toString());
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("ss_cungky_namtruoc")
							.toString());
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("ss_kycuoi_namtruoc")
							.toString());
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("ss_kytruoc").toString());
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(list.get(i).get("ss_luyke").toString());
					cell.setCellStyle(styles.get("cell_str_center"));
				}
			}

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ fileName + "\"");

			// Tao luong ghi
			ServletOutputStream out = response.getOutputStream();
			workbook.write(out);

			out.flush();

			out.close();
			workbook.close();
			is.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@RequestMapping(value = "/thaydoibosungtokhaihethong", method = RequestMethod.POST)
	public void thaydoibosungtokhaihethong(String nhx,
			@RequestBody List<thayDoiBSToKhaiHeThongDTO> lst,
			HttpServletResponse response) {
		String currentDate = Utils.getCurrentDate();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String excelFilePath = loader.getResource(
				"ExcelTemplates/thaydoibosungtokhaihethong.xls").getPath();
		String fileName = String
				.format("Thay Ä‘á»•i bá»• sung tá»� khai há»‡ thá»‘ng.xls",
						currentDate);

		List<thayDoiBSToKhaiHeThongDTO> lstSLTKHT = lst;
		String xuatNhapKhau = nhx;

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> lstDataKyGetsize = new ArrayList<Map<String, Object>>();
		try {
			// Tao luong doc workbook
			InputStream is = new FileInputStream(excelFilePath);
			Workbook workbook = new HSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			Cell cell; // store value of current cell
			Row row; // store value of current row

			Map<String, CellStyle> styles = CExcel.createStyles(workbook);

			Integer colNum = 0; // position of first column fill data
			Integer rowNum = 3; // position of first row fill data
			Integer colNumPlus = 3;
			String mergeRange = "";

			// create header
			List<String> header = new ArrayList<String>();
			header.add(Utils.getMessageProperties("mo_ta"));// "MÃ´ táº£ hÃ ng hÃ³a");
			header.add(Utils.getMessageProperties("ma_hang"));// "MÃ£ hÃ ng");
			header.add(Utils.getMessageProperties("ma_tk"));// "MÃ£ thá»‘ng kÃª");
			header.add(Utils.getMessageProperties("is_nghingo"));// "Nghi ngá»�");
			header.add(Utils.getMessageProperties("is_tk"));// "Is_tk");
			header.add("SD");
			header.add(Utils.getMessageProperties("dvt_tk"));// "Ä�VT TK");
			header.add(Utils.getMessageProperties("don_gia_usd"));// "Ä�Æ¡n giÃ¡(USD)");
			header.add(Utils.getMessageProperties("don_gia_vnd"));// "Ä�Æ¡n giÃ¡(VND)");
			header.add(Utils.getMessageProperties("luong"));// "LÆ°á»£ng");
			header.add(Utils.getMessageProperties("luong_tk"));// "LÆ°á»£ng TK");
			header.add(Utils.getMessageProperties("tri_gia_usd"));// "Trá»‹ giÃ¡(USD)");
			header.add(Utils.getMessageProperties("tri_gia_vnd"));// "Trá»‹ giÃ¡(VND)");
			header.add(Utils.getMessageProperties("tri_gia_tk_usd"));// "Trá»‹ giÃ¡ TK(USD)");
			header.add(Utils.getMessageProperties("tri_gia_tk_vnd"));// "Trá»‹ giÃ¡ TK(VND)");
			header.add(Utils.getMessageProperties("ma_dv"));// "MÃ£ Ä�V");
			header.add(Utils.getMessageProperties("ma_hq"));// "MÃ£ HQ");
			header.add(Utils.getMessageProperties("ma_lh"));// "MÃ£ loáº¡i hÃ¬nh");
			header.add(Utils.getMessageProperties("so_tk"));// "Sá»‘ tá»� khai");
			header.add(Utils.getMessageProperties("thang"));// "ThÃ¡ng");
			header.add(Utils.getMessageProperties("ky"));// "Ká»³");
			if ("X".equals(xuatNhapKhau)) {
				header.add(Utils.getMessageProperties("nuocnk"));// "NÆ°á»›c nháº­p kháº©u");
			} else if ("N".equals(xuatNhapKhau)) {
				header.add(Utils.getMessageProperties("nuocxk"));// "NÆ°á»›c xuáº¥t kháº©u");
			}
			header.add(Utils.getMessageProperties("nuoc_xx"));// "NÆ°á»›c XX");
			header.add(Utils.getMessageProperties("ma_nt"));// "MÃ£ nguyÃªn tá»‡");
			header.add(Utils.getMessageProperties("ngay_dk"));// "NgÃ y Ä‘Äƒng kÃ­");
			header.add(Utils.getMessageProperties("cang_nn"));// "Cáº£ng NN");
			header.add(Utils.getMessageProperties("ma_cuakhau_nk"));// "MÃ£ CK nháº­p");
			header.add(Utils.getMessageProperties("ten_cuakhau_nk"));// "TÃªn CK nháº­p");
			header.add(Utils.getMessageProperties("ma_cuakhau_xk"));// "MÃ£ CK xuáº¥t");
			header.add(Utils.getMessageProperties("ten_cuakhau_xk"));// "TÃªn CK xuáº¥t");

			row = sheet.createRow(rowNum);

			for (int i = 0; i < header.size(); i++) {
				cell = row.createCell(colNum);
				cell.setCellValue(header.get(i));
				cell.setCellStyle(styles.get("header"));
				colNum++;
			}
			colNum = 0;

			// fill data to cell
			for (int i = 0; i < lstSLTKHT.size(); i++) {
				colNum = 0;
				rowNum++;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMo_ta());
				cell.setCellStyle(styles.get("cell_str"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMa_hang());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMa_tk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				if (lstSLTKHT.get(i).getIs_nghingo() == null
						|| "false".equals(lstSLTKHT.get(i).getIs_nghingo())) {
					cell.setCellValue("");
				} else {
					cell.setCellValue("X");
				}
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getIs_tk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getSd());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getDvt_tk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getDon_gia_usd());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getDon_gia_vnd());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getLuong());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getLuong_tk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getTri_gia_usd());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getTri_gia_vnd());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getTri_gia_tk_usd());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getTri_gia_tk_vnd());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMa_dv());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMa_hq());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMa_lh());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getSo_tk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getThang());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getKy());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getNuoc_nk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getNuoc_xx());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMa_nt());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getNgay_dk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getCang_nn());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMa_cuakhau_nk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getTen_cuakhau_nk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getMa_cuakhau_xk());
				cell.setCellStyle(styles.get("cell_str_center"));

				colNum++;
				cell = row.createCell(colNum);
				cell.setCellValue(lstSLTKHT.get(i).getTen_cuakhau_xk());
				cell.setCellStyle(styles.get("cell_str_center"));
			}

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ fileName + "\"");

			// Tao luong ghi
			ServletOutputStream out = response.getOutputStream();
			workbook.write(out);

			out.flush();

			out.close();
			workbook.close();
			is.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/dienbienHHXNK", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void dienbienHHXNK(@RequestBody Hashtable<String, String> params,
			HttpServletResponse response) {
		String currentDate = Utils.getCurrentDate();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String excelFilePath = loader.getResource(
				"ExcelTemplates/dienbienHHXNK.xls").getPath();
		String fileName = String.format(
				"Diễn biến hàng hóa xuất nhập khẩu.xls", currentDate);
		
		SLTheoCTTKRequestParams requestParams = new SLTheoCTTKRequestParams();
		requestParams.setTrangthai(params.get("trangthai"));
		requestParams.setNhx(params.get("type"));
		requestParams.setMaCucHQ(params.get("ma"));
		requestParams.setMaChicucHQ(params.get("ma_cc"));
		requestParams.setUsername(Utils.escapeNull(Utils.getPrincipalLogin().getUser().getUserName()));
		List<SLTheoCTTK04Response> lst = repository.getSLTheoCTTK04(requestParams, params.get("mathang"));	

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> lstDataKyGetsize = new ArrayList<Map<String, Object>>();
//		String Path = Utils.getBaseUrl(request);
		try {
//			String myURL = Path + "/bcpt/SoLieuTheoChiTieuThongKe04?" + "nhx="
//					+ params.get("type") + "&trangthai="
//					+ params.get("trangthai") + "&maCucHQ=" + params.get("ma")
//					+ "&maChicucHQ=" + params.get("ma_cc") + "&mathang="
//					+ params.get("mathang");
//			String responeJson;
//			BufferedReader reader = null;
//			try {
//				URL url = new URL(myURL);
//				reader = new BufferedReader(new InputStreamReader(
//						url.openStream(), "UTF-8"));
//				StringBuffer buffer = new StringBuffer();
//				int read;
//				char[] chars = new char[1024];
//				while ((read = reader.read(chars)) != -1)
//					buffer.append(chars, 0, read);
//
//				responeJson = buffer.toString();
//			} finally {
//				if (reader != null)
//					reader.close();
//			}
			String responeJson = mapper.writeValueAsString(lst);
			JSONArray jsonArray = new JSONArray(responeJson);

			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				Map<String, Object> map = Utils.jsonToMap(jsonObject);
				list.add(map);
			}
			List<Map<String, Object>> groupDataGetsize = (List<Map<String, Object>>) list
					.get(0).get("group_data");
			Map<String, Object> dataKy123 = (Map<String, Object>) groupDataGetsize
					.get(0).get("data_ky");
			lstDataKyGetsize = (List<Map<String, Object>>) dataKy123
					.get("data");
			// Tao luong doc workbook
			InputStream is = new FileInputStream(excelFilePath);
			Workbook workbook = new HSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			Cell cell; // store value of current cell
			Row row; // store value of current row

			Map<String, CellStyle> styles = CExcel.createStyles(workbook);

			Integer colNum = 0; // position of first column fill data
			Integer rowNum = 3; // position of first row fill data
			String mergeRange = "";

			List<Map<String, Object>> groupData = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataKy = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataKy = new ArrayList<Map<String, Object>>();
			Map<String, Object> dataThang = new HashMap<String, Object>();
			List<Map<String, Object>> lstDataThang = new ArrayList<Map<String, Object>>();

			// create header
			List<String> header = new ArrayList<String>();
			header.add(Utils.getMessageProperties("chitieu"));
			header.add(Utils.getMessageProperties("ky"));
			header.add(Utils.getMessageProperties("thoigian"));
			header.add(Utils.getMessageProperties("sskytruoc"));
			header.add(Utils.getMessageProperties("sscungkynamtruoc"));
			header.add(Utils.getMessageProperties("solieunamhienthoi"));
			header.add(Utils.getMessageProperties("dubaonamtiep_trend"));

			row = sheet.createRow(rowNum);

			for (int i = 0; i < header.size(); i++) {
				if (i == 2) {
					cell = row.createCell(colNum);
					cell.setCellValue(header.get(i));
					cell.setCellStyle(styles.get("header"));
					colNum += (lstDataKyGetsize.size() - 1);
					mergeRange = "$" + CellReference.convertNumToColString(i)
							+ "$4" + ":$"
							+ CellReference.convertNumToColString(colNum)
							+ "$4";
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

					colNum++;
					continue;
				}

				cell = row.createCell(colNum);
				cell.setCellValue(header.get(i));
				cell.setCellStyle(styles.get("header"));
				colNum++;
			}

			colNum = 0;
			for (int i = 0; i < list.size(); i++) {
				rowNum++;
				colNum = 0;
				row = sheet.createRow(rowNum);
				cell = row.createCell(colNum);
				String a = list.get(i).get("group_name").toString();
				cell.setCellValue(list.get(i).get("group_name").toString());
				cell.setCellStyle(styles.get("cell_str"));

				mergeRange = "$"
						+ CellReference.convertNumToColString(0)
						+ "$"
						+ (rowNum + 1)
						+ ":$"
						+ CellReference.convertNumToColString(lstDataKyGetsize
								.size() + 3) + "$" + (rowNum + 1);
				sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));
				RegionUtil.setBorderRight(CellStyle.BORDER_THIN,
						CellRangeAddress.valueOf(mergeRange), sheet);

				groupData = (List<Map<String, Object>>) list.get(i).get(
						"group_data");
				// groupData = list;

				for (int j = 0; j < groupData.size(); j++) {
					colNum = 0;
					rowNum++;
					row = sheet.createRow(rowNum);
					cell = row.createCell(colNum);
					cell.setCellValue(groupData.get(j).get("sub_name")
							.toString());
					cell.setCellStyle(styles.get("cell_str_center"));

					mergeRange = "$" + CellReference.convertNumToColString(0)
							+ "$" + (rowNum + 1) + ":$"
							+ CellReference.convertNumToColString(0) + "$"
							+ (rowNum + 2);
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.getMessageProperties("ky"));
					cell.setCellStyle(styles.get("cell_str_center"));

					dataKy = (Map<String, Object>) groupData.get(j).get(
							"data_ky");
					lstDataKy = (List<Map<String, Object>>) dataKy.get("data");

					for (int k = 0; k < lstDataKy.size(); k++) {
						colNum++;
						cell = row.createCell(colNum);
						cell.setCellValue(lstDataKy.get(k).get("ky").toString()
								+ "\n"
								+ lstDataKy.get(k).get("gia_tri").toString());
						cell.setCellStyle(styles.get("cell_str_center"));
						sheet.setColumnWidth(colNum, 10 * 256);
					}

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy
							.get("ss_ky_truoc")));
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy
							.get("ss_ky_nam_truoc")));
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy.get("forecast")));
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy.get("trend")));
					cell.setCellStyle(styles.get("cell_str_center"));

					rowNum++;
					colNum = 1;
					row = sheet.createRow(rowNum);
					cell = row.createCell(colNum);
					row.setHeight((short)550);
					cell.setCellValue(Utils.getMessageProperties("thang"));
					cell.setCellStyle(styles.get("cell_str_center"));

					dataThang = (Map<String, Object>) groupData.get(j).get(
							"data_thang");
					lstDataThang = (List<Map<String, Object>>) dataThang
							.get("data");

					for (int k = 0; k < lstDataThang.size(); k++) {
						if ((k != (lstDataThang.size() - 1))
								|| (lstDataKyGetsize.size() % 2 == 0)) {
							colNum += 2;
							cell = row.createCell(colNum - 1);
						} else {
							colNum++;
							cell = row.createCell(colNum);
						}
						cell.setCellValue(lstDataThang.get(k).get("thang")
								.toString()
								+ "\n"
								+ lstDataThang.get(k).get("gia_tri").toString());
						cell.setCellStyle(styles.get("cell_str_center"));
						if ((k != (lstDataThang.size() - 1))
								|| (lstDataKyGetsize.size() % 2 == 0)) {
							sheet.addMergedRegion(new CellRangeAddress(rowNum,
									rowNum, colNum - 1, colNum));
							RegionUtil.setBorderBottom(CellStyle.BORDER_THIN,
									new CellRangeAddress(rowNum, rowNum,
											colNum - 1, colNum), sheet);
						}
					}

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy
							.get("ss_thang_truoc")));
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy
							.get("ss_thang_nam_truoc")));
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy.get("forecast")));
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNull(dataKy.get("trend")));
					cell.setCellStyle(styles.get("cell_str_center"));
					
					if( j > 0 )
					{rowNum++;
					colNum = 0;
					row = sheet.createRow(rowNum);
					cell = row.createCell(colNum);
					cell.setCellValue("AVG");
					cell.setCellStyle(styles.get("cell_str_center"));

					colNum++;
					cell = row.createCell(colNum);
					cell.setCellValue(Utils.escapeNullString(groupData.get(j).get("avg").toString()));
					// cell.setCellStyle(styles.get("cell_str_center"));
					
					mergeRange = "$"
							+ CellReference.convertNumToColString(1)
							+ "$"
							+ (rowNum + 1)
							+ ":$"
							+ CellReference
									.convertNumToColString(lstDataKyGetsize
											.size() + 1) + "$" + (rowNum + 1);
					sheet.addMergedRegion(CellRangeAddress.valueOf(mergeRange));}
					RegionUtil.setBorderBottom(CellStyle.BORDER_THIN,
							CellRangeAddress.valueOf(mergeRange), sheet);
					RegionUtil.setBorderRight(CellStyle.BORDER_THIN,
							CellRangeAddress.valueOf(mergeRange), sheet);
				}
			}

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=\""
					+ fileName + "\"");

			// Tao luong ghi
			ServletOutputStream out = response.getOutputStream();
			workbook.write(out);

			out.flush();

			out.close();
			workbook.close();
			is.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
