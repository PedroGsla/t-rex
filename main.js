//variáveis globais
var trex,bordas;
var trex_img;
var trexmorto_img;
var chao;
var chaoImg;
var chaofantasma;
var nuvem;
var cloudImg;
var cacto;
var cactoImg1, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6;
var gameOver,gameOver_Img;
var reiniciou,reiniciou_Img;
var grupoNuvem, grupoCacto;
var morteSom, checkPointSom, PuloSom;
var puntos = 0;
var PLAY = 1;
var END = 0;
var estadoJogo = PLAY;

//carregar os arquivos
function preload(){
    
    //trex.scale = 1;
    //trex_img = loadAnimation("gifs-da-turma-da-monica-0.gif");
    
    //imagens
    cloudImg = loadImage("cloud.png");
    trex_img = loadAnimation("trex1.png","trex3.png","trex4.png");
    //trexmorto_img = loadImage("")
    chaoImg = loadImage("ground2.png");
    cactoImg1 = loadImage("obstacle1.png");
    cactoImg2 = loadImage("obstacle2.png");
    cactoImg3 = loadImage("obstacle3.png");
    cactoImg4 = loadImage("obstacle4.png");
    cactoImg5 = loadImage("obstacle5.png");
    cactoImg6 = loadImage("obstacle6.png");
    gameOver_Img = loadImage("gameOver.png");
    reiniciou_Img = loadImage("restart.png");
    
    //sons
    morteSom = loadSound("Flamengo Estourado.mp3");
    checkPointSom = loadSound("Hello moto sound notification..mp3");
    PuloSom = loadSound("jump.mp3");

}



//criando objetos e suas propriedades
function setup(){
   
    createCanvas(windowWidth,windowHeight);
   // chaofantasma = createSprite(300,200,600,10);
    chao = createSprite(300,height-180,600,10);
    chao.addImage(chaoImg);
    chaofantasma = createSprite(300,height-180,600,10);
    chaofantasma.visible = false;
    
    gameOver = createSprite(width/2,height-400,100,50);
    gameOver.visible = false;
    reiniciou = createSprite(width/2,height-350,50,50);
    reiniciou.visible = false;
      trex = createSprite(50,height-180,30,70);
      trex.addAnimation("correndo",trex_img);

   bordas=createEdgeSprites();

      trex.scale = 0.6;

    grupoNuvem = new Group();
    grupoCacto = new Group();

    gameOver.addImage(gameOver_Img);
    gameOver.scale = 0.7;
    //
    reiniciou.addImage(reiniciou_Img);
    reiniciou.scale = 0.5;
}
function draw(){
    background("white");

  //puntos k
  textSize(12);
  textFont("arial black");
  text("Pontos:"+puntos,width-110,height-610);
   
  //Estados kapa
  if(estadoJogo === PLAY){
    console.log("za warudo")
    //puntos correndo
    puntos = puntos + Math.round(frameCount/60);

    //chao movimento kk
    chao.velocityX = -7;
    //pulo
    if(touches.length > 0 || keyDown("space") && trex.y > 130){
        trex.velocityY  = -10;
        PuloSom.play();
        touches=[];
    }
    if(puntos > 0 && puntos % 200 === 0){
       checkPointSom.play();
    }
    //grupos
   gerarNuvem();
   gerarCacto(); 
   //muda o estado
   //bate bate
   if(grupoCacto.collide(trex)){    
    estadoJogo = END;
    morteSom.play();

}
  if(estadoJogo === END){
    console.log("perdeu kk")
    chao.velocityX = 0;
    //parar no lugar se perder
      grupoCacto.setVelocityXEach(0);
      grupoNuvem.setVelocityXEach(0);
      grupoNuvem.setLifetimeEach(-1);
      grupoCacto.setLifetimeEach(-1);
      gameOver.visible = true;
      reiniciou.visible = true;
      puntos = 0;
    } 
}
   if (mousePressedOver(reiniciou)){
     console.log("reiniciou!")
     reset();
   }
    

 //mais chao kk
 if(chao.x < 0){
    chao.x = chao.width/2;
 }
  
    
  //graviti
trex.velocityY = trex.velocityY + 0.5;
    drawSprites();
    //chão fantasma 
    trex.collide(chaofantasma);
   num1 = random(1,100);
   //console.log(frameCount);
}
    function gerarNuvem(){
    if(frameCount%60 === 0){
    var nuvem = createSprite(width-50,random(20,60),50,10);
    nuvem.addImage(cloudImg); 
    nuvem.scale = 0.8;
    nuvem.velocityX = -3;
    nuvem.depth = trex.depth;
    grupoNuvem.add(nuvem);

    trex.depth = trex.depth +1;
    nuvem.lifetime = width/2;
    }
    }
    function gerarCacto(){
    if(frameCount%90 === 0){
    var cacto = createSprite(width-50,height-200,40,60); 
    cacto.addImage(cactoImg1);
    cacto.velocityX = - (6 + cacto/100);
    cacto.velocityX = -4;
    cacto.scale = 0.7;
    //gerar cacto aleatorio
    var num = Math.round(random(1,6));
    switch(num){
        case 1: cacto.addImage(cactoImg1);
        break;

        case 2: cacto.addImage(cactoImg2);
        break;

        case 3: cacto.addImage(cactoImg3);
        break;

        case 4: cacto.addImage(cactoImg4);
        break;

        case 5: cacto.addImage(cactoImg5);
        break;

        case 6: cacto.addImage(cactoImg6);
        break;
    }
    cacto.depth = trex.depth = -1;
    grupoCacto.add(cacto);
    cacto.lifetime = width/2;
    }

    }

function reset(){
 estadoJogo = PLAY;
 gameOver.visible = false;
 reiniciou.visible = false;
 grupoCacto.destroyEach();
 grupoNuvem.destroyEach();
 
}







