function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

var isSupported = function isSupported(functionName) {
  return supportedFunctions.indexOf(functionName) > -1;
};

var page = React.createElement(
  React.Fragment,
  null,
  React.createElement(
    "div",
    { className: "jumbotron pb-2" },
    React.createElement(
      "h3",
      { className: "pb-3" },
      "Intl.js support in your browser"
    ),
    React.createElement(BrowserInfo, null)
  ),
  React.createElement(
    "div",
    { className: "container" },
    React.createElement(IntlJsSupport, null)
  )
);

ReactDOM.render(page, document.getElementById('root'));

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

  var buildReport = function buildReport(names) {
    var CHECK_MARK = 0x2714;
    return functionNames.reduce(function (obj, name) {
      return Object.assign({}, obj, _defineProperty({}, name, isSupported(name) ? String.fromCharCode(CHECK_MARK) : ''));
    }, {});
  };

  var report = buildReport(functionNames);

  var tableRows = Object.keys(report).map(function (entry) {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        React.createElement(FunctionLink, { name: entry })
      ),
      React.createElement(
        "td",
        { "class": "text-center" },
        report[entry]
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
    "div",
    { "class": "alert alert-light", role: "alert" },
    navigator.userAgent
  );
}