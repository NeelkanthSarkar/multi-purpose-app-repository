import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadhomeComponent } from './notepadhome.component';

describe('NotepadhomeComponent', () => {
  let component: NotepadhomeComponent;
  let fixture: ComponentFixture<NotepadhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotepadhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotepadhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
