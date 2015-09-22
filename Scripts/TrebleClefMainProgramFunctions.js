
function Main() {



    makeMusicScore();


    try {

        // Retrieve stored settings
        speed = localStorage.getItem("musicscorespeed");

        lownote = localStorage.getItem("lownote");
        highnote = localStorage.getItem("highnote");

        if ((speed == "") || (speed == "0") || (speed == null)) {
            speed = "3";
        }

        if ((lownote == null) || (lownote == "") || (lownote == "0")) {
            lownote = "1";
        }

        if ((highnote == null) || (highnote == "") || (highnote == "0")) {
            highnote = "25";
        }

        document.getElementById("speed").value = speed;

        document.getElementById("lownote").value = lownote;
        document.getElementById("highnote").value = highnote;

    } catch (e) {
        alert(e);
    }


    try {
        changeSpeed();
        changeHighest();
        changeLowest();
    } catch (e) {
        alert(e);
    }


};