import React from 'react';
import PropTypes from 'prop-types';
import {parentPaletteId, childrenId} from './function.js';
import './index.css';

// const DEFAULT_COLOR = 'red'; // '#003973';

const regexp = /(c\d[0-9A-Z])/;
export default class PaletteComponent extends React.Component {

  constructor(props, context){
// console.log(props.name+': CanvasComponent: constructor(props, context)');
    super(props, context);
    // this.palettes = null;
    // this.palette01 = null;
    // this.palette010 = null; this.palette011 = null; this.palette012 = null; this.palette013 = null;
    this.state = {
      name: props.name,
      // palettes: props.palettes,
    }
    this.clickedPalette = this.clickedPalette.bind(this);
    this.clickedColor = this.clickedColor.bind(this);
  }

  clickedPalette(e){
    const clickedId = e.target.id; // 選ばれたパレットのid
    const selectedPalette = this.props.selectedPalette; // 選ばれたパレットなど
    const selectedId = selectedPalette['selectedPaletteId']; // 選ばれていたパレットのid
//console.log("selectedPalette(): (e.target.id, selectedPalette['selectedPaletteId'])=("+clickedId+', '+selectedId+')' );
    if (clickedId != selectedId){
      // 選択されたパレット(new)を選択状態に
      var palette = document.getElementById(clickedId);
      const clickedColor = regexp.exec(palette.className)[0];
      const border =  (clickedColor != 'c20' && clickedColor != 'c30') ? 'colorSelected ' : 'colorSelected2 ';
      palette.className = 'colorchipSmall palsel '+border+((clickedColor!== null)?clickedColor:'c3F');

      const clickedPalettesId = parentPaletteId(clickedId); // 選択されたパレットの親id
      const selectedPalettesId = selectedPalette['selectedPalettesId']; // 選択されていたパレットのid

      // 選択されていたパレット(old)を非選択状態に
      palette = document.getElementById(selectedId);
      const selectedColor = regexp.exec(palette.className)[0];
      const palsel = (clickedPalettesId == selectedPalettesId) ? 'palsel ' : 'palnosel ';
      palette.className = "colorchip "+palsel+((selectedColor!== null)?selectedColor:'c3F');
      // 違うパレットグループが選択されたらその他のパレットをまとめて処理
      if (clickedPalettesId != selectedPalettesId){
        // 選択されていたパレットグループに所属している複数のパレットを非選択に
        var palettes = childrenId(selectedPalettesId);
        for (var p of palettes){
          if (p!=selectedPalette){
            palette = document.getElementById(p);
            var color = regexp.exec(palette.className)[0];
            palette.className = "colorchip palnosel "+((color!== null)?color:'c3F');
          }
        }
        // 選択されたパレットグループに所属している複数のパレットを非選択に
        palettes = childrenId(clickedPalettesId);
        for (p of palettes){
          if (p!=clickedId){
            palette = document.getElementById(p);
            color = regexp.exec(palette.className)[0];
            palette.className = "colorchip palsel "+((color!== null)?color:'c3F');
          }
        }
        // 選択されていたパレットグループを非選択状態に
        palette = document.getElementById(selectedPalettesId);
        palette.className = "paletteX4";
        // 選択されたパレットグループを選択状態に
        palette = document.getElementById(clickedPalettesId);
        palette.className = "paletteX4 paletteSelected";
        selectedPalette['selectedPalettesId'] = clickedPalettesId;
      }
      // 元のパレットを非選択に
      var selectedColorId = selectedPalette['selectedColor']; // 選ばれていたパレットのid
      palette = document.getElementById(selectedColorId);
      palette.className="colorchip2 "+selectedColorId;
      // 選択されたパレットを選択に
      const clickedPalets = this.props.palettes[clickedPalettesId];
      const clickedPaletteColorId = clickedPalets[clickedId.substring(3-1)];
      palette = document.getElementById(clickedPaletteColorId);
      palette.className="colorchip3 colorSelected "+clickedPaletteColorId;
      // 変更の設定
      selectedPalette['selectedPaletteId'] = clickedId;
      selectedPalette['selectedColor'] = clickedColor;
      // 再描画
      this.props.actionRedraw();
    } // if (clickedId != selectedPaletteId){
  }

