import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
cardTextFC=new FormControl('');

  constructor(private cardService:CardService) { }

   arrayCard:Card[]=[];
   
  ngOnInit(): void {
    this.cardTextFC.valueChanges.pipe(
      debounceTime(1000)
    )
    .subscribe(data=>{
      console.log(data)
      this.arrayCard=[]
      this.searchCard(data)
    }
      );
    this.searchCard();
      
  }
  searchCard(cardName:string|null=null){
    this.cardService.getCards(cardName).subscribe(data=>{
      console.log(data)
      this.arrayCard=[...this.arrayCard,...data];
    }
      );
  }

}
