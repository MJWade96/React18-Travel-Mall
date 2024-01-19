import React from "react";
import { Image, Divider, Typography, Row, Col } from "antd";
import styles from "./Partners.module.css"
import image1 from '../../assets/images/microsoft-80658_640.png';
import image2 from '../../assets/images/icon-720944_640.png';
import image3 from '../../assets/images/follow-826033_640.png';
import image4 from '../../assets/images/facebook-807588_640.png';

const companies = [
    { src: image1, title: "Microsoft" },
    { src: image2, title: "Youtube" },
    { src: image3, title: "Ins" },
    { src: image4, title: "Facebook" }
]

export const Partners: React.FC = () => {
    return (
        <>
            <Divider orientation="left">
                <Typography.Title level={3}>合作伙伴</Typography.Title>
            </Divider>
            <Row gutter={64}>
                {
                    companies.map(({ src }, index) => (
                        <Col span={6}>
                            <Image src={src} className={styles.image} />
                        </Col>
                    ))}
            </Row>
        </>
    )
}