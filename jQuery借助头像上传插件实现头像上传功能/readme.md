插件地址（码云）：https://gitee.com/durenlong/uploading

使用注意事项：关键标签只有四个，只要这四个标签一一对应好就可以正常使用此插件。
    1.上传图片的<input type="file">标签
        <input type="file" id="file">
        <!-- 在js中获取该控件 -->
        <script>
            var clipArea = new bjj.PhotoClip("#clipArea", {
                file: "#file",  /* 上传图片的<input type="file">控件的选择器或者DOM对象 */
                ...
            }
        </script>
    2.承载裁剪图片工具的标签
        <div id="clipArea"></div>
        <!-- 在js中实现裁剪工具 -->
        <script>
            var clipArea = new bjj.PhotoClip("#clipArea", {
                ...
            }
        </script>
    3.显示截取后的图像的容器标签
        <div class="logo-img"></div>
        <!-- 在js中绑定该容器 -->
        <script>
            var clipArea = new bjj.PhotoClip("#clipArea", {
                view: ".logo-img", /* 显示截取后图像的容器的选择器或者DOM对象 */
                ...
            }
        </script>
    4.确认截图的按钮标签
        <button class="clip-btn">确认裁剪</button>
        <!-- 在js中绑定该标签 -->
        <script>
            var clipArea = new bjj.PhotoClip("#clipArea", {
                ok: ".clip-btn", /* 确认截图按钮的选择器或者DOM对象 */
                ...
            }
        </script>

PS：此插件可以根据不同的设计稿写成不同样式，不再只能用插件固定的样式。