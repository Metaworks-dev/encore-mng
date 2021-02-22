<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <c:if test="${nocache}">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Expires" content="0">
    </c:if>

    <title>EN-CORE</title>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/lib/bootstrap-3.3.1/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/login.css"/>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/lib/bootstrap-3.3.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/lib/respond/respond.js"></script>
</head>
<body>
<div clas="container">
    <form id="login-form" action="${pageContext.request.contextPath}/loginProc" method="post" role="form" style="display: block;">
    <div class="flex-container">
        <div class="auth-body">
            <div class="auth-title">EN-CORE Management</div>
            <div class="form-group auth-form">
                <input type="text" name="USERID" id="userid" tabindex="1" class="form-control" placeholder="Email" value="exospace" required autofocus>
            </div>
            <div class="form-group auth-form">
                <input type="password" name="PASSWORD" id="passwd" tabindex="2" class="form-control" placeholder="Password" value="7114" required>
            </div>
            <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control auth-form btn btn-info" value="Login">
        </div>
    </div>
    </form>
</div>
</body>
</html>
