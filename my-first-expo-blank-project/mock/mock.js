import Mock from "mockjs";

import { generateProductName } from "./mock-helper";

Mock.mock("/api/shopList", "get", {
  "data|80": [
    {
      "id|+1": 1,
      name: function () {
        const product = generateProductName();
        this.type = product.type;
        return product.name;
      },
      type: "@type",
      image: "https://picsum.photos/60",
    },
  ],
});

Mock.mock("/api/shopType", "get", {
  data: [
    { id: 1, name: "全部" },
    { id: 2, name: "配饰" },
    { id: 3, name: "服装" },
    { id: 4, name: "箱包" },
    { id: 5, name: "内衣" },
    { id: 6, name: "珠宝" },
    { id: 8, name: "家居" },
    { id: 9, name: "食品" },
    { id: 10, name: "母婴" },
    { id: 11, name: "美妆" },
    { id: 12, name: "数码" },
    { id: 13, name: "游戏" },
  ],
});
