import React from 'react';

export default (props)=>{
Parent = React.createClass({
  tacos: [ 'Guacamole', 'Beef', 'Bean' ],
  render() {
    return <div className="parent-component">
      <h3>List of tacos:</h3>
      <TacosList tacos={ this.tacos } />
    </div>;
  }
});

TacosList = React.createClass({
  render() {
    return <div className="tacos-list">
      {this.props.tacos.map( ( taco, index ) => {
        return <p key={ `taco-${ index }` }>{ taco }</p>;
      })}
    </div>;
  }
});
};
