import { useState } from "react";
import VirtualList from "react-virtual-drag-list";

export function SortVirtualList() {
  const [list, setList] = useState([
    { id: "1", text: "a" },
    { id: "2", text: "b" },
  ]);

  const onDrop = (event) => {
    // dnd complete
    setList(() => event.list);
  };

  // use style and className as jsx used
  return (
    <VirtualList
      className="virtual-list"
      style={{ height: "500px" }}
      dataKey="id"
      dataSource={list}
      handle=".handle"
      header={<div className="loading">top loading...</div>}
      footer={<div className="loading">bottom loading...</div>}
      onDrop={onDrop}
    >
      {(record, index, dataKey) => {
        return (
          <div>
            <span className=".handle">{index}</span>
            {record.text}
          </div>
        );
      }}
    </VirtualList>
  );
}
