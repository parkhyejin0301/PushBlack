/* 주소창값 가져오기 */
function RequestGet(name) {
    let result = "";
    let url = location.href;
    let tmp = "";
    if (url.trim() != "" && url.indexOf("?") > -1) {
        url = url.substring(url.indexOf("?") + 1);
        if (url.indexOf("&") > -1) {
            let paramData = url.split('&');
            
            for (let i = 0; i < paramData.length; i++) {
                if (paramData[i].indexOf("=") > -1) {
                    tmp = paramData[i].split('=');
                    if (tmp[0] === name) {
                        result = tmp[1];
                        break;
                    }
                }
            }
        } else if (url.indexOf("=") > -1) {
            tmp = url.split('=');
            if (tmp[0] === name) {
                result = tmp[1];
            }
        }
    }

    return result;
};

function IsNullOrEmpty(str) {
    try {
        if (str === null) {
            return true;
        } else {
            if (String(str).trim() === "") {
                return true;
            } else {
                return false;
            }
        }
    } catch (e) {
        console.log(e.message);
        return true;
    }
};

$.fn.delayFocus = function (sec) {
    let targetID = $(this).attr("id");
    console.log(targetID);
    if (document.getElementById(targetID) != null) {
        setTimeout(function () {
            document.getElementById(targetID).focus();
        }, sec * 1000);
    }
};

function CalendarByID(targetID) {
    if (document.getElementById(targetID) != null) {
        $('#' + targetID).datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            yearRange: '1950:2050',
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            showMonthAfterYear: true,
            yearSuffix: '년'
        });
    }
};

function CalendarByClass(targetClass) {
    $('.' + targetClass).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2050',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });
};



function fnLogout() {
    Confirm("정말로 로그아웃하시겠습니까?", function () {
        document.location.href = '/Api/MemberLogout';
    });
};

function EditorBind(targetID) {
    if (document.getElementById(targetID) !== null) {
        tinymce.init({
            selector: 'textarea#' + targetID,
            height: 500,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste image wordcount'
            ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            file_picker_types: 'image',
            file_picker_callback: function (cb, value, meta) {
                let input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                    let file = this.files[0];
                    let formData = new FormData();
                    formData.append("upload", file);
                    console.log(cb);
                    console.log(file);
                    $.ajax({
                        //url: "/Api/File/Upload",
                        url: "/adm/Api/FileUpload",
                        data: formData,
                        type: 'POST',
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        cache: false,
                        success: function (rst) {
                            if (rst.Check) {
                                cb(rst.Value, { title: file.name });
                            } else {
                                console.log("!");
                            }
                        }
                        
                    });
                };
                input.click();
            },
        });
    }
};

function GetEditor() {
    let tmp = tinymce.activeEditor.getContent();
    while (tmp.indexOf("../../") > 0) {
        tmp = tmp.replace("../../", "/");
    }
    return escape(tmp);
};

function Alert(msg, callback) {
    Swal.fire("Alert", msg, "success").then(function () {
        if (callback !== null && typeof callback === "function") {
            callback();
        }
    });
};

function RedAlert(msg, callback) {
    Swal.fire("Alert", msg, "error").then(function () {
        if (callback !== null && typeof callback === "function") {
            callback();
        }
    });
};

function Confirm(msg, callback) {
    Swal.fire({
        title: "Are you sure?",
        text: msg,
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#ff3d60",
        confirmButtonText: "Yes, do it!"
    }).then(function (t) {
        if (t.value) {
            if (callback !== null && typeof callback === "function") {
                callback();
            }
        }
    });
};

