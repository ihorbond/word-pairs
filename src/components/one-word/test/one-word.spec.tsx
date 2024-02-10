import { newSpecPage } from '@stencil/core/testing';
import { OneWord } from '../one-word';

describe('one-word', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OneWord],
      html: `<one-word></one-word>`,
    });
    expect(page.root).toEqualHtml(`
      <one-word>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </one-word>
    `);
  });
});
