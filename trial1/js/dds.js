if (
  (jQuery(document).ready(function () {
    var t, e, n, i;
    function o(t) {
      return t < 10 && (t = "0" + t), t;
    }
    1 <= jQuery("#timerr").length &&
      ((n = 180),
      (i = setInterval(function () {
        (t = parseInt(n / 60, 10)),
          (e = (e = parseInt(n % 60, 10)) < 10 ? "0" + e : e),
          $("#timerr").text(t + " " + minutos_y + e + " " + segundos),
          --n < 0 && clearInterval(i);
      }, 3e3)));
    var r = new Date(),
      a = o(r.getHours()) + ":" + o(r.getMinutes()),
      l = o(r.getMonth() + 1);
    $(".comment_day1").text(r.getDate()),
      $(".comment_day2").text(r.getDate() - 1),
      $(".comment_day3").text(r.getDate() - 2),
      jQuery(".p_var-dia").text(r.getDate()),
      jQuery(".p_var-mes").text(l),
      jQuery(".p_var-anyo").text(r.getFullYear()),
      jQuery(".p_var-dia_nombre").text(dayNames[r.getDay()]),
      jQuery(".p_var-mes_nombre").text(monthNames[r.getMonth()]),
      jQuery(".p_var-hora_fija").text(a);
    var c = getBrowser();
    jQuery(".p_var-browser").text(c);
    var u = getPlatform();
    jQuery(".p_var-so").text(u),
      "1" == getCookie("prlwge_finish_" + jQuery("body").data("pid")) &&
        setTimeout(function () {
          setSecondary();
        }, 100);
    var f = getCookie("prlwge_count_" + jQuery("body").data("pid"));
    "" == f || null == f
      ? setCookie("prlwge_count_" + jQuery("body").data("pid"), "1", "10")
      : 1 <= parseInt(f)
      ? setSecondary()
      : setCookie(
          "prlwge_count_" + jQuery("body").data("pid"),
          "" + (parseInt(f) + 1),
          "10"
        );
  }),
  988 <= screen.width)
)
  var mp_Confetti = 150;
else mp_Confetti = 75;
var deactivationTimerHandler,
  reactivationTimerHandler,
  animationHandler,
  particles = [],
  angleConfetti = 0,
  tiltAngle = 0,
  confettiActive = !1,
  confettiIniciated = !1,
  animationComplete = !0,
  particleColors = {
    colorOptions: [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "pink",
      "SlateBlue",
      "lightblue",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson",
    ],
    colorIndex: 0,
    colorIncrementer: 0,
    colorThreshold: 10,
    getColor: function () {
      return (
        10 <= this.colorIncrementer &&
          ((this.colorIncrementer = 0),
          this.colorIndex++,
          this.colorIndex >= this.colorOptions.length && (this.colorIndex = 0)),
        this.colorIncrementer++,
        this.colorOptions[this.colorIndex]
      );
    },
  };
function confettiParticle(t) {
  (this.x = Math.random() * W_Confetti),
    (this.y = Math.random() * H_Confetti - H_Confetti),
    (this.r = RandomFromTo(10, 30)),
    (this.d = Math.random() * mp_Confetti + 10),
    (this.color = t),
    (this.tilt = Math.floor(10 * Math.random()) - 10),
    (this.tiltAngleIncremental = 0.07 * Math.random() + 0.05),
    (this.tiltAngle = 0),
    (this.draw = function () {
      return (
        ctx.beginPath(),
        (ctx.lineWidth = this.r / 2),
        (ctx.strokeStyle = this.color),
        ctx.moveTo(this.x + this.tilt + this.r / 4, this.y),
        ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4),
        ctx.stroke()
      );
    });
}
function SetGlobalsConfetti() {
  (uehruoeu = document.getElementById("uehruoeu")),
    (ctx = uehruoeu.getContext("2d")),
    (W_Confetti = window.innerWidth),
    (H_Confetti = window.innerHeight),
    (uehruoeu.width = W_Confetti),
    (uehruoeu.height = H_Confetti);
}
function InitializeConfetti() {
  animationComplete = !(particles = []);
  for (var t = 0; t < mp_Confetti; t++) {
    var e = particleColors.getColor();
    particles.push(new confettiParticle(e));
  }
  StartConfetti();
}
function Draw() {
  ctx.clearRect(0, 0, W_Confetti, H_Confetti);
  for (var t, e = [], n = 0; n < mp_Confetti; n++)
    (t = n), e.push(particles[t].draw());
  return UpdateConfetti(), e;
}
function RandomFromTo(t, e) {
  return Math.floor(Math.random() * (e - t + 1) + t);
}
function UpdateConfetti() {
  var t,
    e = 0;
  (angleConfetti += 0.01), (tiltAngle += 0.1);
  for (var n = 0; n < mp_Confetti; n++) {
    if (((t = particles[n]), animationComplete)) return;
    !confettiActive && t.y < -15
      ? (t.y = H_Confetti + 100)
      : (stepParticleConfetti(t, n),
        t.y <= H_Confetti && e++,
        CheckForRepositionConfetti(t, n));
  }
  0 === e && StopConfetti();
}
function CheckForRepositionConfetti(t, e) {
  (t.x > W_Confetti + 20 || t.x < -20 || t.y > H_Confetti) &&
    confettiActive &&
    (0 < e % 5 || e % 2 == 0
      ? repositionParticleConfetti(
          t,
          Math.random() * W_Confetti,
          -10,
          Math.floor(10 * Math.random()) - 10
        )
      : 0 < Math.sin(angleConfetti)
      ? repositionParticleConfetti(
          t,
          -5,
          Math.random() * H_Confetti,
          Math.floor(10 * Math.random()) - 10
        )
      : repositionParticleConfetti(
          t,
          W_Confetti + 5,
          Math.random() * H_Confetti,
          Math.floor(10 * Math.random()) - 10
        ));
}
function stepParticleConfetti(t, e) {
  (t.tiltAngle += t.tiltAngleIncremental),
    (t.y += (Math.cos(angleConfetti + t.d) + 3 + t.r / 2) / 2),
    (t.x += Math.sin(angleConfetti)),
    (t.tilt = 15 * Math.sin(t.tiltAngle - e / 3));
}
function repositionParticleConfetti(t, e, n, i) {
  (t.x = e), (t.y = n), (t.tilt = i);
}
function StartConfetti() {
  (confettiActive = !0),
    (W_Confetti = window.innerWidth),
    (H_Confetti = window.innerHeight),
    (uehruoeu.width = W_Confetti),
    (uehruoeu.height = H_Confetti),
    (function t() {
      return animationComplete
        ? null
        : ((animationHandler = requestAnimFrame(t)), Draw());
    })();
}
function ClearTimers() {
  clearTimeout(reactivationTimerHandler), clearTimeout(animationHandler);
}
function DeactivateConfetti() {
  (confettiActive = !1), ClearTimers();
}
function StopConfetti() {
  (animationComplete = !0),
    null != ctx && ctx.clearRect(0, 0, W_Confetti, H_Confetti);
}
function RestartConfetti() {
  ClearTimers(),
    StopConfetti(),
    (reactivationTimerHandler = setTimeout(function () {
      (animationComplete = !(confettiActive = !0)), InitializeConfetti();
    }, 100));
}
function SetupConfetti() {
  SetGlobalsConfetti(),
    InitializeConfetti(),
    (confettiIniciated = !0),
    jQuery(window).resize(function () {
      (W_Confetti = window.innerWidth),
        (H_Confetti = window.innerHeight),
        (uehruoeu.width = W_Confetti),
        (uehruoeu.height = H_Confetti);
    });
}
(window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (t) {
    return window.setTimeout(t, 1e3 / 60);
  }),
  jQuery(document).ready(function () {
    "undefined" == typeof confetti_ini &&
      0 < jQuery("#uehruoeu").length &&
      SetupConfetti();
  });
