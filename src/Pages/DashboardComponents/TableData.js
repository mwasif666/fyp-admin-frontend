import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import "./TableData.css";

const EditableContext = React.createContext();
const data = [];

for (let i = 0; i < 3; i++) {
  data.push({
    key: i,
    priceTotal: 6722,
    totalWithDiscount: 3025,
    image: "https://placekitten.com/50/50",
  });
}

const projectColumns = [
  {
    title: `Recent Orders`,
    editable: true,
    children: [
      {
        title: `Product ID`,
        dataIndex: "priceTotal",
        editable: true,
      },
      {
        title: "Image",
        dataIndex: "image",
        render: (text) => (
          <img
            src={text}
            alt="User"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        ),
      },
      {
        title: `Product Name`,
        dataIndex: "totalWithDiscount",
        editable: true,
      },
      {
        title: `Price`,
        dataIndex: "priceTotal",
        editable: true,
      },
    ],
  },
];

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable && dataIndex !== "image") {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  } else if (editable && dataIndex === "image") {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        <img
          src={record[dataIndex]}
          alt="User"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      ...projectColumns, // My columns
      {
        title: "",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: data,
      count: data.length,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      priceTotal: `new`,
      totalWithDiscount: `new 2`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const mapColumns = (col) => {
      if (!col.editable) {
        return col;
      }
      const newCol = {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
      if (col.children) {
        newCol.children = col.children.map(mapColumns);
      }
      return newCol;
    };

    const columns = this.columns.map(mapColumns);

    return (
      <div className="py-5">
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
            background: "#008BF6",
          }}
        >
          Add a row
        </Button>
      </div>
    );
  }
}

export default TableData;
