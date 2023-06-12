import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to create new post page', () => {
    expect(compiled.querySelectorAll('a')[0].getAttribute('routerLink')).toEqual('/posts/new');
  });

  it('should have a link to take new quiz page', () => {
    expect(compiled.querySelectorAll('a')[1].getAttribute('routerLink')).toEqual('/quiz/new');
  });

  it('should have a link to SDG information page', () => {
    expect(compiled.querySelectorAll('a')[2].getAttribute('routerLink')).toEqual('/sdg-information');
  });

  it('should have a link to the contact page', () => {
    expect(compiled.querySelectorAll('a')[3].getAttribute('routerLink')).toEqual('/contact');
  });

  it('should have a link to the login page', () => {
    expect(compiled.querySelectorAll('a')[4].getAttribute('routerLink')).toEqual('/auth/login');
  });

  it('should have a link to the register page', () => {
    expect(compiled.querySelectorAll('a')[5].getAttribute('routerLink')).toEqual('/auth/register');
  });
});
