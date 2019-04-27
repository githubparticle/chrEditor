import React from 'react';
import PropTypes from 'prop-types';

export default class MenuButton extends React.Component {

  styles(){
    return {
      menubutton: {
        width: '40px',
        height: '40px',
        float: 'left',
        margin: '8px 0px 0px 8px',
        padding: '0',
      },menubuttonNormal:{
        border: 'solid 4px gainsboro',
        backgroundColor: 'gainsboro'
      },menubuttonHover:{
        border: 'solid 4px silver',
        backgroundColor: 'silver'
      },menubuttonClick:{
        border: 'solid 4px dimgray',
        backgroundColor: 'dimgray'
      },menubuttonNew:{
        backgroundImage: "url('/img/button-new.png')"
      },menubuttonOpen:{
        backgroundImage: "url('/img/button-open.png')"
      },menubuttonSave:{
        backgroundImage: "url('/img/button-save.png')"
      },menubuttonCut:{
        backgroundImage: "url('/img/button-cut.png')"
      },menubuttonCopy:{
        backgroundImage: "url('/img/button-copy.png')"
      },menubuttonPaste:{
        backgroundImage: "url('/img/button-paste.png')"
      }
    }
  }

  constructor(props, context){
    super(props, context);
    this.state = {
      clicked: false,
      hovered: false,
      menu: props.menu,
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClicked = this.onClicked.bind(this);
  }

  onMouseEnter(){  this.setState({hovered: true}); }
  onMouseLeave(){ this.setState({hovered: false}); this.setState({clicked: false}); }
  onClicked(){
    this.setState({clicked: true});
    this.props.actionMenu(this.state.menu);
  }

  render(){
    const styles = this.styles();
// console.log('this.state ='+JSON.stringify(this.state));
// console.log('this.state.menu ='+this.state.menu );
// console.log('this.state.clicked ='+this.state.clicked );
// console.log('this.state.hovered ='+this.state.hovered );
    var clicked = this.state.clicked;
    var hovered = this.state.hovered;
    var menu = this.state.menu;
    const menuStyle1 = (menu == '') ? styles.menubuttonNormal :
                                    (   clicked ? styles.menubuttonClick :
                                      ( hovered ? styles.menubuttonHover : styles.menubuttonNormal) );
    const menuStyle2 = (menu=='new') ? styles.menubuttonNew :
                                     (menu=='open') ? styles.menubuttonOpen :
                                     (menu=='save') ? styles.menubuttonSave : {};
    const menuStyle = {...styles.menubutton, ...menuStyle1, ...menuStyle2};
//console.log('menuStyle='+JSON.stringify(menuStyle));
    return <div style={menuStyle}
                onMouseDown={this.onClicked}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}></div>;
  }
}
// onClick={() => props.actionMenu('new')}

MenuButton.propTypes = {
  menu: PropTypes.string.isRequired,
  actionMenu: PropTypes.func.isRequired,
};
