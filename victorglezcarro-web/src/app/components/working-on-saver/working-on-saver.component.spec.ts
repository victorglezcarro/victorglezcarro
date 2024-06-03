import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingOnSaverComponent } from './working-on-saver.component';

describe('WorkingOnSaverComponent', () => {
  let component: WorkingOnSaverComponent;
  let fixture: ComponentFixture<WorkingOnSaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingOnSaverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkingOnSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
