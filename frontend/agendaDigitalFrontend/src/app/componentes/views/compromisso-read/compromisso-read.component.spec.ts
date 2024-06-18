import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoReadComponent } from './compromisso-read.component';

describe('CompromissoReadComponent', () => {
  let component: CompromissoReadComponent;
  let fixture: ComponentFixture<CompromissoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompromissoReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromissoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
