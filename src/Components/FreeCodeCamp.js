import './FreeCodeCamp.css';
import React from 'react';
import ReactDOM from 'react-dom';

// pure React (non JSX) functions

function Button (props) {

  return React.createElement(
    "button", // element
    {type: "submit", onClick: () => {console.log("log this: "+props.label)}}, // attributes (none)
    props.label // children
    );
}
function Heading(props) {

  return React.createElement(
    "h1", // element
    null, // attributes (none)
    props.words // children
    );
}
function Content(props) {

  return React.createElement(
    "span", // element
    {className: "bigboi"}, // attributes (none)
    // children
    "Then I said : "+props.content,
    "For the last time I said : "+props.content,
    // children (nesting other react components)
    React.createElement(Heading, {words: "Heading - "+props.content}),
    React.createElement(Button, {label: "inspect me!"}),
    );

}

class FreeCodeCamp extends React.Component {
  render() {
    return (
      <div> 
        {/* pure React (non JSX) functions */}
        {React.createElement(Button, {label: "click me"})}
        {React.createElement(Content, {content: "Content!!!"})}

        {/*      
        <Button label="click me" />
        <BigHeading content="Abba Zibabba!" />
        */}

      </div>
      );
  }
}


export default FreeCodeCamp;