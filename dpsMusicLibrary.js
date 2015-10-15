var jsonData;
var randomMusicKey = "";
var omusicTheory = null;
var omusickeys = null;
var allMusickeys = null;
var _lineColors = "black"
var _noteColors = "black"


function GetAllMusicKeyInfo(keyName) {

	if (allMusickeys == null)
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.overrideMimeType("text/plain; charset=x-user-defined");
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("keyDetails").innerHTML = "";

				jsonData = xmlhttp.responseText;

				allMusickeys = JSON.parse(jsonData);

				DisplayMusicKeyInfo(keyName);

			}
		}
		xmlhttp.open("GET", "MusicKeys.html", true);
		xmlhttp.send();
		
		
	}
	else
	{
		DisplayMusicKeyInfo(keyName);
	}
}

function DisplayMusicKeyInfo(keyName)
{
	document.getElementById("keyDetails").innerHTML = "";

	for (var j = 0; j < omusickeys.musickeys.length ; j++) {

		if (keyName == omusickeys.musickeys[j].name || keyName == undefined) {
			document.getElementById("keyDetails").innerHTML = document.getElementById("keyDetails").innerHTML +
			  "Key Name : " + omusickeys.musickeys[j].name + "<BR>" +
			  "Key Sharps : " + omusickeys.musickeys[j].sharps + ", "
			;

			for (var i = 0; i < omusickeys.musickeys[j].sharps ; i++) {
				document.getElementById("keyDetails").innerHTML = document.getElementById("keyDetails").innerHTML +
			   "" +
				omusickeys.musickeys[j].sharplist[i] + ",";
			}

			document.getElementById("keyDetails").innerHTML = document.getElementById("keyDetails").innerHTML + "<BR>";
		}

	}


}


function ShowMusicKey(keyName) {

	GetAllMusicKeyInfo(keyName);
	return;

}

function GetRandomMusicKey()
{


	var xmlhttp = new XMLHttpRequest();
	var randomArrayIndex = 0;

	if (omusickeys == null)
	{
		xmlhttp.overrideMimeType("text/plain; charset=x-user-defined");
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				jsonData = xmlhttp.responseText;

				omusickeys = JSON.parse(jsonData);

				randomArrayIndex = Math.floor(Math.random() * omusickeys.musickeys.length);
				randomMusicKey = omusickeys.musickeys[Number(randomArrayIndex)].name;

				ShowMusicKey(randomMusicKey);
			}
		}
		xmlhttp.open("GET", "MusicKeys.html", true);
		xmlhttp.send();
		
	}
	else
	{
		randomArrayIndex = Math.floor(Math.random() * omusickeys.musickeys.length);
		randomMusicKey = omusickeys.musickeys[Number(randomArrayIndex)].name;

		ShowMusicKey(randomMusicKey);
	}
}

function ShowRandomMusicTheory() {


    var xmlhttp = new XMLHttpRequest();
    var randomArrayIndex = 0;
    var randomMusicTheory = "";

    if (omusicTheory == null) {
        xmlhttp.overrideMimeType("text/plain; charset=x-user-defined");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                jsonData = xmlhttp.responseText;

                omusicTheory = JSON.parse(jsonData);

                randomArrayIndex = Math.floor(Math.random() * omusicTheory.musictheory.length);
                randomMusicTheory = omusicTheory.musictheory[Number(randomArrayIndex)].desc;
                document.getElementById("musTheory").innerHTML = randomMusicTheory;

            }
        }
        xmlhttp.open("GET", "MusicTheory.html", true);

        xmlhttp.send();
    }
    else {
        randomArrayIndex = Math.floor(Math.random() * omusicTheory.musictheory.length);
        randomMusicTheory = omusicTheory.musictheory[Number(randomArrayIndex)].desc;
        document.getElementById("musTheory").innerHTML = randomMusicTheory;
    }
}



function changeLowest() {
	lowestWantedNote = Number(document.getElementById("lownote").value);
	highestWantedNote = Number(document.getElementById("highnote").value);

	if (highestWantedNote < lowestWantedNote) {
		highestWantedNote = Number(lowestWantedNote) + 1;
		document.getElementById("highnote").value = highestWantedNote;
	}
	// Store
	localStorage.setItem("lownote", lowestWantedNote);
	localStorage.setItem("highnote", highestWantedNote);

	document.getElementById("lowestNoteText").innerHTML = "Lowest Note (" + guitarNotes[lowestWantedNote] + ")";
	document.getElementById("highestNoteText").innerHTML = "Highest Note (" + guitarNotes[highestWantedNote - 1] + ")";

}