  clickedColor(e){
    var clickedId = e.target.id;
    var palette = document.getElementById(clickedId);
    const clickedColorId = regexp.exec(palette.className)[0];
    const selectedPalette = this.props.selectedPalette; // 選ばれたパレットなど
    const selectedColorId = selectedPalette['selectedColor']; // 選ばれていたパレットのid

    if (clickedColorId != selectedColorId){
      const selectedId = selectedPalette['selectedPaletteId']; // 選ばれていたパレットのid
      palette = document.getElementById(selectedId);
      const border =  (clickedColorId != 'c20' && clickedColorId != 'c30') ? 'colorSelected ' : 'colorSelected2 ';
      palette.className = 'colorchipSmall palsel '+border+((clickedColorId!== null)?clickedColorId:'c3F');
      // 元のパレットを非選択に
      palette = document.getElementById(selectedColorId);
      palette.className="colorchip2 "+selectedColorId;
      // 選択されたパレットを選択に
      palette = document.getElementById(clickedColorId);
      palette.className="colorchip3 colorSelected "+clickedColorId;
      // 選ばれているパレットの色を保存
      selectedPalette['selectedColor'] = clickedColorId;
      // 選ばれているパレットの色を変更
      const selectePalettesdId = selectedPalette['selectedPalettesId']; // 選ばれていたパレットのid
      const clickedPalets = this.props.palettes[selectePalettesdId];
      clickedPalets[selectedId.substring(3-1)] = clickedColorId;

      // 再描画
      this.props.actionRedraw();
    }
  }

