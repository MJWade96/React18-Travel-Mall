import React from 'react';
import styles from "./ProductCollection.module.css";
import { ProductImage } from "./ProductImage";
import { Typography, Divider, Image, Row, Col } from 'antd';

interface PropsType {
    title: string;
    titleColor: string;
    sideImage: string;
    products: any[];
}

export const ProductCollection: React.FC<PropsType> = ({ title, titleColor, sideImage, products }) => {
    return (
        <div className={styles.content}>
            <Divider orientation='left'>
                <Typography.Title level={3} style={{ color: titleColor }}>
                    {title}
                </Typography.Title>
            </Divider>
            <Row gutter={16}>
                <Col span={4}>
                    <Image src={sideImage} className={styles['side-image']} alt=""></Image>
                </Col>
                <Col span={20}>
                    <Row>
                        <Col span={12}>
                            <ProductImage id={products[0].id} title={products[0].title} src={products[0].touristRoutePictures[0].url} size="large" price={products[0].price} />
                        </Col>
                        <Col span={12}>
                            <Row>
                                {products.slice(1, 3).map((item) => (
                                    <Col span={12}>
                                        <ProductImage id={item.id} title={item.title} src={item.touristRoutePictures[0].url} size="small" price={item.price} />
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                {products.slice(3, 5).map((item) => (
                                    <Col span={12}>
                                        <ProductImage id={item.id} title={item.title} src={item.touristRoutePictures[0].url} size="small" price={item.price} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        {products.slice(5, 10).map((item) => (
                            <Col span={6}>
                                <ProductImage id={item.id} title={item.title} src={item.touristRoutePictures[0].url} size="small" price={item.price} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}