import Sequelize from 'sequelize';
import { Model } from './../../src/model';

class RelatedModel extends Model {
  newField = { type: Sequelize.STRING };
}

export default RelatedModel;
