package com.tkhq.cmc.services;

import java.util.List;

import com.tkhq.cmc.dto.BCHTX27HDTO;
import com.tkhq.cmc.dto.BCNKHH015KDTO;
import com.tkhq.cmc.dto.BCNKHHCOUDDTO;
import com.tkhq.cmc.dto.BCNKHHCUCHQDTO;
import com.tkhq.cmc.dto.BCNKHHPTVT026HDTO;
import com.tkhq.cmc.dto.BCNKHTDTK017K1DTO;
import com.tkhq.cmc.dto.BCNKHTDTK017KDTO;
import com.tkhq.cmc.dto.BCNKNUOCMHCY024TDTO;
import com.tkhq.cmc.dto.BCNKTDNCYDTO;
import com.tkhq.cmc.dto.BCSLDNTTTPDTO;
import com.tkhq.cmc.dto.BCTGNKCHIUTHUECUCHQDTO;
import com.tkhq.cmc.dto.BCTTXNKTCCHQDTO;
import com.tkhq.cmc.dto.BCUSBXKHHDTO;
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
import com.tkhq.cmc.dto.BCXNKHHTT19TDTO;
import com.tkhq.cmc.dto.BCXNKTLHDNDTO;
import com.tkhq.cmc.dto.BCXNKTTP022TDTO;
import com.tkhq.cmc.dto.BGHHNKTT55DTO;
import com.tkhq.cmc.dto.TMBCNKHH20TDTO;
import com.tkhq.cmc.dto.TMBCXKHH20TDTO;
import com.tkhq.cmc.dto.TTGXKPTVTDTO;

public interface PHANHE_PBTKService {

	public List<TMBCXKHH20TDTO> ts_BCXKHH20T(String maHQ,int thang, int nam, String loai_BC);
	public List<TMBCNKHH20TDTO> ts_BCNKHH20T(String maHQ,int thang, int nam, String loai_BC);
	public List<BCNKHTDTK017KDTO> ts_BCNKHTDTK017K(String maHQ,int ky,int thang, int nam, String loai_BC);
	public List<BCNKHTDTK017K1DTO> ts_BCNKHTDTK017K1(String maHQ,int ky,int thang, int nam);
	public List<BCXKHH015KDTO> ts_BCXKHH015K(String maHQ,int ky,int thang, int nam, String loai_BC);
	public List<BCNKHH015KDTO> ts_BCNKHH015K(String maHQ,int ky,int thang, int nam, String loai_BC);
	public List<BCXNKTTP022TDTO> ts_BCXNKTTP022T(String maHQ,int thang, int nam, String loai_BC);
	public List<BCXKNUOCMHCY023TDTO> ts_BCXKNUOCMHCY023T(String maHQ,int thang, int nam, String loai_BC);
	public List<BCNKNUOCMHCY024TDTO> ts_BCNKNUOCMHCY024T(String maHQ,int thang, int nam, String loai_BC);
	public List<BCXKHHPTVT025HDTO> ts_BCXKHHPTVT025H(String maHQ,int ky, int nam, String loai_BC);
	public List<BCNKHHPTVT026HDTO> ts_BCNKHHPTVT026H(String maHQ,int ky, int nam, String loai_BC);
	
	public List<BCXNKHHTT19TDTO> ts_BCXKHHTT18T(String maHQ, int thang, int nam, String loai_BC);
	public List<BCXNKHHTT19TDTO> ts_BCNKHHTT19T(String maHQ, int thang, int nam, String loai_BC);
	
	public List<BCHTX27HDTO> ts_BCHTX27H(String maHQ,int ky, int nam,String loai_BC);
	public List<BCUSBXKHHDTO> Ts_BCUSBXKHH(String maHQ,int thang, int nam, String loai_BC);
	public List<BCUSBXKHHDTO> Ts_BCUSBNKHH(String maHQ,int thang, int nam, String loai_BC);
	
	public List<BCSLDNTTTPDTO> ts_BCSLDNTTTP(String maHQ, int nam);
	
	public List<BGHHNKTT55DTO> ts_BGHHNKTT55(String maHQ,int ky, int thang, int nam);	
	public List<BCNKHHCOUDDTO> ts_BCNKHHCOUD(String maHQ, int quy, int nam);
	public List<BCXNKTLHDNDTO> ts_BCXNKTLHDN(String maCuc,String maHQ, int thang, int nam);
	public List<BCXKTDNCYDTO> ts_BCXKTDNCY(String maCuc, int thang, int nam);
	public List<BCNKTDNCYDTO> ts_BCNKTDNCY(String maCuc, int thang, int nam);
	public List<BCXKMHCYTINHDTO> ts_BCXKMHCYTINH(String tinhTP, int thang, int nam);
	public List<BCXNKHHTNLHDTO> ts_BCXNKHHTNLH(String maCuc, int thang, int nam,int ma_nlh);
	public List<BCXKNUOCMHCYTINHDTO> ts_BCXKNUOCMHCYTINH(String tinhTP, int thang, int nam);
	public List<BCXKHHCUCHQDTO> ts_BCXKHHCUCHQ(String maCuc, int thang, int nam);
	public List<BCNKHHCUCHQDTO> ts_BCNKHHCUCHQ(String maCuc, int thang, int nam);
	public List<BCXKHHTTTCHQDTO> ts_BCXKHHTTTCHQ(String maHQ, int thang, int nam, String loai_BC);
	public List<BCXKHHTTTCHQDTO> ts_BCNKHHTTTCHQ(String maHQ, int thang, int nam, String loai_BC);
	public List<BCXKMHCYTPTVTTCHQDTO> ts_BCXKMHCYTPTVTTCHQ(int ky, int thang, int nam);
	public List<BCXKMHCYTPTVTTCHQDTO> ts_BCNKMHCYTPTVTTCHQ(int ky, int thang, int nam);
	public List<BCXKMHCYTPTVTTCHQQUYDTO> ts_BCXKMHCYTPTVTTCHQQUY( int quy, int nam);
	public List<BCXKMHCYTPTVTTCHQQUYDTO> ts_BCNKMHCYTPTVTTCHQQUY(int thang, int nam);
	
	List<TTGXKPTVTDTO> ts_TTGXKTPTVT(String maHQ, int quy, int nam);
	List<TTGXKPTVTDTO> ts_TTGNKTPTVT(String maHQ, int quy, int nam);
	List<BCTTXNKTCCHQDTO> ts_BCTTXNKTCCHQ(int nam);
	public List<BCTGNKCHIUTHUECUCHQDTO> ts_BCTGNKCHIUTHUECUCHQ(String maCuc, int thang, int nam);
	public List<BCTGNKCHIUTHUECUCHQDTO> ts_BCTGXKCHIUTHUECUCHQ(String maCuc, int thang, int nam);
}
