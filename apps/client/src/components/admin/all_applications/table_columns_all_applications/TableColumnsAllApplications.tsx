import CustomSwitch from "@/components/common/custom_switch/CustomSwitch";
import { Button, Space } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

const applicationIdKey: keyof IApplication = "id";
const applicationNameKey: keyof IApplication = "name";
const applicationEntryLinkKey: keyof IApplication = "entry_link";
const applicationIsActiveKey: keyof IApplication = "is_active";

interface TableColumnProps {
  handleClickSeeMore: (record: IApplication) => void;
  handleOnChangeSwitch: (record: IApplication) => void;
  onClickSwitch: () => void;
  isLoadingSwitch: boolean;
}

export const tableColumnsAllApplications = ({
  handleClickSeeMore,
  handleOnChangeSwitch,
  onClickSwitch,
  isLoadingSwitch,
}: TableColumnProps) => [
  {
    title: "ID",
    key: applicationIdKey,
    dataIndex: applicationIdKey,
    width: 54,
    sorter: (a: IApplication, b: IApplication) => {
      return a[applicationIdKey] - b[applicationIdKey];
    },
    ellipsis: true,
  },
  {
    title: "NOMBRE",
    key: applicationNameKey,
    dataIndex: applicationNameKey,
    width: 222,
    sorter: (a: IApplication, b: IApplication) => {
      return a[applicationNameKey].localeCompare(b[applicationNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "LINK DE INGRESO",
    key: applicationEntryLinkKey,
    dataIndex: applicationEntryLinkKey,
    width: 321,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ADMINISTRAR",
    key: applicationIdKey,
    dataIndex: applicationIdKey,
    width: 123,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: IApplication) => (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Space direction="horizontal" size={"small"}>
          <Button
            style={{
              display: "flex",
              flexFlow: "row wrap",
              color: "#F7F7F7",
              backgroundColor: "#015E90",
              borderRadius: 22,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingInline: 13,
              paddingBlock: 13,
            }}
            size="small"
            icon={<FaRegEye />}
            onClick={() => {
              handleClickSeeMore(record);
            }}
          />

          <CustomSwitch
            checkedChildrenCustomSwitch={<FaRegCheckCircle />}
            unCheckedChildrenCustomSwitch={<FaBan />}
            onChangeCustomSwitch={() => {
              handleOnChangeSwitch(record);
            }}
            onClickCustomSwitch={onClickSwitch}
            isActiveCustomSwitch={record[applicationIsActiveKey]}
            isLoadingCustomSwitch={isLoadingSwitch}
          />
        </Space>
      </div>
    ),
  },
];
