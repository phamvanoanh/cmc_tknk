/**
 * Created by cmcsoft on 6/2/2017.
 */

App.factory('tbsDmQtacService',['$http', '$q', 'contextPath', tbsDmQtacService]);

function tbsDmQtacService($http, $q, contextPath) {
    'use strict';
    var factory = {
        validateEmpty: validateEmpty,
    	validateMa : validateMa,
    	validateTriGia: validateTriGia,
    	validateDecimal : validateDecimal,
    	valdateTenQuocGia:valdateTenQuocGia,
    };

    return factory;
    
    
    function validateEmpty(str) {
        if(str === ""){
            return true;
        } else {
            return false;
        }
    }
    function validateMa(ma) {
       if(ma.length > 20){
    	   return true;
       }else {
    	   return false;
       }
       
    }
    function validateTriGia(triGia) {
    	var triGiaArray =  triGia.toString().split('.');
		if (triGiaArray[0].length > 14) {
			return true;
		} else {
			return false;
		}
	}
    
    function validateDecimal(triGia){
    	var triGiaArray =  triGia.toString().split('.');
    	if(triGiaArray.length  === 2){
    		if (triGiaArray[1].length > 2) {
    			return true;
    		} else {
    			return false;
    		}
    	}else {
    		return false
    	}
    	
    }

    function valdateTenQuocGia(tenQuocGia) {
    	 if(tenQuocGia.length > 100){
      	   return true;
         }else {
      	   return false;
         }
    }
}