  render(){
//console.log(this.props.name+': CanvasComponent: render()');
    const palettes = this.props.palettes;
    const palettes0 = palettes['p0'], palettes1 = palettes['p1'], palettes2 = palettes['p2'], palettes3= palettes['p3'];
    const p00 = "colorchipSmall palsel colorSelected "+palettes0[0];
    const p01 = "colorchip palsel "+palettes0[1];
    const p02 = "colorchip palsel "+palettes0[2];
    const p03 = "colorchip palsel "+palettes0[3];
    const p10 = "colorchip palnosel "+palettes1[0];
    const p11 = "colorchip palnosel "+palettes1[1];
    const p12 = "colorchip palnosel "+palettes1[2];
    const p13 = "colorchip palnosel "+palettes1[3];
    const p20 = "colorchip palnosel "+palettes2[0];
    const p21 = "colorchip palnosel "+palettes2[1];
    const p22 = "colorchip palnosel "+palettes2[2];
    const p23 = "colorchip palnosel "+palettes2[3];
    const p30 = "colorchip palnosel "+palettes3[0];
    const p31 = "colorchip palnosel "+palettes3[1];
    const p32 = "colorchip palnosel "+palettes3[2];
    const p33 = "colorchip palnosel "+palettes3[3];
    return <div ref={(e) => { this.paletComponent = e; }}>
<div className="paletteX16">
  <div className="paletteX4 paletteSelected" id="p0">
    <div onClick={this.clickedPalette} id="p00" className={p00}></div>
    <div onClick={this.clickedPalette} id="p01" className={p01}></div>
    <div onClick={this.clickedPalette} id="p02" className={p02}></div>
    <div onClick={this.clickedPalette} id="p03" className={p03}></div>
  </div>
  <div className="paletteX4" id="p1">
    <div onClick={this.clickedPalette} id="p10"  className={p10}></div>
    <div onClick={this.clickedPalette} id="p11"  className={p11}></div>
    <div onClick={this.clickedPalette} id="p12"  className={p12}></div>
    <div onClick={this.clickedPalette} id="p13"  className={p13}></div>
  </div>
  <div className="paletteX4" name="n2" id="p2">
    <div onClick={this.clickedPalette} id="p20"  className={p20}></div>
    <div onClick={this.clickedPalette} id="p21"  className={p21}></div>
    <div onClick={this.clickedPalette} id="p22"  className={p22}></div>
    <div onClick={this.selectedPalette} id="p23"  className={p23}></div>
  </div>
  <div className="paletteX4" id="p3">
    <div onClick={this.clickedPalette} id="p30" className={p30}></div>
    <div onClick={this.clickedPalette} id="p31" className={p31}></div>
    <div onClick={this.clickedPalette} id="p32" className={p32}></div>
    <div onClick={this.clickedPalette} id="p33" className={p33}></div>
  </div>
</div>
<div className="sp_palette" />
<div ref={(e) => { this.colors = e;}} id="paletteColors">
  <div className="colorchip2 c00" id="c00" onClick={this.clickedColor}></div>
  <div className="colorchip2 c01" id="c01" onClick={this.clickedColor}></div>
  <div className="colorchip2 c02" id="c02" onClick={this.clickedColor}></div>
  <div className="colorchip2 c03" id="c03" onClick={this.clickedColor}></div>
  <div className="colorchip2 c04" id="c04" onClick={this.clickedColor}></div>
  <div className="colorchip2 c05" id="c05" onClick={this.clickedColor}></div>
  <div className="colorchip2 c06" id="c06" onClick={this.clickedColor}></div>
  <div className="colorchip2 c07" id="c07" onClick={this.clickedColor}></div>
  <div className="colorchip2 c08" id="c08" onClick={this.clickedColor}></div>
  <div className="colorchip2 c09" id="c09" onClick={this.clickedColor}></div>
  <div className="colorchip2 c0A" id="c0A" onClick={this.clickedColor}></div>
  <div className="colorchip2 c0B" id="c0B" onClick={this.clickedColor}></div>
  <div className="colorchip2 c0C" id="c0C" onClick={this.clickedColor}></div>
  <div className="colorchip2 c0D" id="c0D" onClick={this.clickedColor}></div>
  <div className="colorchip2 c0E" id="c0E" onClick={this.clickedColor}></div>
  <div className="colorchip2 c0F" id="c0F" onClick={this.clickedColor}></div>

  <div className="colorchip2 c10" id="c10" onClick={this.clickedColor}></div>
  <div className="colorchip2 c11" id="c11" onClick={this.clickedColor}></div>
  <div className="colorchip2 c12" id="c12" onClick={this.clickedColor}></div>
  <div className="colorchip2 c13" id="c13" onClick={this.clickedColor}></div>
  <div className="colorchip2 c14" id="c14" onClick={this.clickedColor}></div>
  <div className="colorchip2 c15" id="c15" onClick={this.clickedColor}></div>
  <div className="colorchip2 c16" id="c16" onClick={this.clickedColor}></div>
  <div className="colorchip2 c17" id="c17" onClick={this.clickedColor}></div>
  <div className="colorchip2 c18" id="c18" onClick={this.clickedColor}></div>
  <div className="colorchip2 c19" id="c19" onClick={this.clickedColor}></div>
  <div className="colorchip2 c1A" id="c1A" onClick={this.clickedColor}></div>
  <div className="colorchip2 c1B" id="c1B" onClick={this.clickedColor}></div>
  <div className="colorchip2 c1C" id="c1C" onClick={this.clickedColor}></div>
  <div className="colorchip2 c1D" id="c1D" onClick={this.clickedColor}></div>
  <div className="colorchip2 c1E" id="c1E" onClick={this.clickedColor}></div>
  <div className="colorchip2 c1F" id="c1F" onClick={this.clickedColor}></div>

  <div className="colorchip2 c20" id="c20" onClick={this.clickedColor}></div>
  <div className="colorchip2 c21" id="c21" onClick={this.clickedColor}></div>
  <div className="colorchip2 c22" id="c22" onClick={this.clickedColor}></div>
  <div className="colorchip2 c23" id="c23" onClick={this.clickedColor}></div>
  <div className="colorchip2 c24" id="c24" onClick={this.clickedColor}></div>
  <div className="colorchip2 c25" id="c25" onClick={this.clickedColor}></div>
  <div className="colorchip2 c26" id="c26" onClick={this.clickedColor}></div>
  <div className="colorchip2 c27" id="c27" onClick={this.clickedColor}></div>
  <div className="colorchip2 c28" id="c28" onClick={this.clickedColor}></div>
  <div className="colorchip2 c29" id="c29" onClick={this.clickedColor}></div>
  <div className="colorchip2 c2A" id="c2A" onClick={this.clickedColor}></div>
  <div className="colorchip2 c2B" id="c2B" onClick={this.clickedColor}></div>
  <div className="colorchip2 c2C" id="c2C" onClick={this.clickedColor}></div>
  <div className="colorchip2 c2D" id="c2D" onClick={this.clickedColor}></div>
  <div className="colorchip2 c2E" id="c2E" onClick={this.clickedColor}></div>
  <div className="colorchip2 c2F" id="c2F" onClick={this.clickedColor}></div>

  <div className="colorchip2 c30" id="c30" onClick={this.clickedColor}></div>
  <div className="colorchip2 c31" id="c31" onClick={this.clickedColor}></div>
  <div className="colorchip2 c32" id="c32" onClick={this.clickedColor}></div>
  <div className="colorchip2 c33" id="c33" onClick={this.clickedColor}></div>
  <div className="colorchip2 c34" id="c34" onClick={this.clickedColor}></div>
  <div className="colorchip2 c35" id="c35" onClick={this.clickedColor}></div>
  <div className="colorchip2 c36" id="c36" onClick={this.clickedColor}></div>
  <div className="colorchip2 c37" id="c37" onClick={this.clickedColor}></div>
  <div className="colorchip2 c38" id="c38" onClick={this.clickedColor}></div>
  <div className="colorchip2 c39" id="c39" onClick={this.clickedColor}></div>
  <div className="colorchip2 c3A" id="c3A" onClick={this.clickedColor}></div>
  <div className="colorchip2 c3B" id="c3B" onClick={this.clickedColor}></div>
  <div className="colorchip2 c3C" id="c3C" onClick={this.clickedColor}></div>
  <div className="colorchip2 c3D" id="c3D" onClick={this.clickedColor}></div>
  <div className="colorchip2 c3E" id="c3E" onClick={this.clickedColor}></div>
  <div className="colorchip3 colorSelected c3F" id="c3F" onClick={this.clickedColor}></div>
</div>
              </div> ;
  }
}


PaletteComponent.propTypes = {
  name: PropTypes.string.isRequired,
  palettes: PropTypes.object.isRequired,
  selectedPalette: PropTypes.object.isRequired,
  actionRedraw: PropTypes.func.isRequired,
};
