// function whenDOMReady() {
//     // pjax加载完成（切换页面）后需要执行的函数和代码
//     cardTimes("pjax开启");
// }
//侧边栏日历卡片
function cardTimes() {
    year = now.getFullYear(),
    month = now.getMonth(),
    week = now.getDay(),
    date = now.getDate();
    var year_flag = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false;
    switch (week) {
        case 0: weekStr = "周日"; break;
        case 1: weekStr = "周一"; break;
        case 2: weekStr = "周二"; break;
        case 3: weekStr = "周三"; break;
        case 4: weekStr = "周四"; break;
        case 5: weekStr = "周五"; break;
        case 6: weekStr = "周六"; break;
        default: console.log("异常情况");
    }
    switch (month) {
        case 0: monthStr = "一月"; dates = 31; break;
        case 1: monthStr = "二月"; dates = year_flag ? 29 : 28; break;
        case 2: monthStr = "三月"; dates = 31; break;
        case 3: monthStr = "四月"; dates = 30; break;
        case 4: monthStr = "五月"; dates = 31; break;
        case 5: monthStr = "六月"; dates = 30; break;
        case 6: monthStr = "七月"; dates = 31; break;
        case 7: monthStr = "八月"; dates = 31; break;
        case 8: monthStr = "九月"; dates = 30; break;
        case 9: monthStr = "十月"; dates = 31; break;
        case 10: monthStr = "十一月"; dates = 30; break;
        case 11: monthStr = "十二月"; dates = 31; break;
        default: console.log("异常情况");
    }
    var week_first = (week + 8 - date % 7) % 7;
    var count_days = "";
    var count_flag = false;
    var ds;
    var row_h = 7 - week_first; //第一行天数
    var row_f = (dates - row_h) % 7; //最后一行的天数
    var rows = row_f == 0 ? Math.floor((dates - row_h) / 7) + 1 : Math.floor((dates - row_h) / 7) + 2;
    var calendar = document.getElementById("calendar-main");
    var gap = document.getElementById("calendar-date");
    switch (rows) {
        case 4: gap.style.marginBottom = "";break;
        case 5: gap.style.marginBottom = "1.2rem";break;
        case 6: gap.style.marginBottom = "2.4rem";break;
        default: gap.style.marginBottom = "2.4rem";
    }
    for (let r = 0; r < rows; r++) {
        if (calendar.querySelector(".calendar-r" + r) == null) {
            calendar.innerHTML += "<div class='calendar-r"+r+"'></div>";
        }
        for (let d = 0; d < 7; d++) {
            if (r == 0 && d == week_first) { //本月第一天
                count_days = 1;
                count_flag = true;
            }
            if (count_days == date) { //当日日期
                ds = " class='now'";
            } else ds = "";
            if (calendar.querySelector(".calendar-r" + r + " .calendar-d" + d + " a") == null) {
                calendar.querySelector(".calendar-r"+r).innerHTML += "<div class='calendar-d"+d+"'><a"+ds+">"+count_days+"</a></div>";
            }
            if (count_days >= dates) {
                count_days = "";
                count_flag = false;
            }
            if (count_flag) count_days += 1;
        }
    }
    var lunar = chineseLunar.solarToLunar(new Date(year, month, date));
    animalYear = chineseLunar.format(lunar, "A"); //生肖属相
    ganzhiYear = chineseLunar.format(lunar, "T").slice(0, -1); //天干地支
    lunarMon = chineseLunar.format(lunar, "M"); //月份
    lunarDay = chineseLunar.format(lunar, "d"); //日期
    asideTime = new Date("2023/01/01 00:00:00");	// 侧边栏倒计时
    asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
    asideDayNum = Math.floor(asideDay);
    var asideWeekNum = ((week - asideDayNum % 7) >= 0) ? (Math.ceil(asideDayNum / 7)) : (Math.ceil(asideDayNum / 7) + 1);
    var c_m = document.getElementById("calendar-month");
    var c_w = document.getElementById("calendar-week");
    var c_d = document.getElementById("calendar-date");
    var c_a = document.getElementById("calendar-animal");
    var c_l = document.getElementById("calendar-lunar");
    var a_t_l = document.getElementById("aside-time-left");
    if (c_m) c_m.innerHTML = monthStr; //月份
    if (c_w) c_w.innerHTML = weekStr; //星期
    if (c_d) c_d.innerHTML = date.toString().padStart(2, '0'); //日期
    if (c_a) c_a.innerHTML = ganzhiYear + animalYear + "年"; //年份
    if (c_l) c_l.innerHTML = lunarMon + lunarDay; //农历
    if (a_t_l) a_t_l.innerHTML = year + "&nbsp;&nbsp;<a style='font-size:1.1rem;font-weight:bold;'>第</a>&nbsp;" + asideWeekNum + "&nbsp;<a style='font-size:1.1rem;font-weight:bold;'>周</a>";
}
// whenDOMReady(),// 打开网站先执行一次
// document.addEventListener("pjax:complete", whenDOMReady); // pjax加载完成（切换页面）后再执行一次



