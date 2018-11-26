//PRIYANKA SINGH
//DATA VIZ Project 1
//NOV 25 2018

var worldmapimg; // world map
var USAmapimg;//US MAP
var clat = 0;
var clon =0;
var ww = 1024;
var hh = 512;
var zoom = 1;
var weather; // for accessing url data
var lat;
var lon;
var x;
var y;
var d;
var town;
var input;
var cx;
var cy;
var r;
var g;
var b;


 var api= "https://api.openweathermap.org/data/2.5/weather?q=";
 var apikey= "&appid=ccdc6f53ecbaaa5acf18c0a7f4b0e623";
 var unit = '&units=metric';

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  worldmapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoicHJpeWFua2EyNiIsImEiOiJjam9zMDVsZmowbGZuM3BydmpwYWtsaTF1In0.IA8Aeh9godtirGZOBXZalw'); 
    
    USAmapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-95,37,3.4/1024x512?access_token=pk.eyJ1IjoicHJpeWFua2EyNiIsImEiOiJjam9zMDVsZmowbGZuM3BydmpwYWtsaTF1In0.IA8Aeh9godtirGZOBXZalw')
         
    }

// web mercator projection formulaes, from wikipedia

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  
  createCanvas(ww, hh);
  translate(width / 2, height / 2); // TO ENSURE MAP CENTER AND CANVAS CENTER COINCIDES
  imageMode(CENTER);
  image(worldmapimg, 0, 0);


input = select('#town'); 
var button = select('#submit');
button.mousePressed(askTemp);

var button = select('#Country');
button.mousePressed(USA);
  

}

function USA(){
  
  image(USAmapimg, 0, 0);
  
   clon= -95;
   clat= 37;
   zoom = 3.4;
   
  
  }

  
function askTemp(){
  
  var url = api+input.value()+apikey+unit; // URL FOR OPEN WEATHER DATA
  
  loadJSON(url,gotdata); // ASYNCHRONOUS FUNCTION LOAD FOR URL
  
  
  // computation based on the url JSON file starts here
  // corresponding to the url location temp and lat long are defined into variables d, lat, lon
  
   cx= mercX(clon); // map center longitude value converted to canvass co-ordinate system
   cy= mercY(clat); // map center lattitude value converted to canvass co-ordinate system
   
   x= mercX(lon)- cx; 
   y= mercY(lat)- cy;
  
          
     stroke(0);
     
     if (d<0){
     r=229;
     g=204;
     b=255;
   }
   
     
     if ((d>10) && (d<25)){
     r=0;
     g=255;
     b=0;
   }
   
   
   if ((d<10)&&(d>0)){
     r=0;
     g=255;
     b=255;
   }
   
   if (d>25){
     r=255;
     g=0;
     b=0;
   }
   
     fill (r,g,b,200);
     text (d,x +5,y);
     
     fill (255,255,0)
     ellipse(x, y, 6, 6);
      
    // text(clat,0,0);
    // text(clon,0,10);
    //text(zoom,0,20);

     
}

function gotdata(data) {
  
weather = data;

d =weather.main.temp;
lat = weather.coord.lat; // lattitude
lon = weather.coord.lon; // longitude
   
     


}


function draw() {
    
translate(width / 2, height / 2); // do not delete this line, the code doesn't work without this ???????
  
  


   }
   
   
