import { Button } from "antd";
import { FaRegEye } from "react-icons/fa";

const permissionIdKey: keyof IPermission = "id";
const permissionNameKey: keyof IPermission = "name";
const permissionDescriptionKey: keyof IPermission = "description";

interface TableColumnProps {
  handleClickSeeMore: (record: IPermission) => void;
}

export const tableColumnsAllPermissions = ({
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "NOMBRE DE PERMISO",
    key: permissionNameKey,
    dataIndex: permissionNameKey,
    width: 321,
    sorter: (a: IPermission, b: IPermission) => {
      return a[permissionNameKey].localeCompare(b[permissionNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "DESCRIPCIÓN DE PERMISO",
    key: permissionDescriptionKey,
    dataIndex: permissionDescriptionKey,
    width: 504,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ADMINISTRAR",
    key: permissionIdKey,
    dataIndex: permissionIdKey,
    width: 77,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: IPermission) => (
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
        size="middle"
        icon={<FaRegEye />}
        onClick={() => {
          handleClickSeeMore(record);
        }}
      />
    ),
  },
];
