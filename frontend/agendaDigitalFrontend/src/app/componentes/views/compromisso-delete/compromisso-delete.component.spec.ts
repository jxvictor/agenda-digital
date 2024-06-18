import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoDeleteComponent } from './compromisso-delete.component';

describe('CompromissoDeleteComponent', () => {
  let component: CompromissoDeleteComponent;
  let fixture: ComponentFixture<CompromissoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompromissoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromissoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
