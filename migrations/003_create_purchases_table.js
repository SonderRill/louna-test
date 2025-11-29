/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('purchases', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    product_id: {
      type: 'integer',
      notNull: true,
      references: 'products(id)',
      onDelete: 'CASCADE',
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
  });

  pgm.createIndex('purchases', 'user_id');
  pgm.createIndex('purchases', 'product_id');
  pgm.createIndex('purchases', 'created_at');
};

exports.down = (pgm) => {
  pgm.dropTable('purchases');
};

