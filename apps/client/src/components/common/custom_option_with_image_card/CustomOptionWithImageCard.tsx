import { Card } from "antd";
import React from "react";

const CustomOptionWithImageCard: React.FC<{
  srcCustomOptionWithImageCard: string | undefined;
  altCustomOptionWithImageCard: string | undefined;
  classNameCardCustomOptionWithImageCard: string | undefined;
  styleImgCustomOptionWithImageCard: React.CSSProperties | undefined;
}> = ({
  srcCustomOptionWithImageCard,
  altCustomOptionWithImageCard,
  classNameCardCustomOptionWithImageCard,
  styleImgCustomOptionWithImageCard,
}) => {
  return (
    <Card className={classNameCardCustomOptionWithImageCard}>
      <img
        src={srcCustomOptionWithImageCard}
        alt={altCustomOptionWithImageCard}
        style={styleImgCustomOptionWithImageCard}
      />
    </Card>
  );
};

export default CustomOptionWithImageCard;