function changeHighest() {
	highestWantedNote = document.getElementById("highnote").value;
	// Store
	localStorage.setItem("highnote", highestWantedNote);

	document.getElementById("highestNoteText").innerHTML = "Highest Note (" + guitarNotes[highestWantedNote - 1] + ")";

}


function getRandomGuitarNoteNumber() {

	noteNum = Number(lowestWantedNote) + Math.floor((Number(highestWantedNote) - Number(lowestWantedNote)) * Math.random());
	//if (noteNum > 22) alert("high " + highestWantedNote + " low " + lowestWantedNote + " note " + noteNum);

	//		noteNum = Math.floor(numGuitarNotes * Math.random());
	return noteNum;
}

function getRandomGuitarNote() {
	noteNum = getRandomGuitarNoteNumber();
	return { name: guitarNotes[noteNum], num: noteNum };
}

function getLedgerLinesThroughAbove(notename) {
	switch (notename) {
		case "F1":
			return 3;
			break;
		case "A1":
			return 2;
			break;
		case "C1":
			return 1;
			break;
		default:
			return 0;

	}
}

function getLedgerLinesThroughBelow(notename) {
	switch (notename) {
		case "E4":
			return 3;
			break;
		case "C3":
			return 2;
			break;
		case "A3":
			return 1;
			break;
		default:
			return 0;

	}
}


function getLedgerLinesAbove(notename) {
	switch (notename) {
		case "E1":
			return 3;
			break;
		case "G1":
			return 2;
			break;
		case "B1":
			return 1;
			break;
		default:
			return 0;

	}
}

function getLedgerLinesBelow(notename) {
	switch (notename) {
		case "B3":
			return 1;
			break;
		case "D3":
			return 2;
			break;
		default:
			return 0;

	}
}

function changeSpeed() {
	var spd = document.getElementById("speed").value;
	myTimer = window.clearInterval(myTimer);
	myTimer = window.setInterval(function () { makeMusicScore() }, spd * 1000);

	// Store
	localStorage.setItem("musicscorespeed", spd);

}


function makeMusicScore() {

	//Randomize a key
	GetRandomMusicKey();

	//Show a theory snippet
	ShowRandomMusicTheory();

	var c = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');
	
	//ctx.fillStyle = document.getElementById("idBody").attributes("backolor"); // "lightblue"; //'#FF0000';
	ctx.fillStyle = "lightblue"; // "lightblue"; //'#FF0000';
	ctx.fillRect(0, 0, 1000, 1000);
	

	makeMusicScoreLine(50);

	makeMusicScoreLine(50 + 3 * (10 * notGap));
	//makeMusicScoreLine(50 + 6 * (10 * notGap));

}
//var myVar = setInterval(function () { makeMusicScore() }, 8000);

function makeMusicScoreLine(startStaff) {

	var userWantsThirds = 0;
	userWantsThirds = document.getElementById("chkUseTriads").checked;

	var userWantsFiths = 0;
	userWantsFiths = document.getElementById("chkUseFiths").checked;

	var userWantsSolfege = 0;
	userWantsSolfege = document.getElementById("chkSolfegeText").checked;

	var musSolfegeSymbols = ["doh", "re", "me", "fa", "so", "lah", "ti" , "doh"];

	var userWantsNoteNames = 0;
	userWantsNoteNames = document.getElementById("chkNoteNames").checked;


	var lowNote = startStaff + 15 * notGap;

	drawMusicStaff(startStaff);

	var musNotes = [""];
	var theNote;
	for (i = 1; i < 9; i++) {
		theNote = getRandomGuitarNote();
		var raiseNote = (notGap * theNote.num);

		var addThd = Math.floor(2 * Math.random());
		addThd = (addThd && userWantsThirds);

		var addFth = Math.floor(2 * Math.random());
		addFth = (addFth && userWantsFiths);

		var numLedgeLineAbove = ((raiseNote / notGap) < 5);
		//var numLedgeLineThrough = ((raiseNote / notGap) % 2);

		musNotes[i] = {
			name: theNote.name, pos: raiseNote, len: "4", addThird: (addThd == 1), addFith: (addFth == 1),
			ledLineAbove: numLedgeLineAbove, numberInScale: theNote.num
		};
	}



	for (i = 1 ; i < 9; i++) {
		drawMusicNote(i * 100, lowNote - musNotes[i].pos, musNotes[i].name);
		//drawKeySharp(i * 100, lowNote - musNotes[i].pos, musNotes[i].name);


		if (musNotes[i].addThird == 1) {
			drawMusicNote(i * 100, lowNote - musNotes[i].pos - (2 * notGap), musNotes[i].name);
		}

		if (musNotes[i].addFith == 1)
			drawMusicNote(i * 100, lowNote - musNotes[i].pos - (4 * notGap), musNotes[i].name);

		var solfegeText = "";
		var noteNum = musNotes[i].numberInScale;
		if (userWantsSolfege == 1 && noteNum < 8)
		{
		    try {
		        solfegeText = musSolfegeSymbols[noteNum];
		    } catch (e) {
		        solfegeText = "";
		    }
		}
		drawSolfegeText(i * 100, lowNote + 25, solfegeText);

		var note = musNotes[i].name;
		note = note.substring(0, 1);
		note = note.toLowerCase();
		if (userWantsNoteNames == 1)
		    drawSNoteNameText(i * 100, lowNote + 20, note);

	}


}

