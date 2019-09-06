import { Component, Prop, h, Method, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'restencil-counter',
  styleUrl: 'counter.css',
  shadow: true
})
export class MyComponent {
  /**
   * The count of the counter
   */
  @Prop({ mutable: true }) count: number = 0;

  @Prop() min: number = -Infinity;
  @Prop() max: number = Infinity;
 
  @Method()
  async reset() {
    this.count = 0
  }

  @Event() counterChange: EventEmitter;

  increment(amount) {
    this.count += amount
    this.counterChange.emit(this.count)
  }

  render() {
    return (
      <div class="counter">
        <button onClick={() => this.increment(-1)}>➖</button>
        <span>{this.count}</span>
        <button onClick={() => this.increment(1)}>➕</button>
      </div>
    );
  }
}
