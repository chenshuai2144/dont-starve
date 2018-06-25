import React from "react";
import { Table, Tag } from "antd";
import foods from "../data/foods.json";
import klei from "../data/klei.json";
import dishData from "../data/dish_data.json";
import Cooker from './Cooker';

const COIN_IMAGE = [
  'https://s3.amazonaws.com/kleiforums/GORGE/RecipeBook/images/quagmire_coin4.png',
  'https://s3.amazonaws.com/kleiforums/GORGE/RecipeBook/images/quagmire_coin3.png',
  'https://s3.amazonaws.com/kleiforums/GORGE/RecipeBook/images/quagmire_coin2.png',
  'https://s3.amazonaws.com/kleiforums/GORGE/RecipeBook/images/quagmire_coin1.png',
];

const kleiData = {};
klei.forEach(item => {
  kleiData[item.id] = item;
});

const toArr = list => {
  if (Array.isArray(list)) return list;
  return [list];
};

const foodList = foods.map(item => ({
  ...item,
  cookers: item.cooking,
  type: dishData[item.id].cravings || ['--NONE--'],

  officeData: dishData[item.id],
}));

console.log('>>>', foodList);

const typeList = new Set();
foodList.forEach(({ type }) => {
  type.forEach(t => {
    typeList.add(t);
  });
});

const cookerList = new Set();
foods.forEach(({ cooking }) => {
  toArr(cooking).forEach(c => {
    cookerList.add(c);
  });
});

const recipeList = new Set();
foods.forEach(({ thing }) => {
  const list = toArr(thing);
  list.forEach(recs => {
    Object.keys(recs).forEach(r => {
      recipeList.add(r);
    });
  });
});

const VAL_COLOR = ["#993399", "#e2434b", "#65c0ba", "#ffb400", "#030852"];
const VAL_NAMES = ["彩", "红", "银", "铜"];
const VAL_MONEY = [1000000, 10000, 100, 1];

const valueToMap = value => {
  const values = {};
  if (!value) return values;

  value.split(" ").forEach(val => {
    const match = val.match(/^(\d+)(.)$/);
    if (!match) {
      console.warn("价值数据不匹配:", value, "-", val);
      return;
    }

    values[match[2]] = Number(match[1]);
    if (!VAL_NAMES.includes(match[2])) {
      console.warn("价值类型不匹配:", value, "-", val);
    }
  });

  return values;
};

/* const renderValue = value => {
  const values = valueToMap(value);
  return (
    <div>
      {VAL_NAMES.map((c, index) => {
        return (
          <Tag
            key={VAL_COLOR[index]}
            color={VAL_COLOR[index]}
            style={{ width: 42, textAlign: 'center', opacity: !values[c] ? 0.2 : 1 }}
          >
            {values[c] || 0}
            {c}
          </Tag>
        );
      })}
    </div>
  );
}; */

const renderCoin = (type) => {
  return (_, { officeData }) => {
    const coinList = officeData[type].slice().reverse();
    return (
      <div>
        {coinList.map((val, index) => (
          <span
            style={{ display: 'inline-block', margin: '0 3px', opacity: !val ? 0.3 : 1 }}
            key={COIN_IMAGE[index]}
          >
            {val}
            <img
              style={{ width: 16, height: 16, verticalAlign: 'text-top' }}
              src={COIN_IMAGE[index]}
            />
          </span>
        ))}
      </div>
    );
  };
};

const toMoney = (coins) => {
  let total = 0;
  coins.forEach((value, index) => {
    total += value * Math.pow(100, index);
  });
  return total;
};

const sortCoin = (field) => {
  return (a, b) => {
    const va = toMoney(a.officeData[field]);
    const vb = toMoney(b.officeData[field]);
    return va - vb;
  };
};

