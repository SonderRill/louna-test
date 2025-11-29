/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    username: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    balance: {
      type: 'decimal(10, 2)',
      notNull: true,
      default: 0.00,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createIndex('users', 'username');
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};

