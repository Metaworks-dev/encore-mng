<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">

    <title>EN-CORE Management</title>
        
    <!-- Loading indicator -->
    <script data-pace-options='{ "ajax": false }' src="${pageContext.request.contextPath}/resources/lib/pace-1.0.2/pace.js"></script>
    <link href="${pageContext.request.contextPath}/resources/lib/pace-1.0.2/themes/blue/pace-theme-center-simple.css" rel="stylesheet"/>

    <!-- Webfont -->
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/lib/font-awesome-4.3.0/css/font-awesome.min.css"/>
    
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/icons.css"/>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/chosen.css"/>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/node-list.css"/>

    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/main.css"/>
    
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/lib/bootstrap-3.3.1/js/bootstrap.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/lib/jquery-cookie/jquery.cookie.js"></script>



    <style>
        .clusters rect {
            fill: #00ffd0;
            stroke: #999;
            stroke-width: 1.5px;
        }

        text {
            font-weight: 300;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
            font-size: 14px;
        }

        .node rect {
            stroke: #999;
            fill: #fff;
            stroke-width: 1.5px;
        }

        .edgePath path {
            stroke: #333;
            stroke-width: 1.5px;
        }
    </style>

    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" data-app="576071c2-c2d8-4e32-a3e7-90b1f12e57ba" type="text/javascript" src="${pageContext.request.contextPath}/bootstrap.js"></script>

</head>
<body></body>
</html>
