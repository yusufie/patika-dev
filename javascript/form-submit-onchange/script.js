let body = document.querySelector(`body`);
let elementAdSoyad = document.querySelector(`#elementAdSoyad`);
let elementTelefonNumarasi = document.querySelector(`#elementTelefonNumarasi`);
let elementAdres = document.querySelector(`#elementAdres`);
let elementRenk = document.querySelector(`#elementRenk`);
let elementRenkArkaplan = document.querySelector(`#elementRenkArkaplan`);
let veriler = [];

verileriGetir();

function verileriGetir(){
    if(JSON.parse(localStorage.getItem(`veriler`))){
        veriler = JSON.parse(localStorage.getItem(`veriler`));
        let renderDiv = document.querySelector(`#renderDiv`);
        let message = document.createElement(`p`);
        message.textContent = `adı soyadı: ${veriler[veriler.length-1].adSoyad} telefon numrası: ${veriler[veriler.length-1].telefonNumarasi} adresi: ${veriler[veriler.length-1].adres} renginiz: ${veriler[veriler.length-1].renk}`;
        renderDiv.appendChild(message);

        body.style.backgroundColor = veriler[veriler.length-1].renk;
    }
}

function handlerSubmit(event){
    event.preventDefault();
    if (elementAdSoyad.value.length == 0 && elementTelefonNumarasi.value.length == 0 && elementAdres.value.length == 0) {
        alert("Alanlar Boş Bırakılamaz"); 
    } else {
        let veri = {adSoyad: elementAdSoyad.value, telefonNumarasi: elementTelefonNumarasi.value, adres: elementAdres.value, renk: elementRenk.value};
        veriler.push(veri); // Add new data to the veriler array
        localStorage.setItem(`veriler`, JSON.stringify(veriler));
        verileriGetir();
    }
}

function handlerChange(event){
    body.style.backgroundColor = elementRenkArkaplan.value;
}
