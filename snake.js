//global var

class Jugador{
    constructor(nombre, score, velocidad){
        this.nombre=nombre
        this.score=score
        this.velocidad=velocidad
    }
    /*
    aumentarVelocidad(){
        if(jugador.score>20){
            return this.velocidad
        }else if(jugador.score<=20){
            return this.velocidad/2
        }
    }
    */
}


let jugador=new Jugador("Juan", 0,140)

var velocidad=jugador.velocidad

let tamano= 10;


let newScore=0

var maximos=[]

var cvHeight, cvWidth 

var ctx;

//cambiar borde
var fondo
window.onload=function(){
    let canvas=document.getElementById("canvas");
    Swal.fire({
        title:"Bienvenido",
        text:"Usa las teclas ⬆️⬇️➡️⬅️ para moverte.",
        backdrop:"red",
        
        
    })
    var score=0;
}


/*-----------*/


function dibujar(){
    //let canvas=document.getElementById("canvas");
    
    ctx = canvas.getContext("2d"); //contexto gráfico
    if(window.innerWidth>991.98){
        canvas.height=window.innerHeight*0.7
        canvas.width=window.innerWidth*0.5
        cvHeight=window.innerHeight*0.7
        cvWidth=window.innerWidth*0.5
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }else{
        canvas.height=window.innerHeight*0.5
        canvas.width=window.innerWidth*0.9
        cvHeight=window.innerHeight*0.5
        cvWidth=window.innerWidth*0.9
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }
    /*
    canvas.height=window.innerHeight*0.5
    canvas.width=window.innerWidth*0.9
    cvHeight=window.innerHeight*0.5
    cvWidth=window.innerWidth*0.9
    ctx.clearRect(0,0, canvas.width, canvas.height);
    */
    
    //dibujo
    cabeza.dibujar(ctx);
    comida.dibujar(ctx);
    //especial.dibujar(ctx);
}
    



function main(){
    
    //velocidad=aumentarVelocidad()
    choqueCuerpo();
    choquePared();
    dibujar();
    movimiento();
    /*
    if(cabeza.choque(comida)){
        comida.colocar();
        cabeza.meter();
        navigator.vibrate(100)
        jugador.score+=10
        canvas.classList.remove("borde-nuevo")
        especial.borrar(ctx)
    }else if(cabeza.choque(especial)){
        especial.colocar()
        cabeza.meter();
        navigator.vibrate(300)
        jugador.score+=20
        canvas.classList.remove("borde-nuevo")
        //canvas.style.bgColor="red"
    }
    */
    if(cabeza.choque(comida)){
        comida.colocar();
        cabeza.meter();
        navigator.vibrate(100)
        jugador.score+=10
        canvas.classList.remove("borde-nuevo")
        especial.borrar(ctx)
    }else if(jugador.score%50==0 && jugador.score>0){
        especial.dibujar(ctx)
        if(cabeza.choque(especial)){
            especial.colocar()
            cabeza.meter();
            navigator.vibrate(300)
            jugador.score+=20
            canvas.classList.remove("borde-nuevo")
        }
    }
    /*
    if(cabeza.choque(comida) || cabeza.choque(especial)){
        comida.colocar();
        especial.colocar()
        cabeza.meter();
    }
    */
    
    document.getElementById ("score").innerHTML="Score: "+jugador.score;
    document.getElementById("new-score")
}
/*
function obtenerScore(){
    var contscore=jugador.score
    return contscore
}
function aumentarVelocidad(){
    var vel=jugador.velocidad
    return vel
}
*/
function up(){
    if(ejex){
        ydir=-tamano;
        xdir=0;
            
        ejex=false;
        ejey=true;
        }
}

function down(){
    if(ejex){
        ydir=tamano;
        xdir=0;
            
        ejex=false;
        ejey=true;
        }
    
}

function left(){
    if(ejey){
        ydir=0;
        xdir=-tamano;
            
        ejex=true;
        ejey=false;
    }
}

function right(){
    if(ejey){
        ydir=0;
        xdir=tamano;
            
        ejex=true;
        ejey=false;
    }
}




function control(event){
    var cod=event.keyCode;
    
    if(ejex){
        if(cod==38){ //arriba
            ydir=-tamano;
            xdir=0;
            
            ejex=false;
            ejey=true;
        }
        if(cod==40){ //abajo
            ydir=tamano;
            xdir=0;
            
            ejex=false;
            ejey=true; 
        }
        
        
    }
    if(ejey){
        if(cod==37){ //derecha
            ydir=0;
            xdir=-tamano;
            
            ejex=true;
            ejey=false; 
        }
        if(cod==39){ //izquierda
            ydir=0;
            xdir=tamano;
            
            ejex=true;
            ejey=false; 
        }
        
    }
}



