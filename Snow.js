  
class Snow{
    constructor(x,y,angle){
        var options = {
            restitution : 0.6,
            friction : 0.1,
            density:0.03
            
        }
    this.x=x;
    this.y=y;
    this.image= loadImage("snow5.webp");
    this.body = Bodies.circle(this.x,this.y,40,50,20,options);
    this.radius = 40;
    this.lifetime=100;
    World.add (world,this.body);
    }
    
    changePosition(){
        if(this.body.position.y > height){
        Matter.Body.setPosition(this.body,{x:random(0,1500),y:random(0,10)});
        }
        }
    display(){
        push();
        
        var pos = this.body.position;
        var angle = this.body.angle;
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.radius,this.radius);
    pop();
    }
}