let app;

function startApp(happyOnlyMode) {
    document.getElementById("happyOnly").addEventListener("change", modeToggle)

    const deck = document.getElementById("deck")
    app = new DeckApp(deck, questions(happyOnlyMode))
    deck.addEventListener("click", nextCardPlease)
}

function nextCardPlease() {
    const deck = document.getElementById("deck")
    const cards = [...deck.children]
    const head = cards.shift()
    const cardsArray = [...cards, head]
    deck.replaceChildren(...cardsArray)
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
        this.#addCards()
    }

    #removeAllCards() {
        while (this.deck.firstChild) {
            this.deck.removeChild(this.deck.firstChild)
        }
    }

    #createCard(id, question) {
        return `
        <div id="${id}" class="card">
            <div class="card-text">${question}</div>
        </div>
        `
    }

    #addCards() {
        this.#removeAllCards()
        for (const [i, q] of this.questions.entries()) {
            const id = `card_${i}`
            const card = this.#createCard(id, q)
            this.deck.insertAdjacentHTML('beforeend', card)
        }
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
        'What did you do today that made you proud?',
        'How did you look after yourself today?',
        'What did you do well today?',
        'What made you smile today?',
        'Who made you feel nice today?',
        'Whom did you enjoy your time with today?',
        'What are you grateful for today?',
        'How was your body feeling today?',
        'How did you look after your body today?',
        'Did you daydream about something today? What was it?',
        'What did you enjoy about your work today?',
        'Did you learn something new today?',
        'Did you notice anything new in your local area today?',
        'What brought you peace today?',
        'How did you motivate yourself today?',
        'Was there anything you did better today, than a while ago?',
        'What did you do to care about somebody else today?',
        'Who helped you today?',
        'Whom did you help today?',
        'Did you receive a compliment today?',
        'Did you give any compliments today?',
        'What did your partner do today, that made you feel loved?',
        'What did you do today, to make your partner feel loved?'
    ]
    const sad = [
        'What made you sad today?',
        'What made you angry today?',
        'How were you feeling today?',
        'Where did your thoughts wonder today?',
        'Were you afraid of anything today?',
        'Would you change anything you did today?',
        'Was there anything you wished for today?',
        'Did anything cause you disappointment today?',
        'Was there anything that really bothered you today?',
        'If there would be one thing you could change in your house, what would that be?',
        'What occupied most of your free time today?',
        'Did anything happen today, that was important to you?',
        'How was your day?',
        'Is there anything you wanted to do today, and you decided not to?',
        'Did anybody made you feel uneasy today?',
        'Is there anything you want to be better at?'
    ]

    if (happyOnlyMode) {
        return shuffle(happy)
    } else {
        return shuffle(happy.concat(sad))
    }
}
