var exmaru = (function() {
    return {
        gotoURL: function (url) {
            location.href = url;
        },
        reload: function () {
            document.location.reload();
        },
        IsNullOrEmpty: function (str) { 
            if (str == null || String(str).trim() == "") { 
                return true; 
            } else { 
                return false; 
            } 
        }, 
        addComma: function(obj) {
            return Number(obj).toLocaleString();
        },
        snsLogin : function(obj) {
            let result = { Check : false, Code : -1, Message : "", Value : "" };

            if (obj != null && obj.formid != null && document.getElementById(obj.formid) != null) {
                let jsonData = $("#" + obj.formid).toJson();

                if (obj.type != null) {
                    switch (String(obj.type).trim().toLowerCase()) {
                        case "naver":
                            result.Message = "준비중입니다.";
                            break;
                        case "kakao":
                            result.Message = "준비중입니다.";
                            break;
                        case "facebook":
                            result.Message = "준비중입니다.";
                            break;
                        case "twitter":
                            result.Message = "준비중입니다.";
                            break;
                        default:
                            result.Message = "지원되지 않는 SNS 서비스 입니다.";
                            break;
                    }
                } else {
                    result.Message = "type이 지정되지 않았습니다.";
                }
            } else {
                result.Message = "formid가 지정되지 않았습니다.";
            }

            if (obj != null && obj.callback != null && typeof obj.callback == "function") {
                obj.callback(result);
            }
        },
        packageFileUpload : function(obj) {
            console.log(obj);
            if (obj != null && obj.formID != null && document.getElementById(obj.formID) != null) {
                var form = $('#' + obj.formID);
                var formData = new FormData(form[0]);
                console.log(form.toJson());

                $.ajax({
                    url: "/Proc/PackageFile/Upload",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    cache: false,
                    success: function (rst) {
                        console.log(rst);
                        if (obj.callback != null && typeof (obj.callback) == "function") {
                            obj.callback(rst);
                        }
                    }
                });
            } else {
                if (obj.callback != null && typeof (obj.callback) == "function") {
                    obj.callback({ Check : false, Code : -1, Message : "대상 폼을 찾을 수 없습니다.", Value : "" });
                }
            }
        },
        boardFileUpload : function(obj) {
            console.log(obj);
            if (obj != null && obj.formID != null && document.getElementById(obj.formID) != null) {
                var form = $('#' + obj.formID);
                var formData = new FormData(form[0]);
                console.log(form.toJson());

                $.ajax({
                    url: "/Proc/BoardFile/Upload",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    cache: false,
                    success: function (rst) {
                        console.log(rst);
                        if (obj.callback != null && typeof (obj.callback) == "function") {
                            obj.callback(rst);
                        }
                    }
                });
            } else {
                if (obj.callback != null && typeof (obj.callback) == "function") {
                    obj.callback({ Check : false, Code : -1, Message : "대상 폼을 찾을 수 없습니다.", Value : "" });
                }
            }
        },
        FileUpload : function(obj) {
            console.log(obj);
            if (obj != null && obj.formID != null && document.getElementById(obj.formID) != null) {
                var form = $('#' + obj.formID);
                var formData = new FormData(form[0]);
                console.log(form.toJson());

                $.ajax({
                    url: obj.URL,
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    cache: false,
                    success: function (rst) {
                        console.log(rst);
                        if (obj.callback != null && typeof (obj.callback) == "function") {
                            obj.callback(rst);
                        }
                    }
                });
            } else {
                if (obj.callback != null && typeof (obj.callback) == "function") {
                    obj.callback({ Check : false, Code : -1, Message : "대상 폼을 찾을 수 없습니다.", Value : "" });
                }
            }
        }
    };
})();

var Dictionary = (function () {
    return {
        Add : function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        Get : function (key) {
            return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
        },
        ContainKey: function (key) {
            return localStorage.getItem(key) ? true : false;
        }
    }
})();

var JsonObject = function () {
    this.result = {};
    this.Add = function (key, val) {
        this.result[key] = val;
    };
    this.Get = function () {
        return this.result;
    };
    this.Exists = function (key) {
        return (this.result[key] != null);
    };
    this.GetValue = function (key) {
        return this.result[key];
    };
    this.Set = function (key, value) {
        this.result[key] = value;
    };
    this.AppendSet = function (key, value) {
        this.result[key] = this.result[key] + "," + value;
    };
    this.FindCheckboxValue = function (formID, targetName) {
        var arr = new Array();
        $("#" + formID).find("input:checkbox").each(function () {
            if ($(this).attr("name") == targetName) {
                if ($(this).is(":checked")) {
                    arr.push($(this).val());
                }
            }
        });

        var values = "";
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (values == "") {
                    values = arr[i];
                } else {
                    values += "," + arr[i];
                }
            }
        }

        return { name: targetName, value: values };
    };
    this.FindRadioValue = function (formID, targetName) {
        var result = "";
        $("#" + formID).find("input:radio").each(function () {
            if ($(this).attr("name") == targetName) {
                if ($(this).is(":checked")) {
                    result = $(this).val();
                }
            }
        });

        return { name: targetName, value: result };
    };
    this.DynamicSubmit = function (submitURL, targetFrm, callback) {
        var tags = "<form name=\"DynamicJsonFormData\" id=\"DynamicJsonFormData\" method=\"post\" action=\"" + submitURL + "\" ";
        if (targetFrm != null) {
            tags += " target=\"" + targetFrm + "\" ";
        }
        tags += ">";

        for (var item in this.result) {
            tags += "<input type=\"hidden\" name=\"" + item + "\" value=\"" + this.result[item] + "\" />";
        }

        tags += "</form>";
        $("body").append(tags);
        setTimeout(function () {
            $("#DynamicJsonFormData").submit();
            $("#DynamicJsonFormData").remove();
            if (callback != null) {
                callback();
            }
        }, 100);
    }
};

$.fn.IsNullOrEmpty = function () {
    let ObjectValue = $(this).val();

    try {
        if (ObjectValue == null) {
            return true;
        } else {
            if (String(ObjectValue).trim() == "") {
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

$.fn.toJson = function () {
    let json = new JsonObject();
    let formID = this.attr("id");
    let uid = "";
    let Value = "";
    let name = "";

    $(this).find("input[type=text], input[type=number], input[type=password], input[type=tel], input[type=email], input[type=hidden], select, textarea").each(function () {
        uid = ($(this).attr("name") == null || $(this).attr("name") == "") ? $(this).attr("id") : $(this).attr("name");
        Value = $(this).val();

        if (uid != null && uid != "") {
            try {
                if (json.Exists(uid)) {
                    json.AppendSet(uid, Value);
                } else {
                    json.Add(uid, Value);
                }
            } catch (e) {
                json.Add(uid, "");
            }
        }
    });

    $(this).find("input:radio").each(function () {
        if (name != $(this).attr("name")) {
            name = $(this).attr("name");
            if (name != null && name != "") {
                var radioData = json.FindRadioValue(formID, name);
                json.Add(radioData.name, radioData.value);
            }
        }
    });

    name = "";

    $(this).find("input:checkbox").each(function () {
        if (name != $(this).attr("name")) {
            name = $(this).attr("name");
            if (name != null && name != "") {
                var checkboxData = json.FindCheckboxValue(formID, name);
                json.Add(checkboxData.name, checkboxData.value);
            }
        }
    });

    return json.Get();
};