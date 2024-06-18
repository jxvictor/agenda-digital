import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoCreateComponent } from './compromisso-create.component';

describe('CompromissoCreateComponent', () => {
  let component: CompromissoCreateComponent;
  let fixture: ComponentFixture<CompromissoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompromissoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromissoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
