import { translateNode } from '../translate';
import { parseHtml } from '../parse-html';
import { rfc002Source, href, imgSrc } from './shared';

describe('translateNode function', () => {
  it('should comply with RFC002 example (translating)', async () => {
    const documentTree = await parseHtml(rfc002Source);
    const ttree = translateNode(documentTree[0]);
    expect(ttree).toMatchObject({
      type: 'phrasing',
      isAnchor: true,
      attributes: { href },
      children: [
        {
          type: 'text',
          attributes: {},
          tagName: null,
          data: '\nThis is\n'
        },
        {
          type: 'text',
          attributes: {},
          tagName: 'span',
          data: 'phrasing content'
        },
        {
          type: 'text',
          attributes: {},
          tagName: null,
          data: '\n'
        },
        {
          type: 'block',
          attributes: { src: imgSrc },
          tagName: 'img'
        },
        {
          type: 'text',
          attributes: {},
          tagName: null,
          data: '\n    and this is '
        },
        {
          type: 'text',
          attributes: {},
          tagName: 'strong',
          data: 'too'
        },
        {
          type: 'text',
          attributes: {},
          tagName: null,
          data: '.\n'
        }
      ]
    });
    expect(ttree).toMatchSnapshot();
  });
});
