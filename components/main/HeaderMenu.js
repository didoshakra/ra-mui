//HeaderMenu.js//Селектор мови+Дві теми-іконки(themeTypeLight)
//Після розділення на HeaderMenu+HeaderSeting
//список меню з масиву menu

import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "../../translations/useTranslation";
import { ComponentContext } from "../../context/ComponentContext";
import HeaderMenuMobile from "./HeaderMenuMobile";

const HeaderMenu = () => {
  const { locale, t } = useTranslation();
  const { state } = useContext(ComponentContext);
  const { theme } = state;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const mobileMenuToggle = arg => {
    setMobileMenuOpen(arg);
    // console.log("Menu.js/mobileMenuOpen2/arg =", arg);
  };

  const menu = [
    {
      a: "home_hoer",
      link: "/"
    },
    {
      a: "home_video",
      link: "/home_video"
    },
    {
      a: "home_animet",
      link: "/home_animet"
    },
    {
      a: "home_MUI",
      link: "/home_MUI"
    },
    {
      a: "home_stan",
      link: "/home_stan"
    },
    {
      a: t("headerMenu_iconTitleAboutME"),
      link: "/about"
    }
  ];

  const renderMenu = () => {
    return menu.map((item, index) => {
      return (
        <li className="g-nav__item-goriz" key={index}>
          <Link href={`/[lang]${item.link}`} as={`/${locale}${item.link}`}>
            {/* <p className="g-nav__item-a">{item.a}</p> */}
            <p>{item.a}</p>
          </Link>
        </li>
      );
    });
  };

  return (
    // Навігація
    <React.Fragment>
      {/* для десктопа */}
      <ul className="nav">{renderMenu()}</ul>
      {/* Мобільна навігація*/}
      <div className="icon">
        {/* іконка мобільного меню/faList/ */}
        <i
          onClick={() => mobileMenuToggle(mobileMenuOpen ? false : true)}
          title={t("headerMenu_iconTitleNavMenu")}
        >
          <FontAwesomeIcon icon={faList} />
        </i>
      </div>
      {/* Список мобильної навігації */}
      <HeaderMenuMobile
        mobileMenuOpen={mobileMenuOpen}
        mobileMenuToggle={mobileMenuToggle}
        // renderMenu={renderMenu}
        menu={menu}
      />

      <style jsx>{`
        .nav {
          //margin: 0;
          //padding: 0;
          display: flex;
          justify-content: flex-end; /* Вирівнювання елементів по головній осі(x) вправо */
          align-items: center; /* Вирівнювання елементів по перетину осі(y) центр*/
        }
        .nav p {
          border-bottom: 2px solid red; /* Параметры линии внизу */
        }
        /* --- Mobile navigation icon -- */
        .icon {
          display: none;
          //z-index: 19;
        }
        .icon :hover {
          color: ${theme.colors.headIconHover};
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }
        /* Для екранів з шириною  0 до 1200px */
        //@media (max-width: 1200px) {
        @media (max-width: 960px) {
          /*iPad<960px*/
          .nav {
            display: none; /*не показує */
          }

          .icon {
            margin-right: 5px; //Відступ від кожного елемента зліва
            display: flex;
            align-items: center; /* Вирівнювання елементів по перетину осі(y) центр */
            justify-content: center; /* Вирівнювання елементів по головній осі(x) вправо */
            color: ${theme.colors.headIcon};
            background: ${theme.colors.headBackground};
            border: 2px solid ${theme.colors.headIcon}; /* Параметры границы */
            //border-radius: 45px; /* Радіус*/
            border-radius: 36px; /* Радіус*/
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default HeaderMenu;
