import React from 'react';
import PropTypes from 'prop-types';

export default class ToolButton extends React.Component {

  styles(){
    return {
      toolbutton: {
        width: '40px',
        height: '40px',
        float: 'left',
        margin: '8px 0px 0px 8px',
        padding: '0',
      },toolbuttonNormal:{
        border: 'solid 4px lightgray',
        backgroundColor: 'lightgray'
      },toolbuttonHover:{
        border: 'solid 4px silver',
        backgroundColor: 'silver'
      },toolbuttonClick:{
        border: 'solid 4px dimgray',
        backgroundColor: 'dimgray'
      },toolbuttonPen:{
        backgroundImage: "url('/img/button-pen.png')"
      },toolbuttonPaint:{
        backgroundImage: "url('/img/button-paint.png')"
      },toolbuttonLine:{
        backgroundImage: "url('/img/button-line.png')"
      }
    }
  }

  constructor(props, context){
    super(props, context);
    this.state = {
      clicked: false,
      tool: props.tool,
    };
    this.onClicked = this.onClicked.bind(this);
}

  onClicked(){
    this.setState({clicked: true});
    this.props.actionTool();
  }

  render(){
    const styles = this.styles();
    var clicked = this.state.clicked;
    var tool = this.state.tool;
    var selectedTool = this.props.selectedTool;
    const toolStyle1 = ( (tool==selectedTool) || clicked) ? styles.toolbuttonClick : styles.toolbuttonNormal ;
    const toolStyle2 = (tool=='pen') ? styles.toolbuttonPen :
                                     (this.state.menu=='line') ? styles.toolbuttonLine :
                                     (this.state.menu=='paint') ? styles.toolbuttonPaint : {};
    const toolStyle = {...styles.toolbutton, ...toolStyle1, ...toolStyle2};
    return <div style={toolStyle} onMouseDown={this.onClicked} />
  }
}

ToolButton.propTypes = {
  tool: PropTypes.string.isRequired,
  actionTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired,
};
