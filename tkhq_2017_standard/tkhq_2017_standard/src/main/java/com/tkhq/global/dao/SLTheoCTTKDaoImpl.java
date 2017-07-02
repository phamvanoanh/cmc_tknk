package com.tkhq.global.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.jdbc.ReturningWork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tkhq.cmc.dao.Tbs_Haiquan_KTTXNKDAO;
import com.tkhq.cmc.utils.Utils;
import com.tkhq.global.model.bcptbangbieu.*;

import oracle.jdbc.OracleTypes;

@Repository
@Transactional
public class SLTheoCTTKDaoImpl extends GlobalBaseDao implements SLTheoCTTKDao {

	@Autowired
	private Tbs_Haiquan_KTTXNKDAO tbs_HQKTTXNKDAO ;
	
	private void setParams(CallableStatement statement, SLTheoCTTKRequestParams params) throws SQLException {
		statement.setString(1, params.getTrangthai());
		statement.setString(2, params.getNhx());
		statement.setString(3, params.getMaCucHQ());
		statement.setString(4, params.getMaChicucHQ());
		statement.setString(5, params.getUsername());

	}

	@Override
	public SLTheoCTTK01Response getSLTheoCTTK01(final SLTheoCTTKRequestParams params) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<SLTheoCTTK01Response>() {
			@Override
			public SLTheoCTTK01Response execute(Connection conn) throws SQLException {
				CallableStatement statement = null;
				List<SLTheoCTTK01Response> response = new ArrayList<SLTheoCTTK01Response>();
				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK01") + "(?,?,?,?,?, ?,?,?)}");
				setParams(statement, params);
				statement.registerOutParameter(6, OracleTypes.CURSOR);
				statement.registerOutParameter(7, OracleTypes.CURSOR);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(6);
				double ss;
				while (rsGroup.next()) {

					SLTheoCTTK01Response group = new SLTheoCTTK01Response();
					group.setSub_name(rsGroup.getString("SUBNAME"));
					group.setAvg(rsGroup.getString("AVG_SUB"));

					ss = rsGroup.getDouble("ss_ky_truoc_ky");
					group.getData_ky().setSs_ky_truoc(
							markupMinus2(ss));
					
					ss = rsGroup.getDouble("ss_ky_nam_truoc_ky");
					group.getData_ky().setSs_ky_nam_truoc(
							markupMinus2(ss));

					ss = rsGroup.getDouble("ss_ky_truoc_thang");
					group.getData_thang().setSs_thang_truoc(
							markupMinus2(ss));
					
					ss = rsGroup.getDouble("ss_ky_nam_truoc_thang");
					group.getData_thang().setSs_thang_nam_truoc(
							markupMinus2(ss));
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(7);
				int subID;
				while (rsDataKy.next()) {
					response.get(0).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("ky"), rsDataKy.getString("giatri")));
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(8);
				while (rsDataThang.next()) {

					response.get(0).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("ky"), rsDataThang.getString("giatri")));
				}
				rsDataThang.close();
				rsDataThang = null;

				return response.get(0);
			}
		});
	}

	@Override
	public List<SLTheoCTTK02Response> getSLTheoCTTK02(final SLTheoCTTKRequestParams params) {
		// TODO Auto-generated method stub

		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK02Response>>() {

			@Override
			public List<SLTheoCTTK02Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;
				List<SLTheoCTTK02Response> response = new ArrayList<SLTheoCTTK02Response>();
				response.add(new SLTheoCTTK02Response());
				String mahq = (params.getMaChicucHQ() == null || params.getMaChicucHQ().trim().isEmpty() ? 
						params.getMaCucHQ() : params.getMaChicucHQ());

				response.get(0).setGroup_name(tbs_HQKTTXNKDAO.getHaiQuanCTByMaChiCuc(mahq).getTen());
				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK02") + "(?,?,?,?,?, ?,?,?)}");
				setParams(statement, params);
				statement.registerOutParameter(6, OracleTypes.CURSOR);
				statement.registerOutParameter(7, OracleTypes.CURSOR);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsSubGroup = (ResultSet) statement.getObject(6);
				double ss;
				int subID;
				while (rsSubGroup.next()) {
					subID = rsSubGroup.getInt("SUB_ID");
					SLTheoCTTK02SubGroupData  group = new SLTheoCTTK02SubGroupData();
					
					group.setSubname(rsSubGroup.getString("SUB_NAME"));
					
					group.setAvg(rsSubGroup.getString("AVG_SUB"));

					ss = rsSubGroup.getDouble("ss_ky_truoc_ky");	
					group.getData_ky().setSs_ky_truoc(
							markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_ky");
					group.getData_ky().setSs_ky_nam_truoc(
							markupMinus2(ss));

					ss = rsSubGroup.getDouble("ss_ky_truoc_thang");
					group.getData_thang().setSs_thang_truoc(
							markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_thang");
					group.getData_thang().setSs_thang_nam_truoc(
							markupMinus2(ss));
					if(params.getMaCucHQ().equals("00")){
						group.getData_thang().setTrend(rsSubGroup.getString("trend_thang"));
						group.getData_thang().setForecast(rsSubGroup.getString("forcast_thang"));
					}
					
					response.get(0).getGroup_data().add(group);
				}
				rsSubGroup.close();
				rsSubGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(7);
				while (rsDataKy.next()) {
					subID = rsDataKy.getInt("SUBGROUPID");
					// so to khai
					if (subID == 1) {
						response.get(0).getGroup_data().get(0).getData_ky().getData()
								.add(new DataKyObj(rsDataKy.getString("ky"), rsDataKy.getString("giatri")));
					}
					// tri gia
					else if (subID == 2){
						response.get(0).getGroup_data().get(1).getData_ky().getData()
								.add(new DataKyObj(rsDataKy.getString("ky"), rsDataKy.getString("giatri")));
					}
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(8);
				while (rsDataThang.next()) {
					subID = rsDataThang.getInt("SUBGROUPID");
					// so to khai
					if (subID == 1) {
						response.get(0).getGroup_data().get(0).getData_thang().getData()
								.add(new DataThangObj(rsDataThang.getString("ky"), rsDataThang.getString("giatri")));
					}
					// tri gia
					else if (subID == 2){
						response.get(0).getGroup_data().get(1).getData_thang().getData()
								.add(new DataThangObj(rsDataThang.getString("ky"), rsDataThang.getString("giatri")));
					}
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
			}
		});
	}

	@Override
	public List<SLTheoCTTK03Response> getSLTheoCTTK03(final SLTheoCTTKRequestParams params) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK03Response>>() {

			@Override
			public List<SLTheoCTTK03Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;
				List<SLTheoCTTK03Response> response = new ArrayList<SLTheoCTTK03Response>();
				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK03") + "(?,?,?,?,?, ?,?,?)}");
				setParams(statement, params);
				statement.registerOutParameter(6, OracleTypes.CURSOR);
				statement.registerOutParameter(7, OracleTypes.CURSOR);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsSubGroup = (ResultSet) statement.getObject(6);
				double ss;
				int subID;
				while (rsSubGroup.next()) {
					subID = rsSubGroup.getInt("SUB_ID");
					SLTheoCTTK03Response subGroup = new SLTheoCTTK03Response();
					
					if(subID == 2){						
						subGroup.setSub_name(rsSubGroup.getString("SUBNAME"));
					}else{
						subGroup.setSub_name(rsSubGroup.getString("SUBNAME"));
					}
					
					subGroup.setAvg(rsSubGroup.getString("AVG_SUB"));

					ss = rsSubGroup.getDouble("ss_ky_truoc_ky");	
					subGroup.getData_ky().setSs_ky_truoc(
							markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_ky");
					subGroup.getData_ky().setSs_ky_nam_truoc(
							markupMinus2(ss));
					
					subGroup.getData_ky().setTrend(" ");
					subGroup.getData_ky().setForecast(" ");

					ss = rsSubGroup.getDouble("ss_ky_truoc_thang");
					subGroup.getData_thang().setSs_thang_truoc(
							markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_thang");
					subGroup.getData_thang().setSs_thang_nam_truoc(
							markupMinus2(ss));
					if(params.getMaCucHQ().equals("00")){
						subGroup.getData_thang().setTrend(rsSubGroup.getString("trend_thang"));
						subGroup.getData_thang().setForecast(rsSubGroup.getString("forcast_thang"));
					}
					
					response.add(subGroup);
				}
				rsSubGroup.close();
				rsSubGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(7);
				
				while (rsDataKy.next()) {
					subID = rsDataKy.getInt("SUBGROUPID");
					// to khai
					if (subID == 1) {
						response.get(0).getData_ky().getData()
								.add(new DataKyObj(rsDataKy.getString("ky"), rsDataKy.getString("giatri")));
					}
					// dong hang
					else if (subID == 2){
						response.get(1).getData_ky().getData()
								.add(new DataKyObj(rsDataKy.getString("ky"), rsDataKy.getString("giatri")));
					}
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(8);
				while (rsDataThang.next()) {
					subID = rsDataThang.getInt("SUBGROUPID");
					// to khai
					if (subID == 1) {
						response.get(0).getData_thang().getData()
								.add(new DataThangObj(rsDataThang.getString("ky"), rsDataThang.getString("giatri")));
					}
					// dong hang
					else if (subID == 2){
						response.get(1).getData_thang().getData()
								.add(new DataThangObj(rsDataThang.getString("ky"), rsDataThang.getString("giatri")));
					}
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
			}
		});

		// return null;
	}

	@Override
	public List<SLTheoCTTK05Response> getSLTheoCTTK05(final SLTheoCTTKRequestParams params, final String chuong,
			final String nhom) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK05Response>>() {

			@Override
			public List<SLTheoCTTK05Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK05") + "(?,?,?,?,?, ?,?, ?,?,?,?)}");
				setParams(statement, params);
				statement.setString(6, chuong);
				statement.setString(7, nhom);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.registerOutParameter(10, OracleTypes.CURSOR);
				statement.registerOutParameter(11, OracleTypes.CURSOR);
				statement.execute();
				int groupID, subID;
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(8);
				List<SLTheoCTTK05Response> response = new ArrayList<SLTheoCTTK05Response>();
				while (rsGroup.next()) {
					SLTheoCTTK05Response group = new SLTheoCTTK05Response();
					group.setGroup_name(rsGroup.getString("GROUP_NAME"));
					group.setGroup_id(rsGroup.getInt("ID"));
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// Sub group dataset
				int groupIndex = 0;
				// System.out.println("Group size: " + response.size());
				ResultSet rsSubGroup = (ResultSet) statement.getObject(9);
				double ss;
				while (rsSubGroup.next()) {
					
					SLTheoCTTK05SubGroupData subGroup = new SLTheoCTTK05SubGroupData();
					SLTheoCTTK05DataKy data_ky = new SLTheoCTTK05DataKy();
					SLTheoCTTK05DataThang data_thang = new SLTheoCTTK05DataThang();
					
					subID = rsSubGroup.getInt("SUB_ID");					
					subGroup.setSub_name(rsSubGroup.getString("SUB_NAME"));
					
					subGroup.setAvg(rsSubGroup.getString("AVG_SUB"));					
					
					ss = rsSubGroup.getDouble("ss_ky_truoc_ky");
					data_ky.setSs_ky_truoc(markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_ky");
					data_ky.setSs_ky_nam_truoc(markupMinus2(ss));					
					
					
					ss = rsSubGroup.getDouble("ss_ky_truoc_thang");
					data_thang.setSs_thang_truoc(markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_thang");
					data_thang.setSs_thang_nam_truoc(markupMinus2(ss));
					
					if(params.getMaCucHQ().equals("00") 
							&& (nhom == null || nhom.isEmpty())
							&& subID == 1){
						data_thang.setTrend(rsSubGroup.getString("trend_thang"));
						data_thang.setForecast(rsSubGroup.getString("forcast_thang"));
					}
					
					subGroup.setData_ky(data_ky);
					subGroup.setData_thang(data_thang);

					// Group update
					List<SLTheoCTTK05SubGroupData> groupData = new ArrayList<SLTheoCTTK05SubGroupData>();
					groupData.add(subGroup);
					response.get(groupIndex).setGroup_data(groupData);
					groupIndex++;// Arraylist 0-base index
				}
				rsSubGroup.close();
				rsSubGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(10);
				
				while (rsDataKy.next()) {
					groupID = rsDataKy.getInt("GROUPID");
					subID = rsDataKy.getInt("SUBGROUPID");

					response.get(groupID - 1).getGroup_data().get(0).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI")));
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(11);
				while (rsDataThang.next()) {
					groupID = rsDataThang.getInt("GROUPID");
					subID = rsDataThang.getInt("SUBGROUPID");

					response.get(groupID - 1).getGroup_data().get(0).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("KY"), rsDataThang.getString("GIATRI")));
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
			}
		});
	}

	@Override
	public List<SLTheoCTTK06Response> getSLTheoCTTK06(final SLTheoCTTKRequestParams params, final String phan) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK06Response>>() {
			@Override
			public List<SLTheoCTTK06Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;
				List<SLTheoCTTK06Response> response = new ArrayList<SLTheoCTTK06Response>();
				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK06") + "(?,?,?,?,?, ?, ?,?,?)}");
				setParams(statement, params);
				statement.setString(6, phan);
				statement.registerOutParameter(7, OracleTypes.CURSOR);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(7);
				double ss;
				while (rsGroup.next()) {

					SLTheoCTTK06Response group = new SLTheoCTTK06Response();
					group.setSub_name(rsGroup.getString("SUBNAME"));
					group.setAvg(rsGroup.getString("AVG_SUB"));

					ss = rsGroup.getDouble("ss_ky_truoc_ky");
					group.getData_ky().setSs_ky_truoc(
							markupMinus2(ss));
					
					ss = rsGroup.getDouble("ss_ky_nam_truoc_ky");
					group.getData_ky().setSs_ky_nam_truoc(
							markupMinus2(ss));

					ss = rsGroup.getDouble("ss_ky_truoc_thang");
					group.getData_thang().setSs_thang_truoc(
							markupMinus2(ss));
					
					ss = rsGroup.getDouble("ss_ky_nam_truoc_thang");
					group.getData_thang().setSs_thang_nam_truoc(
							markupMinus2(ss));					
					
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(8);
				int subID;
				while (rsDataKy.next()) {
					response.get(0).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("ky"), rsDataKy.getString("giatri")));
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(9);
				while (rsDataThang.next()) {

					response.get(0).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("ky"), rsDataThang.getString("giatri")));
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
			}
		});
	}

	@Override
	public List<SLTheoCTTK08Response> getSLTheoCTTK08(final SLTheoCTTKRequestParams params, final String khoi,
			final String nuoc) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK08Response>>() {

			@Override
			public List<SLTheoCTTK08Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK08") + "(?,?,?,?,?, ?,?, ?,?,?,?)}");
				setParams(statement, params);
				statement.setString(6, khoi);
				statement.setString(7, nuoc);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.registerOutParameter(10, OracleTypes.CURSOR);
				statement.registerOutParameter(11, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(8);
				List<SLTheoCTTK08Response> response = new ArrayList<SLTheoCTTK08Response>();
				while (rsGroup.next()) {
					SLTheoCTTK08Response group = new SLTheoCTTK08Response();
					group.setGroup_name(rsGroup.getString("GROUP_NAME"));
					group.setGroup_id(rsGroup.getInt("ID"));
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// Sub group dataset
				int groupIndex = 0;
				// System.out.println("Group size: " + response.size());
				ResultSet rsSubGroup = (ResultSet) statement.getObject(9);
				double ss;
				while (rsSubGroup.next()) {

					SLTheoCTTK08SubGroupData subGroup = new SLTheoCTTK08SubGroupData();

					subGroup.setSub_name(rsSubGroup.getString("SUB_NAME"));
					subGroup.setAvg(rsSubGroup.getString("AVG_SUB"));
					SLTheoCTTK08DataKy data_ky = new SLTheoCTTK08DataKy();
					
					ss = rsSubGroup.getDouble("ss_ky_truoc_ky");
					data_ky.setSs_ky_truoc(
							markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_ky");
					data_ky.setSs_ky_nam_truoc(
							markupMinus2(ss));
										
					SLTheoCTTK08DataThang data_thang = new SLTheoCTTK08DataThang();
					
					ss = rsSubGroup.getDouble("ss_ky_truoc_thang");
					data_thang.setSs_thang_truoc(
							markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_thang");
					data_thang.setSs_thang_nam_truoc(
							markupMinus2(ss));
					
					if(params.getMaCucHQ().equals("00")){
						data_thang.setTrend(rsSubGroup.getString("trend_thang"));
						data_thang.setForecast(rsSubGroup.getString("forcast_thang"));
					}					
					
					subGroup.setData_ky(data_ky);
					subGroup.setData_thang(data_thang);

					// Group update
					List<SLTheoCTTK08SubGroupData> groupData = new ArrayList<SLTheoCTTK08SubGroupData>();
					groupData.add(subGroup);
					response.get(groupIndex).setGroup_data(groupData);
					groupIndex++;// Arraylist 0-base index
				}
				rsSubGroup.close();
				rsSubGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(10);
				int groupID, subID;
				while (rsDataKy.next()) {
					groupID = rsDataKy.getInt("GROUPID");
					subID = rsDataKy.getInt("SUBGROUPID");

					response.get(groupID - 1).getGroup_data().get(0).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI")));
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(11);
				while (rsDataThang.next()) {
					groupID = rsDataThang.getInt("GROUPID");
					subID = rsDataThang.getInt("SUBGROUPID");

					response.get(groupID - 1).getGroup_data().get(0).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("KY"), rsDataThang.getString("GIATRI")));
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
				// return null;
			}
		});
	}

	@Override
	public List<SLTheoCTTK10Response> getSLTheoCTTK10(final SLTheoCTTKRequestParams params, 
			final String mathang) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK10Response>>() {

			@Override
			public List<SLTheoCTTK10Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;
				List<SLTheoCTTK10Response> response = new ArrayList<SLTheoCTTK10Response>();
				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK10") + "(?,?,?,?,?, ?, ?,?,?)}");
				setParams(statement, params);
				statement.setString(6, mathang);
				statement.registerOutParameter(7, OracleTypes.CURSOR);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.execute();
				
				boolean isDVT_USD = isTenDVT_USD(mathang, null, params.getNhx()) == 1? true : false;
				int subID;
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(7);
				double ss;
				while (rsGroup.next()) {
					subID = rsGroup.getInt("SUB_ID");
					SLTheoCTTK10Response group = new SLTheoCTTK10Response();
					
					if(subID == 2){
						group.setSubname(rsGroup.getString("SUBNAME"));
					}else{
						group.setSubname(rsGroup.getString("SUBNAME"));
					}
					
					
					
					//Neu Sub la TriGia hoac DVT khong phai USD
					if(!isDVT_USD || subID == 2){
						ss = rsGroup.getDouble("ss_ky_truoc_ky");
						group.getData_ky().setSs_ky_truoc(markupMinus2(ss));
						
						ss = rsGroup.getDouble("ss_ky_nam_truoc_ky");
						group.getData_ky().setSs_ky_nam_truoc(markupMinus2(ss));
						
						ss = rsGroup.getDouble("ss_ky_truoc_thang");
						group.getData_thang().setSs_thang_truoc(markupMinus2(ss));
						
						ss = rsGroup.getDouble("ss_ky_nam_truoc_thang");
						group.getData_thang().setSs_thang_nam_truoc(markupMinus2(ss));
						
						group.setAvg(rsGroup.getString("AVG_SUB"));
					}
					//Neu DVT la USD va Sub la khong phai TriGia
					else {
						
					}
					//Neu DV HQ la TongCuc va Sub la TriGia
					if(params.getMaCucHQ() != null && params.getMaCucHQ().equals("00") && (subID == 2 || (subID == 1 && !isDVT_USD))){
						group.getData_thang().setTrend(rsGroup.getString("trend_thang"));
						group.getData_thang().setForecast(rsGroup.getString("forcast_thang"));
					} 
					
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(8);
				int vTest;
				while (rsDataKy.next()) {
					subID = rsDataKy.getInt("SUBGROUPID");
					
					
					DataKyObj dataKy = new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI"));
					//Luong or DonGia
					if (isDVT_USD && (subID == 1 || subID == 3)){
						dataKy.setGia_tri(" ");
						
					}
					response.get(subID-1).getData_ky().getData()
						.add(dataKy);					
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(9);
				while (rsDataThang.next()) {
					subID = rsDataThang.getInt("SUBGROUPID");
					
					DataThangObj dataKy = new DataThangObj(rsDataThang.getString("KY"), rsDataThang.getString("GIATRI"));
					//Luong or DonGia
					if (isDVT_USD && (subID == 1 || subID == 3)){
						dataKy.setGia_tri(" ");						
					}
					response.get(subID-1).getData_thang().getData()
						.add(dataKy);					
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
			}
		});
	}

	@Override
	public List<SLTheoCTTK11Response> getSLTheoCTTK11(final SLTheoCTTKRequestParams params, final String tinh) {
		// TODO Auto-generated method stub

		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK11Response>>() {
			@Override
			public List<SLTheoCTTK11Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;
				List<SLTheoCTTK11Response> response = new ArrayList<SLTheoCTTK11Response>();
				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK11") + "(?,?,?,?,?, ?, ?,?,?)}");
				setParams(statement, params);
				statement.setString(6, tinh);
				statement.registerOutParameter(7, OracleTypes.CURSOR);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(7);
				double ss;
				while (rsGroup.next()) {

					SLTheoCTTK11Response group = new SLTheoCTTK11Response();
					group.setSub_name(rsGroup.getString("SUBNAME"));
					group.setAvg(rsGroup.getString("AVG_SUB"));

					ss = rsGroup.getDouble("ss_ky_truoc_ky");
					group.getData_ky().setSs_ky_truoc(
							markupMinus2(ss));
					
					ss = rsGroup.getDouble("ss_ky_nam_truoc_ky");
					group.getData_ky().setSs_ky_nam_truoc(
							markupMinus2(ss));

					ss = rsGroup.getDouble("ss_ky_truoc_thang");
					group.getData_thang().setSs_thang_truoc(
							markupMinus2(ss));
					
					ss = rsGroup.getDouble("ss_ky_nam_truoc_thang");
					group.getData_thang().setSs_thang_nam_truoc(
							markupMinus2(ss));
					
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(8);
				int subID;
				while (rsDataKy.next()) {
					response.get(0).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("ky"), rsDataKy.getString("giatri")));
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(9);
				while (rsDataThang.next()) {

					response.get(0).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("ky"), rsDataThang.getString("giatri")));
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
			}
		});
	}

	@Override
	public List<SLTheoCTTK12Response> getSLTheoCTTK12(final SLTheoCTTKRequestParams params) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK12Response>>() {

			@Override
			public List<SLTheoCTTK12Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK12") + "(?,?,?,?,?, ?,?,?,?)}");
				setParams(statement, params);
				statement.registerOutParameter(6, OracleTypes.CURSOR);
				statement.registerOutParameter(7, OracleTypes.CURSOR);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(6);
				List<SLTheoCTTK12Response> response = new ArrayList<SLTheoCTTK12Response>();
				while (rsGroup.next()) {
					SLTheoCTTK12Response group = new SLTheoCTTK12Response();
					group.setGroup_name(rsGroup.getString("GROUP_NAME"));
					group.setGroup_id(rsGroup.getInt("ID"));
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// Sub group dataset
				int groupIndex = 0;
				// System.out.println("Group size: " + response.size());
				ResultSet rsSubGroup = (ResultSet) statement.getObject(7);
				double ss;
				while (rsSubGroup.next()) {

					SLTheoCTTK12SubGroupData subGroup = new SLTheoCTTK12SubGroupData();

					subGroup.setSub_name(rsSubGroup.getString("SUBNAME"));
					subGroup.setAvg(rsSubGroup.getString("AVG_SUB"));
					SLTheoCTTK12DataKy data_ky = new SLTheoCTTK12DataKy();
					
					ss = rsSubGroup.getDouble("ss_ky_truoc_ky");	
					data_ky.setSs_ky_truoc(
							markupMinus2(ss));
					
					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_ky");
					data_ky.setSs_ky_nam_truoc(
							markupMinus2(ss));
					
					SLTheoCTTK12DataThang data_thang = new SLTheoCTTK12DataThang();

					ss = rsSubGroup.getDouble("ss_ky_truoc_thang");
					data_thang.setSs_thang_truoc(
							markupMinus2(ss));

					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_thang");
					data_thang.setSs_thang_nam_truoc(
							markupMinus2(ss));
					
					subGroup.setData_ky(data_ky);
					subGroup.setData_thang(data_thang);
					
					// Group update
					List<SLTheoCTTK12SubGroupData> groupData = new ArrayList<SLTheoCTTK12SubGroupData>();
					groupData.add(subGroup);
					response.get(groupIndex).setGroup_data(groupData);
					groupIndex++;// Arraylist 0-base index
				}
				rsSubGroup.close();
				rsSubGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(8);
				int groupID, subID;
				while (rsDataKy.next()) {
					//groupID = rsDataKy.getInt("GROUPID");
					//subID = rsDataKy.getInt("SUBGROUPID");

					response.get(0).getGroup_data().get(0).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI")));
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(9);
				while (rsDataThang.next()) {
					//groupID = rsDataThang.getInt("GROUPID");
					//subID = rsDataThang.getInt("SUBGROUPID");

					response.get(0).getGroup_data().get(0).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("KY"), rsDataThang.getString("GIATRI")));
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
				// return null;
			}
		});
	}

	@Override
	public List<SLTheoCTTK13Response> getSLTheoCTTK13(final SLTheoCTTKRequestParams params,
			final String group_transport, final String transport) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK13Response>>() {

			@Override
			public List<SLTheoCTTK13Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK13") + "(?,?,?,?,?, ?,?, ?,?,?,?)}");
				setParams(statement, params);
				statement.setString(6, group_transport);
				statement.setString(7, transport);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.registerOutParameter(10, OracleTypes.CURSOR);
				statement.registerOutParameter(11, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(8);
				List<SLTheoCTTK13Response> response = new ArrayList<SLTheoCTTK13Response>();
				while (rsGroup.next()) {
					SLTheoCTTK13Response group = new SLTheoCTTK13Response();
					group.setGroup_name(rsGroup.getString("GROUP_NAME"));
					group.setGroup_id(rsGroup.getInt("ID"));
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// Sub group dataset
				int groupIndex = 0;
				// System.out.println("Group size: " + response.size());
				ResultSet rsSubGroup = (ResultSet) statement.getObject(9);
				double ss;
				while (rsSubGroup.next()) {

					SLTheoCTTK13SubGroupData subGroup = new SLTheoCTTK13SubGroupData();

					subGroup.setSub_name(rsSubGroup.getString("SUBNAME"));
					subGroup.setAvg(rsSubGroup.getString("AVG_SUB"));
					SLTheoCTTK13DataKy data_ky = new SLTheoCTTK13DataKy();
					
					ss = rsSubGroup.getDouble("ss_ky_truoc_ky");
					data_ky.setSs_ky_truoc(
							markupMinus2(ss));

					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_ky");
					data_ky.setSs_ky_nam_truoc(
							markupMinus2(ss));

					SLTheoCTTK13DataThang data_thang = new SLTheoCTTK13DataThang();

					ss = rsSubGroup.getDouble("ss_ky_truoc_thang");
					data_thang.setSs_thang_truoc(
							markupMinus2(ss));

					ss = rsSubGroup.getDouble("ss_ky_nam_truoc_thang");
					data_thang.setSs_thang_nam_truoc(
							markupMinus2(ss));

					subGroup.setData_ky(data_ky);
					subGroup.setData_thang(data_thang);

					// Group update
					List<SLTheoCTTK13SubGroupData> groupData = new ArrayList<SLTheoCTTK13SubGroupData>();
					groupData.add(subGroup);
					response.get(groupIndex).setGroup_data(groupData);
					groupIndex++;// Arraylist 0-base index
				}
				rsSubGroup.close();
				rsSubGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(10);
				int groupID, subID;
				while (rsDataKy.next()) {
					groupID = rsDataKy.getInt("GROUPID");
					subID = rsDataKy.getInt("SUBGROUPID");

					response.get(groupID - 1).getGroup_data().get(0).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI")));
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(11);
				while (rsDataThang.next()) {
					groupID = rsDataThang.getInt("GROUPID");
					subID = rsDataThang.getInt("SUBGROUPID");

					response.get(groupID - 1).getGroup_data().get(0).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("KY"), rsDataThang.getString("GIATRI")));
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
				// return null;
			}
		});
	}

	@Override
	public List<SLTheoCTTK15Response> getSLTheoCTTK15(final SLTheoCTTKRequestParams params, final String cuakhau,
			final String phamvi, final String loaihinh) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK15Response>>() {
			@Override
			public List<SLTheoCTTK15Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;
				List<SLTheoCTTK15Response> response = new ArrayList<SLTheoCTTK15Response>();
				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK15") + "(?,?,?,?,?, ?,?,?, ?,?,?)}");
				setParams(statement, params);
				statement.setString(6, cuakhau);
				statement.setString(7, phamvi);
				statement.setString(8, loaihinh);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.registerOutParameter(10, OracleTypes.CURSOR);
				statement.registerOutParameter(11, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(9);
				double ss;
				while (rsGroup.next()) {

					SLTheoCTTK15Response group = new SLTheoCTTK15Response();
					group.setSub_name(rsGroup.getString("SUBNAME"));
					group.setAvg(rsGroup.getString("AVG_SUB"));

					ss = rsGroup.getDouble("ss_ky_truoc_ky");
					group.getData_ky().setSs_ky_truoc(
							markupMinus2(ss));
					
					ss = rsGroup.getDouble("ss_ky_nam_truoc_ky");
					group.getData_ky().setSs_ky_nam_truoc(
							markupMinus2(ss));

					ss = rsGroup.getDouble("ss_ky_truoc_thang");
					group.getData_thang().setSs_thang_truoc(
							markupMinus2(ss));
					
					ss = rsGroup.getDouble("ss_ky_nam_truoc_thang");
					group.getData_thang().setSs_thang_nam_truoc(
							markupMinus2(ss));
					
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(10);
				int subID;
				while (rsDataKy.next()) {
					response.get(0).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("ky"), rsDataKy.getString("giatri")));
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(11);
				while (rsDataThang.next()) {

					response.get(0).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("ky"), rsDataThang.getString("giatri")));
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
			}
		});
	}

	@Override
	public List<SLTheoCTTK04Response> getSLTheoCTTK04(final SLTheoCTTKRequestParams params, final String mathang) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK04Response>>() {

			@Override
			public List<SLTheoCTTK04Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK04") + "(?,?,?,?,?, ?, ?,?,?,?)}");
				setParams(statement, params);
				statement.setString(6, mathang);
				statement.registerOutParameter(7, OracleTypes.CURSOR);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.registerOutParameter(10, OracleTypes.CURSOR);
				statement.execute();
				boolean isDVT_USD = isTenDVT_USD(mathang, null, params.getNhx()) == 1? true : false;
				int subID;
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(7);
				List<SLTheoCTTK04Response> response = new ArrayList<SLTheoCTTK04Response>();				
				while (rsGroup.next()) {
					SLTheoCTTK04Response group = new SLTheoCTTK04Response();
					group.setGroup_name(rsGroup.getString("GROUP_NAME"));
					group.setGroup_id(rsGroup.getInt("ID"));
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// Sub group dataset
				// int groupIndex = 0;
				// System.out.println("Group size: " + response.size());
				ResultSet rsSubGroup = (ResultSet) statement.getObject(8);
				double ss;
				while (rsSubGroup.next()) {
					subID = rsSubGroup.getInt("SUB_ID");
					SLTheoCTTK04SubGroupData subGroup = new SLTheoCTTK04SubGroupData();
					SLTheoCTTK04DataKy data_ky = new SLTheoCTTK04DataKy();
					SLTheoCTTK04DataThang data_thang = new SLTheoCTTK04DataThang();
					
					subGroup.setSub_name(rsSubGroup.getString("SUBNAME"));
					
					//Neu Sub la TriGia hoac DVT khong phai USD
					if(!isDVT_USD || subID == 3){
						subGroup.setAvg(rsSubGroup.getString("AVG_SUB"));
						ss = rsSubGroup.getDouble("ss_ky_truoc_ky");					
						data_ky.setSs_ky_truoc(markupMinus2(ss));
						
						ss = rsSubGroup.getDouble("ss_ky_nam_truoc_ky");
						data_ky.setSs_ky_nam_truoc(markupMinus2(ss));
						ss = rsSubGroup.getDouble("ss_ky_truoc_thang");
						data_thang.setSs_thang_truoc(markupMinus2(ss));
								
						ss = rsSubGroup.getDouble("ss_ky_nam_truoc_thang");
						data_thang.setSs_thang_nam_truoc(markupMinus2(ss));
					}
					
					//Neu Sub la Luong hoac Trigia, DVHQ la TC thi tinh Trend
					if(params.getMaCucHQ() != null && params.getMaCucHQ().equals("00") && (subID == 3 || (subID == 2 && !isDVT_USD))){
						data_thang.setTrend(rsSubGroup.getString("trend_thang"));
						data_thang.setForecast(rsSubGroup.getString("forcast_thang"));
					} else {
						data_thang.setTrend(" ");
						data_thang.setForecast(" ");
					}
					
					
					subGroup.setData_ky(data_ky);
					subGroup.setData_thang(data_thang);

					response.get(0).getGroup_data().add(subGroup);
				}
				rsSubGroup.close();
				rsSubGroup = null;

				// DataKy dataset				
				ResultSet rsDataKy = (ResultSet) statement.getObject(9);
				
				String tenDVT = getTenDVT(mathang, null, params.getNhx());
				while (rsDataKy.next()) {
					// groupID = rsDataKy.getInt("GROUPID");
					subID = rsDataKy.getInt("SUBGROUPID");
					//DVT
					if(subID == 1){
						response.get(0).getGroup_data().get(subID - 1).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("KY"), tenDVT));
					} 
					// LUONG
					else if (subID == 2){
						//Kiem tra don vi tinh
						if(!isDVT_USD){
							response.get(0).getGroup_data().get(subID - 1).getData_ky().getData()
								.add(new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI")));
						}
						else{
							response.get(0).getGroup_data().get(subID - 1).getData_ky().getData()
								.add(new DataKyObj(rsDataKy.getString("KY"), " "));
						}
					}
					// Tri gia
					else if (subID == 3){
						response.get(0).getGroup_data().get(subID - 1).getData_ky().getData()
							.add(new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI")));
					}
					//LUONG, DON GIA
					else if (subID == 4){
						//Kiem tra don vi tinh
						if(!isDVT_USD){
							response.get(0).getGroup_data().get(subID - 1).getData_ky().getData()
								.add(new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI")));
						}
						else{
							response.get(0).getGroup_data().get(subID - 1).getData_ky().getData()
								.add(new DataKyObj(rsDataKy.getString("KY"), " "));
						}						
					}
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(10);
				while (rsDataThang.next()) {
					// groupID = rsDataThang.getInt("GROUPID");
					subID = rsDataThang.getInt("SUBGROUPID");
					
					//DVT
					if(subID == 1){
						response.get(0).getGroup_data().get(subID - 1).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("KY"), " "));
					} 
					// Tri gia ky
					else if (subID == 3){
						response.get(0).getGroup_data().get(subID - 1).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("KY"), rsDataThang.getString("GIATRI")));
					}
					//LUONG, DON GIA
					else {
						//Kiem tra don vi tinh
						if(!isDVT_USD){
							response.get(0).getGroup_data().get(subID - 1).getData_thang().getData()
								.add(new DataThangObj(rsDataThang.getString("KY"), rsDataThang.getString("GIATRI")));
						}else {
							response.get(0).getGroup_data().get(subID - 1).getData_thang().getData()
							.add(new DataThangObj(rsDataThang.getString("KY"), " "));
						}
						
					}
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
				// return null;
			}
		});
	}

	@Override
	public List<SLTheoCTTK09Response> getSLTheoCTTK09(final SLTheoCTTKRequestParams params, final String thitruong,
			final String mathang) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK09Response>>() {

			@Override
			public List<SLTheoCTTK09Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn
						.prepareCall("{call " + Utils.readProperties("GetSLTheoCTTK09") + "(?,?,?,?,?, ?,?, ?,?,?,?)}");
				setParams(statement, params);
				statement.setString(6, thitruong);
				statement.setString(7, mathang);
				statement.registerOutParameter(8, OracleTypes.CURSOR);
				statement.registerOutParameter(9, OracleTypes.CURSOR);
				statement.registerOutParameter(10, OracleTypes.CURSOR);
				statement.registerOutParameter(11, OracleTypes.CURSOR);
				statement.execute();
				
				boolean isDVT_USD = isTenDVT_USD( null, mathang, params.getNhx()) == 1? true : false;
				int subID;
				
				// Group dataset
				ResultSet rsGroup = (ResultSet) statement.getObject(8);
				List<SLTheoCTTK09Response> response = new ArrayList<SLTheoCTTK09Response>();
				while (rsGroup.next()) {
					SLTheoCTTK09Response group = new SLTheoCTTK09Response();
					group.setGroup_name(rsGroup.getString("GROUP_NAME"));
					group.setGroup_id(rsGroup.getInt("ID"));
					response.add(group);
				}
				rsGroup.close();
				rsGroup = null;

				// Sub group dataset
				int groupIndex = 0;
				// System.out.println("Group size: " + response.size());
				ResultSet rsSubGroup = (ResultSet) statement.getObject(9);
				double ss;
				while (rsSubGroup.next()) {
					subID = rsSubGroup.getInt("SUB_ID");
					SLTheoCTTK09SubGroupData subGroup = new SLTheoCTTK09SubGroupData();
					SLTheoCTTK09DataKy data_ky = new SLTheoCTTK09DataKy();
					SLTheoCTTK09DataThang data_thang = new SLTheoCTTK09DataThang();
					
					//Neu Sub la TriGia hoac DVT khong phai USD
					if(!isDVT_USD || subID == 2){
						subGroup.setAvg(rsSubGroup.getString("AVG_SUB"));
						ss = rsSubGroup.getDouble("ss_ky_truoc_ky");					
						data_ky.setSs_ky_truoc(markupMinus2(ss));
						
						ss = rsSubGroup.getDouble("ss_ky_nam_truoc_ky");
						data_ky.setSs_ky_nam_truoc(markupMinus2(ss));
						ss = rsSubGroup.getDouble("ss_ky_truoc_thang");
						data_thang.setSs_thang_truoc(markupMinus2(ss));
								
						ss = rsSubGroup.getDouble("ss_ky_nam_truoc_thang");
						data_thang.setSs_thang_nam_truoc(markupMinus2(ss));
					}
					//Neu DVT la USD va Sub la khong phai TriGia
					else {
						
					}
					
					if(params.getMaCucHQ() != null && params.getMaCucHQ().equals("00") && (subID == 2 || (subID == 1 && !isDVT_USD))){
						data_thang.setTrend(rsSubGroup.getString("trend_thang"));
						data_thang.setForecast(rsSubGroup.getString("forcast_thang"));
					} else {
						data_thang.setTrend(" ");
						data_thang.setForecast(" ");
					}
					
					subGroup.setData_ky(data_ky);
					subGroup.setData_thang(data_thang);
					subGroup.setSub_name(rsSubGroup.getString("SUBNAME"));

					response.get(0).getGroup_data().add(subGroup);
				}
				rsSubGroup.close();
				rsSubGroup = null;

				// DataKy dataset
				ResultSet rsDataKy = (ResultSet) statement.getObject(10);
				//int groupID;
				while (rsDataKy.next()) {
					//groupID = rsDataKy.getInt("GROUPID");
					subID = rsDataKy.getInt("SUBGROUPID");
					
					DataKyObj dataKy = new DataKyObj(rsDataKy.getString("KY"), rsDataKy.getString("GIATRI"));
					//Luong or DonGia
					if (isDVT_USD && (subID == 1 || subID == 3)){
						dataKy.setGia_tri(" ");
						
					}
					response.get(0).getGroup_data().get(subID-1).getData_ky().getData()
						.add(dataKy);
				}
				rsDataKy.close();
				rsDataKy = null;

				// DataThang dataset
				ResultSet rsDataThang = (ResultSet) statement.getObject(11);
				while (rsDataThang.next()) {
					//groupID = rsDataThang.getInt("GROUPID");
					subID = rsDataThang.getInt("SUBGROUPID");
					
					DataThangObj dataKy = new DataThangObj(rsDataThang.getString("KY"), rsDataThang.getString("GIATRI"));
					//Luong or DonGia
					if (isDVT_USD && (subID == 1 || subID == 3)){
						dataKy.setGia_tri(" ");
						
					}
					response.get(0).getGroup_data().get(subID-1).getData_thang().getData()
						.add(dataKy);					
				}
				rsDataThang.close();
				rsDataThang = null;

				return response;
				// return null;
			}
		});
	}

	@Override
	public List<SLTheoCTTK07Response> getSLTheoCTTK07(final SLTheoCTTKRequestParams params, final String thoigian,
			final String mathang, final String chiso, final String loaichiso) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK07Response>>() {

			@Override
			public List<SLTheoCTTK07Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;
				List<SLTheoCTTK07Response> response = new ArrayList<SLTheoCTTK07Response>();
				statement = conn.prepareCall(
						"{call " + Utils.readProperties("GetSLTheoCTTK07") + "(?,?,?,?,?, ?,?,?,?, ?,?)}");
				setParams(statement, params);
				statement.setString(6, thoigian);
				statement.setString(7, mathang);
				statement.setString(8, chiso);
				statement.setString(9, loaichiso);

				statement.registerOutParameter(10, OracleTypes.CURSOR);
				statement.registerOutParameter(11, OracleTypes.CURSOR);
				statement.execute();

				// DataKy dataset
//				int index = 0;
				if (thoigian.equals("THA") || thoigian.equals("QUY")) {
					ResultSet rsData = (ResultSet) statement.getObject(10);
					while (rsData.next()) {
						//response.add(new SLTheoCTTK07Response());
					Double ss_kygoc = rsData.getDouble("SS_KYGOC");
					Double ss_cungky_namtruoc = rsData.getDouble("SS_CUNGKY_NAMTRUOC");
					Double ss_kycuoi_namtruoc = rsData.getDouble("SS_KYCUOI_NAMTRUOC");
					Double ss_kytruoc = rsData.getDouble("SS_KYTRUOC");
					Double ss_luyke = rsData.getDouble("SS_LUYKE");
					response.add(new SLTheoCTTK07Response(
							rsData.getString("TEN_MAT_HANG"),
							ss_kygoc != null? ss_kygoc.toString() : " ",
							ss_cungky_namtruoc != null? ss_cungky_namtruoc.toString() : " ",
							ss_kycuoi_namtruoc != null? ss_kycuoi_namtruoc.toString() : " ",
							ss_kytruoc != null? ss_kytruoc.toString() : " ",
							ss_luyke != null? ss_luyke.toString() : " "
							));
					}
					rsData.close();
					rsData = null;
				} else if (thoigian.equals("NAM")) {
					ResultSet rsDataNAM = (ResultSet) statement.getObject(11);
					while (rsDataNAM.next()) {
						
						response.add(new SLTheoCTTK07Response(rsDataNAM.getString("TEN_MAT_HANG"),
								rsDataNAM.getBigDecimal("SS_KYGOC") + " ",
								" ",								
								" ",
								rsDataNAM.getBigDecimal("SS_CUNGKY_NAMTRUOC") +" ",
								" "));
					}
					rsDataNAM.close();
					rsDataNAM = null;
				} else {
					System.out.println("Invalid argument format");
				}

				return response;
			}
		});
	}

	@Override
	public List<SLTheoCTTK14Response> getSLTheoCTTK14(final SLTheoCTTKRequestParams params, final String loai_ngay,
			final String thoi_gian, final String tu_thoigian, final String tu_nam, final String den_thoigian,
			final String den_nam) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<List<SLTheoCTTK14Response>>() {

			@Override
			public List<SLTheoCTTK14Response> execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn.prepareCall(
						"{call " + Utils.readProperties("GetSLTheoCTTK14") + "(?,?,?,?,?, ?,?, ?,?,?,?, ?)}");
				setParams(statement, params);
				statement.setString(6, loai_ngay);
				statement.setString(7, thoi_gian);
				statement.setString(8, tu_thoigian);
				statement.setString(9, tu_nam);
				statement.setString(10, den_thoigian);
				statement.setString(11, den_nam);

				statement.registerOutParameter(12, OracleTypes.CURSOR);
				statement.execute();
				// Group dataset
				ResultSet rs = (ResultSet) statement.getObject(12);
				
				String subnameSLTK=Utils.getMessageProperties("BCPT.SubnameSLTK");
				String subnameTG=Utils.getMessageProperties("BCPT.SubnameTG");
				String subnameDVT1000USD = Utils.getMessageProperties("BCPT.subnameDVT1000USD");
				String appendXNK = " XK";
				if(params.getNhx().equals("N"))
					appendXNK = " NK";
				else if(params.getNhx().equals("X"))
					appendXNK = " XK";
				else 
					appendXNK = " XNK";
				StringBuilder subnameTMP = new StringBuilder();
				
				List<SLTheoCTTK14Response> response = new ArrayList<SLTheoCTTK14Response>();
				String currentGroupID="MA_HQ";
				String currentGroupName = "TEN_HQ";
				String currentSubType="SL_OR_TG";
				String tmpGroupID;
				//String tmpGroupName;
				String tmpSubType;
				SLTheoCTTK14Response group = null;
				SLTheoCTTK14SubGroupData subGroup = null;
				while (rs.next()) {			
					
					tmpGroupID =  rs.getString("MA_HQ");
					//tmpGroupName = rs.getString("TEN_HQ");
					tmpSubType = rs.getString("TYPE");
					
					//New Group 
					if(!tmpGroupID.equals(currentGroupID)){
						group = new SLTheoCTTK14Response();
						//set group to new one
						currentGroupID = tmpGroupID;
						
						//retrieve group name
						group.setGroup_name(rs.getString("TEN_HQ"));
						group.setGroup_id(currentGroupID);						
						
						//add new group to response list
						response.add(group);
					}
					//Same group
					else{
						
					}
					
					//TYPE change from SL to TG and vice 
					if(!tmpSubType.equals(currentSubType)){
						//set type to new one
						currentSubType = tmpSubType;
						
						//Make up and set subname
						subnameTMP = new StringBuilder();
						if(currentSubType.equals("SL")){							
							subnameTMP.append(subnameSLTK)
								.append(appendXNK);
						} else if(currentSubType.equals("TG")){
							subnameTMP.append(subnameTG)
								.append(appendXNK)
								.append(" ")
								.append(subnameDVT1000USD);
						}
						
						subGroup = new SLTheoCTTK14SubGroupData();
						//retrieve AVG of subgroup
						subGroup.setAvg(rs.getString("AVG_GT"));
						
						
						subGroup.setSub_name(subnameTMP.toString());
						//subGroup.setSub_name(rs.getString(""));
						group.getGroup_data().add(subGroup);
					}
					
					//Add record HEADER, GIA_TRI
					subGroup.getData_ky().getData().add(new DataKyObj(rs.getString("HEADER"), rs.getString("GIA_TRI")));					
				}
				rs.close();
				rs = null;
				
				return response;
			}
		});
	}

	private String markupMinus(String input){
		if(input != null && input.charAt(0) == '-'){
			//input = "(-)" + input.substring(1);
			input = "(" + input + ")";
		}
		
		return input;
	}
	
	private String markupMinus2(double input){
		
		String output = " " + input;
		if(input < 0){
			//input = "(-)" + input.substring(1);
			output = "(" + input + "%)";
		} else {
			output = input + "%";
		}
		
		return output;
	}
	
	private int isTenDVT_USD(final String  ma_sapxep, final String ma_nhom, final String nhx){
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<Integer>() {

			@Override
			public Integer execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn.prepareCall(
						"{? = call " + Utils.readProperties("FN_IS_TEN_DVT_USD") + "(?,?,?)}");
				statement.registerOutParameter(1, OracleTypes.INTEGER);
				statement.setString(2, ma_sapxep);
				statement.setString(3, ma_nhom);
				statement.setString(4, nhx);
				statement.execute();
				return statement.getInt(1);
			}
		});
	}
	
	private String getTenDVT(final String  ma_sapxep, final String ma_nhom, final String nhx){
		return sessionFactory.getCurrentSession().doReturningWork(new ReturningWork<String>() {

			@Override
			public String execute(Connection conn) throws SQLException {
				CallableStatement statement = null;

				statement = conn.prepareCall(
						"{? = call " + Utils.readProperties("FN_GET_TEN_DVT") + "(?,?,?)}");
				statement.registerOutParameter(1, OracleTypes.VARCHAR);
				statement.setString(2, ma_sapxep);
				statement.setString(3, ma_nhom);
				statement.setString(4, nhx);
				statement.execute();
				return statement.getString(1);
			}
		});
	}
	
//	private String makeupSubnameTrigia(String subname){
//		return subname + " (DVT: 1000 USD)";
//	}
}
