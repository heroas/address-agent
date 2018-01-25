const loadJsonFile = require('load-json-file');

function parseJson(file) {
  loadJsonFile('foo.json').then(json => {
    console.log(json);
    //=> {foo: true}
  });
}

export {
  parseJson
}
