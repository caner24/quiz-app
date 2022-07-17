var level = document.getElementById("next-level");
var göster = document.getElementById('göster-gizle');
var cevaplarPath = document.getElementById("cevaplar");

let sayac = 0;
let süreKontrol = 0;
let myVar;
let durum;
let dogruSayisi = 0;
let basla;

function Quiz(soru, soruSiklari, cevap) {

    this.soru = soru;
    this.soruSiklari = soruSiklari;
    this.cevap = cevap;
}


document.getElementById("next-level").addEventListener('click', function () {
    if (!basla == true) {
        if (sayac != 3) {

            sayac++;
            document.getElementById("level-text").innerText = `${sayac + 1}` + "/4";
            soruGetir();
            süreKontrol = 0;
            clearInterval(myVar);
            timerAktif();
        }
        else {
            document.getElementById("next-level").innerText = " Yeniden Başla ";
            alert(`Oyun bitti dogru bilinen soru sayisi  : ${dogruSayisi} `);
            süreKontrol = 0;
            btnDisabled();
            clearInterval(myVar);
            basla = true;
        }
    }
    else {
        document.getElementById("next-level").innerText = " Sonraki Soru ";
        basla = false;
        dogruSayisi = 0;
        sayac = 0;
        document.getElementById("level-text").innerText = `${sayac + 1}` + "/4";
        soruGetir();
        süreKontrol = 0;
        clearInterval(myVar);
        timerAktif();
    }
});



cevaplarPath.addEventListener('click', function (e) {
    let cevapKont = e.target.innerText;
    if (e.target.classList.contains("cvp")) {
        if (sorular[sayac].cevapKontrol(cevapKont.substring(0, 1))) {
            e.target.classList.remove("btn-light");
            e.target.classList.add("btn-success");
            durum = true;
            dogruSayisi++;
            btnDisabled();
        }
        else {
            e.target.classList.remove("btn-light");
            e.target.classList.add("btn-danger");
            durum = false;
            btnDisabled();
        }
    }


});
function timerAktif() {
    myVar = setInterval(myTimer, 1000);
    myTimer();
}
göster.addEventListener('click', function () {
    document.getElementById("my-login").classList.add("d-none");
    document.getElementById("my-questions").classList.remove("d-none");
    soruGetir();
    timerAktif();

});


level.addEventListener('click', function () {
    soruGetir();
})

Quiz.prototype.cevapKontrol = function (cevap) {

    return this.cevap === cevap;

}

let sorular = [
    new Quiz("Hangisi .net ortami için kullanilan paket yönetim sistemidir ?", { a: "Nuget", b: "Npm", c: "Ninite", d: "Chocolatey" }, "a"),
    new Quiz("Hangisi css frameworklerinden birisi değildir ?", { a: "boostrap", b: "tailwind", c: "Foundation", d: "react-native" }, "d"),
    new Quiz("Hangisi front-end kapsaminda degerlendirilemez ?", { a: "css", b: "js", c: "react", d: "node-js" }, "d"),
    new Quiz("Hangisi pöpüler veritabanı araçlarından birisidir ?", { a: "Excell", b: "MySQL", c: "Word", d: "Powerpoint" }, "b")];
function soruGetir() {
    btnClear();
    btnEnabler();
    document.getElementsByClassName("siklar")[0].innerText = `${sayac + 1}` + " - " + sorular[sayac].soru;
    document.getElementsByClassName("siklar")[1].innerText = "a :" + sorular[sayac].soruSiklari.a;
    document.getElementsByClassName("siklar")[2].innerText = "b :" + sorular[sayac].soruSiklari.b;
    document.getElementsByClassName("siklar")[3].innerText = "c :" + sorular[sayac].soruSiklari.c;
    document.getElementsByClassName("siklar")[4].innerText = "d :" + sorular[sayac].soruSiklari.d;
}

function myTimer() {
    süreKontrol++;
    document.getElementById("time-left").innerText = süreKontrol;
    document.getElementById("progress-bar-val").style.cssText = `width:${süreKontrol * 5}%`;
    if (süreKontrol == 20) {
        clearInterval(myVar);
        btnDisabled();
    }
}

function btnClear() {
    for (let a = 0; a < cevaplarPath.childElementCount; a++) {
        if (cevaplarPath.children[a].classList.contains("btn-danger")) {
            cevaplarPath.children[a].classList.replace("btn-danger", "btn-light");
        }
        if (cevaplarPath.children[a].classList.contains("btn-success")) {
            cevaplarPath.children[a].classList.replace("btn-success", "btn-light");
        }
    }
}

function btnDisabled() {
    for (let a = 0; a < cevaplarPath.childElementCount; a++) {
        if (!durum == true) {
            if (sorular[sayac].cevapKontrol(cevaplarPath.children[a].innerText.substring(0, 1))) {
                cevaplarPath.children[a].classList.replace("btn-light", "btn-success");
            }
        }
        cevaplarPath.children[a].classList.add("disabled");
    }
}
function btnEnabler() {
    for (let a = 0; a < cevaplarPath.childElementCount; a++) {
        if (cevaplarPath.children[a].classList.contains("disabled")) {
            cevaplarPath.children[a].classList.remove("disabled");
        }

    }
}