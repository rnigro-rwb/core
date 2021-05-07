import { TStyles } from '../styles/TStyles';
import tnodeToString from './tnodeToString';
import { TNodeImpl, TNodeInit, TNodeType } from './tree-types';

export type GenericTNodeCtor<Init = TNodeInit, Impl = TNodeImpl> = {
  new (init: Init): Impl;
  prototype: Impl;
};

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

function updateNodeIndexes(node: Mutable<TNodeImpl>, i: number) {
  node.nodeIndex = i;
}

const emptyAttrs = Object.freeze({});

const prototype: Omit<TNodeImpl, 'displayName' | 'type'> = {
  children: Object.freeze([]) as any,
  init: Object.freeze({}) as any,
  classes: Object.freeze([]) as any,
  styles: Object.freeze(TStyles.empty()) as any,
  __nodeIndex: null,
  __trimmedLeft: false,
  __trimmedRight: false,
  get attributes() {
    return this.domNode?.attribs || emptyAttrs;
  },

  get hasWhiteSpaceCollapsingEnabled() {
    return typeof this.styles.webTextFlow.whiteSpace === 'string'
      ? this.styles.webTextFlow.whiteSpace === 'normal'
      : true;
  },

  get contentModel() {
    return this.elementModel?.contentModel || null;
  },

  get parentStyles() {
    return this.init.parentStyles || this.parent?.styles || null;
  },

  get id() {
    return this.attributes.id || null;
  },

  get domNode() {
    return this.init.domNode || null;
  },

  get elementModel() {
    return this.init.elementModel;
  },

  get stylesMerger() {
    return this.init.stylesMerger;
  },

  get tagName() {
    return this.init.domNode?.name || null;
  },

  get parent() {
    return (this.init.parent as any) || null;
  },

  get nodeIndex() {
    if (this.__nodeIndex === null) {
      this.__nodeIndex = this.init.nodeIndex || 0;
    }
    return this.__nodeIndex;
  },

  get isUnregistered() {
    return this.init.isUnregistered || false;
  },

  set nodeIndex(nodeIndex: number) {
    this.__nodeIndex = nodeIndex;
  },

  bindChildren(children, shouldUpdateNodeIndexes = false) {
    //@ts-ignore
    this.children = children;
    if (shouldUpdateNodeIndexes) {
      children.forEach(updateNodeIndexes);
    }
  },

  cloneInitParams(partial) {
    return Object.assign({}, this.init, partial) as any;
  },

  isCollapsibleLeft() {
    if (this.children.length) {
      return (
        this.hasWhiteSpaceCollapsingEnabled &&
        this.children[0].isCollapsibleLeft()
      );
    }
    return false;
  },

  isCollapsibleRight() {
    if (this.children.length) {
      return (
        this.hasWhiteSpaceCollapsingEnabled &&
        this.children[this.children.length - 1].isCollapsibleRight()
      );
    }
    return false;
  },

  isEmpty() {
    return false;
  },

  trimLeft() {
    if (!this.__trimmedLeft && this.children.length) {
      const firstChild = this.children[0];
      firstChild.trimLeft();
      if (firstChild.isEmpty()) {
        //@ts-ignore
        this.children.splice(0, 1);
      }
      this.__trimmedLeft = true;
    }
  },

  trimRight() {
    if (!this.__trimmedRight && this.children.length) {
      const lastChild = this.children[this.children.length - 1];
      lastChild.trimRight();
      if (lastChild.isEmpty()) {
        //@ts-ignore
        this.children.splice(-1, 1);
      }
      this.__trimmedRight = true;
    }
  },

  matchContentModel() {
    return false;
  },

  spliceChildren(indexesToSplice) {
    let offset = 0;
    for (const i of indexesToSplice) {
      //@ts-ignore
      this.children.splice(i - offset, 1);
      offset += 1;
    }
  },

  collapse(params) {
    this.collapseChildren(params);
    this.bindChildren(this.children, true);
  },

  collapseChildren() {
    return;
  },

  snapshot(options = {}) {
    const { withStyles = false, withNodeIndex = false } = options;
    return tnodeToString(this as any, { withStyles, withNodeIndex });
  },

  toString() {
    return this.snapshot();
  },

  initialize<Impl extends TNodeImpl<any> = TNodeImpl>(
    this: Mutable<Impl>,
    init: Impl['init']
  ) {
    this.init = init;
    this.classes = this.attributes.class?.split(/\s+/) || [];
    this.styles =
      this.init.styles ||
      this.init.stylesMerger.buildStyles(
        this.attributes.style,
        this.parentStyles || null,
        this
      );
  }
};

const TNodeCtor = function TNode<Impl extends TNodeImpl = TNodeImpl>(
  this: Mutable<TNodeImpl>,
  type: TNodeType,
  displayName: string,
  extraAccessors?: {
    [k in Exclude<keyof Impl, keyof TNodeImpl>]: {
      get: () => any;
      set?: (val: any) => void;
    };
  }
) {
  this.type = type;
  this.displayName = displayName;
  extraAccessors && Object.defineProperties(this, extraAccessors);
};

TNodeCtor.prototype = prototype as any;

export default TNodeCtor;
