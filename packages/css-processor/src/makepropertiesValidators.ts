import { CSSProcessorConfig } from './config';
import { LongFontFamilyPropertyValidator } from './validators/LongFontFamilyPropertyValidator';
import { LongFloatNumberCSSPropertyValidator } from './validators/LongFloatNumberCSSPropertyValidator';
import { LongBorderWidthCSSPropertyValidator } from './validators/LongBorderWidthCSSPropertyValidator';
import { LongFontSizeCSSValidator } from './validators/LongFontSizeCSSValidator';
import { LongSizeCSSPropertyValidator } from './validators/LongSizeCSSPropertyValidator';
import { LongAspectRatioPropertyValidator } from './validators/LongAspectRatioPropertyValidator';
import { LongEnumerationListCSSPropertyValidator } from './validators/LongEnumerationListCSSPropertyValidator';
import { LongBorderStyleCSSPropertyValidator } from './validators/LongBorderStyleCSSPropertyValidator';
import { LongEnumerationCSSPropertyValidator } from './validators/LongEnumerationCSSPropertyValidator';
import { LongColorCSSPropertyValidator } from './validators/LongColorCSSPropertyValidator';
import { ShortFontCSSValidator } from './validators/ShortFontCSSValidator';
import { ShortCSSToReactNativeValidator } from './validators/ShortCSSToReactNativeValidator';
import { ShortFlexCSSPropertyValidator } from './validators/ShortFlexCSSPropertyValidator';
import { LongCSSToReactNativeValidator } from './validators/LongCSSToReactNativeValidator';
import { ShortCardinalCSSpropertyValidator } from './validators/ShortCardinalCSSPropertyValidator';
import { ShortDualNativepropertyValidator } from './validators/ShortDualNativePropertyValidator';

const nativeTranslatableBlockFlowModel = {
  inheritable: true as true,
  native: true as true,
  translatable: true as true,
  display: 'block' as 'block'
};

const nativeTranslatableBlockRetainModel = {
  inheritable: false as false,
  native: true as true,
  translatable: true as true,
  display: 'block' as 'block'
};

const nativeUntranslatableBlockRetainModel = {
  inheritable: false as false,
  native: true as true,
  translatable: false as false,
  display: 'block' as 'block'
};

const nativeTranslatableTextFlowModel = {
  inheritable: true as true,
  native: true as true,
  translatable: true as true,
  display: 'text' as 'text'
};

const nativeTranslatableTextRetainModel = {
  inheritable: false as false,
  native: true as true,
  translatable: true as true,
  display: 'text' as 'text'
};

const webTextFlowModel = {
  inheritable: true as true,
  native: false as false,
  translatable: false as false,
  display: 'text' as 'text'
};

export type ValidatorsType = ReturnType<typeof makepropertiesValidators>;

