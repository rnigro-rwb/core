import { TBlock, TBlockInit } from './TBlock';

export interface TBlockAnchorInit extends TBlockInit {
  href: string;
}

export class TBlockAnchor extends TBlock {
  public href: string;
  public readonly displayName = 'TBlockAnchor';
  constructor(init: TBlockAnchorInit) {
    super(init);
    // @ts-ignore
    this.isAnchor = true;
    this.href = init.href;
  }
}