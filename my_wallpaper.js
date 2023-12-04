//your parameter variables go here!
let rect_width  = 1;//pixel size(better not change it)
let rect_height = 1;
let r_data = Math.floor(Math.random()*255);;//random choose a base rgb color from 0-255
let g_data = Math.floor(Math.random()*255);;
let b_data = Math.floor(Math.random()*255);;
let r_pointer = true;//rgb number gradient pointer(if true->raise;false->down)
let g_pointer = true;
let b_pointer = true;
let gradient_counter = 0;
let gradient_limit = 100;//how many times you draw the pixel then change the gradient degree?(doesn't change so much, this is just for test and fun)
let offset = 2;//color change offset(desire the degree of color change)
//note: this vars do not need to change, every time you generate a picture is different, whatever you changed variables will not make so many difference.
//fun things: looks like the wallpaper generater will draw 12*5 each time, not just copy and paste same things.
//so this mean i make a wall paper that got each cell is different, randomize works very well.


function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(NINE_LANDSCAPE);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 50;
}

function wallpaper_background() {
  background(240, 255, 240); //light honeydew green colour
}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  noStroke();//turn off the stroke, we need to make a color fall.
  fill(r_data,g_data,b_data);
  rect(0,0,rect_width,rect_height);
  generate_color(0,0,r_data,g_data,b_data,true);//start the color fall
  // default: 6 petals per ring max, base ring is deep green(like a sepal), with max 7 layers.
  //stroke(1);//for debug
  petal_generater(Math.random()*3+2,Math.random()*200,Math.random()*200,Math.random()*10+100,Math.random()*10+20,0,128,0,Math.random()*4+3)//start the flower
}

function randompointer(){
  //reset the pointer by random
  if(Math.random()>0.5){
    return true;
  }else{
    return false;
  }
}

function gradient(color,pointer_c){
  //gradient color by pointer,eg. if pointer true color goes up.
  if(pointer_c){
    return color+=offset;
  }else{
    return color-=offset;
  }
}

function generate_color(x,y,r,g,b,line_axis){//line_axis:true-row, false-column;
  //draw different color line by recursion, stop if reach the bound
  if(line_axis){//check where it goes
    if(gradient_counter<gradient_limit&&x<200&&y<200){//check if out bound
      rgbcheck();//check if rgb out of bound
      r_data = gradient(r_data,r_pointer);//gradient the color
      g_data = gradient(g_data,g_pointer);
      b_data = gradient(b_data,b_pointer);
      fill(r_data,g_data,b_data);
      generate_color(x+1,y,r_data,g_data,b_data,true);
      generate_color(x,y+1,r_data,g_data,b_data,false);
      gradient_counter++;
      rect(x+1,y,rect_width,rect_height);//draw pixel right side and down side
      rect(x,y+1,rect_width,rect_height);
      
    }else if(x<200&&y<200){//if in bound
      gradient_counter=0;//reset the counter and randomize the color pointer
      r_pointer = randompointer();
      g_pointer = randompointer();
      b_pointer = randompointer();
    }
  }else{
    if(gradient_counter<gradient_limit&&x<200&&y<200){
      rgbcheck();
      r_data = gradient(r_data,r_pointer);
      g_data = gradient(g_data,g_pointer);
      b_data = gradient(b_data,b_pointer);
      fill(r_data,g_data,b_data);
      rect(x-1,y,rect_width,rect_height);
      rect(x,y+1,rect_width,rect_height);
      generate_color(x,y+1,r_data,g_data,b_data,false);
      gradient_counter++;//tips: if you disable this line, something will goes intersting.(like odd fat tv in 1980s)
    }else if(x<200&&y<200){
      gradient_counter=0;
      r_pointer = randompointer();
      g_pointer = randompointer();
      b_pointer = randompointer();
    }
  }
}

function rgbcheck(){
  //check if rgb number is out of bound(<0 or >255)
  if(r_data>250){
    r_pointer = false;
  }
  if(r_data<5){
    r_pointer = true;
  }
  if(g_data>250){
    g_pointer = false;
  }
  if(g_data<5){
    g_pointer = true;
  }if(b_data>250){
    b_pointer = false;
  }
  if(b_data<5){
    b_pointer = true;
  }
}

//lets draw a flower, first we need to know circle math: get the xy by degree
function get_location_x(x,r,a){
  return x+r*Math.cos(a*Math.PI/180);
}
function get_location_y(y,r,a){
  return y+r*Math.sin(a*Math.PI/180);
}

//then we make a random petal generater, we desire a flower have 1-6 petals, know we need to get the petal function.
//so, a flower's petal is inward contracted, we need a funtion that generate a random number is smaller than given number.
function random_small(number){
  return Math.round(Math.random()*(number/2)+number/3);
}
//we need a petal drawing function by recurtion.
function petal_generater(number,x,y,rd,r_ring,r,g,b,layer){//number:petal number, rd= radius from *last* petals, r_ring = how large the petal rings from *last* petal rings.
  if(layer>0){
    layer--;
  let radius = random_small(rd);//this petal rings radius
  let radius_ring = random_small(r_ring);//this petal rings radius
  fill(r,g,b);
  for(var i=1;i<number+1;i++){
    circle(get_location_x(x,radius_ring,360/number*i),get_location_y(y,radius_ring,180/number*i),radius);//draw circle by angle
  }
  petal_generater(Math.round(Math.random()*5+1),x,y,radius,radius_ring,Math.random()*255,Math.random()*255,Math.random()*255,layer)//generate next flower
  }
}