function drawLine(x, y, w, z) {
	var c = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = _lineColors;
	ctx.strokeStyle = _lineColors;

	ctx.fill();

	ctx.moveTo(x, y);
	ctx.lineTo(w, z);
	ctx.stroke();

}


function drawMusicStaff(y) {
	var start = 50;
	var length = 800;


	drawLine(start, y, start + length, y)
	drawLine(start, y + 1 * (2 * notGap), start + length, y + 1 * (2 * notGap));
	drawLine(start, y + 2 * (2 * notGap), start + length, y + 2 * (2 * notGap));
	drawLine(start, y + 3 * (2 * notGap), start + length, y + 3 * (2 * notGap));
	drawLine(start, y + 4 * (2 * notGap), start + length, y + 4 * (2 * notGap));

	drawLine(start, y, start, y + 4 * (2 * notGap));
	drawLine(start + length, y, start + length, y + 4 * (2 * notGap));
	drawLine(start + (length / 2), y, start + (length / 2), y + 4 * (2 * notGap));

}

function drawMusicNote(x, y, notename) {
	var c = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = _noteColors;
	ctx.arc(x, y, notGap, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(x + notGap, y);
	ctx.lineTo(x + notGap, y - (5 * notGap));
	ctx.stroke();

	var ledgLinesThru = getLedgerLinesThroughAbove(notename);
	var linePos = y;
	while (ledgLinesThru > 0) {
		drawLine(x - 10, linePos, x + 10, linePos);
		linePos = linePos - 2 * notGap;
		ledgLinesThru--;
	}


	var ledgLinesThru = getLedgerLinesThroughBelow(notename);
	var linePos = y;
	while (ledgLinesThru > 0) {
		drawLine(x - 10, linePos, x + 10, linePos);
		linePos = linePos + 2 * notGap;
		ledgLinesThru--;
	}


	var ledgLinesAbove = getLedgerLinesAbove(notename);
	var linePos = y;
	while (ledgLinesAbove > 0) {
		drawLine(x - 10, linePos - notGap, x + 10, linePos - notGap);
		linePos = linePos - 2 * notGap;
		ledgLinesAbove--;
	}

	var ledgLinesBelow = getLedgerLinesBelow(notename);
	var linePos = y;
	while (ledgLinesBelow > 0) {
		drawLine(x - 10, linePos + notGap, x + 10, linePos + notGap);
		linePos = linePos + 2 * notGap;
		ledgLinesBelow--;
	}




	return;
}

function drawSolfegeText(x, y, solfegeText) {

    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();

    // Add Solfege Symbols below notes
    ctx.font = "20px Georgia";
    ctx.fillText(solfegeText, x, y);

    return;
}

function drawSNoteNameText(x, y, noteName) {

    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();

    // Add Solfege Symbols below notes
    ctx.font = "20px Georgia";
    ctx.fillText(noteName, x, y);

    return;
}




function drawKeySharp(x, y, notename) {
	var c = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = "black" // "#3370d4"; //blue

	ctx.beginPath();
	ctx.strokeStyle = "purple"; // Purple path
	ctx.moveTo(x + notGap, y);
	ctx.lineTo(x + 2 * notGap, y - (3 * notGap));
	ctx.stroke();

	x = x + 5;

	ctx.beginPath();
	ctx.strokeStyle = "purple"; // Purple path
	ctx.moveTo(x + notGap, y);
	ctx.lineTo(x + 2 * notGap, y - (3 * notGap));
	ctx.stroke();

	x = x - 10;

	ctx.beginPath();
	ctx.strokeStyle = "purple"; // Purple path
	ctx.moveTo(x + notGap, y - (2 * notGap));
	ctx.lineTo(x + 5 * notGap, y - (2 * notGap));
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "purple"; // Purple path
	ctx.moveTo(x + notGap, y - (1 * notGap));
	ctx.lineTo(x + 5 * notGap, y - (1 * notGap));
	ctx.stroke();

	return;
}
