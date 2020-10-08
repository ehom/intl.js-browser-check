const supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

const isSupported = (functionName) => { 
  return supportedFunctions.indexOf(functionName) > -1;
};

const functionNames = [
  "DateTimeFormat",
  "NumberFormat",
  "RelativeTimeFormat",
  "Collator",
  "ListFormat",
  "PluralRules",
  "Locale",
  "getCanonicalLocales"
];

const page = (
  <React.Fragment>
    <div className="jumbotron pb-2">
      <Title />
      <BrowserInfo />
    </div>
    <div className="container">
      <Report functionNames={functionNames} />
    </div>
  </React.Fragment>
);

ReactDOM.render(page, document.getElementById('root'));

function FunctionLink(props) {
  const URL = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/${props.name}`;
  const title = `Link to MDN doc on Intl.${props.name}`;
  return (
    <a href={URL} target="_blank" title={title}>{props.name}</a>
  );
}

function Report(properties) {
  const functionNames = properties.functionNames;
  console.debug("functionNames:", functionNames);
  
  const buildReport = (names) => {
    const CHECK_MARK = 0x2714;
    return functionNames.reduce((obj, name) => {
      return {
        ...obj, [name]: isSupported(name) ? String.fromCharCode(CHECK_MARK) : ''
      };
    }, {});
  };

  const report = buildReport(functionNames);

  const tableRows = Object.keys(report).map((entry) => 
    <tr>
       <td><FunctionLink name={entry}/></td>
       <td className="text-center">{report[entry]}</td>
    </tr>
  );
    
  return (
    <table className="table table-md table-hover">
      <thead>
        <th>Intl Function Name</th>
        <th className="text-center">Supported</th>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function Title() {
  return <h3 className="pb-3">Intl.js support in your browser</h3>;
}

function BrowserInfo() {
  return <div className="alert alert-light" role="alert">{navigator.userAgent}</div>;
}

