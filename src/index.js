import React, { useState } from "react";
import ReactDOM from "react-dom";
import BooksPresenter from "./Books/BooksPresenter.js";

function App() {
  const booksPresenter = new BooksPresenter();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [vm, copyVmToComponentState] = useState([]);

  React.useEffect(() => {
    async function load() {
      await booksPresenter.load((viewModel) => {
        console.log(viewModel);
        copyVmToComponentState(viewModel);
      });
    }
    load();
  }, []);

  return (
    <>
      <h3>Books</h3>
      <div>
        {vm.map((book, i) => {
          return <div key={i}>{book.name}</div>;
        })}
        <h5>Add Book</h5>
        name : &nbsp;&nbsp; <input onKeyUp={(e) => setName(e.target.value)} />
        <br />
        author : <input onKeyUp={(e) => setAuthor(e.target.value)} />
        <br />
        <button
          onClick={() => {
            booksPresenter.addBook(name, author);
          }}
        >
          add book
        </button>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
