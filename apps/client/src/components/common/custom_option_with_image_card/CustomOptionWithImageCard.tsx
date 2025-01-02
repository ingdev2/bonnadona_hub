"use client";

import { Card } from "antd";
import React from "react";

const CustomOptionWithImageCard: React.FC<{
  srcCustomOptionWithImageCard: string | undefined;
  altCustomOptionWithImageCard: string | undefined;
  classNameCardCustomOptionWithImageCard: string | undefined;
  styleImgCustomOptionWithImageCard: React.CSSProperties | undefined;
  entryLinkUrlCustomOptionWithImageCard: string;
}> = ({
  srcCustomOptionWithImageCard,
  altCustomOptionWithImageCard,
  classNameCardCustomOptionWithImageCard,
  styleImgCustomOptionWithImageCard,
  entryLinkUrlCustomOptionWithImageCard,
}) => {
  return (
    <a
      href={entryLinkUrlCustomOptionWithImageCard}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card
        className={classNameCardCustomOptionWithImageCard}
        style={{ display: "flex" }}
      >
        <img
          src={srcCustomOptionWithImageCard}
          alt={altCustomOptionWithImageCard}
          style={styleImgCustomOptionWithImageCard}
        />
      </Card>
    </a>
  );
};

export default CustomOptionWithImageCard;
