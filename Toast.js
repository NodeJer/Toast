(function() {

	function Toast(context, theme) {
		this.context = context;
		this.theme = theme || "";

		this.onCreate();
	}

	Toast.prototype = {
		onCreate: function() {
			this.toast = document.createElement("toast");
			this.toast.className = this.theme;
			this.setDuration(2000);

			this.getContext().appendChild(this.getWindow());
		},
		setView: function(view) {
			if (view instanceof Element) {
				this.getWindow().appendChild(view);
			} else {
				this.getWindow().innerHTML = view;
			}
		},
		setCss: function(json){
			for(var prop in json){
				this.getWindow().style[prop] = json[prop];
			}
		},
		getOffset: function(){
			return {
				top: this.getWindow().offsetTop,
				left: this.getWindow().offsetLeft
			}
		},
		setDuration: function(second) {
			this.duration = second;
		},
		getDuration: function(second) {
			return this.duration;
		},
		getContext: function() {
			return this.context;
		},
		getWindow: function() {
			return this.toast;
		},
		show: function() {
			var win = this.getWindow();
			win.className = "toastShow";

			var duration = getStyle(win);

			var self = this;

			setTimeout(function(){
				cancel.call(self);
			}, parseInt(duration)*1000);
		}
	}

	function cancel(){
		var self = this;
		var win = self.getWindow();

		setTimeout(function() {
			win.className = "toastHide";

			var duration = getStyle(win);

			setTimeout(function(){
				win.parentNode.removeChild(win);
			}, parseInt(duration)*1000);
			
		}, this.getDuration());
	}

	function getStyle(element) {
		var res;

		if (window.getComputedStyle) {
			res =  window.getComputedStyle(element, false)["animationDuration"];

			if(res == null){
				res =  window.getComputedStyle(element, false)["webkitAnimationDuration"];
			}
		} else {
			res = element.currentStyle["animationDuration"];
		}

		return res;
	}

	Toast.markText = function(context, text, dur){
		var toast = new Toast(context);
		
		toast.setView(text);

		if(dur > 0){
			toast.setDuration(dur);
		}
		toast.show();

		return toast;
	}

	window.Toast = Toast;

	var style = "toast{\
		position: fixed;\
		display:none;\
		width: 10%;\
		bottom: 10%; left: 0; right: 0;\
        z-index:1000;\
        width: -webkit-fit-content;\
        height: -webkit-fit-content;\
        width: -moz-fit-content;\
        height: -moz-fit-content;\
        width: fit-content;\
        height: fit-content;\
        margin: auto;\
        border: 2px solid;\
        border-radius: 10px;\
        padding: 0.6em 2em;\
        background: #333;\
        background:rgba(0, 0, 0, 0.6);\
        text-align: center;\
        color: white;\
        overflow:hidden\
	}\
	toast.toastShow{\
		display:block;\
		-webkit-animation: fadeIn 1s;\
		animation: fadeIn 1s;\
	}\
	toast.toastHide{\
		display:block;\
		-webkit-animation: fadeOut 1s;\
		animation: fadeOut 1s;\
	}\
	@-webkit-keyframes fadeIn {\
		from {opacity: 0}\
		to {opacity: 1}\
	}\
	@keyframes fadeIn {\
		from {opacity: 0}\
		to {opacity: 1}\
	}\
	@-webkit-keyframes fadeOut{\
		from {opacity: 1}\
		to {opacity: 0}\
	}\
	@keyframes fadeOut{\
		from {opacity: 1}\
		to {opacity: 0}\
	}";

	try {
		document.createStyleSheet().cssText = style;
	} catch (e) {
		var styleElement = document.createElement("style");

		document.head.insertBefore(styleElement, document.head.children[0]);
		styleElement.innerHTML = style;
	}

})();