import {
  Directive,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[upper-case]',
})
export class UpperCaseDirective implements OnChanges, OnInit {
  public input: HTMLInputElement;
  constructor(private hostElement: ElementRef) {
    this.input = this.hostElement.nativeElement;
  }
  ngOnInit(): void {}

  @HostListener('input') ngOnChanges(): void {
    const newValue = this.upper(this.input.value);
    this.input.value = newValue;
  }
  upper(old: string): any {
    return old.charAt(0).toUpperCase() + old.slice(1);
  }
}
