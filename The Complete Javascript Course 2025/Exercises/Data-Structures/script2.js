'use strict';

const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

const [firstBook, secondBook] = books;
/*
const { title: firstTitle, author: firstAuthor } = firstBook;
const { title: secondTitle, author: secondAuthor } = secondBook;

// console.log(firstAuthor);
// console.log(secondAuthor);

const [, , thirdBook] = books;
// console.log(thirdBook);

const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];
const [[, rating], [, ratingsCount]] = ratings;
// console.log(rating);
// console.log(ratingsCount);

const ratingStars = [63405, 1808];
const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;

// console.log(fiveStarRatings, oneStarRatings, threeStarRatings);

const { title, author, ISBN } = firstBook;
// console.log(title, author, ISBN);

const { keywords: tags } = firstBook;
// console.log(tags);

const { programmingLanguage = 'unknown', language } = books[6];
// console.log(programmingLanguage, language);

let bookTitle = 'Unknown';
let bookAuthor = 'Unknown';

({ title: bookTitle, author: bookAuthor } = books[0]);

// console.log(bookTitle, bookAuthor);

// const { rating: bookRating } = firstBook.thirdParty.goodreads;
// console.log(bookRating);

const {
  thirdParty: {
    goodreads: { rating: bookRating },
  },
} = firstBook;
// console.log(bookRating);

function printBookInfo({ title, author, year = 'Unknown' }) {
  // console.log(`${title} by ${author} (${year})`);
}
printBookInfo({
  title: 'Algortihms',
  author: 'Robert Sedgewick and Kevin Wayne',
  year: 2011,
});
printBookInfo({
  title: 'Structure and Interpretation of Computer Programs',
  author: 'Harold Abelson and Gerald Jay Sussman',
  // year: 1996,
});

// Spread Operators
const bookAuthors = [...firstBook.author, ...secondBook.author];
// console.log(bookAuthors);

function spellWord(word) {
  const letetrs = [...word];
  // console.log(letetrs);
}

spellWord('JavaScript');

// Rest Pattern and Parameters
const [firstKeyword, ...restKeywords] = firstBook.keywords;
// console.log(firstKeyword, restKeywords);

const { publisher: bookPublisher, ...restBookInfo } = secondBook;
// console.log(bookPublisher, restBookInfo);

function printBookAuthorsCount(title, ...authors) {
  // console.log(`${title} has ${authors.length} authors.`);
}
printBookAuthorsCount('Algorithms', 'Robert Sedgewick', 'Kevin Wayne');

// Short-circuitinhg with && and ||
function hasExamplesInJava(book) {
  return book.programmingLanguage == 'Java' || 'No Data Available';
}
console.log(hasExamplesInJava(books[1]));

for (const book of books) {
  book.onlineContent &&
    console.log(`${book.title} has online content available.`);
}

// Nullish Coalescing Operator
console.log('%c\n--- Nullish Coalescing Operator ---', 'font-weight: bold;');
const deepWork = books.find(
  (book) =>
    book.title === 'Deep Work: Rules for Focused Success in a Distracted World',
);
console.log(deepWork.onlineContent);
books.title === 'Deep Work: Rules for Focused Success in a Distracted World';
for (const book of books) {
  book.onlineContent ??
    console.log(`${book.title} has no online content available.`);
}

console.log('%c\n--- Logical Assignment Operator ---', 'font-weight: bold;');
for (const book of books) {
  book.edition ??= 1;
  console.log(`${book.title} has edition ${book.edition}.`);
}

for (const book of books) {
  book.highlighted &&= !(book.thirdParty.goodreads.rating < 4.2);
  book.highlighted &&
    console.log(
      `${book.title} is highlighted: ${book.highlighted} and the rating is ${book.thirdParty.goodreads.rating}`,
    );
}

// const str = 'abcde';
// console.log(str.includes('a'));
// console.log(str.indexOf('e'));

// const arr = [1, 2, 3, 4, 5];
// console.log(arr.includes(3));
// console.log(arr.indexOf(7));

// for (const book of books) {
//   if (book.keywords.includes('programming')) {
//     console.log(`${book.title} is a programming book.`);
//   }
// }
console.log(
  '%c\n----Looping Arrays with for-of and forEach----',
  'font-weight: bold;',
);
let pageSum = 0;

for (const book of books) {
  pageSum += book.pages;
}
console.log(`Total pages: ${pageSum}`);

const pageSum2 = books.reduce((pageSum, book) => pageSum + book.pages, 0);
console.log(`Total pages (using reduce): ${pageSum2}`);

books.forEach((book) => {
  console.log(`${book.title} has ${book.pages} pages.`);
});

// ------ Method 1: Using for-of loop and checking type of author property ------
let allAuthors = [];
// books.forEach((book) => {allAuthors.push(...book.author)});
// console.log(allAuthors);
for (const book of books) {
  if (typeof book.author === 'string') {
    allAuthors.push(book.author);
  } else
    for (const author of book.author) {
      allAuthors.push(author);
    }
}
console.log(
  '----- Method 1: Using for-of loop and checking type of author property ------',
);
console.log(allAuthors);

// ------ Method 2: Using for-of loop and checking if author property is an array ------
allAuthors = [];
// books.forEach((book) => {allAuthors.push(...book.author)});
// console.log(allAuthors);
for (const book of books) {
  if (typeof book.author === 'string') {
    allAuthors.push(book.author);
  } else if (Array.isArray(book.author)) {
    allAuthors.push(...book.author);
  }
}
console.log(
  '----- Method 2: Using for-of loop and checking if author property is an array ------',
);
console.log(allAuthors);

// ---- Method 3: Using flatMap() method ------

const allAuthorsFlat = books.flatMap((book) => book.author);
console.log('----- Method 3: Using flatMap() method ------');
console.log(allAuthorsFlat);

for (const [index, author] of allAuthors.entries()) {
  console.log(`${index + 1}. ${author}`);
}

const arr = [[1, 2], [3, 4], 5];
const flattenedArr = arr.flat();
console.log(flattenedArr);

console.log('%c\n----Optional Chaining----', 'font-weight: bold;');

const bookData = [
  ['title', 'Computer Networking: A Top-Down Approach'],
  ['author', ['James F. Kurose', 'Keith W. Ross']],
  ['publisher', 'Addison Wesley'],
];

// Do the rest
const newBook = {
  [bookData[0][0]]: bookData[0][1],
  [bookData[1][0]]: bookData[1][1],
  [bookData[2][0]]: bookData[2][1],
};

const newBook2 = Object.fromEntries(bookData);

function getFirstKeyword(book) {
  return book.keywords?.[0];
}
console.log(getFirstKeyword(books[0]));
console.log(getFirstKeyword(newBook2));

console.log(
  '%c\n----Looping Objects: Object Keys, Values and Entries﻿----',
  'font-weight: bold;',
);
let entries = [];

const properties = Object.keys(firstBook.thirdParty.goodreads);
console.log(properties);

for (const property of properties) {
  entries.push([property]);
}
console.log(entries);

for (const [index, property] of Object.entries(
  firstBook.thirdParty.goodreads,
).entries()) {
  entries[index].push(property);
}
console.log(entries);

console.log(entries);

const entries3 = Object.entries(firstBook.thirdParty.goodreads);
console.log(entries3);

for (const [index, property] of Object.entries(
  firstBook.thirdParty.goodreads,
).entries()) {
  console.log(`${index + 1}: ${property}`);
}

console.log('%c\n--- Sets ---', 'font-weight: bold;');
const allKeywords = books.flatMap((book) => book.keywords);
console.log(allKeywords);

const uniqueKeywords = new Set(allKeywords);
uniqueKeywords.add('coding');
uniqueKeywords.add('science');
console.log(uniqueKeywords);

uniqueKeywords.delete('business');
console.log(uniqueKeywords);

const uniqueKeywordsArray = new Array(...uniqueKeywords);
console.log(uniqueKeywordsArray);

uniqueKeywords.clear();
console.log(uniqueKeywords);
*/
console.log('%c\n--- Maps ---', 'font-weight: bold;');

const bookMap = new Map([
  ['title', 'Clean Code'],
  ['author', 'Robert C. Martin'],
]);
console.log(bookMap);
bookMap.set('pages', 464);
console.log(`${bookMap.get('title')} by ${bookMap.get('author')}`);
console.log(bookMap.size);
console.log(bookMap.has('author') && 'Author exists in the map');
bookMap.has('author') && console.log('Author exists in the map');

console.log('%c\n--- Map Iteration ---', 'font-weight: bold;');
const firstBookMap = new Map(Object.entries(firstBook));
console.log(firstBookMap);

for (const [key, value] of firstBookMap) {
  typeof value === 'number' && console.log(`${key}: ${value}`);
}
