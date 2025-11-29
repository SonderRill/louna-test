/* eslint-disable camelcase */

exports.up = (pgm) => {
  // Тестовые пользователи
  pgm.sql(`
    INSERT INTO users (username, balance) VALUES
    ('testuser', 1000.50),
    ('john_doe', 500.25),
    ('jane_smith', 750.75)
    ON CONFLICT (username) DO NOTHING;
  `);

  // Тестовые продукты
  pgm.sql(`
    INSERT INTO products (name, description, price) VALUES
    ('Virtual Sword', 'A powerful magical sword for your character', 99.99),
    ('Health Potion', 'Restores 100 HP', 15.50),
    ('Magic Shield', 'Provides 50% damage reduction', 149.99),
    ('Speed Boots', 'Increases movement speed by 25%', 79.99),
    ('Golden Key', 'Unlocks special treasure chests', 199.99),
    ('Elixir of Strength', 'Permanently increases strength by 10', 299.50)
    ON CONFLICT DO NOTHING;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DELETE FROM purchases;
    DELETE FROM products;
    DELETE FROM users;
  `);
};

