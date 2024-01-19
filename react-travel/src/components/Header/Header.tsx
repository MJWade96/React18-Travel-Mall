import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import styles from "./Header.module.css";
import logo from "../../assets/react.svg"
import { Layout, Typography, Input, Button, Dropdown, Menu } from "antd";
import type { MenuProps } from 'antd';
import { GlobalOutlined } from "@ant-design/icons";

import rootStore from "../../redux/store"
import { useSelector, useDispatch } from "react-redux";
import { changeLanguageActionCreator, addLanguageActionCreator } from "../../redux/languageReducer"
import { userSlice } from "../../redux/userReducer";

import { jwtDecode, JwtPayload as DefaultJwtPayload } from "jwt-decode"
import { useTranslation } from "react-i18next";

const store = rootStore.store

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { t } = useTranslation();

    interface JwtPayload extends DefaultJwtPayload {
        username: string
    }
    const jwt = useSelector(state => state.user.token)
    const [username, updateUserName] = useState("")
    useEffect(() => {
        if (jwt) {
            const { name } = jwtDecode<JwtPayload>(jwt)
            updateUserName(name)
        }
    }, [jwt])


    const [currentLanguage, update] = useState(store.getState().language.currentLanguage);
    const [languageList, add] = useState(store.getState().language.languageList)

    useEffect(() => {
        store.subscribe(() => {
            update(store.getState().language.currentLanguage);
        });
        store.subscribe(() => {
            add(store.getState().language.languageList);
        });
    });

    const items: MenuProps['items'] = languageList.map(({ name, code }) => ({
        key: code,
        label: (name),
        onClick: ({ key }) => {
            store.dispatch(changeLanguageActionCreator(key))
        }
    })
    )
    items.push({
        key: "add",
        label: (<Menu.Item key={"new"}>添加新语言</Menu.Item>),
        onClick: () => {
            store.dispatch(addLanguageActionCreator("新语言", "new_lang"));
        }
    })

    const signOut = () => {
        dispatch(userSlice.actions.logOut())
        navigate("/")
    }

    return (
        <div className={styles['app-header']}>
            <div className={styles['top-header']}>
                <Typography.Text>让旅游更幸福</Typography.Text>
                <Dropdown.Button className={styles['language-selector']}
                    menu={{ items }}
                    icon={<GlobalOutlined />}
                >
                    {currentLanguage === "en" ? "English"
                        : currentLanguage == "zh" ? "中文"
                            : "新语言"}
                </Dropdown.Button>
                {jwt ? (<Button.Group className={styles["button-group"]}>
                    <span>
                        {t("header.welcome")}
                        <Typography.Text strong>{username}</Typography.Text>
                    </span>
                    <Button onClick={() => { navigate("/shoppingCart") }}>{t("header.shoppingCart")}</Button>
                    <Button onClick={signOut}>{t("header.signOut")}</Button>
                </Button.Group>
                ) : (<Button.Group className={styles["button-group"]}>
                    <Button onClick={() => navigate("/register")}>
                        {t("header.register")}
                    </Button>
                    <Button onClick={() => navigate("/signIn")}>
                        {t("header.signin")}
                    </Button>
                </Button.Group>
                )}
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => navigate(``)}>
                    <img src={logo} alt="logo" className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles.title}>
                        React旅游网
                    </Typography.Title>
                </span>
                <Input.Search
                    placeholder={"请输入旅游目的地、主题、或关键字"}
                    className={styles['search-input']}
                />
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles["main-menu"]}>
                <Menu.Item key={1}>旅游首页</Menu.Item>
                <Menu.Item key={2}>周末游</Menu.Item>
                <Menu.Item key={3}>跟团游</Menu.Item>
                <Menu.Item key="4"> 自由行 </Menu.Item>
                <Menu.Item key="5"> 私家团 </Menu.Item>
                <Menu.Item key="6"> 邮轮 </Menu.Item>
                <Menu.Item key="7"> 酒店+景点 </Menu.Item>
                <Menu.Item key="8"> 当地玩乐 </Menu.Item>
                <Menu.Item key="9"> 主题游 </Menu.Item>
                <Menu.Item key="10"> 定制游 </Menu.Item>
                <Menu.Item key="11"> 游学 </Menu.Item>
                <Menu.Item key="12"> 签证 </Menu.Item>
                <Menu.Item key="13"> 企业游 </Menu.Item>
                <Menu.Item key="14"> 高端游 </Menu.Item>
                <Menu.Item key="15"> 爱玩户外 </Menu.Item>
                <Menu.Item key="16"> 保险 </Menu.Item>
            </Menu>
        </div>
    )
}

