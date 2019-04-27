  export function preopenFile( tempfilename, buff, preopenFileLoaded ){
    preopenFile.tempfilename = tempfilename;
//console.log('function: preopenFile(): filename='+preopenFile.tempfilename);
    var reader = new FileReader();
    reader.onload = function(evt){
//console.log('function: preopenFile(): evt.target.result.length='+evt.target.result.length);
      if (evt.target.result.length >= 16*16*8 ){ //
        var i = 0,  j = 0;
        for(var n1=0 ; n1<16 ; n1++){
          for(var n2=0 ; n2<16 ; n2++){
            for(var y=0 ; y<8 ; y++, j++){
              var c1 = evt.target.result.charCodeAt(j);
              var c2 = evt.target.result.charCodeAt(j+8);
              for(var x=0 ; x<8 ; x++){
                var p = (c2 & 1) + ((c1 & 1)<<1);
                buff[i + 7 - x] = p;
                c1 >>= 1;
                c2 >>= 1;
                // switch (p){case 0: k++;break;case 1: r++;break;case 2: g++;break;case 3: b++;break;default:o++;break;}
              } // for(var x
              i +=  16*8; // バッファの次の行へ移動
            } // for(var y
            i += (8 - 16*8*8); // バッファの次のキャラクターへ移動
            j += 8;
          } // for(var n2
          i += (16*8*8 - 16*8);
        }  // for(var n1
        preopenFileLoaded(); // この段階ではデータがバッガに読み込まれた
//console.log('function: preopenFile(): newbuff='+JSON.stringify(newbuff));
      } // if
    }
//console.log('function: preopenFile(): filename='+preopenFile.tempfilename);
    reader.readAsBinaryString(preopenFile.tempfilename);
  }

  export function clearbuff(buff,num){
    for(var i=0;i<16*16*8*8;i++){buff[i] = num;}
  }

export function parentPaletteId(child){
  var palette = 'p0';
  switch (child){
    case 'p10': case 'p11': case 'p12': case 'p13': palette = 'p1'; break;
    case 'p20': case 'p21': case 'p22': case 'p23': palette = 'p2'; break;
    case 'p30': case 'p31': case 'p32': case 'p33': palette = 'p3'; break;
  }
  return palette;
}

export function childrenId(parent){
  var palette = ['p30','p31','p32','p33'];
  switch (parent){
    case 'p0': palette = ['p00','p01','p02','p03']; break;
    case 'p1': palette = ['p10','p11','p12','p13']; break;
    case 'p2': palette = ['p20','p21','p22','p23']; break;
  }
  return palette;
}

// export function getStyleSheetValue(element, property) {
export function getColor(color){
  // const container = document.querySelector('.'+color);
  const element = document.querySelector('.'+color);
  if (!element) {
    return null;
  }
  var style = window.getComputedStyle(element);
  // var value = style.getPropertyValue('background-color');
  // return value;
  return style.getPropertyValue('background-color');
}
