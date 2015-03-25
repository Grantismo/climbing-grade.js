var ClimbingGrade = (function() {
  function ClimbingGrade(grade, system, options) {
    this._inputGrade = grade;
    this._inputSystemName = system;
    this._rangeDelimeter = options && options.rangeDelimeter ? options.rangeDelimeter : " to ";
    this._pairDelimeter = options && options.pairDelimeter ? options.pairDelimeter : "/";
    this._systems = {
      yds: {
        grades: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10a", "5.10b", "5.10c", "5.10d", "5.11a", "5.11b", "5.11c", "5.11d", "5.12a", "5.12b", "5.12c", "5.12d", "5.13a", "5.13b", "5.13c", "5.13d", "5.14a", "5.14b", "5.14c", "5.14d", "5.15a", "5.15b", "5.15c", "5.15d"],
      },
      french: {
        grades: ["2", "2+", "3", "3+", "4", "4+", "5a", "5b", "5c", "6a", "6a+", "6b", "6b+", "6c", "6c/6c+", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+", "9a", "9a+", "9b", "9b+", "9c"],
      },
      australian: {
        grades: ["7", "8", "9/10", "11", "12", "13", "14/15", "15/16", "17", "18", "19", "20", "20/21", "21", "22", "22/23", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39"]
      },
      south_african: {
        grades: ["8", "9", "10/11", "12", "13", "14", "15", "16", "17/18", "19", "20", "21", "22", "22/23", "23/24", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41"]
      },
      uiaa: {
        grades: ["iii-", "iii", "iii+", "iv-", "iv", "iv+/v-", "v-/v", "v+/vi-", "vi-/vi", "vi/vi+", "vii-", "vii-/vii", "vii/vii+", "vii+", "viii-", "viii", "viii/viii+", "viii+", "ix-", "ix-/ix", "ix/ix+", "ix+", "x-", "x-/x", "x/x+", "x+", "xi-", "xi", "xi+", "xi+/xii-", "xii-/xii", "xii", "xii+"],
        format: String.prototype.toUpperCase
      },
      british: {
        grades: ["m 1", "d 2", "vd 3a", "vd 3b/hvd 3b", "hvd 3c/s 3c", "ms 4a", "s 4b/hs 4b", "hs 4b/vs 4b", "hvs 4c", "hvs 5a", "e1 5a", "e1 5b", "e2 5b", "e2 5c", "e3 5c", "e3 6a", "e4 6a", "e4 6b", "e5 6b", "e5 6b/e6 6b", "e6 6b", "e6 6c", "e7 6c", "e7 7a", "e8 7a", "e8 7b", "e9 7b", "e10 7b", "e10 7c", "e11 7c", "e11 8a", "e11 8b", "e11 8c"],
        format: function() {
          var gradeParts = this.split(" ");
          return gradeParts[0].toUpperCase() + " " + gradeParts[1];
        }
      },
      hueco: {
        grades: ["vb", "vb", "vb", "vb", "vb", "vb", "vb", "vb", "vb", "vb", "v0", "v0+", "v1", "v2", "v2", "v3", "v4", "v4", "v5", "v5", "v6", "v7", "v8", "v8", "v9", "v10", "v11", "v12", "v13", "v14", "v15", "v16", "v17"],
        format: String.prototype.toUpperCase
      },
      font: {
        grades: ["1", "1", "1", "1", "1", "1+", "2", "2+", "3", "3+", "4", "4+", "5", "5+", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+", "9a"],
        format: String.prototype.toUpperCase
      }
    };

    this._universalGrades = this.getUniversalGrades();
  }

  function formatGrade(g, system) {
    return system.format ? system.format.call(g) : g;
  }

  var _format = function(target, options) {
    var system = this.getSystem(target);

    if (target === this._inputSystemName) {
      return formatGrade(this._inputGrade, system);
    }

    var pairDelimeter = options && options.pairDelimeter ? options.pairDelimeter : this._pairDelimeter;
    var rangeDelimeter = options && options.rangeDelimeter ? options.rangeDelimeter : this._rangeDelimeter;


    var gradeSet = Object.create(null);
    var universalGrades = this.getUniversalGrades();
    var grades = [];
    for (var i = 0; i < universalGrades.length; i++) {
      var gradeRange = system.grades[universalGrades[i]].split("/");
      for (var j = 0; j < gradeRange.length; j++) {
        var g = gradeRange[j];
        var grade = formatGrade(g, system);
        if (!(grade in gradeSet)) {
          gradeSet[grade] = true;
          grades.push(grade);
        }
      }
    }

    if (grades.length == 1) {
      return grades[0];
    } else if (grades.length == 2) {
      return grades.join(pairDelimeter);
    } else if (grades.length > 2) {
      return grades[0] + rangeDelimeter + grades[grades.length - 1];
    }
  };

  ClimbingGrade.prototype.getSystem = function(system) {
    var climbingSystem = this._systems[system];
    if (climbingSystem) {
      return climbingSystem;
    } else {
      throw new Error("Climbing System Not Recognized");
    }
  };

  ClimbingGrade.prototype.getUniversalGrades = function() {
    if (this._universalGrades) {
      return this._universalGrades;
    }

    var normalizedGrade = this._inputGrade.toLowerCase();

    var grades = this.getSystem(this._inputSystemName).grades;
    var universalGrades = [];
    for (var i = 0; i < grades.length; i++) {
      if (grades[i].split('/').indexOf(normalizedGrade) > -1) {
        universalGrades.push(i);
      } else if (universalGrades.length > 0) {
        break;
      }
    }

    if (universalGrades.length === 0) {
      throw new Error("Climbing Grade Not Recognized");
    }

    return universalGrades;
  };

  ClimbingGrade.prototype.format = function(target, options) {
    return _format.call(this, target, options);
  };

  return ClimbingGrade;
})();

if (typeof exports === 'undefined') {
  this.ClimbingGrade = ClimbingGrade;
} else {
  module.exports = ClimbingGrade;
}
