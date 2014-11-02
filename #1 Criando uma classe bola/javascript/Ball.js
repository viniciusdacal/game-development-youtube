function Ball(context){
	this.context = context;
	this.x = 10;
	this.y = 10;
	this.speedX = 10;
	this.speedY = 10;
	this.color = 'black';
	this.radio = 5;

}

Ball.prototype = {

	update : function(){
		var ctx = this.context;

		if(this.x < this.radio || (this.x > ctx.canvas.width - this.radio)){
			this.speedX *= -1;
		}

		if(this.y < this.radio || (this.y > ctx.canvas.height - this.radio)){
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
	}
}