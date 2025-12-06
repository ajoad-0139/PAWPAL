// userAdoptedAnimals.js

export const userAdoptedAnimals = {
  posts: [
    {
      _id: "adopt1",
      userId: "user456",
      animalType: "dog",
      breed: "Golden Retriever",
      name: "Sunny",
      description: "Loves playing fetch and getting belly rubs.",
      age: 1.3,
      sex: "male",
      vaccine: {
        sterilized: true,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-04-10T10:00:00Z",
      updatedAt: "2025-04-10T10:00:00Z"
    },
    {
      _id: "adopt2",
      userId: "user456",
      animalType: "cat",
      breed: "Siamese",
      name: "Cleo",
      description: "Elegant and affectionate lap cat.",
      age: 2.0,
      sex: "female",
      vaccine: {
        sterilized: false,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: false
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-04-05T09:30:00Z",
      updatedAt: "2025-04-05T09:30:00Z"
    },
    {
      _id: "adopt3",
      userId: "user456",
      animalType: "rabbit",
      breed: "Mini Rex",
      name: "Thumper",
      description: "Small bunny, loves cuddles and lettuce.",
      age: 0.8,
      sex: "male",
      vaccine: {
        sterilized: false,
        fluVaccine: false,
        rabiesVaccine: false,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-03-22T12:00:00Z",
      updatedAt: "2025-03-22T12:00:00Z"
    },
    {
      _id: "adopt4",
      userId: "user456",
      animalType: "dog",
      breed: "Beagle",
      name: "Tracker",
      description: "Nose to the ground all the time.",
      age: 1.1,
      sex: "male",
      vaccine: {
        sterilized: true,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-03-10T11:00:00Z",
      updatedAt: "2025-03-10T11:00:00Z"
    },
    {
      _id: "adopt5",
      userId: "user456",
      animalType: "cat",
      breed: "Ragdoll",
      name: "Luna",
      description: "Very calm, enjoys being held.",
      age: 1.4,
      sex: "female",
      vaccine: {
        sterilized: false,
        fluVaccine: false,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-03-01T08:45:00Z",
      updatedAt: "2025-03-01T08:45:00Z"
    },
    {
      _id: "adopt6",
      userId: "user456",
      animalType: "dog",
      breed: "German Shepherd",
      name: "Blaze",
      description: "Strong and loyal protector.",
      age: 2.2,
      sex: "male",
      vaccine: {
        sterilized: true,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-02-15T07:00:00Z",
      updatedAt: "2025-02-15T07:00:00Z"
    },
    {
      _id: "adopt7",
      userId: "user456",
      animalType: "rabbit",
      breed: "Lionhead",
      name: "Cinnamon",
      description: "Fluffy mane, shy but curious.",
      age: 0.9,
      sex: "female",
      vaccine: {
        sterilized: false,
        fluVaccine: false,
        rabiesVaccine: false,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-02-01T06:00:00Z",
      updatedAt: "2025-02-01T06:00:00Z"
    },
    {
      _id: "adopt8",
      userId: "user456",
      animalType: "cat",
      breed: "Bengal",
      name: "Hunter",
      description: "Very energetic and agile.",
      age: 1.0,
      sex: "male",
      vaccine: {
        sterilized: false,
        fluVaccine: true,
        rabiesVaccine: false,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-01-20T05:00:00Z",
      updatedAt: "2025-01-20T05:00:00Z"
    },
    {
      _id: "adopt9",
      userId: "user456",
      animalType: "dog",
      breed: "Dachshund",
      name: "Wiener",
      description: "Short legs, big personality.",
      age: 1.7,
      sex: "male",
      vaccine: {
        sterilized: true,
        fluVaccine: true,
        rabiesVaccine: true,
        dewormed: true
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2025-01-10T04:00:00Z",
      updatedAt: "2025-01-10T04:00:00Z"
    },
    {
      _id: "adopt10",
      userId: "user456",
      animalType: "cat",
      breed: "Scottish Fold",
      name: "Mochi",
      description: "Round face, folded ears, very sweet.",
      age: 1.2,
      sex: "female",
      vaccine: {
        sterilized: true,
        fluVaccine: false,
        rabiesVaccine: true,
        dewormed: false
      },
      image: ["http://res.cloudinary.com/do3avtsuj/image/upload/v1747097055/pawpal/zcuzsi3qt5zutynwkw1a.jpg"],
      address: {
        name: "Bob",
        city: "Sylhet",
        phone: "+8809988776655",
        email: "bob@example.com",
        location: "Zindabazar, Sylhet"
      },
      isAdopted: true,
      adoptedBy: "user123",
      createdAt: "2024-12-25T03:00:00Z",
      updatedAt: "2024-12-25T03:00:00Z"
    }
  ]
};
