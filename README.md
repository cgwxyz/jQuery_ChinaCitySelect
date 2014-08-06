jQuery_ChinaCitySelect
======================
中国省市行政区划，此数据源于中国政府网http://www.gov.cn/test/2011-08/22/content_1930111.htm（截止2010年12月31日的数据）
此代码输出行政代码，便于数据库存储。


Example:
----
	<p><select id="country"></select>&nbsp;<select id="state"></select>&nbsp;<select id="city"></select>&nbsp;<select id="district"></select></p>
	<script type="text/javascript" >
		function addToList(id,value,text){
            return $('#'+id).append('<option value="'+value+'">'+text+'</option>');
        }
		var cityHolder = 0;
		var cityHolder2 = 0;
		$(document).ready(function(){
			$('#country').change(function(){
				if($(this).val() == 0){
					$('#state').show();
					$('#city').show();
					$('#district').show();
					cityHolder = $('#holder').ChinaCitySelect({'prov':'#state','city':'#city','dist':'#district',url:'new.json'});
					cityHolder2 = $('#holder').ChinaCitySelect({url:'new.json'});
				}else{
					$('#state').hide();
					$('#city').hide();
					$('#district').hide();
				}
			});
			addToList('country',-1,'请选择国家');
			addToList('country',0,'中国');
			addToList('country',1,'其它');
		});
	
		function doTest(){
			console.log(cityHolder.getCurrValue());//输出行政代码
		}
		function doTestLoc(){
			console.log(cityHolder2.parseLoc('110229'));//输出省市
		}
	</script>
