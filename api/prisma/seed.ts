
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create genres
  const genres = [
    {
      name: "Fiction",
      description: "Stories based on imaginary events and characters.",
    },
    {
      name: "Fantasy",
      description: "Stories involving magic and imaginary worlds.",
    },
    {
      name: "Science",
      description: "Books exploring science and the natural world.",
    },
    {
      name: "History",
      description: "Books about historical events and people.",
    },
    {
      name: "Technology",
      description: "Books about programming and technology.",
    },
  ];

  const genreIds = new Map<string, number>();

  for (const genre of genres) {
    const result = await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });

    genreIds.set(result.name, result.id);
  }

  console.log("Genres created or verified.");

  // Create books
  const books = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publishedYear: 1960,
      genre: "Fiction",
    },
    {
      title: "1984",
      author: "George Orwell",
      publishedYear: 1949,
      genre: "Fiction",
    },
    {
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      publishedYear: 2003,
      genre: "Fiction",
    },
    {
      title: "Things Fall Apart",
      author: "Chinua Achebe",
      publishedYear: 1958,
      genre: "Fiction",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publishedYear: 1937,
      genre: "Fantasy",
    },
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publishedYear: 1997,
      genre: "Fantasy",
    },
    {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      publishedYear: 2007,
      genre: "Fantasy",
    },
    {
      title: "The Lion, the Witch and the Wardrobe",
      author: "C.S. Lewis",
      publishedYear: 1950,
      genre: "Fantasy",
    },
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      publishedYear: 1988,
      genre: "Science",
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      publishedYear: 1980,
      genre: "Science",
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      publishedYear: 1976,
      genre: "Science",
    },
    {
      title: "Silent Spring",
      author: "Rachel Carson",
      publishedYear: 1962,
      genre: "Science",
    },
    {
      title: "Guns, Germs, and Steel",
      author: "Jared Diamond",
      publishedYear: 1997,
      genre: "History",
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      publishedYear: 1947,
      genre: "History",
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      publishedYear: 2011,
      genre: "History",
    },
    {
      title: "Long Walk to Freedom",
      author: "Nelson Mandela",
      publishedYear: 1994,
      genre: "History",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      publishedYear: 2008,
      genre: "Technology",
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt and David Thomas",
      publishedYear: 1999,
      genre: "Technology",
    },
    {
      title: "Code Complete",
      author: "Steve McConnell",
      publishedYear: 1993,
      genre: "Technology",
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      publishedYear: 2017,
      genre: "Technology",
    },
  ];

  let booksCreated = 0;

  for (const book of books) {
    const genreId = genreIds.get(book.genre);

    if (genreId === undefined) {
      throw new Error(`Genre not found: ${book.genre}`);
    }

    const existingBook = await prisma.book.findFirst({
      where: {
        title: book.title,
        author: book.author,
      },
    });

    if (!existingBook) {
      await prisma.book.create({
        data: {
          title: book.title,
          author: book.author,
          publishedYear: book.publishedYear,
          genreId,
        },
      });

      booksCreated++;
    }
  }

  console.log(`Genres: ${genres.length}`);
  console.log(`Books added: ${booksCreated}`);
  console.log("Database seeding completed!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
