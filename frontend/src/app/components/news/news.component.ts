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
      date: '12-05-2023',
    },
    {
      title: 'Ghost Gear: The Hidden Face of Plastic Pollution',
      link: 'https://sdg.iisd.org/commentary/guest-articles/ghost-gear-the-hidden-face-of-plastic-pollution/',
      description: '',
      sdg: './assets/sdg_14.png',
      date: '21-04-2023',
    },
    {
      title: 'Standing Up and With Young People – Today and Tomorrow',
      link: 'https://sdg.iisd.org/commentary/policy-briefs/standing-up-and-with-young-people-today-and-tomorrow/',
      description: '',
      sdg: './assets/sdg_10.png',
      date: '30-03-2023',
    },
    {
      title: 'UN calls for game-changing action to stem global water crisis',
      link: 'https://www.un.org/en/desa/un-calls-game-changing-action-stem-global-water-crisis',
      description: 'Innovative solutions for water-secure world',
      sdg: './assets/sdg_6.png',
      date: '12-02-2023',
    },
    {
      title:
        'UN conference concludes with ‘historic’ deal to protect a third of the world’s biodiversity',
      link: 'https://www.un.org/en/desa/un-conference-concludes-historic-deal',
      description: '',
      sdg: './assets/sdg_15.png',
      date: '01-01-2023',
    },
  ];
}
