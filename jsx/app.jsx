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
        <div className="jumbotron pt-4 pb-2">
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

function FunctionLink(props) {
  const URL = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/${props.name}`;
  const title = `Link to MDN doc on Intl.${props.name}`;
  return (
    <a href={URL} target="_blank" title={title}>
      {props.name}
    </a>
  );
}

function IntlJsSupport({ data }) {
  const functionNames = Object.keys(data).sort();

  console.debug("functionNames:", functionNames);

  const tableRows = functionNames.map((key) => {
    const CHECK_MARK = String.fromCharCode(0x2714);
    const browserSupport = data[key].browser ? CHECK_MARK : "";
    const nodejsSupport = data[key].nodejs ? CHECK_MARK : "";

    return (
      <tr>
        <td>
          <FunctionLink name={key} />
        </td>
        <td className="text-center">{browserSupport}</td>
        <td className="text-center">{nodejsSupport}</td>
      </tr>
    );
  });

  return (
    <table className="table table-md table-hover">
      <thead>
        <th>Intl Object Name</th>
        <th class="text-center">This browser</th>
        <th class="text-center">*Node.js</th>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function BrowserInfo() {
  return (
    <div className="alert alert-light" role="alert">
      {navigator.userAgent}
    </div>
  );
}

function NodejsInfo({ version }) {
  return (
    <p>
      <strong>*</strong>
      Node.js version: {version}
    </p>
  );
}

