document.addEventListener("DOMContentLoaded",()=>{

  const canvas = document.getElementById("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  const ctx = canvas.getContext("2d");


  const acl = new Accelerometer({ frequency: 30 });
  acl.addEventListener("reading", () => {
    console.log(acl.x,acl.y,acl.z);
  });

  acl.start();

  class Ripple {
    constructor(x,y,r){
      this.x = x;
      this.y = y;
      this.r = r;
      this.z = 0;
    };

    move(){
      this.z = acl.z*2
    }

    draw(ctx){
      ctx.strokeStyle = "white";
      ctx.fillStyle = "blue";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r+this.z, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }
  
  const ripples = [];

  for(var i=36;i>0;i--){
    ripples.push(new Ripple(canvas.width/2, canvas.height/2, i*35));
  }

  

  function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    ripples.forEach((r)=>{
      r.move();
      r.draw(ctx);
    });
    
    window.requestAnimationFrame(animate);
  }

  animate()

})