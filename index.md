- [JS Coding Challenge](#js-coding-challenge)
  - [01: "Drumkit"](#01-drumkit)
  - [15: Todo list (with local storage)](#15-todo-list-with-local-storage)
    - [Resources](#resources)

# JS Coding Challenge

Code for [Wesbos's 30 day JS challenge](https://javascript30.com). Done in a more leisurely and exploratory manner.

Visit code on [Github](https://github.com/cssherry/jschallenge)

## 01: ["Drumkit"](01-drumkit.html)

## 15: [Todo list](15-todolist.html) (with local storage)

The main highlight of this is the use of local storage so that the items on the todo list persist even after exiting the page.

Since this uses localStorage, tasks will not persis after hard refresh of the page

Event propagation is used so that event is added to the whole list rather than individual items.

The content of `::before` pseudo-element is used to create checkbox and reset icons

### Resources

- Different browser-storage: <https://medium.com/@lancelyao/browser-storage-local-storage-session-storage-cookie-indexeddb-and-websql-be6721ebe32a>
- Event propagation (capture vs bubble): <https://javascript.info/bubbling-and-capturing>
- Capture vs bubble history: <https://www.quirksmode.org/js/events_order.html> and <https://stackoverflow.com/a/4616720>
