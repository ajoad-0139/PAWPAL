export const getComments = async () => {
  return [
    {
      id: "1",
      body: "I absolutely loved this article! It provided a lot of insights I hadn't considered before.",
      userName: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Great post! I think the author made some compelling arguments regarding the current trends.",
      userName: "John",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:15:45.010+02:00",
    },
    {
      id: "3",
      body: "I agree with Jack—this article opened my eyes to several new ideas and really got me thinking.",
      userName: "Maria",
      userId: "3",
      parentId: "1",
      createdAt: "2021-08-16T23:30:12.010+02:00",
    },
    {
      id: "4",
      body: "While I enjoyed the read, I feel that some points could have been supported with additional research.",
      userName: "Luke",
      userId: "4",
      parentId: "2",
      createdAt: "2021-08-16T23:45:33.010+02:00",
    },
    {
      id: "5",
      body: "Interesting perspective, but I wonder how these ideas would apply in different contexts. Can anyone share more examples?",
      userName: "Sophie",
      userId: "5",
      parentId: null,
      createdAt: "2021-08-17T00:05:25.010+02:00",
    },
    {
      id: "6",
      body: "Sophie, that's a great point! I think some case studies from recent events could be really illustrative.",
      userName: "John",
      userId: "2",
      parentId: "5",
      createdAt: "2021-08-17T00:20:45.010+02:00",
    },
    {
      id: "7",
      body: "I found additional articles that complement this discussion perfectly. I'll share the links soon!",
      userName: "Emily",
      userId: "6",
      parentId: null,
      createdAt: "2021-08-17T00:35:10.010+02:00",
    },
    {
      id: "8",
      body: "Looking forward to those links, Emily. It's always great to see more resources on this topic.",
      userName: "Mark",
      userId: "7",
      parentId: "7",
      createdAt: "2021-08-17T00:50:05.010+02:00",
    },
  ];
};


export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    userName: "Jack",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};