let app;
const topDisposition = 19.6
const leftDisposition = 0.6

function startApp(happyOnlyMode) {
    document.getElementById("happyOnly").addEventListener("change", modeToggle)

    const deck = document.getElementById("deck")
    app = new DeckApp(deck, questions(happyOnlyMode))
    deck.addEventListener("click", nextCardPlease)
}

function nextCardPlease() {
    app.nextCardPlease()
}

function modeToggle(event) {
    const happyOnlyMode = event.target.checked
    app.deck.removeEventListener("click", nextCardPlease)
    startApp(happyOnlyMode)
}

class DeckApp {
    constructor(deck, questions) {
        this.deck = deck
        this.questions = questions
        this.addCards()
    }

    #removeAllCards() {
        while (this.deck.firstChild) {
            this.deck.removeChild(this.deck.firstChild)
        }
    }

    addCards() {
        this.#removeAllCards()
        for (const [i, q] of this.questions.entries()) {
            const id = `card_${i}`
            const zIndex = this.questions.length - i
            const top = (i * topDisposition) * -1
            const left = (i * leftDisposition)
            const card = `<div id="${id}" style="z-index:${zIndex};top:${top}em;left:${left}em">${q}</div>`
            this.deck.insertAdjacentHTML('beforeend', card)
        }
    }

    nextCardPlease() {
        this.questions.push(this.questions.shift())
        this.addCards()
    }
}

function questions(happyOnlyMode) {
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    const happy = [
        'What made you happy today?',
        'What did you do today that makes you proud?'
    ]
    const sad = [
        'What made you sad today?',
        'What made you angry today?'
    ]

    if (happyOnlyMode) {
        return shuffle(happy)
    } else {
        return shuffle(happy.concat(sad))
    }
}