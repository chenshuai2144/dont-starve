import React from "react";
import { Table, Tag } from "antd";
import foods from "../data/foods.json";

const toArr = list => {
  if (Array.isArray(list)) return list;
  return [list];
};

const typeList = new Set();
foods.forEach(({ type }) => {
  type.split(",").forEach(t => {
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

const foodList = foods.map(item => ({
  ...item,
  type: item.type.split(","),
  cookers: item.cooking
}));

const VAL_COLOR = ["#f5222d", "#ad4e00", "#1890ff", "#391085", "#030852"];

const renderValue = value => {
  return (
    <div>
      {value.split(" ").map((c, index) => {
        return (
          <Tag key={VAL_COLOR[index]} color={VAL_COLOR[index]}>
            {c}
          </Tag>
        );
      })}
    </div>
  );
};

const sortValue = field => {
  return (a, b) => {
    const va = Number(a[field]);
    const vb = Number(b[field]);
    return va - vb;
  };
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "食物",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    render: list => (
      <div>{list.map(value => <Tag key={value}>{value}</Tag>)}</div>
    ),
    filters: Array.from(typeList).map(type => ({
      text: type,
      value: type
    })),
    onFilter: (value, record) => record.type.includes(value)
  },
  {
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
                {Object.keys(resc).map(key => (
                  <Tag key={key}>
                    {key}: {resc[key]}
                  </Tag>
                ))}
              </li>
            );
          })}
        </ul>
      );
    },
    filters: Array.from(recipeList).map(recipe => ({
      text: recipe,
      value: recipe
    })),
    onFilter: (value, record) => record.recipe[value] !== undefined
  },
  {
    title: "炊具",
    dataIndex: "cooking",
    key: "cooking",
    filters: Array.from(cookerList).map(cooker => ({
      text: cooker,
      value: cooker
    })),
    onFilter: (value, record) => record.cookers.indexOf(value) !== -1
  }
];

class Index extends React.PureComponent {
  render() {
    return (
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
    );
  }
}

export default () => <Index />;
