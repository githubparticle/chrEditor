import React from 'react';
import PropTypes from 'prop-types';
import {getColor} from './function.js';

export default class CanvasComponent extends React.Component {
  styles(){
    return {
      canvasStyle: {
      }, displayCanvas: {
      }, editCanvas: {
        float: 'left'
      }, previewCanvas: {
      }
    }
  }
        // width: '128px',
        // height: '128px',


  constructor(props, context){
// console.log(props.name+': CanvasComponent: constructor(props, context)');
    super(props, context);
    const palettes = props.palettes;
    this.state = {
      width: props.width,
      height: props.height,
      times: props.times,
      palette: palettes[0],
    }
//console.log(this.props.name+': CanvasComponent: constructor(props, context) : (sw, sh)=('+this.state.width+', '+this.state.height+')');
    this.point = this.point.bind(this);
    this.clicked = this.clicked.bind(this);
  }


  componentDidMount(props){ this.updateCanvas(props); }
  UNSAFE_componentWillReceiveProps( nextProps ) { if ( this.props !== nextProps ) { this.updateCanvas(this.props); } }
  componentDidUpdate(props){ this.updateCanvas(props); }


  clicked(e){
    const rect = e.target.getBoundingClientRect();
    var x = Math.floor((e.clientX - rect.left)/this.props.times/8);
    var y = Math.floor((e.clientY - rect.top)/this.props.times/8);
    const ox = this.props.offsetx;
    const oy = this.props.offsety;
//console.log("CanvasComponent: clicked(e)=("+x+", "+y+")");
    if(((ox != x) && ((ox+1) != x)) || ((oy != y) && ((oy+1) != y)) ){
      if(x > 14){x=14}
      if(y > 14){y=14}
      this.props.actionOffset(x, y);
      this.updateCanvas();
    }
  }

  point(x,y){
//console.log("CanvasComponent: point(x,y)=("+x+", "+y+")");
    const times = this.state.times;
    const { canvas } = this;
    const context = canvas.getContext('2d');
    // const selectedPalette = this.props.selectedPalette; // パレットの全てのデータ
    context.fillStyle = this.props.selectedPalette['selectedColor'];
    const x2 = 0; // ダミー
    const y2 = 0; // ダミー
    context.fillRect(x2+x, y2+y, times, times);
  }

  updateCanvas(){
// console.log(this.props.name+': CanvasComponent: updateCanvas()');
    const { canvas } = this;
    const context = canvas.getContext('2d');
    var i = 0;
    const buff = this.props.buff;
    // const palettes = this.props.palettes;

    const times = this.state.times;
// console.log(this.props.name+': CanvasComponent: updateCanvas(): times='+times);
// console.log(this.props.name+': CanvasComponent: updateCanvas():  firstpixel='+buff[0]);
    const BUFF_NEXTCHAR = 16*8*8;
    const BUFF_NEXTLINE = 16*8;
    const X_NEXT = 8*times;
    const Y_NEXT = 8*times;
    const NEXT_LINE = 256 / times;
    const LAST_LINE = 256;
// var k = 0, r = 0, g = 0, b = 0, o = 0;
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 255, 0, 0.5)';
    context.setLineDash([1, 2]);
    const selectedPalette = this.props.selectedPalette; // 選ばれたパレットなど
    const selectedPalettesId = selectedPalette['selectedPalettesId']; // 選ばれていたパレットグループのid
    const selectedPalettes = this.props.palettes; // パレットの全てのデータ
    const palettes = selectedPalettes[selectedPalettesId]; // 選ばれているパレットのデータ
    const colors = [];
    for (var p of palettes){
      // const container = document.querySelector('.'+p);
      // colors.push(getStyleSheetValue(container, 'background-color'));
      colors.push(getColor(p));
    }
//console.log(this.props.name+': CanvasComponent: updateCanvas(): for(){');
    for(var n1=0, y2 = 0, xy = 0 ;n1<16 ; n1++, y2 += Y_NEXT, xy += NEXT_LINE){
// console.log(this.props.name+': CanvasComponent: updateCanvas(): y2='+y2);
      var tempi1 = i;
      for(var n2=0, x2 = 0 ; n2<16 ; n2++, x2 += X_NEXT ){
// console.log(this.props.name+': CanvasComponent: updateCanvas(): (x2,y2)=( '+x2+', '+y2 +' )');
        var tempi2 = i;
        for(var y=0 ; y<8*times ; y+=times){
          for(var x=0 ; x<8*times ; x+=times, i++){
            var rgb = buff[i];
            switch (rgb){
              case 0: context.fillStyle = colors[0]; break;
              case 2: context.fillStyle = colors[2]; break;
              case 1: context.fillStyle = colors[1]; break;
              case 3: context.fillStyle = colors[3]; break;
              default: context.fillStyle = 'red'; break;
            } // switch (rgb){
            context.fillRect(x2+x, y2+y, 10,10); //times, times);
          } // for(var x...
          i  += (BUFF_NEXTLINE - 8);
        } // for(var y...
        i = tempi2 + 8;
      } // for(var n2
      if (n1 > 0 && times > 2){
        context.beginPath();
        context.moveTo(0, xy);
        context.lineTo(LAST_LINE, xy);
        context.moveTo(xy, 0);
        context.lineTo(xy, LAST_LINE);
        context.stroke();
      } // if
      i = tempi1 + BUFF_NEXTCHAR;
     } // for(var n1
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(0,255,255,1)';
      x = this.props.offsetx*8*times;
      y = this.props.offsety*8*times;
//console.log("CanvasComponent: updateCanvas()=("+x+", "+y+")");
      context.moveTo(x, y);
      context.lineTo(x+16*times,y);
      context.lineTo(x+16*times,y+16*times);
      context.lineTo(x,y+16*times);
      context.lineTo(x,y);
      context.stroke();
  }

  render(){
//console.log(this.props.name+': CanvasComponent: render()');
    const canvasStyles = this.styles();
    const canvasStyle = (
      (this.props.name=='display') ? {...canvasStyles.displayCanvas, width:this.state.width, height:this.state.height } :
      (this.props.name=='edit') ? {...canvasStyles.editCanvas, width:this.state.width, height:this.state.height } :
                                            {...canvasStyles.previewCanvas, width:this.state.width, height:this.state.height } );
    // const width  = canvasStyle.width.replace(/px/,'');
    // const height = canvasStyle.height.replace(/px/,'');
    const width  = this.state.width.replace(/px/,'');
    const height = this.state.height.replace(/px/,'');
    return <canvas ref={(e) => { this.canvas = e; }} style={canvasStyle} width={width} height={height}
            onMouseDown={this.clicked}></canvas> ;
  }
}

CanvasComponent.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  buff: PropTypes.array.isRequired,
  times: PropTypes.number.isRequired,
  palettes: PropTypes.object.isRequired,
  selectedPalette: PropTypes.object.isRequired,
  offsetx: PropTypes.number,
  offsety: PropTypes.number,
  actionOffset: PropTypes.func
};
