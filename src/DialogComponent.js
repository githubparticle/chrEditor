import React from 'react';
import {Modal,Button,InputGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import CanvasComponent from './CanvasComponent';
import {clearbuff, preopenFile} from './function.js';

const CANVAS_WIDTH_PREVIEW = '256px';
const CANVAS_HEIGHT_PREVIEW = '256px';

export class DialogYesOrNoComponent extends React.Component {
  constructor(props, context){
//console.log('DialogComponent: constructor(props, context)');
    super(props, context);
    this.state = {
      name: 'dialogYesOrNoComponent',
    }
  }
  onYes(){
    // console.log('DialogComponent: onOpen');
    // console.log('DialogComponent: onOpen(): this.state.loaded='+this.state.loaded);
    this.props.actionYes();
    this.props.actionHideModalOpen();
  }    
  render(){
    return (
      <Modal  show={this.props.boolShow} className="modal-container" animation="{true}" size="lg"
      onHide={() => this.props.actionHideModalOpen()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CanvasComponent name="preview" buff={this.props.buff}
            ref={(ref)=>this.canvas=ref}
            palettes={this.props.palettes} selectedPalette={this.props.selectedPalette}
            width={CANVAS_WIDTH_PREVIEW} height={CANVAS_HEIGHT_PREVIEW} times={2} /><br />
          {this.props.message}
        </Modal.Body>
        <Modal.Footer>
              <Button variant="secondary" onClick={() => this.onYes()}>Yes</Button>
              <Button variant="primary" onClick={() => this.props.actionHideModalOpen()}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export class DialogOpenComponent extends React.Component {

  constructor(props, context){
//console.log('DialogComponent: constructor(props, context)');
    super(props, context);
    this.onOpen = this.onOpen.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);
    this.preopenFileLoaded = this.preopenFileLoaded.bind(this);
    this.fileUpload = null;
    this.canvas = null;
    this.DialogOpenRef = null;
    //const int buffs[16][16][8*8];
    const newbuff = [];
    clearbuff(newbuff, 0); // ダイアログのブッファをクリア

      this.state = {
        name: 'DialogComponent',
        no: 1,
        loaded: false,
        buff: newbuff,
        filename: null,
      }
    }

  clearBuff(){
    const newbuff = this.state.buff;
    clearbuff(newbuff, 0); // ダイアログのブッファをクリア
    this.setState({buff:newbuff});
  }

  onOpen(){
// console.log('DialogComponent: onOpen');
// console.log('DialogComponent: onOpen(): this.state.loaded='+this.state.loaded);
    if ( this.state.loaded==true){
      this.setState({loaded: false});
      this.props.actionOpen(this.state.buff);
      this.props.actionHideModalOpen();
    }
  }

  onSelectFile(){
// console.log('DialogComponent: onSelectFile(): filename='+filename);
// console.log('DialogComponent: onOpen(): this='+ JSON.stringify(this) );
    this.setState({ filename: this.fileUpload.files[0].name}); // this.fileUpload.files[0].name });
// console.log('DialogComponent: onSelectFile(): this.state.filename='+this.state.filename);
// console.log('DialogComponent: onSelectFile(): this.state.loaded'+this.state.buff[0]);

    clearbuff(this.state.buff, 11);
    preopenFile(this.fileUpload.files[0], this.state.buff, this.preopenFileLoaded );
  }

  preopenFileLoaded(){ // ここで読み込まれたデータが受け取れていない
//console.log('DialogComponent: preopenFileLoaded() firstpixel='+this.state.buff[0]);
    this.setState({loaded: true});
    this.canvas.updateCanvas();
  }

  render(){
// console.log('DialogComponent: render() '+JSON.stringify() );
    return (
          <Modal  show={this.props.boolShow} className="modal-container" animation="{true}" size="lg"
          onHide={() => this.props.actionHideModalOpen()}>
            <Modal.Header closeButton>
              <Modal.Title>CHRファイル読み込み</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CanvasComponent name="preview" buff={this.state.buff}
                ref={(ref)=>this.canvas=ref}
                palettes={this.props.palettes} selectedPalette={this.props.selectedPalette}
                width={CANVAS_WIDTH_PREVIEW} height={CANVAS_HEIGHT_PREVIEW} times={2} /><br />
              読み込みたいCHRファイルを指定してください。<br />( Select a CHR file, please. )
            </Modal.Body>
            <Modal.Footer>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button variant="primary" onClick={() => this.onOpen()}>Open</Button>
                </InputGroup.Prepend>
                <div className="custom-file">
                  <input label='SelectChrFile'
                    type="file"
                    accept='.chr'
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={() => this.onSelectFile()}
                    ref={(ref) => this.fileUpload = ref}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">
                    Choose file
                  </label>
                </div>
              </InputGroup>
              <Button variant="secondary" onClick={() => this.props.actionHideModalOpen()}>Close</Button>
            </Modal.Footer>
          </Modal>
    );
  }
}

export class DialogSaveComponent extends React.Component {
  constructor(props, context){
//console.log('DialogComponent: constructor(props, context)');
    super(props, context);
    this.state = {
      name: 'dialogSaveComponent',
    }
  }
  onSave(){
    const buff = this.props.buff;
    let buffer = new ArrayBuffer(8*2*16*16);
    let dv = new DataView(buffer);
    var i = 0,  j = 0;
    for(var n1=0 ; n1<16 ; n1++){
      var tmpi1 = i;
      for(var n2=0 ; n2<16 ; n2++,j+=8){
        var tmpi2 = i;
        for(var y=0;y<8;y++,j++){
          var c1 = 0, c2 = 0;
          for(var x=0;x<8;x++,i++){
            c1 = c1 << 1;
            c2 = c2 << 1;
            var d = buff[i];
            c2 += d & 1;
            c1 += ((d>>1) & 1);
          } // for(var x=0;x<8;x++,i++)
          dv.setUint8(j,c1);
          dv.setUint8(j+8,c2);
          i += 8*15;
        } // for(var y=0;y<8;y++,j++)
        i = tmpi2+8;
      } // for(var n2=0 ; n2<16 ; n2++)
      i = tmpi1+8*16*8;
    } // for(var n1=0 ; n1<16 ; n1++)
    const a = document.createElement('A');
    a.style = "display: none";
    var blob = new Blob([buffer], {type: "octet/stream"});
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    const f = this.props.filename;
    a.download = f!=""?f:"chredit.chr";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.props.actionHideModalOpen();
  }
  render(){
    return (
      <Modal  show={this.props.boolShow} className="modal-container" animation="{true}" size="lg"
      onHide={() => this.props.actionHideModalOpen()}>
        <Modal.Header closeButton>
          <Modal.Title>データの保存</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CanvasComponent name="preview" buff={this.props.buff}
            ref={(ref)=>this.canvas=ref}
            palettes={this.props.palettes} selectedPalette={this.props.selectedPalette}
            width={CANVAS_WIDTH_PREVIEW} height={CANVAS_HEIGHT_PREVIEW} times={2} /><br />
          画像データを保存しますか？<br />( Do you want to save CHR file ? )
        </Modal.Body>
        <Modal.Footer>
              <Button variant="secondary" onClick={() => this.onSave()}>Yes</Button>
              <Button variant="primary" onClick={() => this.props.actionHideModalOpen()}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

DialogYesOrNoComponent.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  actionHideModalOpen: PropTypes.func.isRequired,
  actionYes: PropTypes.func.isRequired,
  boolShow: PropTypes.bool.isRequired,
  buff: PropTypes.array.isRequired,
  palettes: PropTypes.object.isRequired,
  selectedPalette: PropTypes.object.isRequired,
}

DialogOpenComponent.propTypes = {
  actionHideModalOpen: PropTypes.func.isRequired,
  actionOpen: PropTypes.func.isRequired,
  boolShow: PropTypes.bool.isRequired,
  buff: PropTypes.array.isRequired,
  tempbuff: PropTypes.array.isRequired,
  palettes: PropTypes.object.isRequired,
  selectedPalette: PropTypes.object.isRequired,
}

DialogSaveComponent.propTypes = {
  actionHideModalOpen: PropTypes.func.isRequired,
  boolShow: PropTypes.bool.isRequired,
  filename: PropTypes.string.isRequired,
  buff: PropTypes.array.isRequired,
  palettes: PropTypes.object.isRequired,
  selectedPalette: PropTypes.object.isRequired,
}