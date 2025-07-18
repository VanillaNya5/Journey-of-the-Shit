//=============================================================================
// Drill_CoreOfGaugeNumber.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        系统 - 参数数字核心
 * @author Drill_up
 * 
 * @Drill_LE_param "数字样式-%d"
 * @Drill_LE_parentKey "---数字样式%d至%d---"
 * @Drill_LE_var "DrillUp.g_COGN_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfGaugeNumber +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件描述了一个复杂的 参数数字 贴图结构，并提供各项扩展操作接口。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 作用于：
 *   - Drill_GaugeForBoss           UI-高级BOSS生命固定框
 *   - Drill_GaugeForVariable       UI-高级变量固定框
 *   - Drill_GaugeOfBufferTimeNum   UI-缓冲时间数字
 *   - Drill_GaugeTimerHud          UI-时间计时器
 *   - Drill_GaugeFloatingNum       地图UI-临时漂浮参数数字
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   作用于任意贴图。
 * 2.具体可以去看看 "1.系统 > 关于参数数字.docx"。
 *   文档中有相关图解，比纯文字容易理解。
 * 主体：
 *   (1.参数数字有下列固定且硬性结构：
 *      只能根据基本符号和扩展符号显示内容、没有外框、只能左右挤占。
 * 符号：
 *   (1.基本符号用于表示数字关系，与参数值有关。
 *      图片资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 *   (2.扩展符号用于表示数字关系，与参数值无关。
 *      图片资源会被分成14等分，通过字母表示扩展符号（abcdefghijklmn）。
 *   (3.参数值减少时，如果瞬间减少了大段数值（比如从200降到100）。
 *      弹性滚动设置下，显示的参数数字不会立即达到100，而是慢慢滚动到100。
 * 排列：
 *   (1.符号根据中心锚点进行的对齐情况，分为右对齐、左对齐、居中三种。
 *      注意中心锚点的位置。
 *   (2.如果显示数字的宽度区域十分有限，你可以给参数数字添加宽度限制，
 *      宽度分为两种：缩放限制和挤压限制。
 * 额定值：
 *   (1.额定值可以根据当前数值达到某些条件时，直接改变显示的符号的信息。
 *   (2.你可以配置与基本符号不同的额定符号，达到额定条件后，相关基本符号
 *      可以转变为额定符号。
 * 预加载：
 *   (1.插件中的资源会被反复使用，所以插件默认所有资源都预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.额定值、时间单位 都是参数数字中的一项配置属性，因此对所有子插件通用。
 *      你完全可以脑洞大开，把角色的生命值 用 时间格式 展现出来。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__number （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__number文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 样式1 资源-基本符号
 * 样式1 资源-扩展符号
 * 样式1 资源-额定基本符号
 * 样式1 资源-额定扩展符号
 * 样式2 ……
 * ……
 * 
 * 参数数字的资源非常多，你需要仔细给你的文件分门别类。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n^3)*o(参数数字数)*o(贴图处理) 每帧
 * 测试方法：   参数可视化管理层、战斗界面 测试性能消耗。
 * 测试结果：   地图界面，平均消耗为：【30.04ms】
 *              战斗界面，平均消耗为：【21.33ms】
 * 测试方法2：  主菜单界面中显示4个角色固定框x5的参数数字。
 * 测试结果2：  菜单界面中，消耗为：【37.62ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.子插件的参数条消耗，都算作参数条核心的消耗，所以这里的消耗
 *   为不同子插件的相对平均值。
 * 3.参数数字消耗比我预想要小的多，与gif的消耗居然差不多。
 *   因为参数数字滚动的底层原理就是gif播放。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构，减少性能消耗。添加了时间格式的支持。
 * [v1.2]
 * 整理规范了插件的数据结构。
 * [v1.3]
 * 优化了内部结构，减少性能消耗。
 * [v1.4]
 * 设置了 预加载资源 的功能。
 * [v1.5]
 * 大幅度改进了内部结构，支持字符串设置。
 * [v1.6]
 * 修复了 字符串、额定值 修改后，参数数字不刷新的bug。
 * 
 * 
 * 
 * @param 是否启用预加载
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 核心中所有配置的参数数字资源，都在游戏初始化时执行预加载。
 * @default true
 *
 * @param ---数字样式 1至20---
 * @default
 *
 * @param 数字样式-1
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"==时间数字-左对齐==","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"左对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 * 
 * @param 数字样式-2
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"==时间数字-右对齐==","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 * 
 * @param 数字样式-3
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"==时间数字-居中==","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"居中","最大符号数量":"20","符号间间距":"0","排列宽度模式":"不限制宽度","排列限制宽度":"300","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 * 
 * @param 数字样式-4
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"==时间数字-限宽挤扁==","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"缩放限制","排列限制宽度":"30","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-5
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default {"标签":"==时间数字-限宽挤压==","---主体---":"","整体旋转角度":"0","资源-基本符号":"时间精简风格-基本符号","资源-扩展符号":"时间精简风格-扩展符号","---符号---":"","是否显示负号":"true","额外符号前缀":"","额外符号后缀":"","---排列---":"","对齐方式":"右对齐","最大符号数量":"20","符号间间距":"0","排列宽度模式":"挤压限制","排列限制宽度":"30","---滚动效果---":"","滚动模式":"瞬间变化","弹性变化速度":"10.0","---额定值---":"","是否启用额定值":"false","是否显示额定值":"false","默认额定值":"100","额定条件":"大于等于额定值时","达到条件后是否限制值":"true","达到条件时符号":"不变化","资源-额定基本符号":"额定基本符号-默认","资源-额定扩展符号":"额定扩展符号-默认"}
 *
 * @param 数字样式-6
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-7
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-8
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-9
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-10
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-11
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-12
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-13
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-14
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-15
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-16
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-17
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-18
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-19
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-20
 * @parent ---数字样式 1至20---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 * 
 * @param ---数字样式21至40---
 * @default
 *
 * @param 数字样式-21
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-22
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-23
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-24
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-25
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-26
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-27
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-28
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-29
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-30
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-31
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-32
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-33
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-34
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-35
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-36
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-37
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-38
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-39
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-40
 * @parent ---数字样式21至40---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param ---数字样式41至60---
 * @default
 *
 * @param 数字样式-41
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-42
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-43
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-44
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-45
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-46
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-47
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-48
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-49
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-50
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-51
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-52
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-53
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-54
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-55
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-56
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-57
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-58
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-59
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 *
 * @param 数字样式-60
 * @parent ---数字样式41至60---
 * @type struct<GaugeNumber>
 * @desc 配置参数数字的样式信息。
 * @default 
 * 
 */
/*~struct~GaugeNumber:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的参数数字==
 *
 * @param ---主体---
 * @desc 
 *
 * @param 整体旋转角度
 * @parent ---主体---
 * @type number
 * @min 0
 * @desc 参数数字的整体旋转角度，单位角度。中心锚点在左上角。
 * @default 0
 * 
 * @param 资源-基本符号
 * @parent ---主体---
 * @desc 基本符号的图片资源。注意，资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 * @default (需配置)基本符号
 * @require 1
 * @dir img/Special__number/
 * @type file
 *
 * @param 资源-扩展符号
 * @parent ---主体---
 * @desc 扩展符号的图片资源，注意，资源会被分成14等分。通过字母表示扩展符号（abcdefghijklmn）。
 * @default (需配置)扩展符号
 * @require 1
 * @dir img/Special__number/
 * @type file
 *
 * @param ---符号---
 * @desc 
 * 
 * @param 是否显示负号
 * @parent ---符号---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 如果参数值出现了负数值，会显示负号。
 * @default true
 * 
 * @param 额外符号前缀
 * @parent ---符号---
 * @desc 在当前显示的数字字符，前缀额外显示的 额外符号。注意，这里不是输入HP就能显示HP，去看文档！
 * @default 
 * 
 * @param 额外符号后缀
 * @parent ---符号---
 * @desc 在当前显示的数字字符，后缀额外显示的 额外符号。注意，这里不是输入HP就能显示HP，去看文档！
 * @default 
 *
 * @param ---排列---
 * @desc 
 *
 * @param 对齐方式
 * @parent ---排列---
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 居中
 * @value 居中
 * @option 左对齐
 * @value 左对齐
 * @desc 符号的对齐方式。
 * @default 右对齐
 *
 * @param 最大符号数量
 * @parent ---排列---
 * @type number
 * @min 1
 * @desc 最多显示的符号数量，比如"1000"中有4个符号，"-100/-110"中有9个符号。
 * @default 20
 * 
 * @param 符号间间距
 * @parent ---排列---
 * @desc 符号贴图之间的间距，可以为负数，负数的间距将会更加紧凑。
 * @default 0
 *
 * @param 排列宽度模式
 * @parent ---排列---
 * @type select
 * @option 不限制宽度
 * @value 不限制宽度
 * @option 缩放限制
 * @value 缩放限制
 * @option 挤压限制
 * @value 挤压限制
 * @desc 排列符号是宽度的模式。超出宽度时，缩放限制会横向缩放。挤压限制则会减小间距。
 * @default 不限制宽度
 *
 * @param 排列限制宽度
 * @parent 排列宽度模式
 * @desc 模式中设置限制时，符号的最大宽度。
 * @default 300
 * 
 * @param ---滚动效果---
 * @desc 
 *
 * @param 滚动模式
 * @parent ---滚动效果---
 * @type select
 * @option 瞬间变化
 * @value 瞬间变化
 * @option 弹性滚动
 * @value 弹性滚动
 * @desc 滚动效果指 数字的值变化后，数值滚动到指定值的动画效果。
 * @default 弹性滚动
 * 
 * @param 弹性变化速度
 * @parent ---滚动效果---
 * @desc 值为比例除数，值越小，速度越快。值越大，速度越慢。
 * @default 10.0
 *
 * @param ---额定值---
 * @desc 
 * 
 * @param 是否启用额定值
 * @parent ---额定值---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。额定值将根据参数值情况，改变符号样式。
 * @default false
 * 
 * @param 是否显示额定值
 * @parent ---额定值---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。"100/200"中，200为额定值，不显示额定值则只显示"100"。
 * @default false
 * 
 * @param 默认额定值
 * @parent ---额定值---
 * @desc 用于比较的额定值。注意，部分子插件可能会覆盖该额定值，具体看子插件说明。
 * @default 100
 * 
 * @param 额定条件
 * @parent ---额定值---
 * @type select
 * @option 小于额定值时
 * @value 小于额定值时
 * @option 大于额定值时
 * @value 大于额定值时
 * @option 等于额定值时
 * @value 等于额定值时
 * @option 小于等于额定值时
 * @value 小于等于额定值时
 * @option 大于等于额定值时
 * @value 大于等于额定值时
 * @desc 满足额定条件时，显示的符号将会变为额定符号。
 * @default 大于等于额定值时
 * 
 * @param 达到条件后是否限制值
 * @parent ---额定值---
 * @type boolean
 * @on 限制
 * @off 不限制
 * @desc true - 不限制，false - 不限制。大于等于额定值条件 且 出现"11/10"时，若限制将只显示"10/10"。
 * @default false
 * 
 * @param 达到条件时符号
 * @parent ---额定值---
 * @type select
 * @option 所有符号变为额定符号
 * @value 所有符号变为额定符号
 * @option 有效符号变为额定符号
 * @value 有效符号变为额定符号
 * @option 只参数符号变为额定符号
 * @value 只参数符号变为额定符号
 * @option 不变化
 * @value 不变化
 * @desc 满足额定条件后，变化的符号情况。
 * @default 不变化
 * 
 * @param 资源-额定基本符号
 * @parent ---额定值---
 * @desc 满足额定条件时基本符号的图片资源。注意，资源会被分成14等分，分别表示数字和加减乘除（0123456789+-x/）。
 * @default (需配置)额定基本符号
 * @require 1
 * @dir img/Special__number/
 * @type file
 * 
 * @param 资源-额定扩展符号
 * @parent ---额定值---
 * @desc 满足额定条件时扩展符号的图片资源，注意，资源会被分成14等分。通过字母表示扩展符号（abcdefghijklmn）。
 * @default (需配置)额定扩展符号
 * @require 1
 * @dir img/Special__number/
 * @type file
 * 
 * 
 * @param ---时间格式---
 * @desc 
 * 
 * @param 是否启用时间格式
 * @parent ---时间格式---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。设置后，将以时间格式来显示数字。
 * @default false
 * 
 * @param 格式结构
 * @parent ---时间格式---
 * @type select
 * @option 时间(mm:ss)
 * @value 时间(mm:ss)
 * @option 时间(mm:ss)+零填充
 * @value 时间(mm:ss)+零填充
 * @option 时间(hh:mm:ss)
 * @value 时间(hh:mm:ss)
 * @option 时间(hh:mm:ss)+零填充
 * @value 时间(hh:mm:ss)+零填充
 * @option 逐帧计时器(hh:mm:ss ff)
 * @value 逐帧计时器(hh:mm:ss ff)
 * @option 逐帧计时器(hh:mm:ss ff)+零填充
 * @value 逐帧计时器(hh:mm:ss ff)+零填充
 * @desc 满足额定条件后，变化的符号情况。具体效果看看文档"1.系统 > 关于参数数字.docx"。
 * @default 时间(hh:mm:ss)
 * 
 * @param 基础值单位
 * @parent ---时间格式---
 * @type select
 * @option 秒单位
 * @value 秒单位
 * @option 帧单位
 * @value 帧单位
 * @desc 使用 逐帧计时器 结构，参数数字值为10000时，秒单位表示 1万秒，显示"1:66:40 00"。 帧单位表示 1万帧，显示"1:66 40"。
 * @default 帧单位
 * 
 * @param 时间格式符号
 * @parent ---时间格式---
 * @desc 此处填指代字符，对应到相应的资源切片。用于表示"hh:mm:ss"中":"符号的图像。
 * @default e
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COGN (Core_Of_Gauge_Number)
//		临时全局变量	无
//		临时局部变量	this._drill_COGN_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(参数数字数)*o(贴图处理) 每帧
//		★性能测试因素	参数可视化管理层、战斗界面
//		★性能测试消耗	21.33ms 30.04ms（菜单界面 37.62ms）
//		★最坏情况		暂无
//		★备注			参数数字消耗比我预想要小的多，与gif的消耗居然差不多。
//		
//		★优化记录
//			2022-10-4 优化：
//				旧版本使用的是bitmap切片，切成了14份。后来换成了setFrame，消耗降低了20ms（不停地刷菜单情况的优化）
//				加了个锁，添加了资源标记容器。消耗降低15ms左右。当前为65ms左右消耗。
//			2022-10-30 优化：
//				这里把 参数条 的代码全部重新整理，划分结构，
//				反复重建，消耗在 98.1ms 左右；15位战斗界面，消耗在118ms左右。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆预加载
//			
//			->参数数字【Drill_COGN_NumberSprite】
//				->标准模块
//					->显示/隐藏【标准函数】
//					->是否就绪【标准函数】
//					->销毁【标准函数】
//					->修改变化因子 数字【标准函数】
//					->修改变化因子 字符串【标准函数】
//					->修改额定值【标准函数】
//					->修改额定值显示【标准函数】
//					->初始化数据【标准默认值】
//				->A主体
//				->B符号
//				->C排列
//				->D变化因子
//				->E输出字符串
//				->F追逐值
//				->G额定值
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 参数数字【Drill_COGN_NumberSprite】
//		
//		★核心说明：
//			1.整个核心只提供了一个封装好的【Sprite独立子类】。
//			  具体见类的说明。
//		
//		★必要注意事项：
//			1.参数数字只分两层，内容层 和 外层。两层级可以通过zIndex排序。
//			
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//		

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_COGN_PluginTip_curName = "Drill_CoreOfGaugeNumber.js 系统-参数数字核心";
	DrillUp.g_COGN_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到数据
	//==============================
	DrillUp.drill_COGN_getPluginTip_DataNotFind = function( index ){
		return "【" + DrillUp.g_COGN_PluginTip_curName + "】\n未找到id为"+ (index+1) +"的参数数字样式配置。";
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_COGN_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_COGN_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 接收到错误数据类型1
	//==============================
	DrillUp.drill_COGN_getPluginTip_ErrorType1 = function( value ){
		return "【" + DrillUp.g_COGN_PluginTip_curName + "】\n函数drill_COGN_reflashValue接受到了 非数字 类型的数据，请及时检查你的函数。当前类型："+(typeof value)+"，当前值："+value;
	};
	//==============================
	// * 提示信息 - 报错 - 接收到错误数据类型2
	//==============================
	DrillUp.drill_COGN_getPluginTip_ErrorType2 = function( value ){
		return "【" + DrillUp.g_COGN_PluginTip_curName + "】\n函数drill_COGN_reflashValue接受到了 非数字 类型的数据，请及时检查你的函数。当前类型："+(typeof value)+"，当前值："+value;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfGaugeNumber = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfGaugeNumber');
	
	
	//==============================
	// * 静态数据 - 数字样式
	//				（~struct~GaugeNumber）
	//
	//			说明：	函数未定义白色括号中的参数，需要子插件定义。若不定义则为默认值。
	//==============================
	DrillUp.drill_COGN_initStyle = function( dataFrom ) {
		var data = {};
		
		// > A主体
		//		data['x']【平移x（非实时赋值）】
		//		data['y']【平移y（非实时赋值）】
		//		data['visible']【可见】
		data['rotation'] = Number( dataFrom["整体旋转角度"] || 0 );
		
		// > B符号
		data['symbol_src'] = String( dataFrom["资源-基本符号"] || "" );
		data['symbol_src_file'] = "img/Special__number/";
		data['symbolEx_src'] = String( dataFrom["资源-扩展符号"] || "" );
		data['symbolEx_src_file'] = "img/Special__number/";
		
		// > C排列
		data['section_align'] = String( dataFrom["对齐方式"] || "右对齐") ;
		data['section_spriteLength'] = Number( dataFrom["最大符号数量"] || 20 );
		data['section_interval'] = Number( dataFrom["符号间间距"] || 0 );
		data['section_widthMode'] = String( dataFrom["排列宽度模式"] || "不限制宽度");
		data['section_widthLimit'] = Number( dataFrom["排列限制宽度"] || 300 );
		
		// > D变化因子
		//	（无）
		
		// > E输出字符串
		data['symbol_hasNegative'] = String( dataFrom["是否显示负号"] || "true") === "true";
		data['symbol_prefix'] = String( dataFrom["额外符号前缀"] || "");
		data['symbol_suffix'] = String( dataFrom["额外符号后缀"] || "");
		// > E输出字符串 - 时间单位
		data['timeUnit_enable'] = String( dataFrom["是否启用时间格式"] || "false") === "true";
		data['timeUnit_mode'] = String( dataFrom["格式结构"] || "时间(hh:mm:ss)");
		data['timeUnit_unitType'] = String( dataFrom["基础值单位"] || "秒单位");
		data['timeUnit_timeChar'] = String( dataFrom["时间格式符号"] || "e");
		
		// > F追逐值
		data['rolling_mode'] = String( dataFrom["滚动模式"] || "弹性滚动");
		data['rolling_speed'] = Number( dataFrom["弹性变化速度"] || 10.0 );
		
		// > G额定值
		data['specified_enable'] = String( dataFrom["是否启用额定值"] || "false") === "true";
		data['specified_visible'] = String( dataFrom["是否显示额定值"] || "false") === "true";
		data['specified_conditionNum'] = Number( dataFrom["默认额定值"] || 100 );
		data['specified_conditionType'] = String( dataFrom["额定条件"] || "大于等于额定值时") ;
		data['specified_remainChange'] = String( dataFrom["达到条件后是否限制值"] || "true") === "true";
		data['specified_changeType'] = String( dataFrom["达到条件时符号"] || "不变化") ;
		data['specified_symbol_src'] = String( dataFrom["资源-额定基本符号"] || "" );
		data['specified_symbol_src_file'] = "img/Special__number/";
		data['specified_symbolEx_src'] = String( dataFrom["资源-额定扩展符号"] || "" );
		data['specified_symbolEx_src_file'] = "img/Special__number/";
		
		return data;
	};
	
	/*-----------------杂项------------------*/
	DrillUp.g_COGN_preloadEnabled = String(DrillUp.parameters["是否启用预加载"] || "true") === "true";	
	
	/*-----------------参数数字样式（配置）------------------*/
	DrillUp.g_COGN_list_length = 60;
	DrillUp.g_COGN_list = [];
	for (var i = 0; i < DrillUp.g_COGN_list_length; i++) {
		if( DrillUp.parameters["数字样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["数字样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["数字样式-" + String(i+1) ]);
			DrillUp.g_COGN_list[i] = DrillUp.drill_COGN_initStyle( data );
		}else{
			DrillUp.g_COGN_list[i] = {};
		}
	}
	//==============================
	// * 数据获取 - 参数数字样式（开放函数）
	//	
	//			说明：	> 与直接获取 "DrillUp.g_COGN_list[i]" 一样，只是加了一道过滤提示网。
	//==============================
	DrillUp.drill_COGN_getCopyedData = function( index ){
		var data = DrillUp.g_COGN_list[ index ];
		if( data == undefined || 
			data['specified_enable'] == undefined ){
			alert( DrillUp.drill_COGN_getPluginTip_DataNotFind( index ) );
			return {};
		}
		return JSON.parse(JSON.stringify( data ));
	}
	
	
//=============================================================================
// ** ☆预加载
//
//			说明：	> 用过的bitmap，全部标记不删除，防止刷菜单时重建导致浪费资源。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
if( DrillUp.g_COGN_preloadEnabled == true ){
	//==============================
	// * 预加载 - 初始化
	//==============================
	var _drill_COGN_preload_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_drill_COGN_preload_initialize.call(this);
		this.drill_COGN_preloadInit();
	}
	//==============================
	// * 预加载 - 版本校验
	//==============================
	if( Utils.generateRuntimeId == undefined ){
		alert( DrillUp.drill_COGN_getPluginTip_LowVersion() );
	}
	//==============================
	// * 预加载 - 资源提前预加载
	//
	//			说明：	> 遍历全部资源，提前预加载标记过的资源。
	//==============================
	Game_Temp.prototype.drill_COGN_preloadInit = function() {
		this._drill_COGN_cacheId = Utils.generateRuntimeId();	//资源缓存id
		this._drill_COGN_preloadTank = [];						//bitmap容器
		for( var i = 0; i < DrillUp.g_COGN_list.length; i++ ){
			var temp_data = DrillUp.g_COGN_list[i];
			if( temp_data == undefined ){ continue; }
			if( temp_data['symbol_src'] == undefined ){ continue; }
			
			// > B符号
			this._drill_COGN_preloadTank.push( 
				ImageManager.reserveBitmap( temp_data['symbol_src_file'], temp_data['symbol_src'], 0, true, this._drill_COGN_cacheId ) 
			);
			this._drill_COGN_preloadTank.push( 
				ImageManager.reserveBitmap( temp_data['symbolEx_src_file'], temp_data['symbolEx_src'], 0, true, this._drill_COGN_cacheId ) 
			);
			
			// > G额定值
			if( temp_data['specified_enable'] == true ){
				this._drill_COGN_preloadTank.push( 
					ImageManager.reserveBitmap( temp_data['specified_symbol_src_file'], temp_data['specified_symbol_src'], 0, true, this._drill_COGN_cacheId ) 
				);
				this._drill_COGN_preloadTank.push( 
					ImageManager.reserveBitmap( temp_data['specified_symbolEx_src_file'], temp_data['specified_symbolEx_src'], 0, true, this._drill_COGN_cacheId ) 
				);
			}
			
		}
	}

}


//=============================================================================
// ** 参数数字【Drill_COGN_NumberSprite】
// **			
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个贴图组合体，根据预设定义一个参数数字贴图。
// **		子功能：	
// **					->贴图『独立贴图』
// **						->显示贴图/隐藏贴图
// **						->是否就绪
// **						->优化策略
// **						->销毁
// **						->初始化数据
// **						->初始化对象
// **					->参数数字
// **						->延迟初始化
// **						->修改变化因子 数字【开放函数】
// **						->修改变化因子 字符串【开放函数】
// **						->修改额定值【开放函数】
// **						->修改额定值显示【开放函数】
// **						
// **					->A主体
// **						->内容层
// **							->排列层
// **						->外层
// **						->符号宽度
// **						->符号高度
// **					->B符号
// **						->基本符号bitmap
// **						->扩展符号bitmap
// **						->字符串转贴图
// **						->单字符转贴图
// **					->C排列
// **						->创建贴图
// **						->坐标分配
// **					->D变化因子
// **					->E输出字符串
// **						->设置字符串
// **						->设置前缀后缀
// **						->数字值 转 字符串
// **							->时间单位
// **						->零填充	x
// **					->F追逐值
// **						->字符串模式 的追逐
// **						->数字模式 的追逐
// **							->滚动效果 - 瞬间变化
// **							->滚动效果 - 弹性滚动
// **					->G额定值
// **						->设置字符串（继承）
// **						->设置前缀后缀（继承）
// **						->设置符号（继承）
// **					?->弹出数字（扣除超过某个量，直接扣除，弹出一个数字？）
// **					?->粒子
// **				
// **		说明：	> sprite贴在任意地方都可以。
// **				> 具体功能见 "1.系统 > 关于参数数字.docx"。
// **			  	> 你可以先取【DrillUp.g_COGN_list样式数据】再赋值各个额外属性，也可以【直接new】全参数自己建立控制。
// **			  	> 需要实时调用函数.drill_COGN_reflashValue(value)改变参数数字的值。
// **				  特殊情况可以直接使用字符串.drill_COGN_reflashString(str) 。
// **				> 刷新锁关系： F追逐值 > E输出字符串
// **
// **		代码：	> 范围 - 该类只对 具体的数值/字符串 提供可视化参数数字显示。
// **				> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并，主要靠接口控制 当前值 和 额定值。
// **				> 数量 - [单个/ ●多个 ] 
// **				> 创建 - [一次性/ ●自延迟 /外部延迟] 需要等 基本符号和扩展符号 加载完毕后，才进行切割划分。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
// **
// **		调用方法：	// > 参数数字 数据初始化
// **					//  （完整数据 默认值 见函数drill_initData）
// **						var number_id = 1;
// **						var temp_data = DrillUp.drill_COGN_getCopyedData( number_id );	//深拷贝数据
// **						temp_data['specified_enable'] = true;			//额定值启用
// **						temp_data['specified_visible'] = true;			//额定值显示
// **						temp_data['specified_conditionNum'] = 200;		//额定值
// **						temp_data['section_align'] = "右对齐";			//对齐方式	
// **					// > 参数数字 贴图初始化
// **						var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
// **						this.addChild( temp_sprite );
//=============================================================================
//==============================
// * 参数数字 - 定义
//==============================
function Drill_COGN_NumberSprite() {
	this.initialize.apply(this, arguments);
}
Drill_COGN_NumberSprite.prototype = Object.create(Sprite.prototype);
Drill_COGN_NumberSprite.prototype.constructor = Drill_COGN_NumberSprite;
//==============================
// * 参数数字 - 校验值
//==============================
DrillUp.g_COGN_checkType = true;
//==============================
// * 参数数字 - 初始化
//==============================
Drill_COGN_NumberSprite.prototype.initialize = function( data ) {
	Sprite.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	
	this.drill_initData();									//初始化数据
	this.drill_initSprite();								//初始化对象
};
//==============================
// * 参数数字 - 帧刷新
//==============================
Drill_COGN_NumberSprite.prototype.update = function() {
	if( this.drill_COGN_isReady() == false ){ return; }
	if( this.drill_COGN_isOptimizationPassed() == false ){ return; }
	
	Sprite.prototype.update.call(this);
	
	this.drill_sprite_updateDelayingInit();			//帧刷新 - 延迟初始化
	
													//帧刷新 - A主体（无）
													//帧刷新 - B符号（无）
													//帧刷新 - C排列（无）
													//帧刷新 - D变化因子（无）
	this.drill_updateChase();						//帧刷新 - F追逐值
	this.drill_updateOutputString();				//帧刷新 - E输出字符串
													//帧刷新 - G额定值（粘附在 E输出字符串 中）
};
//==============================
// * 参数数字 - 帧刷新 - 延迟初始化
//==============================
Drill_COGN_NumberSprite.prototype.drill_sprite_updateDelayingInit = function() {
	var data = this._drill_data;
	
	// > A主体
	if( this._drill_attr_needInit == true ){
		this._drill_attr_needInit = false;
		this._drill_width = Math.ceil( this._drill_symbol_bitmap.width /14 );
		this._drill_height = this._drill_symbol_bitmap.height;
	}
	
	// > B符号（无）
	
	// > C排列（无）
	
	// > D变化因子（无）
	
	// > E输出字符串
	if( this.visible != data['visible'] ){
		this.visible = data['visible'];
		this._drill_outputString_needUpdate = true;
		this.drill_updateOutputString();		//（显示时，强制刷新一下 输出字符串 ）
	}
	
	// > F追逐值（无）
	
	// > G额定值（无）
};
//##############################
// * 参数数字 - 显示贴图/隐藏贴图【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COGN_NumberSprite.prototype.drill_COGN_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 参数数字 - 是否就绪【标准函数】
//
//			参数：	> 无
//			返回：	> visible 布尔
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COGN_NumberSprite.prototype.drill_COGN_isReady = function(){
	if( this.drill_isSrcReady() == false ){ return false; }
	return true;
};
//##############################
// * 参数数字 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COGN_NumberSprite.prototype.drill_COGN_isOptimizationPassed = function(){
    return true;	//（暂无策略）
};
//##############################
// * 参数数字 - 销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 如果需要重建时。
//##############################
Drill_COGN_NumberSprite.prototype.drill_COGN_destroy = function(){
	this.drill_COGN_destroy_Private();
};

//##############################
// * 参数数字 - 修改变化因子 数字【开放函数】
//
//			参数：	> value 数字（变化因子值）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//					> 该插件只提供变换因子的参数数字显示效果，且 变化因子 可以超出 额定值，也可以为负数。
//##############################
Drill_COGN_NumberSprite.prototype.drill_COGN_reflashValue = function( value ){
	if( DrillUp.g_COGN_checkType && typeof value != "number" ){ alert( DrillUp.drill_COGN_getPluginTip_ErrorType1( value ) ); DrillUp.g_COGN_checkType = false; return; }
	this._drill_factor_value = value;
}
//##############################
// * 参数数字 - 修改变化因子 字符串【开放函数】
//
//			参数：	> value 字符串（变化因子值）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//					> 注意不要在帧刷新中同时调用这两类reflash函数。
//##############################
Drill_COGN_NumberSprite.prototype.drill_COGN_reflashString = function( str ){
	if( DrillUp.g_COGN_checkType && typeof str != "string" ){ alert( DrillUp.drill_COGN_getPluginTip_ErrorType2( str ) ); DrillUp.g_COGN_checkType = false; return; }
	this._drill_factor_string = str;
}
//##############################
// * 参数数字 - 修改额定值【开放函数】
//
//			参数：	> num 数字（额定值）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COGN_NumberSprite.prototype.drill_COGN_setSpecifiedNum = function( num ){
	var data = this._drill_data;
	data['specified_conditionNum'] = num;
}
//##############################
// * 参数数字 - 修改额定值显示【开放函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COGN_NumberSprite.prototype.drill_COGN_setSpecifiedNumVisible = function( visible ){
	var data = this._drill_data;
	data['specified_visible'] = visible;
}

//##############################
// * 参数数字 - 初始化数据『独立贴图』【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_COGN_NumberSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	/*
		DrillUp.drill_COGN_initStyle 提供了部分数据库设置的样式数据，
		样式数据中注释的参数，需要子插件根据自身情况来进行具体赋值。
	*/
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };														//A主体 - 平移x（非实时赋值）
	if( data['y'] == undefined ){ data['y'] = 0 };														//A主体 - 平移y（非实时赋值）
	if( data['rotation'] == undefined ){ data['rotation'] = 0 };										//A主体 - 旋转（非实时赋值）
	if( data['visible'] == undefined ){ data['visible'] = true };										//A主体 - 可见
	
	// > B符号
	if( data['symbol_src'] == undefined ){ data['symbol_src'] = "" };									//B符号 - 资源 基本符号
	if( data['symbol_src_file'] == undefined ){ data['symbol_src_file'] = "img/Special__number/" };		//B符号 - 资源文件夹
	if( data['symbolEx_src'] == undefined ){ data['symbolEx_src'] = "" };								//B符号 - 资源 扩展符号
	if( data['symbolEx_src_file'] == undefined ){ data['symbolEx_src_file'] = "img/Special__number/" };	//B符号 - 资源文件夹
	
	// > C排列
	if( data['section_align'] == undefined ){ data['section_align'] = "右对齐" };						//C排列 - 对齐方式
	if( data['section_spriteLength'] == undefined ){ data['section_spriteLength'] = 20 };				//C排列 - 最大符号数量
	if( data['section_interval'] == undefined ){ data['section_interval'] = 0 };						//C排列 - 符号间间距
	if( data['section_widthMode'] == undefined ){ data['section_widthMode'] = "不限制宽度" };			//C排列 - 排列宽度模式
	if( data['section_widthLimit'] == undefined ){ data['section_widthLimit'] = 300 };					//C排列 - 排列限制宽度
	
	// > D变化因子
	//	（无）
	
	// > E输出字符串
	if( data['symbol_hasNegative'] == undefined ){ data['symbol_hasNegative'] = true };					//E输出字符串 - 是否显示负号
	if( data['symbol_prefix'] == undefined ){ data['symbol_prefix'] = "" };								//E输出字符串 - 额外符号前缀
	if( data['symbol_suffix'] == undefined ){ data['symbol_suffix'] = "" };								//E输出字符串 - 额外符号后缀
	if( data['timeUnit_enable'] == undefined ){ data['timeUnit_enable'] = false };						//E输出字符串 - 时间单位 - 是否启用
	if( data['timeUnit_mode'] == undefined ){ data['timeUnit_mode'] = "时间(hh:mm:ss)" };				//E输出字符串 - 时间单位 - 格式结构
	if( data['timeUnit_unitType'] == undefined ){ data['timeUnit_unitType'] = "秒单位" };				//E输出字符串 - 时间单位 - 基础值单位
	if( data['timeUnit_timeChar'] == undefined ){ data['timeUnit_timeChar'] = "e" };					//E输出字符串 - 时间单位 - 时间格式符号
	
	// > F追逐值
	if( data['rolling_mode'] == undefined ){ data['rolling_mode'] = "弹性滚动" };						//F追逐值 - 滚动效果 - 滚动模式
	if( data['rolling_speed'] == undefined ){ data['rolling_speed'] = 10.0 };							//F追逐值 - 滚动效果 - 弹性变化速度
	
	// > G额定值
	if( data['specified_enable'] == undefined ){ data['specified_enable'] = false };											//G额定值 - 是否启用
	if( data['specified_visible'] == undefined ){ data['specified_visible'] = false };											//G额定值 - 是否显示
	if( data['specified_conditionType'] == undefined ){ data['specified_conditionType'] = "大于等于额定值时" };					//G额定值 - 额定条件
	if( data['specified_conditionNum'] == undefined ){ data['specified_conditionNum'] = 0 };									//G额定值 - 额定数值
	if( data['specified_remainChange'] == undefined ){ data['specified_remainChange'] = false };								//G额定值 - 达到条件后是否限制值
	if( data['specified_changeType'] == undefined ){ data['specified_changeType'] = "不变化" };									//G额定值 - 达到条件时符号
	if( data['specified_symbol_src'] == undefined ){ data['specified_symbol_src'] = "" };										//G额定值 - 额定基本符号资源
	if( data['specified_symbol_src_file'] == undefined ){ data['specified_symbol_src_file'] = "img/Special__number/" };			//G额定值 - 资源文件夹
	if( data['specified_symbolEx_src'] == undefined ){ data['specified_symbolEx_src'] = "" };									//G额定值 - 额定扩展符号资源
	if( data['specified_symbolEx_src_file'] == undefined ){ data['specified_symbolEx_src_file'] = "img/Special__number/" };		//G额定值 - 资源文件夹

};
//##############################
// * 参数数字 - 初始化对象『独立贴图』【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_COGN_NumberSprite.prototype.drill_initSprite = function() {
	this.drill_initAttr();					//初始化对象 - A主体
	this.drill_initSymbol();				//初始化对象 - B符号
	this.drill_initSection();				//初始化对象 - C排列
	this.drill_initFactor();				//初始化对象 - D变化因子
	this.drill_initOutputString();			//初始化对象 - E输出字符串
	this.drill_initChase();					//初始化对象 - F追逐值
	this.drill_initSpecified();				//初始化对象 - G额定值
};

//==============================
// * 参数数字 - 销毁（私有）
//==============================
Drill_COGN_NumberSprite.prototype.drill_COGN_destroy_Private = function() {
	this.visible = false;
	
	// > 销毁 - A主体
	this.drill_sprite_removeChildConnect( this._drill_contextLayer );	//（断开联系）
	this.drill_sprite_removeChildConnect( this._drill_outerLayer );
	this._drill_outerLayer = null;
	this._drill_contextLayer = null;
	
	// > 销毁 - B符号
	this._drill_symbol_bitmap = null;
	this._drill_symbolEx_bitmap = null;
	
	// > 销毁 - C排列
	this._drill_section_layer = null;
	this._drill_section_spriteTank.length = 0;
	
	// > 销毁 - D变化因子（无）
	
	// > 销毁 - E输出字符串（无）
	
	// > 销毁 - F追逐值（无）
	
	// > 销毁 - G额定值
	this._drill_specified_bitmap = null;
	this._drill_specifiedEx_bitmap = null;
}
//==============================
// * 参数数字 - 销毁 - 递归断开连接（私有）
//==============================
Drill_COGN_NumberSprite.prototype.drill_sprite_removeChildConnect = function( parent_sprite ){
	if( parent_sprite == undefined ){ return; }
	var sprite_list = parent_sprite.children;
	if( sprite_list == undefined ){ return; }
	for( var i = sprite_list.length-1; i >= 0; i-- ){
		var sprite = sprite_list[i];
		if( sprite == undefined ){ continue; }
		parent_sprite.removeChild( sprite );
		this.drill_sprite_removeChildConnect( sprite );
	}
};


//==============================
// * A主体 - 初始化对象
//==============================
Drill_COGN_NumberSprite.prototype.drill_initAttr = function() {
	this._drill_attr_needInit = true;				//A主体 - 延迟初始化锁
	this._drill_width = 0;							//A主体 - 宽度
	this._drill_height = 0;							//A主体 - 高度
	this._drill_contextLayer = null;						//A主体 - 内容层
	this._drill_outerLayer = null;						//A主体 - 外层
	
	// > 属性
	var data = this._drill_data;
	this.x = data['x'] ;	
	this.y = data['y'] ;	
	this.anchor.x = 0.5;	
	this.anchor.y = 0.5;	
	this.rotation = data['rotation'] /180 * Math.PI;	
	this.visible = false;
	
	// > 层级初始化
	this._drill_contextLayer = new Sprite();				//内容层（暂不考虑遮罩）
	this.addChild(this._drill_contextLayer);				//
	this._drill_outerLayer = new Sprite();				//外层
	this.addChild(this._drill_outerLayer);				//
}
//==============================
// * A主体 - 符号宽度（开放函数）
//==============================
Drill_COGN_NumberSprite.prototype.drill_width = function(){
	return this._drill_width;
}
//==============================
// * A主体 - 符号高度（开放函数）
//==============================
Drill_COGN_NumberSprite.prototype.drill_height = function() {
	return this._drill_height;
}


//==============================
// * B符号 - 初始化对象
//==============================
Drill_COGN_NumberSprite.prototype.drill_initSymbol = function() {
	this._drill_symbol_bitmap = null;				//B符号 - 基本符号bitmap
	this._drill_symbolEx_bitmap = null;				//B符号 - 扩展符号bitmap
	
	// > 符号bitmap
	var data = this._drill_data;
	this._drill_symbol_bitmap = ImageManager.loadBitmap( data['symbol_src_file'], data['symbol_src'], 0, true);
	this._drill_symbolEx_bitmap = ImageManager.loadBitmap( data['symbolEx_src_file'], data['symbolEx_src'], 0, true);
}
//==============================
// * B符号 - 资源是否准备就绪
//==============================
Drill_COGN_NumberSprite.prototype.drill_isSrcReady = function() {
	if( this._drill_symbol_bitmap.isReady() == false ){ return false; }
	if( this._drill_symbolEx_bitmap.isReady() == false ){ return false; }
	return true;
}
//==============================
// * B符号 - 刷新 主流程
//
//			说明：	> 此函数只修改 目标贴图 的bitmap和frame。
//					> 调用后立即变化。
//==============================
Drill_COGN_NumberSprite.prototype.drill_symbol_refresh = function(){
	
	this.drill_symbol_setSpriteTankByString(
		this._drill_section_spriteTank,			//C排列 贴图数组
		this._drill_outputString,				//E输出字符串
		this._drill_symbol_bitmap,
		this._drill_symbolEx_bitmap,
	);
}
//==============================
// * B符号 - 字符串转贴图 - 数组（开放函数）
//
//			说明：	> 此函数只修改 目标贴图 的bitmap和frame。
//					> 调用后立即变化。
//==============================
Drill_COGN_NumberSprite.prototype.drill_symbol_setSpriteTankByString = function( tar_spriteTank, cur_str, bitmap, bitmapEx ){
	
	for( var i = 0; i < tar_spriteTank.length; i++ ){
		var tar_sprite = tar_spriteTank[i];
		
		// > 超出字符串长度的置空
		if( i >= cur_str.length ){
			tar_sprite.bitmap = null;
			continue;
		}
		
		// > N个字符 转 N位符号贴图
		this.drill_symbol_setSpriteByString( tar_sprite, cur_str, i, bitmap, bitmapEx );
	}
}
//==============================
// * B符号 - 字符串转贴图 - 单个（开放函数）
//			
//			说明：	> 此函数只修改 目标贴图 的bitmap和frame。
//					> 此函数被后面的 额定值功能 继承。
//==============================
Drill_COGN_NumberSprite.prototype.drill_symbol_setSpriteByString = function( tar_sprite, cur_str, digit_index, bitmap, bitmapEx ){
	var tar_char = cur_str.charAt( digit_index );
	this.drill_setNumberBitmap( tar_sprite, tar_char, bitmap, bitmapEx );
}
//==============================
// * B符号 - 单字符转贴图（开放函数）
//		
//			参数：	> tar_sprite 贴图   （目标贴图）
//					> cur_char 字符     （目标字符）
//					> bitmap 贴图资源   （基本符号资源）
//					> bitmapEx 贴图资源 （扩展符号资源）
//			
//			说明：	> 此函数只修改 目标贴图 的bitmap和frame。
//					> 此功能可以作为一个单独的工具函数。
//==============================
Drill_COGN_NumberSprite.prototype.drill_setNumberBitmap = function( tar_sprite, tar_char, bitmap, bitmapEx ){
	
	// > 符号索引
	var temp_index = -1;
	var temp_char = tar_char.toLowerCase();
	if( temp_char == "0" ){
		temp_index = 0;
	}else if( temp_char == "1" ){
		temp_index = 1;
	}else if( temp_char == "2" ){
		temp_index = 2;
	}else if( temp_char == "3" ){
		temp_index = 3;
	}else if( temp_char == "4" ){
		temp_index = 4;
	}else if( temp_char == "5" ){
		temp_index = 5;
	}else if( temp_char == "6" ){
		temp_index = 6;
	}else if( temp_char == "7" ){
		temp_index = 7;
	}else if( temp_char == "8" ){
		temp_index = 8;
	}else if( temp_char == "9" ){
		temp_index = 9;
	}else if( temp_char == "+" ){
		temp_index = 10;
	}else if( temp_char == "-" ){
		temp_index = 11;
	}else if( temp_char == "x" || temp_char == "*" ){
		temp_index = 12;
	}else if( temp_char == "/" ){
		temp_index = 13;
		
	}else if( temp_char == "a" ){
		temp_index = 14;
	}else if( temp_char == "b" ){
		temp_index = 15;
	}else if( temp_char == "c" ){
		temp_index = 16;
	}else if( temp_char == "d" ){
		temp_index = 17;
	}else if( temp_char == "e" ){
		temp_index = 18;
	}else if( temp_char == "f" ){
		temp_index = 19;
	}else if( temp_char == "g" ){
		temp_index = 20;
	}else if( temp_char == "h" ){
		temp_index = 21;
	}else if( temp_char == "i" ){
		temp_index = 22;
	}else if( temp_char == "j" ){
		temp_index = 23;
	}else if( temp_char == "k" ){
		temp_index = 24;
	}else if( temp_char == "l" ){
		temp_index = 25;
	}else if( temp_char == "m" ){
		temp_index = 26;
	}else if( temp_char == "n" ){
		temp_index = 27;
	}else if( temp_char == " " ){	//（空格，空字符）
		temp_index = -1;
	}
	
	// > 设置资源
	if( temp_index < 14 ){
		tar_sprite.bitmap = bitmap;		//基本符号
	}else{
		tar_sprite.bitmap = bitmapEx;	//扩展符号
	}
	
	// > 设置贴图框架
	this.drill_setNumberFrame( tar_sprite, temp_index );
}
//==============================
// * B符号 - 单字符转贴图 - 设置贴图框架（私有）
//
//			说明：	> 框架固定分成14等分。
//==============================
Drill_COGN_NumberSprite.prototype.drill_setNumberFrame = function( tar_sprite, index ){
	var bitmap = tar_sprite.bitmap;
	var ww = Math.ceil( bitmap.width/14 );
	var hh = bitmap.height;
	var i = index % 14;
	if( i < 0 ){ ww = 0; hh = 0; }
	tar_sprite.drill_COGN_setFrame( ww*i, 0, ww, hh );
}
//==============================
// * B符号 - 单字符转贴图 - 浮点数过滤（私有）
//
//			说明：	> 用floor防止 浮点数 比较时，造成frame的反复刷新。
//==============================
Sprite.prototype.drill_COGN_setFrame = function( x, y, width, height ){
	this.setFrame( Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height) );
}


