var french = ["2", "2+", "3", "3+", "4", "4+", "5a", "5b", "5c", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+", "9a", "9a+", "9b", "9b+", "9c"];
var australian = []; for (var i = 7; i <= 39; i++) { australian.push(i.toString()); }
var south_african = []; for (i = 8; i <= 41; i++) { south_african.push(i.toString()); }
var uiaa = ["III-", "III", "III+", "IV-", "IV", "IV+", "V-", "V", "V+", "VI-", "VI", "VI+", "VII-", "VII", "VII+", "VIII-", "VIII", "VIII+", "IX-", "IX", "IX+", "IX+", "X-", "X", "X+", "XI-", "XI", "XI+", "XII-", "XII", "XII+"];
var heuco = ["VB"]; for (i = 0; i <= 16; i++) { heuco.push("V" + i.toString()); }
var font = ["1", "1+", "2", "2+", "3", "3+", "4", "4+", "5", "5+", "6A", "6A+", "6B", "6B+", "6C", "6C+", "7A", "7A+", "7B", "7B+", "7C", "7C+", "8A", "8A+", "8B", "8B+", "8C", "8C+"];
var british = ["M 1", "D 2", "VD 3a", "VD 3b", "HVD 3b", "HVD 3c", "S 3c", "MS 4a", "S 4b", "HS 4b", "HS 4b", "VS 4b", "HVS 4c", "HVS 5a", "E1 5a", "E1 5b", "E2 5b", "E2 5c", "E3 5c", "E3 6a", "E4 6a", "E4 6b", "E5 6b", "E5 6b", "E6 6b", "E6 6b", "E6 6c", "E7 6c", "E7 7a", "E8 7a", "E8 7b", "E9 7b", "E10 7b", "E10 7c", "E11 7c", "E11 8a", "E11 8b", "E11 8c"];
var yds = ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10a", "5.10b", "5.10c", "5.10d", "5.11a", "5.11b", "5.11c", "5.11d", "5.12a", "5.12b", "5.12c", "5.12d", "5.13a", "5.13b", "5.13c", "5.13d", "5.14a", "5.14b", "5.14c", "5.14d", "5.15a", "5.15b", "5.15c", "5.15d"];

var systems = {
  french: french,
  australian: australian,
  south_african: south_african,
  uiaa: uiaa,
  heuco: heuco,
  font: font,
  british: british,
  yds: yds
};


$(document).ready(function(){
  function selectGradesFromSystemName(systemName){
    $('#grade option').remove();
    for(var i in systems[systemName]){
      $('<option value="' + systems[systemName][i] +'">'+systems[systemName][i] +'</option>').appendTo('#grade');
    }
  }
  for(var system in systems) {
    $('<option value="'+system+'">'+system+'</option>').appendTo('#system');
    $('<option value="'+system+'">'+system+'</option>').appendTo('#format');
  }

  var g = new ClimbingGrade("2", "french");

  selectGradesFromSystemName('french');
  $('#system').change(function() {
    selectGradesFromSystemName($(this).val());

    var grade = $('#grade').val();
    var system = $(this).val();
    g = new ClimbingGrade(grade, system);
  });

  $('#grade').change(function() {
    var grade = $(this).val();
    var system = $('#system').val();
    var format = $('#format').val();
    g = new ClimbingGrade(grade, system);
    $('#converted-grade').text(g.format(format));
  });

  $('#format').change(function() {
    var format = $('#format').val();
    $('#converted-grade').text(g.format(format));
  });


});
