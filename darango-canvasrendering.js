
function drawLine(x, y, w, z, canvasContext) {
	canvasContext.beginPath();
	canvasContext.fillStyle = _lineColors;
	canvasContext.strokeStyle = _lineColors;

	canvasContext.fill();

	canvasContext.moveTo(x, y);
	canvasContext.lineTo(w, z);
	canvasContext.stroke();

	return;
}

function writeTextOnCanvas(x, y, solfegeText, canvasContext) {

	canvasContext.beginPath();
	canvasContext.font = "20px Georgia";
	canvasContext.fillText(solfegeText, x, y);

	return;
}

