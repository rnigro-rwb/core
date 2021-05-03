import HTMLContentModel from '../model/HTMLContentModel';
import makeTNodePrototype, {
  TNodeCtor,
  Mutable,
  initialize
} from './makeTNodePrototype';
import HTMLElementModel from '../model/HTMLElementModel';
import { isElement, isText } from '../dom/dom-utils';
import { TEmptyImpl } from './TEmpty';
import { TNodeInit, TNodeImpl, TNodeShape } from './tree-types';

export interface DocumentContext {
  charset: string;
  baseHref: string;
  baseTarget: '_blank' | '_self' | '_parent' | '_top';
  lang: string;
  dir: 'ltr' | 'rtl';
  title: string;
  meta: { name: string; value: string }[];
  links: Record<string, string>[];
}

export type TDocumentInit = Omit<TNodeInit, 'elementModel'>;

export interface TDocumentImpl extends TNodeImpl<TNodeInit> {
  readonly context: Readonly<DocumentContext>;
  /**
   * Iterate over children and extract meta-information into context field.
   * Replace children with a single-element array containing the body.
   */
  parseChildren(): void;
}

const defaultContextBase: DocumentContext = Object.freeze({
  baseHref: 'about:blank',
  baseTarget: '_self',
  charset: 'utf-8',
  title: '',
  lang: 'en',
  dir: 'ltr',
  links: [],
  meta: []
});

function getDefaultDocumentContext(): DocumentContext {
  return Object.assign({}, defaultContextBase, { links: [], meta: [] });
}

function extractContextFromHead(head: TEmptyImpl, lang?: string, dir?: string) {
  const context = getDefaultDocumentContext();
  if (lang) {
    context.lang = lang;
  }
  if (dir && dir === 'rtl') {
    context.dir = 'rtl';
  }
  const domNode = head.domNode;
  const children = domNode.children;
  children.filter(isElement).forEach((child) => {
    if (child.tagName === 'meta') {
      if (child.attribs.name) {
        context.meta.push(child.attribs as any);
      } else if (child.attribs.charset) {
        context.charset = child.attribs.charset.toLowerCase();
      }
    } else if (child.tagName === 'link') {
      context.links.push(child.attribs);
    } else if (child.tagName === 'title') {
      for (const titleChild of child.children.filter(isText)) {
        context.title = titleChild.data.trim();
        break;
      }
    } else if (child.tagName === 'base') {
      context.baseHref = child.attribs.href || context.baseHref;
      context.baseTarget = (child.attribs.target as any) || context.baseTarget;
    }
  });
  return context;
}

const htmlModel = HTMLElementModel.fromNativeModel({
  tagName: 'html' as any,
  category: 'grouping'
});

interface TDocument extends TNodeShape {
  readonly context: Readonly<DocumentContext>;
}

const TDocument = (function TDocument(
  this: Mutable<TDocumentImpl>,
  init: TDocumentInit
) {
  initialize(this, {
    ...init,
    elementModel: htmlModel
  });
  Object.defineProperty(this, 'tagName', {
    value: 'html'
  });
} as Function) as TNodeCtor<TDocumentInit, TDocumentImpl>;

TDocument.prototype = makeTNodePrototype('document', 'TDocument');

TDocument.prototype.matchContentModel = function matchContentModel(
  contentModel
) {
  return (
    contentModel === HTMLContentModel.block ||
    contentModel === HTMLContentModel.mixed
  );
};

TDocument.prototype.parseChildren = function parseChildren(
  this: Mutable<TDocumentImpl>
) {
  let head: TEmptyImpl | undefined;
  for (const child of this.children) {
    if (child.tagName === 'head') {
      head = (child as unknown) as TEmptyImpl;
      break;
    }
  }
  this.context = Object.freeze(
    head
      ? extractContextFromHead(
          head,
          this.attributes!.lang,
          this.attributes!.dir
        )
      : {
          ...getDefaultDocumentContext(),
          lang: this.attributes!.lang,
          dir: this.attributes!.dir as any
        }
  );
};
export { TDocument };

export default TDocument;
