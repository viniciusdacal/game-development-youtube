function Ball(context){
	this.context = context;
	this.x = 15;
	this.y = 15;
	this.speedX = 30;
	this.speedY = 10;
	this.color = 'black';
	this.colors = ['red', 'black', 'purple', 'yellow', 'green'];
	this.radio = 15;

}

Ball.prototype = {

	update : function(){
		var ctx = this.context;

		if((this.x+this.speedX) < this.radio || ((this.x+this.speedX) > ctx.canvas.width - this.radio)){
			this.speedX *= -1;
		}

		if((this.y+this.speedY) < this.radio || ((this.y +this.speedY)> ctx.canvas.height - this.radio)){
			this.speedY *= -1;
		}

		this.x += this.speedX;
		this.y += this.speedY;

	},

	draw : function(){
		var ctx = this.context;

		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.restore();
	},

	hitAreas : function(){
		return [{x:this.x, y:this.y, width:this.radio*2, height:this.radio*2 }];
	},

	collideWith : function(sprite){
		this.color = this.colors[Math.round(Math.random()*this.colors.length)]
	}

}