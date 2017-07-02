package com.tkhq.cmc.controler;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpRequest;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.tkhq.cmc.dao.TbdSysLogSessionDAO;
//import com.tkhq.cmc.dao.UserDAO;
import com.tkhq.cmc.model.TbdSysUsers;
import com.tkhq.cmc.services.Tbd_sys_userService;

@Controller
@SessionAttributes("user")
public class LoginController extends BaseIndex {

	@Autowired
	private Tbd_sys_userService tbd_sys_userService;
	
	@Autowired
	private TbdSysLogSessionDAO tbdSysLogSessionDAO;

	// @Autowired

	private AuthenticationTrustResolver authenticationTrustResolver;

	protected TbdSysUsers user;

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_" + "USER")))
		{
			return "index";
		}
		return "login";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index() {

		return "danhsachcongviec";
	}

//	@RequestMapping(value = "/", method = RequestMethod.POST)
//	// @Scope("session")
//	public String login(@RequestParam("username") String username,
//			@RequestParam("password") String password) {
//		user = tbd_sys_userService.findUserByUserName(username);
//
//		// if (userDAO.login(username, password)) {
//		if (isCurrentAuthentication()) {
//			// viewer.setUser(user);
//			// System.out.println("Load chuc vu : "
//			// +viewer.getUser().getChucvu());
//			return "login";
//		} else {
//			return "HTCBBTGTMHSITC";
//		}
//	}
	
//	@RequestMapping(value="/logoutPage",method=RequestMethod.GET)
//	public String logout(){
//		return "logoutPage";
//	}

	@RequestMapping(value = "/logoutPage", method = RequestMethod.GET)
	public String logout(HttpServletRequest request,
			HttpServletResponse response) {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();
		if (authentication != null && !authentication.getPrincipal().equals("anonymousUser") ) {
			String username = authentication.getName();
			try {
				tbdSysLogSessionDAO.updateNewLogUser(username);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			SecurityContextHolder.getContext().setAuthentication(null);
		}
		return "redirect:login?logout";
	}

	private boolean isCurrentAuthentication() {
		final Authentication authentication = SecurityContextHolder
				.getContext().getAuthentication();
		return authenticationTrustResolver.isAnonymous(authentication);
	}
}
