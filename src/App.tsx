import React, { useState, useMemo } from "react"
import ReactDiffViewer, { DiffMethod, ReactDiffViewerStylesOverride } from "react-diff-viewer"
import "./App.css"
import operationsFromSchema from "./utils/operations"
import { parse, buildSchema } from "graphql"
import { Space, Switch, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableRowSelection } from "antd/es/table/interface"

interface DataType {
  key: React.ReactNode
  name: string
  age: number
  address: string
  children?: DataType[]
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "12%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "30%",
    key: "address",
  },
]

const data: DataType[] = [
  {
    key: 1,
    name: "John Brown sr.",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        name: "John Brown",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
      {
        key: 12,
        name: "John Brown jr.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            name: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park",
          },
        ],
      },
      {
        key: 13,
        name: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            name: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                name: "Jim Green jr.",
                age: 25,
                address: "London No. 3 Lake Park",
              },
              {
                key: 1312,
                name: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  },
}

function App() {
  const [checkStrictly, setCheckStrictly] = useState(false)

  useMemo(async () => {
    // fetch("http://localhost:4000/graphql", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     query: `
    //   query Query {
    //       _schema
    //     }
    // `,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => parse(data.data._schema).loc?.source.body)
    //   .then((source) => {
    //     const schema = buildSchema(source as string, {
    //       noLocation: true,
    //     })

    //     const operationsDictionary = {
    //       query: { ...(schema.getQueryType()?.getFields() || {}) },
    //       mutation: { ...(schema.getMutationType()?.getFields() || {}) },
    //       subscription: { ...(schema.getSubscriptionType()?.getFields() || {}) },
    //     }

    //     // console.log(operationsDictionary, "99999999999")
    //   })
    //   .catch((error) => console.error(error))

    // getSchemaFromUrl("http://localhost:4000/graphql").then((res) => {
    //   const queryOperations = res.getQueryType()

    //   console.log(queryOperations?.getFields()["hello"].type)
    //   console.log({ ...(res.getQueryType()?.getFields() || {}) })
    // })
    // http://192.168.10.233:9406/graphql
    const res = await operationsFromSchema("http://localhost:4000/graphql")
    // console.log(res, "=+++++++++")
  }, [])

  const oldStr = `
  {
	pageStockAdjustment: {
		records: [
			{
				commoditySku: {
					commoditySkuId: null,
					commoditySkuName: null,
					commodityId: null,
					commodityName: null,
					conversion: null,
					totalType: {
						unitId: null,
						unitName: null
					},
					unitType: {
						unitId: null,
						unitName: null
					},
					categoryId: null,
					categoryName: null
				},
				unitType: {
					unitId: null,
					unitName: null
				},
				unitQuantity: null,
				totalType: {
					unitId: null,
					unitName: null
				},
				totalQuantity: null,
				createUser: {
					userId: null,
					userName: null,
					phoneNum: null
				},
				createTime: null,
				stockAdjustmentId: null,
				stockAdjustmentStatus: 'NONE'
			}
		],
		pageCurrent: null,
		pageSize: null,
		totalRecords: null
	}
}
  `
  const newStr = `
  {
	pageStockAdjustment: {
		records: [
			{
				commoditySku: {
					commoditySkuId: null,
					commoditySkuName: null,
					commodityId: null,
					commodityName: null,
					conversion: null,
					categoryId: null,
					categoryName: null
				},
				unitType: {
					unitId: null,
					unitName: null
				},
				unitQuantity: null,
				totalType: {
					unitId: null,
					unitName: null
				},
				totalQuantity: null,
				createUser: {
					userId: null,
					userName: null,
					phoneNum: null
				},
				createTime: null,
				stockAdjustmentId: null,
				stockAdjustmentStatus: 'NONE'
			}
		],
		pageCurrent: null,
		pageSize: null,
		totalRecords: null
	}
}
  `
  return (
    // <div className="App" style={{ width: "100%" }}>
    //   <ReactDiffViewer
    //     oldValue={oldStr}
    //     newValue={newStr}
    //     splitView={true}
    //     compareMethod={DiffMethod.SENTENCES}
    //     showDiffOnly={false}
    //     hideLineNumbers
    //     leftTitle="Old"
    //     rightTitle="New"
    //     renderContent={(codeStr) => {
    //       return <div style={{ fontFamily: "Consolas", fontSize: 14 }}>{codeStr}</div>
    //     }}
    //   />
    // </div>
    <Table columns={columns} rowSelection={{ ...rowSelection, checkStrictly }} dataSource={data} />
  )
}

export default App
