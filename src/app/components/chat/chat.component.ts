import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { IMeals } from '../../data/mealProp';
import { IChatContent } from '../../data/chatProps';
import { mockChatContent } from '../../data/mockData';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private _mealService: any;
  allMeals!: IMeals[];
  allChatContent!: IChatContent[];
  isLoading: boolean = false;
  whichAns!: boolean;

  @ViewChild('msgUl') chatScrollWrap!: ElementRef; // srcoll element

  constructor() {
    this.allChatContent = mockChatContent;
    this._mealService = new MealService();
    this.allMeals = this._mealService.takeMeals();

    // asker提出任一選擇，已確保至少會有菜色
    const firstMeal = this.randomMeal();
    this.allChatContent.push({
      side: "system",
      content: firstMeal,
      timing: ""
    });

    this.allChatContent.forEach((item) => {
      item.timing = this.getTiming();
    });
  }

  ngOnInit(): void {
  }

  goOnChat(answer: boolean, ansEleText: string) {

    const currentTime = this.getTiming() as string;
    this.allChatContent.push({
      side: "user",
      content: ansEleText,
      timing: currentTime
    });

    // delay function
    function delaySec(n: number) {
      return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
      });
    }

    // answer is "true" meanings find what they likes;
    if (answer === true) {
      const waitTillDone = async () => {
        this.isLoading = true;
        // the result has been done
        this.allChatContent.push({
          side: "system",
          content: "請稍後，馬上為您準備",
          timing: currentTime
        });
        await delaySec(1);
        this.moveToBottom();
      }
      waitTillDone();
    } else if ((this.allMeals?.length || 0) === 0) {
      // no meal can supply
      const waitTillDone = async () => {
        this.isLoading = true;

        this.allChatContent.push({
          side: "system",
          content: "沒有菜色了~",
          timing: currentTime
        });
        await delaySec(0.1);
        this.moveToBottom();
      }
      waitTillDone();
    } else {
      // wait for second for next suggestion

      const waitTillDone = async () => {
        // suspense area for animation
        this.isLoading = true;
        this.allChatContent.push({
          side: "suspense",
          content: "",
          timing: currentTime
        });
        await delaySec(1);

        // after waiting then give some suggestion       
        const suggestionMeal = this.randomMeal();

        const chatLen = this.allChatContent.length;
        this.allChatContent[chatLen - 1].side = "system";
        this.allChatContent[chatLen - 1].content = suggestionMeal;
        await delaySec(0.1);
        this.moveToBottom();

        // prompt user option "yes or no"
        await delaySec(0.8);
        this.isLoading = false;
        await delaySec(0.1); //need to wait isLoading change value
        this.moveToBottom();

      }
      waitTillDone();
    }
    this.moveToBottom();
  }

  private randomMeal(): string {
    const mealLen = this.allMeals.length;

    const randomIdx: number = Math.floor(Math.random() * mealLen); // random number: 0 ~ mealLen
    const result = this.allMeals[randomIdx].mealName;

    // remove chosen meal
    const removeMeal = this.allMeals[mealLen - 1].mealName;
    this.allMeals[randomIdx].mealName = removeMeal;
    this.allMeals.pop();
    return result;
  }

  private moveToBottom() {
    this.chatScrollWrap.nativeElement.scrollTop = this.chatScrollWrap.nativeElement.scrollHeight;
  }

  private getTiming(): string {
    function timingStrLen(str: string) {
      //timing lenght at least 2
      if (str.length < 2) {
        return "0" + str;
      }
      return str;
    }
    const rightNow = new Date();
    return timingStrLen(rightNow.getHours().toString()) + ":" + timingStrLen(rightNow.getMinutes().toString());
  }
}
