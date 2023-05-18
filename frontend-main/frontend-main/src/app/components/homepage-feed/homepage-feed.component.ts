import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-homepage-feed',
  templateUrl: './homepage-feed.component.html',
  styleUrls: ['./homepage-feed.component.css'],
})
export class HomepageFeedComponent implements OnInit {
  public posts: Post[];
  public emptyPosts: boolean;

  public expertises = [
    'Choose Expertise',
    'Technology',
    'Business and Economics',
    'Applied Social Sciences and Law',
    'Digital Media and Creative Industries',
    'Education',
    'Health',
    'Sports and Nutrition',
  ];

  public sdgItems = {
    'Choose SDG': '',
    'No Poverty': '#eb1729',
    'Zero Hunger': '#d2a025',
    'Good Health and Wellbeing': '#299b45',
    'Quality Education': '#c31a30',
    'Gender Equality': '#ef3f25',
    'Clean Water and Sanitation': '#00afda',
    'Affordable and Clean Energy': '#fdb80c',
    'Decent Work and Economic Growth': '#901135',
    'Industry, Innovation and Infrastructure': '#f36e1f',
    'Reduced Inequalities': '#e11384',
    'Sustainable Cities and Communities': '#f99e20',
    'Responsible Consumption and Production': '#ce8c25',
    'Climate Action': '#467839',
    'Life Below Water': '#007ebc',
    'Life on Land': '#3eaf47',
    'Peace, Justice and Strong Institutions': '#00548b',
    'Partnerships for the Goals': '#133368',
  };


  public constructor(private feedService: FeedService) {
    this.posts = [];
    this.emptyPosts = true;
  }

  public ngOnInit(): void {
   this.getPosts();
  }

  private async getPosts(): Promise<void> {
    (await this.feedService.getPosts()).subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        if (this.posts !== null) {
          this.emptyPosts = false;
        }
      });
  }
  
  public sdgItem = Object.entries(this.sdgItems);

  public splitDate(date: string): string {
    const splitDate = date.slice(0, date.lastIndexOf("T"));
    const [year, month, day] = splitDate.split('-');
    return `${day}-${month}-${year}`;
  }
}
