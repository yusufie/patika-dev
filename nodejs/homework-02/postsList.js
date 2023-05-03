const allPosts = [
    {
      id: "1",
      title: "Javascript",
      body: "A programming language",
      date: "2023-05-03",
    },
    {
      id: "2",
      title: "Typescript",
      body: "Typed superset of Javascript",
      date: "2023-05-03",
    },
    {
      id: "3",
      title: "Nodejs",
      body: "A Javascript runtime built on Chrome's V8 JavaScript engine.",
      date: "2023-05-03",
    },
    {
      id: "4",
      title: "React",
      body: "A JavaScript library for building user interfaces.",
      date: "2023-05-03",
    },
  ];

const postsList = () => {
    allPosts.map((post) => console.log(post));
};

const addNewPost = () => {
    allPosts.push({
        id: "5",
        title: "Express",
        body: "A web application framework for Node.js",
        date: "2023-05-03",
    });
};

const showPosts = async () => {
    try {
        await addNewPost();
        postsList();
    }
    catch (error) {
        console.log(error);
    }
}

showPosts();