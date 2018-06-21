import React from "react";
import { Table, Button, Select } from "antd";
import data from "./data/data.json";

const columns = [
  {
    title: "食物(name)",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "钱(money)",
    dataIndex: "money",
    key: "money"
  },
  {
    title: "用银盘子",
    dataIndex: "dish",
    key: "dish"
  },
  {
    title: "类型（type）",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "锅（cooking）",
    dataIndex: "cooking",
    key: "cooking"
  },
  {
    title: "材料",
    dataIndex: "thing",
    key: "thing"
  }
];

const typeList = [
  "Snack",
  "Bread",
  "Veggie",
  "Soup",
  "Fish",
  "Meat",
  "Cheese",
  "Paste",
  "Dessert"
];
class Index extends React.PureComponent {
  state = {
    types: []
  };
  render() {
    const dataSource = data.filter(item => {
      if (!this.state.types || this.state.types.length < 1) {
        return true;
      }
      const itemType = item.type.split(",");
      let isHave = false;
      this.state.types.forEach(type => {
        if (!isHave) {
          isHave = itemType.includes(type);
        }
      });
      return isHave;
    });
    return (
      <div>
        <div
          style={{
            margin: 8
          }}
        >
          <Select
            mode="multiple"
            onChange={value =>
              this.setState({
                types: value
              })
            }
            style={{
              width: 200,
              marginRight: 8
            }}
          >
            {typeList.map(type => {
              return (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              );
            })}
          </Select>
          <Button>重置</Button>
        </div>
        <Table
          size="small"
          rowKey="name"
          bordered={true}
          pagination={false}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default () => <Index />;
