import './FreeCodeCamp.css';
import React from 'react';
import ReactDOM from 'react-dom';

// pure React (non JSX) functions

function PureButton (props) {

  return React.createElement(
    "button", // element
    {type: "submit", onClick: () => {console.log("log this: "+props.label)}}, // attributes (none)
    props.label // children
    );
}
function PureHeading(props) {

  return React.createElement(
    "h1", // element
    null, // attributes (none)
    props.words // children
    );
}
function PureContent(props) {

  return React.createElement(
    "span", // element
    {className: "bigboi"}, // attributes (none)
    // children
    "Then I said : "+props.content,
    "For the last time I said : "+props.content,
    // children (nesting other react components)
    React.createElement(PureHeading, {words: "Heading - "+props.content}),
    React.createElement(PureButton, {label: "inspect me!"}),
    );

}

// JSX

const NameDisplay = (props) => <div>{props.name}</div>;

const ErrorDisplay = (props) => <div style={{color:'#f00', background:'yellow'}}>
                                Good one, {props.firstName} {props.lastName}!
                                </div>;

const PropDisplay = ({just1prop}) => <div>
                                      Can build for just the one prop, {just1prop}!
                                      </div>;
const ReturnDisplay = ({name}) => {
                                  return "no div DOM wrap, so use a return, "+name+"!";
                                  }

const Doubler = ({input=[100,200,300]}) => {
                              return input.map(i => (i*2)+"! ");
       }
// Class

class MyHeading extends React.Component {

    constructor(props) {
      super(props);
      this.animal = "elephant";
    }

    render() {
      return <h1>my heading {this.props.number}, oh and {this.animal}!</h1>;
    }
}    

class MyButton extends React.Component {

  button1HandleClick() {
    alert("1 - regular function");
  }
  button2HandleClick = () => {
    alert("2 - same thing as 1, but written as arrow function");
  }

  render() {
    return (
      <div>
      <button onClick={this.button1HandleClick}>
      {this.props.label1}
      </button>
      <button onClick={this.button2HandleClick}>
      {this.props.label2}
      </button>
      </div>
      );
  }
}                   

// class CounterButton extends React.Component {
//   state = {
//     clickCounter: 0,
//     currentTimestamp: new Date(),
//   };
  
//   handleClick = () => {
//     this.setState((prevState) => {
//      return { clickCounter: prevState.clickCounter + 1 };
//     });
//   };
  
//   componentDidMount() {
//    setInterval(() => {
//      this.setState({ currentTimestamp: new Date() })
//     }, 1000);
//   }
  
//   render() {
//     return (
//       <div>
//         <button onClick={this.handleClick}>Click</button>
//         <p>Clicked: {this.state.clickCounter}</p>
//         <p>Time: {this.state.currentTimestamp.toLocaleString()}</p>
//       </div>
//     );
//   }
// }

class CounterButton extends React.Component {

  // bind 'this' - ...

  constructor(props) {
    super(props);
    this.state = {clickCount: 12};
    this.handleClick = this.handleClick.bind(this); // bind
  }

  handleClick() { // no arrow function needed on definition

      // wrong - setting and getting state without arrow function
      // (i don't fully understand why this is wrong yet, but see below for recommended approach ap)
      // const clickCount = this.state.clickCount+1; 
      // this.setState({clickCount: clickCount});

      // correct - using arrow function (with Reacts prevState) when reading and writing the state at the same time

      this.setState((prevState) => {
        return {clickCount: prevState.clickCount+1}
      });

  }

  render() {  // no arrow function needed on reference
    const clickCount = this.state.clickCount;
    return(
    <div>
     <button onClick={this.handleClick}>Count is {clickCount}</button>
    </div>
    );
  }

  // arrow function in reference - works!

  // constructor(props) {
  //   super(props);
  //   this.state = {clickCount: 12};
  // }

  // handleClick() {
  //   const clickCount = this.state.clickCount+1;
  //   this.setState({clickCount: clickCount});
  // }

  // render() {
  //   const clickCount = this.state.clickCount;
  //   return(
  //   <div>
  //    <button onClick={() => this.handleClick()}>Count is {clickCount}</button>
  //   </div>
  //   );
  // }

  // arrow function in definition - works!

  // constructor(props) {
  //   super(props);
  //   this.state = {clickCount: 12};
  // }

  // handleClick = () => {
  //   const clickCount = this.state.clickCount+1;
  //   this.setState({clickCount: clickCount});
  // }

  // render() {
  //   const clickCount = this.state.clickCount;
  //   return(
  //   <div>
  //    <button onClick={this.handleClick}>Count is {clickCount}</button>
  //   </div>
  //   );
  // }


}

class FreeCodeCamp extends React.Component {
  render() {
    return (
      <div> 

          {/* pure React (non JSX) functions */}

          {React.createElement(PureButton, {label: "click me"})}
          {React.createElement(PureContent, {content: "Content!!!"})}

          {/*      
          <Button label="click me" />
          <BigHeading content="Abba Zibabba!" />
          */}

          {/* JSX */}

          <NameDisplay name="daryl" />
          <ErrorDisplay firstName="kevin" lastName="kook" />
          <PropDisplay just1prop="hannah" />
          <ReturnDisplay name="meryl" />
          <br />
          <Doubler input={[10,20,30]}/>
          <br />
          <Doubler/> {/* same Doubler function, but omitting the input uses the default from the definition paramters */}

          {/* Class Syntax */}

          <MyHeading number="one"/>
          <MyButton label1="clikkkkk 1" label2="clikkkkk 2" />
          <CounterButton />

      </div>
      );
  }
}


export default FreeCodeCamp;