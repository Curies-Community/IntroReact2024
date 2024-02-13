import { Sequelize } from 'sequelize';

function getDb() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: '/Users/soyoscarrh/Documents/IntroReact2024/class 10/server-components/data.sqlite'
  });
}

export default getDb;