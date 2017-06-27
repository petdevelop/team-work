import { AngMaterialPage } from './app.po';

describe('ang-material App', () => {
  let page: AngMaterialPage;

  beforeEach(() => {
    page = new AngMaterialPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
