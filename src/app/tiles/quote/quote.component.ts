import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {ApiServiceService} from '../../service/api-service.service';
import axios from 'axios';

@Component({
  selector: 'app-quote',
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent implements OnInit, AfterViewInit {
    apiService = inject(ApiServiceService)
    quote : any = {"content":"Test" , 'author':"me"}

  ngOnInit(): void{

    this.performFetch()
  }

  async performFetch(){
    let quote =  localStorage.getItem("quote");
    if (quote) {
      let quoteData = JSON.parse(quote) as {q: any , day : number};
      let currentDate = new Date();
      let day = currentDate.getDate();
      if (day != quoteData.day){
        let  quote = await this.fetchQuote();
        localStorage.setItem("quote", JSON.stringify({q:quote , day:currentDate}));
        this.quote = quote;
      } else {
        this.quote = quoteData.q;
      }

    } else {

      let  quote =  await this.fetchQuote();
      let day = new Date().getDate();
      localStorage.setItem("quote", JSON.stringify({q:quote , day:day}));
      this.quote = quote;
    }
  }



  async  fetchQuote():Promise<any>{
      let url = "https://api.quotable.io/quotes/random"
      let params ={
      limit:1,
        maxLength:60,
        minLength:40,
        tags:"Famous Quotes",
        author:"",
        authorId:"",
    }
      let response = await this.apiService.makeApiCall(params , {} , url)
      return {'content':response[0].content , 'author':response[0].author};
  }

  ngAfterViewInit(): void {
  }

}
