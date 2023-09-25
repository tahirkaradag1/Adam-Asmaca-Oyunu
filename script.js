const word_el = document.getElementById("word")
const popup = document.querySelector("#popup-container")
const popup_danger = document.querySelector("#popup-danger-container")
const message_el = document.querySelector("#succsess-message")
const message__danger_el = document.querySelector("#danger-message")
const wrongLetters_el = document.getElementById("wrong-letters")
const items = document.querySelectorAll(".item")
const uyari_el = document.querySelector("#message")
const PlayAgainBtn = document.querySelector(".play-again")
const DangerPlayAgainBtn = document.querySelector(".danger-play-again")

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord(){
    const words = ["köpek","kedi","inek","at","koyun","keçi","tavuk","ördek","kaz","tavşan","fare","kanguru","zebra","fil","panda","ayı","kaplan","aslan","kurt","timsah"];
    return words[Math.floor(Math.random() * words.length)]
}

function displayWord(){
    word_el.innerHTML = `
        ${selectedWord.split("").map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ""}
            </div>
        `).join("")}
    `;
    const w = word_el.innerText.replace(/\n/g,"");
    if(w === selectedWord){
        popup.style.display = "flex";
        message_el.innerText = "Aferin Kazandın"
    }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
    ${wrongLetters.length > 0 ? `<h3>Hatalı Harfler</h3>`: ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if(index < errorCount){
            item.style.display = "block"
        }else{
            item.style.display = "none"

        }
    })

    if(wrongLetters.length === items.length){
        popup_danger.style.display = "flex";
        message__danger_el.innerText = "Bu Oyunda Berbatsın"
    }
}

function displayUyari(){
    uyari_el.classList.add("show");

    setTimeout(function() {
        uyari_el.classList.remove("show");
    }, 1000);
}

PlayAgainBtn.addEventListener("click", function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = "none";
})
DangerPlayAgainBtn.addEventListener("click", function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup_danger.style.display = "none";
})

window.addEventListener("keydown", function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >=219 && e.keyCode <=222 || e.keyCode == 186 || e.keyCode == 191 ){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter); 
                displayWord();
            }else{
                displayUyari();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayUyari();
             
            }
        }
    }
   
});

displayWord();