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
        <th>Intl Object</th>
        <th class="text-center">This browser</th>
        <th class="text-center">*Node.js</th>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

function BrowserInfo() {
  const content = getTokens(navigator.userAgent).map(token => {
    return (
      <span className="pt-1 pb-1 pl-2 pr-2 mr-1 rounded border border-info">{token}&#32;</span>
    );
  });

  return (
    <div>
      {content}
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

function getTokens(s) {
  const isLeftParen = (c) => c === '(';
  const RIGHT_PAREN = ')';
  let tokens = [];
  let endIndex = s.length - 1;

  for (let position = 0; position < s.length; position++) {
    const curChar = s[position];
    if (curChar.match(/[a-z]/i)) {
      const startIndex = position;
      let index = s.indexOf(' ', startIndex);
      if (index === -1) {
        tokens.push(s.slice(startIndex));
        break;
      } else {
        tokens.push(s.slice(startIndex, index));
        position = index;
      }
    } else if (isLeftParen(curChar)) {
      const startIndex = position;
      // Assumption: 
      // String is well-formed, implying there is always a right paren.
      let index = s.indexOf(RIGHT_PAREN, startIndex);
      tokens.push(s.slice(startIndex, index + 1));
      position = index + 1;
    }
  }
  return tokens;
}
