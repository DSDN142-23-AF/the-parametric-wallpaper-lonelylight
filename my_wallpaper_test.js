//your parameter variables go here!
let rect_width  = 1;
let rect_height = 1;
let r_data = 150;
let g_data = 150;
let b_data = 150;
let r_pointer = true;
let g_pointer = true;
let b_pointer = true;
let gradient_counter = 0;



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
  strokeWeight(0);
  fill(r_data,g_data,b_data);
  rect(0,0,rect_width,rect_height);
  generate_color(0,0,r_data,g_data,b_data,true);
}

function randompointer(){
  if(Math.random()>0.5){
    return true;
  }else{
    return false;
  }
}

function gradient(int,boolean){
  if(boolean){
    return int++;
  }else{
    return int--;
  }
}

function generate_color_baseline(x,y,r,g,b,line_axis){//line_axis:true-row, false-column;
  if(line_axis){
    if(gradient_counter<10&&x<200&&y<200){
      rgbcheck();
      r_data = gradient(r_data,r_pointer);
      g_data = gradient(g_data,g_pointer);
      b_data = gradient(b_data,b_pointer);
      fill(r_data,g_data,b_data);
      rect(x+1,y,rect_width,rect_height);
      generate_color(x+1,y,r_data,g_data,b_data,true);
      generate_color(x,y+1,r_data,g_data,b_data,false);
      gradient_counter++;
    }else if(x<200&&y<200){
      gradient_counter=0;
      r_pointer = randompointer();
      g_pointer = randompointer();
      b_pointer = randompointer();
    }
  }else{
    if(gradient_counter<10&&x<200&&y<200){
      rgbcheck();
      r_data = gradient(r_data,r_pointer);
      g_data = gradient(g_data,g_pointer);
      b_data = gradient(b_data,b_pointer);
      fill(r_data,g_data,b_data);
      rect(x,y+1,rect_width,rect_height);
      generate_color(x,y+1,r_data,g_data,b_data,false);
      gradient_counter++;
    }else if(x<200&&y<200){
      gradient_counter=0;
      r_pointer = randompointer();
      g_pointer = randompointer();
      b_pointer = randompointer();
    }
  }
    
  
  

}

function rgbcheck(){
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