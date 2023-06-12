import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBlockComponent } from './quiz-block.component';

describe('QuizBlockComponent', () => {
  let component: QuizBlockComponent;
  let fixture: ComponentFixture<QuizBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
