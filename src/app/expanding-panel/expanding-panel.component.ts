import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CheckboxStatus } from '../shared/enums/checkbox-status.enum';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-expanding-panel',
  templateUrl: './expanding-panel.component.html',
  styleUrls: ['./expanding-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandingPanelComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() status!: CheckboxStatus;

  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  isExpanded!: boolean;
  CheckboxStatus = CheckboxStatus;
  checkboxControl: FormControl = new FormControl(false);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.checkboxControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((checked: boolean) => this.checked.emit(checked));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  toggleExpandPanel(): void {
    this.isExpanded = !this.isExpanded;
  }
}
