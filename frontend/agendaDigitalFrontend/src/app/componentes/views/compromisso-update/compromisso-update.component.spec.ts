import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoUpdateComponent } from './compromisso-update.component';

describe('CompromissoUpdateComponent', () => {
  let component: CompromissoUpdateComponent;
  let fixture: ComponentFixture<CompromissoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompromissoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromissoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
