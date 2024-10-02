import { Blogger } from 'src/blogger/entities/blogger.entity';
import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const typeOrmconfig: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'BlogAppDB',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  entities: [User, Blogger],
  synchronize: true,
};

export default typeOrmconfig;
