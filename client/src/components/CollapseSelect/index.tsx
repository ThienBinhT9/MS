import React, { useEffect, useState } from "react";
import { EditTwoTone } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { Collapse, CollapseProps, Select } from "antd";

import "./CollapseSelect.scss";
import { useDebouce } from "../../hooks/useDebouce.ts";
import { updateUser } from "../../services/user-service.ts";
import { createAxios } from "../../configs/token.config.ts";
import { STATES } from "../../constants/common-constants.ts";
import { usePermission } from "../../hooks/usePermission.tsx";

import Modal from "../Modal/index.tsx";
import Button from "../Button/index.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";

interface Props extends CollapseProps {
  name: string;
  title: string;
  subTitle: string;
  search?: boolean;
  state?: "public" | "friend" | "private";
  fetchData?: (q: string | number) => Promise<any>;
  options?: Array<{ label: string; value: string | number }>;
}

function CollapseSelect(props: Props) {
  const {
    title,
    subTitle,
    name,
    state,
    fetchData,
    options,
    search = false,
    ...passProps
  } = props;

  const { token } = useSelector((state: RootState) => state.auth);

  const { isView } = usePermission("EditCollapse");

  const { control, handleSubmit } = useForm({
    defaultValues: { [name]: "" },
  });

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(state);
  const [showMore, setShowMore] = useState(false);
  const [_options, setOptions] = useState(options || []);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const dispatch = useDispatch();
  const queryDebouce = useDebouce(query, 1000);
  const axiosInstance = createAxios(token, dispatch);

  const handleUpdate = (value) => {
    if (!value[name] && status === state) return;
    const data = {
      ...value,
      privacy: { [name]: status },
    };
    updateUser(axiosInstance, data, token, dispatch);
  };

  useEffect(() => {
    if (search && queryDebouce && fetchData) {
      const fetch = async () => {
        const result = await fetchData(queryDebouce);
        setOptions(result);
      };
      fetch();
    }
  }, [queryDebouce, search]);

  return (
    <>
      <Collapse
        activeKey={showMore ? "1" : 9999}
        items={[
          {
            key: "1",
            label: (
              <div className="wrapper-collapse-title">
                <div>
                  <p className="collapse-title">{title}</p>
                  <p className="collapse-subtitle">{subTitle}</p>
                </div>
                {isView && (
                  <EditTwoTone
                    twoToneColor="#111"
                    onClick={() => setShowMore(!showMore)}
                  />
                )}
              </div>
            ),
            children: (
              <div className="wrapper-collapse-content">
                <Controller
                  name={name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      showSearch={search}
                      style={{ height: "max-content" }}
                      value={value}
                      className="collapse-content-input"
                      suffixIcon={null}
                      defaultActiveFirstOption={false}
                      options={_options?.map((option) => ({
                        value: option.value,
                        label: option.label,
                      }))}
                      onSearch={setQuery}
                      onChange={onChange}
                    />
                  )}
                />

                <div className="collapse-content-actions">
                  <div className="collapse-content-action-left">
                    <Button onClick={() => setShowRemoveModal(true)} danger>
                      Xóa
                    </Button>
                    <Select
                      style={{ width: 130, height: 36 }}
                      options={STATES}
                      value={status}
                      onChange={setStatus}
                    />
                  </div>
                  <div className="collapse-content-action-right">
                    <Button onClick={() => setShowMore(false)}>Hủy</Button>
                    <Button primary onClick={handleSubmit(handleUpdate)}>
                      Lưu
                    </Button>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        expandIcon={() => <></>}
        style={{
          backgroundColor: "#eaeaea",
        }}
        {...passProps}
      />
      {showRemoveModal && (
        <Modal
          open={showRemoveModal}
          title="Bạn chắc chứ"
          onCancel={() => setShowRemoveModal(false)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          Bạn có chắc chắn muốn gỡ{" "}
          <span style={{ fontWeight: 500 }}>"{subTitle}"</span> khỏi trang cá
          nhân của mình không?
        </Modal>
      )}
    </>
  );
}

export default CollapseSelect;
