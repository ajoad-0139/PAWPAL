// userPostedAnimals.js

export const userPostedAnimals = {
  posts: [
    {
      _id: "post1",
      userId: "user123",
      animalType: "cat",
      breed: "Persian",
      name: "Whiskers",
      description: "Fluffy and playful kitten.",
      age: 0.4,
      sex: "female",
      vaccine: {
        sterilized: false,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: true
      },
      image: [
        "http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"
      ],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: true,
      adoptedBy: "user999",
      createdAt: "2025-04-01T10:00:00Z",
      updatedAt: "2025-04-01T10:00:00Z"
    },
    {
      _id: "post2",
      userId: "user123",
      animalType: "dog",
      breed: "Labrador",
      name: "Buddy",
      description: "Friendly dog who loves walks.",
      age: 1.2,
      sex: "male",
      vaccine: {
        sterilized: true,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: true
      },
      image: [
        "http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"
      ],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: false,
      adoptedBy: "Unknown",
      createdAt: "2025-03-01T09:00:00Z",
      updatedAt: "2025-03-01T09:00:00Z"
    },
    {
      _id: "post3",
      userId: "user123",
      animalType: "dog",
      breed: "Bulldog",
      name: "Tank",
      description: "Lazy but adorable.",
      age: 2,
      sex: "male",
      vaccine: {
        sterilized: true,
        fluVaccine: true,
        rabiesVaccine: false,
        dewormed: false
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: false,
      adoptedBy: "Unknown",
      createdAt: "2025-02-15T08:00:00Z",
      updatedAt: "2025-02-15T08:00:00Z"
    },
    {
      _id: "post4",
      userId: "user123",
      animalType: "rabbit",
      breed: "Angora",
      name: "Fluffy",
      description: "Small, soft, and sweet.",
      age: 0.6,
      sex: "female",
      vaccine: {
        sterilized: false,
        fluVaccine: false,
        rabiesVaccine: false,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: true,
      adoptedBy: "user777",
      createdAt: "2025-02-01T07:00:00Z",
      updatedAt: "2025-02-01T07:00:00Z"
    },
    {
      _id: "post5",
      userId: "user123",
      animalType: "cat",
      breed: "Siamese",
      name: "Mimi",
      description: "Talkative and curious.",
      age: 0.9,
      sex: "female",
      vaccine: {
        sterilized: false,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: false
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: false,
      adoptedBy: "Unknown",
      createdAt: "2025-01-20T06:00:00Z",
      updatedAt: "2025-01-20T06:00:00Z"
    },
    {
      _id: "post6",
      userId: "user123",
      animalType: "dog",
      breed: "Beagle",
      name: "Scout",
      description: "Energetic and food-driven.",
      age: 1.0,
      sex: "male",
      vaccine: {
        sterilized: false,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: true,
      adoptedBy: "user333",
      createdAt: "2025-01-05T05:00:00Z",
      updatedAt: "2025-01-05T05:00:00Z"
    },
    {
      _id: "post7",
      userId: "user123",
      animalType: "cat",
      breed: "Maine Coon",
      name: "Leo",
      description: "Large, fluffy, and chill.",
      age: 1.5,
      sex: "male",
      vaccine: {
        sterilized: true,
        fluVaccine: false,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: false,
      adoptedBy: "Unknown",
      createdAt: "2024-12-10T10:00:00Z",
      updatedAt: "2024-12-10T10:00:00Z"
    },
    {
      _id: "post8",
      userId: "user123",
      animalType: "dog",
      breed: "Pug",
      name: "Chubbs",
      description: "Snorts and snores a lot.",
      age: 2.5,
      sex: "male",
      vaccine: {
        sterilized: true,
        fluVaccine: false,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: true,
      adoptedBy: "user888",
      createdAt: "2024-12-01T09:00:00Z",
      updatedAt: "2024-12-01T09:00:00Z"
    },
    {
      _id: "post9",
      userId: "user123",
      animalType: "rabbit",
      breed: "Holland Lop",
      name: "Nibbles",
      description: "Loves carrots and cuddles.",
      age: 0.5,
      sex: "female",
      vaccine: {
        sterilized: false,
        fluVaccine: false,
        rabiesVaccine: false,
        dewormed: false
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: false,
      adoptedBy: "Unknown",
      createdAt: "2024-11-15T08:00:00Z",
      updatedAt: "2024-11-15T08:00:00Z"
    },
    {
      _id: "post10",
      userId: "user123",
      animalType: "cat",
      breed: "Bengal",
      name: "Zara",
      description: "Spotted coat, very active.",
      age: 1.0,
      sex: "female",
      vaccine: {
        sterilized: true,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1746958782/pawpal/k1ijzw7akhrrg8jzzrot.jpg"],
      address: {
        name: "Alice",
        city: "Dhaka",
        phone: "+8801122334455",
        email: "alice@example.com",
        location: "Banani, Dhaka"
      },
      isAdopted: false,
      adoptedBy: "Unknown",
      createdAt: "2024-11-01T07:00:00Z",
      updatedAt: "2024-11-01T07:00:00Z"
    }
  ]
};
