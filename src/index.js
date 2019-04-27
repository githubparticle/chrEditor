// CHR Editor v1.0 2019.4.7
// Programed by Yoshiharu Kawai
// GNU General Public License
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PaletteComponent from './PaletteComponent';
import CanvasComponent from './CanvasComponent';
import EditComponent from './EditComponent';
import {DialogOpenComponent,DialogYesOrNoComponent,DialogSaveComponent} from './DialogComponent';
import MenuButton from './MenuButton';
import ToolButton from './ToolButton';
import {clearbuff} from './function.js';
import './index.css';

const CANVAS_WIDTH_DISPLAY = '256px';
const CANVAS_HEIGHT_DISPLAY = '256px';

const CANVAS_WIDTH_EDIT = '256px';
const CANVAS_HEIGHT_EDIT = '256px';

class CHReditorPage extends Component {
  constructor(props, context){
    super(props, context);

    // 諸々初期値
    //const int buffs[16][16][8*8];
    var newbuff1 = []
    for(var i=0;i<16*16*8*8;i++){newbuff1[i] = 0;}
    var newbuff2 = []
    for(i=0;i<16*16*8*8;i++){newbuff2[i] = 0;}
    var palette0 = [ 'c3F', 'c36',  'c16', 'c02' ];
    var palette1 = [ 'c3F', 'c27',  'c20', 'c19' ];
    var palette2 = [ 'c3F', 'c35',  'c25', 'c27' ];
    var palette3 = [ 'c3F', 'c20',  'c27', 'c16' ];
    var palettes ={ 'p0': palette0, 'p1': palette1, 'p2': palette2, 'p3': palette3  };
    var selectedPalette = { 'selectedPalettesId': 'p0', 'selectedPaletteId': 'p00', 'selectedColor': 'c3F', };

    this.state = {
      name: 'index.js',
      modalOpenShow: false,
      modalYesOrNoShow: false,
      modalSaveShow: false,
      selectedTool: 'pen',
      display_img: '/img/display.png',
      edit_img: '/img/edit.png',
      file_name: '',
      dialog_title: '',
      dialog_message: '',
      menu_selected: '',
      buff: newbuff1,
      tempbuff: newbuff2,
      palettes: palettes,
      selectedPalette: selectedPalette,
      offsetx: 0,
      offsety: 0,
    };

    //this.mouseOut= this.mouseOut.bind(this);
    this.handleHideModalOpen = this.handleHideModalOpen.bind(this);
    this.handleShowModalOpen = this.handleShowModalOpen.bind(this);
    this.handleHideModalYesOrNo = this.handleHideModalYesOrNo.bind(this);
    this.handleShowModalYesOrNo = this.handleShowModalYesOrNo.bind(this);
    this.handleHideModalSave = this.handleHideModalSave.bind(this);
    this.handleShowModalSave = this.handleShowModalSave.bind(this);
    this.openFile = this.openFile.bind(this);
    this.redrawPixel = this.redrawPixel.bind(this);
    this.setOffset = this.setOffset.bind(this);
    this.dialogOpenComponent = null;
    this.displayCanvas = null;
    this.editCanvas = null;
}

//   mouseOut(e){ // これが働かない・・・
//  //console.log("index.js: mouseOver(){ id="+e.target.id);
//    this.editCanvas.setState({clicked: false});
//   }
  handleHideModalOpen(){
    this.setState({ modalOpenShow: false });
    clearbuff(this.state.tempbuff, 30);
  }
  handleShowModalOpen(){ this.setState({ modalOpenShow: true }); }
  handleHideModalYesOrNo(){
    this.setState({ modalYesOrNoShow: false });
  }
  handleShowModalYesOrNo(){ this.setState({ modalYesOrNoShow: true }); }
  handleHideModalSave(){
    this.setState({ modalSaveShow: false });
  }
  handleShowModalSave(){ this.setState({ modalSaveShow: true }); }


  dialogYes(){
    if(this.state.menu_selected=='new'){
      clearbuff(this.state.buff,0);
    }
  }

  openFile(){
//console.log(this.name+": openFile(): type of newbuff="+(typeof newbuff));
    const tempbuff = this.dialogOpenComponent.state.buff;
    const buff = [];
    for(var i=0;i<16*16*8*8;i++){buff[i] = tempbuff[i];} // 読み込んだバッファのデータを作業バッファにコピー
    this.setState({file_name: this.dialogOpenComponent.state.filename})
//console.log(this.name+": openFile(): buff="+buff);
    this.setState({buff: buff});
    this.displayCanvas.updateCanvas();
    this.editCanvas.updateCanvas();
  }


  menu(no){
    this.setState({menu_selected:no});
    if(no=='new'){
      this.setState({dialog_title:"クリア確認"});
      this.setState({dialog_message:"作業中のイメージをクリアしていいですか？"});
      this.handleShowModalYesOrNo();
    }else if (no=='open') {
      this.handleShowModalOpen();
//console.log("open: no="+no);
      this.dialogOpenComponent.clearBuff();
    }else if (no=='save') {
      this.handleShowModalSave();
    }
  }
  tool(no){
    if(no=='pen'){
//console.log("pen: no="+no);
    }
    this.setState({selectedTool: no});
  }

