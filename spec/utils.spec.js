const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns a new array when given an empty array", () => {
    const input = [];
    const expected = [];
    const actual = formatDates(input);
    expect(actual).to.deep.eql(expected);
  });
  it("returns a new array with a single object with formatted dates", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];

    const actual = formatDates(input);

    expect(actual[0].created_at instanceof Date).to.deep.eql(true);
    expect(actual[0].created_at.toString()).to.equal(
      new Date(1542284514171).toString()
    );
  });
  it("returns a new array with multiple objects with formatted dates", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const actual = formatDates(input);

    expect(actual[0].created_at.toString()).to.equal(
      new Date(1542284514171).toString()
    );
    expect(actual[1].created_at.toString()).to.equal(
      new Date(1416140514171).toString()
    );
    expect(actual[2].created_at.toString()).to.equal(
      new Date(1289996514171).toString()
    );
  });
  it("returns a new array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];

    const actual = formatDates(input);

    expect(actual).not.to.equal(input);
  });
  it("does not mutate original array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];

    formatDates(input);
    expect(input).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ]);
  });
});

describe("makeRefObj", () => {
  it("returns an object object if passed an empty array", () => {
    expect(makeRefObj([])).to.deep.eql({});
  });
  it("returns a single object within an array as a reference to its title and id", () => {
    const input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const expected = { "Living in the shadow of a great man": 1 };
    const actual = makeRefObj(input);

    expect(actual).to.deep.equal(expected);
  });
  it("returns a single object with multiple reference key value pairs", () => {
    const input = [
      {
        article_id: "1",
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        article_id: "2",
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        article_id: "3",
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    expected = {
      "Living in the shadow of a great man": 1,
      "Sony Vaio; or, The Laptop": 2,
      "Eight pug gifs that remind me of mitch": 3
    };
    const actual = makeRefObj(input);
    expect(actual).to.deep.equal(expected);
  });
});

describe("formatComments", () => {
  it("returns an empty array if given an empty array", () => {
    const input = [];
    const expected = [];

    const actual = formatComments(input);
    expect(actual).to.deep.eql(expected);
  });
  it("returns one formatted comment object within an array", () => {
    const obj = [
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: 1416746163389
      }
    ];
    const ref = { "Living in the shadow of a great man": 1 };

    const actual = formatComments(obj, ref);

    expect(actual[0]).to.contain.keys(
      "article_id",
      "author",
      "body",
      "votes",
      "created_at"
    );
    expect(actual[0].created_at.toString()).to.equal(
      new Date(1416746163389).toString()
    );
  });
  it("returns multiple formatted comments within an array", () => {
    const obj = [
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389
      },
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: 1416746163389
      },
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "icellusedkars",
        votes: 16,
        created_at: 1101386163389
      }
    ];

    const ref = {
      "Living in the shadow of a great man": 1,
      "UNCOVERED: catspiracy to bring down democracy": 2
    };
    const actual = formatComments(obj, ref);
    expect(actual[0]).to.contain.keys(
      "article_id",
      "author",
      "body",
      "votes",
      "created_at"
    );
    expect(actual[1]).to.contain.keys(
      "article_id",
      "author",
      "body",
      "votes",
      "created_at"
    );
    expect(actual[0].created_at.toString()).to.equal(
      new Date(1448282163389).toString()
    );
    expect(actual[1].created_at.toString()).to.equal(
      new Date(1416746163389).toString()
    );
  });
  it("original comments has not been mutated", () => {
    const input = [
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: 1416746163389
      }
    ];
    ref = { "Living in the shadow of a great man": 1 };
    formatComments(input);
    expect(input).to.eql([
      {
        body: " I carry a log — yes. Is it funny to you? It is not to me.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: -100,
        created_at: 1416746163389
      }
    ]);
  });
});
