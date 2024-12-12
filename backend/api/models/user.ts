import { DataTypes, Model, Sequelize } from 'sequelize';

interface UserAttributes {
  id?: number; 
  username: string;
  firstname: string;
  lastname: string;
  social?: string;
  phoneNumber?: string;
  telegramChatId?: string;
  email?: string;
  email_verified_at?: string;
  password: string;
  biometric?: string;
  passcode?: string;
  referralId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}


class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public firstname!: string;
  public lastname!: string;
  public social?: string;
  public phoneNumber?: string;
  public telegramChatId?: string;
  public email?: string;
  public email_verified_at?: string;
  public password!: string;
  public biometric?: string;
  public passcode?: string;
  public referralId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model
const initializeUser = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      social: {
        type: DataTypes.STRING,
        defaultValue: 'TELEGRAM',
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      telegramChatId: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      email_verified_at: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      biometric: {
        type: DataTypes.STRING,
      },
      passcode: {
        type: DataTypes.STRING,
      },
      referralId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};

export default initializeUser;
