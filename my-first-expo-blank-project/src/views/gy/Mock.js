import Mock from "mockjs";
Mock.mock("/api/assign", "get", {
  code: 200,
  "data|5-10": [
    {
      "id|+1": 1,
      title: "@ctitle(5,10)",
      content: "@cparagraph(3,5)",
      img: "@image('200x100', '#50B347', '#FFF', 'Mock.js')",
    },
  ],
});