//==============================
// * C排列 - 初始化对象
//==============================
Drill_COGN_NumberSprite.prototype.drill_initSection = function() {
	this._drill_section_layer = null;				//C排列 - 排列层
	this._drill_section_spriteTank = [];			//C排列 - 贴图容器
	this._drill_section_lastStrLen = 0;				//C排列 - 字符串长度锁
	
	// > 排列层
	var data = this._drill_data;
	this._drill_section_layer = new Sprite();
	this._drill_section_layer.zIndex = 10;
	this._drill_contextLayer.addChild(this._drill_section_layer);
	
	// > 创建贴图
	this._drill_section_spriteTank = [];	
	for(var i=0; i < data['section_spriteLength']; i++){
		var temp_sprite = new Sprite();
		temp_sprite.x = 0;
		temp_sprite.y = 0;
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		this._drill_section_layer.addChild( temp_sprite );
		this._drill_section_spriteTank.push(temp_sprite);	
	}
}
//==============================
// * C排列 - 刷新 主流程
//
//			说明：	> 此函数在只修改 贴图坐标、缩放。
//					> 调用后立即变化。
//==============================
Drill_COGN_NumberSprite.prototype.drill_section_refresh = function(){
	
	// > 字符串长度锁（输出字符串的长度变化，排列才变化）
	if( this._drill_section_lastStrLen == this._drill_outputString.length ){ return; }
	this._drill_section_lastStrLen = this._drill_outputString.length;
	
	this.drill_section_refreshPosition( this._drill_outputString );
}
//==============================
// * C排列 - 刷新全部符号
//
//			说明：	> 此函数在只修改 贴图坐标、缩放。
//					> 调用后立即变化。
//==============================
Drill_COGN_NumberSprite.prototype.drill_section_refreshPosition = function( cur_str ){
	var data = this._drill_data;
	
	// > 长度计算
	var str_len = cur_str.length;
	if( str_len > this._drill_section_spriteTank.length ){
		str_len = this._drill_section_spriteTank.length;
	}
	var section_width = this.drill_width() + data['section_interval'];		//单字符长度
	var section_widthTotal = str_len * section_width;						//总长度
	if( section_widthTotal > data['section_widthLimit'] && data['section_widthMode'] == "挤压限制" ){
		section_widthTotal = data['section_widthLimit'];
		section_width = Math.floor( section_widthTotal / str_len );
	}
	
	// > 坐标分配
	for( var i = 0; i < str_len; i++ ){
		var temp_sprite = this._drill_section_spriteTank[i];
		if( data['section_align'] == "右对齐" ){
			temp_sprite.x = i * section_width - section_widthTotal + this.drill_width()*0.5;
			temp_sprite.y = 0;
		}else if( data['section_align'] == "左对齐" ){
			temp_sprite.x = i * section_width + this.drill_width()*0.5;
			temp_sprite.y = 0;
		}else{		//居中
			temp_sprite.x = i * section_width - section_widthTotal * 0.5 + this.drill_width()*0.5;
			temp_sprite.y = 0;
		}
	}
	
	// > 排列层 缩放
	if( data['section_widthMode'] == "缩放限制" ){
		if( section_widthTotal > data['section_widthLimit'] ){
			this.scale.x = data['section_widthLimit'] / section_widthTotal ; 
		}else{
			this.scale.x = 1.0;
		}
	}
}


