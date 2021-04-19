module.exports = {
    name: 'default',
    type: process.env.ORM_DEFAULT_TYPE,
    host: process.env.ORM_DEFAULT_HOST,
    port: process.env.ORM_DEFAULT_PORT,
    username: process.env.ORM_DEFAULT_USERNAME,
    password: process.env.ORM_DEFAULT_PASSWORD,
    database: process.env.ORM_DEFAULT_DATABASE,

    synchronize: false,
    
    ssl: { rejectUnauthorized: false },

    entities: [
      process.env.APP_ENV === 'development'
        ? './src/models/*.ts'
        : './dist/models/*.js',
    ],
    
    migrations: ['./src/database/migrations/*.ts'],
    
    cli: { migrationsDir: './src/database/migrations' },
}