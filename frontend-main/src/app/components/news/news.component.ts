import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  public newsArticles = [
    {
      title: 'UN News -  SDGs',
      link: 'https://news.un.org/en/news/topic/sdgs',
      description: 'See all United Nation articles about the SDGs here!',
      sdg: './assets/sdg_16.png',
    },
    {
      title: 'New water sources available!',
      link: 'https://news.un.org/en/news/topic/sdgs',
      description: 'New water sources for people in Africa',
      sdg: './assets/sdg_6.png',
    },
    {
      title: 'Some News about hunger',
      link: 'https://news.un.org/en/news/topic/sdgs',
      description: 'Hunger is fixed with this simple solution.',
      sdg: './assets/sdg_2.png',
    },
    {
      title: 'Some News about hunger',
      link: 'https://news.un.org/en/news/topic/sdgs',
      description: 'Hunger is fixed with this simple solution.',
      sdg: './assets/sdg_3.png',
    },
    {
      title: 'Some News about hunger',
      link: 'https://news.un.org/en/news/topic/sdgs',
      description: 'Hunger is fixed with this simple solution.',
      sdg: './assets/sdg_5.png',
    },
    {
      title: 'Some News about hunger',
      link: 'https://news.un.org/en/news/topic/sdgs',
      description: 'Hunger is fixed with this simple solution.',
      sdg: './assets/sdg_17.png',
    },
  ];
}
