import booksRepository from "./BooksRepository";

export default class BooksPresenter {
  load = async (callback) => {
    await booksRepository.getBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name, author: bookPm.author };
      });
      callback(booksVm);
    });
  };
}
