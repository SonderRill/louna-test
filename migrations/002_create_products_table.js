/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    description: {
      type: 'text',
      notNull: false,
    },
    price: {
      type: 'decimal(10, 2)',
      notNull: true,
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

  pgm.createIndex('products', 'name');
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};

