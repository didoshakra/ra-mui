//CarouselRa.js  на основі //CarouselAn.js //https://habr.com/ru/post/467079/

const listSlides = [
  {
    // src: "/minishop/images/gallery-1.jpg",
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img0.jpg",
    p: "Опис 1",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img1.jpg",
    // src: "/minishop/images/gallery-2.jpg",
    p: "Опис 2",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img2.jpg",
    // src: "/minishop/images/gallery-3.jpg",
    p: "Опис 3",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img3.jpg",
    // src: "/minishop/images/gallery-4.jpg",
    p: "Опис 4",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img4.jpg",
    // src: "/minishop/images/gallery-5.jpg",
    p: "Опис 5",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img5.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 6",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img6.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 7",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img7.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 8",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img8.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 9",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img9.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 10",
  },
];
//****************************************************************************** */
const parVisibleElements = 5; // Кількість відображуваних елементів в каруселі
// const parAuto = true; // Автоматична прокрутка
const parAuto = false; // Автоматична прокрутка
const parHeight = "270px"; // Висота зображення
const parInterval = 3000; // Інтервал між прокруткою елементів (мс)
const parSpeed = 0.75; // Швидкість анімації (с)
// const parTouch = true; // Прокрутка дотиком
var parArrows = true; // Показувати стрілки прокрутки
var parDots = true; // Індикаторні