//==============================
// * D变化因子 - 初始化对象
//==============================
Drill_COGN_NumberSprite.prototype.drill_initFactor = function() {
	this._drill_factor_value = 0;				//变化因子 - 数字【使用时只读】
	this._drill_factor_string = "";				//变化因子 - 字符串【使用时只读】
};
//==============================
// * D变化因子 - 是否为 字符串模式（开放函数）
//==============================
Drill_COGN_NumberSprite.prototype.drill_factor_isStringMode = function() {
	return this._drill_factor_string != "";
};
//==============================
// * D变化因子 - 是否为 数字模式（开放函数）
//==============================
Drill_COGN_NumberSprite.prototype.drill_factor_isNumberMode = function() {
	return this._drill_factor_string == "";
};


//==============================
// * E输出字符串 - 初始化对象
//==============================
Drill_COGN_NumberSprite.prototype.drill_initOutputString = function() {
	this._drill_outputString = "";					//E输出字符串 - 本体
	this._drill_outputString_needUpdate = false;	//E输出字符串 - 刷新锁
};
//==============================
// * E输出字符串 - 帧刷新
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateOutputString = function() {
	
	// > 刷新锁 - E输出字符串
	if( this._drill_outputString_needUpdate == false ){ return; }
	this._drill_outputString_needUpdate = false;
	
	
	// > E输出字符串 - 设置字符串
	this.drill_outputString_setString();
	
	// > E输出字符串 - 设置前缀后缀
	this.drill_outputString_setPrefixAndSuffix();
	
	
	// > 刷新 - B符号
	this.drill_symbol_refresh();
	
	// > 刷新 - C排列
	this.drill_section_refresh();
}
//==============================
// * E输出字符串 - 设置字符串
//			
//			说明：	> 此函数被后面的 额定值功能 继承。
//==============================
Drill_COGN_NumberSprite.prototype.drill_outputString_setString = function() {
	
	// > 字符串模式
	if( this.drill_factor_isStringMode() ){
		this._drill_outputString = this._drill_factor_string;
	}
	
	// > 数字模式
	if( this.drill_factor_isNumberMode() ){
		this._drill_outputString = this.drill_convertNumberToString( this._drill_chase_curValue );
	}
}
//==============================
// * E输出字符串 - 设置前缀后缀
//			
//			说明：	> 此函数被后面的 额定值功能 继承。
//==============================
Drill_COGN_NumberSprite.prototype.drill_outputString_setPrefixAndSuffix = function() {
	var data = this._drill_data;
	this._drill_outputString = data['symbol_prefix'] + this._drill_outputString;
	this._drill_outputString = this._drill_outputString + data['symbol_suffix'];
}
//==============================
// * E输出字符串 - 数字值 转 字符串
//			
//			说明：	> 此函数生成的字符串只能在 [0-9][a-n][+-x/ ] 的范围内（对应 字符转贴图 功能）。
//==============================
Drill_COGN_NumberSprite.prototype.drill_convertNumberToString = function( value ){
	var data = this._drill_data;
	var result_str = "";
	if( isNaN( value ) ){ return ""; }
	
	// > 默认数字 情况
	result_str = String( value );
	if( data['symbol_hasNegative'] == false ){		//没有负号时，去掉负号
		result_str = String( Math.abs( value ) );
	}
	
	// > 时间单位 情况
	//		（不要考虑日期情况，Date() 的日期包含大小月、闰年问题、1970年问题）
	if( data['timeUnit_enable'] == true ){
		if( data['timeUnit_unitType'] == "秒单位" ){
			value *= 60;
		}
		
		var ff = Math.floor(value) %60;
		var ss = Math.floor(value /60) %60;
		var mm = Math.floor(value /3600) %60;
		var hh = Math.floor(value /216000 );
		
		if( data['timeUnit_mode'] == "时间(mm:ss)" ){
			var mm_2 = Math.floor(value /3600);
			if( value > 3600 ){
				result_str = String(mm_2) + ":" + String(ss).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 60 ){
				result_str = String(ss);
			}else{
				//（不显示）
			}
		}
		if( data['timeUnit_mode'] == "时间(mm:ss)+零填充" ){
			var mm_2 = Math.floor(value /3600);
			result_str = String(mm_2).padZero(2) + ":" + String(ss).padZero(2);
			result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
		}
		if( data['timeUnit_mode'] == "时间(hh:mm:ss)" ){
			if( value > 216000 ){
				result_str = String(hh) + ":" + String(mm).padZero(2) + ":" + String(ss).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 3600 ){
				result_str = String(mm) + ":" + String(ss).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 60 ){
				result_str = String(ss);
			}else{
				//（不显示）
			}
		}
		if( data['timeUnit_mode'] == "时间(hh:mm:ss)+零填充" ){
			result_str = hh.padZero(2) + ":" + String(mm).padZero(2) + ":" + String(ss).padZero(2);
			result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
		}
		if( data['timeUnit_mode'] == "逐帧计时器(hh:mm:ss ff)" ){
			if( value > 216000 ){
				result_str = String(hh) + ":" + String(mm).padZero(2) + ":" + String(ss).padZero(2) + " " + String(ff).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 3600 ){
				result_str = String(mm) + ":" + String(ss).padZero(2) + " " + String(ff).padZero(2);
				result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
			}else if( value > 60 ){
				result_str = String(ss) + " " + String(ff).padZero(2);
			}else{
				result_str = String(ff);
			}
		}
		if( data['timeUnit_mode'] == "逐帧计时器(hh:mm:ss ff)+零填充" ){
			result_str = hh.padZero(2) + ":" + String(mm).padZero(2) + ":" + String(ss).padZero(2) + " " + String(ff).padZero(2);
			result_str = result_str.replace(/:/g, data['timeUnit_timeChar']);
		}
	}
	
	return result_str;
}