function finDeJuego(){
    navigator.vibrate(500)
    Swal.fire({
        title:"Perdiste!",
        text:"Tu puntaje "+jugador.score,
    })
    xdir=0;
    ydir=0;
    ejex=true;
    ejey=true;
    cabeza= new Cola(20,20);
    comida= new Comida();
    especial.borrar(ctx)
    maxscore()
    
    //alert("Perdiste \n Tu puntaje es: "+jugador.score);
    jugador.score=0
    canvas.classList.remove("borde-nuevo")
}

function maxscore(){
    maximos.push(jugador.score)
    document.getElementById("new-max").innerHTML=Math.max(...maximos)
}

function choqueCuerpo (){
    let temp=null;
    
    try{
      temp=cabeza.verSiguiente().verSiguiente();   //el primer verSiguiente da null
    }catch(err){
       temp=null;
    }
    
    while(temp != null){
        if(cabeza.choque(temp)){
    
            finDeJuego();
        }else{
            temp=temp.verSiguiente();
        }
    }
}

function choquePared (){
    if (cabeza.x <0 || cabeza.x >= canvas.width  || cabeza.y <0 || cabeza.y >= canvas.height){
        finDeJuego();
    }
}
setInterval("main()",velocidad)
//setInterval("especial.dibujar(c, 5000)

class objeto{
    constructor(){
        this.tamano=tamano;
    }
    
    choque(obj) {
        let difx = Math.abs(this.x - obj.x);
        let dify = Math.abs(this.y - obj.y);
        
        if(difx >=0 && difx < tamano && dify >=0 && dify < tamano){
            return true;
        }else{
            return false
        }
    }
}

class Cola extends objeto {
    constructor(x,y){
        super();
        this.x=x;
        this.y=y;
        this.siguiente=null
    }
    dibujar(ctx){
        if(this.siguiente !=null){
            this.siguiente.dibujar(ctx);
        }
        ctx.fillStyle="#4EC5D9";       
        ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
    }
    
    setxy(x,y){
        
        if(this.siguiente !=null){
            this.siguiente.setxy(this.x, this.y);
        }
        
        this.x=x;
        this.y=y;
        
    }
    
    meter(){
        if(this.siguiente ==null){
            this.siguiente=new Cola(this.x, this.y);
            //score=score+10
        }else{
            this.siguiente.meter();
        }
    }
    verSiguiente(){
        return this.siguiente;
    }
}

class Comida extends objeto{
    constructor(){
        super();
        
        this.x = this.generar();
        this.y= this.generar();
    }
    generar(){
        var ancho;
        
        if(window.innerWidth>991.98){
            ancho=window.innerWidth*0.4*0.10
            let num = Math.floor(Math.random()*ancho)*10;
            return num
        }else{
            let num = Math.floor(Math.random()*29)*10;
            return num
        }
        
       /*
        let num = Math.floor(Math.random()*29)*10;
        return num
        */
    }
    colocar(){
        this.x = this.generar();
        this.y= this.generar();
        
        
        
    }
    dibujar(ctx){
        ctx.fillStyle="lime"
        //ctx.strokeStyle="#000"
       // ctx.strokeRect(this.x, this.y, this.tamano, this.tamano);
        
        ctx.shadowColor = "lime";
        ctx.shadowOffsetX = 0;   
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15;
        
        ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
        
    }
    
}

class ComidaEspecial extends Comida{
    constructor(x,y){
        super(x,y)
    }
    
    dibujar(ctx){
        /*
        if(jugador.score%50==0 && jugador.score>0){
        ctx.fillStyle="red"
        ctx.shadowColor = "tomato";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15;
        
        ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
        canvas.classList.add("borde-nuevo")
        }
        */
        ctx.fillStyle="red"
        ctx.shadowColor = "tomato";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15;
        
        ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
        canvas.classList.add("borde-nuevo")
        
    }
    borrar(ctx){
        ctx.clearRect(this.x, this.y, this.tamano, this.tamano);
    }
    
}


//objetos del juego
    
let cabeza=new Cola(50,50);
let comida = new Comida();
let especial = new ComidaEspecial()


let ejex=true;
let ejey=false;
let xdir=0;
let ydir=0;

function movimiento(){
    let nx=cabeza.x+xdir;
    let ny=cabeza.y+ydir;
    cabeza.setxy(nx,ny);
}

