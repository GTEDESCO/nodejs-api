/*
  VSCODE EXTENSIONS

  Dracula
  Material Icon Theme
  Color Highlight
  Eslint
  Prettier
  EditorConfig
  Bookmarks
  Rocketseat ReactJS
  Rocketseat React Native

  BAIXAR FONTE FIRA CODE -> ttf

  https://github.com/tonsky/FiraCode

  CHROME EXTENSIONS

  REACT DEVELOPER TOOLS

  FERRAMENTAS

  INSOMNIA.rest
  DEVDOCS APP

  NODEJS.org
  YARN

  VSCODE SETTINGS
  {
    "workbench.startupEditor": "newUntitledFile",
    "workbench.colorTheme": "Dracula",
    "workbench.iconTheme": "material-icon-theme",
    "window.zoomLevel": 0,
    "editor.fontSize": 14,
    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": true,

    "editor.rulers": [80, 120],
    "eslint.autoFixOnSave": true,
    "editor.formatOnSave": false,
    "eslint.validate": [
      {
        "language": "javascript",
        "autoFix": true
      },
      {
        "language": "javascriptreact",
        "autoFix": true
      },
      {
        "language": "typescript",
        "autoFix": true
      },
      {
        "language": "typescriptreact",
        "autoFix": true
      }
    ],

    "editor.renderLineHighlight": "gutter",
    "editor.tabSize": 2,
    "terminal.integrated.fontSize": 14,
    "emmet.includeLanguages": {
      "javascript": "javascriptreact"
    },
    "emmet.syntaxProfiles": {
      "javascript": "jsx"
    },
    "javascript.updateImportsOnFileMove.enabled": "never",
    "editor.parameterHints.enabled": false,
    "breadcrumbs.enabled": true,
    "javascript.suggest.autoImports": false,
  }


  EXPLICAÇÃO NODEJS / Javascript

  EVENT LOOP -> Arquitetura baseado em eventos
  CALL STACK -> Chamadas de funções do event loop via pilhas em multi threads
    A ultima que entra é a primeira que sai por isso uma pilha
  NO-BLOCKING I/O -> Respostas por parte para o cliente (WebSocket/Socket.io)

  Frameworks
  Express / Koa -> Sem opnião, ótimo para micro serviços e flexibilidade
  AdonisJS / NestJS / Meteor -> opniado -> ótimo para api monolita

  PARAMETROS
  query params = parametros da url (url?teste=123)
  route params = parametros da rota (url/:teste)
  body params = parametros no corpo da request

  DEBUG -> add configuration

  {
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "attach",
        "name": "Attach Program",
        "restart": true,
        "protocol": "inspector"
      }
    ]
  }

  mkdir nodeapi
  cd nodeapi
  yarn init -y

  pastas
  __tests__
    src
      app
        schemas
          Notification.js
        middlewares
          auth.js
        models
          User.js
        controllers
          SessionController.js
          UserController.js
        validators
          User.js
      config
        database.js
      app.js
      routes.js
      server.js
  nodemon.json
  .prettierrc
  .editorconfig
  .eslintrc.js
  .sequelizerc
  .env
  .gitignore
  jest.config.js

  yarn add express
  yarn add jest -D
  yarn jest --init
  yarn add @sucrase/jest-plugin -D
  yarn add @types/jest -D
  yarn add nodemon -D
  yarn add sucrase -D
  yarn add eslint -D
  yarn eslint --init
  yarn eslint --fix src --ext js
  yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
  yarn add sequelize
  yarn add sequelize-cli
  yarn add dotenv
  yarn add bcryptjs
  yarn add jsonwebtoken
  yarn add yup
  yarn add mongoose
  yarn add express-async-errors
  yarn add youch
  yarn add tedious
  yarn add sqlite3 -D
  yarn add supertest -D

  FILES

  nodemon.json
  {
    "execMap": {
      "js": "sucrase-node"
    }
  }

  .prettierrc
  {
    "singleQuote": true,
    "trailingComma": "es5"
  }

  .editorconfig
  root = true

  [*]
  indent_style = space
  indent_size = 2
  charset = utf-8
  trim_trailing_whitespace = true
  insert_final_newline = true

  .eslintrc.js
  module.exports = {
    env: {
      es6: true,
      node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      camelcase: 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    },
  };

  .sequelizerc
  const { resolve } = require('path');

  module.exports = {
    config: resolve(__dirname, 'src', 'config', 'database.js'),
    'models-path': resolve(__dirname, 'src', 'app', 'models'),
    'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
    'seeders-path': resolve(__dirname, 'src', 'database', 'seeders'),
  };

  .env
  APP_SECRET=TMOV_SECRET

  NODE_ENV=development

  DB_URL=mongodb://172.25.0.28:27017/local
  DB=local

  DB_DIALECT=mssql
  DB_USER=sistemainfoRO
  DB_PASS=sisinfoRO2018
  DB_HOST=172.24.0.36
  DB_NAME=ATS

  config/database.js
  require('dotenv').config({
    path:
      process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test'
        ? '.env.test'
        : '.env',
  });

  module.exports = {
    uri: process.env.DB_URL || '',
    name: process.env.DB || '',
    dialect: process.env.DB_DIALECT || '',
    host: process.env.DB_HOST || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME,
    logging: process.env.NODE_ENV !== 'production' ? console.info : false,
    storage: './__tests__/database.sqlite',
    operatorAliases: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
    },
  };

  database/index.js
  import Sequelize from 'sequelize';
  import mongoose from 'mongoose';

  import User from '../app/models/User';

  import databaseConfig from '../config/database';

  const models = [User];

  class Database {
    constructor() {
      this.init();
      this.mongo();
    }

    init() {
      this.connection = new Sequelize(databaseConfig);

      models.map(model => model.init(this.connection));
    }

    mongo() {
      this.mongoConnection = mongoose.connect(databaseConfig.uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
      });
    }
  }

  export default new Database();

  config/auth.js
  export default {
    secret: process.env.APP_SECRET,
    expiresIn: process.env.EXPIRES_TOKEN,
  };


  yarn sequelize migration:create --name=create-users

  module.exports = {
     up: (queryInterface, Sequelize) => {
      returnqueryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },

    down: queryInterface => {
      return queryInterface.dropTable('users');
    },
  };

  yarn sequelize db:migrate

  models/User.js
  import Sequelize, { Model } from 'sequelize';
  import bcrypt from 'bcryptjs';

  class User extends Model {
    static init(sequelize) {
      super.init(
        {
          name: Sequelize.STRING,
          email: Sequelize.STRING,
          password: Sequelize.VIRTUAL,
          password_hash: Sequelize.STRING,
        },
        {
          sequelize,
        }
      );

      this.addHook('beforeSave', async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      });

      return this;
    }

    checkPassword(password) {
      return bcrypt.compare(password, this.user.password_hash);
    }
  }

  export default User;


  controllers/SessionController.js
  import jwt from 'jsonwebtoken';

  import User from '../models/User';
  import authConfig from '../../config/auth';

  class SessionController {
    async store(req, res) {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado!' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha inválida!' });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    }
  }

  export default new SessionController();

  middlewares/auth.js
  import jwt from 'jsonwebtoken';
  import { promisify } from 'util';

  import authConfig from '../../config/auth';

  export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não encontrado!' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      req.userId = decoded.id;

      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido!' });
    }
  };

  schemas/Notification.js
  import mongoose from 'mongoose';

  const NotificationSchema = new mongoose.Schema(
    {
      content: {
        type: String,
        required: true,
      },
      user: {
        type: Number,
        required: true,
      },
      read: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

  export default mongoose.model('Notification', NotificationSchema);

  sentry
*/
