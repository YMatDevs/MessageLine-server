
import { pgRole } from 'drizzle-orm/pg-core';
import { isProd } from '../../config.js';


const dev_roles = {
    app_admin: pgRole("app_admin", {
        createDb: true,
        createRole: true,
        inherit: true
    }),
    app_user: pgRole("app_user", {
        createDb: false,
        createRole: false,
        inherit: false,
    })
}

const prod_roles = {
    app_user: pgRole("app_user", {
        createDb: false,
        createRole: false,
        inherit: false,
    })
}

const roles = isProd ? prod_roles : dev_roles;

export default roles;
