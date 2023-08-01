document.addEventListener("DOMContentLoaded",()=>{

  const canvas = document.getElementById("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  const ctx = canvas.getContext("2d");


  const acl = new Accelerometer({ frequency: 10 });
  acl.addEventListener("reading", () => {
    ripples.forEach((r)=>{
      r.setForce(acl.z/10);
    });
  });

  acl.start();

  class Ripple {
    constructor(x,y,r){
      this.x = x;
      this.y = y;
      this.r = r;
      this.vz = 0;
      this.az = 0;
    };

    setForce(force){
      this.az = force;
    }

    update(){
      this.az *= 0.98;
      this.vz += this.az;
    }

    draw(ctx){
      ctx.strokeStyle = "rgba(0, 0, 255, 50)"; ;
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r+this.vz, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
  
  const ripples = [];

  for(var i=36;i>0;i--){
    ripples.push(new Ripple(canvas.width/2, canvas.height/2, i*35));
  }

  

  function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    ripples.forEach((r)=>{
      r.update();
      r.draw(ctx);
    });
    
    window.requestAnimationFrame(animate);
  }

  animate()

})