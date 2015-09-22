
function Main() {



    makeMusicScore();

    // Retrieve stored settings
    var speed = localStorage.getItem("musicscorespeed");

    var lownote = localStorage.getItem("lownote");
    var highnote = localStorage.getItem("highnote");
    if (speed == "") {
        speed = "3";
    }

    if ((lownote == "") || (lownote == "0")) {
        lownote = "1";
    }

    if ((highnote == "") || (highnote == "0")) {
        highnote = "25";
    }

    document.getElementById("speed").value = speed;

    document.getElementById("lownote").value = lownote;
    document.getElementById("highnote").value = highnote;
    changeSpeed();
    changeHighest();
    changeLowest();

};