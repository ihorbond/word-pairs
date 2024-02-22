import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'one-word',
  styleUrl: 'one-word.css',
  shadow: true,
})
export class OneWord {
  @Prop() isSelected: boolean;

  render() {
    return (
      <button class={this.isSelected && 'selected'}>
        <slot></slot>
      </button>
    );
  }
}
