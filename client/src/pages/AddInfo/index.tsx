import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import "./AddInfo.scss";
import {
  TEXT_MAX,
  TEXT_REQUIRED_INPUT,
} from "../../constants/validate-constants.ts";

import PersonalInfo from "./components/PersonalInfo.tsx";
import ContactInfo from "./components/ContactInfo.tsx";
import Hobbies from "./components/Hobbies.tsx";

function AddInfo() {
  const schemaForm = Yup.object().shape({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: null,
      bio: "",
      homeTown: "",
      phone: "",
      link: "",
      hobbies: [],
    },
    resolver: yupResolver(schemaForm),
  });

  const [currentInfo, setCurrentInfo] = useState<String>("personal");

  const handleSetCurrentInfo = useCallback(
    (value: string) => {
      setCurrentInfo(value);
    },
    [setCurrentInfo]
  );

  return (
    <div className="wrapper-add-info">
      <div className="add-info-inner">
        <div className="add-info-content">
          {currentInfo === "personal" && (
            <PersonalInfo setCurrentInfo={handleSetCurrentInfo} />
          )}
          {currentInfo === "contact" && (
            <ContactInfo setCurrentInfo={handleSetCurrentInfo} />
          )}
          {currentInfo === "hobbies" && (
            <Hobbies setCurrentInfo={handleSetCurrentInfo} />
          )}
        </div>
      </div>
    </div>
  );
}
export default AddInfo;
