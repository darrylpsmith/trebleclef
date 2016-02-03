

function drawMusicStaff(y, canvasContext) {
	var start = 50;
	var length = 800;


	drawLine(start, y, start + length, y, canvasContext)
	drawLine(start, y + 1 * (2 * notGap), start + length, y + 1 * (2 * notGap), canvasContext);
	drawLine(start, y + 2 * (2 * notGap), start + length, y + 2 * (2 * notGap), canvasContext);
	drawLine(start, y + 3 * (2 * notGap), start + length, y + 3 * (2 * notGap), canvasContext);
	drawLine(start, y + 4 * (2 * notGap), start + length, y + 4 * (2 * notGap), canvasContext);

	drawLine(start, y, start, y + 4 * (2 * notGap), canvasContext);
	drawLine(start + length, y, start + length, y + 4 * (2 * notGap), canvasContext);
	drawLine(start + (length / 2), y, start + (length / 2), y + 4 * (2 * notGap), canvasContext);

}

function drawMusicNote(x, y, notename, canvasContext) {

	var radius = notGap * 0.8;

	canvasContext.beginPath();
	canvasContext.fillStyle = _noteColors;

	try {
		canvasContext.ellipse(x, y, radius, 1.5 * radius, 60 * Math.PI / 180, 0, 2 * Math.PI);
	} catch (e) {
		canvasContext.arc(x, y, notGap, 0, 2 * Math.PI);
	}


	canvasContext.fill();
	canvasContext.stroke();

	canvasContext.beginPath();
	canvasContext.moveTo(x + notGap, y);
	canvasContext.lineTo(x + notGap, y - (6 * notGap));
	canvasContext.stroke();

	var ledgLinesThru = getLedgerLinesThroughAbove(notename);
	var linePos = y;
	while (ledgLinesThru > 0) {
		drawLine(x - 10, linePos, x + 10, linePos, canvasContext);
		linePos = linePos - 2 * notGap;
		ledgLinesThru--;
	}


	var ledgLinesThru = getLedgerLinesThroughBelow(notename);
	var linePos = y;
	while (ledgLinesThru > 0) {
		drawLine(x - 10, linePos, x + 10, linePos, canvasContext);
		linePos = linePos + 2 * notGap;
		ledgLinesThru--;
	}


	var ledgLinesAbove = getLedgerLinesAbove(notename);
	var linePos = y;
	while (ledgLinesAbove > 0) {
		drawLine(x - 10, linePos - notGap, x + 10, linePos - notGap, canvasContext);
		linePos = linePos - 2 * notGap;
		ledgLinesAbove--;
	}

	var ledgLinesBelow = getLedgerLinesBelow(notename);
	var linePos = y;
	while (ledgLinesBelow > 0) {
		drawLine(x - 10, linePos + notGap, x + 10, linePos + notGap, canvasContext);
		linePos = linePos + 2 * notGap;
		ledgLinesBelow--;
	}

	return;
}


function drawKeySharp(x, y, notename, canvasContext) {

	canvasContext.beginPath();
	canvasContext.fillStyle = "black" // "#3370d4"; //blue

	canvasContext.beginPath();
	canvasContext.strokeStyle = "purple"; // Purple path
	canvasContext.moveTo(x + notGap, y);
	canvasContext.lineTo(x + 2 * notGap, y - (3 * notGap));
	canvasContext.stroke();

	x = x + 5;

	canvasContext.beginPath();
	canvasContext.strokeStyle = "purple"; // Purple path
	canvasContext.moveTo(x + notGap, y);
	canvasContext.lineTo(x + 2 * notGap, y - (3 * notGap));
	canvasContext.stroke();

	x = x - 10;

	canvasContext.beginPath();
	canvasContext.strokeStyle = "purple"; // Purple path
	canvasContext.moveTo(x + notGap, y - (2 * notGap));
	canvasContext.lineTo(x + 5 * notGap, y - (2 * notGap));
	canvasContext.stroke();

	canvasContext.beginPath();
	canvasContext.strokeStyle = "purple"; // Purple path
	canvasContext.moveTo(x + notGap, y - (1 * notGap));
	canvasContext.lineTo(x + 5 * notGap, y - (1 * notGap));
	canvasContext.stroke();

	return;
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