  redrawPixel(){
//console.log("redrawPixel()");
    this.displayCanvas.updateCanvas();
    this.editCanvas.updateCanvas();
  }

  setOffset(x,y){
    this.setState({offsetx: x});
    this.setState({offsety: y});
  }

  point(/*x, y*/){
//console.log("index.js: point(x,y)=("+x+", "+y+")");
    // this.displayCanvas.point(x, y);
    this.displayCanvas.updateCanvas();
  }

  render() {
    return (
      <div id="body" >
        <h1>CHR Editor</h1>
        <CHR_menu actionMenu={(no) => this.menu(no)} />
        <div id="left">
          <CanvasComponent name="display" buff={this.state.buff}
            ref={(ref)=>this.displayCanvas=ref}
            palettes={this.state.palettes} selectedPalette={this.state.selectedPalette}
            offsetx={this.state.offsetx} offsety={this.state.offsety} actionOffset={(x,y)=>this.setOffset(x,y)}
            width={CANVAS_WIDTH_DISPLAY} height={CANVAS_HEIGHT_DISPLAY} times={2} />
        </div>
        <div id="right">
          <div id="rightleft">
            <div id="editround"><EditComponent id="edit" name="edit" buff={this.state.buff}
              onMouseOut={this.mouseOut}
              palettes={this.state.palettes} selectedPalette={this.state.selectedPalette}
              ref={(ref)=>this.editCanvas=ref} actionPoint={(x,y)=>this.point(x,y)}
              offsetx={this.state.offsetx} offsety={this.state.offsety}
              width={CANVAS_WIDTH_EDIT} height={CANVAS_HEIGHT_EDIT} times={16} />
          <div className="sp_bet_edit_palette" /></div>
          <PaletteComponent name="palettes" id="rightdown"
            palettes={this.state.palettes} selectedPalette={this.state.selectedPalette} actionRedraw={()=>this.redrawPixel()} />
          </div>
          <CHR_tool actionTool={(no) => this.tool(no)} selectedTool={this.state.selectedTool} id="rightright" />
        </div>

        <DialogOpenComponent
          ref={(ref) => this.dialogOpenComponent=ref}
          palettes={this.state.palettes} selectedPalette={this.state.selectedPalette}
          actionHideModalOpen={()=>this.handleHideModalOpen()}
          actionOpen={(e) => {this.openFile(e);}}
          boolShow={this.state.modalOpenShow}
          onHide={this.handleHideModalOpen}
          buff={this.state.buff}
          tempbuff={this.state.tempbuff}
          tempfilename={this.state.tempfilename} />
        <DialogYesOrNoComponent
          palettes={this.state.palettes} selectedPalette={this.state.selectedPalette}
          actionHideModalOpen={()=>this.handleHideModalYesOrNo()}
          actionYes={(e) => {this.dialogYes(e);}}
          boolShow={this.state.modalYesOrNoShow}
          title={this.state.dialog_title}
          message={this.state.dialog_message}
          buff={this.state.buff} />
        <DialogSaveComponent
          palettes={this.state.palettes} selectedPalette={this.state.selectedPalette}
          actionHideModalOpen={()=>this.handleHideModalSave()}
          boolShow={this.state.modalSaveShow}
          filename={this.state.file_name}
          buff={this.state.buff} />
      </div>
    );
  }
}

const CHR_menu = (props) => {
  return (
    <div id="menu">
      <MenuButton menu="new" actionMenu={() => props.actionMenu('new')} />
      <MenuButton menu="open" actionMenu={() => props.actionMenu('open')} />
      <MenuButton menu="save" actionMenu={() => props.actionMenu('save')} />
      <div className="dbutton"></div>
      <MenuButton menu="" actionMenu={() => props.actionMenu('cut')} />
      <MenuButton menu="" actionMenu={() => props.actionMenu('copy')} />
      <MenuButton menu="" actionMenu={() => props.actionMenu('paste')} />
    </div>
  )
}

const CHR_tool = (props) => {
  return (
    <div id="tool">
      <ToolButton tool="pen" actionTool={() => props.actionTool('pen')} selectedTool={props.selectedTool} />
      <div className="dbutton"></div>
      <div className="button" id="line"></div>
      <div className="button" id="rect"></div>
      <div className="button" id="rectfill"></div>
      <div className="button" id="circle"></div>
      <div className="button" id="circlefill"></div>
      <div className="dbutton"></div>
      <div className="button" id="paint"></div>
    </div>
  )
}


CHR_menu.propTypes = {
  actionMenu: PropTypes.func
}
CHR_tool.propTypes = {
  actionTool: PropTypes.func,
  selectedTool: PropTypes.string.isRequired,
}

ReactDOM.render(
  <CHReditorPage />,
  document.getElementById('root')
);
