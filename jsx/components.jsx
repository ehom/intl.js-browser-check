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
  return (
    <div className="alert alert-light" role="alert">
      {navigator.userAgent}
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
