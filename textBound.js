(function(){

	var extend = function(obj,ext){
		for(var key in ext)
			if(ext.hasOwnProperty(key))
				obj[key] = ext[key];
			return obj;
		};

	function textBound(container, options) {
		var _this = this;

		if (!container) { 
			throw new Error('missing container');
		}
		this.container = container;

		this.settings = extend({
			selector: ".text-bound",
			offsetX: 0,
			offsetY: 0,
 			center: false,
 			centerX: false,
	 		centerY: false
		}, options);
    	if (this.settings.center === true) {
    		this.settings.centerX = true;
    		this.settings.centerY = true;
    	}

		if (this.container.length) {
			this.container.forEach(function(el){
				_this.bindEvents(el)
			})
		} else {
			_this.bindEvents(this.container)
		}

	};

	textBound.prototype.bindEvents = function(el) {
		var _this = this;
		el.addEventListener("mousemove", function(event) {
			_this.update(el, event);
		});
	}
	textBound.prototype.update = function(container, event) {
		var x,y,c,f,m,p;
		var selector = container.querySelector(this.settings.selector)
		x = event.clientX;
		y = event.clientY;
		c = { // container
			left: container.getBoundingClientRect().left,
			top: container.getBoundingClientRect().top,
			width: container.offsetWidth,
			height: container.offsetHeight
		};
		f = { // selector
			width: selector.offsetWidth,
			height: selector.offsetHeight
		};
		m = { // mouseoffset
			left: (this.settings.centerX) ? this.settings.offsetX-f.width/2 : this.settings.offsetX,
			top: (this.settings.centerY) ? this.settings.offsetY-f.height/2 : this.settings.offsetY
		};
		p = {
			left: (x-c.left+m.left).toString() + "px",
			top: (y-c.top+m.top).toString() + "px",
			right: "initial",
			bottom: "initial"
		}
		//left
		if (y+m.top <= c.top) {
			p.top = "0px";
		}
		//left
		if (x+m.left <= c.left) {
			p.left = "0px";
		}
		// //right
		if (x+f.width+m.left >= c.left+c.width) {
			p.left = "initial";
			p.right = "0px";
		}	
		// //bottom
		if (y+f.height+m.top >= c.top+c.height) {
			p.top = "initial";
			p.bottom = "0px";
		}

		selector.style.left = p.left;
		selector.style.top = p.top;
		selector.style.right = p.right;
		selector.style.bottom = p.bottom;

	}

  window['textBound'] = textBound;


})();