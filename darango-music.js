var jsonData;
var randomMusicKey = "";
var omusicTheory = null;
var omusickeys = null;
var allMusickeys = null;
var _lineColors = "black"
var _noteColors = "black"


function GetMusicStaffCanvas(canvasId)
{
	return document.getElementById(canvasId);
}

function GetMusicStaffCanvasContext(canvasId) {
	return GetMusicStaffCanvas(canvasId).getContext('2d');
}


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

function ShowRandomMusicTheory(ctx) {


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
                writeTextOnCanvas(20, 20, randomMusicTheory, ctx);
            }
        }
        xmlhttp.open("GET", "MusicTheory.html", true);

        xmlhttp.send();
    }
    else {
        randomArrayIndex = Math.floor(Math.random() * omusicTheory.musictheory.length);
        randomMusicTheory = omusicTheory.musictheory[Number(randomArrayIndex)].desc;
        document.getElementById("musTheory").innerHTML = randomMusicTheory;
        writeTextOnCanvas(20, 20, randomMusicTheory, ctx);
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

	var lowestNote = Number(lowestWantedNote);
	var highestNote = Number(highestWantedNote);
	var possibleNoteCount = Math.floor(highestNote - lowestNote);
	var randomSeed = Math.random();
	
	var randomNote = Math.floor(lowestNote + (possibleNoteCount * randomSeed));
	
	//var rangingUpByNoteCount = Math.floor((Number(highestWantedNote) - Number(lowestWantedNote));
	
	

	//var randomGeneratedNoteNumber = lowestNote
	var noteNum = Number(lowestWantedNote) + Math.floor((Number(highestWantedNote) - Number(lowestWantedNote)) * Math.random());
	//if (noteNum > 22) alert("high " + highestWantedNote + " low " + lowestWantedNote + " note " + noteNum);

	//		noteNum = Math.floor(numGuitarNotes * Math.random());
	return randomNote;
}

function getRandomGuitarNote() {
	noteNum = getRandomGuitarNoteNumber();
	return { name: guitarNotes[noteNum], num: noteNum };
}



function changeSpeed() {
	var spd = document.getElementById("speed").value;
	myTimer = window.clearInterval(myTimer);
	myTimer = window.setInterval(
		function () {
			makeMusicScore("myCanvas1");
			makeMusicScore("myCanvas2");
			makeMusicScore("myCanvas3");
			makeMusicScore("myCanvas4");
			makeMusicScore("myCanvas5");

		}, spd * 1000);

	// Store
	localStorage.setItem("musicscorespeed", spd);

}


function makeMusicScore(canvasId) {

	//Randomize a key
	GetRandomMusicKey();

	//Show a theory snippet

	var cTheory = GetMusicStaffCanvas("myCanvas6"); 
	var ctxTheory = GetMusicStaffCanvasContext("myCanvas6");
	ctxTheory.clearRect(0, 0, cTheory.width, cTheory.height);

	ShowRandomMusicTheory(ctxTheory);

	var c = GetMusicStaffCanvas(canvasId); // document.getElementById('myCanvas');
	var ctx = GetMusicStaffCanvasContext(canvasId); //c.getContext('2d');
	
	//ctx.fillStyle = document.getElementById("idBody").attributes("backolor"); // "lightblue"; //'#FF0000';
	//ctx.fillStyle = "white"; // "lightblue"; //'#FF0000';
	//ctx.fillRect(0, 0, 1000, 1000);
	ctx.clearRect(0, 0, c.width, c.height);

	makeMusicScoreLine(50, ctx);

	makeMusicScoreLine(50 + 3 * (10 * notGap), ctx);
	//makeMusicScoreLine(50 + 6 * (10 * notGap));

}
//var myVar = setInterval(function () { makeMusicScore() }, 8000);

function makeMusicScoreLine(startStaff, ctx) {

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

	drawMusicStaff(startStaff, ctx);

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
		drawMusicNote(i * 100, lowNote - musNotes[i].pos, musNotes[i].name, ctx);
		//drawKeySharp(i * 100, lowNote - musNotes[i].pos, musNotes[i].name);


		if (musNotes[i].addThird == 1) {
			drawMusicNote(i * 100, lowNote - musNotes[i].pos - (2 * notGap), musNotes[i].name, ctx);
		}

		if (musNotes[i].addFith == 1)
			drawMusicNote(i * 100, lowNote - musNotes[i].pos - (4 * notGap), musNotes[i].name, ctx);

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
		writeTextOnCanvas(i * 100, lowNote + 25, solfegeText, ctx);

		var note = musNotes[i].name;
		note = note.substring(0, 1);
		note = note.toLowerCase();
		if (userWantsNoteNames == 1)
			writeTextOnCanvas(i * 100, lowNote + 20, note, ctx);

	}


}











