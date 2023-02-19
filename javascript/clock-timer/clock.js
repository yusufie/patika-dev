
var username = prompt('Kullanıcı adını gir:');

if (username.length > 0) {
document.getElementById("merhaba").innerHTML = "Merhaba, ";
document.getElementById("username").innerHTML = username + "! ";
document.getElementById("pray").innerHTML = "Geçmiş olsun!";
/* Username end */

/* Hafta Start */
switch(new Date().getDay()){
    case 0:
    day = "Pazar"
    document.getElementById("tarih").innerHTML = "Bugün " + day;
    break;
    
    case 1:
    day = "Pazartesi"
    document.getElementById("tarih").innerHTML = "Bugün " + day;
    break;
    
    case 2:
    day = "Salı"
    document.getElementById("tarih").innerHTML = "Bugün " + day;
    break;
    
    case 3:
    day = "Çarşamba"
    document.getElementById("tarih").innerHTML = "Bugün " + day;
    break;
    
    case 4:
    day = "Perşembe"
    document.getElementById("tarih").innerHTML = "Bugün " + day;
    break;
    
    case 5:
    day = "Cuma"
    document.getElementById("tarih").innerHTML = "Bugün " + day;
    break;
    
    case 6:
    day = "Cumartesi"
    document.getElementById("tarih").innerHTML = "Bugün " + day;
    break;
}
/* Days end */

/* Saat */
function displayTime(){
    var zaman = new Date();
    var saat = zaman.getHours();
    var dakika = zaman.getMinutes();
    var saniye = zaman.getSeconds();
    
    document.getElementById('saat').innerHTML = "Şimdi Saat: " + saat+":"+dakika+":"+saniye;
}
setInterval(displayTime, 10);

// Create a new Date and subtract from current time
function displayTime2(){
    var now = new Date();
    var dateToSubtract = new Date("2023-02-06T04:17:00Z");
    var diff = now.getTime() - dateToSubtract.getTime();
    var seconds = Math.floor(diff / 1000);
    var secondsRemainder = seconds % 60;

    var minutes = Math.floor(seconds / 60);
    var minutesRemainder = minutes % 60;

    var hours = Math.floor(minutes / 60);
    var hoursRemainder = hours % 24 + 3;
    console.log(hoursRemainder);
    var days = Math.floor(hours / 24);

    // Display the time
    document.getElementById('subtract').innerHTML = "Maraş Depreminin üzerinden <br>" + days + " gün " + hoursRemainder + " saat " + minutesRemainder + " dakika " + secondsRemainder + " saniye " +" geçti";
};
setInterval(displayTime2, 10);
/* Clock End */

/* Else */
} else {
    document.getElementById("kodluyoruz-logo").remove();
    let aab = document.getElementById("sake").innerText = "Kullanıcı bilgileri bulunamadı"
}