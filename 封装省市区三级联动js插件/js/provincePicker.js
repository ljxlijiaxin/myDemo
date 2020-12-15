;(function () {
    var ProvincePicker = function (provinceSelector, citySelector, districtSelector) {
        this.select1 = document.querySelector(provinceSelector);
        this.select2 = document.querySelector(citySelector);
        this.select3 = document.querySelector(districtSelector);

        /* 初始化 */
        this.init();
    }
    ProvincePicker.prototype = {
        constructor: ProvincePicker,

        /* 初始化，默认显示省市中的第一项（北京市-北京市-东城区） */
        init: function(){
            this.addOptions(this.select1, province, 0);
            this.addOptions(this.select2, province[0].city, 0);
            this.addOptions(this.select3, province[0].city[0].districtAndCounty, 0);
            this.select1.addEventListener("change", () => {
                this.addOptions(this.select2, province[select1.value].city, 0);
                this.addOptions(this.select3, province[select1.value].city[select2.value].districtAndCounty, 0);
            });
            this.select2.addEventListener("change", () => {
                this.addOptions(this.select3, province[select1.value].city[select2.value].districtAndCounty, 0);
            });
        },

        /* 给select标签添加相应的option标签 */
        addOptions: function(selectObj, arr, current){
            selectObj.innerHTML = '';
            for (let i = 0; i < arr.length; i++) {
                var option = document.createElement("option");
                option.value = i;
                option.innerHTML = arr[i].name || arr[i];
                if (i == current) {
                    option.selected = "selected";
                }
                selectObj.appendChild(option);
            }
        }
    }

    window.ProvincePicker = ProvincePicker;
})();