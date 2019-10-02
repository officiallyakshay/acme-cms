const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_cms');

const Page = conn.define('Page', {
  title: {
    type: STRING
  },
  parentId: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  }
});

Page.hasMany(Page, {as: 'parent'});

const mapAndSave = (pages) => Promise.all(pages.map( page => Page.create(page)));

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const home = await Page.create({ title: 'Home Page' });
  let pages = [
    { title: 'About', parentId: home.id },
    { title: 'Contact', parentId: home.id }
  ];
  const [ about, contact ] = await mapAndSave(pages);

  pages = [
    { title: 'About Our Team', parentId: about.id },
    { title: 'About Our History', parentId: about.id },
    { title: 'Phone', parentId: contact.id },
    { title: 'Fax', parentId: contact.id }
  ];
  const [ team, history, phone, fax ] = await mapAndSave(pages);
};

Page.findHomePage = function () {
  console.log(Page)
  return Page.findAll();
}

syncAndSeed()
  .then( async () => {
    const home = await Page.findHomePage();
    console.log(home.title);//Home Page
    // const homeChildren = await home.findChildren();
    // console.log(homeChildren.map( page => page.title ));//[About, Contact];
    // const fax = await Page.findOne({ where: {title: 'Fax'} });
    // console.log(fax.title);
    // //hierarch returns the page, parentPage, parent's Parent.. etc..
    // let hier = await fax.hierarchy();
    // console.log(hier.map( page => page.title ));//['Fax', 'Contact', 'Home']
    // const history = await Page.findOne({ where : { title: 'About Our History'} });
    // hier = await history.hierarchy();
    // console.log(hier.map( page => page.title));//[ 'About Our History', 'About', 'Home Page' ]
  });

module.exports = {
  syncAndSeed,
  Page
}