//******************************************************************************* */
const CarouselRa = () => {
  //Визначення ширини вікна браузера //https://dev.to/3sanket3/usewindowsize-react-hook-to-handle-responsiveness-in-javascript-3dcl
  const isWindowClient = typeof window === "object";
  const [windowSize, setWindowSize] = React.useState(
    isWindowClient ? window.innerWidth : undefined
  );
  const elemAll = listSlides.length; //Величина масиву слайдів(даних)
  //*Змінні з параметрів
  const [parametrs, setParametrs] = React.useState({
    visiElement: windowSize < 600 ? 1 : Math.min(parVisibleElements, elemAll),
    parDots: windowSize < 600 ? false : parDots,
  });
  //*робочий масив(збільшений на visiElement)
  const listSlides1 = listSlides.concat(
    listSlides.slice(0, parametrs.visiElement) //масив даних
  );
  //*робочі змінні
  const [workVares, setWorkVares] = React.useState({
    first: true, //(UseEffect) Щоб при вході не перекидало на 1 позицію
    actElement: 0,
    transitionCss: `transform ${parSpeed} sease`,
  });

  const renderList = () => {
    var urlz = "";
    return listSlides1.map((item) => {
      urlz = `url('${item.src}') center no-repeat`;
      return (
        <li
          className="ant-carousel-element"
          style={{
            background: urlz, //:"url('/minishop/images/gallery-1.jpg')",
            backgroundSize: "cover",
          }}
        >
          <p className="ant-carousel-element_p">{item.p}</p>
        </li>
      );
    });
  };

  const renderDots = () => {
    return listSlides.map((item, index) => {
      // console.log("renderDots/workVares.actElement=", workVares.actElement);
      return (
        <span
          data-index={index} //data-ХХ->Для передачі даних в e.currentTarget.dataset.XX
          className="ant-dot"
          style={{
            backgroundColor:
              index == workVares.actElement ||
              (index == 0 && workVares.actElement == elemAll)
                ? "rgba(219,50,17,1)"
                : "rgba(219,50,17,0.2)",
            // backgroundColor: index == actElement ? "#556" : "#BBB",
            cursor: index == 0 ? "default" : "pointer",
          }}
          onClick={onDots}
        ></span>
      );
    });
  };

  const arrowRisht = () => {
    if (workVares.actElement >= elemAll) {
      setWorkVares({
        first: false,
        actElement: 0,
        transitionCss: "none",
      });
    } else {
      setWorkVares({
        first: false,
        actElement: workVares.actElement + 1,
        transitionCss: `transform ${parSpeed} sease`,
      });
    }
  };
  const arrowLeft = () => {
    if (workVares.actElement <= 0) {
      setWorkVares({
        first: true,
        actElement: elemAll - 1,
        transitionCss: "none",
      });
    } else {
      setWorkVares({
        first: true,
        actElement: workVares.actElement - 1,
        transitionCss: `transform ${parSpeed} sease`,
      });
    }
  };

  const onDots = (e) => {
    const i = e.currentTarget.dataset.index;
    let newActElement = Number(i);
    setWorkVares({ first: true, actElement: newActElement });
    renderDots(); //Пересвітка ативності Dots
  };

  React.useEffect(() => {
    // обробник, який буде викликаний при зміні розміру екрана
    function setSize() {
      setWindowSize(window.innerWidth); //👈
      // Зміна кількості видимих слайдів в залежності від розміру вікна
      if (window.innerWidth < 600) {
        setParametrs({ visiElement: 1, parDots: false });
      } else {
        setParametrs({
          visiElement: Math.min(parVisibleElements, elemAll),
          parDots: parDots,
        });
      }
    }
    if (isWindowClient) {
      //Реєстрація слухача розміру вікна
      window.addEventListener("resize", setSize);

      //Розреєстрація слухача розміру вікна
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWindowSize]);

  React.useEffect(() => {
    //Запуск таймера автоматичної прокрутки слайдів
    if (parAuto) {
      const timer = setTimeout(() => {
        arrowRisht();
      }, parInterval);
      return () => clearTimeout(timer); //Для того щоб таймер не запускався при кожному arrowRisht
    }
  }, [arrowRisht]);

  React.useEffect(() => {
    //Для зациклювання прокрутки вправо
    if (workVares.actElement == 0 && !workVares.first && !parAuto) {
      setWorkVares({
        first: true,
        actElement: workVares.actElement + 1,
        transitionCss: `transform ${parSpeed} sease`,
      });
    }
  }, [workVares.actElement]);

  return (
    // console.log("param.elemVisible",param.elemVisible)
    <div>
      <h3>CarouselRa1.js //https://habr.com/ru/post/467079/</h3>
      <div className="ant-carousel">
        <div className="ant-carousel-hider">
          <ul className="ant-carousel-list">{renderList()}</ul>
          <div className="ant-carousel-arrow-left" onClick={arrowLeft}></div>
          <div className="ant-carousel-arrow-right" onClick={arrowRisht}></div>
          {/* <div className="ant-carousel-dots">{parDots ? renderDots() : ""}</div> */}
        </div>
        <div div className="ant-carousel-dots">
          {parametrs.parDots ? renderDots() : ""}
        </div>

        <style jsx global>{`
          .ant-carousel-list {
            width: auto;
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            justify-content: flex-start;
            //border: 1px solid #82ae46;
            transform: translateX(
              calc(100% / ${parametrs.visiElement}* ${workVares.actElement}*-1)
            );
            transition: ${workVares.transitionCss};
          }
          .ant-carousel-element {
            position: relative;
            //display: block;
            display: flex;
            flex-direction: column;
            //justify-content:center;
            align-items: center;
            flex: 0 0 auto;
            //height: 270px;
            height: ${parHeight};
            width: calc(100% / ${parametrs.visiElement});
            text-align: center;
            //border: 1px solid #6e46ae;
          }
          .ant-carousel-element_p {
            color: red;
            font-size: 20px;
            font-weight: 800;
          }
          .ant-dot {
            width: 10px;
            width: 10px;
            height: 10px;
            height: 10px;
            margin: 1vw 1vw;
            padding: 0;
            display: inline-block;
            //background-color: #bbb;
            background-color: rgba(219, 50, 17, 1) bb;
            border-radius: 5px;
            border: 1px solid red;
            cursor: pointer;
          }
        `}</style>
        <style jsx>{`
          .ant-carousel {
            margin: 0;
            padding: 0;
            width: 100%;
            //position: relative;
            margin: 50px auto auto;
            padding-top: 0;
            // border: 1px solid #ccd;
            background-color: white;
          }
          @media screen and (min-width: 600px) {
            .ant-carousel {
              padding: 0 1vw;
            }
          }

          @media screen and (min-width: 900px) {
            .ant-carousel {
              padding: 0 1vw;
            }
          }

          /* General styles */
          .ant-carousel-hider {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            //border: 1px solid #bd112e;
          }

          /* Navigation item styles */
          div.ant-carousel-arrow-left,
          div.ant-carousel-arrow-right {
            top: 0;
            width: 4vw;
            height: 100%;
            position: absolute;
            cursor: pointer;
            display: flex;
            align-items: center;
            opacity: ${parArrows ? "0.4" : "0"};
            z-index: 10;
          }

          .ant-carousel-arrow-left {
            left: 0;
            background: url("http://pvbk.spb.ru/inc/carousel/ant-files/ant-arrow-left.png")
              no-repeat center left;
            //border: 1px solid #2b11bd;
          }

          .ant-carousel-arrow-right {
            right: 0;
            background: url("http://pvbk.spb.ru/inc/carousel/ant-files/ant-arrow-right.png")
              no-repeat center right;
            //border: 1px solid #2b11bd;
          }

          .ant-carousel-dots {
            width: 100%;
            height: auto;
            position: absolute;
            left: 0;
            //bottom: -10px;
            //bottom: 5px;
            z-index: 10;
            text-align: center;
          }
        `}</style>
      </div>
    </div>
  );
};
export default CarouselRa;