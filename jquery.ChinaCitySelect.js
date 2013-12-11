/*
@name: jQuery ChinaCitySelect plugins
@author: cgwxyz[cgwxyz@gmail.com]
@
*/
;(function($) {
    
$.ChinaCitySelect = $.ChinaCitySelect || {version:'0.1.0'};

var ChinaCitySelect = function(node,opts) {

    var me=this,$me=$(this);
    var $mine=$(node);

    $.extend(me, {
        getCurrValue: function() {    
            return __getCurrValue__();
        },
        getCurrLoc: function() {    
            return __getCurrLoc__();
        },
        doParseLoc: function(code) {
            return __doParseLoc__(code);
        },
        options: function() {
            return opts;
        }
    });
      
    var city_json = 0;
    var prov_obj = '';
    var city_obj = '';
    var dist_obj = '';
    
    function __init__(){
        if(typeof(opts.url)=="string"){
            $.getJSON(opts.url,function(json){
                city_json=json;
                __initwrapper__();
            });
        }else{
            city_json=opts.url;
            __initwrapper__();
        };
    }
    
    __init__();
    
    function __initwrapper__(){
        prov_obj = $(opts.prov);
        if(prov_obj.legnth<1) return;
        prov_obj.show();
        city_obj = $(opts.city);
        dist_obj = $(opts.dist);
        
        if(typeof opts.city != 'undefined'){
            city_obj.show();
            prov_obj.change(function(){
                initCity();
            });
        }
        
        if(typeof opts.dist != 'undefined'){
            dist_obj.show();
            city_obj.change(function(){
                initDist();
            });
        }
            
        $.each(city_json,function(i,prov){           
            $("<option value='"+prov.id+"'>"+prov.name+"</option>").appendTo(prov_obj);
        });
        
        setTimeout(function(){
            if(opts.prov!=null){
                prov_obj.val(opts.prov);
                initCity();
                setTimeout(function(){
                    if(opts.city!=null){
                        city_obj.val(opts.city);
                        initDist();
                        setTimeout(function(){
                            if(opts.dist!=null){
                                dist_obj.val(opts.dist);
                            };
                        },1);
                    };
                },1);
            };
        },1);
    }
    function initCity(){
        var curr_prov_arr = prov_obj.val().split('_');
        var prov_id = curr_prov_arr[1];
        
        city_obj.empty().attr("disabled",true);
        dist_obj.empty().attr("disabled",true);
        
        if(typeof(city_json['p_'+prov_id].data) == "undefined"){
            if(opts.nodata=="none"){
                city_obj.css("display","none");
                dist_obj.css("display","none");
            }else if(opts.nodata=="hidden"){
                city_obj.css("visibility","hidden");
                dist_obj.css("visibility","hidden");
            }
            return;
        }       
        $.each(city_json['p_'+prov_id].data,function(i,city){
            $("<option value='"+city.id+"'>"+city.name+"</option>").appendTo(city_obj);
        });
        
        city_obj.attr("disabled",false).css({"display":"","visibility":""});
        initDist();
    }

    function initDist(){
            var curr_prov_arr = prov_obj.val().split('_');
            var prov_id = curr_prov_arr[1];
            
            var curr_prov_arr = city_obj.val().split('_');
            var city_id=curr_prov_arr[1];
            
            dist_obj.empty().attr("disabled",true);

            if(typeof(city_json['p_'+prov_id].data['c_'+city_id].data)=="undefined"){
                if(opts.nodata=="none"){
                    dist_obj.css("display","none");
                }else if(opts.nodata=="hidden"){
                    dist_obj.css("visibility","hidden");
                };
                return;
            };
            
            $.each(city_json['p_'+prov_id].data['c_'+city_id].data,function(i,dist){
                $("<option value='"+dist.id+"'>"+dist.name+"</option>").appendTo(dist_obj);
            });
            dist_obj.attr("disabled",false).css({"display":"","visibility":""});
        }
     
        function __getCurrValue__(){
            return [prov_obj.val().split('_')[1],city_obj.val().split('_')[1],dist_obj.val().split('_')[1]].join('');
        }
        function __getCurrLoc__(){
            return [prov_obj.find("option:selected").text(),city_obj.find("option:selected").text(),dist_obj.find("option:selected").text()].join(',');
        }
        function __doParseLoc__(code){
            console.log(code);
            var prov_id = code.substr(0,2);
            var city_id = code.substr(2,2);
            var dist_id = code.substr(4,2);
            return city_json['p_'+prov_id].name+','+city_json['p_'+prov_id]['data'][['c_'+city_id]].name+','+city_json['p_'+prov_id]['data'][['c_'+city_id]]['data']['d_'+dist_id].name;
        }
};

$.fn.ChinaCitySelect = function(conf) {
    var el = this.eq(typeof conf == 'number' ? conf : 0).data("ChinaCitySelect");
    if (el) { return el; }

    var opts = {
        api:true,
        prov:'',
        city:'',
        dist:'',
        url:''
    };

    $.extend(opts, conf);

    this.each(function() {
        el = new ChinaCitySelect(this, opts);
        $(this).data("ChinaCitySelect", el);
    });
    return opts.api ? el: this;
};

})(jQuery);