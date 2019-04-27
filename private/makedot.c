#include <stdio.h>

int main(int argc,char **argv){
  int x, y;
  char m[3],n[3];
  for(y=0 ; y<16 ; y++){
    sprintf(m,"%02d",y);
    for(x=0 ; x<16 ; x++){
      sprintf(n, "%02d",x);
      printf("<div onClick={this.clickedDot} id=\"d%s%s\" className=\"dotStyle\"></div>\n", m, n);
    }
  }
  return 0;
}

