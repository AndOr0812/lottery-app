import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  faqs = [{
    question: `How to Play`,
    answer: `
      Buy online by selecting the lottery of your choice and selecting five main numbers + 1 additional number for each. 
      Choose your numbers manually or with quick pick to buy your official lottery ticket. 
      Match 5+1 to become an American lottery multi-millionaire!
      <div class="spacer"></div>
      Mega Millions winning numbers are drawn on Tuesdays and Fridays at 8PM PST*.
      <div class="spacer"></div>
      Powerball winning numbers are drawn on Wednesday and Saturdays at 8PM PST*.`,
    open: true
  }, {
    question: `Can I Buy American Lottery Tickets from Outside the US?`,
    answer: `
      Yes, you can play any one of our online lotteries from anywhere in the world. We provide a global 
      lottery service in that we operate as couriers on your behalf. We purchase your lottery tickets for you and 
      handle everything from start to finish. This service enables you to play lotteries from other countries.`
  }, {
    question: `How do I Claim Winnings for Lottery USA Prizes?`,
    answer: `
      When you win a prize you will receive an automated email to let you know you’ve won! 
      Prizes will be transferred directly into credits on your account after the lottery results are published. 
      Please note, the jackpot and second place prizes may need to be collected in person. In these cases, we 
      will pay for your flight to California from anywhere in the world! Like other American lottery winnings, 
      prizes are subject to US State and Federal taxes.`
  }, {
    question: `How Can I Be Sure I'll Receive My Winnings?`,
    answer: `Playing is easy and secure. A confirmation email at time of ticket purchase is 
      sent to you as proof of ownership. All 100% of winnings are instantly credited to your account -- 
      please note that we do claim a 10% fee on withdrawel of winnings. Please see our Terms and Conditions for more.`
  }, {
    question: `What is 123-Lottery?`,
    answer: `123-Lottery was launched in September of 2018, facilitating online lottery 
      ticket purchases for customers around the world. 123-Lottery offers secure online ticket purchases, 
      and then a representative will purchase the tickets from official lottery retailers on the customer’s behalf.`
  }, {
    question: `How will I find out when I win a lottery prize?`,
    answer: `When you win, 123-Lottery will notify you of your prize via automated email. 
      Your account will be credited with your winnings automatically. You can also view your win and the 
      corresponding draw details at any time in the history section of your online account. 
      In the case of a big win, our dedicated Customer Support team will contact you immediately.`
  }, {
    question: `How do I receive my money if I win?`,
    answer: `Prizes will be transferred to your account credits immediately after receipt of 
      the prize from the official lottery operator. You may use your winnings for future participation 
      in lottery draws or withdraw winnings. Withdrawels receive a 10% fee and will be handled by our 
      Customer Support team. For most winnings, under $600 this can be done quickly and easily with online 
      transfer of your funds. However, with large prizes our Customer Support will guide you through 
      the collection process until you receive your winnings. 
      <div class="spacer"></div>
      Jackpot winners will be required to collect the prize locally. 123-Lottery may choose to fly you to collect 
      your prize in person. Our local office representative will hand you your winning ticket and provide you 
      with a detailed explanation of how to collect your win from the official lottery’s office.`
  }, {
    question: `How does 123-Lottery protect my personal and payment information?`,
    answer: `Security and confidentiality are paramount at 123-Lottery. All of your data is secured through Google 
      database security. All transactions are encrypted and transfered over HTTPS to a 3rd party system. We retain 
      no credit card, financial, password, or other information on our servers. All of your private data is secured and will 
      not be shared with any outside parties.`
  }, {
    question: `How will I be taxed when I win?`,
    answer: `Tax requirements depend on the law of the US Federal and State taxes of California 
      where your lottery ticket is purchased. In addition, you may be subject to local taxation based on your 
      country of residence. Always check with a tax professional if you come into a large sum of money.`
  }];
}
