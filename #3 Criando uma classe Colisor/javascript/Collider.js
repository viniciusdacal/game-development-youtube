function Collider() {
   
   this.sprites = [];
   this.onCollide = null;
   this.garbage = [];

}


Collider.prototype = {
   newSprite: function(sprite) {
      this.sprites.push(sprite);
      sprite.collider = this;
   },
   run: function() {
      // Inicio com um objeto vazio
      var tested = new Object();

      for (var i in this.sprites) {
         for (var j in this.sprites) {
            // Não colidir um sprite com ele mesmo
            if (i == j) continue;

            // Gerar strings únicas para os objetos
            var id1 = this.uniqueId(this.sprites[i]);
            var id2 = this.uniqueId(this.sprites[j]);

            // Criar os arrays se não existirem
            if (! tested[id1]){
              tested[id1] = []; 
            } 

            if (! tested[id2]){
              tested[id2] = []; 
            } 

            
            if (! (tested[id1].indexOf(id2) >= 0 || tested[id2].indexOf(id1) >= 0) ) {
   
               this.collideTest(this.sprites[i], this.sprites[j]);
               
               tested[id1].push(id2);
               tested[id2].push(id1);
            }
         }
      }
      
      this.collectGarbage();
   },
   collideTest: function(sprite1, sprite2) {
      
      var hitAreas1 = sprite1.hitAreas();
      var hitAreas2 = sprite2.hitAreas();

      // Testar as colisões entre as areas
      collisions:
      for (var i in hitAreas1) {
         for (var j in hitAreas2) {
            
            if (this.isCollidingHitAreas(hitAreas1[i], hitAreas2[j])) {
               sprite1.collideWith(sprite2);
               sprite2.collideWith(sprite1);
               
               if (this.onCollide){
                 this.onCollide(sprite1, sprite2); 
               } 
               
               break collisions;
            }
         }
      }
   },
   isCollidingHitAreas: function(hitA1, hitA2) {
      // testa colisão
      return (hitA1.x + hitA1.width) > hitA2.x &&
             hitA1.x < (hitA2.x + hitA2.width) &&
             (hitA1.y + hitA1.height) > hitA2.y &&
             hitA1.y < (hitA2.y + hitA2.height);
   },
   uniqueId: function(sprite) {
      var str = '';
      var hitAreas = sprite.hitAreas();

      for (var i in hitAreas) {
         str += 'x:' + hitAreas[i].x + ',' +
                'y:' + hitAreas[i].y + ',' +
                'l:' + hitAreas[i].width + ',' +
                'a:' + hitAreas[i].height + '\n';
      }

      return str;
   },
   deleteSprite: function(sprite) {
      this.garbage.push(sprite);
   },
   collectGarbage: function() {
   
      var newList = [];
      
      for (var i in this.sprites) {
         if (this.garbage.indexOf(this.sprites[i]) == -1)
            newList.push(this.sprites[i]);
      }
      
      this.garbage = [];
      
      this.sprites = newList;
   }
}