# read-json-stream
Node library for reading and parsing JSON files as streams.

### Why?
Node does not like parsing huge JSON files. In fact, it completely crashes! One alternative is to stream the file and parse it as it comes in. This not only removes any limits on how large a JSON file you can open & parse, it also is better for memory management.

### What?
read-json-stream allows you to easily load and parse JSON files, large or small. I do not provide hooks for doing other transformations during the stream. This lib is simply an alternative to using ``fs.loadFile`` and then ``JSON.parse``. The one extra feature this does provide is the option of registering a progress callback which is run while streaming and is passed an integer from 1 to 100, showing the percentage complete.

### How?
```
npm install read-json-stream
```
First, import/require the lib:
```
import ReadJSONStream from 'read-json-stream';
```
Or, if you are using older syntax:
```
var ReadJSONStream = require('read-json-stream').default;
```
Then load a JSON file.
```
ReadJSONStream(filePath)  // filePath is a file path string e.g. 'data/myData.json' or 'path.join('data', 'myData.json');
  .done((err, data) => {
    if(err) {
      // handle error
    } else {
      // do something with the freshly-parsed data!
    }
  });
```
To keep track of progress, register a progress callback.
```
ReadJSONStream(filePath)
  .progress(p => {
    console.log(`${p}% done so far!`);
  }),
  .done((err, data) => {
    if(err) {
      // handle error
    } else {
      // do something with the freshly-parsed data!
    }
  });
```
If you are not used to ES2015 syntax, you can write it as:
```
ReadJSONStream(filePath)
  .progress(function(p) {
    console.log(p + '% done so far!');
  }),
  .done(function(err, data) {
    if(err) {
      // handle error
    } else {
      // do something with the freshly-parsed data!
    }
  });
```
### npm Scripts
Run the tests:
```
npm test
```
To re-compile the source code:
```
npm run build
```
To watch the ``src`` directory and automatically recompile on changes:
```
npm run watch
```

### Contributions
Contributions are welcome! If you have any issues and/or contributions you would like to make, feel free to file an issue and/or issue a pull reuqest.

### License
Apache License Version 2.0

Copyright (c) 2016 by Ryan Burgett.
