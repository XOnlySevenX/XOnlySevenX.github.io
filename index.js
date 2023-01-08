 $(function(){
  
                alert("Web前端第5题演示——轮播图1"+"\n"+
                      "Web前端第5题代码——轮播图2"+"\n"+
                      "Web前端第4题演示——轮播图3"+"\n"+
                      "Web前端第4题代码——轮播图4"+"\n"+);

                $("#nav_ul li:eq(0)").attr("class","nav_li_click");
                $("#nav_ul li").click(function(){
                    $(".nav_li_click").attr("class","nav_li");      //将已选择的导航样式改变
                    $(this).attr("class","nav_li_click");           //改变当前导航颜色

                });


                //鼠标悬停改变滚动栏底部颜色
                $("#rol_ul li").hover(                                  //鼠标悬停
                    function(){
                        //console.log("flag");
                        //清除所有定时器
                        rol_stop();

                        $("#rol_ul li").attr("class","rol_li");          
                        $(this).attr("class","rol_li_select");

                        var index = $(this).index();
                        var t_mar_left = parseInt( index *-600 );

                        rol_pic_interval = setInterval(function(){
                            rol_margin_jump (t_mar_left,0);
                        },10);
                    
                    },function(){                                       //鼠标离开              
                        rol_stop();
                        var index = $(this).index();
                        var t_mar_left = parseInt( index *-600 );

                        rol_pic_interval = setInterval(function(){
                            rol_margin_jump (t_mar_left,1);
                        },10);

                    // hide_rrl();
                    
                    
                });

                //每三秒定时滑动图片
                function rol_picture(){

                        var t_mar_left;
                        var n_mar_left = parseInt($("#rol_pic").css("margin-left"));         //获取原来左外间距的值

                        if(n_mar_left != -2400){
                            t_mar_left = n_mar_left-1;
                        }else{
                            t_mar_left = -2400;
                        }                                                                   //计算目标值

                        rol_li_jump(t_mar_left);                                            //进行滚动条跳转

                        if(t_mar_left%600 == 0){                                            //判断关键值

                            if(t_mar_left == -2400){ 

                                rol_stop();
                                //console.log("标记01");
                                $("#rol_pic").css("margin-left",t_mar_left + "px");
              
                                rol_pic_timeOut = setTimeout(function(){
                                    rol_pic_interval = setInterval(function(){
                                        rol_margin_jump(0,1);
                                    });
                                },3000);                               
                                //console.log("标记03");
  
                            }else{
                                rol_stop();                                                 //不在-2400关键点位

                                $("#rol_pic").css("margin-left",t_mar_left+"px");

                                rol_pic_timeOut =  setTimeout(function(){
                                    rol_pic_interval = setInterval(rol_picture,5);
                                },3000);
                                
                            }    
                        }else{
                            t_mar_left = n_mar_left - 1;
                            $("#rol_pic").css("margin-left",t_mar_left+"px");                           
                            //console.log("06");
                        }
                        //console.log("pic结束");

                }

       
                //位置跳转 通用
                function rol_margin_jump(t_mar_left,flag){

                    var a = $("#rol_pic").css("margin-left");
                    var n_mar_left = parseInt(a);
                    var c_mar_left = t_mar_left - n_mar_left;
                                       
                    var c_mar_left = t_mar_left - n_mar_left;      //计算出差值
                    var displace = c_mar_left/10;

                    rol_li_jump(t_mar_left);

                    if(c_mar_left > 0){

                        if(c_mar_left > 50){
                            $("#rol_pic").css("margin-left",n_mar_left + displace + "px");     //第一阶段快速跳转

                        }else if(c_mar_left <= 50 && c_mar_left > 5 ){
                            $("#rol_pic").css("margin-left",n_mar_left + 1 + "px");                 //第二阶段平滑过渡

                        }else{
                            $("#rol_pic").css("margin-left",t_mar_left + "px");                     //第三阶段到位

                            //rol_li_jump(n_mar_left);                                                //滚动栏底部样式改变
                           rol_stop();

                            if(flag ==1){                                                           //标记是否计时后滚动
                                rol_pic_timeOut = setTimeout(function(){
                                    rol_pic_interval = setInterval(rol_picture,5);
                                },3000);
                            }
                            
                        }

                    }else{

                        if(c_mar_left < -50){
                            $("#rol_pic").css("margin-left",n_mar_left + displace + "px");     //第一阶段快速跳转
                        }
                        else if(c_mar_left >= -50 & c_mar_left < -5 ){
                            $("#rol_pic").css("margin-left",n_mar_left - 1 + "px");                 //第二阶段平滑过渡

                        }
                        else{
                            $("#rol_pic").css("margin-left",t_mar_left + "px");                     //第三阶段到位

                            rol_stop();

                            if(flag ==1){                                                          //标记是否计时后滚动
                                if(t_mar_left == -2400){
                                    rol_pic_interval = setInterval(rol_picture,5);
                                }else{
                                    rol_pic_timeOut = setTimeout(function(){
                                        rol_pic_interval = setInterval(rol_picture,5);
                                    },3000);
                                }            
                            }

                        }

                    }
                    //rol_pic_interval = setInterval(rol_margin_jump(t_mar_left),20);
                    //console.log("结束");

                }


                //位置暂停 通用
                function rol_stop(){

                    clearInterval(rol_pic_interval);
                    rol_pic_interval = null;
                    clearTimeout(rol_pic_timeOut);
                    rol_pic_timeOut = null;

                }

                
                //滚动栏底部样式改变 通用
                function rol_li_jump(n_mar_left){

                    var index = Math.trunc( (Math.abs(n_mar_left)+50)/600 );
                    //console.log(index);
                    $("#rol_ul li").attr("class","rol_li");
                    $("#rol_ul li:eq(" + index + ")").attr("class","rol_li_select");

                }

                //定时器
                var rol_pic_interval = window.setInterval(rol_picture,5);
                var rol_pic_timeOut;
                // var judge_r_l =setInterval(hide_rrl,10);

                // //滚动栏旁边链接
                // function hide_rrl(){
                //     var rrl_head = parseInt( $("#rrl_head").width());
                //     var rol_right_link = parseInt( $("#rol_right_link").width() );
                //     if(rrl_head+19 == rol_right_link){
                //     $("#rol_right_link").hide();
                //     }else{
                //         $("#rol_right_link").show();
                //     }  
                
                // }            

            });
          
