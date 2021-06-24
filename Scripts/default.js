$(document).ready(function() {

}); // document.ready

//SweetAlert 함수화, 팀장님작성 퍼옴
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
        text: msg,
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#3674f8",
        cancelButtonColor: "#ff5d5d",
        confirmButtonText: "네, 진행할게요",
        cancelButtonText: "취소"
    }).then(function (t) {
        if (t.value) {
            if (callback !== null && typeof callback === "function") {
                callback();
            }
        }
    });
};

//비밀번호 정규식 (8~24자 영문대소문자, 숫자, 특수문자 혼합 사용)
function isPassword(str) {
    let reg = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{7,23}$/
    if (!reg.test(str)) {
        return false;
    }
    else {
        return true;
    };
};

//닉네임 정규식 (한글, 영문, 숫자, 2~24자), 박경호, 2021-05-17
function isNickname(str) {
    if ( str !== null && str !== "" ) {
        let reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*].{1,23}$/;
        if ( !reg.test(str) ) {
            return false;
        } else {
            return true;
        };
    };
};
//toastr Alert option설정, 2021-06-16
toastr.options = {
    closeButton: false,
    progressBar: false,
    showMethod: 'slideDown',
    timeOut: 1500
};

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("invalid", e => {
        e.preventDefault();
        if (e.target.value.IsNullOrEmpty()) {
            toastr.error(e.target.getAttribute("placeholder"));
        } else {
            toastr.error("올바른 형식이 아닙니다.<br/>".concat(e.target.getAttribute("placeholder")));
        }
    });
});

String.prototype.IsNullOrEmpty = function () {
    if (this !== null) {
        if (this !== undefined) {
            if (this.toString().trim() === "") {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
};