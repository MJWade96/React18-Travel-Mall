import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Image } from 'antd';

interface PropsType {
    id: number | string,
    src: string,
    size: "large" | "small",
    title: string,
    price: number | string
}

export const ProductImage: React.FC<PropsType> = ({id, src, size, title, price}) => {
    return (
        <Link to={`detail/${id}`}>
        {size=="large" ? (
          <Image src={src} height='2.85rem' width='4.7rem' />
        ) : (
          <Image src={src} height='1.2rem' width='2.3rem' />
        )}
        <div>
          <Typography.Text type="secondary">
            {title.slice(0, 25)}
          </Typography.Text>
          <Typography.Text type="danger" strong>
            ¥ {price} 起
          </Typography.Text>
        </div>
        </Link>
    )
}