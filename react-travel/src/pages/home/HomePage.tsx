import React, { useEffect, useState } from 'react';
import { Row, Col, Spin } from "antd";
import { useTranslation } from 'react-i18next';
import axios from "axios"

import { Footer, Header, SideMenu, Carousel, ProductCollection, Partners, MainLayout } from "../../components";
import styles from "./HomePage.module.css";
import sideImage1 from "../../assets/images/sider_2019_12-09.png"
import sideImage2 from "../../assets/images/sider_2019_02-04.png"
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png"

import { connect } from 'react-redux';
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions";

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productCollection: state.recommendProducts.productList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    giveMeData: () => {
      dispatch(giveMeDataActionCreator());
    }
  };
};

const OriginalHomePage: React.FC = ({ giveMeData, productCollection, loading, error }) => {
  const { t } = useTranslation();

  useEffect(() => {
    giveMeData()
  }, [])

  if (loading) {
    return (<Spin
      size="large"
      style={{
        marginTop: 200,
        marginBottom: 200,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
      }}
    />)
  }

  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <div className={styles.App}>
      <MainLayout>
        <Row className={styles.row}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection title={t("home_page.hot_recommended")} titleColor="orange" sideImage={sideImage1} products={productCollection[0].routes} />
        <ProductCollection title={t("home_page.new_arrival")} titleColor="#50bffb" sideImage={sideImage2} products={productCollection[1].routes} />
        <ProductCollection title={t("home_page.domestic_travel")} titleColor="#81ca97" sideImage={sideImage3} products={productCollection[2].routes} />
        <Partners></Partners>
      </MainLayout>
    </div>
  )
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(OriginalHomePage)