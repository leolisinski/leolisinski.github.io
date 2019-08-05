class Deck {
    constructor() {
        this.deck = []
        this.dealt_cards = []
    }

    generate_deck() {

        let card = (suit, value_and_name) => {
            this.name = suit + ' ' + value_and_name[1]
            this.suit = suit
            this.value = value_and_name[0]
            this.f_imgSrc = 'images/' + suit[0] + suit[1] + this.value + '.png'
            this.b_imgSrc = 'images/baksida.png'
            this.imgSrc = this.b_imgSrc
            this.frontside = false
            this.marker = false
            return {name:this.name, suit: this.suit, value:this.value, f_imgSrc: this.f_imgSrc, b_imgSrc: this.b_imgSrc, imgSrc: this.imgSrc, frontside: this.frontside, marker: this.marker}
        }

        let values_and_names = [[2,'2'],[3,'3'],[4,'4'],[5,'5'],[6,'6'],[7,'7'],[8,'8'],[9,'9'],[10,'10'],[11,'knekt'],[12,'dam'],[13,'kung'],[14,'ess']]
        let suits = ['hjärter', 'ruter', 'spader', 'klöver']

        for ( let s = 0; s < suits.length; s++ ) {
            for ( let v = 0; v < values_and_names.length; v++ ) {
                this.deck.push(card(suits[s], values_and_names[v]))
            }
        }
    }

    print_deck() {
        if (this.deck.length === 0) {
            console.log('Ingen kortlek.')

        } else {
            for (let c = 0; c < this.deck.length; c++) {
                console.log(this.deck[c])
            }
        }
    }

    shuffle () {
        let current_ind = this.deck.length, temp_val, rand_ind

        while ( 0 != current_ind ) {
            rand_ind = Math.floor(Math.random() * current_ind)
            current_ind -= 1
            temp_val = this.deck[current_ind]
            this.deck[current_ind] = this.deck[rand_ind]
            this.deck[rand_ind] = temp_val
        }
    }

    deal () {
        let dealt_card = this.deck.shift()
        this.dealt_cards.push(dealt_card)
        return dealt_card
    }

    replace () {
        this.deck.unshift(this.dealt_cards.shift())
    }

    clear_deck () {
        this.deck = []
        this.dealt_cards = []
    }

}