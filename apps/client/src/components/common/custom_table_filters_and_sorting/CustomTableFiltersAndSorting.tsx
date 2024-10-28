"use client";

import React, { useRef, useState } from "react";

import { Button, Space, Table, Row, Col, Skeleton, Empty, Input } from "antd";
import {
  ReloadOutlined,
  LoadingOutlined,
  SearchOutlined,
  FilterOutlined,
  CloseCircleOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

import type { CaseReportValidate } from "@/utils/interfaces/case_report_validate/caseReportValidate.interface";
import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  TableProps,
} from "antd";
import CustomButton from "../custom_button/CustomButton";
import { FaBroom, FaFilter, FaRegWindowClose, FaSearch } from "react-icons/fa";

type OnChange = NonNullable<TableProps<CaseReportValidate>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface ColumnConfig<T> {
  title: string;
  key: string;
  dataIndex: string;
  width: string | number;
  filters?: { text: string; value: React.Key }[];
  onFilter?: (value: boolean | React.Key, record: T) => boolean;
  sorter?: (a: T, b: T) => number;
  searchable?: boolean;
  //   searchableDate?: boolean;
  fixed?: boolean | "left" | "right";
}

const CustomTableFiltersAndSorting: React.FC<{
  dataCustomTable: any[];
  columnsCustomTable: ColumnConfig<any>[];
  onClickRechargeCustomTable: () => void;
  loading: boolean;
  customButtonNewRegister?: React.ReactNode;
}> = ({
  dataCustomTable,
  columnsCustomTable,
  onClickRechargeCustomTable,
  loading,
  customButtonNewRegister,
}) => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const [searchText, setSearchText] = useState("");
  //   const [searchDate, setSearchDate] = useState<Dayjs | null>(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setSearchText("");
  };

  const clearSorting = () => {
    setSortedInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    handleReset(clearFilters);
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <CustomButton
            classNameCustomButton="search-button"
            idCustomButton="search-button"
            titleCustomButton="Buscar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            iconCustomButton={<FaSearch />}
            onClickCustomButton={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            styleCustomButton={{
              width: 60,
              background: "#015E90",
              color: "#ffffff",
            }}
            iconPositionCustomButton={"start"}
            sizeCustomButton={"small"}
          />
          <CustomButton
            classNameCustomButton="clean-button"
            idCustomButton="clean-button"
            titleCustomButton="Limpiar"
            typeCustomButton="primary"
            htmlTypeCustomButton="reset"
            iconCustomButton={<FaBroom />}
            onClickCustomButton={() =>
              clearFilters && handleReset(clearFilters)
            }
            styleCustomButton={{
              width: 65,
              background: "#FD7E14",
              color: "#ffffff",
            }}
            iconPositionCustomButton={"start"}
            sizeCustomButton={"small"}
          />
          <CustomButton
            classNameCustomButton="filter-button"
            idCustomButton="filter-button"
            titleCustomButton="Filtrar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            iconCustomButton={<FaFilter />}
            onClickCustomButton={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
            styleCustomButton={{
              width: 65,
              background: "#1D8348",
              color: "#ffffff",
            }}
            iconPositionCustomButton={"start"}
            sizeCustomButton={"small"}
          />
          <CustomButton
            classNameCustomButton="close-button"
            idCustomButton="close-button"
            titleCustomButton="Cerrar"
            typeCustomButton="primary"
            htmlTypeCustomButton="button"
            iconCustomButton={<FaRegWindowClose />}
            onClickCustomButton={() => close()}
            styleCustomButton={{
              width: 65,
              background: "#8C1111",
              color: "#ffffff",
            }}
            iconPositionCustomButton={"start"}
            sizeCustomButton={"small"}
          />
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const recordValue = record[dataIndex];
      if (recordValue !== null && recordValue !== undefined) {
        return recordValue
          .toString()
          .toUpperCase()
          .includes((value as string).toUpperCase());
      }
      return false;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<any> = columnsCustomTable.map((col) => {
    const column = {
      ...col,
      filteredValue: filteredInfo[col.key] || null,
      sortOrder: sortedInfo.columnKey === col.key ? sortedInfo.order : null,
      ellipsis: true,
    };

    if (col.searchable) {
      Object.assign(column, getColumnSearchProps(col.dataIndex));
    }

    if (col.fixed) {
      column.fixed = col.fixed;
    }

    return column;
  });

  return (
    <>
      <Row justify="center">
        <Col span={24} style={{ maxWidth: "1000px", width: "100%" }}>
          <Row style={{ marginBottom: "16px" }}>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <CustomButton
                classNameCustomButton="recharge-button"
                idCustomButton="recharge-button"
                titleCustomButton="Recargar"
                typeCustomButton="primary"
                htmlTypeCustomButton="button"
                iconCustomButton={
                  !loading ? <ReloadOutlined /> : <LoadingOutlined />
                }
                onClickCustomButton={() => {
                  onClickRechargeCustomTable();
                }}
                styleCustomButton={{ background: "#002140", color: "#ffffff" }}
                iconPositionCustomButton="end"
                sizeCustomButton="middle"
                disabledCustomButton={loading}
              />
              <CustomButton
                classNameCustomButton="remove-filters-button"
                idCustomButton="remove-filters-button"
                titleCustomButton="Quitar filtros"
                typeCustomButton="primary"
                htmlTypeCustomButton="button"
                iconCustomButton={<FilterOutlined />}
                onClickCustomButton={() => {
                  clearFilters();
                }}
                styleCustomButton={{
                  marginLeft: "16px",
                  background: "#6C757D",
                  color: "#ffffff",
                }}
                iconPositionCustomButton="end"
                sizeCustomButton="middle"
              />
              <CustomButton
                classNameCustomButton="remove-order-button"
                idCustomButton="remove-order-button"
                titleCustomButton="Quitar orden"
                typeCustomButton="primary"
                htmlTypeCustomButton="button"
                iconCustomButton={<SortAscendingOutlined />}
                onClickCustomButton={() => {
                  clearSorting();
                }}
                styleCustomButton={{
                  marginLeft: "16px",
                  background: "#868E96",
                  color: "#ffffff",
                }}
                iconPositionCustomButton="end"
                sizeCustomButton="middle"
              />
              <CustomButton
                classNameCustomButton="clean-all-button"
                idCustomButton="clean-all-button"
                titleCustomButton="Limpiar todo"
                typeCustomButton="primary"
                htmlTypeCustomButton="button"
                iconCustomButton={<CloseCircleOutlined />}
                onClickCustomButton={() => {
                  clearAll();
                }}
                styleCustomButton={{
                  marginLeft: "16px",
                  background: "#FF7F50",
                  color: "#ffffff",
                }}
                iconPositionCustomButton="end"
                sizeCustomButton="middle"
              />
              {customButtonNewRegister}
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={dataCustomTable}
            onChange={handleChange}
            bordered
            rowKey={(record) => record.id}
            size={"small"}
            loading={loading}
            locale={{
              emptyText: loading ? (
                <Skeleton active />
              ) : (
                <Empty description="No hay nada para mostrar... " />
              ),
            }}
            pagination={{
              size: "small",
              position: ["bottomCenter"],
              showQuickJumper: true,
              style: {
                margin: "0px",
                paddingTop: "13px",
              },
              showTotal: (total) => `Total ${total} registros`,
              locale: {
                jump_to: "Ir a",
                page: "Página",
                items_per_page: "/ Página",
              },
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default CustomTableFiltersAndSorting;
