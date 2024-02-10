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
  @Prop() maxWords: number = 3;
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
    {
      word: 'house',
      pair: 'casa',
    },
    {
      word: 'woman',
      pair: 'mujer',
    },
  ];

  @State() leftColumn: Array<OneWord> = [];
  @State() rightColumn: Array<OneWord> = [];

  componentWillLoad() {
    this.leftColumn = this.pairs.map(x => ({
      text: x.word,
      isSelected: false,
    }));
    this.rightColumn = this.pairs.map(x => ({
      text: x.pair,
      isSelected: false,
    }));
  }

  private onWordSelected(column: string, selectedIdx: number): void {
    if (column === 'left') {
      this.leftColumn = this.leftColumn.map((x, idx) => ({
        ...x,
        isSelected: idx === selectedIdx,
      }));
    }
    if (column === 'right') {
      this.rightColumn = this.rightColumn.map((x, idx) => ({
        ...x,
        isSelected: idx === selectedIdx,
      }));
    }
    const isLeftSelected = this.leftColumn.some(x => x.isSelected);
    const isRightSelected = this.rightColumn.some(x => x.isSelected);
    if (isLeftSelected && isRightSelected) {
      const isMatch = this.leftColumn[selectedIdx].isSelected === this.rightColumn[selectedIdx].isSelected;
      if (isMatch) {
        console.log('match');
        setTimeout(() => {
          this.leftColumn = this.leftColumn.toSpliced(selectedIdx, 1);
          this.rightColumn = this.rightColumn.toSpliced(selectedIdx, 1);
        }, 500);
      } else {
        console.log('no match');
        setTimeout(() => {
          this.leftColumn = this.leftColumn.map(x => ({ ...x, isSelected: false }));
          this.rightColumn = this.rightColumn.map(x => ({ ...x, isSelected: false }));
        }, 500);
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Word pairs</h2>
        <div id="columns">
          <div class="column">
            <ul>
              {this.leftColumn.slice(0, this.maxWords).map(({ text, isSelected }, idx) => {
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
              {this.rightColumn.slice(0, this.maxWords).map(({ text, isSelected }, idx) => {
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
