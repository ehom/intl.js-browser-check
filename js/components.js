function FunctionLink(props) {
  var URL = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/" + props.name;
  var title = "Link to MDN doc on Intl." + props.name;
  return React.createElement(
    "a",
    { href: URL, target: "_blank", title: title },
    props.name
  );
}

function IntlJsSupport(_ref) {
  var data = _ref.data;

  var functionNames = Object.keys(data).sort();

  console.debug("functionNames:", functionNames);

  var tableRows = functionNames.map(function (key) {
    var CHECK_MARK = String.fromCharCode(0x2714);
    var browserSupport = data[key].browser ? CHECK_MARK : "";
    var nodejsSupport = data[key].nodejs ? CHECK_MARK : "";

    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        React.createElement(FunctionLink, { name: key })
      ),
      React.createElement(
        "td",
        { className: "text-center" },
        browserSupport
      ),
      React.createElement(
        "td",
        { className: "text-center" },
        nodejsSupport
      )
    );
  });

  return React.createElement(
    "table",
    { className: "table table-md table-hover" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "th",
        null,
        "Intl Object"
      ),
      React.createElement(
        "th",
        { "class": "text-center" },
        "This browser"
      ),
      React.createElement(
        "th",
        { "class": "text-center" },
        "*Node.js"
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
    { className: "alert alert-light", role: "alert" },
    navigator.userAgent
  );
}

function NodejsInfo(_ref2) {
  var version = _ref2.version;

  return React.createElement(
    "p",
    null,
    React.createElement(
      "strong",
      null,
      "*"
    ),
    "Node.js version: ",
    version
  );
}