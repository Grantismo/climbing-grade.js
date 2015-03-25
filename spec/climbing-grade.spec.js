describe("ClimbingGrade", function() {
  var french = ["2", "2+", "3", "3+", "4", "4+", "5a", "5b", "5c", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+", "9a", "9a+", "9b", "9b+", "9c"];
  var australian = []; for (var i = 7; i <= 39; i++) { australian.push(i.toString()); }
  var south_african = []; for (i = 8; i <= 41; i++) { south_african.push(i.toString()); }
  var uiaa = ["iii-", "iii", "iii+", "iv-", "iv", "iv+", "v-", "v", "v+", "vi-", "vi", "vi+", "vii-", "vii", "vii+", "viii-", "viii", "viii+", "ix-", "ix", "ix+", "ix+", "x-", "x", "x+", "xi-", "xi", "xi+", "xii-", "xii", "xii+"];
  var hueco = ["vb"]; for (i = 0; i <= 16; i++) { hueco.push("v" + i.toString()); }
  var font = ["1", "1+", "2", "2+", "3", "3+", "4", "4+", "5", "5+", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+"];
  var british = ["m 1", "d 2", "vd 3a", "vd 3b", "hvd 3b", "hvd 3c", "s 3c", "ms 4a", "s 4b", "hs 4b", "hs 4b", "vs 4b", "hvs 4c", "hvs 5a", "e1 5a", "e1 5b", "e2 5b", "e2 5c", "e3 5c", "e3 6a", "e4 6a", "e4 6b", "e5 6b", "e5 6b", "e6 6b", "e6 6b", "e6 6c", "e7 6c", "e7 7a", "e8 7a", "e8 7b", "e9 7b", "e10 7b", "e10 7c", "e11 7c", "e11 8a", "e11 8b", "e11 8c"];
  var yds = ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10a", "5.10b", "5.10c", "5.10d", "5.11a", "5.11b", "5.11c", "5.11d", "5.12a", "5.12b", "5.12c", "5.12d", "5.13a", "5.13b", "5.13c", "5.13d", "5.14a", "5.14b", "5.14c", "5.14d", "5.15a", "5.15b", "5.15c", "5.15d"];

  var systems = {
    french: french,
    australian: australian,
    south_african: south_african,
    uiaa: uiaa,
    hueco: hueco,
    font: font,
    british: british,
    yds: yds
  };


  if (!this.ClimbingGrade) {
    var ClimbingGrade = require("../climbing-grade");
  }

  it("can be instantiated", function() {
    var grade = new ClimbingGrade("9a", "french");
    expect(grade).toBeDefined();
  });

  it("can convert french to yds and back", function() {
    var french = new ClimbingGrade("9a", "french");
    var converted = french.format("yds");
    expect(converted).toBe("5.14d");

    var yds = new ClimbingGrade("5.14d", "yds");
    converted = yds.format("french");
    expect(converted).toBe("9a");

  });

  it("can convert grades into ranges where appropriate", function() {
    var hueco = new ClimbingGrade("vb", "hueco");
    var converted = hueco.format("font");
    expect(converted).toBe("1 to 3+");

    var french = new ClimbingGrade("6c", "french");
    converted = french.format("yds");
    expect(converted).toBe("5.11a/5.11b");
  });

  it("can change delimeters in initializer, or when formating", function() {
    var hueco1 = new ClimbingGrade("vb", "hueco");
    expect(hueco1.format("font", {rangeDelimeter: " - "})).toBe("1 - 3+");

    var hueco2 = new ClimbingGrade("vb", "hueco", {rangeDelimeter: " - "});
    expect(hueco2.format("font")).toBe("1 - 3+");

    var french1 = new ClimbingGrade("6c", "french");
    expect(french1.format("yds", {pairDelimeter: " to "})).toBe("5.11a to 5.11b");

    var french2 = new ClimbingGrade("6c", "french", {pairDelimeter: " to "});
    expect(french2.format("yds")).toBe("5.11a to 5.11b");
  });

  it("can format grades appropriately", function() {
    var hueco = new ClimbingGrade("v7", "hueco");
    expect(hueco.format("hueco")).toBe("V7");
    expect(hueco.format("uiaa")).toBe("IX+");
    expect(hueco.format("font")).toBe("7A+");
    expect(hueco.format("british")).toBe("E6 6c");
  });

  it("works with french", function() {
    testSystem("french");
  });

  it("works with australian", function() {
    testSystem("australian");
  });

  it("works with south african", function() {
    testSystem("south_african");
  });

  it("works with uiaa", function() {
    testSystem("uiaa");
  });

  it("works with hueco", function() {
    testSystem("hueco");
  });

  it("works with font", function() {
    testSystem("font");
  });

  it("works with british", function() {
    testSystem("british");
  });

  it("works with yds", function() {
    testSystem("yds");
  });

  it("reasonably converts sport to boulder grades", function() {
    expect(new ClimbingGrade("5.13a", "yds").format("hueco")).toBe("V7");
    expect(new ClimbingGrade("5.14a", "yds").format("hueco")).toBe("V10");
  });

  function testSystem(systemName){
    var system = systems[systemName];
    for (var i = 0; i < system.length; i++) {
      var input = system[i];
      var grade = new ClimbingGrade(input, systemName);
      expect(grade).toBeDefined();
      expect(grade.format(systemName).toLowerCase()).toBe(input);
    }
  }

});
