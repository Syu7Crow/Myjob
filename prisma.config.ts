import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: "postgresql://neondb_owner:npg_H4lQ9qrbVIMC@ep-hidden-voice-a14s41dg-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require",
  },
});