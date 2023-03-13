import BooksPresenter from "./Books/BooksPresenter";
import Observable from "./Shared/Observable";
import booksRepository from "./Books/BooksRepository";

it("should load 3 viewmodel books when 3 books loaded from api", async () => {
  booksRepository.programmersModel = new Observable([]);
  let getStub = {
    success: true,
    result: [
      {
        id: 111,
        name: "Wind in the willows",
        ownerId: "pete@logicroom.co",
        author: "Kenneth Graeme"
      },
      {
        id: 121,
        name: "I, Robot",
        ownerId: "pete@logicroom.co",
        author: "Isaac Asimov"
      },
      {
        id: 131,
        name: "The Hobbit",
        ownerId: "pete@logicroom.co",
        author: "Jrr Tolkein"
      }
    ]
  };

  booksRepository.gateway.get = jest.fn().mockImplementation(() => {
    return Promise.resolve(getStub);
  });
  let viewModel = null;
  let booksPresenter = new BooksPresenter();
  await booksPresenter.load((result) => {
    viewModel = result;
  });

  expect(booksRepository.gateway.get).toHaveBeenCalledWith("/books");
  expect(viewModel.length).toBe(3);
  expect(viewModel[0].name).toBe("Wind in the willows");
  expect(viewModel[0].author).toBe("Kenneth Graeme");
  expect(viewModel[1].name).toBe("I, Robot");
  expect(viewModel[1].author).toBe("Isaac Asimov");
});
