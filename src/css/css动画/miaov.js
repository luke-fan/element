$(document).ready(function() {
    $('#navLogin').on('click', function() {
        $.ajax({
            url: "https://study.miaov.com/account/ajax/checklogin",
            type: 'get',
            dataType: 'JSONP',
            jsonpCallback: "cb",
            success: function(data) {
                if (data.type == -1) {
                    window.location.href = 'https://study.miaov.com/login?ref=' + refstatusUrl + '&refstatus=' + refstatus;
                } else {
                    window.location.href = "http://www.miaov.com/api.php/user/thirdConnect?code=" + data.data + "&&refstatus=" + refstatus;
                }
            },
            error: function(data) {

            }
        });
    });
    $('#navRegister').on('click', function() {
        $.ajax({
            url: "https://study.miaov.com/account/ajax/checklogin",
            type: 'get',
            dataType: 'JSONP',
            jsonpCallback: "cb",
            success: function(data) {
                if (data.type == -1) {
                    window.location.href = 'https://study.miaov.com/signup?ref=' + refstatusUrl + '&refstatus=' + refstatus;
                } else {
                    window.location.href = "http://www.miaov.com/api.php/user/thirdConnect?code=" + data.data + "&&refstatus=" + refstatus;
                }
            },
            error: function(data) {

            }
        });
    });
    $('.works-box dl').on('click', function() {
        var $this = $(this);
        var newTab = window.open('about:blank');
        good($this, newTab);
    });
    var cate = 'all';
    $('#nav-works li').on('click', function() {
        var $this = $(this);
        if ($this.data('cate') == cate) {
            return;
        } else {
            $.ajax({
                url: "/api.php/example/exampleList?cate=" + $this.data('cate'),
                type: 'get',
                success: function(data) {
                    var worksList = data.data.worksList;
                    var str = '';
                    for (var i in worksList) {
                        var works = worksList[i].works;
                        var name = '';
                        if ($this.data('cate') != 'all' && works.length <= 4) {
                            name = ' min-hg';
                        }
                        str += '<div class="works-box-top">\
											  <div class="works-box-bottom clear">\
													<div class="works-box-count' + name + '">\
														 <h3>' + worksList[i].name + '</h3>';
                        for (var j = 0; j < works.length; j++) {
                            if (j % 4 == 0) {
                                str += '<div class="works-box-row clear">';
                            }
                            str += '<dl data-nid="' + works[j].newsId + '" data-wid="' + works[j].workId + '"><dt><div class="box-3d"><div class="box-3d-content"><img src="' + works[j].coverImg + '"/><img src="' + works[j].coverImg + '"/><img src="' + works[j].coverImg + '"/><img src="' + works[j].coverImg + '"/><img src="' + works[j].coverImg + '"/></div></div></dt><dd><p>' + works[j].title + '</p><ul><li class="talk">' + works[j].commentNum + '</li><li class="praise">' + works[j].voteNum + '</li></ul></dd></dl>';
                            if (j % 4 == 3 || j == (works.length - 1)) {
                                str += '</div>';
                            }
                        }
                        str += '</div>\
									</div>\
							  </div>';
                    }
                    $('#works-box').html(str);
                    $(".box-3d").on("mouseenter mouseleave", function(e) {
                        spin(e, this);
                    });
                    $('.works-box dl').on('click', function() {
                        var $this = $(this);
                        var newTab = window.open('about:blank');
                        good($this, newTab);
                    });
                    cate = $this.data('cate');
                    $('#nav-works .active').removeClass('active');
                    $this.addClass('active');
                },
                error: function(data) {
                    console.log(data);
                }
            });
        }
    });

    //点赞并跳转
    function good(obj, newTab) {
        $.ajax({
            url: "/api.php/user/upVote",
            type: 'post',
            data: { module: "example_module", moduleId: obj.data('wid') },
            success: function(data) {
                obj.find('.praise').html(data.voteCount);
                newTab.location.href = '/index.php/news/newsDetail/nid/' + obj.data('nid');
                // window.open('/index.php/news/newsDetail/nid/'+$this.data('nid'))
            },
            error: function(data) {
                console.log(data);
            }
        });
    }

    //返回顶部
    backTop();

    function backTop() {
        var backBtn = document.querySelector('.server .backTop_201811');
        if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
            backBtn.style.display = 'block';
        }

        $(window).scroll(function() {
            if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
                backBtn.style.display = 'block';
            } else {
                backBtn.style.display = 'none';
            }
        })

        backBtn.onclick = function() {
            $('html,body').animate({ scrollTop: '0px' }, 800);
        }
    }

    //开班信息平均分配
    var classList = $('.class-info-center dl');
    if (classList.length < 6) {
        var averagePadding = Math.floor(((327 - 44 * classList.length) / classList.length) / 2);
        for (var i = 0; i < classList.length; i++) {
            classList.eq(i).css('padding', averagePadding + 'px 0');
        }
    }

    bomb();
    //弹性
    function bomb() {
        var qin = $('.qin');
        for (var i = 0; i < qin.length; i++) {
            // qin.eq(i).css("width",qin.eq(i).width());
            qin.eq(i).css("height", qin.eq(i).height(14));
            var aHtml = qin.eq(i).html().split("");
            for (var j = 0; j < aHtml.length; j++) {
                aHtml[j] = "<span>" + aHtml[j] + "</span>"
            }
            qin.eq(i).html(aHtml.join(""));
        }
        var aSpan = $(".qin span");
        for (var i = 0; i < aSpan.length; i++) {
            aSpan.eq(i).css("left", aSpan.eq(i).position().left + "px");
        }
        aSpan.css("position", "absolute");
        var iStartTop = aSpan.position().top;
        var iMinTop = -18;
        var iMaxTop = 18;
        var obj = null;
        aSpan.on('mouseenter', aaa);

        function aaa(ev) {
            this.parentNode.onmouseout = null;
            this.parentNode.onmousemove = null;
            var ev = ev || event;
            var iStartY = ev.clientY;
            obj = $(this);
            this.parentNode.onmousemove = function(ev) {
                $(this).find('span').off('mouseenter', aaa);
                $(this).find('span').on('mouseenter', bbb);
                var iMouseY = ev.clientY;
                var iTop = iStartTop + (iMouseY - iStartY);
                var aSpan = $(this).find("span");
                var iIndex = obj.index();
                aSpan.stop();
                if (iTop < iMinTop || iTop > iMaxTop) {
                    aSpan.animate({ top: iStartTop }, 500, "easeOutElastic");
                    $(this).find('span').on('mouseenter', aaa);
                    $(this).find('span').off('mouseenter', bbb);
                    this.onmouseleave = null;
                    this.onmousemove = null;
                } else {
                    for (var i = 0; i < aSpan.length; i++) {
                        if (iMouseY > iStartY) {
                            var iSpanTop = iTop - Math.abs(i - iIndex);
                            if (iSpanTop < iStartTop) {
                                iSpanTop = iStartTop;
                            }
                        } else if (iMouseY < iStartY) {
                            var iSpanTop = iTop + Math.abs(i - iIndex);
                            if (iSpanTop > iStartTop) {
                                iSpanTop = iStartTop;
                            }
                        }
                        aSpan.eq(i).css("top", iSpanTop + "px");
                    }
                }

                this.onmouseleave = function() {
                    aSpan.animate({ top: iStartTop }, 500, "easeOutElastic");
                    $(this).find('span').on('mouseenter', aaa);
                    $(this).find('span').off('mouseenter', bbb);
                    this.onmouseleave = null;
                    this.onmousemove = null;
                };
            };
        }

        function bbb() {
            obj = $(this);
        }
    }

    //图片3D旋转效果
    $(".box-3d").on("mouseenter mouseleave", function(e) {
        spin(e, this);
    });

    function spin(e, obj) {
        var sTop = getScrollTop();
        var w = obj.offsetWidth;
        var h = obj.offsetHeight;
        var x = e.pageX - obj.getBoundingClientRect().left - w / 2;
        var y = e.pageY - obj.getBoundingClientRect().top - sTop - h / 2;
        var direction = Math.round((((Math.atan2(y, x) * 180 / Math.PI) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
        var eventType = e.type;
        var box3D = $(obj).find(".box-3d-content");
        if (eventType == 'mouseenter') {
            switch (direction) {
                case 0:
                    box3D.css("transform", "translateZ(-85px) rotateY(0deg) rotateX(-90deg)");
                    break;
                case 1:
                    box3D.css("transform", "translateZ(-85px) rotateY(-90deg) rotateX(0deg)");
                    break;
                case 2:
                    box3D.css("transform", "translateZ(-85px) rotateY(0deg) rotateX(90deg)");
                    break;
                case 3:
                    box3D.css("transform", "translateZ(-85px) rotateY(90deg) rotateX(0deg)");
                    break;
            }
        } else {
            box3D.css("transform", "translateZ(-85px) rotateY(0deg) rotateX(0deg)");
        }
    }

    //获取滚动条高度
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    //联系我们
    var $contact = $('#contact');
    var $cuBox = $('#contact .cuBox');
    var $psBox = $('#contact .psBox');
    $cuBox.on('mouseenter', function() {
        this.bOff = false;
        var $this = $(this);
        clearTimeout($this.get(0).iTimer);
        // tweenMove({obj:$this.get(0),oTarget:{'width' : '240'},iTime:200,iType:'linear'});
        tweenMove({
            obj: $this.get(0),
            oTarget: { 'width': '240' },
            iTime: 200,
            iType: 'linear',
            fnEnd: function() {
                tweenMove({ obj: $this.get(0), oTarget: { 'height': '410' }, iTime: 400, iType: 'backOut1' });
            }
        });
    });
    $cuBox.on('mouseleave', function() {
        var $this = $(this);
        clearTimeout($this.get(0).iTimer);
        $this.get(0).iTimer = setTimeout(function() {
            tweenMove({
                obj: $this.get(0),
                oTarget: { 'height': '48' },
                iTime: 400,
                iType: 'linear',
                fnEnd: function() {
                    tweenMove({
                        obj: $this.get(0),
                        oTarget: { 'width': '116' },
                        iTime: 200,
                        iType: 'linear',
                        fnEnd: function() {
                            $this.get(0).open = false;
                        }
                    });
                }
            });
        }, 1000);
    });
    $psBox.on('mouseenter', function() {
        this.bOff = false;
        var $this = $(this);
        clearTimeout($this.get(0).iTimer);
        if ($(window).scrollTop() > 300) {
            $('.back-top').css('opacity', '0');
        }
        tweenMove({
            obj: $this.get(0),
            oTarget: { 'width': '240' },
            iTime: 200,
            iType: 'linear',
            fnEnd: function() {
                tweenMove({ obj: $this.get(0), oTarget: { 'height': '160' }, iTime: 300, iType: 'backOut' });
            }
        });
    });
    $psBox.on('mouseleave', function() {
        var $this = $(this);
        clearTimeout($this.get(0).iTimer);
        $this.get(0).iTimer = setTimeout(function() {
            tweenMove({
                obj: $this.get(0),
                oTarget: { 'height': '48' },
                iTime: 300,
                iType: 'linear',
                fnEnd: function() {
                    tweenMove({ obj: $this.get(0), oTarget: { 'width': '116' }, iTime: 200, iType: 'linear' });
                    if ($(window).scrollTop() > 300) {
                        $('.back-top').css('opacity', '1');
                    }
                }
            });
        }, 1000);
    });

});