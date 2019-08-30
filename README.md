<p align="center">
  <a href="https://david-dm.org/baraberto/ba-electron-react-webpack-boilerplate"><img alt="Dependency Status" src="https://david-dm.org/baraberto/ba-electron-react-webpack-boilerplate.svg?style=flat"></a>
  <a href="https://david-dm.org/baraberto/ba-electron-react-webpack-boilerplate?type=dev"><img alt="devDependency Status" src="https://david-dm.org/baraberto/ba-electron-react-webpack-boilerplate/dev-status.svg?style=flat"></a>
  <a href="http://opensource.org/licenses/MIT"><img alt="MIT License" src="https://img.shields.io/npm/l/express.svg"></a>
</p>

## Electron, React, Webpack para começar o seu próximo mambo.


Com React, comunicacao entre node e browser ipc, com ligacao a modulo nativo a C++ [`libvips`](https://github.com/libvips/libvips) pelo [`sharp`](https://github.com/lovell/sharp)

Construir a sua aplicação com:
- [React](https://reactjs.org) para construir a sua interface de forma declarativa, baseada em componentes [documentação](https://reactjs.org/docs/getting-started.html) [repositório](https://github.com/facebook/react/)

- [Electron](https://electronjs.org/) a correr nativamente em Windows, Linux e OSX [documentação](https://electronjs.org/docs) [repositório](https://github.com/electron/electron)

- [Webpack](https://webpack.js.org/) escrevendo o javascript de amanhã [documentação](https://webpack.js.org/concepts/) [repositório](https://github.com/webpack/webpack)

- [flow](https://flow.org/) com sua Com validação de tipos [documentação](https://flow.org/en/docs/) [repositório](https://github.com/facebook/flow)

- [eslint](https://eslint.org/) código legível com a melhores práticas e formatação automática [prettier](https://prettier.io/)

- [material-ui](https://material-ui-next.com/) para um layout simples e poderoso [documentação](https://material-ui.com/getting-started/installation/) [repositório](https://github.com/mui-org/material-ui)

- [redux](https://redux.js.org/) dados pedir despachar [documentação](https://redux.js.org/introduction/getting-started) [repositório](https://github.com/reduxjs/redux)

- [redux](https://redux.js.org/) caminhos para organizar as vistas [documentação](https://reacttraining.com/react-router/web/guides/quick-start) [repositório](https://github.com/ReactTraining/react-router)

- [sharp](https://sharp.pixelplumbing.com/en/stable/) para transformar images [repositório](https://github.com/lovell/sharp)

Instalar os tipos flow:
```bash
flow-typed install -i dev -s
```

### Dependencias
para o sharp funcionar

instalar bibliotecas [requeridas](https://sharp.pixelplumbing.com/en/stable/install/) pelo `sharp`
 e correr

```
./node_modules/.bin/electron-rebuild
```

### Índice

* [Instalar](#Instalar)
* [Utilizar](#Utilizar)
* [License | Licença](#license)

### Instalar

#### Criar um Clone de este repositório

```
git clone https://github.com/baraberto/ba-electron-react-webpack-boilerplate.git
```

#### Instalar dependências

```
npm Instalar
```

### Utilizar

#### Executar a aplicação

```
npm run start
```

#### Compilar a aplicação (automática)

```
npm run package
```

#### Compilar a aplicação (manual)

```
npm run build
```

#### Testar a aplicação (depois `npm run build`)
```
npm run prod
```

### License | Licença

MIT © [Bar Aberto](https://github.com/baraberto).
