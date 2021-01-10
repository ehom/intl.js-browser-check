let intljsTable = {
  support: {},
  nodejs: {}
};

const supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

const isSupported = (functionName) => {
  return supportedFunctions.indexOf(functionName) > -1;
};

fetch("https://raw.githubusercontent.com/ehom/nodejs-intl/main/intljs.json")
  .then((response) => response.json())
  .then((data) => {
    console.debug("nodejs:", data);
    for (const name of data["Intl.js"]) {
      intljsTable.support[name] = { browser: false, nodejs: true };
    }
    intljsTable.nodejs["version"] = data["Node.js"].version;
    console.log("nodejs version", intljsTable.nodejs.version);
    main();
  });

const APP_NAME = "Intl.js Support";

document.title = APP_NAME;

function main() {
  for (const key of Object.keys(intljsTable.support)) {
    intljsTable.support[key].browser = isSupported(key);
  }

  console.debug("updated: ", intljsTable.support);

  const App = () => {
    return (
      <React.Fragment>
        <div className="jumbotron pt-4 pb-4">
          <h3 className="pb-3">Intl.js support in this browser</h3>
          <BrowserInfo />
        </div>
        <div className="container">
          <IntlJsSupport data={intljsTable.support} />
        </div>
        <hr />
        <div className="container">
          <NodejsInfo version={intljsTable.nodejs.version} />
        </div>
      </React.Fragment>
    );
  };

  ReactDOM.render(<App />, document.getElementById("root"));
}
