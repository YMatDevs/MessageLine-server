
import { pgRole } from 'drizzle-orm/pg-core';

export const app_user = pgRole("app_user").existing();