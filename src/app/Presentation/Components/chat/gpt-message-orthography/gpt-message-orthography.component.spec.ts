import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptMessageOrthographyComponent } from './gpt-message-orthography.component';

describe('GptMessageOrthographyComponent', () => {
  let component: GptMessageOrthographyComponent;
  let fixture: ComponentFixture<GptMessageOrthographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GptMessageOrthographyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GptMessageOrthographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
