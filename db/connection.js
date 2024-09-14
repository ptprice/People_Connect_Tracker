import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: '1',
      host: 'localhost',
      database: 'company_db',
      port: 5432
    },
    console.log(`Connected to the company_db database.`)
  )
  export default pool;