var boxRoot,
  count = 0,
  num = RandomFromTo(1, 3),
  intentos = 3,
  puedo = !1;

var modalOptions = { backdrop: "static", keyboard: false };

localStorage.setItem("vari", 0);


$(".dffjhjknhjuh41477jnjsfgjgbjketnh598901").click(function () {
  if (localStorage.getItem("vari") == 0) {
    localStorage.setItem("vari", 1);
    $(this).css("transition", "all 1s ease-in-out");
    $(this).css("transform", "translate(-4px,-29px)");
    $("#fade_2").fadeIn(500);
    $("#fade_2").removeClass("fade");


  } else if (localStorage.getItem("vari") == 1) {
    $(".jnjsfgjgbjketnh5989").css("transiton", "all 1s ease-in-out;")
    $(".ljnjsfgjgbjketnh5989").css("transiton", "all 1s ease-in-out;")
    $("#fade3").css("transiton", "all 1s ease-in-out;")
    //setTimeout(function () {
    $(this).css("transition", "all 1s ease-in-out");
    $(this).css("transform", "translate(-4px,-29px)");

    $(this).parents(".lastclass").find(".segr").css("transition", "all 2s ease-in-out");
    $(this).parents(".lastclass").find(".segr").css("transform", "translate(-4px,-28px)")
    //  },1000)
    setTimeout(function () {
      $(".jnjsfgjgbjketnh5989").css("display", "inline")

      $(".ljnjsfgjgbjketnh5989").css("display", "inline")

    }, 2000)
    setTimeout(function () {
      $("#fade_3").fadeIn();
      $("#fade_3").removeClass("fade");
    }, 2500)

  }


});


$("#p_modal_button1").click(function () {
  $("#fade_1").modal("hide");


})
$("#p_modal_button2").click(function () {
  $("#fade_2").fadeOut(1000)


})


$(".dbgfuyrhwufh1").click(function () {


  $(this).fadeOut("slow", function () {
    $(".dbgfuyrhwufh2").fadeIn("slow")
  })
})
$(".dbgfuyrhwufh2").click(function () {

  $(this).fadeOut("slow", function () {
    $(".dbgfuyrhwufh3").fadeIn("slow")
  })
})
$(".dbgfuyrhwufh3").click(function () {
  $(this).fadeOut("slow", function () {
    $(".dbgfuyrhwufh4").fadeIn("slow")
  })
})

$(".dbgfuyrhwufh4").click(function () {
  $(this).fadeOut("slow", function () {
    $("#fd2").fadeIn("slow")
    $("#mgjs1").fadeOut("slow")
    $("#cmjs2").fadeOut("slow")
  })


  setTimeout(function () {
    $(".fd2-1").fadeIn(1000)
  }, 1000)
  setTimeout(function () {
    $(".fd2-2").fadeIn(1000)
  }, 3000)

  setTimeout(function () {
    $(".fd2-3").fadeIn(1000)
  }, 4000)

  setTimeout(function () {
    $(".fd2-4").fadeIn(1000)
  }, 5000)

  setTimeout(function () {
    $("#fd2").fadeOut(500);
    $("#rwuh998986598598").fadeIn(1000);
    $("#uehruoeu").remove();
    $("#fade_1").modal("show");
  }, 6000)
})

dayNames = Array
      ("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
      );
    monthNames = new Array(
      "Enero", "Febrero", "Marzo", "Abril", "Puede", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    );
    minutos_y = " minutos y ";
    segundos = " segundos ";


    var modalOptions = { backdrop: "static", keyboard: false };