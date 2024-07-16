img="";
status="";
song="";
objects=[];
function preload(){
   
   song=loadSound("calming.mp3");
}

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
  

}

function modelLoaded(){
    console.log("model has loaded. Currently there are bugs with the ml5 library. So there will be an error below me");
    status=true;
    
}

function start(){
    objectDetect=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status - BE PATIENT! I'm working on it!";
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);  
    objects=results;

}

function draw(){
    image(video,0,0,380,380);

    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetect.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status - I got you answers.";
            if(objects[i].label === "person"){
                document.getElementById("numberOfObjects").innerHTML="Human has been detected"; 
                song.stop();
            }
            else{
                console.log('missing')
                document.getElementById("numberOfObjects").innerHTML="THE HUMAN HAS ESCAPED. PANIC";
                song.play();
                //song.volume(1);
            }
            if(objects.length===0){
                document.getElementById("numberOfObjects").innerHTML="THE HUMAN HAS ESCAPED. PANIC";
                song.play();
                //song.volume(1);   
                console.log('missing') 
            }
            
            fill(r,g,b);
            textSize(20);
            confidence=floor(100*objects[i].confidence);
            //confidence=floor(Math.random(60,100)*100); hehe this is funny. Saving for future me
            text(objects[i].label+" "+confidence+"% ",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
   
}