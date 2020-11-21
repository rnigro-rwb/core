import { CSSProperties, CSSProcessedProps } from '@native-html/css-processor';

/**
 * A merge properties from left to right.
 *
 * @param child
 * @param parent
 */
function inheritProperties(
  ...properties: Array<CSSProperties | null | undefined>
): CSSProperties {
  const realProperties = properties.filter((p) => p != null);
  if (realProperties.length === 1) {
    return realProperties[0] as CSSProperties;
  }
  return realProperties.reduce(
    (prev, curr) => ({ ...prev, ...curr }),
    {} as CSSProperties
  ) as CSSProperties;
}

export class TStyles {
  public readonly nativeTextFlow: CSSProcessedProps['native']['text']['flow'];
  public readonly nativeBlockFlow: CSSProcessedProps['native']['block']['flow'];
  public readonly nativeTextRet: CSSProcessedProps['native']['text']['retain'];
  public readonly nativeBlockRet: CSSProcessedProps['native']['block']['retain'];
  public readonly webTextFlow: CSSProcessedProps['web']['text']['flow'];
  constructor(
    ownProcessedProps: CSSProcessedProps,
    parentStyles?: TStyles | null
  ) {
    this.nativeTextFlow = inheritProperties(
      parentStyles?.nativeTextFlow,
      ownProcessedProps.native.text.flow
    );
    this.nativeBlockFlow = inheritProperties(
      parentStyles?.nativeBlockFlow,
      ownProcessedProps.native.block.flow
    );
    this.webTextFlow = inheritProperties(
      parentStyles?.webTextFlow,
      ownProcessedProps.web.text.flow
    );
    // In theory, we shouldn't merge those properties. However, these
    // properties being textDecoration*, we actually want children nodes to
    // inherit from them. A cleaner solution would be to to let each TNode
    // handle its merging logic, because only TPhrasing and TText nodes would
    // need to merge these.
    this.nativeTextRet = inheritProperties(
      parentStyles?.nativeTextRet,
      ownProcessedProps.native.text.retain
    );
    this.nativeBlockRet = ownProcessedProps.native.block.retain;
  }

  static empty(): TStyles {
    return new TStyles(new CSSProcessedProps());
  }
}