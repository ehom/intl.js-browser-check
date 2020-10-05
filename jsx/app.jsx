const supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

const isSupported = (functionName) => { 
  return supportedFunctions.indexOf(functionName) > -1;
};

const page = (
  <React.Fragment>
    <div className="jumbotron pb-2">
      <h3 className="pb-3">Intl.js support in your browser</h3>
      <BrowserInfo />
    </div>
    <div className="container">
      <IntlJsSupport />
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

function IntlJsSupport() {
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
       <td class="text-center">{report[entry]}</td>
    </tr>
  );
    
  return (
    <table class="table table-md table-hover">
      <thead>
        <th>Intl Function Name</th>
        <th class="text-center">Supported</th>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function BrowserInfo() {
  return <div class="alert alert-light" role="alert">{navigator.userAgent}</div>;
}

