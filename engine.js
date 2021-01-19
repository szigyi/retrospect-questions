let app;

function startApp() {
    const deck = document.getElementById("deck")
    app = new DeckApp(deck, questions())
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
            const top = (i * 19.6) * -1
            const left = (i * 0.6)
            const card = `<div id="${id}" style="z-index:${zIndex};top:${top}em;left:${left}em">${q}</div>`
            this.deck.insertAdjacentHTML('beforeend', card)
        }
    }

    nextCardPlease() {
        this.questions.push(this.questions.shift())
        this.addCards()
    }
}

function questions() {
    return [
        'What made you happy today?',
        'What made you angry today?',
        'What made you sad today?',
        'What did you do today that makes you proud?'
    ]
}