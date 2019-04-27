import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class EditComponent extends React.Component {
  styles(){
    return {
      editStyle: {
        margin: 0,
        padding: 0,
        float: 'left',
      }, dotEdit16: {
        width: '16px',
        heidht: '16px',
      }, dotEdit8: {
        width: '8px',
        heidht: '8px',
      }
    }
  }

  constructor(props, context){
//console.log('EditComponent: constructor(props, context){');
    super(props, context);
    // const width = "'"+props.times+"px'";
    this.state = {
      width: props.times+'px',
      height: props.times+'px',
      times: props.times,
      clicked: false,
    }
    this.clickedDot = this.clickedDot.bind(this);
    this.moveinDot = this.moveinDot.bind(this);
  }

  clickedDot(e){
    this.setState({clicked: true});
    this.pointDot(e);
  }
  moveinDot(e){
    // if (this.state.clicked == true){
    if ( ((e.buttons & 1)==1) && (this.state.clicked == true) ){
      this.pointDot(e);
    }else{
  //    this.setState({clicked: false});
    }
  }
  pointDot(e){
//console.log('EditComponent: clickedDot(e): e.button='+e.button);
    const buff = this.props.buff;
    const clickedId = e.target.id;
//console.log('EditComponent: clickedDot(){ id='+ clickedId +', buff[0]='+buff[0]);
    const selectedPalette = this.props.selectedPalette; // 選ばれたパレットなど
    const selectedColorId = selectedPalette['selectedColor']; // 選ばれていたパレットのid
    // カラーパレットの何番目が選ばれているかを求める
    const selectedPaletteId = selectedPalette['selectedPaletteId'];
    var n = Number(selectedPaletteId.substring(3-1));
    const  palette = document.getElementById(clickedId);
    palette.className = "dotStyle " +selectedColorId;
    const x = Number(clickedId.substring(3));
    const y = Number(clickedId.substring(1,3));
    if ( !isNaN(x) && !isNaN(y) && !isNaN(n)){
      const i = (y+ this.props.offsety*8)*16*8 + x + this.props.offsetx*8;
      buff[i] = n;
      this.props.actionPoint(/*x,y*/);
    }
  } // clickedDot(e){


  componentDidMount(props){ this.updateCanvas(props); }
  componentWillReceiveProps( nextProps ) { if ( this.props !== nextProps ) { this.updateCanvas(this.props); } }
  componentDidUpdate(props){ this.updateCanvas(props); }

  updateCanvas(){
//console.log('EditComponent: updateCanvas(){ ');
    const buff = this.props.buff;
    const BUFF_NEXTCHAR = 16*8*8;
    const BUFF_NEXTLINE = 16*8;
    var i = this.props.offsetx*8 + this.props.offsety*8*16*8;
    const selectedPalette = this.props.selectedPalette; // 選ばれたパレットなど
    const selectedPalettesId = selectedPalette['selectedPalettesId']; // 選ばれていたパレットグループのid
    const selectedPalettes = this.props.palettes; // パレットの全てのデータ
    const palettes = selectedPalettes[selectedPalettesId]; // 選ばれているパレットのデータ

    const NEXT_LINE = 256 / this.state.times;
    for(var n1=0, y2 = 0, xy = 0 ;n1<2 ; n1++, y2 += 8, xy += NEXT_LINE){
      var tempi1 = i;
      for(var n2=0, x2 = 0 ; n2<2 ; n2++, x2 += 8 ){
        var tempi2 = i;
        for(var y=0 ; y < 8 ; y++){
          const mm = '0' + (y2 + y);
          const m = 'd' + mm.substring(mm.length -2);
          for(var x=0 ; x < 8 ; x++, i++){
            var rgb = buff[i];
    //  if (rgb < 0 || 3 < rgb)
    // console.log(this.props.name+': CanvasComponent: updateCanvas(): other rgb=' + rgb + ', ' + typeof rgb  ); // r  + ', ' +g +', '+ b );
                switch (rgb){
                  case 0: rgb = palettes[0]; break;
                  case 2: rgb = palettes[2]; break;
                  case 1: rgb = palettes[1]; break;
                  case 3: rgb = palettes[3]; break;
                  default: rgb = 'c06'; break;
                } // switch (rgb){
                const nn = '0' + (x2+ x);
                const n = nn.substring(nn.length -2);
                const id = m + n;
                const dot = document.getElementById(id);
                dot.className = "dotStyle "+rgb;
          } // for(var x...
          i  += (BUFF_NEXTLINE - 8);
        } // for(var y...
        i = tempi2 + 8;
      } // for(var n2
      i = tempi1 + BUFF_NEXTCHAR;
    } // for(var n1
  } // updateCanvas(){

  render(){
//console.log('EditComponent: render(): this.props.times'+this.state.times);
    return <div ref={(e) => { this.editComponent = e; }} id="edit">
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0000" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0001" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0002" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0003" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0004" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0005" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0006" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0007" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0008" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0009" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0010" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0011" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0012" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0013" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0014" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0015" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0100" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0101" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0102" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0103" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0104" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0105" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0106" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0107" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0108" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0109" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0110" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0111" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0112" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0113" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0114" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0115" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0200" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0201" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0202" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0203" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0204" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0205" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0206" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0207" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0208" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0209" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0210" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0211" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0212" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0213" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0214" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0215" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0300" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0301" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0302" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0303" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0304" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0305" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0306" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0307" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0308" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0309" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0310" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0311" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0312" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0313" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0314" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0315" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0400" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0401" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0402" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0403" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0404" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0405" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0406" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0407" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0408" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0409" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0410" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0411" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0412" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0413" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0414" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0415" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0500" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0501" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0502" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0503" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0504" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0505" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0506" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0507" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0508" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0509" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0510" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0511" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0512" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0513" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0514" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0515" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0600" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0601" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0602" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0603" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0604" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0605" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0606" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0607" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0608" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0609" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0610" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0611" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0612" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0613" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0614" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0615" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0700" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0701" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0702" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0703" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0704" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0705" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0706" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0707" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0708" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0709" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0710" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0711" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0712" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0713" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0714" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0715" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0800" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0801" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0802" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0803" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0804" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0805" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0806" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0807" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0808" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0809" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0810" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0811" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0812" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0813" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0814" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0815" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0900" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0901" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0902" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0903" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0904" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0905" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0906" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0907" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0908" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0909" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0910" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0911" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0912" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0913" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0914" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d0915" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1000" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1001" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1002" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1003" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1004" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1005" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1006" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1007" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1008" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1009" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1010" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1011" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1012" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1013" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1014" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1015" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1100" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1101" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1102" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1103" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1104" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1105" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1106" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1107" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1108" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1109" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1110" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1111" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1112" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1113" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1114" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1115" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1200" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1201" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1202" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1203" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1204" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1205" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1206" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1207" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1208" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1209" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1210" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1211" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1212" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1213" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1214" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1215" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1300" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1301" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1302" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1303" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1304" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1305" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1306" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1307" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1308" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1309" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1310" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1311" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1312" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1313" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1314" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1315" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1400" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1401" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1402" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1403" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1404" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1405" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1406" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1407" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1408" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1409" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1410" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1411" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1412" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1413" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1414" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1415" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1500" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1501" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1502" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1503" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1504" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1505" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1506" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1507" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1508" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1509" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1510" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1511" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1512" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1513" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1514" className="dotStyle"></div>
<div onMouseDown={this.clickedDot}  onMouseEnter={this.moveinDot} id="d1515" className="dotStyle"></div>
            </div>;
  }
}

EditComponent.propTypes = {
  name: PropTypes.string.isRequired,
  buff: PropTypes.array.isRequired,
  times: PropTypes.number.isRequired,
  palettes: PropTypes.object.isRequired,
  selectedPalette: PropTypes.object.isRequired,
  actionPoint: PropTypes.func.isRequired,
  offsetx: PropTypes.number.isRequired,
  offsety: PropTypes.number.isRequired,
};
