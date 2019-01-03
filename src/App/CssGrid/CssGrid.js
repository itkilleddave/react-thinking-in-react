import './CssGrid.css';
import './1.css';
import React from 'react';

class CssGrid extends React.Component {
  render() {
    return (
      <div className="container">
      	<div className="item">1</div>
      	<div className="item">2</div>
      	<div className="item">3</div>
      	<div className="item">4</div>
      	<div className="item">5</div>
      	<div className="item">6</div>
      	<div className="item">7</div>
      	<div className="item">8</div>
      	<div className="item">9</div>
      	<div className="item">10</div>
      </div>
      );
  }
}


export default CssGrid;