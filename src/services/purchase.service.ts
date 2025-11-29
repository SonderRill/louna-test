import { sql } from '../config/database';
import { User, Product, Purchase } from '../types/database';

export class PurchaseService {
  async getUserById(userId: number): Promise<User | null> {
    const [user] = await sql<User[]>`
      SELECT * FROM users WHERE id = ${userId}
    `;
    return user || null;
  }

  async getProductById(productId: number): Promise<Product | null> {
    const [product] = await sql<Product[]>`
      SELECT * FROM products WHERE id = ${productId}
    `;
    return product || null;
  }

  async purchaseProduct(userId: number, productId: number): Promise<{ success: boolean; newBalance: number; error?: string }> {
    try {
      await sql.begin(async (sql) => {
        // Получаем пользователя с блокировкой строки
        const [user] = await sql<User[]>`
          SELECT * FROM users WHERE id = ${userId} FOR UPDATE
        `;

        if (!user) {
          throw new Error('User not found');
        }

        // Получаем продукт
        const [product] = await sql<Product[]>`
          SELECT * FROM products WHERE id = ${productId}
        `;

        if (!product) {
          throw new Error('Product not found');
        }

        // Проверяем баланс
        const userBalance = typeof user.balance === 'string' ? parseFloat(user.balance) : user.balance;
        const productPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

        if (userBalance < productPrice) {
          throw new Error('Insufficient balance');
        }

        // Обновляем баланс пользователя
        const newBalance = userBalance - productPrice;
        await sql`
          UPDATE users 
          SET balance = ${newBalance}, updated_at = NOW()
          WHERE id = ${userId}
        `;

        // Запись о покупке
        await sql<Purchase[]>`
          INSERT INTO purchases (user_id, product_id, price, created_at)
          VALUES (${userId}, ${productId}, ${product.price}, NOW())
        `;
      });

      // Получаем обновленный баланс
      const [updatedUser] = await sql<User[]>`
        SELECT * FROM users WHERE id = ${userId}
      `;

      const finalBalance = typeof updatedUser!.balance === 'string'
        ? parseFloat(updatedUser!.balance)
        : updatedUser!.balance;

      return {
        success: true,
        newBalance: finalBalance,
      };
    } catch (error) {
      return {
        success: false,
        newBalance: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

