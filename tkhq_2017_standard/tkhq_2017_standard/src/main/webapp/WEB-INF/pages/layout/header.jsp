<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
var _userlogin ='${pageContext.request.userPrincipal.name}';
</script>
<header class="main-header">
    <!-- <nav class="navbar navbar-static-top" role="navigation"> -->
      <div class="nvbar-top-header">
      <a href="#" class="">
      <span class="logo-mini">  <img src="${pageContext.request.contextPath}/static/images/banner.jpg" width="100%" height="100px" class="user-image" alt="User Image"></span>
    </a>
		<div class="navbar-custom-menu nvbar-top-menu">
	        <ul class="nav navbar-nav">        
	          <!-- User Account Menu -->
	          <li class="dropdown user user-menu">
	            <!-- Menu Toggle Button -->
	            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
	              <!-- The user image in the navbar-->
	            <!--   <img src="assets/img/user2-160x160.jpg" class="user-image" alt="User Image"> -->
	              <!-- hidden-xs hides the username on small devices so only the image appears. -->
	              	<span class="hidden-xs" id="username">${pageContext.request.userPrincipal.name}</span>
	            </a>
	            <ul class="dropdown-menu">
	              <!-- The user image in the menu -->	 
					<li><a href="doimatkhau">Đổi mật khẩu</a></li>
					<li><a href="logoutPage">Đăng xuất</a></li>	
					</ul>				 
	              </li>           
	            </ul>	          
	      </div>      
      </div> 
  </header>
