import { CryptoxlabPage } from './app.po';

describe('cryptoxlab App', function() {
  let page: CryptoxlabPage;

  beforeEach(() => {
    page = new CryptoxlabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
