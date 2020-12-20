/**
 * params:
 *      pagenation：string，必选，分页器所在最外层容器的选择器,
 *      paramObj = {
 *          currentPage：number/string，可选，当前页，初始化时默认是1,
 *          totalPage：number/string，可选，总页码，预设值为10,
 *          showPageNum：number/string，可选，显示出来的页码个数，默认为显示5个页码,
 *          page：string，必选，页码部分容器的选择器,
 *          prevMore：string，必选，前省略号的选择器,
 *          nextMore：string，必选，后省略号的选择器,
 *          first：string，可选，“首页”按钮的选择器，不传值则不显示该按钮,
 *          last：string，可选，“尾页”按钮的选择器，不传值则不显示该按钮,
 *          prev：string，可选，“上一页”按钮的选择器，不传值则不显示该按钮,
 *          next：string，可选，“下一页”按钮的选择器，不传值则不显示该按钮,
 *          closeToRight：boolean，可选，当显示页码个数为偶数时，当前页是否显示在中线右侧第一个，默认为false,
 *          changePageFn：function，可选，当前页发生改变时触发的事件（不要写成箭头函数，会导致this的指向出错），接收两个参数：index（当前页的页码）和 ele（当前页的页面元素）
 *      }
 */
;(function () {
    var Pagenation = function (pagenation,paramObj) {
        this.pagenation = pagenation;
        this.currentPage = parseInt(paramObj.currentPage) || 1;
        this.totalPage = parseInt(paramObj.totalPage) || 10;
        this.showPageNum = parseInt(paramObj.showPageNum) || 5;
        this.page = paramObj.page;
        this.prevMore = paramObj.prevMore;
        this.nextMore = paramObj.nextMore;
        this.first = paramObj.first;
        this.last = paramObj.last;
        this.prev = paramObj.prev;
        this.next = paramObj.next;
        this.closeToRight = paramObj.closeToRight;
        this.changePageFn = paramObj.changePageFn;
        this.flag = this.pagenation && this.page && this.prevMore && this.nextMore;

        this.init();
    };      
    Pagenation.prototype = {
        constructor: Pagenation,

        /* 分页器初始化 */
        init:function () {
            if (this.flag) {
                document.querySelector(this.pagenation).classList.add("pagenation");
                document.querySelector(this.page).classList.add("page");
                document.querySelector(this.prevMore).classList.add("prev-more");
                document.querySelector(this.nextMore).classList.add("next-more");
                if (this.first) {
                    document.querySelector(this.first).classList.add("first");
                    document.querySelector(this.first).addEventListener("click",() => {
                        this.currentPage = 1;
                        this.changePage(this.currentPage);
                    })
                }
                if (this.last) {
                    document.querySelector(this.last).classList.add("last");
                    document.querySelector(this.last).addEventListener("click",() => {
                        this.currentPage = this.totalPage;
                        this.changePage(this.currentPage);
                    })
                }
                if (this.prev) {
                    document.querySelector(this.prev).classList.add("prev");
                    document.querySelector(this.prev).addEventListener("click",() => {
                        this.currentPage--;
                        if (this.currentPage < 1) {
                            this.currentPage = 1;
                        }
                        this.changePage(this.currentPage);
                    })
                }
                if (this.next) {
                    document.querySelector(this.next).classList.add("next");
                    document.querySelector(this.next).addEventListener("click",() => {
                        this.currentPage++;
                        if (this.currentPage > this.totalPage) {
                            this.currentPage = this.totalPage;
                        }
                        this.changePage(this.currentPage);
                    })
                }
                this.changePage(this.currentPage);
            }else{
                alert("参数不全，分页器初始化失败。");
            }
        },

        /* 当前页发生改变 */
        changePage: function (current) {
            var current = parseInt(current) || 1;   /* current：number/string，当前页码，默认为1 */
            /* 页码发生改变，需要重新创建页码元素 */
            var pageList = document.createElement("ul");        /* 页码元素的列表容器 */
            var currentPageEle;    /* 当前页所在的页码元素 */
            if (this.closeToRight) {
                var showMin = current - parseInt(this.showPageNum / 2);    /* 显示的最小页码 */
                if (showMin < 1) {
                    showMin = 1;
                }
                var showMax = showMin + this.showPageNum - 1;            /* 显示的最大页码 */
                if (showMax > this.totalPage) {
                    showMax = this.totalPage;
                    showMin = Math.max(1,this.totalPage-this.showPageNum+1);
                }
            }else{
                var showMax = current + parseInt(this.showPageNum / 2);    /* 显示的最大页码 */
                if (showMax > this.totalPage) {
                    showMax = this.totalPage;
                }
                var showMin = showMax - this.showPageNum + 1;            /* 显示的最小页码 */
                if (showMin < 1) {
                    showMin = 1;
                    showMax = Math.min(this.showPageNum, this.totalPage);
                }
            }
            /* 判断前后省略号是否显示 */
            if (showMin == 1) {
                document.querySelector(this.prevMore).classList.add("hidden");
            } else {
                document.querySelector(this.prevMore).classList.remove("hidden");
            }
            if (showMax == this.totalPage) {
                document.querySelector(this.nextMore).classList.add("hidden");
            } else {
                document.querySelector(this.nextMore).classList.remove("hidden");
            }
            for (let i = showMin; i <= showMax; i++) {
                var li = document.createElement("li");
                li.innerHTML = i;
                li.dataset.page = i;
                if (i == current) {
                    li.classList.add("current");
                    currentPageEle = li;
                }
                /* 给页码添加点击事件 */
                li.addEventListener("click", () => {
                    this.currentPage = i;
                    this.changePage(i);
                });
                pageList.appendChild(li);
            }
            document.querySelector(this.page).innerHTML = "";
            document.querySelector(this.page).appendChild(pageList);

            if (this.changePageFn) {
                this.changePageFn(this.currentPage, currentPageEle);
            }
        }
    }

    window.Pagenation = Pagenation;
})();