export default function makepropertiesValidators(config: CSSProcessorConfig) {
  return {
    background: new ShortCSSToReactNativeValidator({
      config,
      model: nativeTranslatableBlockRetainModel,
      propertyName: 'background'
    }),
    border: new ShortCSSToReactNativeValidator({
      config,
      model: nativeTranslatableBlockRetainModel,
      propertyName: 'border'
    }),
    borderRadius: new ShortCardinalCSSpropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'borderRadius'
      },
      {
        top: 'borderTopLeftRadius',
        right: 'borderTopRightRadius',
        bottom: 'borderBottomRightRadius',
        left: 'borderBottomLeftRadius'
      }
    ),
    borderColor: new ShortCardinalCSSpropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'borderColor'
      },
      {
        top: 'borderTopColor',
        right: 'borderRightColor',
        bottom: 'borderBottomColor',
        left: 'borderLeftColor'
      }
    ),
    borderStyle: new LongBorderStyleCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'borderStyle'
      },
      ['solid', 'dotted', 'dashed']
    ),
    borderWidth: new ShortCardinalCSSpropertyValidator(
      {
        config,
        propertyName: 'borderWidth',
        model: nativeTranslatableBlockRetainModel
      },
      {
        top: 'borderTopWidth',
        right: 'borderRightWidth',
        bottom: 'borderBottomWidth',
        left: 'borderLeftWidth'
      }
    ),
    flex: new ShortFlexCSSPropertyValidator({
      config,
      propertyName: 'flex',
      model: nativeTranslatableBlockRetainModel
    }),
    flexFlow: new ShortCSSToReactNativeValidator({
      config,
      model: nativeTranslatableBlockRetainModel,
      propertyName: 'flexFlow'
    }),
    font: new ShortFontCSSValidator({
      config,
      model: nativeTranslatableTextFlowModel,
      propertyName: 'font'
    }),
    margin: new ShortCardinalCSSpropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'margin'
      },
      {
        top: 'marginTop',
        right: 'marginRight',
        bottom: 'marginBottom',
        left: 'marginLeft'
      }
    ),
    padding: new ShortCardinalCSSpropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'padding'
      },
      {
        top: 'paddingTop',
        right: 'paddingRight',
        bottom: 'paddingBottom',
        left: 'paddingLeft'
      }
    ),
    marginHorizontal: new ShortDualNativepropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'marginHorizontal'
      },
      ['marginLeft', 'marginRight']
    ),
    marginVertical: new ShortDualNativepropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'marginVertical'
      },
      ['marginTop', 'marginBottom']
    ),
    paddingHorizontal: new ShortDualNativepropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'paddingHorizontal'
      },
      ['paddingLeft', 'paddingRight']
    ),
    paddingVertical: new ShortDualNativepropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'paddingVertical'
      },
      ['paddingTop', 'paddingBottom']
    ),
    textDecoration: new ShortCSSToReactNativeValidator({
      config,
      model: nativeTranslatableTextRetainModel,
      propertyName: 'textDecoration'
    }),
    textDecorationColor: new LongColorCSSPropertyValidator({
      config,
      propertyName: 'textDecorationColor',
      model: nativeTranslatableTextRetainModel
    }),
    textDecorationLine: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableTextRetainModel,
        propertyName: 'textDecorationLine'
      },
      ['none', 'underline', 'line-through', 'underline line-through'] // 'overline' not supported by RN
    ),
    textDecorationStyle: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableTextRetainModel,
        propertyName: 'textDecorationStyle'
      },
      ['solid', 'double', 'dotted', 'dashed'] // 'wavy' unsupported
    ),
    color: new LongColorCSSPropertyValidator({
      config,
      propertyName: 'color',
      model: nativeTranslatableTextFlowModel
    }),
    fontFamily: new LongFontFamilyPropertyValidator({
      config,
      propertyName: 'fontFamily',
      model: nativeTranslatableTextFlowModel
    }),
    fontSize: new LongFontSizeCSSValidator({
      config,
      propertyName: 'fontSize',
      model: nativeTranslatableTextFlowModel
    }),
    fontStyle: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableTextFlowModel,
        propertyName: 'fontStyle'
      },
      ['normal', 'italic'] // 'oblique' not supported
    ),
    fontVariant: new LongEnumerationListCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableTextFlowModel,
        propertyName: 'fontVariant'
      },
      [
        'small-caps',
        'oldstyle-nums',
        'lining-nums',
        'tabular-nums',
        'proportional-nums'
      ]
    ),
    fontWeight: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableTextFlowModel,
        propertyName: 'fontWeight'
      },
      [
        'normal',
        'bold',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900'
      ]
    ),
    letterSpacing: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'letterSpacing',
      model: nativeTranslatableTextFlowModel
    }),
    lineHeight: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'lineHeight',
      model: nativeTranslatableTextFlowModel
    }),
    textAlign: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableTextFlowModel,
        propertyName: 'textAlign'
      },
      ['auto', 'left', 'right', 'center', 'justify']
    ),
    textTransform: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableTextFlowModel,
        propertyName: 'textTransform'
      },
      ['none', 'capitalize', 'uppercase', 'lowercase']
    ),
    whiteSpace: new LongEnumerationCSSPropertyValidator(
      { config, model: webTextFlowModel, propertyName: 'whiteSpace' },
      ['normal', 'pre']
    ),
    alignContent: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeUntranslatableBlockRetainModel,
        propertyName: 'alignContent'
      },
      [
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'space-between',
        'space-around'
      ]
    ),
    alignItems: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeUntranslatableBlockRetainModel,
        propertyName: 'alignItems'
      },
      ['flex-start', 'flex-end', 'center', 'stretch', 'baseline']
    ),
    alignSelf: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeUntranslatableBlockRetainModel,
        propertyName: 'alignSelf'
      },
      ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline']
    ),
    aspectRatio: new LongAspectRatioPropertyValidator({
      config,
      model: nativeUntranslatableBlockRetainModel,
      propertyName: 'aspectRatio'
    }),
    bottom: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'bottom',
      model: nativeUntranslatableBlockRetainModel
    }),
    display: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeUntranslatableBlockRetainModel,
        propertyName: 'display'
      },
      [
        'inline',
        'block',
        'contents',
        'flex',
        'grid',
        'inline-block',
        'inline-flex',
        'inline-grid',
        'inline-table',
        'list-item',
        'run-in',
        'table',
        'table-caption',
        'table-column-group',
        'table-header-group',
        'table-footer-group',
        'table-row-group',
        'table-cell',
        'table-column',
        'table-row',
        'none'
      ]
    ),
    flexBasis: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'flexBasis',
      model: nativeUntranslatableBlockRetainModel
    }),
    flexDirection: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeUntranslatableBlockRetainModel,
        propertyName: 'flexDirection'
      },
      ['row', 'column', 'row-reverse', 'column-reverse']
    ),
    flexGrow: new LongFloatNumberCSSPropertyValidator({
      config,
      propertyName: 'flexGrow',
      model: nativeUntranslatableBlockRetainModel
    }),
    flexShrink: new LongFloatNumberCSSPropertyValidator({
      config,
      propertyName: 'flexShrink',
      model: nativeUntranslatableBlockRetainModel
    }),
    flexWrap: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeUntranslatableBlockRetainModel,
        propertyName: 'flexWrap'
      },
      ['wrap', 'nowrap', 'wrap-reverse']
    ),
    justifyContent: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeUntranslatableBlockRetainModel,
        propertyName: 'justifyContent'
      },
      [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly'
      ]
    ),
    left: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'left',
      model: nativeUntranslatableBlockRetainModel
    }),
    position: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeUntranslatableBlockRetainModel,
        propertyName: 'position'
      },
      ['absolute', 'relative']
    ),
    right: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'right',
      model: nativeUntranslatableBlockRetainModel
    }),
    top: new LongSizeCSSPropertyValidator({
      config,
      model: nativeUntranslatableBlockRetainModel,
      propertyName: 'top'
    }),
    backfaceVisibility: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableBlockRetainModel,
        propertyName: 'backfaceVisibility'
      },
      ['visible', 'hidden']
    ),
    backgroundColor: new LongColorCSSPropertyValidator({
      config,
      propertyName: 'backgroundColor',
      model: nativeTranslatableBlockRetainModel
    }),
    borderBottomColor: new LongColorCSSPropertyValidator({
      config,
      propertyName: 'borderBottomColor',
      model: nativeTranslatableBlockRetainModel
    }),
    borderBottomLeftRadius: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'borderBottomLeftRadius',
      model: nativeTranslatableBlockRetainModel
    }),
    borderBottomRightRadius: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'borderBottomRightRadius',
      model: nativeTranslatableBlockRetainModel
    }),
    borderBottomWidth: new LongBorderWidthCSSPropertyValidator({
      config,
      propertyName: 'borderBottomWidth',
      model: nativeTranslatableBlockRetainModel
    }),
    borderLeftColor: new LongColorCSSPropertyValidator({
      config,
      propertyName: 'borderLeftColor',
      model: nativeTranslatableBlockRetainModel
    }),
    borderLeftWidth: new LongBorderWidthCSSPropertyValidator({
      config,
      propertyName: 'borderLeftWidth',
      model: nativeTranslatableBlockRetainModel
    }),
    borderRightColor: new LongColorCSSPropertyValidator({
      config,
      propertyName: 'borderRightColor',
      model: nativeTranslatableBlockRetainModel
    }),
    borderRightWidth: new LongBorderWidthCSSPropertyValidator({
      config,
      propertyName: 'borderRightWidth',
      model: nativeTranslatableBlockRetainModel
    }),
    borderTopColor: new LongColorCSSPropertyValidator({
      config,
      propertyName: 'borderTopColor',
      model: nativeTranslatableBlockRetainModel
    }),
    borderTopLeftRadius: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'borderTopLeftRadius',
      model: nativeTranslatableBlockRetainModel
    }),
    borderTopRightRadius: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'borderTopRightRadius',
      model: nativeTranslatableBlockRetainModel
    }),
    borderTopWidth: new LongBorderWidthCSSPropertyValidator({
      config,
      propertyName: 'borderTopWidth',
      model: nativeTranslatableBlockRetainModel
    }),
    height: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'height',
      model: nativeTranslatableBlockRetainModel
    }),
    marginBottom: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'marginBottom',
      model: nativeTranslatableBlockRetainModel
    }),
    marginLeft: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'marginLeft',
      model: nativeTranslatableBlockRetainModel
    }),
    marginRight: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'marginRight',
      model: nativeTranslatableBlockRetainModel
    }),
    marginTop: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'marginTop',
      model: nativeTranslatableBlockRetainModel
    }),
    maxHeight: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'maxHeight',
      model: nativeTranslatableBlockRetainModel
    }),
    maxWidth: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'maxWidth',
      model: nativeTranslatableBlockRetainModel
    }),
    minHeight: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'minHeight',
      model: nativeTranslatableBlockRetainModel
    }),
    minWidth: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'minWidth',
      model: nativeTranslatableBlockRetainModel
    }),
    opacity: new LongFloatNumberCSSPropertyValidator({
      config,
      propertyName: 'opacity',
      model: nativeTranslatableBlockRetainModel
    }),
    paddingBottom: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'paddingBottom',
      model: nativeTranslatableBlockRetainModel
    }),
    paddingLeft: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'paddingLeft',
      model: nativeTranslatableBlockRetainModel
    }),
    paddingRight: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'paddingRight',
      model: nativeTranslatableBlockRetainModel
    }),
    paddingTop: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'paddingTop',
      model: nativeTranslatableBlockRetainModel
    }),
    transform: new LongCSSToReactNativeValidator({
      config,
      propertyName: 'transform',
      model: nativeTranslatableBlockRetainModel
    }),
    width: new LongSizeCSSPropertyValidator({
      config,
      propertyName: 'width',
      model: nativeTranslatableBlockRetainModel
    }),
    zIndex: new LongFloatNumberCSSPropertyValidator({
      config,
      propertyName: 'zIndex',
      model: nativeTranslatableBlockRetainModel
    }),
    direction: new LongEnumerationCSSPropertyValidator(
      {
        config,
        model: nativeTranslatableBlockFlowModel,
        propertyName: 'direction'
      },
      ['auto', 'ltr', 'rtl']
    )
  };
}