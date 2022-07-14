# JS Coding Challenge

Code for [Wesbos's 30 day JS challenge](https://javascript30.com). Done in a more leisurely and exploratory manner.

Visit code on [Github](https://github.com/cssherry/jschallenge)

- [JS Coding Challenge](#js-coding-challenge)
  - [Setting up typescript + scss](#setting-up-typescript--scss)
  - [01: "Drumkit"](#01-drumkit)
    - [#01 TODOs](#01-todos)
      - [IMPROVEMENTS](#improvements)
      - [Stretch](#stretch)
  - [15: Todo list (with local storage)](#15-todo-list-with-local-storage)
    - [#15 TODOs](#15-todos)
    - [Resources](#resources)

## [Setting up typescript + scss](https://javascript.plainenglish.io/webpack-in-2021-typescript-jest-sass-eslint-7b4640842e27)

- Set up [new npm package](https://docs.npmjs.com/cli/v7/commands/npm-init): `npm init` (add `-y` if you want empty package.json)
- Install webpack:
  - `npm install webpack webpack-cli --save-dev`
  - Set up a `webpack.common.ts` (basic webpack config), `webpack.dev.ts`, and `webpack.prod.ts`
- Install webpack plugins:
  - `npm install clean-webpack-plugin fork-ts-checker-webpack-plugin html-webpack-plugin html-loader --save-dev`
  - `clean-webpack-plugin`: cleans output folder upon every build
  - `fork-ts-checker-webpack-plugin`: typescript build improvement
  - `html-webpack-plugin`: automatically creates html file with scripts + css files included
  - `html-loader`: supports including image/assets in html (as described [here](https://stackoverflow.com/questions/47126503/how-to-load-images-through-webpack-when-using-htmlwebpackplugin) and documented [here](https://webpack.js.org/loaders/html-loader/))
- Add typescript support
  - `npm install --save-dev typescript ts-loader`
  - Enable typescript in webpack config: `npm install --save-dev ts-node`
  - Add ts-loader to `webpack.common.ts`
  - Add eslint: `npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser @types/eslint --save-dev`
- Add SASS support
  - `npm install --save-dev sass-loader style-loader css-loader node-sass mini-css-extract-plugin`
  - Add `MiniCssExtractPlugin` to Webpack plugins and as a rule
  - scss files can be imported into the relevant index.ts file
- Add Jest testing
  - `npm install --save-dev jest ts-jest`
  - Install so typescript recognizes jest keywords: `npm install --save-dev @types/jest @types/node`
  - Add jest config by using `npx ts-jest config:init` (can also add to webpack config, but doesn't work with typescript)
  - Run with `npx jest` or `npm test`

## 01: ["Drumkit"](01-drumkit.html)

[Back up](#js-coding-challenge)

The highlight of this challenge was learning to use the

### #01 TODOs

- [ ] Svg Keyboard with highlight
- [ ] Plays on keypress
- [ ] Records and downloads
- [ ] Plays

#### IMPROVEMENTS

- [ ] Replays in repeat
- [ ] Multiple replays at once

#### Stretch

- [ ] Animation properly for recordings
- [ ] Different instruments
- [X] Typescript

## 15: [Todo list](15-todolist.html) (with local storage)

[Back up](#js-coding-challenge)

The main highlight of this is the use of local storage so that the items on the todo list persist even after exiting the page.

Since this uses localStorage, tasks will not persis after hard refresh of the page

Event propagation is used so that event is added to the whole list rather than individual items.

The content of `::before` pseudo-element is used to create checkbox and reset icons

### #15 TODOs

- [ ] Refactor for testing
- [ ] Add Tests

### Resources

- Different browser-storage: <https://medium.com/@lancelyao/browser-storage-local-storage-session-storage-cookie-indexeddb-and-websql-be6721ebe32a>
- Event propagation (capture vs bubble): <https://javascript.info/bubbling-and-capturing>
- Capture vs bubble history: <https://www.quirksmode.org/js/events_order.html> and <https://stackoverflow.com/a/4616720>
