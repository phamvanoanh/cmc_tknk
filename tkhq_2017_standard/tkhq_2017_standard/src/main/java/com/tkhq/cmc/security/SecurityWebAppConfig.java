package com.tkhq.cmc.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.tkhq.cmc.config.CaptchaFilter;
import com.tkhq.cmc.dto.TbdSysFunctionsDTO;
import com.tkhq.cmc.services.TbdSysFunctionsService;

@Configuration
@EnableWebSecurity

public class SecurityWebAppConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	@Qualifier("customUserDetailsService")
	UserDetailsService userDetailsService;
	
	@Autowired
	TbdSysFunctionsService tbdSysFunctionsService;

	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder builder) throws Exception {
		builder.userDetailsService(userDetailsService);
		builder.authenticationProvider(autheticationProvider());
	}

	@Override
	public void configure(WebSecurity web) throws Exception {

		web.ignoring().antMatchers("/static/**");
	}
	
	@Override
	protected void configure(HttpSecurity security) throws Exception {
		
		
		configAntMatchers(security);
		security.addFilterBefore( new CaptchaFilter(),UsernamePasswordAuthenticationFilter.class);
		security.authorizeRequests()
		.antMatchers("/logoutPage").permitAll()
		.antMatchers("/login").permitAll()
		.anyRequest().authenticated()
		.and().formLogin().loginPage("/login")
		.loginProcessingUrl("/login").usernameParameter("username").passwordParameter("password")
		.defaultSuccessUrl("/danhsachcongviec")
//		.and().logout().logoutSuccessUrl("/login?logoutPage")
		.and().logout().logoutSuccessUrl("/logoutPage")
		.and().exceptionHandling().accessDeniedPage("/errors")
		.and().sessionManagement().maximumSessions(100).expiredUrl("/logoutPage");
		security.csrf().disable();
		
		security.headers().frameOptions().sameOrigin().httpStrictTransportSecurity().disable();
	}

	@Bean
	public DaoAuthenticationProvider autheticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder()); // encoding password by bcrypt
		return authenticationProvider;
	}

	@Bean
	public static AuthenticationTrustResolver getAuthenticationTrustResolver() {
		AuthenticationTrustResolverImpl getAuthenticationTrustResolver = new AuthenticationTrustResolverImpl();

		return getAuthenticationTrustResolver;
	}
	
	private void configAntMatchers(HttpSecurity security) throws Exception{
		for (TbdSysFunctionsDTO item : tbdSysFunctionsService.getAll()) {
			if(item.getPath()!=null){
				security.authorizeRequests().antMatchers("/"+item.getPath()+"/**").hasRole(Integer.toString(item.getfunctionId()));
			}
		}
		security.authorizeRequests()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe01/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe02/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe03/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe04/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe05/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe06/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe07/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe08/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe09/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe10/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe11/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe12/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe13/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe14/**").permitAll()
//		.antMatchers("/bcpt/SoLieuTheoChiTieuThongKe15/**").permitAll()
		.antMatchers("/captcha/**").permitAll()
		.antMatchers("/botdetectcaptcha/**").permitAll()
		.antMatchers("/bcpt/ThayDoiDoNVHQ/TongThePrint/**").permitAll()
		.antMatchers("/bcpt/ThayDoiDoNVHQ/BSToKhai/**").permitAll()
		.antMatchers("/bcpt/ThayDoiDoNVHQ/HuyXoa/**").permitAll()
		.antMatchers("/bcpt/ThayDoiDoNVHQ/SDBS/**").permitAll()
		.antMatchers("/bcpt/XemThayDoi/DoBSTK/**").permitAll()
		.antMatchers("/bcpt/XemThayDoi/BuocNVTHKE/**").permitAll()
		.antMatchers("/bcpt/ThayDoiDoNVHQ/Print/**").permitAll();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
//	@Override
//	@Autowired
//	public void configure(AuthenticationManagerBuilder auth){
//		
//	}

}
