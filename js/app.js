const supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

const isSupported = (functionName) => { 
  return supportedFunctions.indexOf(functionName) > -1;
};

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
  
  const buildSupportTable = (names) => {
    const CHECK_MARK = 0x2714;
    return functionNames.reduce((obj, name) => {
      return {
        ...obj, [name]: isSupported(name) ? String.fromCharCode(CHECK_MARK) : ''
      };
    }, {});
  };

  let table = buildSupportTable(functionNames);

  const tableRows = Object.keys(table).map((item) => 
    <tr>
       <td><FunctionLink name={item}/></td>
       <td class="text-center">{table[item]}</td>
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
  return (
    <React.Fragment>
      ({navigator.userAgent})
    </React.Fragment>
  );
}

ReactDOM.render(<BrowserInfo/>, document.getElementById('browserInfo'));

ReactDOM.render(
  <IntlJsSupport/>,
  document.getElementById('main')
);
