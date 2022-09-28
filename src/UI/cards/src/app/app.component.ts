import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './service/cards.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'cards';

    cards: Card[] = [];

    card: Card = {
        id: '',
        cardHolderName: '',
        cardNumber: '',
        cvv: '',
        expiryMonth: '',
        expiryYear: ''
    };

    constructor(private cardsService: CardsService) {
    }

    ngOnInit(): void {
        this.getAllCards();
    }

    getAllCards() {
        this.cardsService.getAllCards().subscribe(
            response => {
                this.cards = response;
            }
        );
    }

    onSubmit() {
        this.cardsService.addCard(this.card).subscribe(
            response =>{
                this.getAllCards();
                this.card = {
                    id: '',
                    cardHolderName: '',
                    cardNumber: '',
                    cvv: '',
                    expiryMonth: '',
                    expiryYear: ''
                }
            }
        )
    }

    deleteCard(id: string) {
        this.cardsService.deleteCard(id).subscribe(
            response => {
                this.getAllCards();
            }
        );
    }

    populateForm(card: Card) {
        this.card = card;
    }
}
