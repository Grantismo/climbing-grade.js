# ClimbingGrade.js

[![MIT License][license-image]][license-url]

> ClimbingGrade.js converts climbing grades between different systems.

Currently supported systems include: French, Australian, South African, UIAA, Heuco, Font, British, YDS

## Installation


## Usage

```javascript
    var ClimbingGrade = require("ClimbingGrade");
    var grade = new ClimbingGrade("9a", "french");
    grade.format("yds"); // 5.14d
```

## Tests

```bash
  jasmine
```

## License

[MIT][license-url]

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
