
let happyMode = true;
let sadMode = true;
let partnerMode = true;
let childhoodMode = true;
const language = window.navigator.userLanguage || window.navigator.language;
const isLanguageEnglish = language.toLowerCase().includes('en-')

let deck;
let qs;
let currentCardIndex;

function startApp() {
    document.getElementById('language-preference').textContent = language.toUpperCase()

    document.getElementById("happy").addEventListener("change", modeToggle)
    document.getElementById("sad").addEventListener("change", modeToggle)
    document.getElementById("partner").addEventListener("change", modeToggle)
    document.getElementById("childhood").addEventListener("change", modeToggle)

    qs = getQuestions(happyMode, sadMode, partnerMode, childhoodMode)
    currentCardIndex = qs.length - 1
    document.getElementById('card-number').textContent = qs.length

    deck = document.getElementById('deck')
    deck.addEventListener('click', nextCardPlease)

    const card = questionToCard(qs, currentCardIndex)
    deck.insertAdjacentHTML('beforeend', card)
}

async function nextCardPlease() {
    if (currentCardIndex <= 0) {
        currentCardIndex = qs.length - 1
    } else {
        currentCardIndex = currentCardIndex - 1
    }

    const nextCard = questionToCard(qs, currentCardIndex)
    deck.insertAdjacentHTML('beforeend', nextCard)

    const head = deck.children[0]
    console.log(head)
    head.classList.add('moving-from-top') // start css animation
    await new Promise(r => setTimeout(r, 500)) // waiting until moving from top animation finishes
    head.classList.add('moving-to-bottom') // start css animation
    await new Promise(r => setTimeout(r, 500)) // waiting until animation finishes
    head.classList.remove('moving-from-top')
    head.classList.remove('moving-to-bottom')

    deck.removeChild(head)
}

function modeToggle(event) {
    switch (event.target.name) {
        case "happy":
            happyMode = event.target.checked
            break
        case "sad":
            sadMode = event.target.checked
            break
        case "partner":
            partnerMode = event.target.checked
            break
        case "childhood":
            childhoodMode = event.target.checked
    }
    deck.removeEventListener("click", nextCardPlease)
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild)
    }
    startApp()
}

function questionToCard(questions, currentIndex) {
    const q = questions[currentIndex]
    return createCard(currentIndex, q)
}

function createCard(index, question) {
    const q = (isLanguageEnglish) ? question.questionInEn : question.questionInHu
    const id = `card_${index}`
    return `
        <div id="${id}" class="card" data-theme="light">
            <p class="card-text">${q}</p>
        </div>
    `
}

function createCards(q1, q2) {
    let cards = []
    if (q1) {
        cards.push(createCard(0, q1))
    }
    if (q2) {
        cards.push(createCard(1, q2))
    }
    return cards
}

