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
        { className: "jumbotron pt-4 pb-4" },
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