import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IGadget, GadgetStatus } from '../types/gadget';

class Gadget extends Model<IGadget> implements IGadget {
  public id!: string;
  public name!: string;
  public status!: GadgetStatus;
  public decommissionedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Gadget.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(...Object.values(GadgetStatus)),
      allowNull: false
    },
    decommissionedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'gadgets',
    modelName: 'Gadget'
  }
);

export default Gadget;