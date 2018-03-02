import { Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { CurrencyService} from './currency.service';


@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency.component.html',
    providers: [CurrencyService]
})

export class CurrencyComponent implements OnInit {

    title: string = 'Currency converter';
    error: any = null;
    fromAmount: string = '';
    toAmount: string = '';
    fromCurrency: string = null;
    toCurrency: string = null;
    showDisclaimer: boolean = false;
    rates: Array < any > = [];
    fromRates: Object = {};
    constructor(private dataService: CurrencyService) {}

    ngOnInit() {
        this.convert(true);
    }

    public convert(initial) {
       
        this.dataService.getRates(this.fromCurrency).then(response => {

            if (response.rates) {
               
                if (initial) {

                    const items: Array < any > = this.parseData(response.rates);
                    items.push({
                        id: 'EUR',
                        value: 1
                    });
                    this.rates = items;
                    this.fromCurrency = this.rates[0].id;
                    this.toCurrency = this.rates[1].id;
                    this.convert(false);
                }

                this.fromRates = response.rates;

                this.calculate();

            } else {
                this.error = 'Unable to get data from API';
            }
        }, (error) => {
            this.error = 'There was an error: ' + error.status + ' - ' + error.statusText;
        });
    }

    public calculate() {

        this.handleErrors();
        
        if (this.toCurrency === this.fromCurrency) {

            this.toAmount = this.fromAmount;

        } else {

            if (!this.error) {   
             
                 if (this.fromAmount != '') {
                        this.toAmount = String(Math.round(Number(this.fromAmount) * this.fromRates[this.toCurrency] * 100) / 100);

                    } else {

                        this.fromAmount = '';
                        this.toAmount = '';

                    } 
            }
        }
    }

    private parseData(data) {
        const arr: Array < any > = [];

        for (const key in data) {
            if (key) {
                const obj = {
                    id: key,
                    value: data[key]
                };
                if (key == 'USD' || key == 'CAD' || key == 'EUR') {
                    arr.push(obj);
                }

            }
        }

        return arr;
    }

    private handleErrors() {
        this.error = null;

        if (!this.fromCurrency) {
            this.error = 'Please set currency';
            return;
        }

    }


}