import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, DatePicker, Space } from "antd";
import styles from "./DetailPage.module.css";
import { Header, Footer, ProductIntro } from "../../components";
import { commentMockData } from "./mockup";
import { useSelector, useDispatch } from "react-redux";
import { productReducer, getProductDetail } from "../../redux/productReducer"

const { RangePicker } = DatePicker;

export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams();
  //const [loading, setLoading] = useState<boolean>(true);
  // const [product, setProduct] = useState<any>(null);
  //const [error, setError] = useState<string | null>(null);
  
  const loading = useSelector((state) => state.product.loading)
  const product = useSelector((state) => state.product.productList)
  const error = useSelector((state) => state.product.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductDetail(touristRouteId))
  }, []);
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }
  return (
    <>
      <Header />
      <div className={styles["page-content"]}>
        {/* 产品简介 与 日期选择 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.name}
                shortDescription={product.name}
                price={product.oldPrice}
                coupons={"coupon"}
                points={product.sales}
                discount={product.price}
                rating={100}
                pictures={product.imgUrl}
              />
            </Col>
            <Col span={11}>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <div className={styles["product-detail-anchor"]}></div>
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}></div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}></div>
        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}></div>
        {/* 商品评价*/}
        <div id="comments" className={styles["product-detail-container"]}></div>
      </div>
      <Footer />
    </>
  );
};
