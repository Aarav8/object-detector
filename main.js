object=[];
check="";
function Start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status-Detecting Object";
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.position(600,275);

    video=createCapture(VIDEO);
    video.size(360,360);
    video.hide();
}
function draw()
{
    image(video,0,0,380,380);
    document.getElementById("no_of_objects").innerHTML="No. of objects detected is : "+object.length;
    if(check=="true")
    {
        r=Math.random(255);
        g=Math.random(255);
        b=Math.random(255);

        objectDetector.detect(video,gotResults);

        document.getElementById("status").innerHTML="Object Detected";
        for(i=0;i<object.length;i++)
        {
                fill(r,g,b);
                persentage=Math.floor(object[i].confidence*100);
                text(object[i].label+" "+persentage+"%",object[i].x,object[i].y);
                noFill();
                stroke(r,g,b);
                rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }

}
function modelLoaded()
{
    console.log("Model Loaded!");
    objectDetector.detect(video,gotResults);
}
function gotResults(error,results) 
{
    if (error) 
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        object=results;
        check="true";
    }
}
