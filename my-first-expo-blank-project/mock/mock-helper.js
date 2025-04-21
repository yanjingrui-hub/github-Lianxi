// mock-helper.js
// import Mock from "mockjs";

let index = 0;
const types = [
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
];

export const generateProductType = () => {
  const result = types[index].name;
  index = (index + 1) % types.length;
  return result;
};

let nouns = [
  { id: 1, name: "项链", type: 2 },
  { id: 2, name: "手链", type: 2 },
  { id: 3, name: "耳环", type: 2 },
  { id: 4, name: "戒指", type: 2 },
  { id: 5, name: "胸针", type: 2 },
  { id: 6, name: "发饰", type: 2 },
  { id: 7, name: "手表", type: 2 },
  { id: 8, name: "太阳镜", type: 2 },

  { id: 9, name: "连衣裙", type: 3 },
  { id: 10, name: "半身裙", type: 3 },
  { id: 11, name: "休闲裤", type: 3 },
  { id: 12, name: "牛仔裤", type: 3 },
  { id: 13, name: "运动裤", type: 3 },
  { id: 14, name: "短裤", type: 3 },
  { id: 15, name: "长袖T恤", type: 3 },
  { id: 16, name: "短袖T恤", type: 3 },
  { id: 17, name: "衬衫", type: 3 },
  { id: 18, name: "西装", type: 3 },
  { id: 19, name: "裤子", type: 3 },
  { id: 20, name: "夹克", type: 3 },
  { id: 21, name: "外套", type: 3 },
  { id: 22, name: "T恤", type: 3 },
  { id: 23, name: "牛仔裤", type: 3 },
  { id: 24, name: "运动服", type: 3 },
  { id: 25, name: "高跟鞋", type: 3 },
  { id: 26, name: "运动鞋", type: 3 },
  { id: 27, name: "皮鞋", type: 3 },
  { id: 28, name: "靴子", type: 3 },
  { id: 29, name: "凉鞋", type: 3 },
  { id: 30, name: "拖鞋", type: 3 },
  { id: 31, name: "马丁靴", type: 3 },
  { id: 33, name: "运动衣", type: 3 },
  { id: 34, name: "运动鞋", type: 3 },
  { id: 35, name: "健身器材", type: 3 },
  { id: 36, name: "运动包", type: 3 },
  { id: 37, name: "护具", type: 3 },
  { id: 38, name: "泳装", type: 3 },
  { id: 39, name: "骑行装备", type: 3 },

  { id: 39, name: "手提包", type: 4 },
  { id: 40, name: "背包", type: 4 },
  { id: 41, name: "行李箱", type: 4 },
  { id: 42, name: "钱包", type: 4 },
  { id: 43, name: "公文包", type: 4 },
  { id: 44, name: "斜挎包", type: 4 },
  { id: 45, name: "双肩包", type: 4 },
  { id: 46, name: "手拿包", type: 4 },

  { id: 47, name: "文胸", type: 5 },
  { id: 48, name: "内裤", type: 5 },
  { id: 49, name: "睡衣", type: 5 },
  { id: 50, name: "保暖内衣", type: 5 },
  { id: 51, name: "泳衣", type: 5 },
  { id: 52, name: "家居服", type: 5 },
  { id: 53, name: "情趣内衣", type: 5 },
  { id: 54, name: "运动内衣", type: 5 },

  { id: 55, name: "项链", type: 6 },
  { id: 56, name: "手镯", type: 6 },
  { id: 57, name: "戒指", type: 6 },
  { id: 58, name: "耳环", type: 6 },
  { id: 59, name: "宝石", type: 6 },
  { id: 60, name: "玉石", type: 6 },

  { id: 61, name: "沙发", type: 8 },
  { id: 62, name: "床", type: 8 },
  { id: 63, name: "桌子", type: 8 },
  { id: 64, name: "椅子", type: 8 },
  { id: 65, name: "灯具", type: 8 },
  { id: 66, name: "窗帘", type: 8 },
  { id: 67, name: "地毯", type: 8 },
  { id: 68, name: "装饰品", type: 8 },
  { id: 69, name: "电视", type: 8 },
  { id: 70, name: "冰箱", type: 8 },
  { id: 71, name: "洗衣机", type: 8 },
  { id: 72, name: "空调", type: 8 },
  { id: 73, name: "微波炉", type: 8 },
  { id: 74, name: "烤箱", type: 8 },
  { id: 75, name: "洗碗机", type: 8 },

  { id: 76, name: "巧克力", type: 9 },
  { id: 77, name: "饼干", type: 9 },
  { id: 78, name: "糖果", type: 9 },
  { id: 79, name: "饮料", type: 9 },
  { id: 80, name: "零食", type: 9 },
  { id: 81, name: "咖啡", type: 9 },
  { id: 82, name: "茶", type: 9 },
  { id: 83, name: "保健品", type: 9 },

  { id: 84, name: "婴儿服装", type: 10 },
  { id: 85, name: "奶粉", type: 10 },
  { id: 86, name: "玩具", type: 10 },
  { id: 87, name: "婴儿车", type: 10 },
  { id: 88, name: "母婴用品", type: 10 },
  { id: 89, name: "儿童餐具", type: 10 },
  { id: 90, name: "婴儿床", type: 10 },
  { id: 91, name: "儿童图书", type: 10 },

  { id: 92, name: "化妆品", type: 11 },
  { id: 93, name: "护肤品", type: 11 },
  { id: 94, name: "香水", type: 11 },
  { id: 95, name: "美容工具", type: 11 },
  { id: 96, name: "美发产品", type: 11 },
  { id: 97, name: "防晒霜", type: 11 },
  { id: 98, name: "面膜", type: 11 },
  { id: 99, name: "洗护用品", type: 11 },

  { id: 100, name: "手机", type: 12 },
  { id: 101, name: "笔记本", type: 12 },
  { id: 102, name: "平板", type: 12 },
  { id: 103, name: "显示器", type: 12 },
  { id: 104, name: "键盘", type: 12 },
  { id: 105, name: "相机", type: 12 },
  { id: 106, name: "耳机", type: 12 },
  { id: 107, name: "智能手表", type: 12 },

  { id: 108, name: "游戏机", type: 13 },
  { id: 109, name: "游戏软件", type: 13 },
  { id: 110, name: "游戏配件", type: 13 },
  { id: 111, name: "游戏周边", type: 13 },
  { id: 112, name: "虚拟商品", type: 13 },
  { id: 113, name: "手柄", type: 13 },
  { id: 114, name: "游戏卡", type: 13 },
  { id: 115, name: "游戏桌", type: 13 },
];

// const adjectives = ["新款", "旗舰", "商务", "游戏", "便携"];

export const generateProductName = () => {
  const randomIndex = Math.floor(Math.random() * nouns.length);
  const product = nouns[randomIndex];
  // 根据商品的 type 找到对应的分类名称
  const category = types.find((t) => t.id === product.type);
  return {
    name: product.name,
    type: category ? category.name : "其他",
  };
};
