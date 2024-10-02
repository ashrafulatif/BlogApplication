import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const typeOrmconfig: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'BlogAppDB',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  entities: [User],
  synchronize: true,
};

export default typeOrmconfig;
