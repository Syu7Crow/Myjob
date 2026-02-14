import { defineConfig } from '@prisma/config';
// 環境変数を読み込むための設定
import { config } from 'dotenv';
config(); 

export default defineConfig({
  datasource: {
    // 環境変数が空の場合のフォールバックも念のため確認
    url: process.env.POSTGRES_PRISMA_URL,
  },
});