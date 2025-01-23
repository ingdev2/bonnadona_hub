"use client";

import { Card } from "antd";
import React from "react";

const CustomOptionWithImageCard: React.FC<{
  srcCustomOptionWithImageCard: string | undefined;
  altCustomOptionWithImageCard: string | undefined;
  classNameCardCustomOptionWithImageCard: string | undefined;
  styleImgCustomOptionWithImageCard: React.CSSProperties | undefined;
  entryLinkUrlCustomOptionWithImageCard: string;
  onClickCustomOptionWithImageCard?: () => void;
}> = ({
  srcCustomOptionWithImageCard,
  altCustomOptionWithImageCard,
  classNameCardCustomOptionWithImageCard,
  styleImgCustomOptionWithImageCard,
  entryLinkUrlCustomOptionWithImageCard,
  onClickCustomOptionWithImageCard,
}) => {
  return (
    <a
      href={entryLinkUrlCustomOptionWithImageCard}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClickCustomOptionWithImageCard}
    >
      <Card
        className={classNameCardCustomOptionWithImageCard}
        style={{ display: "flex" }}
      >
        <img
          src={srcCustomOptionWithImageCard}
          alt={altCustomOptionWithImageCard}
          style={styleImgCustomOptionWithImageCard}
          loading="lazy"
        />
      </Card>
    </a>
  );
};

export default CustomOptionWithImageCard;
