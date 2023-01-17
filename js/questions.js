
class Q {
    constructor(questionInEn, questionInHu, tags) {
        this.questionInEn = questionInEn
        this.questionInHu = questionInHu
        this.tags = tags
    }
}

const Tag = {
    Happy: Symbol("happy"),
    Sad: Symbol("sad"),
    Partner: Symbol("partner"),
    Childhood: Symbol("childhood")
}

function getQuestions(happyMode, sadMode, partnerMode, childhoodMode) {

    const q = questions().filter(function(el) {
        return (happyMode && el.tags.includes(Tag.Happy)) ||
          (sadMode && el.tags.includes(Tag.Sad)) ||
          (partnerMode && el.tags.includes(Tag.Partner)) ||
          (childhoodMode && el.tags.includes(Tag.Childhood))
    })
    return shuffle(q)
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function questions() {
    const qs = [
        new Q('What made you happy today?', 'Mi tett boldogga ma?', [Tag.Happy]),
        new Q('What did you do today that made you proud?', 'Mi tett buszkeve ma?', [Tag.Happy]),
        new Q('How did you look after yourself today?', 'Hogyan gondoskodtal magadrol ma?', [Tag.Happy]),
        new Q('What did you do well today?', 'Mit csinaltal jol ma?', [Tag.Happy]),
        new Q('What made you smile today?', 'Mi mosolyogtatott meg ma?', [Tag.Happy]),
        new Q('Who made you feel nice today?', 'Ki miatt erezted jol magad ma?', [Tag.Happy]),
        new Q('Whom did you enjoy your time with today?', 'Kivel erezted jol magad ma?', [Tag.Happy]),
        new Q('What are you grateful for today?', 'Miert vagy halas ma?', [Tag.Happy]),
        new Q('How was your body feeling today?', 'Hogy erezte a tested magat ma?', [Tag.Happy]),
        new Q('How did you look after your body today?', 'Hogyan gondoskodtal a testedrol ma?', [Tag.Happy]),
        new Q('Did you daydream about something today? What was it?', 'Almodoztal ma? Mirol?', [Tag.Happy]),
        new Q('What did you enjoy about your work today?', 'Mit elveztel a munkadban ma?', [Tag.Happy]),
        new Q('Did you learn something new today?', 'Tanultal valami ujat ma?', [Tag.Happy]),
        new Q('Did you notice anything new in your local area today?', 'Eszrevettel valami ujat a kornyekeden?', [Tag.Happy]),
        new Q('What brought you peace today?', 'Mi nyugtatott meg ma?', [Tag.Happy]),
        new Q('How did you motivate yourself today?', 'Hogyan motivaltad magad ma?', [Tag.Happy]),
        new Q('Was there anything you did better today, than a while ago?', 'Volt valami amit ma jobban csinalta mint a multban?', [Tag.Happy]),
        new Q('What did you do to care about somebody else today?', 'Gondoskodtal valaki masrol ma? Hogyan?', [Tag.Happy]),
        new Q('Who helped you today?', 'Ki segitett neked ma?', [Tag.Happy]),
        new Q('Whom did you help today?', 'Kinek segitettel ma?', [Tag.Happy]),
        new Q('Did you receive a compliment today?', 'Valaki megdicsert ma?', [Tag.Happy]),
        new Q('Did you give any compliments today?', 'Megdicsertel valakit ma?', [Tag.Happy]),

        new Q('What did your partner do today, that made you feel loved?', 'Mit csinalt a parod amitol szeretve erezted magad?', [Tag.Happy, Tag.Partner]),
        new Q('What did you do today, to make your partner feel loved?', 'Mivel mutattad ki ma a szeretetedet a parodnak?', [Tag.Happy, Tag.Partner]),

        new Q('What made you sad today?', 'Mitol voltal szomoru ma?', [Tag.Sad]),
        new Q('What made you angry today?', 'Mi mergesitett fel ma?', [Tag.Sad]),
        new Q('How were you feeling today?', 'Hogyan erezted magad ma?', [Tag.Sad]),
        new Q('Where did your thoughts wonder today?', 'Hol jartak a gondolataid ma?', [Tag.Sad]),
        new Q('Were you afraid of anything today?', 'Feltel ma valamitol?', [Tag.Sad]),
        new Q('Would you change anything you did today?', 'Valtoztatnal barmin amit ma tettel?', [Tag.Sad]),
        new Q('Was there anything you wished for today?', 'Volt valami amit kivantal ma?', [Tag.Sad]),
        new Q('Did anything cause you disappointment today?', 'Volt barmi amiben csalodtal ma?', [Tag.Sad]),
        new Q('Was there anything that really bothered you today?', 'Volt valami ami bantott ma?', [Tag.Sad]),
        new Q('If there would be one thing you could change in your house, what would that be?', 'Ha lehetne akkor mit valtoztatnal a hazadban?', [Tag.Sad]),
        new Q('What occupied most of your free time today?', 'Mivel toltotted a szabadidodet ma?', [Tag.Sad]),
        new Q('Did anything happen today, that was important to you?', 'Tortent valami fontos ma?', [Tag.Sad]),
        new Q('How was your day?', 'Milyen volt a napod?', [Tag.Sad]),
        new Q('Is there anything you wanted to do today, and you decided not to?', 'Volt valami amit meg kellett volna csinalnod ma de nem tetted?', [Tag.Sad]),
        new Q('Did anybody made you feel uneasy today?', 'Valaki kenyelmetlen helyzetbe hozott ma?', [Tag.Sad]),
        new Q('Is there anything you want to be better at?', 'Van valami amiben jobb szeretnel lenni?', [Tag.Sad]),
        new Q('What is the most saddest moment of your childhood?', 'Mi a legszomorubb gyerekkori emleked?', [Tag.Sad]),

        new Q('In what ways did your mother/father let you down?', 'Milyen modon hagyott cserben anyukad/apukad?', [Tag.Sad, Tag.Childhood]),

        new Q('What was your mother/father like when you were growing up?', 'Milyen volt az anyukad/apukad amikor gyerek voltal?', [Tag.Childhood]),
        new Q('What is one of the greatest lessons your mother/father has taught you?', 'Mi a legfontosabb lecke amit anyukad/apukad tanitott neked?', [Tag.Childhood]),
        new Q('What do you admire most about your mother/father?', 'Mit szeretsz a legjobban anyukadban/apukadban?', [Tag.Childhood]),
        new Q('What did your family like to do on vacation?', 'Mit szeretett a csaladod csinalni a nyaralaskor?', [Tag.Childhood]),
        new Q('What was the most memorable Christmas gift you received as a child?', 'Mi volt a legemlekezetesebb Karacsonyi ajandek amit kaptal?', [Tag.Childhood]),
        new Q('What role did religion play in your life growing up?', 'Milyen modon jarult a vallas a gyermekkorodhoz?', [Tag.Childhood]),
        new Q('What is the happiest moment of your childhood?', 'Mi a legboldogabb gyerekkori emleked?', [Tag.Childhood])
    ]
    return qs
}