function fnFileUpload(obj) {
    if (obj !== null && obj.File !== null) {
        console.log(obj);
        let tag = "";
        tag += "<div style=\"display:none;\">";
        tag += "<form name=\"uploadForm\" id=\"uploadForm\" enctype=\"multipart/form-data\" method=\"post\" action=\"/Api/File/Upload\">";
        tag += "</form>";
        tag += "</div>";
        $("body").append(tag).promise().done(function () {
            let formtag = $('#uploadForm');
            let formData = new FormData(formtag[0]);
            formData.append("upload", obj.File.files[0]);

            let ajax_url = "";
            if (obj.type !== null) {
                switch (String(obj.type).trim().toUpperCase()) {
                    case "THUMBNAIL":
                        ajax_url = "/adm/Api/File/Thumbnail";
                        if (obj.width === null || obj.height === null) {
                            if (obj.callback !== null && typeof (obj.callback) === "function") {
                                obj.callback({ Code: -1, Check: false, Message: "width, height 값이 지정되어야 합니다." });
                            }
                            $('#uploadForm').remove();
                            return;
                        } else {
                            formData.append("width", obj.width);
                            formData.append("height", obj.height);
                        }
                        break;
                    case "CROP":
                        ajax_url = "/adm/Api/FileCrop";
                        if (obj.width === null || obj.height === null) {
                            if (obj.callback !== null && typeof (obj.callback) === "function") {
                                obj.callback({ Code: -1, Check: false, Message: "width, height 값이 지정되어야 합니다." });
                            }
                            $('#uploadForm').remove();
                            return;
                        } else {
                            formData.append("width", obj.width);
                            formData.append("height", obj.height);
                        }
                        break;
                    default:
                        ajax_url = "/adm/Api/FileUpload";
                        break;
                }
            }

            console.log(formData);

            $.ajax({
                url: ajax_url,
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                dataType: 'json',
                cache: false,
                success: function (rst) {
                    $('#uploadForm').remove();
                    if (obj.callback !== null && typeof (obj.callback) === "function") {
                        obj.callback(rst);
                    }
                }
            });
        });
    }
};

function fnFileErase(obj) {
    if (obj !== null && obj.File !== null) {
        Swal.fire({
            title: 'Are you sure?',
            text: "삭제된 데이터는 복구할 수 없습니다.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '$success',
            cancelButtonColor: '$danger',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                $.post("/Api/File/Erase", { fileURL: obj.File }, function (rst) {
                    if (obj.callback !== null && typeof (obj.callback) === "function") {
                        obj.callback(rst);
                    }
                });
            }
        });
    }
};

/* 비밀번호 정규식 */
function RequiredPasswordCheck(targetValue) {
    let Rep_Pwd = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    if (!Rep_Pwd.test(targetValue)) {
        return false;
    } else {
        return true;
    }
};

function RequiredPasswordLevel(targetValue) {
    let result = 0;
    let strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    let mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    let okRegex = new RegExp("(?=.{8,}).*", "g");

    if (strongRegex.test(targetValue)) {
        result = 3;
    } else if (mediumRegex.test(targetValue)) {
        result = 2;
    } else if (okRegex.test(targetValue)) {
        result = 1;
    } else {
        result = 0;
    }

    return result;
};

/* 한글이름 정규식 */
function RequiredKoreanNameCheck(targetValue) {
    let Rep_KorName = /[가-힣]{2,4}/gi;
    return Rep_KorName.test(targetValue);
};

/* 닉네임 정규식 */
function RequiredNickNameCheck(targetValue) {
    let Rep_NickName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/gi;
    return Rep_NickName.test(targetValue);
};

//로딩 스크립트
function fnLoading(opt, callback) {
    console.log(opt);
    if (opt) {
        if (document.getElementById("LoadingAnimationLayer") === null) {
            let tags = '<div id="LoadingAnimationLayer" class="LoadingAnimation">';
            tags += '<img src="/Content/loading.png" width="100" height="100" alt="잠시만 기다려주세요" />';
            tags += '</div>';
            $("body").append(tags).promise().done(function () {
                if (callback !== null && typeof callback === "function") {
                    setTimeout(function () {
                        callback();
                    }, 500);
                }
            });
        } else {
            if (callback !== null && typeof callback === "function") {
                setTimeout(function () {
                    callback();
                }, 500);
            }
        }
    } else {
        if (document.getElementById("LoadingAnimationLayer_") !== null) {
            $("#LoadingAnimationLayer").fadeOut(200, function () {
                $("#LoadingAnimationLayer").remove();
                if (callback !== null && typeof callback === "function") {
                    setTimeout(function () {
                        callback();
                    }, 500);
                }
            });
        } else {
            $(".LoadingAnimation").fadeOut(200, function () {
                $("#LoadingAnimationLayer").remove();
                if (callback !== null && typeof callback === "function") {
                    setTimeout(function () {
                        callback();
                    }, 500);
                }
            });
        }
    }
};

function fnClick(targetID) {
    if (document.getElementById(targetID) !== null) {
        $("#" + targetID).click();
    }
};

//뒤로가기
function goBack() {
    window.history.back();
};

//hasAttr 커스텀함수, 박경호, 2021-04-20
$.fn.hasAttr = function(name) {  
    return this.attr(name) !== undefined;
 };