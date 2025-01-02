import CustomSwitch from "@/components/common/custom_switch/CustomSwitch";
import { Button, Space } from "antd";
import { FaRegEye } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";

const userIdKey: keyof User = "id";
const userNameKey: keyof User = "name";
const userLastNameKey: keyof User = "last_name";
const userPositionKey: keyof User = "collaborator_position";
const userRoleKey: keyof User = "user_role";
const userIdTypeKey: keyof User = "user_id_type";
const userIdNumberKey: keyof User = "id_number";
const userGenderKey: keyof User = "user_gender";
const userPrincipalEmailKey: keyof User = "principal_email";
const userIsActiveKey: keyof User = "is_active";

interface TableColumnProps {
  handleClickSeeMore: (record: User) => void;
  handleOnChangeSwitch: (record: User) => void;
  onClickSwitch: () => void;
  isLoadingSwitch: boolean;
  blockUserAction: boolean;
  collaboratorPositionsData: string[] | undefined;
  idTypesData: IdType[] | undefined;
  genderTypesData: GenderType[] | undefined;
}

const enumDataFilters = (enumData: Object) =>
  Object.values(enumData).map((value) => ({
    text: value,
    value,
  }));

export const tableColumnsAllUsers = ({
  handleClickSeeMore,
  handleOnChangeSwitch,
  onClickSwitch,
  isLoadingSwitch,
  blockUserAction,
  collaboratorPositionsData,
  idTypesData,
  genderTypesData,
}: TableColumnProps) => [
  {
    title: "NOMBRES",
    key: userNameKey,
    dataIndex: userNameKey,
    width: 207,
    sorter: (a: User, b: User) => {
      return a[userNameKey].localeCompare(b[userNameKey]);
    },
    ellipsis: true,
    searchable: true,
    fixed: "left" as "left",
  },
  {
    title: "APELLIDOS",
    key: userLastNameKey,
    dataIndex: userLastNameKey,
    width: 207,
    sorter: (a: User, b: User) => {
      return a[userLastNameKey].localeCompare(b[userLastNameKey]);
    },
    ellipsis: true,
    searchable: true,
  },
  {
    title: "CARGO",
    key: userPositionKey,
    dataIndex: userPositionKey,
    width: 321,
    filters:
      collaboratorPositionsData?.map((position) => ({
        value: position,
        text: position,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.collaborator_position) === String(value);
    },
    filterSearch: true,
    ellipsis: true,
    render: (position: string) => position,
  },
  {
    title: "ROLE(S) DE USUARIO",
    key: userRoleKey,
    dataIndex: userRoleKey,
    width: 270,
    ellipsis: true,
    filters: enumDataFilters(RolesEnum),
    onFilter: (value: any, record: any) => {
      return record[userRoleKey].includes(value);
    },
    render: (roles: string) => roles,
    filterSearch: true,
  },
  {
    title: "TIPO DE ID",
    key: userIdTypeKey,
    dataIndex: userIdTypeKey,
    width: 183,
    filters:
      idTypesData?.map((type) => ({
        value: type.name,
        text: type.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.user_id_type) === String(value);
    },
    filterSearch: true,
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "NÚMERO DE ID",
    key: userIdNumberKey,
    dataIndex: userIdNumberKey,
    width: 123,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "GÉNERO",
    key: userGenderKey,
    dataIndex: userGenderKey,
    width: 103,
    filters:
      genderTypesData?.map((type) => ({
        value: type.name,
        text: type.name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.user_gender) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "EMAIL PRINCIPAL",
    key: userPrincipalEmailKey,
    dataIndex: userPrincipalEmailKey,
    width: 270,
    ellipsis: true,
    searchable: true,
  },
  {
    title: "ACCIÓN",
    key: userIdKey,
    dataIndex: userIdKey,
    width: 103,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: User) => (
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
          {blockUserAction ? (
            <CustomSwitch
              checkedChildrenCustomSwitch={<FaRegCheckCircle />}
              unCheckedChildrenCustomSwitch={<FaBan />}
              onChangeCustomSwitch={() => {
                handleOnChangeSwitch(record);
              }}
              onClickCustomSwitch={onClickSwitch}
              isActiveCustomSwitch={record[userIsActiveKey]}
              isLoadingCustomSwitch={isLoadingSwitch}
            />
          ) : null}
        </Space>
      </div>
    ),
  },
];
