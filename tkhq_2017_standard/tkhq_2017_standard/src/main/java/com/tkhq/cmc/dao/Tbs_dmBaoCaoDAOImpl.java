package com.tkhq.cmc.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.criterion.CriteriaQuery;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.tkhq.cmc.model.Tbs_dmbaocao;
import com.tkhq.cmc.utils.Utils;

@Repository
public class Tbs_dmBaoCaoDAOImpl extends BaseDAO<String, Tbs_dmbaocao> implements Tbs_dmBaoCaoDAO {

	public List<Tbs_dmbaocao> getDmBCByLoaiBC(Integer ma_loaibc) {
		
		Criteria cr = this.getSession().createCriteria(Tbs_dmbaocao.class);	
		if(ma_loaibc==0){
			cr.add(Restrictions.in("ma_loaibc",  new Integer[]{2,3,4,5,7}));
		}else{
			cr.add(Restrictions.eq("ma_loaibc", ma_loaibc));
		}
		
		cr.addOrder(new Order("ma", true) {
            @Override
            public String toSqlString(Criteria criteria, CriteriaQuery criteriaQuery) throws HibernateException {
                return "cast(ma as int)";
            }
        });
		
		List<Tbs_dmbaocao> list = (List<Tbs_dmbaocao>)cr.list();

		if(list.size()>0)
		{
			return list;
		}else		
		return null;
	}

	public List<Tbs_dmbaocao> getDmBCPhoBienTT(String nhx, Integer[] ma_loaibc) {
		Criteria cr = this.createCriteria();
		
		if (!Utils.isEmpty(nhx)) {
			cr.add(Restrictions.eq("nhx", nhx));
		}
		cr.add(Restrictions.in("ma_loaibc", ma_loaibc));
		
		List<Tbs_dmbaocao> list = (List<Tbs_dmbaocao>)cr.list();
		
		if(list.size()>0)
		{
			return list;
		}
		else		
			return null;
	}

	public List<Tbs_dmbaocao> getAllBC() {
		Criteria cr = this.createCriteria();
		
		cr.addOrder(new Order("ma", true) {
            @Override
            public String toSqlString(Criteria criteria, CriteriaQuery criteriaQuery) throws HibernateException {
                return "cast(ma as int)";
            }
        });
		
		List<Tbs_dmbaocao> list = (List<Tbs_dmbaocao>)cr.list();

		if(list.size()>0)
		{
			return list;
		}else		
		return null;
	}

	public List<Tbs_dmbaocao> getBCByLoaiKy(String loaiKyBC) {
		Criteria cr = this.createCriteria();
		
		if(loaiKyBC.equalsIgnoreCase("KY")){
			cr.add(Restrictions.eq("ky", 1));
			cr.add(Restrictions.eq("thang", 1));
			cr.add(Restrictions.eq("quy", 0));
			cr.add(Restrictions.eq("nam", 1));
		}
		else if(loaiKyBC.equalsIgnoreCase("THANG")){
			cr.add(Restrictions.eq("ky", 0));
			cr.add(Restrictions.eq("thang", 1));
			cr.add(Restrictions.eq("quy", 0));
			cr.add(Restrictions.eq("nam", 1));
		}
		else if(loaiKyBC.equalsIgnoreCase("QUY")){
			cr.add(Restrictions.eq("ky", 0));
			cr.add(Restrictions.eq("thang", 0));
			cr.add(Restrictions.eq("quy", 1));
			cr.add(Restrictions.eq("nam", 1));
		}
		else if(loaiKyBC.equalsIgnoreCase("NAM")){
			cr.add(Restrictions.eq("ky", 0));
			cr.add(Restrictions.eq("thang", 0));
			cr.add(Restrictions.eq("quy", 0));
			cr.add(Restrictions.eq("nam", 1));
		}
		else{
			return null;
		}
		
		List<Tbs_dmbaocao> list = (List<Tbs_dmbaocao>)cr.list();
		
		if(list.size()>0)
		{
			return list;
		}
		else		
			return null;
	}

}
