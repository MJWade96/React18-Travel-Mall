import React from "react";
import { Menu } from "antd";
import styles from "./SideMenu.module.css"
import { sideMenuList } from "./mockup.ts"
import { GifOutlined } from "@ant-design/icons";

export const SideMenu: React.FC = () => {
    return (
        <Menu mode="vertical" className={styles['side-menu']}>
            {sideMenuList.map((menu, index) => (
                <Menu.SubMenu
                    key={`side-menu-${index}`}
                    title={<span><GifOutlined />{menu.title}</span>}
                >
                    {menu.subMenu.map((submenu, index) => (
                        <Menu.SubMenu
                            key={`sub-menu-${index}`}
                            title={
                                <span>
                                    <GifOutlined />
                                    {submenu.title}
                                </span>
                            }
                        >
                            {submenu.subMenu.map((trd, index) => (
                                <Menu.Item
                                    key={`sub-sub-menu-${index}`}
                                >
                                    <span><GifOutlined />{trd}</span>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu.SubMenu>
            ))}
        </Menu>
    )
}