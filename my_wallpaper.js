//your parameter variables go here!
let rect_width  = 1;//pixel size(better not change it)
let rect_height = 1;
let r_data = Math.floor((Math.random()*100)+1);;//random choose a base rgb color from 1-100
let g_data = Math.floor((Math.random()*100)+1);;
let b_data = Math.floor((Math.random()*100)+1);;
let r_pointer = true;//rgb number gradient pointer(if true->raise;false->down)
let g_pointer = true;
let b_pointer = true;
let gradient_counter = 0;
let gradient_limit = 100;//how many times you draw the pixel then change the gradient degree?(doesn't change so much, this is just for test and fun)
let offset = 2;//color change offset(desire the degree of color change)


function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.resolution(FIT_TO_SCREEN);
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