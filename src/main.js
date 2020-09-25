const $siteList = $(".site-list");
const $lastLi = $siteList.find("li.last");
const x = JSON.parse(localStorage.getItem("x"));
const hashMap = x || [{url: "baidu.com"}, {url: "bilibili.com"}];

const render = () => {
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((item, index) => {
        const $li = $(`<li>
              <div class="site">
                  <div class="logo">
                      ${(item.url[0]).toUpperCase()}
                  </div>
                  <div class="link">${item.url}</div>
                  <svg class="icon close">
                    <use xlink:href="#icon-close"></use>
                  </svg>
              </div>
          </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open('https://www.' + item.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        })
    });
};

render();

$(".add-button").on("click", () => {
    let url = window.prompt("请问你要添加的网址是？");

    if (url) {
        hashMap.push({
            url: removeRedundant(url),
        });
        render();
    }
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
};

const removeRedundant = (url) => {
    return url.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .replace(/\.*/, "");
};

$(document).on('keypress', (e) => {
    if (e.target !== $('input')[0]) {
        let {key} = e;
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].url[0] === key) {
                window.open('https://www.' + hashMap[i].url, '_self');
                break;
            }
        }
    }
})