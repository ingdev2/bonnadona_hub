"use client";

import React from "react";

import CustomTags from "../custom_tags/CustomTags";
import { IdType } from "@/utils/enums/id_type.enum";

export const getTagComponentIdTypes = (statusName: string | undefined) => {
  switch (statusName) {
    case IdType.IDENTITY_CARD:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#F4D03FB2",
            label: IdType.IDENTITY_CARD,
          }}
        />
      );
    case IdType.CITIZENSHIP_CARD:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#137A2BB2",
            label: IdType.CITIZENSHIP_CARD,
          }}
        />
      );
    case IdType.CIVIL_REGISTRATION:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#8C1111B2",
            label: IdType.CIVIL_REGISTRATION,
          }}
        />
      );
    case IdType.NIT:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#BA3400B2",
            label: IdType.NIT,
          }}
        />
      );
    case IdType.PASS:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#9960B0B2",
            label: IdType.PASS,
          }}
        />
      );
    case IdType.FOREIGNER_ID:
      return (
        <CustomTags
          tag={{
            textColor: "#070707",
            color: "#DDDDDDB2",
            label: IdType.FOREIGNER_ID,
          }}
        />
      );
    case IdType.PASSPORT:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#34495EB2",
            label: IdType.PASSPORT,
          }}
        />
      );
    case IdType.SPECIAL_RESIDENCE_PERMIT:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#8E44ADB2",
            label: IdType.SPECIAL_RESIDENCE_PERMIT,
          }}
        />
      );
    case IdType.TEMPORARY_PROTECTION_PERMIT:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: IdType.TEMPORARY_PROTECTION_PERMIT,
          }}
        />
      );
    case IdType.DIPLOMATIC_CARD:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: IdType.DIPLOMATIC_CARD,
          }}
        />
      );
    case IdType.NOT_APPLICABLE:
      return (
        <CustomTags
          tag={{
            textColor: "#F7F7F7",
            color: "#017DC0B2",
            label: IdType.NOT_APPLICABLE,
          }}
        />
      );
    default:
      return null;
  }
};
