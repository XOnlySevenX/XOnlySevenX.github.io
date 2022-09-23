$(function(){

    $("#nav_ul li:eq(0)").attr("class","nav_li_click");
    $("#nav_ul li").click(function(){
        $(".nav_li_click").attr("class","nav_li");      //将已选择的导航样式改变
        $(this).attr("class","nav_li_click");           //改变当前导航颜色

    });

    //鼠标悬停改变滚动栏底部颜色
    $("#rol_ul li").hover(
    function(){
        console.log("flag");

        clearInterval(rol_pic_interval);                //清除所有定时器
        rol_pic_interval=null;
        clearTimeout(rol_pic_timeOut);
        rol_pic_timeOut=null;

        $("#rol_ul li").attr("class","rol_li");         //滚动条样式改变
        $(this).attr("class","rol_li_select");

        var index = $(this).index();                    //获取悬停元素索引 
        var n_mar_left = parseInt($("#rol_pic").css("margin-left"));    //获取当前位置margin
        var t_mar_left = (-600)*index;                    //计算目标位置margin
        var c_mar_left = t_mar_left-n_mar_left;

        if(c_mar_left>0){
            rol_pic_interval = setInterval(function(){
            var n_mar_left = parseInt($("#rol_pic").css("margin-left"));    //获取当前位置margin
            var c_mar_left = t_mar_left-n_mar_left;
            if(c_mar_left>20){
                $("#rol_pic").css("margin-left",n_mar_left+c_mar_left/10+"px");
            }
            else if(c_mar_left>=5 && c_mar_left<=20){
                $("#rol_pic").css("margin-left",n_mar_left+1+"px");
            }
            else{
                $("#rol_pic").css("margin-left",t_mar_left+"px");
            }

            if(n_mar_left == t_mar_left){
                clearInterval(rol_pic_interval);
                rol_pic_interval=null;
            }

        },5);

        }else{
            rol_pic_interval = setInterval(function(){
            var n_mar_left = parseInt($("#rol_pic").css("margin-left")); 
            var c_mar_left = t_mar_left-n_mar_left;
            if(c_mar_left<-20){
                $("#rol_pic").css("margin-left",n_mar_left+c_mar_left/10+"px");
            }
            else if(c_mar_left>=-20 && c_mar_left <=-5){
                $("#rol_pic").css("margin-left",n_mar_left-1+"px");
            }
            else{
                $("#rol_pic").css("margin-left",t_mar_left+"px");
            }
            if(n_mar_left == t_mar_left){
                clearInterval(rol_pic_interval);
                rol_pic_interval=null;
            }
        },5);
        }
       
        // console.log(index);
        // console.log(mar_left);

        //$("#rol_pic").css("margin-left",l_mar_left+"px");
        
    },function(){
        //$(this).attr("class","rol_li");                     
        //离开后 
        clearInterval(rol_pic_interval);
        rol_pic_interval = null;
        clearTimeout(rol_pic_timeOut);
        rol_pic_timeOut=null;
        rol_pic_timeOut = setTimeout(function(){
            rol_pic_interval= setInterval(rol_picture,5);
        },3000);
        
    });

    //每三秒定时滑动图片
    function rol_picture(){

            var n_mar_left;
            var o_mar_left = parseInt($("#rol_pic").css("margin-left"));         //获取原来左外间距的值
            //alert(o_mar_left);
            if(o_mar_left != -2400){
                n_mar_left = o_mar_left-1;
            }else{
                n_mar_left = -2400;
            }

            var num= Math.trunc((Math.abs(o_mar_left)+100)/600);
            $("#rol_ul li").attr("class","rol_li");
            $("#rol_ul li:eq("+num+")").attr("class","rol_li_select");
            // var compare = [0,-600,-1200,-1800,-2400];
            // if(o_mar_left == -2399){

            //     clearInterval(rol_pic_interval);
            //     rol_pic_interval = null; 
            //     n_mar_left=o_mar_left-1;
            //     $("#rol_pic").css("margin-left",n_mar_left+"px");

            if(n_mar_left%600 == 0){

                if(n_mar_left == -2400){ 

                    // rol_pic_timeOut =  setTimeout(function(){
                    //     rol_pic_interval = setInterval(rol_picture,5);
                    // },3000);
                    clearInterval(rol_pic_interval);
                    rol_pic_interval = null;
                    console.log("标记01")
                    clearTimeout(rol_pic_timeOut);
                    rol_pic_timeOut = null;
                
                    console.log("标记02");
                    rol_pic_timeOut = setTimeout(function(){
                        rol_pic_interval = setInterval(reset_first,10);
                    },0);
                    
                    console.log("标记03");

                }else{
                    clearInterval(rol_pic_interval);
                    rol_pic_interval = null; 

                    rol_pic_timeOut =  setTimeout(function(){
                        rol_pic_interval = setInterval(rol_picture,5);
                    },3000);
                    
                    $("#rol_pic").css("margin-left",n_mar_left+"px");
                    console.log("05");
                }          
                // console.log(n_mar_left in compare);
                // console.log(compare.indexOf(n_mar_left)); 
                
                // console.log("执行到了");     
            }else{
                n_mar_left=-1+o_mar_left;
                $("#rol_pic").css("margin-left",n_mar_left+"px");                           
                console.log("06");
            }

            // if(mar_left==-2400){
            //         mar_left=0;
            //         num=0;
            // }  
            console.log("07");
    }

    //鼠标悬停平滑定位

    function reset_first(){
        var rf_mar_left = parseInt($("#rol_pic").css("margin-left"));    //获取当前位置margin
        if(rf_mar_left < -100){
            console.log("标记1");
            $("#rol_pic").css("margin-left",rf_mar_left+40+"px");

        }else if(rf_mar_left >= -100 && rf_mar_left<-5){

            console.log("标记2");
            $("#rol_pic").css("margin-left",rf_mar_left+1+"px");
            $("#rol_ul li").attr("class","rol_li");
            $("#rol_ul li:eq(0)").attr("class","rol_li_select");
            
        }else{

            console.log("标记3");
            $("#rol_pic").css("margin-left","0px");

            clearInterval(rol_pic_interval);
            rol_pic_interval = null;
            clearTimeout(rol_pic_timeOut);
            rol_pic_timeOut = null;
            
            rol_pic_timeOut =  setTimeout(function(){
                rol_pic_interval = setInterval(rol_picture,5);
            },3000);
        }
                
        console.log("标记4");
    }     

    var rol_pic_interval = window.setInterval(rol_picture,5);
    var rol_pic_timeOut;

});