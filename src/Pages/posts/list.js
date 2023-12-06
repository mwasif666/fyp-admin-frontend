import React, { useState } from "react";
import { useMany, useDeleteMany } from "@refinedev/core";
import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space, Button } from "antd";

const PostList = () => {
  const { tableProps } = useTable();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) || [];
  const { data, isLoading } = useMany({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { mutate, isLoading: deleteManyIsLoading } = useDeleteMany();

  const deleteSelectedItems = () => {
    mutate(
      {
        resource: "posts",
        ids: selectedRowKeys.map(String),
      },
      {
        onSuccess: () => {
          setSelectedRowKeys([]);
        },
      }
    );
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <List
      headerProps={{
        subTitle: (
          <>
            <Button
              type="primary"
              onClick={deleteSelectedItems}
              disabled={!hasSelected}
              loading={deleteManyIsLoading}
            >
              Delete Selected
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </>
        ),
      }}
    >
      <Table {...tableProps} rowSelection={rowSelection} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default PostList;
