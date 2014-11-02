function Animation (context){

	this.context = context;
	this.sprites = [];
	this.isPlaying = false;
}

Animation.prototype = {

	newSprite : function(sprite) {
		this.sprites.push(sprite);
	},

	play : function() {
		this.isPlaying = true;
		this.nextFrame();
	},

	pause : function() {
		this.isPlaying = false;
	},

	nextFrame : function() {
		if(!this.isPlaying){
			return;
		}

		this.cleanCanvas();

		for(var i in this.sprites){
			this.sprites[i].update();
		}

		for(var i in this.sprites){
			this.sprites[i].draw();
		}

		var animation = this;

		requestAnimationFrame(function(){
			animation.nextFrame();
		});


	},

	cleanCanvas : function(){
		var ctx = this.context;
		ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
	}

}