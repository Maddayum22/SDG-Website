import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageFeedComponent } from './homepage-feed.component';

describe('HomepageFeedComponent', () => {
  let component: HomepageFeedComponent;
  let fixture: ComponentFixture<HomepageFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
