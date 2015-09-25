;(function($){
	var Plugin = function(ele,opt){
		this.$element = ele;
		this.defaults = {
			userId:"AAA",
			imagePrefix:"/AccountApplication/static/image/id/",
			imageSuffix:".jpg",
			submitUrl:"",
			close:function(){
				
			},
			cancel:function(){
				
			},
			ok:function(status,reason){
				$.post(this.submitUrl,{"status":status,"reason":reason},null,"json").done(function(data){
					if(data.code==1)
						alert("success");
					else
						alert("fail");
				});
			}
		};
		this.options = $.extend({},this.defaults,opt);
	};
	
	Plugin.prototype = {
		init:function(){
			var that = this;
			
			var $context = $("<div id='jIdAudit-context'></div>");
			$context.append("<div class='jIdAudit-background'></div>");
			
			var $content = $("<div class='jIdAudit-content'></div>");
			
			var $main = $("<div class='jIdAudit-main'></div>");
			var $header = $("<div class='jIdAudit-header'></div>");
			var closeBtn = $("<button class='closeBtn' title='关闭'>×</button>").on("click",function(){
				$("#jIdAudit-context").remove();
				that.options.close();
			});
			$header.append(closeBtn);
			$header.append("<div class='title'><span>证件审核</span></div>");
			var $body = $("<div class='jIdAudit-body'></div>");
			var $block = $("<div style='padding-left:15px;'></div>");
			$block.append("<div style='border: 1px solid #cbd3de;'><div style='margin:auto; width: 502px;'><div style='margin:30px 0 30px 0;display:block;border: black 1px solid;'><img height='320px;' width='500px;' style='' src='"+this.options.imagePrefix+this.options.userId+"_1"+this.options.imageSuffix+"'></div><div style='margin:0 0 30px 0;display:block;border: black 1px solid;'><img height='320px;' width='500px;' style='' src='"+this.options.imagePrefix+this.options.userId+"_2"+this.options.imageSuffix+"'></div></div></div>");
			$block.append("<div style='margin-top:20px;'><span style='width:40px;display:inline-block;'></span><strong>状态:</strong><span style='width:40px;display:inline-block;'></span><input type='radio' name='operation' value='0' />拒绝<span style='width:20px;display:inline-block;'></span><input type='radio' name='operation' value='1' checked />通过</div>");
			$block.append("<div style='margin-top:20px;'>审核拒绝原因:</div>");
			$block.append("<div style='margin:5px;'><textarea rows='5' cols='60' id='reason'></textarea></div>");
			$body.append($block);
			
			var $foot = $("<div class='jIdAudit-foot'></div>");
			var cancelBtn = $("<button class='btn cancel'>取消</button>").on("click",function(){
				$("#jIdAudit-context").remove();
				that.options.cancel();
			});
			var okBtn = $("<button class='btn ok'>确定</button>").on("click",function(){
				var status = $("input[name='operation']:checked").val();
				var reason = $("#reason").val();
				$("#jIdAudit-context").remove();
				that.options.ok(status,reason);
			});
			$foot.append(cancelBtn);
			$foot.append(okBtn);
			
			$main.append($header);
			$main.append($body);
			$main.append($foot);
			
			$content.append($main);
			$context.append($content);
			
			$("body").append($context);
		}
	};
	
	$.extend($,{
		jIdAudit:function(options){
			var plugin = new Plugin(this,options);
			return plugin.init();
		}
	});
})(jQuery);