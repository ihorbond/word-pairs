import { Component, Prop, State, h } from '@stencil/core';

type OneWord = {
  text: string;
  isSelected: boolean;
};

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() pairs: Array<any> = [
    {
      word: 'hello',
      pair: 'hola',
    },
    {
      word: 'bye',
      pair: 'chao',
    },
    {
      word: 'how are you',
      pair: 'como estas',
    },
  ];

  @State() leftColumn: Array<OneWord> = [];
  @State() rightColumn: Array<OneWord> = [];

  componentWillLoad() {
    this.leftColumn = this.pairs.map(pair => ({
      text: pair.word,
      isSelected: false,
    }));
    this.rightColumn = this.pairs.map(pair => ({
      text: pair.pair,
      isSelected: false,
    }));
  }

  private onWordSelected(column: string, idx: number): void {
    if (column === 'left') {
      this.leftColumn[idx].isSelected = true;
      this.leftColumn = [...this.leftColumn];
    }
    if (column === 'right') {
      this.rightColumn[idx].isSelected = true;
      this.rightColumn = [...this.rightColumn];
    }
    if (this.leftColumn[idx].isSelected === this.rightColumn[idx].isSelected) {
      console.log('match');
      setTimeout(() => {
        this.leftColumn = this.leftColumn.toSpliced(idx, 1);
        this.rightColumn = this.rightColumn.toSpliced(idx, 1);
      }, 1000);
    }
    // console.log(idx);
  }

  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }

  render() {
    return (
      <div>
        <h2>Word pairs</h2>
        <div id="columns">
          <div class="column">
            <ul>
              {this.leftColumn.map(({ text, isSelected }, idx) => {
                return (
                  <li key={text} onClick={() => this.onWordSelected('left', idx)}>
                    <one-word isSelected={isSelected}>{text}</one-word>
                  </li>
                );
              })}
            </ul>
          </div>
          <div class="column">
            <ul>
              {this.rightColumn.map(({ text, isSelected }, idx) => {
                return (
                  <li key={text} onClick={() => this.onWordSelected('right', idx)}>
                    <one-word isSelected={isSelected}>{text}</one-word>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
