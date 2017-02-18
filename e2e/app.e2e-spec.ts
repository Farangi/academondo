import { AcadeMondoPage } from './app.po';

describe('acade-mondo App', function() {
  let page: AcadeMondoPage;

  beforeEach(() => {
    page = new AcadeMondoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
