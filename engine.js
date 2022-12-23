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
            <div class="card-text">${question.question}</div>
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

class Q {
    constructor(question, tags) {
        this.question = question
        this.tags = tags
    }
}

const Tag = {
    Happy: Symbol("happy"),
    Sad: Symbol("sad"),
    Partner: Symbol("partner"),
    Childhood: Symbol("childhood")
}

function questions(happyOnlyMode) {
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    const qs = [
        new Q('What made you happy today?', [Tag.Happy]),
        new Q('What did you do today that made you proud?', [Tag.Happy]),
        new Q('How did you look after yourself today?', [Tag.Happy]),
        new Q('What did you do well today?', [Tag.Happy]),
        new Q('What made you smile today?', [Tag.Happy]),
        new Q('Who made you feel nice today?', [Tag.Happy]),
        new Q('Whom did you enjoy your time with today?', [Tag.Happy]),
        new Q('What are you grateful for today?', [Tag.Happy]),
        new Q('How was your body feeling today?', [Tag.Happy]),
        new Q('How did you look after your body today?', [Tag.Happy]),
        new Q('Did you daydream about something today? What was it?', [Tag.Happy]),
        new Q('What did you enjoy about your work today?', [Tag.Happy]),
        new Q('Did you learn something new today?', [Tag.Happy]),
        new Q('Did you notice anything new in your local area today?', [Tag.Happy]),
        new Q('What brought you peace today?', [Tag.Happy]),
        new Q('How did you motivate yourself today?', [Tag.Happy]),
        new Q('Was there anything you did better today, than a while ago?', [Tag.Happy]),
        new Q('What did you do to care about somebody else today?', [Tag.Happy]),
        new Q('Who helped you today?', [Tag.Happy]),
        new Q('Whom did you help today?', [Tag.Happy]),
        new Q('Did you receive a compliment today?', [Tag.Happy]),
        new Q('Did you give any compliments today?', [Tag.Happy]),
        new Q('What did your partner do today, that made you feel loved?', [Tag.Happy]),
        new Q('What did you do today, to make your partner feel loved?', [Tag.Happy]),
        new Q('What made you sad today?', [Tag.Sad]),
        new Q('What made you angry today?', [Tag.Sad]),
        new Q('How were you feeling today?', [Tag.Sad]),
        new Q('Where did your thoughts wonder today?', [Tag.Sad]),
        new Q('Were you afraid of anything today?', [Tag.Sad]),
        new Q('Would you change anything you did today?', [Tag.Sad]),
        new Q('Was there anything you wished for today?', [Tag.Sad]),
        new Q('Did anything cause you disappointment today?', [Tag.Sad]),
        new Q('Was there anything that really bothered you today?', [Tag.Sad]),
        new Q('If there would be one thing you could change in your house, what would that be?', [Tag.Sad]),
        new Q('What occupied most of your free time today?', [Tag.Sad]),
        new Q('Did anything happen today, that was important to you?', [Tag.Sad]),
        new Q('How was your day?', [Tag.Sad]),
        new Q('Is there anything you wanted to do today, and you decided not to?', [Tag.Sad]),
        new Q('Did anybody made you feel uneasy today?', [Tag.Sad]),
        new Q('Is there anything you want to be better at?', [Tag.Sad])
    ]

    if (happyOnlyMode) {
        return qs.filter(function(el) {
            return happyOnlyMode && el.tags.includes(Tag.Happy)
        })
    } else {
        return qs
    }

}
