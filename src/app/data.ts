export let octaves = ["1","2","3","4","5","6","7","8"];
export let noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export let chordpatterns = {
  "": [0, 4, 7],
  "7": [0, 4, 7, 10],
  "maj7": [0, 4, 7, 11],
  "m": [0, 3, 7],
  "m7": [0, 3, 7, 10],
  "mmaj7": [0, 3, 7, 11],
  "dim": [0, 3, 6],
  "dim7": [0, 3, 6, 9],
}
export let chordNames = {
  "": "Major",
  "7": "Dominant 7th",
  "maj7": "Major 7th",
  "m": "Minor",
  "m7": "Minor 7th",
  "mmaj7": "Minor major 7th",
  "dim": "Diminished",
  "dim7": "Diminished 7th"
}
export function stringToNum(note: string) {
  var sym = "";
  var oct = 0;
  if (note.length == 2) {
    sym = note[0];
    oct = parseInt(note[1]);
  } else {
    sym = note.slice(0,2);
    oct = parseInt(note[2]);
  }
  // Find the corresponding note in the array.
  return oct*12 + noteNames.indexOf(sym);
}
export function numToString(note: number, octave = true) {
  var oct = (Math.floor(note/12) - 1).toString();
  var sym = noteNames[note % 12];
  if(octave) {
    return sym + oct;
  } else {
    return sym
  }
}
export function generateChords() {
  var chords = {};
  for(let root = 21; root < 33; root++) {
    for(let pat of Object.keys(chordpatterns)) {
      chords[numToString(root, false) + " " + pat]
      = chordpatterns[pat].map(nos => numToString(root + nos, false)).sort(); // nos - noteoffset
    }
  }
  return chords;
}