var intljsTable = {
  support: {},
  nodejs: {}
};

var supportedFunctions = Object.getOwnPropertyNames(window["Intl"]);

var isSupported = function isSupported(functionName) {
  return supportedFunctions.indexOf(functionName) > -1;
};

fetch("https://raw.githubusercontent.com/ehom/nodejs-intl/main/intljs.json").then(function (response) {
  return response.json();
}).then(function (data) {
  console.debug("nodejs:", data);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data["Intl.js"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;

      intljsTable.support[name] = { browser: false, nodejs: true };
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  intljsTable.nodejs["version"] = data["Node.js"].version;
  console.log("nodejs version", intljsTable.nodejs.version);
  main();
});

var APP_NAME = "Intl.js Support";

document.title = APP_NAME;

function main() {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(intljsTable.support)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      intljsTable.support[key].browser = isSupported(key);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  console.debug("updated: ", intljsTable.support);

  var App = function App() {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        "div",
        { className: "jumbotron pt-4 pb-2" },
        React.createElement(
          "h3",
          { className: "pb-3" },
          "Intl.js support in this browser"
        ),
        React.createElement(BrowserInfo, null)
      ),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(IntlJsSupport, { data: intljsTable.support })
      ),
      React.createElement("hr", null),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(NodejsInfo, { version: intljsTable.nodejs.version })
      )
    );
  };

  ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
}

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
        "Intl Object Name"
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