//==============================
// * F追逐值 - 初始化对象
//==============================
Drill_COGN_NumberSprite.prototype.drill_initChase = function() {
	this._drill_chase_curValue = -1;				//F追逐值 - 当前数值
	this._drill_chase_curString = "";				//F追逐值 - 当前字符串
}
//==============================
// * F追逐值 - 帧刷新
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateChase = function() {
	
	// > 字符串模式 的追逐
	if( this.drill_factor_isStringMode() == true ){
		if( this._drill_chase_curString == this._drill_factor_string ){ return; }
		
		this._drill_chase_curString = this._drill_factor_string;
		
		// > 刷新锁 - E输出字符串
		//		（字符串刷新时，输出字符串才变化）
		this._drill_outputString_needUpdate = true;
	}
	
	// > 数字模式 的追逐
	if( this.drill_factor_isNumberMode() == true ){
		if( this._drill_chase_curValue == this._drill_factor_value ){ return; }
		var data = this._drill_data;
		
		// > F追逐值 - 滚动效果 - 瞬间变化
		if( data['rolling_mode'] == "瞬间变化" || data['rolling_time'] == 1 ){
			this._drill_chase_curValue = this._drill_factor_value;
		}
		
		// > F追逐值 - 滚动效果 - 弹性滚动
		if( data['rolling_mode'] == "弹性滚动" ){
			var move = (this._drill_factor_value - this._drill_chase_curValue) / data['rolling_speed'];
			if( move > 0 && move < 1 ){ 
				this._drill_chase_curValue = this._drill_factor_value; 
			}else if( move < 0 && move > -1 ){
				this._drill_chase_curValue = this._drill_factor_value; 
			}else {
				move = Math.floor( move );
				this._drill_chase_curValue += move;
			}
		}
		
		// > 刷新锁 - E输出字符串
		//		（数字滚动刷新时，输出字符串才变化）
		this._drill_outputString_needUpdate = true;
	}
}