/* const toMoney = value => {
  const values = valueToMap(value);
  let total = 0;
  Object.keys(values).forEach(key => {
    const index = VAL_NAMES.indexOf(key);
    const count = values[key];
    total += VAL_MONEY[index] * count;
  });

  return total;
};

const sortValue = field => {
  return (a, b) => {
    const va = toMoney(a[field]);
    const vb = toMoney(b[field]);
    return va - vb;
  };
}; */

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "right",
    render(id, record) {
      return record.displayId || id;
    },
  },
  {
    title: "食物",
    dataIndex: "name",
    key: "name",
    render(name, record) {
      const kitem = kleiData[record.id] || {};
      return (
        <div>
          <img
            alt={name}
            src={kitem.image}
            style={{
              width: 30,
              height: 30,
              marginRight: 3,
            }}
          />
          {name}
        </div>
      );
    },
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    render: list => (
      <div>{list.map(value => <Tag key={value}>{value}</Tag>)}</div>
    ),
    filters: Array.from(typeList)
      .sort()
      .map(type => ({
        text: type,
        value: type
      })),
    onFilter: (value, record) => record.type.includes(value)
  },
  /* {
    title: "价值",
    dataIndex: "money",
    key: "money",
    render: renderValue,
    sorter: sortValue("money")
  },
  {
    title: "银器价值",
    dataIndex: "dish",
    key: "dish",
    render: renderValue,
    sorter: sortValue("dish")
  }, */
  {
    title: "价值",
    dataIndex: "money",
    key: "money",
    render: renderCoin('coins'),
    sorter: sortCoin("coins")
  },
  {
    title: "银器价值",
    dataIndex: "dish",
    key: "dish",
    render: renderCoin('silver_coins'),
    sorter: sortCoin("silver_coins")
  },
  {
    title: "配方",
    dataIndex: "thing",
    key: "thing",
    render: recipe => {
      const reList = toArr(recipe);
      return (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            whiteSpace: "nowrap"
          }}
        >
          {reList.map((resc, index) => {
            return (
              <li
                key={index}
                style={{
                  margin: 5
                }}
              >
                {Object.keys(resc).map(key => {
                  const count = resc[key];

                  if (count < 0) {
                    return (
                      <Tag key={key} color="red">
                        不能有{key}
                      </Tag>
                    );
                  }

                  return (
                    <Tag key={key}>
                      {key}: {count}
                    </Tag>
                  );
                })}
              </li>
            );
          })}
        </ul>
      );
    },
    filters: Array.from(recipeList)
      .sort()
      .map(recipe => ({
        text: recipe,
        value: recipe
      })),
    onFilter: (value, record) => {
      let isHave = false;
      record.thing.forEach(thing => {
        if (!isHave) {
          isHave = thing[value] !== undefined;
        }
      });
      return isHave;
    }
  },
  {
    title: "炊具",
    dataIndex: "cooking",
    key: "cooking",
    render(cooker, { id }) {
      return (
        <div>
          {toArr(cooker).map(c => (
            <Tag key={c}>
              <Cooker {...kleiData[id]} cooker={c} />
              {c}
            </Tag>
          ))}
        </div>
      );
    },
    filters: Array.from(cookerList).map(cooker => ({
      text: cooker,
      value: cooker
    })),
    onFilter: (value, record) => record.cooking.indexOf(value) !== -1
  }
];

class Index extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          paddingTop: "60px"
        }}
      >
        <div
          style={{
            height: 56,
            background: "#000",
            padding: 8,
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 99999,
            boxShadow: "0 0 20px rgba(0,0,0,0.2)"
          }}
        >
          <div
            style={{
              float: "left"
            }}
          >
            <img
              height={40}
              style={{
                marginLeft: 20
              }}
              src="https://gw.alipayobjects.com/zos/rmsportal/CxTseSDhOivqhZeqTbyO.png"
              alt="logo"
            />
          </div>
          <h3
            style={{
              width: 400,
              color: "#fff",
              margin: 10,
              marginLeft: 120
            }}
          >
            饥荒 暴食 食谱速查表
          </h3>
        </div>
        <div
          style={{
            padding: 24
          }}
        >
          <Table
            size="small"
            rowKey="id"
            bordered={true}
            pagination={false}
            dataSource={foodList}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}

export default () => <Index />;
