function Animation (context){

	this.context = context;
	this.sprites = [];
	this.tasks = [];
	this.isPlaying = false;
	this.tasks = [];
   	this.spriteGarbage = [];
   	this.taskGarbage = [];
   	
   
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

		for(var i in this.tasks){
			this.tasks[i].run();
		}

		this.collectGarbage();


		var animation = this;

		requestAnimationFrame(function(){
			animation.nextFrame();
		});


	},

	cleanCanvas : function(){
		var ctx = this.context;
		ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
	},
	newTask: function(task) {
      this.tasks.push(task);
      task.animation = this;
   	},
	
	deleteSprite: function(sprite) {
	  this.spriteGarbage.push(sprite);
	},
	
	deleteTask: function(task) {
	  this.taskGarbage.push(task);
	},
	
	collectGarbage: function() {
	  // Criar novos arrays
	  var newSprites = [];
	  var newTasks = [];
	  
	  // Adicionar somente se não constar no array de excluídos
	  for (var i in this.sprites) {
	     if (this.spriteGarbage.indexOf(this.sprites[i]) == -1)
	        newSprites.push(this.sprites[i]);
	  }
	  
	  for (var i in this.tasks) {
	     if (this.taskGarbage.indexOf(this.tasks[i])
	         == -1)
	        newTasks.push(this.tasks[i]);
	  }
	  
	  // Limpar os arrays de exclusões
	  this.spriteGarbage = [];
	  this.taskGarbage = [];
	  
	  // Substituir os arrays velhos pelos novos
	  this.sprites = newSprites;
	  this.tasks = newTasks;
	}

}