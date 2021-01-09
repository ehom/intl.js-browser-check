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
  var content = getTokens(navigator.userAgent).map(function (token) {
    return React.createElement(
      "span",
      { className: "pt-1 pb-1 pl-2 pr-2 mr-1 rounded border border-info" },
      token,
      " "
    );
  });

  return React.createElement(
    "div",
    null,
    content
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

function getTokens(s) {
  var isLeftParen = function isLeftParen(c) {
    return c === '(';
  };
  var RIGHT_PAREN = ')';
  var tokens = [];
  var endIndex = s.length - 1;

  for (var position = 0; position < s.length; position++) {
    var curChar = s[position];
    if (curChar.match(/[a-z]/i)) {
      var startIndex = position;
      var index = s.indexOf(' ', startIndex);
      if (index === -1) {
        tokens.push(s.slice(startIndex));
        break;
      } else {
        tokens.push(s.slice(startIndex, index));
        position = index;
      }
    } else if (isLeftParen(curChar)) {
      var _startIndex = position;
      // Assumption: 
      // String is well-formed, implying there is always a right paren.
      var _index = s.indexOf(RIGHT_PAREN, _startIndex);
      tokens.push(s.slice(_startIndex, _index + 1));
      position = _index + 1;
    }
  }
  return tokens;
}