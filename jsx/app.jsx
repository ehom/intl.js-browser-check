
const supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

const isSupported = (functionName) => {
  return supportedFunctions.indexOf(functionName) > -1;
};

const APP_NAME = "Intl.js Support";
document.title = APP_NAME;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intljs: {},
      nodejs: {}
    }
    fetch("https://raw.githubusercontent.com/ehom/nodejs-intl/main/intljs.json")
    .then((response) => response.json())
    .then((data) => {
      console.debug("nodejs:", data);

      intljsInfo = {};
      nodejsInfo = {};

      for (const name of data["Intl.js"]) {
        intljsInfo[name] = { browser: false, nodejs: true };
      }
      nodejsInfo["version"] = data["Node.js"].version;
      for (const key of Object.keys(intljsInfo)) {
        intljsInfo[key].browser = isSupported(key);
      }
      console.debug("updated: ", intljsInfo);
      this.setState({
        intljs: intljsInfo,
        nodejs: nodejsInfo
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron pt-4 pb-4">
          <h3 className="pb-3">Intl.js support in this browser</h3>
          <BrowserInfo />
        </div>
        <div className="container">
          <IntlJsSupport data={this.state.intljs} />
        </div>
        <hr />
        <div className="container">
          <NodejsInfo version={this.state.nodejs.version} />
        </div>
      </React.Fragment>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
