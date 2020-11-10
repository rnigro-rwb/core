import { TNode, TNodeInit } from './TNode';

export interface TTextInit extends Omit<TNodeInit, 'bindChildren'> {
  data: string;
}

export class TText extends TNode {
  public data: string;
  constructor(init: TTextInit) {
    super(init, 'text');
    this.data = init.data;
  }

  isCollapsibleLeft(): boolean {
    return (
      this.hasWhiteSpaceCollapsingEnabled &&
      !this.isEmpty() &&
      this.data[0] === ' '
    );
  }

  isCollapsibleRight(): boolean {
    return (
      this.hasWhiteSpaceCollapsingEnabled &&
      !this.isEmpty() &&
      this.data[this.data.length - 1] === ' '
    );
  }

  isWhitespace() {
    return this.data === ' ';
  }

  isEmpty() {
    return !this.data.length;
  }

  trimLeft() {
    if (this.isCollapsibleLeft()) {
      this.data = this.data.slice(1);
    }
  }

  trimRight() {
    if (this.isCollapsibleRight()) {
      this.data = this.data.substr(0, this.data.length - 1);
    }
  }
}
