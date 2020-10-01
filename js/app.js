function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

var isSupported = function isSupported(functionName) {
  return supportedFunctions.indexOf(functionName) > -1;
};

function FunctionLink(props) {
  var URL = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/" + props.name;
  var title = "Link to MDN doc on Intl." + props.name;
  return React.createElement(
    "a",
    { href: URL, target: "_blank", title: title },
    props.name
  );
}

function IntlJsSupport() {
  var functionNames = ["DateTimeFormat", "NumberFormat", "RelativeTimeFormat", "Collator", "ListFormat", "PluralRules", "Locale", "getCanonicalLocales"];

  console.debug("functionNames:", functionNames);

  var buildSupportTable = function buildSupportTable(names) {
    var CHECK_MARK = 0x2714;
    return functionNames.reduce(function (obj, name) {
      return Object.assign({}, obj, _defineProperty({}, name, isSupported(name) ? String.fromCharCode(CHECK_MARK) : ''));
    }, {});
  };

  var table = buildSupportTable(functionNames);

  var tableRows = Object.keys(table).map(function (item) {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        React.createElement(FunctionLink, { name: item })
      ),
      React.createElement(
        "td",
        { "class": "text-center" },
        table[item]
      )
    );
  });

  return React.createElement(
    "table",
    { "class": "table table-md table-hover" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "th",
        null,
        "Intl Function Name"
      ),
      React.createElement(
        "th",
        { "class": "text-center" },
        "Supported"
      )
    ),
    React.createElement(
      "tbody",
      null,
      tableRows
    )
  );
}

function BrowserInfo() {
  return React.createElement(
    React.Fragment,
    null,
    "(",
    navigator.userAgent,
    ")"
  );
}

ReactDOM.render(React.createElement(BrowserInfo, null), document.getElementById('browserInfo'));

ReactDOM.render(React.createElement(IntlJsSupport, null), document.getElementById('main'));