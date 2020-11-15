import CSSProcessor, {
  CSSProcessedProps,
  CSSProcessorConfig,
  MixedStyleDeclaration
} from '@native-html/css-processor';
import { getElementModelFromTagName } from '../dom/elements-model';
import { TStyles } from './TStyles';
import { StylesConfig } from './types';

export const emptyProcessedPropsReg: CSSProcessedProps = new CSSProcessedProps();

function mapMixedStyleRecordToCSSProcessedPropsReg(
  processor: CSSProcessor,
  styles?: Record<string, MixedStyleDeclaration>
): Record<string, CSSProcessedProps> {
  let regStyles: Record<string, CSSProcessedProps> = {};
  for (const key in styles) {
    regStyles[key] = processor.compileStyleDeclaration(styles[key]);
  }
  return regStyles;
}

// Specificity hierarchy, in descending order:
// 1. Inline styles
// 2. ID (idsStyles)
// 3. Classes (classesStyles)
// 4. Element name (tagsStyles)
// 5. Attribute styles (styles derived from attributes)
// 6. Default element styles
// 7. Inherited styles (baseFontStyles)
export class TStylesMerger {
  private processor: CSSProcessor;
  private tagsStyles: Record<string, CSSProcessedProps>;
  private classesStyles: Record<string, CSSProcessedProps>;
  private idsStyles: Record<string, CSSProcessedProps>;
  private enableCSSInlineProcessing: boolean;
  private enableUserAgentStyles: boolean;
  constructor(config: StylesConfig, cssProcessorConfig?: CSSProcessorConfig) {
    this.processor = new CSSProcessor(cssProcessorConfig);
    this.classesStyles = mapMixedStyleRecordToCSSProcessedPropsReg(
      this.processor,
      config.classesStyles
    );
    this.tagsStyles = mapMixedStyleRecordToCSSProcessedPropsReg(
      this.processor,
      config.tagsStyles
    );
    this.idsStyles = mapMixedStyleRecordToCSSProcessedPropsReg(
      this.processor,
      config.idsStyles
    );
    this.enableCSSInlineProcessing = config.enableCSSInlineProcessing;
    this.enableUserAgentStyles = config.enableUserAgentStyles;
  }

  compileInlineCSS(inlineCSS: string) {
    return this.processor.compileInlineCSS(inlineCSS);
  }

  buildStyles(
    inlineStyle: string,
    parentStyles: TStyles | null,
    descriptor: {
      tagName: string | null;
      className: string | null;
      id: string | null;
      attributes: Record<string, string>;
    }
  ): TStyles {
    const ownInlinePropsReg =
      this.enableCSSInlineProcessing && inlineStyle
        ? this.compileInlineCSS(inlineStyle)
        : null;
    const model = descriptor.tagName
      ? getElementModelFromTagName(descriptor.tagName)
      : null;
    const userTagOwnProps =
      this.tagsStyles[descriptor.tagName as string] ?? null;
    const userIdOwnProps = this.idsStyles[descriptor.id as string] ?? null;
    const classes = descriptor.className
      ? descriptor.className.split(/\s+/)
      : [];
    const userClassesOwnPropsList = classes.map(
      (c) => this.classesStyles[c] || null
    );
    const derivedPropsFromAttributes = this.enableUserAgentStyles
      ? model?.getUADerivedCSSProcessedPropsFromAttributes(
          descriptor.attributes
        ) || null
      : null;
    const userAgentTagProps = this.enableUserAgentStyles
      ? model?.defaultCSSProcessedProps ?? null
      : null;
    // Latest properties will override former properties.
    const mergedOwnProps = mergePropsRegistries([
      userAgentTagProps,
      derivedPropsFromAttributes,
      userTagOwnProps,
      ...userClassesOwnPropsList,
      userIdOwnProps,
      ownInlinePropsReg
    ]);
    return new TStyles(mergedOwnProps, parentStyles);
  }
}

/**
 * Merge from lower specificy registries (left) to higher specificity registry (right).
 * @param registries
 */
function mergePropsRegistries(
  registries: Array<CSSProcessedProps | null>
): CSSProcessedProps {
  const filteredProps = registries.filter(isNotNull);
  return emptyProcessedPropsReg.merge(...filteredProps);
}

function isNotNull<T>(item: T): item is Exclude<T, null> {
  return item !== null;
}
