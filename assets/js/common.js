/*
  For Small Device
--------------------------------------------------------- */
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value = window.outerWidth > 360 ? "width=device-width,initial-scale=1" : "width=360";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
})();

/*
  JS Enabled
--------------------------------------------------------- */
const init = function () {
  // JSファイルが読み込まれたら、htmlにis-jsEnabledクラスを付与する
  document.documentElement.classList.add("is-jsEnabled");
};
init();

/*
  Loading
--------------------------------------------------------- */
const loading = function () {
  // ページ全体の読み込みが完了したら、htmlにis-loadedクラスを付与する
  window.addEventListener("load", () => {
    document.documentElement.classList.add("is-loaded");
  });
};
loading();

/*
  Resize
--------------------------------------------------------- */
const resize = function () {
  // ウインドウがリサイズされたら、htmlにis-resizeクラスを付け、0.5秒経ったら外す
  let timerId;

  window.addEventListener("resize", function () {
    document.documentElement.classList.add("is-resize");
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      document.documentElement.classList.remove("is-resize");
    }, 500);
  });
};
resize();

/*
  drawer
--------------------------------------------------------- */
const drawer = function () {
  // 要素の取得
  const button = document.querySelector(".js-buttonHamburger");
  const drawer = document.getElementById("js-drawer");
  const globalNavHref = document.querySelectorAll(".js-globalNavHref");

  // buttonをクリックしたら、htmlのis-drawerActiveクラスの付け外し、buttonとdrawerのWAI_ARIA属性の切り替えをする
  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") !== "false";
    button.setAttribute("aria-expanded", !isExpanded);

    const isHidden = drawer.getAttribute("aria-hidden") !== "false";
    drawer.setAttribute("aria-hidden", !isHidden);

    document.documentElement.classList.toggle("is-drawerActive");
  });

  // 992pxのブレイクポイントで、drawerのWAI-ARIA属性を切り替える
  const breakPoint = window.matchMedia("(min-width: 992px)");

  function drawerSwitch(e) {
    if (e.matches) {
      drawer.setAttribute("aria-hidden", "false");
    } else if (!e.matches && button.getAttribute("aria-expanded") == "false") {
      drawer.setAttribute("aria-hidden", "true");
    }
  }

  breakPoint.addEventListener("change", drawerSwitch);
  drawerSwitch(breakPoint);

  // ドロワー展開時にリンクをクリックしたら、htmlのis-drawerActiveクラスを外し、buttonとdrawerのWAI_ARIA属性を切り替える
  globalNavHref.forEach((elem) => {
    elem.addEventListener("click", () => {
      document.documentElement.classList.remove("is-drawerActive");
      button.setAttribute("aria-expanded", "false");

      if (breakPoint.matches) {
        drawer.setAttribute("aria-hidden", "false");
      } else {
        drawer.setAttribute("aria-hidden", "true");
      }
    });
  });

  // ドロワーの展開時に一番最後のリンクのフォーカスが外れたら、ボタンにフォーカスを当てる
  const lastHref = Array.from(globalNavHref).pop();

  lastHref.addEventListener("blur", () => {
    if (button.getAttribute("aria-expanded") == "true") {
      button.focus();
    }
  });
};
drawer();

/*
  Hero Animation
--------------------------------------------------------- */
const heroAnimation = function () {
  const elem = document.querySelectorAll(".js-heroAnimation");

  elem.forEach((elem) => {
    // ページ全体の読み込みが完了したら、要素にis-visibleクラスを付与する
    window.addEventListener("load", () => {
      elem.classList.add("is-visible");
    });
  });
};
heroAnimation();

/*
  Scroll Animation
--------------------------------------------------------- */
const scrollAnimation = function () {
  window.addEventListener("scroll", () => {
    // スクロール量の取得
    const position = window.scrollY;
    // 表示する要素の取得
    const elem = document.querySelectorAll(".js-scrollAnimation");
    // ウィンドウの高さの取得
    const windowHeight = window.innerHeight;

    elem.forEach((elem) => {
      // 表示する要素のtop値の取得（＋スクロール量）
      const elemTop = elem.getBoundingClientRect().top + position;
      // 表示する要素のbottom値の取得（＋スクロール量）
      const elemBottom = elem.getBoundingClientRect().bottom + position;

      // 表示する要素が画面内に出現したら、その要素にis-visibleクラスを付与する
      if (position > elemTop - windowHeight + 200 && position < elemBottom) {
        elem.classList.add("is-visible");
      }
    });
  });
};
scrollAnimation();

/*
  Mouse Stalker
--------------------------------------------------------- */
const mouseStalker = function () {
  // JSでdivを生成し、</body>の手前に挿入する
  const stalker = document.createElement("div");
  stalker.classList.add("js-stalker", "p-stalker");
  document.body.appendChild(stalker);

  // 1200pxのブレイクポイントで、マウスストーカーの表示を切り替える
  const breakPoint = window.matchMedia("(min-width: 1200px)");

  function mouseStalkerSwitch(e) {
    if (!e.matches) {
      document.body.removeChild(stalker);
    } else {
      document.body.appendChild(stalker);
    }
  }

  breakPoint.addEventListener("change", mouseStalkerSwitch);
  mouseStalkerSwitch(breakPoint);

  // ドキュメントのイベントの監視
  document.addEventListener("mousemove", (e) => {
    // 追加した要素の位置をマウスポインターの位置にセット
    stalker.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // 全てのa要素とbutton要素を取得
  const linkElems = document.querySelectorAll("a[href], button");

  linkElems.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      stalker.classList.add("is-stalkerActive");
    });

    elem.addEventListener("mouseleave", () => {
      stalker.classList.remove("is-stalkerActive");
    });
  });
};
mouseStalker();