//==============================
// * G额定值 - 初始化对象
//
//			说明：	额定值是在前面 E输出字符串、B符号、C排列 的基础上，进一步扩展的功能。
//					因此额定值的功能全被单独分离到这里。
//==============================
Drill_COGN_NumberSprite.prototype.drill_initSpecified = function() {
	this._drill_specified_bitmap = null;			//G额定值 - 额定基本符号bitmap
	this._drill_specifiedEx_bitmap = null;			//G额定值 - 额定扩展符号bitmap
	this._drill_specified_curConditionNum = -1;		//G额定值 - 当前额定值
	this._drill_specified_checkString = "";			//G额定值 - 资源指向字符（贴图用）
	
	// > 额定符号bitmap
	var data = this._drill_data;
	if( data['specified_enable'] != true ){ return; }
	if( data['symbol_src'] == "" ){
		this._drill_specified_bitmap = ImageManager.loadEmptyBitmap();
	}else{
		this._drill_specified_bitmap = ImageManager.loadBitmap( data['specified_symbol_src_file'], data['specified_symbol_src'], 0, true);
	}
	if( data['symbolEx_src'] == "" ){
		this._drill_specifiedEx_bitmap = ImageManager.loadEmptyBitmap();
	}else{
		this._drill_specifiedEx_bitmap = ImageManager.loadBitmap( data['specified_symbolEx_src_file'], data['specified_symbolEx_src'], 0, true);
	}
}
//==============================
// * G额定值 - 设置字符串（继承）
//==============================
var _drill_COGN_specified_setString = Drill_COGN_NumberSprite.prototype.drill_outputString_setString;
Drill_COGN_NumberSprite.prototype.drill_outputString_setString = function() {
	_drill_COGN_specified_setString.call(this);
	
	// > 额定符号 资源标记
	this._drill_specified_checkString = this.drill_specified_getFillString( "1", this._drill_outputString.length );
	
	// > 帧刷新输出字符串
	this.drill_updateSpecified();
}
//==============================
// * G额定值 - 设置前缀后缀（继承）
//==============================
var _drill_COGN_specified_setPrefixAndSuffix = Drill_COGN_NumberSprite.prototype.drill_outputString_setPrefixAndSuffix
Drill_COGN_NumberSprite.prototype.drill_outputString_setPrefixAndSuffix = function() {
	_drill_COGN_specified_setPrefixAndSuffix.call(this);
	
	// > 额定符号 资源标记（前缀后缀）
	var data = this._drill_data;
	this._drill_specified_checkString = this.drill_specified_getFillString( "2",String(data['symbol_prefix']).length ) + this._drill_specified_checkString;	//资源指向字符（贴图用）
	this._drill_specified_checkString = this._drill_specified_checkString + this.drill_specified_getFillString( "3",String(data['symbol_suffix']).length );
}
//==============================
// * G额定值 - 字符串转贴图 - 单个（继承）
//==============================
var _drill_COGN_specified_setSpriteByString = Drill_COGN_NumberSprite.prototype.drill_symbol_setSpriteByString;
Drill_COGN_NumberSprite.prototype.drill_symbol_setSpriteByString = function( tar_sprite, cur_str, digit_index, bitmap, bitmapEx ){
	
	// > 额定符号资源 设置
	//		（每位符号转贴图时，根据额定符号情况，决定是否用 额定符号资源 ）
	var temp_char2 = this._drill_specified_checkString.charAt( digit_index );
	if( temp_char2 == "s" ){
		bitmap = this._drill_specified_bitmap;
		bitmapEx = this._drill_specifiedEx_bitmap;
	}
	_drill_COGN_specified_setSpriteByString.call( this, tar_sprite, cur_str, digit_index, bitmap, bitmapEx );
}
//==============================
// * G额定值 - 帧刷新
//==============================
Drill_COGN_NumberSprite.prototype.drill_updateSpecified = function() {
	if( this.drill_factor_isNumberMode() != true ){ return; }	//（只有 数字模式 才设额定值）
	var data = this._drill_data;
	if( data['specified_enable'] != true ){ return; }
	
	// > 刷新锁 - E输出字符串
	//		（额定值刷新时，输出字符串变化）
	if( this._drill_specified_curConditionNum != data['specified_conditionNum'] ){
		this._drill_specified_curConditionNum = data['specified_conditionNum'];
		this._drill_outputString_needUpdate = true;
	}
		
	// > 额定判断
	var is_fit = false;
	if( data['specified_conditionType'] == "小于额定值时" ){
		is_fit = this._drill_factor_value < this._drill_specified_curConditionNum;
	}else if( data['specified_conditionType'] == "大于额定值时" ){
		is_fit = this._drill_factor_value > this._drill_specified_curConditionNum;
	}else if( data['specified_conditionType'] == "等于额定值时" ){
		is_fit = this._drill_factor_value == this._drill_specified_curConditionNum;
	}else if( data['specified_conditionType'] == "小于等于额定值时" ){
		is_fit = this._drill_factor_value <= this._drill_specified_curConditionNum;
	}else if( data['specified_conditionType'] == "大于等于额定值时" ){
		is_fit = this._drill_factor_value >= this._drill_specified_curConditionNum;
	}
	
	// > 保持额定值
	if( is_fit && data['specified_remainChange'] == true ){
		var num_str = this.drill_convertNumberToString( this._drill_specified_curConditionNum );
		this._drill_outputString = num_str;
		this._drill_specified_checkString = this.drill_specified_getFillString( "1", num_str.length );		//资源指向字符（贴图用）
	}
	// > 显示额定值 (120/100)
	if( data['specified_visible'] == true ){
		var num_str = this.drill_convertNumberToString( this._drill_specified_curConditionNum );
		this._drill_outputString += "/" + num_str;
		this._drill_specified_checkString += this.drill_specified_getFillString( "4", num_str.length +1 );	//资源指向字符（贴图用）
	}
	
	// > 变为额定符号
	if( is_fit ){
		//	每创建一个字符串时，都会在 this._drill_specified_checkString 中追加 资源指向字符，字符含义如下：
		// 		1 参数值
		// 		2 前缀
		// 		3 后缀
		// 		4 额定值
		
		if( data['specified_changeType'] == "所有符号变为额定符号" ){
			this._drill_specified_checkString = this.drill_specified_getFillString( "s",this._drill_specified_checkString.length );
		}
		if( data['specified_changeType'] == "有效符号变为额定符号" ){
			this._drill_specified_checkString = this._drill_specified_checkString.replace( /[1]/g, "s" );
			this._drill_specified_checkString = this._drill_specified_checkString.replace( /[4]/g, "s" );
		}
		if( data['specified_changeType'] == "只参数符号变为额定符号" ){
			this._drill_specified_checkString = this._drill_specified_checkString.replace( /[1]/g, "s" );
		}
	}
};
//==============================
// * G额定值 - 填充重复字符
//==============================
Drill_COGN_NumberSprite.prototype.drill_specified_getFillString = function( str, len ){
	var temp_str = "";
	for( var i=0; i < len; i++ ){
		temp_str += str;
	}
	return temp_str;
};

