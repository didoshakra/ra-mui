//HeaderLogo.js/mag

import Link from "next/link";
import { useContext } from "react";
import useTranslation from "../../translations/useTranslation";
import { ComponentContext } from "../../context/ComponentContext";
import Drawer from "./Drawer";

const HeaderLogo = () => {
  const { state } = useContext(ComponentContext);
  const { theme } = state;
  const { locale, t } = useTranslation();

  return (
    <div className="headerLogo">
      <Drawer />
      {/* <div className="headerLogo__icon"> */}
      <Link href="/[lang]" as={`/${locale}`}>
        <a headerLogo__icon>
          <img
            title={t("logo_logoTitle")}
            src="/icons/SunRa48.png"
            alert="logo"
          />
        </a>
      </Link>
      {/* </div> */}
      <Link href="/[lang]" as={`/${locale}`}>
        <a title={t("logo_logoTitle")} className="headerLogo__text">
          {/* {t("logo_siteName")} */}
          Mag
        </a>
      </Link>
      {/* Саме ліве виїздне меню */}
      {/* <Drawer drawerOpen={drawerOpen} drawerOnClick={drawerOnClick} /> */}
      <style jsx>{`
        //first-mobile
        .headerLogo {
          margin: 0;
          padding: 0;
          display: flex;
          //justify-content: flex-start; /* Вирівнювання елементів по головній осі(x) ввліво-по замовчуванню */
          // max-width: 400px;
          align-items: center; /* Вирівнювання елементів по перетину осі(y) центр */
        }
        .headerLogo__icon {
          //margin-left: 10px; //Відступ від кожного елемента зліва
          display: flex;
          align-items: center; /* Вирівнювання елементів по перетину осі(y) центр */
          justify-content: center; /* Вирівнювання елементів по головній осі(x) вправо */
          color: ${theme.colors.icontHead};
          background: ${theme.colors.headBackground};

          border-radius: 45px; /* Радіус*/
          width: 45px;
          height: 45px;
        }
        .headerLogo__icon:hover,
        .headerLogo__text:hover {
          color: ${theme.colors.headIconHover};
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }
        .headerLogo__icon img {
          //margin: 0;
          //padding: 0;
          width: 35px;
          height: 35px;
        }
        .headerLogo__text {
          display: none;
        }
        @media (min-width: 600px) {
          .headerLogo__text {
            display: inline; //по замовчуванню
            padding: 0px 10px;
            //margin-left: 10px; //Відступ від кожного елемента зліва
            font-weight: 600;
            font-family: ${theme.fontFamily.sansSerif};
            text-decoration: none;
            color: ${theme.colors.headText};
            background: ${theme.colors.headBackground};
          }
        }
      `}</style>
    </div>
  );
};
export default HeaderLogo;
